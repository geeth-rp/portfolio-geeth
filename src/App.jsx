import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, Code, Code2, Palette, Users, Users2, ArrowRight,
  Camera, Smartphone, Zap, Sparkles, Layers, Video, Share2,
  Brain, BrainCircuit, Target, GraduationCap, Calendar, Menu, X, Star, Trophy,
  CheckCircle2, Megaphone, Sun, Moon, FileText, Layout, ExternalLink,
  BarChart3, LineChart, Cpu, Terminal, Database, TrendingUp, Compass, PenTool, LayoutGrid,
  Award, ShieldCheck, Bookmark,
  ChevronLeft, ChevronRight, Grid,
  HeartPulse, Network, Building2, School, BookOpen, Atom, Clapperboard, WandSparkles,
  Briefcase, Medal, BadgeCheck
} from 'lucide-react';
import profileImg from './assets/profile/geeth_profile.png';
import exp1 from './assets/experience/experience_1.jpg';
import exp2 from './assets/experience/experience_2.jpg';
import exp3 from './assets/experience/experience_3.jpg';
import exp4 from './assets/experience/experience_4.jpg';
import exp5 from './assets/experience/experience_5.jpg';
import exp6 from './assets/experience/experience_6.jpg';
import exp7 from './assets/experience/experience_7.jpg';
import exp8 from './assets/experience/experience_8.jpg';

import certIeeeMember from './assets/certificates/ieee_membership_certificate.jpg';
import certIeeeCs from './assets/certificates/ieee_cs_membership_certificate.jpg';
import certSimplilearn from './assets/certificates/simplilearn_completion_certificate.jpg';


const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let particles = [];
    const mouse = { x: -1000, y: -1000, radius: 120 };
    // Touch screens have no cursor to react to and reduced-motion users asked for stillness,
    // so in both cases the grid is drawn once instead of on every frame.
    const isStatic =
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let spacing = 36;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      spacing = window.innerWidth < 768 ? 44 : 36;
      init();
      if (isStatic) drawOnce();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = 1.5;
      }
      draw() {
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          let directionX = (dx / distance) * force * 5;
          let directionY = (dy / distance) * force * 5;
          this.x -= directionX;
          this.y -= directionY;
          this.size = 1.5 + (force * 2); 
        } else {
          if (this.x !== this.baseX) {
            let dxBase = this.x - this.baseX;
            this.x -= dxBase / 10;
          }
          if (this.y !== this.baseY) {
            let dyBase = this.y - this.baseY;
            this.y -= dyBase / 10;
          }
          if (this.size !== 1.5) {
             this.size -= (this.size - 1.5) / 10;
          }
        }
        this.draw();
      }
    }

    const init = () => {
      particles = [];
      const cols = Math.floor(canvas.width / spacing);
      const rows = Math.floor(canvas.height / spacing);
      
      const offsetX = (canvas.width - cols * spacing) / 2;
      const offsetY = (canvas.height - rows * spacing) / 2;

      for (let i = 0; i <= cols + 1; i++) {
        for (let j = 0; j <= rows + 1; j++) {
          particles.push(new Particle(offsetX + (i * spacing) - spacing/2, offsetY + (j * spacing) - spacing/2));
        }
      }
    };

    const drawOnce = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (!isStatic && animationFrameId === null) animate();
    };
    const stop = () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    };
    // Don't burn CPU/battery while the tab is in the background
    const handleVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', handleVisibility);

    resize();
    start();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('visibilitychange', handleVisibility);
      stop();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[-10] opacity-40 dark:opacity-60"
    />
  );
};

// True on devices with a real mouse/trackpad where the visitor hasn't asked for reduced motion
const canUseHoverMotion = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Pulls an element a few pixels toward the cursor while hovered (desktop only)
const useMagnetic = (maxShift = 8) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canUseHoverMotion()) return;

    const handleMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * maxShift;
      const y = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * maxShift * 0.75;
      el.style.translate = `${x}px ${y}px`;
    };
    const handleLeave = () => {
      el.style.translate = '';
    };

    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', handleLeave);
    return () => {
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', handleLeave);
    };
  }, [maxShift]);

  return ref;
};

// Animation Component for ArtCraft-inspired smooth cinematic reveal
const RevealOnScroll = ({ children, delay = "0", className = "", direction = "up", once = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer && observer.disconnect();
  }, [once]);

  const getTransform = () => {
    if (isVisible) return 'opacity-100 translate-y-0 translate-x-0 scale-100';
    if (direction === 'left') return 'opacity-0 -translate-x-12 scale-[0.96] will-change-[transform,opacity]';
    if (direction === 'right') return 'opacity-0 translate-x-12 scale-[0.96] will-change-[transform,opacity]';
    if (direction === 'down') return 'opacity-0 -translate-y-12 scale-[0.96] will-change-[transform,opacity]';
    return 'opacity-0 translate-y-12 scale-[0.96] will-change-[transform,opacity]';
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: '950ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`transition-[opacity,translate,scale] ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};

// Modern Topic Section Divider Component with glowing HUD tracker & animated laser scan
const TopicDivider = ({ number, title, subtitle }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer && observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative py-8 mb-8 select-none pointer-events-none">
      <div className="flex items-center gap-4">
        {/* Topic Index Pill */}
        <div className={`font-mono text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full border transition-all duration-700 ${inView ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-500'}`}>
          SEC // {number}
        </div>

        {/* Animated Laser Gradient Beam */}
        <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-white/10 relative overflow-hidden rounded-full">
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent transition-opacity duration-1000 ${inView ? 'opacity-100 animate-laser-sweep' : 'opacity-0'}`} />
        </div>

        {/* Status Pill */}
        <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hidden sm:flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${inView ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`}></span>
          {subtitle || 'SYSTEM READY'}
        </div>
      </div>
    </div>
  );
};

// ArtCraft-inspired HUD Scroll Sidebar with High-Visibility Design
const ScrollSidebar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('PROFILE');

  const sections = [
    { id: 'profile', label: 'PROFILE', num: '10' },
    { id: 'education', label: 'EDUCATION', num: '20' },
    { id: 'skills', label: 'SKILLS', num: '30' },
    { id: 'interests', label: 'INTERESTS', num: '40' },
    { id: 'experience', label: 'EXPERIENCE', num: '50' },
    { id: 'projects', label: 'PROJECTS', num: '60' },
    { id: 'contact', label: 'CONTACT', num: '70' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, Math.round(progress))));

      // Find active section based on scroll position
      const scrollPos = window.scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].label);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formattedProgress = String(scrollProgress).padStart(3, '0');

  return (
    <aside 
      aria-label="Scroll HUD Navigation"
      className="fixed right-3 md:right-5 top-0 bottom-0 z-40 hidden md:flex flex-col justify-between items-end py-10 pointer-events-none select-none"
    >
      {/* Top HUD: Digital Percentage Badge with Glowing Border */}
      <div className="flex flex-col items-end pointer-events-auto bg-white/80 dark:bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-white/10 shadow-lg">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="font-mono text-[9px] font-bold tracking-widest text-zinc-500 dark:text-gray-400">
            SEC
          </span>
          <span className="w-3 h-[1px] bg-emerald-500/60"></span>
        </div>
        <div className="font-mono text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400">
          {formattedProgress}%
        </div>
      </div>

      {/* Center HUD: Sleek ArtCraft Capsule Track & Interactive Ticks */}
      <div className="relative flex flex-col items-end my-auto pointer-events-auto">
        {/* Active Section Label - Compact Header above capsule without horizontal encroachment */}
        <div className="mb-3 flex items-center gap-1.5 self-end">
          <div 
            key={activeSection}
            className="animate-hud-arrival font-mono text-[9px] uppercase font-black tracking-[0.25em] text-zinc-900 dark:text-white bg-white/90 dark:bg-black/90 px-2 py-0.5 rounded-md border border-emerald-500/40 shadow-md flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>{activeSection}</span>
          </div>
        </div>

        {/* Outer ArtCraft Pill Capsule Container */}
        <div className="relative w-7 h-64 rounded-full border border-zinc-300 dark:border-white/15 bg-white/70 dark:bg-black/70 backdrop-blur-md flex items-center justify-center p-1 shadow-lg">
          {/* Inner Vertical Track Rail */}
          <div className="relative w-[3px] h-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            {/* Active progress fill with emerald neon glow */}
            <div 
              className="absolute top-0 left-0 w-full bg-emerald-500 shadow-[0_0_12px_#10b981] transition-all duration-150"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          {/* Section Ticks & Numbers inside/along the capsule */}
          <div className="absolute inset-y-0 right-1 flex flex-col justify-between items-end py-5">
            {sections.map((sec) => {
              const isActive = activeSection === sec.label;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  title={sec.label}
                  className="flex items-center gap-2 group/tick py-0.5 focus:outline-none"
                >
                  <span className={`font-mono text-[9px] font-bold transition-all duration-300 ${isActive ? 'text-emerald-500 scale-110 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]' : 'text-zinc-400 dark:text-zinc-500 group-hover/tick:text-zinc-900 dark:group-hover/tick:text-white'}`}>
                    {sec.num}
                  </span>
                  <span className={`h-[2px] rounded-full transition-all duration-300 ${isActive ? 'w-5 bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'w-2 bg-zinc-400 dark:bg-zinc-700 group-hover/tick:w-4 group-hover/tick:bg-emerald-500/70'}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom HUD: Base Coordinates Indicator */}
      <div className="flex flex-col items-end pointer-events-auto bg-white/80 dark:bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-white/10 shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] font-black tracking-widest text-zinc-500 dark:text-zinc-400">
            100
          </span>
          <span className="w-3 h-[1px] bg-zinc-400 dark:bg-zinc-600"></span>
        </div>
      </div>
    </aside>
  );
};

// Card icon with one consistent stroke weight. Each stroke gets pathLength=1 so CSS can
// "redraw" the icon on hover (see .icon-draw in index.css).
const DrawIcon = ({ icon: Icon, className = '', strokeWidth = 1.75, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current
      ?.querySelectorAll('path, line, circle, rect, polyline, polygon, ellipse')
      .forEach((el) => el.setAttribute('pathLength', '1'));
  }, [Icon]);

  return <Icon ref={ref} className={`icon-draw ${className}`} strokeWidth={strokeWidth} {...props} />;
};

const AppIcon = ({ icon: Icon, gradient, color, id }) => (
  <div className="relative w-14 h-14 rounded-2xl p-[1px] shadow-sm group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500">
    {/* Micro-border frame with refined gradient on hover */}
    <div className="absolute inset-0 rounded-2xl bg-zinc-200 dark:bg-white/10 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-emerald-600 transition-all duration-500"></div>
    {/* Inner frosted tech cell */}
    <div className="w-full h-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-[15px] flex items-center justify-center relative z-10 overflow-hidden">
      {/* Subtle background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-20 transition-opacity duration-500`}></div>
      {/* Micro HUD tech corners */}
      <div className="absolute top-1 left-1 w-1.5 h-[1px] bg-zinc-300 dark:bg-white/20"></div>
      <div className="absolute top-1 left-1 w-[1px] h-1.5 bg-zinc-300 dark:bg-white/20"></div>
      <div className="absolute bottom-1 right-1 w-1.5 h-[1px] bg-zinc-300 dark:bg-white/20"></div>
      <div className="absolute bottom-1 right-1 w-[1px] h-1.5 bg-zinc-300 dark:bg-white/20"></div>
      
      {/* Center Icon */}
      <DrawIcon
        icon={Icon}
        className={`${color} relative z-10 transition-transform duration-500 group-hover:scale-110`}
        size={24}
      />
    </div>
  </div>
);

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [isOpen, setIsOpen] = useState(false);
  const talkRef = useMagnetic(6);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const sections = ['profile', 'education', 'skills', 'interests', 'experience', 'projects', 'contact'];
      const scrollPos = window.scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Profile', 'Education', 'Skills', 'Interests', 'Experience', 'Projects', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-xl py-3 border-b border-emerald-500/20 shadow-sm' : 'bg-white/60 dark:bg-black/60 backdrop-blur-md py-5 border-b border-black/5 dark:border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-1 flex items-center">
          <a href="#profile" className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md hover:border-emerald-500/40 transition-all duration-300 shadow-sm hover:shadow-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_#10b981]" />
            <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white uppercase italic">
              GEETH<span className="text-emerald-500">.</span>
            </span>
          </a>
        </div>
        
        {/* Links (Centered) with ArtCraft-inspired HUD styling & Sync Animation */}
        <div className="hidden lg:flex gap-3 xl:gap-7 items-center justify-center">
          {links.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className={`group relative py-1 text-[11px] font-mono uppercase tracking-[0.14em] xl:tracking-[0.22em] font-semibold transition-all duration-300 ${isActive ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white'}`}
              >
                <span className="relative z-10">{link}</span>
                <span className={`absolute bottom-0 left-0 h-[2px] bg-emerald-500 transition-all duration-300 ease-out rounded-full ${isActive ? 'w-full shadow-[0_0_6px_#10b981]' : 'w-0 group-hover:w-full'}`}></span>
              </a>
            );
          })}
        </div>

        {/* Actions (Right) */}
        <div className="hidden md:flex gap-6 lg:gap-4 xl:gap-8 items-center justify-end flex-1">
          <button 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-zinc-500 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-300"
          >
            {isDarkMode ? <Sun size={19} className="hover:rotate-45 transition-transform duration-500 text-amber-400" /> : <Moon size={19} className="hover:-rotate-12 transition-transform duration-500 text-zinc-700" />}
          </button>

          <a
            ref={talkRef}
            href="#contact"
            className="group relative bg-zinc-900 dark:bg-white text-white dark:text-black px-6 lg:px-4 xl:px-6 py-2.5 rounded-full font-mono font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm hover:shadow-emerald-500/20 hover:shadow-lg active:scale-95"
          >
            <span className="flex items-center gap-1.5">
              Let's Talk
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 text-zinc-900 dark:text-white">
            {isDarkMode ? <Sun size={22} className="text-amber-400" /> : <Moon size={22} />}
          </button>
          <button className="p-2 text-zinc-900 dark:text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 top-[60px] w-full h-[calc(100vh-60px)] bg-white/95 dark:bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden z-50 animate-in fade-in duration-300">
          <button className="absolute top-6 right-8 text-zinc-900 dark:text-white" onClick={() => setIsOpen(false)} aria-label="Close menu"><X size={32} /></button>
          {links.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              onClick={() => setIsOpen(false)} 
              className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tight hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            >
              {link}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={() => setIsOpen(false)} 
            className="mt-4 bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-mono font-bold text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-white"
          >
            Let's Talk
          </a>
        </div>
      )}
    </nav>
  );
};

// Splits a word into letters that rise in one after another (hero intro only)
const IntroLetters = ({ text, start = 0, step = 45 }) =>
  [...text].map((ch, i) =>
    ch === ' ' ? ' ' : (
      <span key={i} aria-hidden="true" className="hero-letter" style={{ animationDelay: `${start + i * step}ms` }}>
        {ch}
      </span>
    )
  );

const Hero = () => {
  const connectRef = useMagnetic();
  const cvBaRef = useMagnetic(6);
  const cvUxRef = useMagnetic(6);

  return (
    <section id="profile" className="relative min-h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden px-6 pt-32 md:pt-40 pb-24 transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500/[0.05] dark:bg-emerald-500/[0.03] rounded-full blur-[180px] pointer-events-none z-0"></div>
      
      {/* Floating 3D-like GP Elements in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] text-[20vw] md:text-[12vw] font-black text-zinc-900/[0.07] dark:text-white/[0.07] select-none italic animate-float blur-[3px] transform -rotate-12 drop-shadow-2xl">
          GP
        </div>
        <div className="absolute bottom-[15%] right-[5%] text-[25vw] md:text-[15vw] font-black text-zinc-900/[0.07] dark:text-white/[0.07] select-none italic animate-float-delayed blur-[4px] transform rotate-12 drop-shadow-2xl">
          GP
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col items-center relative z-20 w-full">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {/* Interactive Animated Avatar Frame */}
            <div className="relative group/avatar hero-photo">
              {/* Intro ring that draws itself around the photo */}
              <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute -top-3 -left-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)] -rotate-90 z-20 pointer-events-none text-emerald-500/80">
                <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" pathLength="1" className="hero-ring" />
              </svg>
              {/* Outer pulsing emerald ambient ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-emerald-500/40 via-teal-400/20 to-emerald-600/40 blur-md opacity-70 group-hover/avatar:opacity-100 transition-opacity duration-700 animate-pulse pointer-events-none"></div>
              
              <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-zinc-200 dark:bg-zinc-800 border-4 border-white dark:border-zinc-700 shadow-2xl flex items-center justify-center overflow-hidden flex-shrink-0 relative z-10 transition-transform duration-700 ease-out group-hover/avatar:scale-[1.03] animate-avatar-pulse">
                <img
                  src={profileImg}
                  alt="Geeth Profile"
                  className="w-full h-full object-cover group-hover/avatar:scale-108 group-hover/avatar:rotate-1 transition-transform duration-700 ease-out will-change-transform"
                />
                <div className="absolute inset-0 bg-emerald-500/0 group-hover/avatar:bg-emerald-500/10 transition-colors duration-500 rounded-full pointer-events-none" />
              </div>
            </div>

            {/* Title with Subtle Dynamic Gradient Sweep on Hover */}
            <h1 aria-label="Hi, I'm Geeth" className="text-[13vw] sm:text-[14vw] md:text-[10vw] lg:text-[11vw] font-black text-zinc-900 dark:text-white leading-[0.88] tracking-tight uppercase select-none opacity-95 italic relative z-0 text-center md:text-left transition-all duration-700 hover:scale-[1.01] hover:drop-shadow-[0_0_35px_rgba(16,185,129,0.2)] pl-2 pr-4 py-2">
              <IntroLetters text="HI, I'M" /> <br />
              <span className="inline-block px-1 py-1 bg-gradient-to-r from-zinc-900 via-emerald-600 to-zinc-900 dark:from-white dark:via-emerald-400 dark:to-white bg-clip-text hover:text-transparent transition-all duration-500 animate-text-shimmer">
                <IntroLetters text="GEETH" start={350} step={55} />
              </span>
            </h1>
          </div>

          <div className="mt-4 md:mt-8 max-w-3xl text-center relative z-30 px-6">
            <p style={{ animationDelay: "700ms" }} className="hero-rise text-lg md:text-2xl text-zinc-600 dark:text-gray-400 font-medium leading-relaxed mb-12 italic tracking-tight">
              Leading teams and delivering projects from the ground up taught me that the real challenge isn't just building something it's understanding what people actually need and making it work for them. That's what's pulling me toward <span className="text-zinc-900 dark:text-white font-bold">Project Management</span>, <span className="text-zinc-900 dark:text-white font-bold">Business Analysis</span>, and <span className="text-zinc-900 dark:text-white font-bold">UI/UX design</span>. It's the same instinct behind mastering <span className="text-zinc-900 dark:text-white font-bold">Generative AI</span> for real businesses.
            </p>

            <div className="flex flex-col gap-10 items-center justify-center">
              <div style={{ animationDelay: "850ms" }} className="hero-rise flex flex-col md:flex-row gap-4 md:gap-6 w-full justify-center items-center">
                <a
                  ref={connectRef}
                  href="#contact"
                  className="w-full md:w-auto group relative px-10 py-5 md:px-12 md:py-6 rounded-full font-black text-sm uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center flex-shrink-0 hover:shadow-emerald-500/30 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 animate-gradient-xy"></div>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none"></div>
                  <span className="relative text-white z-10 flex items-center gap-3 italic font-bold tracking-widest whitespace-nowrap">
                    CONNECT WITH ME 
                    <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </a>

                <div className="flex gap-4 w-full md:w-auto">
                  <a
                    ref={cvBaRef}
                    href="/Geeth_CV_OG.pdf"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 group relative px-6 md:px-8 py-5 md:py-6 rounded-full font-black text-sm uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 flex items-center justify-center hover:shadow-emerald-500/10"
                  >
                    <span className="relative z-10 flex items-center gap-2 italic font-bold tracking-widest text-[11px] md:text-sm whitespace-nowrap">
                      CV (BA) 
                      <FileText size={18} className="text-emerald-500 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </span>
                  </a>
                  
                  <a
                    ref={cvUxRef}
                    href="/Geeth_CV_UIUX.pdf"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 group relative px-6 md:px-8 py-5 md:py-6 rounded-full font-black text-sm uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 flex items-center justify-center hover:shadow-emerald-500/10"
                  >
                    <span className="relative z-10 flex items-center gap-2 italic font-bold tracking-widest text-[11px] md:text-sm whitespace-nowrap">
                      CV (UI/UX) 
                      <FileText size={18} className="text-emerald-500 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </span>
                  </a>
                </div>
              </div>

              <div style={{ animationDelay: "1000ms" }} className="hero-rise flex gap-8 items-center justify-center">
                <a
                  href="https://linkedin.com/in/Geeth-Rangika-Pelpola"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group text-zinc-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-white transition-all duration-300 flex items-center gap-3 uppercase text-[11px] font-mono tracking-[0.3em] font-semibold italic"
                >
                  <Linkedin size={20} className="group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300 text-zinc-500 group-hover:text-emerald-500" /> 
                  <span className="relative">
                    LINKEDIN
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
                <a 
                  href="https://github.com/geeth-rp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group text-zinc-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-white transition-all duration-300 flex items-center gap-3 uppercase text-[11px] font-mono tracking-[0.3em] font-semibold italic"
                >
                  <Github size={20} className="group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300 text-zinc-500 group-hover:text-emerald-500" /> 
                  <span className="relative">
                    GITHUB
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
                <a 
                  href="https://www.hackerrank.com/profile/Geeth_rp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group text-zinc-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-white transition-all duration-300 flex items-center gap-3 uppercase text-[11px] font-mono tracking-[0.3em] font-semibold italic"
                >
                  <Code size={20} className="group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300 text-zinc-500 group-hover:text-emerald-500" /> 
                  <span className="relative">
                    HACKERRANK
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Education = () => (
  <section id="education" className="py-24 bg-transparent transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-8">
      <TopicDivider number="02" title="Education" subtitle="ACADEMIC BACKGROUND" />
      <RevealOnScroll>
        <div className="mb-14">
          <span className="text-emerald-600 dark:text-emerald-500 font-mono text-sm uppercase tracking-[0.4em] mb-3 block italic">Academic History</span>
          <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">Education</h2>
        </div>
      </RevealOnScroll>

      {/* Compact, Crisp ArtCraft Academic Grid */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        <RevealOnScroll delay={80} className="h-full">
          <div className="spotlight h-full bg-white dark:bg-zinc-900/60 backdrop-blur-xl p-7 rounded-3xl border-2 border-zinc-200/90 dark:border-white/10 hover:border-emerald-500/60 dark:hover:border-emerald-500/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-400 ease-out group flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/50 dark:border-emerald-500/20 flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                  <DrawIcon icon={GraduationCap} className="text-emerald-600 dark:text-emerald-400" size={24} />
                </div>
                <div className="flex items-center gap-2 text-zinc-500 dark:text-gray-400 font-mono text-xs">
                  <Calendar size={14} className="text-emerald-500" /> Expected: 2027
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-black text-zinc-900 dark:text-white uppercase italic mb-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                BSc (Hons) in Software Engineering
              </h3>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-white/5">
              <a href="https://sltc.ac.lk/" target="_blank" rel="noopener noreferrer" className="group/link text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs italic inline-flex items-center gap-1.5 underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-500 transition-all">
                <span>Sri Lanka Technological Campus</span>
                <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={160} className="h-full">
          <div className="spotlight h-full bg-white dark:bg-zinc-900/60 backdrop-blur-xl p-7 rounded-3xl border-2 border-zinc-200/90 dark:border-white/10 hover:border-blue-500/60 dark:hover:border-blue-500/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-400 ease-out group flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-300/50 dark:border-blue-500/20 flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                  <DrawIcon icon={School} className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div className="flex items-center gap-2 text-zinc-500 dark:text-gray-400 font-mono text-xs">
                  <Calendar size={14} className="text-blue-500" /> Completed: 2020
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-black text-zinc-900 dark:text-white uppercase italic mb-1.5 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                GCE Advanced Level (Technology Stream)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-gray-400 font-medium italic">
                Secondary Education
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-white/5">
              <a href="https://share.google/AYAHVEHQbg4GmOUvs" target="_blank" rel="noopener noreferrer" className="group/link text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs italic inline-flex items-center gap-1.5 underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-500 transition-all">
                <span>St. Thomas' College, Matale</span>
                <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={240} className="h-full">
          <div className="spotlight h-full bg-white dark:bg-zinc-900/60 backdrop-blur-xl p-7 rounded-3xl border-2 border-zinc-200/90 dark:border-white/10 hover:border-teal-500/60 dark:hover:border-teal-500/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-400 ease-out group flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-300/50 dark:border-teal-500/20 flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                  <DrawIcon icon={BookOpen} className="text-teal-600 dark:text-teal-400" size={24} />
                </div>
                <div className="flex items-center gap-2 text-zinc-500 dark:text-gray-400 font-mono text-xs">
                  <Calendar size={14} className="text-teal-500" /> Completed: 2017
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-black text-zinc-900 dark:text-white uppercase italic mb-1.5 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                GCE Ordinary Level
              </h3>
              <p className="text-xs text-zinc-500 dark:text-gray-400 font-medium italic">
                Primary & Secondary Education
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-white/5">
              <a href="https://www.google.com/search?q=christ+church+college+matale" target="_blank" rel="noopener noreferrer" className="group/link text-teal-600 dark:text-teal-400 font-bold uppercase tracking-widest text-xs italic inline-flex items-center gap-1.5 underline underline-offset-4 decoration-teal-500/40 hover:decoration-teal-500 transition-all">
                <span>Christ Church College, Matale</span>
                <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const skills = [
    {
      title: 'Business Analysis', icon: Compass,
      gradient: 'from-teal-400 to-emerald-600', color: 'text-teal-600 dark:text-teal-400',
      tags: ['Requirements Gathering', 'Stakeholder Management', 'Process Modeling', 'BABOK Fundamentals'],
      subtitle: 'Bridging technical delivery with business strategy'
    },
    {
      title: 'UI/UX Design', icon: PenTool,
      gradient: 'from-pink-400 to-rose-600', color: 'text-pink-600 dark:text-pink-400',
      tags: ['User Interface Design', 'User Experience Design', 'Wireframing', 'Prototyping', 'Design Systems'],
      subtitle: 'Designing intuitive, high-converting digital interfaces'
    },
    {
      title: 'AI Design', icon: Cpu,
      gradient: 'from-emerald-400 to-cyan-500', color: 'text-emerald-600 dark:text-emerald-400',
      tags: ['ComfyUI', 'Flux', 'Qwen', 'Z Image Turbo', 'Wan', 'Kling AI', 'Minimax', 'Nanobanana', 'Krea 2'],
      subtitle: 'Next-generation visual workflows & neural synthesis'
    },
    {
      title: 'Prompt Engineering', icon: Terminal,
      gradient: 'from-indigo-400 to-violet-600', color: 'text-indigo-600 dark:text-indigo-400',
      tags: ['Text-to-Image', 'Text-to-Video', 'LLM Prompt Design', 'Workflow Automation'],
      subtitle: 'Precision prompting for production LLMs & generative media'
    },
    {
      title: 'Full-Stack & App Dev', icon: Code2,
      gradient: 'from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-800', color: 'text-zinc-700 dark:text-white',
      tags: ['Flutter', 'React', 'Node.js', 'Tailwind CSS', 'MongoDB', 'Supabase', 'TypeScript', 'Vite', 'HTML', 'CSS', 'LaTeX'],
      subtitle: 'Scalable modern web apps and multi-platform solutions'
    },
    {
      title: 'Data & ML', icon: BrainCircuit,
      gradient: 'from-purple-400 to-fuchsia-600', color: 'text-purple-600 dark:text-purple-400',
      tags: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'PyTorch'],
      subtitle: 'Predictive modeling, analytics & machine learning pipelines'
    },
    {
      title: 'Digital Marketing', icon: TrendingUp,
      gradient: 'from-yellow-400 to-amber-600', color: 'text-yellow-600 dark:text-yellow-400',
      tags: ['Social Media Mgt', 'Content Strategy', 'Brand Identity', 'Campaign Planning', 'Instagram', 'TikTok', 'YouTube', 'Facebook', 'LinkedIn'],
      subtitle: 'Data-driven growth strategies, branding & audience reach'
    },
    {
      title: 'BI & Data Tools', icon: BarChart3,
      gradient: 'from-blue-400 to-indigo-600', color: 'text-blue-600 dark:text-blue-400',
      tags: ['Power BI', 'Excel', 'SQL', 'Google Analytics'],
      subtitle: 'Interactive dashboards, KPIs & enterprise business intelligence'
    },
    {
      title: 'Leadership', icon: Users2,
      gradient: 'from-orange-400 to-red-500', color: 'text-orange-500 dark:text-orange-400',
      tags: ['Team Management', 'Event Planning', 'Project Planning', 'Stakeholder Communication'],
      subtitle: 'Community building, executive leadership & cross-functional coordination'
    }
  ];
  return (
    <section id="skills" className="py-32 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8">
        <TopicDivider number="03" title="Skills" subtitle="TECHNICAL & DOMAIN EXPERTISE" />
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
            return (
              <RevealOnScroll key={i} delay={i * 75} className="h-full">
                <div className="spotlight h-full bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-zinc-200/80 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 ease-out group flex flex-col justify-between relative overflow-hidden">
                  {/* Subtle top subtle edge indicator */}
                  <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/10 to-transparent group-hover:via-emerald-500/50 transition-colors duration-500"></div>

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <AppIcon icon={s.icon} gradient={s.gradient} color={s.color} />
                      <span className="font-mono text-[10px] font-bold text-zinc-600 dark:text-zinc-400 tracking-widest px-2 py-1 rounded bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5">
                        {`0${i + 1}`}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2 uppercase italic tracking-tighter group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {s.title}
                    </h3>
                    {s.subtitle && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-6 italic leading-relaxed min-h-[40px]">{s.subtitle}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-zinc-100 dark:border-white/5">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-gray-300 text-[11px] font-mono font-semibold uppercase tracking-wider hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-400/50 hover:text-emerald-600 dark:hover:text-emerald-400 hover:scale-105 transition-all duration-200"
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
    { title: 'Generative AI & Automation', icon: Cpu, desc: 'Exploring the frontiers of AI with ComfyUI, Flux, and Qwen.' },
    { title: 'Business Analysis & Strategy', icon: Compass, desc: 'Bridging technical delivery with stakeholder needs and process design.' },
    { title: 'UI/UX & Digital Design', icon: PenTool, desc: 'Bridging engineering and aesthetics with Figma and Affinity.' },
    { title: 'Community Leadership', icon: Users2, desc: 'Dedicated to giving back to the tech community via IEEE.' }
  ];
  return (
    <section id="interests" className="py-32 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8">
        <TopicDivider number="04" title="Interests" subtitle="EXPLORATION & PASSION" />
        <RevealOnScroll>
          <h2 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter mb-24 text-center leading-none">Interests</h2>
        </RevealOnScroll>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {interests.map((item, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <div className="spotlight flex flex-col items-center text-center group p-6 rounded-3xl transition-all duration-500 hover:-translate-y-2 relative">
                {/* Modern ArtCraft-style Visualized Tech Badge */}
                <div className="relative mb-6">
                  {/* Subtle ambient emerald backglow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-emerald-500/25 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/10 flex items-center justify-center relative z-10 shadow-md group-hover:border-emerald-500/60 group-hover:shadow-emerald-500/20 group-hover:shadow-xl group-hover:scale-105 transition-all duration-500">
                    {/* Micro Tech HUD Frame Markers */}
                    <div className="absolute top-1.5 left-1.5 w-1.5 h-[1px] bg-zinc-300 dark:bg-white/20"></div>
                    <div className="absolute top-1.5 left-1.5 w-[1px] h-1.5 bg-zinc-300 dark:bg-white/20"></div>
                    <div className="absolute bottom-1.5 right-1.5 w-1.5 h-[1px] bg-zinc-300 dark:bg-white/20"></div>
                    <div className="absolute bottom-1.5 right-1.5 w-[1px] h-1.5 bg-zinc-300 dark:bg-white/20"></div>

                    {/* Numeric mini badge */}
                    <span className="absolute -top-2 -right-2 font-mono text-[9px] font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-black px-1.5 py-0.5 rounded border border-zinc-200/80 dark:border-white/10">
                      {`0${i + 1}`}
                    </span>

                    <div className="w-16 h-16 rounded-xl bg-zinc-50 dark:bg-black/50 flex items-center justify-center border border-zinc-100 dark:border-white/5 group-hover:bg-emerald-50/60 dark:group-hover:bg-emerald-950/30 transition-colors duration-500">
                      <DrawIcon
                        icon={item.icon}
                        className="text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-500"
                        size={26}
                      />
                    </div>
                  </div>
                </div>

                <h4 className="text-zinc-900 dark:text-white font-black uppercase italic tracking-widest text-[11px] mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{item.title}</h4>
                <p className="text-[10px] text-zinc-500 dark:text-gray-400 leading-relaxed uppercase font-mono font-bold tracking-[0.16em]">{item.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const experiences = [
    { 
      title: 'Vice-Chairperson', 
      org: 'IEEE Computer Society Student Branch Chapter, SLTC', 
      status: '2025 – 2026',
      desc: 'Leading chapter initiatives, student engineering development, and cross-university technical symposiums.'
    },
    { 
      title: 'Logistics Sub-Committee Head', 
      org: 'IEEE CS Student Branch Chapter, SLTC', 
      status: '2024 – 2025',
      desc: 'Orchestrating event infrastructure, procurement, and on-ground technical logistics.'
    },
    { 
      title: 'Founder', 
      org: 'Pixlore AI Studio', 
      status: 'Ongoing',
      desc: 'Building AI influencer models and promotional video/motion content across TikTok, YouTube, and Facebook.'
    },
    { 
      title: 'Co-Chair', 
      org: 'IEEE Codemania V5.0 — IEEE CS Student Branch Chapter, SLTC', 
      status: 'Completed',
      desc: 'Spearheaded flagship competitive programming hackathon with inter-university participation.'
    },
    { 
      title: 'Coordination Team Head', 
      org: 'IEEE Day 2025 — IEEE CS Student Branch Chapter, SLTC', 
      status: 'Completed',
      desc: 'Managed operations, volunteer tracks, and execution for the IEEE Day annual celebration.'
    },
    { 
      title: 'Program Team Head', 
      org: 'Arduino Challenge 2025 / Decode Xtreme 2024 / Git Genius 2024', 
      status: 'Completed',
      desc: 'Directed curriculum, challenge design, and competitive timelines for developer challenges.'
    },
    { 
      title: 'Marketing & Promotion Head, Master Designer', 
      org: 'SLTC Media Unit', 
      status: 'Completed',
      desc: 'Produced branding assets, digital outreach campaigns, and event coverage design systems.'
    }
  ];

  const photos = [
    { src: exp1, label: 'IEEE CS Recognition', isPortrait: true },
    { src: exp2, label: 'Executive Committee', isPortrait: false },
    { src: exp3, label: 'Event Technical Operations', isPortrait: false },
    { src: exp4, label: 'Vice Chairperson Appointment', isPortrait: true },
    { src: exp5, label: 'Speech & Keynote Delivery', isPortrait: false },
    { src: exp6, label: 'Project Coordination', isPortrait: false },
    { src: exp7, label: 'Workshop Mentorship', isPortrait: false },
    { src: exp8, label: 'Leadership Summit', isPortrait: false }
  ];

  const originRectRef = useRef(null);
  const viewerCardRef = useRef(null);
  const touchStartRef = useRef(null);
  const isViewerOpen = selectedPhoto !== null;

  const openPhoto = (index, e) => {
    originRectRef.current = e.currentTarget.getBoundingClientRect();
    setSelectedPhoto(index);
  };
  const closePhoto = () => setSelectedPhoto(null);
  const showPrev = () => setSelectedPhoto((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  const showNext = () => setSelectedPhoto((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  // Keyboard controls + lock page scroll while the viewer is open
  useEffect(() => {
    if (!isViewerOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closePhoto();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isViewerOpen]);

  // Grow the viewer out of the thumbnail that was clicked
  useLayoutEffect(() => {
    const card = viewerCardRef.current;
    const origin = originRectRef.current;
    if (!isViewerOpen || !card) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!origin || reduceMotion || !card.animate) return;
    const target = card.getBoundingClientRect();
    const dx = origin.left + origin.width / 2 - (target.left + target.width / 2);
    const dy = origin.top + origin.height / 2 - (target.top + target.height / 2);
    const scale = Math.max(origin.width / target.width, 0.08);
    card.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0.3 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1 }
      ],
      { duration: 520, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    );
  }, [isViewerOpen]);

  const handleTouchStart = (e) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const handleTouchEnd = (e) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? showNext() : showPrev();
    }
  };

  return (
    <section id="experience" className="py-32 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8">
        <TopicDivider number="05" title="Experience" subtitle="LEADERSHIP & HONORS" />
        <RevealOnScroll>
          <div className="mb-20">
            <span className="text-emerald-600 dark:text-emerald-500 font-mono text-sm uppercase tracking-widest mb-4 block italic tracking-[0.5em]">HONORS, AWARDS & LEADERSHIP</span>
            <h2 className="text-5xl sm:text-6xl md:text-[7.5rem] font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">Experience</h2>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: List with Detailed Content */}
          <div className="lg:col-span-6 flex flex-col gap-3.5 sm:gap-4 order-2 lg:order-1">
            {experiences.map((exp, i) => (
              <RevealOnScroll key={i} delay={i * 60}>
                <div className="spotlight p-5 sm:p-7 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl rounded-[1.75rem] sm:rounded-[2rem] border border-zinc-200/80 dark:border-white/10 shadow-lg hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 ease-out group relative overflow-hidden">
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent group-hover:via-emerald-500/50 transition-colors duration-500"></div>

                  <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-2.5 mb-2">
                    <h3 className="text-base sm:text-xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-950 text-zinc-600 dark:text-gray-300 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex-shrink-0 group-hover:border-emerald-500/40 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {exp.status}
                    </div>
                  </div>

                  <p className="text-zinc-700 dark:text-zinc-300 font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] text-[11px] sm:text-xs mb-2">
                    {exp.org}
                  </p>

                  {exp.desc && (
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed text-justify sm:text-left">
                      {exp.desc}
                    </p>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Right Column: Large Fluid ArtCraft Orbital Radar Stage (Mobile Optimized) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center py-4 sm:py-6 order-1 lg:order-2 overflow-hidden sm:overflow-visible">
            <RevealOnScroll delay={200}>
              <div className="relative w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] lg:w-[620px] lg:h-[620px] flex items-center justify-center select-none overflow-visible mx-auto">
                {/* ArtCraft Multi-Track Orbital Rings */}
                <div className="absolute inset-0 rounded-full border border-zinc-200/50 dark:border-white/5 pointer-events-none"></div>
                <div className="absolute inset-[-12px] sm:inset-[-15px] rounded-full border border-dashed border-zinc-300/60 dark:border-white/10 pointer-events-none"></div>
                <div className="absolute inset-10 sm:inset-14 rounded-full border border-emerald-500/20 dark:border-emerald-500/25 pointer-events-none"></div>
                <div className="absolute inset-20 sm:inset-28 rounded-full border border-zinc-200/60 dark:border-white/5 pointer-events-none"></div>

                {/* ArtCraft Neon Spectral Arc Accents */}
                <div className="absolute inset-[-16px] sm:inset-[-20px] rounded-full border-2 border-transparent border-t-emerald-500/40 border-r-cyan-500/30 pointer-events-none -rotate-45"></div>
                <div className="absolute inset-8 sm:inset-10 rounded-full border-2 border-transparent border-b-purple-500/30 border-l-emerald-500/30 pointer-events-none rotate-12"></div>

                {/* Subtle Radial Center Glow */}
                <div className="absolute w-44 sm:w-60 h-44 sm:h-60 rounded-full bg-emerald-500/10 blur-2xl sm:blur-3xl pointer-events-none"></div>

                {/* Center Core: Minimalist ArtCraft HUD Radar Focus */}
                <div className="relative z-10 w-20 h-20 sm:w-26 sm:h-26 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-zinc-200/90 dark:border-white/15 shadow-2xl flex items-center justify-center pointer-events-none">
                  <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-dashed border-zinc-300 dark:border-white/20 animate-spin" style={{ animationDuration: '24s' }}></div>
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-emerald-500 shadow-[0_0_14px_#10b981]"></div>
                </div>

                {/* Outer Orbit (4 items) - Perfectly upright circular orbit */}
                <div className="absolute inset-0 animate-orbit-slow pointer-events-none">
                  {photos.slice(0, 4).map((item, index) => {
                    const angleDeg = index * 90 + 45;

                    return (
                      <div
                        key={index}
                        style={{
                          transform: `rotate(${angleDeg}deg) translateY(calc(-1 * clamp(110px, 30vw, 240px)))`,
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                      >
                        {/* Counter-rotate both the initial angle AND the continuous orbit rotation */}
                        <div
                          style={{ transform: `rotate(-${angleDeg}deg)` }}
                        >
                          <div className="animate-orbit-reverse">
                            <button
                              onClick={(e) => openPhoto(index, e)}
                              className="group/card focus:outline-none transition-transform duration-300 hover:scale-115 sm:hover:scale-120 hover:z-30 cursor-pointer block relative"
                              title={item.label}
                            >
                              <div className="absolute -inset-1.5 sm:-inset-2 rounded-2xl bg-emerald-500/30 blur-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

                              {/* Dedicated Aspect Ratio: Portrait (9:16) or Landscape (16:9) without ANY cropping */}
                              <div className={`${item.isPortrait ? 'w-16 h-24 sm:w-22 sm:h-32 lg:w-26 lg:h-38' : 'w-22 h-15 sm:w-32 sm:h-22 lg:w-40 lg:h-26'} rounded-xl sm:rounded-2xl p-[1.5px] bg-gradient-to-br from-white/90 via-zinc-200 to-zinc-400 dark:from-white/30 dark:via-white/10 dark:to-white/5 shadow-xl sm:shadow-2xl group-hover/card:from-emerald-400 group-hover/card:to-cyan-400 transition-all duration-300`}>
                                <div className="w-full h-full rounded-[10px] sm:rounded-[14px] overflow-hidden bg-zinc-950 flex items-center justify-center relative p-0.5">
                                  <img
                                    src={item.src}
                                    alt={item.label}
                                    className="w-full h-full object-cover rounded-[8px] sm:rounded-[12px] group-hover/card:scale-110 transition-transform duration-500 select-none opacity-95 group-hover/card:opacity-100"
                                    draggable="false"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-[10px] sm:rounded-[14px]"></div>
                                </div>
                              </div>

                              <span className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 font-mono text-[8px] sm:text-[9px] font-bold bg-white/95 dark:bg-black/95 text-zinc-900 dark:text-white px-1.5 sm:px-2 py-0.5 rounded-md border border-zinc-200 dark:border-white/20 shadow-md backdrop-blur-sm">
                                {`0${index + 1}`}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Inner Orbit (4 items) - Perfectly upright circular orbit */}
                <div className="absolute inset-0 animate-orbit-fast-reverse pointer-events-none">
                  {photos.slice(4, 8).map((item, index) => {
                    const angleDeg = index * 90;

                    return (
                      <div
                        key={index + 4}
                        style={{
                          transform: `rotate(${angleDeg}deg) translateY(calc(-1 * clamp(70px, 18vw, 145px)))`,
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                      >
                        {/* Counter-rotate initial angle AND continuous inner reverse orbit */}
                        <div
                          style={{ transform: `rotate(-${angleDeg}deg)` }}
                        >
                          <div className="animate-orbit-fast">
                            <button
                              onClick={(e) => openPhoto(index + 4, e)}
                              className="group/card focus:outline-none transition-transform duration-300 hover:scale-115 sm:hover:scale-120 hover:z-30 cursor-pointer block relative"
                              title={item.label}
                            >
                              <div className="absolute -inset-1.5 sm:-inset-2 rounded-2xl bg-cyan-500/30 blur-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

                              {/* Dedicated Aspect Ratio: Portrait (9:16) or Landscape (16:9) without ANY cropping */}
                              <div className={`${item.isPortrait ? 'w-14 h-20 sm:w-18 sm:h-28 lg:w-22 lg:h-32' : 'w-18 h-12 sm:w-26 sm:h-18 lg:w-32 lg:h-22'} rounded-xl sm:rounded-2xl p-[1.5px] bg-gradient-to-br from-white/80 via-zinc-200 to-zinc-400 dark:from-white/25 dark:via-white/10 dark:to-transparent shadow-lg group-hover/card:from-cyan-400 group-hover/card:to-emerald-400 transition-all duration-300`}>
                                <div className="w-full h-full rounded-[10px] sm:rounded-[14px] overflow-hidden bg-zinc-950 flex items-center justify-center relative p-0.5">
                                  <img
                                    src={item.src}
                                    alt={item.label}
                                    className="w-full h-full object-cover rounded-[8px] sm:rounded-[12px] group-hover/card:scale-110 transition-transform duration-500 select-none opacity-95 group-hover/card:opacity-100"
                                    draggable="false"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-[10px] sm:rounded-[14px]"></div>
                                </div>
                              </div>

                              <span className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 font-mono text-[8px] sm:text-[9px] font-bold bg-white/95 dark:bg-black/95 text-zinc-900 dark:text-white px-1.5 sm:px-2 py-0.5 rounded-md border border-zinc-200 dark:border-white/20 shadow-md backdrop-blur-sm">
                                {`0${index + 5}`}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Minimal Clean Instruction */}
              <div className="mt-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-400 flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Click any moment to view all photos
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* ArtCraft Inspection Viewport Modal with All Photos Carousel */}
        {selectedPhoto !== null && (
          <div 
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="viewer-backdrop fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-6 select-none"
            onClick={closePhoto}
          >
            {/* Top Close Button */}
            <div className="mb-3">
              <button
                onClick={closePhoto}
                aria-label="Close photo viewer"
                className="w-11 h-11 rounded-full bg-white/10 dark:bg-zinc-900/90 text-white border border-white/20 hover:border-emerald-500 hover:bg-emerald-500 hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-2xl focus:outline-none"
                title="Close Viewport (Esc)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Card with HUD Bezel (Adaptive 16:9 / 9:16 support without any image cropping) */}
            <div
              ref={viewerCardRef}
              className="relative max-w-4xl w-full bg-zinc-950/95 rounded-[2.5rem] border border-white/15 p-5 sm:p-6 shadow-2xl shadow-black/80 overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent"></div>

              {/* Main Image Stage (Contain mode so portrait 9:16 and landscape 16:9 never crop) */}
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative rounded-[2rem] overflow-hidden bg-black/95 h-[50vh] sm:h-[60vh] max-h-[580px] border border-white/10 shadow-2xl flex items-center justify-center group/stage touch-pan-y"
              >
                <img
                  key={selectedPhoto}
                  src={photos[selectedPhoto].src}
                  alt={photos[selectedPhoto].label}
                  className="viewer-img max-h-full max-w-full object-contain pointer-events-none select-none"
                  draggable="false"
                />

                {/* Previous Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Previous photo"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-emerald-500 text-white flex items-center justify-center border border-white/20 transition-all duration-300 focus:outline-none hover:scale-110"
                  title="Previous Photo"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Next Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next photo"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-emerald-500 text-white flex items-center justify-center border border-white/20 transition-all duration-300 focus:outline-none hover:scale-110"
                  title="Next Photo"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Photo Counter Pill */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 font-mono text-[9px] sm:text-[10px] text-white font-bold">
                  {selectedPhoto + 1} / {photos.length}
                </div>
              </div>

              {/* Caption & Info Header */}
              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 px-1 sm:px-2">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="font-mono text-[8px] sm:text-[9px] font-bold text-emerald-400 uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                      Leadership Archive • Visual Record
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white uppercase italic tracking-tight">
                    {photos[selectedPhoto].label}
                  </h4>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="font-mono text-[8px] sm:text-[9px] text-zinc-400 uppercase tracking-widest bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    SLTC IEEE Chapter
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip with Aspect Ratio Preservation */}
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10 flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                {photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhoto(idx)}
                    className={`relative flex-shrink-0 ${p.isPortrait ? 'w-10 h-14 sm:w-12 sm:h-16' : 'w-14 h-10 sm:w-18 sm:h-12'} rounded-lg sm:rounded-xl overflow-hidden border transition-all duration-300 focus:outline-none ${
                      selectedPhoto === idx 
                        ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/30 ring-1 ring-emerald-500' 
                        : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={p.src}
                      alt={p.label}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0.5 right-0.5 font-mono text-[7px] font-bold bg-black/80 text-white px-1 rounded">
                      {`0${idx + 1}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const CertificatesAndProjects = () => {
  const projects = [
    {
      title: "Impact of Generative AI on Teenagers' Cognitive Development",
      icon: BrainCircuit,
      category: "ACADEMIC PROJECT",
      status: "ONGOING",
      desc: "Developing a metacognition-oriented AI agent using Socratic questioning and adaptive scaffolding to foster critical thinking in teenagers.",
      tags: ["FLUTTER", "PYTHON (FLASK)", "SUPABASE", "OPENAI API", "GEMINI API"]
    },
    {
      title: "SmartCare: Patient Readmission Prediction",
      icon: HeartPulse,
      category: "ACADEMIC PROJECT",
      status: "COMPLETED",
      desc: "ML pipeline to predict 30-day hospital patient readmissions using Random Forest, Decision Tree, XGBoost, and KNN models on a 1,000-record clinical dataset. Applied SHAP for model explainability and deployed a Streamlit prototype for clinical decision support, achieving ROC-AUC of 0.942 with 100% recall.",
      tags: ["PYTHON", "SCIKIT-LEARN", "XGBOOST", "SHAP", "PANDAS", "STREAMLIT"],
      github: "https://github.com/omega-u20/SmartCare-HospitalManagement"
    },
    {
      title: "OGBN-Arxiv GNN Node Classification",
      icon: Network,
      category: "ACADEMIC PROJECT",
      status: "COMPLETED",
      desc: "Implemented and compared GCN and GAT models for node classification on a 169,343-node citation dataset. Achieved 54.6% test accuracy with explainability analysis via t-SNE embeddings and GAT attention weights, presented via an interactive Streamlit dashboard.",
      tags: ["PYTHON", "PYTORCH", "PYTORCH GEOMETRIC", "SCIKIT-LEARN", "STREAMLIT", "GOOGLE COLAB"],
      github: "https://github.com/geeth-rp/CCS4354-OGBN-Arxiv-GNN"
    },
    {
      title: "Pixlore AI Studio",
      icon: Sparkles,
      category: "PERSONAL PROJECT",
      status: "COMPLETED",
      desc: "Built an AI-driven fashion platform enabling customers to browse and purchase tailored AI-generated product images and videos.",
      tags: ["REACT 19", "VITE", "TYPESCRIPT", "TAILWIND CSS"],
      live: "https://pixlore-web.vercel.app/"
    },
    {
      title: "Utopia – Smart Town Management",
      icon: Building2,
      category: "ACADEMIC PROJECT",
      status: "COMPLETED",
      desc: "Smart city platform with a citizen mobile app and web dashboard for real-time reporting, public services, and emergency notifications.",
      tags: ["FLUTTER", "DART", "REACT", "NODE.JS", "JAVASCRIPT"],
      github: "https://github.com/omega-u20/utopia"
    }
  ];

  const certificateCategories = [
    {
      title: "Business Analysis",
      certificates: [
        {
          name: "Power BI for Beginners",
          icon: BarChart3,
          desc: "Demonstrated proficiency in Power BI fundamentals and data visualization",
          issuer: "Simplilearn SkillUp",
          year: "2026",
          image: certSimplilearn,
          link: "https://simpli-web.app.link/e/mc8h2eQh76b"
        },
        {
          name: "SQL (Basic)",
          icon: Database,
          desc: "Demonstrated proficiency in basic SQL queries and data manipulation",
          issuer: "HackerRank",
          year: "2026",
          image: certIeeeMember,
          link: "https://www.hackerrank.com/certificates/8d37badcae27"
        },
        {
          name: "Business Analysis Basics",
          icon: Compass,
          desc: "Foundational course covering business analysis concepts and processes",
          issuer: "Simplilearn SkillUp",
          year: "2026",
          image: certSimplilearn,
          link: "https://simpli-web.app.link/e/PsqS2x9iK6b"
        }
      ]
    },
    {
      title: "UI/UX & AI Content Generation",
      certificates: [
        {
          name: "React (Basic)",
          icon: Atom,
          desc: "Demonstrated proficiency in React fundamental concepts",
          issuer: "HackerRank",
          year: "2026",
          image: certIeeeMember,
          link: "https://www.hackerrank.com/certificates/112a45ce050c"
        },
        {
          name: "Create Engaging Video with Google Vids",
          icon: Clapperboard,
          desc: "Demonstrated proficiency in creating engaging videos using Google Vids",
          issuer: "Simplilearn SkillUp",
          year: "2026",
          image: certSimplilearn,
          link: "https://simpli-web.app.link/e/fuOGf36H06b"
        },
        {
          name: "Introduction to Generative AI Studio",
          icon: WandSparkles,
          desc: "Demonstrated proficiency in Generative AI Studio",
          issuer: "Simplilearn SkillUp",
          year: "2026",
          image: certSimplilearn,
          link: "https://simpli-web.app.link/e/AODVyeev26b"
        }
      ]
    },
    {
      title: "Others",
      certificates: [
        {
          name: "Software Engineer Intern",
          icon: Briefcase,
          desc: "Certification for software engineering intern technical skills",
          issuer: "HackerRank",
          year: "2026",
          image: certIeeeCs,
          link: "https://www.hackerrank.com/certificates/3a4c8c02dac8"
        },
        {
          name: "Certificate of Appreciation — Vice-Chairperson",
          icon: Medal,
          desc: "IEEE CS Student Branch Chapter of SLTC",
          issuer: "IEEE CS",
          year: "2025",
          image: certIeeeCs,
          link: "https://drive.google.com/file/d/1jLO6BqpjdSUvk0l3no3-NB6fjBd717Ba/view?usp=sharing"
        },
        {
          name: "IEEE Membership",
          icon: BadgeCheck,
          desc: "IEEE Student Branch of SLTC",
          issuer: "IEEE",
          year: "2024",
          image: certIeeeMember,
          link: "https://drive.google.com/file/d/1td8-l1EJp5S5t-UdjpesT4918HUrOrdX/view?usp=sharing"
        }
      ]
    }
  ];

  return (
    <section className="py-32 bg-transparent transition-colors duration-300 border-t border-zinc-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-8">

        {/* Projects Section */}
        <div id="projects" className="mb-24">
          <TopicDivider number="06" title="Projects" subtitle="ENGINEERING & BUSINESS PORTFOLIO" />
          <RevealOnScroll>
            <div className="mb-16">
              <span className="text-emerald-600 dark:text-emerald-500 font-mono text-sm uppercase tracking-widest mb-4 block italic tracking-[0.4em]">Portfolio</span>
              <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">Projects</h2>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <RevealOnScroll key={i} delay={i * 90} className="h-full">
                <div className="spotlight h-full bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl p-10 rounded-[3rem] border border-white/50 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 ease-out group flex flex-col justify-between relative">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <DrawIcon icon={p.icon || Layout} className="text-emerald-600 dark:text-emerald-400" size={24} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-gray-400">
                          {p.category}
                        </span>
                        <span className={`inline-block px-3 py-1 rounded-full border text-[9px] font-mono font-black uppercase tracking-widest shadow-sm transition-all duration-300 ${p.status === 'ONGOING' ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 group-hover:border-emerald-400' : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-white group-hover:border-emerald-400/50'}`}>
                          {p.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tight mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed mb-8">{p.desc}</p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {p.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white dark:bg-black/50 border border-zinc-200 dark:border-white/10 rounded-full text-[10px] font-mono font-bold text-zinc-500 dark:text-gray-400 uppercase tracking-widest hover:border-emerald-400/50 hover:text-emerald-500 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer links */}
                    {(p.github || p.live) && (
                      <div className="flex items-center gap-6 pt-6 border-t border-zinc-200 dark:border-white/10">
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center gap-2 text-zinc-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-white transition-colors text-[10px] font-mono font-black uppercase tracking-widest">
                            <Github size={16} className="group-hover/btn:scale-110 transition-transform" /> GitHub
                          </a>
                        )}
                        {p.live && (
                          <a href={p.live} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center gap-2 text-zinc-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-white transition-colors text-[10px] font-mono font-black uppercase tracking-widest">
                            <ExternalLink size={16} className="group-hover/btn:scale-110 group-hover/btn:-translate-y-0.5 transition-transform" /> Web Link
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div id="certificates">
          <TopicDivider number="07" title="Certificates" subtitle="VERIFIED CREDENTIALS & BADGES" />
          <RevealOnScroll>
            <div className="mb-14">
              <span className="text-emerald-600 dark:text-emerald-500 font-mono text-xs uppercase tracking-[0.3em] mb-3 block font-bold">
                Credentials & Accreditation
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">
                Certificates
              </h2>
            </div>
          </RevealOnScroll>

          <div className="space-y-12">
            {certificateCategories.map((category, catIndex) => (
              category.certificates.length > 0 && (
                <div key={catIndex}>
                  <RevealOnScroll>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
                      <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tight">
                        {category.title}
                      </h3>
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-zinc-200 dark:from-white/10 to-transparent ml-2"></div>
                      <span className="font-mono text-[10px] text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-widest">
                        {category.certificates.length} credentials
                      </span>
                    </div>
                  </RevealOnScroll>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {category.certificates.map((cert, i) => (
                      <RevealOnScroll key={cert.name} delay={i * 70} className="h-full">
                        <a
                          href={cert.link || "#"}
                          target={cert.link ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          className="spotlight h-full flex flex-col justify-between p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-zinc-200/80 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group relative overflow-hidden"
                        >
                          {/* Top subtle line */}
                          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent group-hover:via-emerald-500/60 transition-colors duration-500"></div>

                          <div>
                            {/* Header row: Tech badge icon + Year Pill */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-black/60 border border-zinc-200/90 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/40 group-hover:bg-emerald-50/50 dark:group-hover:bg-emerald-950/20 transition-all duration-300 shadow-sm">
                                <DrawIcon icon={cert.icon || Award} size={18} />
                              </div>
                              <span className="font-mono text-[10px] font-bold text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10">
                                {cert.year}
                              </span>
                            </div>

                            {/* Title with external link arrow */}
                            <h4 className="text-base font-black text-zinc-900 dark:text-white uppercase italic tracking-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 flex items-start justify-between gap-2 leading-snug">
                              <span>{cert.name}</span>
                              {cert.link && (
                                <ExternalLink size={14} className="text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1" />
                              )}
                            </h4>

                            {/* Description */}
                            <p className="text-zinc-600 dark:text-gray-400 text-xs leading-relaxed mb-4">
                              {cert.desc}
                            </p>
                          </div>

                          {/* Footer: Issuer tag & Verified credential status */}
                          <div className="pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between mt-auto">
                            <span className="font-mono text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider bg-zinc-100/80 dark:bg-black/40 px-2 py-1 rounded border border-zinc-200/60 dark:border-white/5">
                              {cert.issuer}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                              <ShieldCheck size={12} />
                              Verified
                            </span>
                          </div>
                        </a>
                      </RevealOnScroll>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};


const Contact = () => {
  const submitRef = useMagnetic(5);

  return (
    <section id="contact" className="py-32 bg-transparent relative overflow-hidden transition-colors duration-300">
      <div className="absolute bottom-0 right-0 text-[20vw] font-black text-zinc-900/[0.03] dark:text-white/[0.02] pointer-events-none select-none uppercase italic leading-none translate-y-1/4">GP</div>
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <TopicDivider number="08" title="Contact" subtitle="DIRECT TRANSMISSION" />
        <div className="grid lg:grid-cols-2 gap-20">
          <RevealOnScroll>
            <h2 className="text-7xl md:text-9xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter mb-8 leading-[0.85]">CONNECT <br />WITH ME</h2>
            <p className="text-zinc-600 dark:text-gray-400 text-xl mb-12 max-w-md leading-relaxed italic">
              Open to collaborative projects and hands-on learning opportunities. Let's build the future together.
            </p>
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <a href="mailto:pelpolageeth@gmail.com" className="flex items-center gap-6 group/link">
                  <AppIcon icon={Mail} gradient="from-zinc-400 to-zinc-600 dark:from-zinc-700 dark:to-black" color="text-zinc-900 dark:text-white" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 dark:text-gray-400 font-bold mb-1 italic">Direct Transmission</div>
                    <div className="text-xl text-zinc-900 dark:text-white font-bold group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors duration-300">pelpolageeth@gmail.com</div>
                  </div>
                </a>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <a href="tel:+94766938306" className="flex items-center gap-6 group/link">
                  <AppIcon icon={Smartphone} gradient="from-teal-400 to-emerald-600 dark:from-teal-600 dark:to-emerald-800" color="text-teal-700 dark:text-white" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 dark:text-gray-400 font-bold mb-1 italic">Phone Number</div>
                    <div className="text-xl text-zinc-900 dark:text-white font-bold group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors duration-300">+94 766 938 306</div>
                  </div>
                </a>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <a href="https://linkedin.com/in/Geeth-Rangika-Pelpola" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group/link">
                  <AppIcon icon={Linkedin} gradient="from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800" color="text-blue-700 dark:text-white" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 dark:text-gray-400 font-bold mb-1 italic">Professional</div>
                    <div className="text-xl text-zinc-900 dark:text-white font-bold group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors duration-300">Geeth-Rangika-Pelpola</div>
                  </div>
                </a>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <a href="https://github.com/geeth-rp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group/link">
                  <AppIcon icon={Github} gradient="from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-800" color="text-zinc-900 dark:text-white" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 dark:text-gray-400 font-bold mb-1 italic">Source Code</div>
                    <div className="text-xl text-zinc-900 dark:text-white font-bold group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors duration-300">geeth-rp</div>
                  </div>
                </a>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <a href="https://www.hackerrank.com/profile/Geeth_rp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group/link">
                  <AppIcon icon={Code} gradient="from-emerald-400 to-teal-600 dark:from-emerald-600 dark:to-teal-800" color="text-emerald-700 dark:text-white" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 dark:text-gray-400 font-bold mb-1 italic">Problem Solving</div>
                    <div className="text-xl text-zinc-900 dark:text-white font-bold group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors duration-300">Geeth_rp</div>
                  </div>
                </a>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay="200">
            <div className="spotlight bg-white dark:bg-zinc-900/80 p-10 md:p-12 rounded-[4rem] border border-zinc-200 dark:border-white/10 relative overflow-hidden group shadow-2xl backdrop-blur-md hover:border-emerald-500/30 transition-all duration-500">
              <form action="https://formspree.io/f/mojgorrl" method="POST" className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-gray-500 font-bold block pl-2 italic">First Name</label>
                    <input name="firstName" type="text" required className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-5 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all focus:bg-white dark:focus:bg-black/60 shadow-inner" placeholder="Geeth" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-gray-500 font-bold block pl-2 italic">Last Name</label>
                    <input name="lastName" type="text" required className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-5 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all focus:bg-white dark:focus:bg-black/60 shadow-inner" placeholder="Pelpola" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-gray-500 font-bold block pl-2 italic">Email Address</label>
                  <input name="email" type="email" required className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-5 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all focus:bg-white dark:focus:bg-black/60 shadow-inner" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-gray-500 font-bold block pl-2 italic">Message</label>
                  <textarea name="message" required rows="4" className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-5 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all focus:bg-white dark:focus:bg-black/60 shadow-inner" placeholder="How can we build the future together?"></textarea>
                </div>
                <button ref={submitRef} type="submit" className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-6 md:py-7 rounded-2xl font-mono font-bold uppercase tracking-[0.35em] text-[11px] hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-xl group/btn overflow-hidden relative active:scale-[0.99]">
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none"></div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    Launch Transmission <ArrowRight className="group-hover/btn:translate-x-2 transition-transform duration-300" />
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
      <div className="text-2xl font-black text-zinc-900 dark:text-white italic tracking-tighter group">
        <a href="#profile">
          GEETH<span className="text-emerald-500 inline-block group-hover:scale-125 transition-transform duration-300">.</span>
        </a>
      </div>
      <div className="text-[10px] font-mono uppercase tracking-[0.4em] font-semibold text-zinc-500 dark:text-gray-500 italic">
        GEETH PELPOLA DESIGN PHILOSOPHY © 2026
      </div>
      <div className="flex gap-8">
        <a href="https://linkedin.com/in/Geeth-Rangika-Pelpola" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-xl text-zinc-500 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"><Linkedin size={20} /></a>
        <a href="https://github.com/geeth-rp" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-xl text-zinc-500 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"><Github size={20} /></a>
        <a href="https://www.hackerrank.com/profile/Geeth_rp" target="_blank" rel="noopener noreferrer" aria-label="HackerRank" className="p-2 rounded-xl text-zinc-500 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"><Code size={20} /></a>
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

  useEffect(() => {
    // iOS Safari only applies :active (tap feedback) once a touch listener exists
    const noop = () => {};
    document.addEventListener('touchstart', noop, { passive: true });

    // Cursor glow: one shared listener feeds the pointer position to whichever .spotlight card is hovered
    const handleMove = (e) => {
      const card = e.target.closest?.('.spotlight');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    const glow = canUseHoverMotion();
    if (glow) window.addEventListener('pointermove', handleMove, { passive: true });

    return () => {
      document.removeEventListener('touchstart', noop);
      if (glow) window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="text-zinc-900 dark:text-white font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden antialiased min-h-screen transition-colors duration-300">
      <div className="fixed inset-0 z-[-20] bg-gray-50 dark:bg-black transition-colors duration-300 pointer-events-none" />
      <style>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 10s ease-in-out infinite 4s;
        }
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 8s ease infinite;
        }
        @keyframes avatar-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { transform: scale(1.015); box-shadow: 0 0 35px 8px rgba(16, 185, 129, 0.25); }
        }
        .animate-avatar-pulse {
          animation: avatar-pulse 5s ease-in-out infinite;
        }
        @keyframes hud-arrival {
          0% {
            opacity: 0;
            transform: translateY(-8px) scale(0.92);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px);
          }
        }
        .animate-hud-arrival {
          animation: hud-arrival 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <InteractiveBackground />
      <ScrollSidebar />
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Hero />
      <Education />
      <Skills />
      <Interests />
      <Experience />
      <CertificatesAndProjects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;