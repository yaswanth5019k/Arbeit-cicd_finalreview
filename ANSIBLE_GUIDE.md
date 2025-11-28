# Ansible Deployment Guide for Arbeit

## 📋 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Playbooks](#playbooks)
- [Jenkins Integration](#jenkins-integration)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This project now includes **Ansible automation** for deploying the Arbeit application to Tomcat servers. Ansible provides:

- ✅ Automated server setup
- ✅ Consistent deployments
- ✅ Easy rollback capabilities
- ✅ Multi-environment support
- ✅ Idempotent operations

**Note:** The Ansible setup is **independent** of the existing Kubernetes deployment and won't affect it.

---

## 📦 Prerequisites

### On Control Machine (where you run Ansible):
```bash
# Install Ansible
pip3 install ansible

# Verify installation
ansible --version

# Install required collections
cd ansible
ansible-galaxy collection install -r requirements.yml
```

### On Target Servers:
- Ubuntu/Debian-based system
- SSH access with sudo privileges
- Python 3 installed
- Open ports: 8080 (Tomcat), 22 (SSH)

---

## ⚙️ Installation

### 1. Configure Inventory

Edit `ansible/inventory/hosts.ini` with your server details:

```ini
[tomcat_servers]
tomcat-server ansible_host=YOUR_SERVER_IP ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/id_rsa

[production]
prod-server ansible_host=YOUR_PROD_IP ansible_user=ubuntu
```

### 2. Update Variables

Edit `ansible/group_vars/all.yml` for global settings:

```yaml
tomcat_home: "/home/ubuntu/tomcat10"
tomcat_port: 8080
app_user: ubuntu
```

### 3. Set Up Secrets (Optional)

```bash
cd ansible
cp secrets.yml.example secrets.yml
# Edit secrets.yml with your credentials
```

### 4. Test Connectivity

```bash
cd ansible
ansible -i inventory/hosts.ini all -m ping
```

---

## 🚀 Usage

### Quick Deploy Script

Use the provided deployment script for easy deployments:

```bash
# Deploy complete application
./deploy.sh full

# Deploy backend only
./deploy.sh backend

# Deploy frontend only
./deploy.sh frontend

# Setup Tomcat server (first-time)
./deploy.sh setup
```

### Manual Ansible Commands

```bash
cd ansible

# Setup server (first-time only)
ansible-playbook -i inventory/hosts.ini playbooks/setup-server.yml

# Deploy full application
ansible-playbook -i inventory/hosts.ini playbooks/deploy-full.yml

# Deploy backend only
ansible-playbook -i inventory/hosts.ini playbooks/deploy-backend.yml

# Deploy frontend only
ansible-playbook -i inventory/hosts.ini playbooks/deploy-frontend.yml
```

### With Verbose Output

```bash
ansible-playbook -i inventory/hosts.ini playbooks/deploy-full.yml -v
# -vv for more verbosity, -vvv for debug level
```

---

## 📚 Playbooks

### 1. `setup-server.yml`
**Purpose:** Initial server setup and Tomcat installation

**What it does:**
- Installs Java 21, Maven, and dependencies
- Downloads and installs Tomcat 10
- Creates necessary directories
- Configures Tomcat settings

**Run:**
```bash
ansible-playbook -i inventory/hosts.ini playbooks/setup-server.yml
```

### 2. `deploy-backend.yml`
**Purpose:** Deploy Spring Boot backend to Tomcat

**What it does:**
- Validates WAR file exists
- Stops Tomcat gracefully
- Removes old deployment
- Copies new WAR file
- Restarts Tomcat
- Performs health check

**Run:**
```bash
ansible-playbook -i inventory/hosts.ini playbooks/deploy-backend.yml
```

### 3. `deploy-frontend.yml`
**Purpose:** Deploy Next.js frontend to Tomcat

**What it does:**
- Validates build directory exists
- Stops Tomcat
- Removes old frontend
- Syncs new frontend files
- Sets proper permissions
- Restarts Tomcat
- Verifies accessibility

**Run:**
```bash
ansible-playbook -i inventory/hosts.ini playbooks/deploy-frontend.yml
```

### 4. `deploy-full.yml`
**Purpose:** Deploy complete application (backend + frontend)

**What it does:**
- All steps from backend and frontend deployments
- Comprehensive health checks
- Deployment summary report

**Run:**
```bash
ansible-playbook -i inventory/hosts.ini playbooks/deploy-full.yml
```

---

## 🔧 Jenkins Integration

### Option 1: Use New Jenkinsfile

Replace your current `Jenkinsfile` with `JenkinsfileAnsible`:

```groovy
// JenkinsfileAnsible includes:
// - Build backend with Maven
// - Build frontend with npm
// - Deploy using Ansible playbooks
// - Automated verification
```

### Option 2: Keep Both Jenkinsfiles

- `Jenkinsfile` - Original Tomcat deployment
- `JenkinsfileAnsible` - New Ansible-based deployment

Create a new Jenkins job pointing to `JenkinsfileAnsible`.

### Jenkins Setup Requirements

1. **Install Ansible Plugin** (optional):
   - Go to Jenkins → Manage Plugins → Available
   - Search for "Ansible Plugin"

2. **Configure SSH Credentials**:
   - Jenkins → Manage Credentials
   - Add SSH private key for server access

3. **Environment Variables**:
   ```groovy
   environment {
       ANSIBLE_HOME = '/usr/local/bin'
       ANSIBLE_CONFIG = "${WORKSPACE}/ansible/ansible.cfg"
   }
   ```

---

## 🏗️ Directory Structure

```
ansible/
├── ansible.cfg              # Main Ansible configuration
├── requirements.yml         # Required Ansible collections
├── .gitignore              # Ignore secrets and logs
├── secrets.yml.example     # Template for secrets
├── inventory/
│   └── hosts.ini           # Server inventory
├── group_vars/
│   ├── all.yml            # Global variables
│   └── production.yml     # Production-specific vars
└── playbooks/
    ├── setup-server.yml    # Server setup
    ├── deploy-backend.yml  # Backend deployment
    ├── deploy-frontend.yml # Frontend deployment
    └── deploy-full.yml     # Full deployment
```

---

## 🐛 Troubleshooting

### Connection Issues

```bash
# Test SSH connection
ssh -i ~/.ssh/id_rsa ubuntu@YOUR_SERVER_IP

# Test Ansible ping
ansible -i inventory/hosts.ini all -m ping

# Run with verbose output
ansible-playbook -i inventory/hosts.ini playbooks/deploy-full.yml -vvv
```

### Permission Errors

```bash
# Ensure correct permissions on SSH key
chmod 600 ~/.ssh/id_rsa

# Test sudo access on remote server
ansible -i inventory/hosts.ini all -m shell -a "sudo whoami" --ask-become-pass
```

### Build Not Found

```bash
# Build backend first
cd backend && mvn clean package

# Build frontend first
cd frontend && npm install && npm run build && npm run export
```

### Tomcat Won't Stop

```bash
# Manually kill Tomcat processes on remote server
ssh ubuntu@YOUR_SERVER_IP
ps aux | grep tomcat
kill -9 <PID>
```

### Port Already in Use

```bash
# Check what's using port 8080
ansible -i inventory/hosts.ini all -m shell -a "sudo lsof -i :8080"

# Change port in group_vars/all.yml
tomcat_port: 8090
```

---

## 🔐 Security Best Practices

1. **Use Ansible Vault for secrets**:
   ```bash
   ansible-vault encrypt ansible/secrets.yml
   ansible-playbook playbooks/deploy-full.yml --ask-vault-pass
   ```

2. **SSH Key Authentication**:
   - Never use password authentication
   - Use SSH keys with passphrase

3. **Limit SSH Access**:
   - Use bastion hosts for production
   - Implement IP whitelisting

4. **Regular Updates**:
   ```bash
   pip3 install --upgrade ansible
   ansible-galaxy collection install -r requirements.yml --force
   ```

---

## 📊 Deployment Options Comparison

| Method | Use Case | Pros | Cons |
|--------|----------|------|------|
| **Ansible** | Traditional servers, VMs | Simple, agentless, easy to learn | Less suitable for large scale |
| **Kubernetes** | Container orchestration | Auto-scaling, self-healing | Complex setup, overkill for simple apps |
| **Docker Compose** | Local development | Fast, lightweight | Not for production |
| **Jenkins Direct** | Simple deployments | Direct control | Manual, error-prone |

---

## 🎓 Next Steps

1. **Test locally**: Run playbooks on localhost first
2. **Set up staging**: Create separate inventory for staging environment
3. **Add monitoring**: Integrate with monitoring tools
4. **Implement CI/CD**: Connect with Jenkins/GitHub Actions
5. **Create rollback playbook**: For quick rollbacks

---

## 📞 Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review Ansible logs: `ansible-playbook ... -vvv`
- Verify server logs: `tail -f /home/ubuntu/tomcat10/logs/catalina.out`

---

**Your Kubernetes setup (`k8s/` folder) remains completely unaffected by this Ansible configuration.**
