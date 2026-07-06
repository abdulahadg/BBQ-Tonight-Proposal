import React from 'react';
import { motion } from 'motion/react';
import { Slide } from '../types';
import { 
  ChefHat, Flame, Crown, Sparkles, Calendar, CookingPot, 
  MapPin, Users, ArrowUpRight, CheckCircle2, Check, Phone, 
  Globe, Mail, Compass, Utensils, Zap, ShieldCheck 
} from 'lucide-react';

interface SlideRendererProps {
  key?: any;
  slide: Slide;
  orthodonticsClinicUrl: string;
  patientInteractionUrl: string;
  dentistPortraitUrl: string;
}

export default function SlideRenderer({ 
  slide, 
  orthodonticsClinicUrl, 
  patientInteractionUrl, 
  dentistPortraitUrl 
}: SlideRendererProps) {
  
  // Transition configurations
  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Helper to split bullet text on colon (":") for bold titles
  const formatBullet = (bullet: string) => {
    const parts = bullet.split(':');
    if (parts.length > 1) {
      return (
        <span className="flex flex-col gap-1">
          <strong className="text-bbq-gold font-display font-bold text-sm tracking-tight block">
            {parts[0]}
          </strong>
          <span className="text-stone-300 text-xs leading-relaxed">
            {parts.slice(1).join(':').trim()}
          </span>
        </span>
      );
    }
    return <span className="text-stone-300 text-xs leading-relaxed">{bullet}</span>;
  };

  // Switch layouts dynamically
  const renderSlideContent = () => {
    switch (slide.layoutType) {
      case 'title':
        return (
          <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden flex flex-col justify-between p-5 sm:p-8 md:p-12 text-white shadow-xl border border-stone-850">
            {/* Background Image with elegant overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={orthodonticsClinicUrl} 
                alt="BBQ Charcoal Grill Background" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.22] contrast-[1.15]"
              />
              {/* Crimson Red and Gold ambient glow spots */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-bbq-red/15 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-bbq-gold/5 rounded-full blur-3xl"></div>
            </div>

            {/* "Established Prestige" badge in top right corner */}
            <div className="absolute top-6 right-6 z-10">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                className="bg-bbq-red/90 text-white border border-bbq-gold/30 px-3.5 py-1.5 rounded-full font-display font-bold text-[10px] tracking-widest uppercase flex items-center gap-1.5 shadow-xl shadow-black/50"
              >
                <Flame size={12} className="text-bbq-gold animate-pulse" />
                <span>Signature Excellence</span>
              </motion.div>
            </div>

            {/* Metadata (Top Left) */}
            <div className="z-10 flex items-center gap-2 bg-stone-900/60 backdrop-blur-sm border border-stone-800/80 px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-bbq-red animate-pulse"></span>
              <span className="font-mono text-[9px] tracking-widest text-stone-300 font-semibold uppercase">Strategic Partnership Proposal</span>
            </div>

            {/* Titles & Subtitles (Centered content with bottom alignment) */}
            <div className="z-10 mt-auto flex flex-col gap-4 max-w-2xl">
              <div className="bg-bbq-red/20 border border-bbq-red/30 backdrop-blur-md px-3 py-1 rounded-md text-bbq-orange text-xs font-semibold w-fit font-mono tracking-wider uppercase">
                The Digital Feast Initiative
              </div>
              
              <h1 className="font-display font-black text-3xl md:text-5xl leading-tight text-white tracking-tight drop-shadow-md">
                {slide.title}
              </h1>
              
              {slide.subtitle && (
                <p className="font-sans text-stone-300 text-sm md:text-base leading-relaxed font-medium">
                  {slide.subtitle}
                </p>
              )}
            </div>

            {/* Presentation Details Footer (Bottom) */}
            <div className="z-10 mt-8 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-stone-400">
              <div className="flex flex-col gap-0.5">
                <span className="font-display font-bold text-white tracking-wide text-xs">{slide.content[0]}</span>
                <span className="font-mono text-[10px] text-stone-400">{slide.content[1]} | {slide.content[2]}</span>
              </div>
              <div className="bg-stone-900/80 border border-stone-800 backdrop-blur px-3 py-1.5 rounded-lg text-bbq-gold text-[10px] font-mono">
                Slide 1 of 7
              </div>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="w-full flex flex-col h-full min-h-[380px] sm:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-stone-900 border border-stone-850 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-bbq-red/5 rounded-full blur-2xl"></div>
            
            <div className="z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-850">
                <div>
                  <span className="text-[10px] font-mono font-bold text-bbq-orange bg-bbq-red/10 border border-bbq-red/25 px-2.5 py-1 rounded uppercase tracking-wider">
                    {slide.subtitle}
                  </span>
                  <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight mt-1.5">{slide.title}</h2>
                </div>
                <div className="bg-bbq-red/10 border border-bbq-red/25 text-bbq-orange p-2.5 rounded-xl">
                  <ChefHat size={22} />
                </div>
              </div>

              {/* Vision Blocks */}
              <motion.div 
                variants={containerVariants} 
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6"
              >
                {slide.content.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="bg-stone-950 p-5 rounded-xl border border-stone-850 shadow-sm flex flex-col justify-between min-h-[180px] hover:border-bbq-gold/40 transition-all group"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-xs bg-bbq-red/10 text-bbq-orange border border-bbq-red/20 group-hover:bg-bbq-red group-hover:text-white group-hover:border-bbq-gold/30 transition-all">
                        0{idx + 1}
                      </div>
                      <div className="mt-2">
                        {formatBullet(item)}
                      </div>
                    </div>
                    <span className="text-[9px] font-mono tracking-wider text-stone-500 group-hover:text-bbq-gold transition flex items-center gap-1 mt-4 uppercase">
                      Strategic Focus <ArrowUpRight size={10} />
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Slide Footer */}
            <div className="z-10 flex justify-between items-center text-stone-500 text-[10px] mt-8 pt-4 border-t border-stone-850 font-mono">
              <span>Prepared for BBQ Tonight Management</span>
              <span>Slide 2 of 7</span>
            </div>
          </div>
        );

      case 'bullets':
        return (
          <div className="w-full flex flex-col h-full min-h-[380px] sm:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-stone-900 border border-stone-850 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-bbq-gold/5 rounded-full blur-2xl"></div>

            <div className="z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-850">
                <div>
                  <span className="text-[10px] font-mono font-bold text-bbq-gold bg-amber-950/40 border border-amber-900/30 px-2.5 py-1 rounded uppercase tracking-wider">
                    {slide.subtitle}
                  </span>
                  <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight mt-1.5">{slide.title}</h2>
                </div>
                <div className="bg-bbq-red/10 border border-bbq-red/25 text-bbq-orange p-2.5 rounded-xl">
                  <Flame size={22} />
                </div>
              </div>

              {/* Requirement Cards */}
              <motion.div 
                variants={containerVariants} 
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
              >
                {slide.content.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="p-4 bg-stone-950 border border-stone-850 rounded-xl shadow-sm hover:border-bbq-gold/30 transition-all flex gap-3.5 group"
                  >
                    <div className="bg-stone-900 text-bbq-gold p-2 rounded-lg h-fit border border-stone-800">
                      {idx === 0 && <Users size={16} />}
                      {idx === 1 && <Calendar size={16} />}
                      {idx === 2 && <Crown size={16} />}
                      {idx === 3 && <Flame size={16} />}
                    </div>
                    <div className="flex-1">
                      {formatBullet(item)}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Slide Footer */}
            <div className="z-10 flex justify-between items-center text-stone-500 text-[10px] mt-8 pt-4 border-t border-stone-850 font-mono">
              <span>Verified Experience Blueprint</span>
              <span>Slide 3 of 7</span>
            </div>
          </div>
        );

      case 'split':
        return (
          <div className="w-full flex flex-col h-full min-h-[380px] sm:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-stone-900 border border-stone-850 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-850">
                <div>
                  <span className="text-[10px] font-mono font-bold text-bbq-orange bg-bbq-red/10 border border-bbq-red/25 px-2.5 py-1 rounded uppercase tracking-wider">
                    {slide.subtitle}
                  </span>
                  <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight mt-1.5">{slide.title}</h2>
                </div>
                <div className="bg-stone-950 border border-stone-800 text-stone-300 p-2.5 rounded-xl">
                  <Utensils size={22} />
                </div>
              </div>

              {/* Split Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                {/* Left Side: Proposed Website Pages */}
                <div className="bg-bbq-red/15 border border-bbq-red/30 rounded-xl p-5">
                  <h4 className="font-display font-bold text-sm text-bbq-orange mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-bbq-red rounded-full animate-ping"></span>
                    Proposed Online Guest Portal Pages
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {slide.content[0].replace('Website Pages: ', '').split(', ').map((page, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5 bg-stone-950 border border-stone-850 p-2 rounded shadow-sm text-stone-300">
                        <Check size={11} className="text-bbq-red" />
                        <span>{page}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Interactive Modules */}
                <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-5">
                  <h4 className="font-display font-bold text-sm text-bbq-gold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-bbq-gold rounded-full"></span>
                    Interactive Integration Modules
                  </h4>
                  <div className="flex flex-col gap-2.5 text-xs">
                    {slide.content[1].replace('Interactive Modules: ', '').split(', ').map((mod, mIdx) => (
                      <div key={mIdx} className="flex items-center justify-between bg-stone-950 border border-stone-850 p-2.5 rounded shadow-sm text-stone-300">
                        <span className="font-semibold">{mod}</span>
                        <span className="text-[8px] font-mono font-bold text-bbq-gold bg-amber-950/60 border border-amber-900/40 px-2 py-0.5 rounded uppercase tracking-wider">
                          Ready to deploy
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Footer */}
            <div className="z-10 flex justify-between items-center text-stone-500 text-[10px] mt-8 pt-4 border-t border-stone-850 font-mono">
              <span>Proposed Digital Architecture</span>
              <span>Slide 4 of 7</span>
            </div>
          </div>
        );

      case 'two-column':
        const guestFeatures = slide.content.slice(1, 5);
        const adminFeatures = slide.content.slice(6);

        return (
          <div className="w-full flex flex-col h-full min-h-[380px] sm:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-stone-900 border border-stone-850 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-850">
                <div>
                  <span className="text-[10px] font-mono font-bold text-bbq-gold bg-amber-950/40 border border-amber-900/30 px-2.5 py-1 rounded uppercase tracking-wider">
                    {slide.subtitle}
                  </span>
                  <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight mt-1.5">{slide.title}</h2>
                </div>
                <div className="bg-stone-950 border border-stone-800 text-stone-300 p-2.5 rounded-xl">
                  <CookingPot size={22} />
                </div>
              </div>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Column 1: Guest Experience */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-bbq-orange flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-bbq-red" /> {slide.content[0]}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {guestFeatures.map((feat, idx) => (
                      <div key={idx} className="flex gap-2 text-xs bg-stone-950 border border-stone-850 p-2.5 rounded-lg text-stone-300">
                        <span className="text-bbq-red font-bold shrink-0">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Admin Control */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-bbq-gold flex items-center gap-1.5">
                    <CookingPot size={13} className="text-bbq-gold" /> {slide.content[5]}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {adminFeatures.map((feat, idx) => (
                      <div key={idx} className="flex gap-2 text-xs bg-stone-950 border border-stone-850 p-2.5 rounded-lg text-stone-300">
                        <span className="text-bbq-gold font-bold shrink-0">⚙</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Footer */}
            <div className="z-10 flex justify-between items-center text-stone-500 text-[10px] mt-8 pt-4 border-t border-stone-850 font-mono">
              <span>Operational Capabilities Breakdown</span>
              <span>Slide 5 of 7</span>
            </div>
          </div>
        );

      case 'conclusion':
        return (
          <div className="w-full flex flex-col h-full min-h-[380px] sm:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-stone-900 border border-stone-850 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Text Area (7 cols) */}
              <div className="md:col-span-7 flex flex-col gap-4">
                <span className="text-[10px] font-mono font-bold text-bbq-orange bg-bbq-red/10 border border-bbq-red/25 px-2.5 py-1 rounded uppercase tracking-wider w-fit">
                  {slide.subtitle}
                </span>
                
                <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-tight leading-none">
                  {slide.title}
                </h2>

                <p className="text-xs text-stone-300 leading-relaxed font-medium">
                  {slide.content[0]}
                </p>

                {/* Main CTA Block */}
                <div className="bg-bbq-red/15 border border-bbq-red/30 p-4 rounded-xl mt-2 flex items-center gap-3">
                  <Flame size={22} className="text-bbq-orange shrink-0 animate-pulse" />
                  <p className="text-xs font-display font-bold text-white leading-normal">
                    "{slide.content[1].replace("Call to Action: ", "")}"
                  </p>
                </div>

                {/* Interactive Contact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                  <a href={`https://${slide.content[2].replace('Website: ', '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-stone-800 hover:border-bbq-gold bg-stone-950 hover:bg-stone-900 p-3 rounded-lg text-stone-300 transition shadow-sm">
                    <Compass size={14} className="text-bbq-gold" />
                    <div className="text-left">
                      <span className="block text-[8px] text-stone-500 font-mono uppercase leading-none mb-1">Visit Live Preview</span>
                      <span className="text-xs font-semibold">{slide.content[2].replace('Website: ', '')}</span>
                    </div>
                  </a>
                  <a href={`mailto:${slide.content[3].replace('Contact Email: ', '')}`} className="flex items-center gap-2 border border-stone-800 hover:border-bbq-red bg-stone-950 hover:bg-stone-900 p-3 rounded-lg text-stone-300 transition shadow-sm">
                    <Mail size={14} className="text-bbq-red" />
                    <div className="text-left">
                      <span className="block text-[8px] text-stone-500 font-mono uppercase leading-none mb-1">Direct Outreach</span>
                      <span className="text-xs font-semibold truncate max-w-[140px] sm:max-w-none block">{slide.content[3].replace('Contact Email: ', '')}</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Image Area with Badge overlay (5 cols) */}
              <div className="md:col-span-5 relative h-64 bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-stone-850 flex items-center justify-center">
                <img 
                  src={patientInteractionUrl} 
                  alt="BBQ Tonight Luxury Dining Ambiance" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.8]"
                />
                
                {/* Large trust badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 right-4 bg-bbq-red border-2 border-bbq-gold text-white p-2.5 rounded-full shadow-lg flex items-center justify-center animate-bounce" style={{ animationDuration: '4s' }}>
                  <Flame size={24} className="text-bbq-gold" />
                </div>
              </div>

            </div>

            {/* Slide Footer */}
            <div className="z-10 flex justify-between items-center text-stone-500 text-[10px] mt-8 pt-4 border-t border-stone-850 font-mono">
              <span>BBQ Tonight Partner Pitch</span>
              <span>Slide 7 of 7</span>
            </div>
          </div>
        );

      default: // Grid bento slides (including Slide 6 Advantage)
        return (
          <div className="w-full flex flex-col h-full min-h-[380px] sm:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-stone-900 border border-stone-850 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-850">
                <div>
                  <span className="text-[10px] font-mono font-bold text-bbq-gold bg-amber-950/40 border border-amber-900/30 px-2.5 py-1 rounded uppercase tracking-wider">
                    {slide.subtitle}
                  </span>
                  <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight mt-1.5">{slide.title}</h2>
                </div>
                <div className="bg-bbq-red/10 border border-bbq-red/25 text-bbq-orange p-2.5 rounded-xl">
                  <Crown size={22} />
                </div>
              </div>

              {/* Bento Grid */}
              <motion.div 
                variants={containerVariants} 
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
              >
                {slide.content.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="p-4 rounded-xl border border-stone-850 bg-stone-950 hover:border-bbq-gold/40 transition-all shadow-sm flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-bbq-gold bg-amber-950/40 border border-amber-900/30 p-1.5 rounded-lg">
                          {idx === 0 && <Crown size={16} />}
                          {idx === 1 && <Zap size={16} />}
                          {idx === 2 && <ArrowUpRight size={16} />}
                          {idx === 3 && <MapPin size={16} />}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-stone-500 group-hover:text-bbq-gold transition-colors">
                          0{idx + 1}
                        </span>
                      </div>
                      <div>
                        {formatBullet(item)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Slide Footer */}
            <div className="z-10 flex justify-between items-center text-stone-500 text-[10px] mt-8 pt-4 border-t border-stone-850 font-mono">
              <span>Strategic Partnership Merits</span>
              <span>Slide 6 of 7</span>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      key={slide.id}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      {renderSlideContent()}
    </motion.div>
  );
}
