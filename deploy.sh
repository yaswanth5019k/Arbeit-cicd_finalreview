#!/bin/bash

# Arbeit Deployment Script using Ansible
# Usage: ./deploy.sh [backend|frontend|full|setup]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ANSIBLE_DIR="${SCRIPT_DIR}/ansible"
PROJECT_ROOT="${SCRIPT_DIR}"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}→ $1${NC}"
}

# Check if Ansible is installed
check_ansible() {
    if ! command -v ansible &> /dev/null; then
        print_error "Ansible is not installed!"
        echo "Install with: pip3 install ansible"
        exit 1
    fi
    print_success "Ansible found: $(ansible --version | head -n1)"
}

# Build backend
build_backend() {
    print_info "Building backend..."
    cd "${PROJECT_ROOT}/backend"
    mvn clean package -DskipTests
    print_success "Backend built successfully"
}

# Build frontend
build_frontend() {
    print_info "Building frontend..."
    cd "${PROJECT_ROOT}/frontend"
    npm install
    npm run build
    npm run export
    print_success "Frontend built successfully"
}

# Deploy using Ansible
deploy_ansible() {
    local playbook=$1
    print_info "Running Ansible playbook: ${playbook}"
    
    cd "${ANSIBLE_DIR}"
    ansible-playbook -i inventory/hosts.ini "playbooks/${playbook}" -v
    
    print_success "Deployment completed!"
}

# Main script
case "${1:-}" in
    backend)
        check_ansible
        build_backend
        deploy_ansible "deploy-backend.yml"
        ;;
    frontend)
        check_ansible
        build_frontend
        deploy_ansible "deploy-frontend.yml"
        ;;
    full)
        check_ansible
        build_backend
        build_frontend
        deploy_ansible "deploy-full.yml"
        ;;
    setup)
        check_ansible
        deploy_ansible "setup-server.yml"
        ;;
    *)
        echo "Usage: $0 {backend|frontend|full|setup}"
        echo ""
        echo "Commands:"
        echo "  backend  - Build and deploy backend only"
        echo "  frontend - Build and deploy frontend only"
        echo "  full     - Build and deploy complete application"
        echo "  setup    - Setup Tomcat server (first-time)"
        exit 1
        ;;
esac

print_success "All done!"
