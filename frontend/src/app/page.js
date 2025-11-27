'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link.js';
import Nav from './components/nav/nav.js';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const particles = Array.from({ length: 30 }).map((_, i) => ({
  left: `${5 * i}%`,
  top: `${(7 * i) % 100}%`,
  size: 2 + (i % 3),
}));

// Counter animation component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value.replace(/,/g, ''));
      const incrementTime = (duration * 1000) / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [value, duration, inView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* New Background */}
      <div className="fixed top-0 left-0 -z-10 h-full w-full bg-white">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-pos-0 {
          background-position: 0% 50%;
        }
        .bg-pos-100:hover {
          background-position: 100% 50%;
        }
      `}</style>

      <Nav />

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left Content */}
              <motion.div 
                className="flex-1 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative inline-block"
                >
                </motion.div>
                
                <motion.h1 
                  className="text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Where{' '}
                  <span className="text-teal-500 relative">
                    Talent
                    <motion.span
                      className="absolute -bottom-2 left-0 right-0 h-3 bg-teal-100 -z-10"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    />
                  </span>
                  <br />
                  Meets{' '}
                  <span className="text-teal-500">Opportunity</span>
                </motion.h1>

                <motion.p 
                  className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="font-semibold text-gray-800">SkillHive</span> connects ambitious professionals with their perfect roles. 
                  Build stunning resumes, ace interviews, and land your dream job—all in one platform.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link href="/Bauth">
                    <motion.button
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      whileTap={{ scale: 0.95 }}
                      className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-teal-400/30 hover:shadow-2xl hover:shadow-teal-400/40 transition-all relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2 justify-center">
                        🚀 Hire Top Talent
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  </Link>
                  <Link href="/auth">
                    <motion.button
                      whileHover={{ scale: 1.05, rotate: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="group w-full sm:w-auto px-8 py-4 bg-white text-teal-500 rounded-xl font-semibold text-lg border-2 border-teal-500 hover:bg-teal-50 transition-all relative overflow-hidden"
                    >
                      <span className="flex items-center gap-2 justify-center">
                        ✨ Find Your Dream Job
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Content - Hero Illustration */}
              <motion.div 
                className="flex-1 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="relative w-full aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-white rounded-3xl transform rotate-6" />
                  <div className="absolute inset-0 bg-white rounded-3xl shadow-xl p-8">
                    <div className="relative h-full">
                      {/* Resume Preview */}
                      <div className="absolute top-4 left-4 right-4 bottom-4 bg-gray-50 rounded-2xl p-6 shadow-inner">
                        {/* Header with Avatar */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                        {/* Content Lines */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                          </div>
                        </div>
                        {/* Skills Section */}
                        <div className="mt-6">
                          <div className="flex flex-wrap gap-2">
                            {["React", "Node.js", "Python", "AI/ML"].map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-teal-100 text-teal-500 rounded-full text-sm flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Floating Elements */}
                      <div className="absolute -right-4 top-1/4 w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center transform rotate-12">
                        <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="absolute -left-4 bottom-1/4 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center transform -rotate-12">
                        <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "250,000", label: "Dream Jobs Listed", icon: "💼", color: "teal" },
              { number: "85,000", label: "Hiring Companies", icon: "🏢", color: "purple" },
              { number: "3,500,000", label: "Talented Professionals", icon: "⭐", color: "blue" },
              { number: "120,000", label: "Success Matches", icon: "🎯", color: "green" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-white to-teal-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-teal-100 group-hover:border-teal-300">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <h3 className="text-4xl font-bold text-teal-500 mb-2">
                    <AnimatedCounter value={stat.number} />+
                  </h3>
                  <p className="text-gray-700 text-lg font-medium">{stat.label}</p>
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 to-teal-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Scanner Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  AI-Powered ATS Scanner
                </span>
                <span className="block text-gray-800 mt-3 text-4xl">Beat The Bots, Land The Job</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                🤖 <span className="font-semibold">90% of resumes</span> never reach human eyes. Our intelligent scanner ensures yours does. 
                Get real-time feedback, keyword optimization, and formatting tips that get you noticed.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    icon: "🎯",
                    title: "Smart Keyword Matching",
                    description: "Automatically align your resume with job descriptions",
                    gradient: "from-teal-400 to-cyan-400"
                  },
                  {
                    icon: "📊",
                    title: "Instant ATS Score",
                    description: "See how recruiters will rate your application",
                    gradient: "from-purple-400 to-pink-400"
                  },
                  {
                    icon: "✨",
                    title: "AI Recommendations",
                    description: "Get personalized tips to boost your chances",
                    gradient: "from-amber-400 to-orange-400"
                  },
                  {
                    icon: "⚡",
                    title: "Lightning Fast",
                    description: "Results in under 3 seconds—no waiting!",
                    gradient: "from-blue-400 to-indigo-400"
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all relative overflow-hidden"
                    whileHover={{ y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-bl-full`} />
                    <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform">{feature.icon}</span>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
              <Link href="/scanner">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white rounded-xl font-semibold text-lg shadow-xl shadow-teal-400/30 hover:shadow-2xl hover:shadow-teal-400/50 transition-all duration-300 flex items-center gap-3"
                >
                  🚀 Scan Your Resume Now
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
            
            {/* Updated ATS Scanner Preview */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="space-y-8">
                  {/* Scanner Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">🔍</span>
                      </div>
                      <div className="font-semibold text-gray-800">ATS Score Analysis</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                      92
                    </div>
                  </div>
                  {/* Score Bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Keywords Match</span>
                        <span className="text-sm font-medium text-teal-500">95%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-green-400 rounded-full" style={{width: "95%"}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Format Optimization</span>
                        <span className="text-sm font-medium text-teal-500">88%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-yellow-400 rounded-full" style={{width: "88%"}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Content Quality</span>
                        <span className="text-sm font-medium text-teal-500">92%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-teal-400 rounded-full" style={{width: "92%"}}></div>
                      </div>
                    </div>
                  </div>
                  {/* Suggestions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm font-medium">Strong Points</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-green-100 rounded w-full"></div>
                        <div className="h-2 bg-green-100 rounded w-4/5"></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-500">!</span>
                        <span className="text-sm font-medium">Suggestions</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-yellow-100 rounded w-full"></div>
                        <div className="h-2 bg-yellow-100 rounded w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Choose Us
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Empowering your career journey with cutting-edge technology
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI-Powered Matching",
                description: "Smart algorithms that connect the right talent with the right opportunities",
                icon: "🎯",
                stats: "95% Match Rate"
              },
              {
                title: "Real-time Analytics",
                description: "Detailed insights and tracking for your job search progress",
                icon: "📊",
                stats: "24/7 Monitoring"
              },
              {
                title: "Smart Learning",
                description: "Personalized skill development recommendations",
                icon: "🧠",
                stats: "500+ Courses"
              },
              {
                title: "Global Network",
                description: "Connect with professionals and companies worldwide",
                icon: "🌍",
                stats: "150+ Countries"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all h-full">
                  <div className="absolute -top-4 right-8 bg-teal-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                    {feature.stats}
                  </div>
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Your Journey to Success
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              A simple yet powerful process to advance your career
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Build your professional identity with our AI-powered profile builder",
                icon: "👤",
                color: "blue"
              },
              {
                step: "02",
                title: "Set Your Goals",
                description: "Define your career objectives and get a personalized roadmap",
                icon: "🎯",
                color: "purple"
              },
              {
                step: "03",
                title: "Connect & Grow",
                description: "Match with opportunities and mentors aligned with your goals",
                icon: "🚀",
                color: "green"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
                  <div className={`absolute -top-4 left-8 bg-${step.color}-600 text-white font-bold px-4 py-2 rounded-xl text-lg`}>
                    {step.step}
                  </div>
                  <div className="text-5xl mb-6 flex justify-center mt-4">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-teal-500 transform translate-x-full">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Powered Mentorship Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                AI-Powered Mentorship
                <span className="block text-teal-500 mt-2">& Goal Tracking</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get personalized career guidance and track your professional growth with our intelligent mentorship system.
              </p>
              
              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    icon: "🎯",
                    title: "Smart Goal Setting",
                    description: "AI helps set achievable career milestones"
                  },
                  {
                    icon: "🤖",
                    title: "AI Mentor Match",
                    description: "Connect with mentors based on your goals"
                  },
                  {
                    icon: "📈",
                    title: "Progress Analytics",
                    description: "Track your growth with detailed insights"
                  },
                  {
                    icon: "🎓",
                    title: "Learning Paths",
                    description: "Customized skill development roadmaps"
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                    <span className="text-3xl mb-4 block">{feature.icon}</span>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <Link href="/auth/UserAuth">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-teal-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-teal-400/20 hover:shadow-xl hover:shadow-teal-400/30 transition-all"
                >
                  Start Your Journey
                </motion.button>
              </Link>
            </motion.div>

            {/* Interactive Mentorship Dashboard Preview */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="space-y-8">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">👨‍🏫</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Your AI Mentor</div>
                        <div className="text-sm text-gray-500">Available 24/7</div>
                      </div>
                    </div>
                    <div className="bg-green-100 px-4 py-1 rounded-full text-green-600 text-sm font-medium">
                      Active Session
                    </div>
                  </div>

                  {/* Goal Progress */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">Current Goals</h4>
                      <span className="text-teal-500 text-sm">3/5 Completed</span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Learn React Advanced</span>
                          <span className="text-green-600">85%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-green-400 rounded-full" style={{width: "85%"}}></div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">System Design</span>
                          <span className="text-teal-500">60%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-teal-400 rounded-full" style={{width: "60%"}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Goals */}
                  <div>
                    <h4 className="font-semibold mb-4">Upcoming Goals</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                          <span>🎯</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Master Cloud Architecture</div>
                          <div className="text-sm text-gray-500">Starting Next Week</div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium"
                        >
                          Start
                        </motion.button>
                      </div>
                      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-500">
                          <span>📚</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">DevOps Fundamentals</div>
                          <div className="text-sm text-gray-500">Planned for Q2</div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-teal-100 text-teal-500 rounded-lg text-sm font-medium"
                        >
                          Plan
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 bg-teal-500 text-white rounded-xl font-medium"
                    >
                      Schedule Session
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
                    >
                      View Roadmap
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Success Stories
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Hear from professionals who found their dream jobs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer at Google",
                image: "/testimonial1.jpg",
                quote: "The AI matching system helped me find the perfect role that matched my skills and aspirations."
              },
              {
                name: "Michael Chen",
                role: "Product Designer at Apple",
                image: "/testimonial2.jpg",
                quote: "The platform's design tools and resources were invaluable in showcasing my portfolio."
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Manager at Netflix",
                image: "/testimonial3.jpg",
                quote: "Found my dream job within weeks. The process was smooth and professional throughout."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-500 font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-500 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, white 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.h2 
              className="text-4xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p 
              className="text-xl mb-12 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join thousands of professionals who have already found their dream jobs through our platform
            </motion.p>
            <Link href="/auth/UserAuth">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-teal-500 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Now
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-teal-500">About Us</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-teal-500">Careers</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-teal-500">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-teal-500">Blog</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-teal-500">Guides</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-teal-500">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-teal-500">Privacy</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-teal-500">Terms</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-teal-500">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-teal-500">Twitter</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-teal-500">LinkedIn</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-teal-500">Facebook</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2024 SkillHive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}