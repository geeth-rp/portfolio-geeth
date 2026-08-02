import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, Code, Palette, Users, ArrowRight,
  Camera, Smartphone, Zap, Sparkles, Layers, Video, Share2,
  Brain, Target, GraduationCap, Calendar, Menu, X, Star, Trophy,
  CheckCircle2, Megaphone, Sun, Moon, FileText, Layout, ExternalLink
} from 'lucide-react';
import profileImg from './profile.png';
import cvFile from './Geeth_CV_OG.pdf';

// Animation Hook for smooth reveal
const RevealOnScroll = ({ children, delay = "0", className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer && observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
    >
      {children}
    </div>
  );
};

const AppIcon = ({ icon: Icon, gradient, color }) => (
  <div className={`relative w-16 h-16 rounded-[1.2rem] p-[2px] shadow-md dark:shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 dark:opacity-20`}></div>
    <div className="absolute inset-0 border border-zinc-300/50 dark:border-white/10 rounded-[1.2rem]"></div>
    <div className="w-full h-full bg-zinc-100/90 dark:bg-zinc-900/80 backdrop-blur-md rounded-[1.1rem] flex items-center justify-center relative z-10">
      <Icon className={`${color}`} size={28} />
    </div>
  </div>
);

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Profile', 'Education', 'Skills', 'Interests', 'Experience', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-xl py-4 border-b border-emerald-500/20' : 'bg-white/60 dark:bg-black/60 backdrop-blur-md py-6 border-b border-black/5 dark:border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
          GEETH<span className="text-emerald-500">.</span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-white transition-all">
              {link}
            </a>
          ))}

          <button onClick={toggleTheme} className="text-zinc-500 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a href="#contact" className="bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all">
            Let's Talk
          </a>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="text-zinc-900 dark:text-white">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button className="text-zinc-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white dark:bg-black flex flex-col items-center justify-center gap-8 md:hidden z-50">
          <button className="absolute top-8 right-8 text-zinc-900 dark:text-white" onClick={() => setIsOpen(false)}><X size={32} /></button>
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-4xl font-black text-zinc-900 dark:text-white uppercase italic">{link}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="profile" className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black overflow-hidden px-6 pt-32 md:pt-40 pb-24 transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500/[0.05] dark:bg-emerald-500/[0.03] rounded-full blur-[180px] pointer-events-none"></div>

      <RevealOnScroll>
        <div className="flex flex-col items-center relative z-20 w-full">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-zinc-200 dark:bg-zinc-800 border-4 border-white dark:border-zinc-700 shadow-2xl flex items-center justify-center overflow-hidden flex-shrink-0 relative z-10">
              <img
                src={profileImg}
                alt="Geeth Profile"
                className="w-full h-full object-cover"
              />
            </div>


            <h1 className="text-[15vw] md:text-[12vw] font-black text-zinc-900 dark:text-white leading-[0.8] tracking-tighter uppercase select-none opacity-90 italic relative z-0 text-center md:text-left">
              HI, I'M <br /> GEETH
            </h1>
          </div>

          <div className="mt-4 md:mt-8 max-w-3xl text-center relative z-30 px-6">
            <p className="text-lg md:text-2xl text-zinc-600 dark:text-gray-400 font-medium leading-relaxed mb-12 italic tracking-tight">
              Leading teams and managing projects taught me why quality-first thinking matters that's what's driving me toward <span className="text-zinc-900 dark:text-white font-bold">software testing and QA</span>. It's the same instinct behind mastering <span className="text-zinc-900 dark:text-white font-bold">Generative AI</span> for real businesses.
            </p>

            <div className="flex flex-col gap-10 items-center justify-center">
              <div className="flex flex-col md:flex-row gap-6">
                <a href="#contact" className="group relative px-12 py-6 rounded-full font-black text-sm uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 animate-gradient-xy"></div>
                  <span className="relative text-white z-10 flex items-center gap-3 italic font-bold tracking-widest">CONNECT WITH ME <ArrowRight size={20} /></span>
                </a>

                <a href={cvFile} target="_blank" rel="noopener noreferrer" className="group relative px-12 py-6 rounded-full font-black text-sm uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 flex items-center justify-center">
                  <span className="relative z-10 flex items-center gap-3 italic font-bold tracking-widest">VIEW CV <FileText size={20} className="text-emerald-500" /></span>
                </a>
              </div>

              <div className="flex gap-8 items-center justify-center">
                <a href="https://linkedin.com/in/Geeth-Rangika-Pelpola" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-white transition-colors flex items-center gap-3 uppercase text-[11px] tracking-[0.4em] font-black italic">
                  <Linkedin size={20} /> LINKEDIN
                </a>
                <a href="https://github.com/geeth-rp" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-white transition-colors flex items-center gap-3 uppercase text-[11px] tracking-[0.4em] font-black italic">
                  <Github size={20} /> GITHUB
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

const Education = () => (
  <section id="education" className="py-32 bg-white dark:bg-zinc-950 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-8">
      <RevealOnScroll>
        <div className="mb-20">
          <span className="text-emerald-600 dark:text-emerald-500 font-mono text-sm uppercase tracking-widest mb-4 block italic tracking-[0.4em]">Academic History</span>
          <h2 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">Education</h2>
        </div>
      </RevealOnScroll>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-12 rounded-[3.5rem] border border-zinc-200 dark:border-white/5 hover:border-emerald-500/30 transition-all group backdrop-blur-sm shadow-xl">
          <GraduationCap className="text-emerald-600 dark:text-emerald-500 mb-6" size={40} />
          <h3 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic mb-2 leading-tight">BSc (Hons) in Software Engineering</h3>
          <a href="https://sltc.ac.lk/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 italic hover:text-emerald-500 dark:hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/40 transition-all inline-block">Sri Lanka Technological Campus</a>
          <div className="flex items-center gap-3 text-zinc-500 dark:text-gray-500 font-mono text-sm">
            <Calendar size={16} /> Expected: 2027
          </div>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-12 rounded-[3.5rem] border border-zinc-200 dark:border-white/5 hover:border-blue-500/30 transition-all group backdrop-blur-sm shadow-xl">
          <GraduationCap className="text-blue-600 dark:text-blue-500 mb-6" size={40} />
          <h3 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic mb-2 leading-tight">Secondary Education</h3>
          <a href="https://share.google/AYAHVEHQbg4GmOUvs" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs mb-6 italic hover:text-blue-500 dark:hover:text-blue-300 underline underline-offset-4 decoration-blue-500/40 transition-all inline-block">St. Thomas College Matale</a>
          <div className="flex items-center gap-3 text-zinc-500 dark:text-gray-500 font-mono text-sm">
            <Calendar size={16} /> Graduated: 2020
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const skills = [
    {
      title: 'QA & Testing (Learning)', icon: Target,
      gradient: 'from-teal-400 to-emerald-600', color: 'text-teal-600 dark:text-teal-400',
      tags: ['SQL Basics', 'API Testing (Postman)', 'Test Case Design', 'Bug Reporting'],
      subtitle: "Actively building foundational knowledge in software testing"
    },
    {
      title: 'Full-Stack & App Dev', icon: Code,
      gradient: 'from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-800', color: 'text-zinc-700 dark:text-white',
      tags: ['Flutter', 'React', 'Node.js', 'Python', 'Dart', 'Tailwind CSS', 'MongoDB', 'Supabase', 'Figma']
    },
    {
      title: 'Graphic Design', icon: Palette,
      gradient: 'from-pink-500 to-rose-600', color: 'text-pink-600 dark:text-pink-400',
      tags: ['Canva', 'Affinity Designer', 'Affinity Photo', 'Figma']
    },
    {
      title: 'AI Design', icon: Sparkles,
      gradient: 'from-emerald-400 to-cyan-500', color: 'text-emerald-600 dark:text-emerald-400',
      tags: ['ComfyUI', 'Flux', 'Qwen', 'Z Image Turbo', 'Wan', 'NanoBanana', 'Veo', 'Kling Video']
    },
    {
      title: 'Video Editing', icon: Video,
      gradient: 'from-blue-500 to-indigo-600', color: 'text-blue-600 dark:text-blue-400',
      tags: ['CapCut', 'Motion Graphics']
    },
    {
      title: 'Social Media', icon: Share2,
      gradient: 'from-purple-500 to-indigo-700', color: 'text-purple-600 dark:text-purple-400',
      tags: ['Instagram', 'Facebook', 'YouTube', 'Visual Strategy']
    },
    {
      title: 'Leadership', icon: Users,
      gradient: 'from-orange-400 to-red-500', color: 'text-orange-500 dark:text-orange-400',
      tags: ['Team Management', 'Event Planning', 'Project Planning']
    }
  ];
  return (
    <section id="skills" className="py-32 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
            <h2 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">Skill Set</h2>
            <div className="max-w-md text-zinc-600 dark:text-gray-500 text-lg border-l border-emerald-500 pl-6 italic">
              Engineering expertise fueled by <span className="text-zinc-900 dark:text-white font-bold">Generative AI</span> efficiency.
            </div>
          </div>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {skills.map((s, i) => {
            const isLast = i === skills.length - 1;
            return (
              <RevealOnScroll key={i} delay={i * 100} className={`h-full ${isLast ? 'lg:col-span-3 md:col-span-2' : ''}`}>
                <div className="h-full bg-white dark:bg-zinc-900/30 p-10 rounded-[3.5rem] border border-zinc-200 dark:border-white/5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all group shadow-xl flex flex-col">
                  <AppIcon icon={s.icon} gradient={s.gradient} color={s.color} />
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mt-8 mb-2 uppercase italic tracking-tighter group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{s.title}</h3>
                  {s.subtitle && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-4 italic">{s.subtitle}</p>
                  )}
                  {!s.subtitle && <div className="mb-4"></div>}
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-zinc-100 dark:border-white/5">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-gray-300 text-[11px] font-semibold uppercase tracking-wider hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Interests = () => {
  const interests = [
    { title: 'AI Content Creation', icon: Brain, desc: 'Generating AI influencer models for business use.' },
    { title: 'Generative AI Workflows', icon: Sparkles, desc: 'ComfyUI, Flux, Qwen, Wan, Nanobanana.' },
    { title: 'Video & Motion', icon: Video, desc: 'AI-driven motion content for clients.' },
    { title: 'Social Media Management', icon: Share2, desc: 'Growing TikTok, YouTube, and FB accounts.' },
    { title: 'Software Quality', icon: Target, desc: 'Building foundations in QA and test design.' }
  ];
  return (
    <section id="interests" className="py-32 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8">
        <RevealOnScroll>
          <h2 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter mb-24 text-center leading-none">Interests</h2>
        </RevealOnScroll>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {interests.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-6 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 group-hover:border-emerald-300 dark:group-hover:border-emerald-500/30 transition-all shadow-lg">
                <item.icon className="text-zinc-400 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" size={32} />
              </div>
              <h4 className="text-zinc-900 dark:text-white font-black uppercase italic tracking-widest text-[10px] mb-3">{item.title}</h4>
              <p className="text-[10px] text-zinc-500 dark:text-gray-500 leading-relaxed uppercase font-bold tracking-[0.2em]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceItem = ({ id, projectName, position, org, year }) => {
  return (
    <RevealOnScroll>
      <div className="group py-4 border-b border-zinc-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5 hover:px-6 transition-all duration-300 rounded-xl">
        <div className="flex items-center gap-6">
          <span className="text-zinc-400 dark:text-zinc-700 font-mono text-xl group-hover:text-emerald-500 dark:group-hover:text-emerald-400 w-8">{id}</span>
          <div>
            <h3 className="text-2xl md:text-4xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
              {projectName}
            </h3>
            <div className="mt-2">
              <p className="text-emerald-600 dark:text-emerald-400/90 font-bold uppercase tracking-[0.2em] text-[12px] group-hover:text-emerald-700 dark:group-hover:text-white transition-colors italic">
                {position} {org ? `• ${org}` : ''}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:text-right pl-14 md:pl-0">
          <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-white font-mono text-xs uppercase tracking-widest shadow-sm group-hover:border-emerald-300 dark:group-hover:border-emerald-500/30 transition-colors">
            {year}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

const Experience = () => {
  const experiences = [
    { id: '01', projectName: 'IEEE Computer Society of SLTC', position: 'Vice-Chairperson', year: 'Completed', org: '' },
    { id: '02', projectName: 'Master Designer', position: 'Marketing & Promotion Head', year: 'Completed', org: 'SLTC Media Unit' },
    { id: '03', projectName: 'IEEE Computer Society of SLTC', position: 'Logistics Sub-Committee Head', year: '2024 - 2025', org: 'IEEE CS' },
    { id: '04', projectName: 'IEEE CodeMania V5.0', position: 'Co-chair', year: '2024', org: 'IEEE CS' },
    { id: '05', projectName: 'IEEE Day 2025', position: 'Coordination Team Head', year: '2025', org: 'IEEE CS' },
    { id: '06', projectName: 'Arduino Challenge 2025', position: 'Program Team Head', year: '2025', org: 'IEEE CS' },
    { id: '07', projectName: 'Decode Xtreme 2024', position: 'Program Team Head', year: '2024', org: 'IEEE CS' },
    { id: '08', projectName: 'Git Genius 2024', position: 'Program Team Head', year: '2024', org: 'IEEE CS' },
    { id: '09', projectName: 'Colors Night 2024', position: 'Program Team Member', year: '2024', org: 'SLTC' }
  ];

  return (
    <section id="experience" className="py-32 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8">
        <RevealOnScroll>
          <div className="mb-20">
            <span className="text-emerald-600 dark:text-emerald-500 font-mono text-sm uppercase tracking-widest mb-4 block italic tracking-[0.5em]">Career Path & Leadership</span>
            <h2 className="text-6xl md:text-[7.5rem] font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">Experience</h2>
          </div>
        </RevealOnScroll>

        <div className="flex flex-col gap-2">
          {experiences.map((e) => (
            <ExperienceItem key={e.id} {...e} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CertificatesAndProjects = () => {
  const projects = [
    {
      title: "Fellowship – AI Learning Assistant",
      category: "ACADEMIC PROJECT",
      status: "ONGOING",
      desc: "AI-powered learning assistant that promotes critical thinking using Socratic questioning, adaptive reasoning, and personalized reflection.",
      tags: ["FLUTTER", "PYTHON", "FLASK", "SUPABASE", "OPENAI API"]
    },
    {
      title: "Utopia – Smart Town Management",
      category: "ACADEMIC PROJECT",
      status: "COMPLETED",
      desc: "Smart city platform with a citizen mobile app and web dashboard for real-time reporting, public services, and emergency notifications.",
      tags: ["FLUTTER", "DART", "REACT", "NODE.JS", "JAVASCRIPT"],
      github: "https://github.com/omega-u20/utopia"
    },
    {
      title: "LankaSmartMart",
      category: "ACADEMIC PROJECT",
      status: "COMPLETED",
      desc: "Full-stack e-commerce platform featuring product management, secure authentication, shopping cart, and order processing.",
      tags: ["REACT", "NODE.JS", "EXPRESS", "MONGODB", "JWT"],
      github: "https://github.com/omega-u20/LankaSmartMart"
    },
    {
      title: "Pixlore AI Studio",
      category: "PERSONAL PROJECT",
      status: "COMPLETED",
      desc: "My personal AI business website showcasing creative AI services and custom AI-powered content generation solutions.",
      tags: ["REACT", "TYPESCRIPT", "TAILWIND CSS", "VITE"],
      github: "https://github.com/geeth-rp/Pixlore",
      live: "https://geeth-rp.github.io/Pixlore"
    }
  ];

  const certificates = [
    {
      name: "IEEE Membership",
      desc: "Long-term volunteering member since 2024",
      issuer: "IEEE",
      year: "2026"
    },
    {
      name: "IEEE Computer Society Membership",
      desc: "Vice-Chairperson, IEEE Computer Society of SLTC",
      issuer: "IEEE Computer Society",
      year: "2026"
    },
    {
      name: "Introduction to Software Testing",
      desc: "Foundational course covering software testing concepts, types, and QA processes",
      issuer: "Simplilearn SkillUp",
      year: "2026"
    },
    {
      name: "Automation Testing for Beginners",
      desc: "Introductory course on automation testing fundamentals and tools",
      issuer: "Simplilearn SkillUp",
      year: "2026"
    },
    {
      name: "Software Testing with Generative AI",
      desc: "Explored the role of Generative AI in test automation, bug detection, and QA workflows",
      issuer: "Simplilearn SkillUp",
      year: "2026"
    }
  ];

  return (
    <section className="py-32 bg-white dark:bg-zinc-950 transition-colors duration-300 border-t border-zinc-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-8">

        {/* Projects Section */}
        <div className="mb-24">
          <RevealOnScroll>
            <div className="mb-16">
              <span className="text-emerald-600 dark:text-emerald-500 font-mono text-sm uppercase tracking-widest mb-4 block italic tracking-[0.4em]">Portfolio</span>
              <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">Projects</h2>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <RevealOnScroll key={i} delay={i * 100} className="h-full">
                <div className="h-full bg-zinc-50 dark:bg-zinc-900/50 p-10 rounded-[3rem] border border-zinc-200 dark:border-white/5 hover:border-emerald-500/30 transition-all group shadow-lg flex flex-col relative">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Layout className="text-emerald-600 dark:text-emerald-400" size={24} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-gray-400">
                        {p.category}
                      </span>
                      <span className={`inline-block px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest shadow-sm transition-colors ${p.status === 'ONGOING' ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 group-hover:border-emerald-300 dark:group-hover:border-emerald-500/50' : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-white group-hover:border-emerald-300 dark:group-hover:border-emerald-500/30'}`}>
                        {p.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tight mb-4">{p.title}</h3>
                  <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed mb-8">{p.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {p.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white dark:bg-black/50 border border-zinc-200 dark:border-white/10 rounded-full text-[10px] font-bold text-zinc-500 dark:text-gray-400 uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer links */}
                  {(p.github || p.live) && (
                    <div className="mt-4 flex items-center gap-6 pt-6 border-t border-zinc-200 dark:border-white/10">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                          <Github size={16} /> GitHub
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                          <ExternalLink size={16} /> Web Link
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div>
          <RevealOnScroll>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">Certificates</h2>
            </div>
          </RevealOnScroll>

          <div className="bg-zinc-50 dark:bg-zinc-900/30 rounded-[3rem] border border-zinc-200 dark:border-white/5 p-8 md:p-12 shadow-xl">
            <div className="flex flex-col gap-6">
              {certificates.map((cert, i) => (
                <RevealOnScroll key={i} delay={i * 100}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-500/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="text-emerald-600 dark:text-emerald-400" size={20} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">{cert.name}</h4>
                      <p className="text-zinc-600 dark:text-gray-400 text-sm mb-1">{cert.desc}</p>
                      <p className="text-zinc-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">{cert.issuer}</p>
                    </div>
                    <div className="text-zinc-400 dark:text-zinc-500 font-mono text-sm uppercase tracking-widest mt-2 md:mt-0 flex-shrink-0 text-right">
                      {cert.year}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300">
      <div className="absolute bottom-0 right-0 text-[20vw] font-black text-zinc-900/[0.03] dark:text-white/[0.02] pointer-events-none select-none uppercase italic leading-none translate-y-1/4">GP</div>
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <RevealOnScroll>
            <h2 className="text-7xl md:text-9xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter mb-8 leading-[0.85]">CONNECT <br />WITH ME</h2>
            <p className="text-zinc-600 dark:text-gray-400 text-xl mb-12 max-w-md leading-relaxed italic">
              Open to collaborative projects and hands-on learning opportunities. Let's build the future together.
            </p>
            <div className="space-y-10">
              <div className="flex items-center gap-6 group cursor-pointer">
                <a href="mailto:pelpolageeth@gmail.com" className="flex items-center gap-6">
                  <AppIcon icon={Mail} gradient="from-zinc-400 to-zinc-600 dark:from-zinc-700 dark:to-black" color="text-zinc-900 dark:text-white" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-600 dark:text-gray-400 font-black mb-1 italic">Direct Transmission</div>
                    <div className="text-xl text-zinc-900 dark:text-white font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">pelpolageeth@gmail.com</div>
                  </div>
                </a>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <a href="tel:+94766938306" className="flex items-center gap-6">
                  <AppIcon icon={Smartphone} gradient="from-teal-400 to-emerald-600 dark:from-teal-600 dark:to-emerald-800" color="text-teal-700 dark:text-white" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-600 dark:text-gray-400 font-black mb-1 italic">Phone Number</div>
                    <div className="text-xl text-zinc-900 dark:text-white font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">+94 766 938 306</div>
                  </div>
                </a>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <a href="https://linkedin.com/in/Geeth-Rangika-Pelpola" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6">
                  <AppIcon icon={Linkedin} gradient="from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800" color="text-blue-700 dark:text-white" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-600 dark:text-gray-400 font-black mb-1 italic">Professional</div>
                    <div className="text-xl text-zinc-900 dark:text-white font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">Geeth-Rangika-Pelpola</div>
                  </div>
                </a>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <a href="https://github.com/geeth-rp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6">
                  <AppIcon icon={Github} gradient="from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-800" color="text-zinc-900 dark:text-white" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-600 dark:text-gray-400 font-black mb-1 italic">Source Code</div>
                    <div className="text-xl text-zinc-900 dark:text-white font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">geeth-rp</div>
                  </div>
                </a>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay="200">
            <div className="bg-white dark:bg-zinc-900/80 p-12 rounded-[4rem] border border-zinc-200 dark:border-white/10 relative overflow-hidden group shadow-2xl backdrop-blur-md">
              <form action="https://formspree.io/f/mojgorrl" method="POST" className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-gray-500 font-black block pl-2 italic">First Name</label>
                    <input name="firstName" type="text" required className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-5 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500/50 transition-all focus:bg-white dark:focus:bg-black/60 shadow-inner" placeholder="Geeth" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-gray-500 font-black block pl-2 italic">Last Name</label>
                    <input name="lastName" type="text" required className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-5 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500/50 transition-all focus:bg-white dark:focus:bg-black/60 shadow-inner" placeholder="Pelpola" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-gray-500 font-black block pl-2 italic">Email Address</label>
                  <input name="email" type="email" required className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-5 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500/50 transition-all focus:bg-white dark:focus:bg-black/60 shadow-inner" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-gray-500 font-black block pl-2 italic">Message</label>
                  <textarea name="message" required rows="4" className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-5 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500/50 transition-all focus:bg-white dark:focus:bg-black/60 shadow-inner" placeholder="How can we build the future together?"></textarea>
                </div>
                <button type="submit" className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-7 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white transition-all shadow-xl group/btn overflow-hidden relative">
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    Launch Transmission <ArrowRight className="group-hover/btn:translate-x-3 transition-transform duration-500" />
                  </div>
                </button>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-16 bg-white dark:bg-black border-t border-zinc-200 dark:border-white/5 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
      <div className="text-2xl font-black text-zinc-900 dark:text-white italic tracking-tighter">GEETH<span className="text-emerald-500">.</span></div>
      <div className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-500 dark:text-gray-600 italic">
        GEETH PELPOLA DESIGN PHILOSOPHY © 2026
      </div>
      <div className="flex gap-10">
        <a href="https://linkedin.com/in/Geeth-Rangika-Pelpola" target="_blank" rel="noopener noreferrer" className="text-zinc-500 dark:text-gray-600 hover:text-emerald-600 dark:hover:text-white transition-colors"><Linkedin size={20} /></a>
        <a href="https://github.com/geeth-rp" target="_blank" rel="noopener noreferrer" className="text-zinc-500 dark:text-gray-600 hover:text-emerald-600 dark:hover:text-white transition-colors"><Github size={20} /></a>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="bg-gray-50 dark:bg-black text-zinc-900 dark:text-white font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden antialiased min-h-screen transition-colors duration-300">
      <style>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 6s ease-in-out infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Hero />
      <Education />
      <Skills />
      <Experience />
      <CertificatesAndProjects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;