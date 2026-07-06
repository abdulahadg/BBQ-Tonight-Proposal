/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRESENTATION_SLIDES } from './types';
import SlideRenderer from './components/SlideRenderer';
const bbqTonightLogo = "/src/assets/images/bbq_tonight_logo_1783307045044.jpg";
import { 
  ChevronLeft, ChevronRight, Play, Pause, RotateCcw, 
  Maximize2, Minimize2, MonitorPlay, BookOpen, 
  Award, Info, Sparkles, CheckCircle2, Pointer, 
  Clock, Layers, ShieldCheck, Eye, EyeOff, LayoutTemplate
} from 'lucide-react';

export default function App() {
  // Slide Deck navigation index
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  
  // Laser Pointer simulator on stage
  const [laserPointerActive, setLaserPointerActive] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });
  const slideStageRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  // Presenter Dashboard Visibility Toggles
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Rehearsal Presentation Timer
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Autoplay presentation configurations
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState(5); // default 5 seconds
  const [autoplayProgress, setAutoplayProgress] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Autoplay Timer and dynamic progress tracker effect
  useEffect(() => {
    let timer: any = null;
    let progressTimer: any = null;

    if (isAutoplay) {
      const startTime = Date.now();
      const endTime = startTime + autoplaySpeed * 1000;

      // Update progress bar percentage smoothly every 100ms
      progressTimer = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime;
        const pct = Math.min((elapsed / (autoplaySpeed * 1000)) * 100, 100);
        setAutoplayProgress(pct);
      }, 100);

      timer = setTimeout(() => {
        setCurrentSlideIdx((prev) => {
          if (prev === PRESENTATION_SLIDES.length - 1) {
            return 0; // loop back to slide 1
          }
          return prev + 1;
        });
        setAutoplayProgress(0);
      }, autoplaySpeed * 1000);
    } else {
      setAutoplayProgress(0);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [isAutoplay, autoplaySpeed, currentSlideIdx]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Keyboard Navigation for Slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        // Spacebar or Arrow Right goes forward
        e.preventDefault();
        handleNextSlide(true); // Pause autoplay on manual key action
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide(true);
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'f' || e.key === 'F') {
        // 'F' key toggles Fullscreen
        e.preventDefault();
        toggleFullscreenState();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIdx]);

  const handleNextSlide = (pauseAutoplayOnAction = true) => {
    if (pauseAutoplayOnAction) {
      setIsAutoplay(false);
    }
    if (currentSlideIdx < PRESENTATION_SLIDES.length - 1) {
      setCurrentSlideIdx(currentSlideIdx + 1);
    } else {
      if (!pauseAutoplayOnAction) {
        setCurrentSlideIdx(0); // auto loop back
      }
    }
  };

  const handlePrevSlide = (pauseAutoplayOnAction = true) => {
    if (pauseAutoplayOnAction) {
      setIsAutoplay(false);
    }
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(currentSlideIdx - 1);
    }
  };

  // Track standard browser-level fullscreen changes to keep React state in sync
  useEffect(() => {
    const onFullscreenChange = () => {
      const isNativeFs = !!document.fullscreenElement;
      if (!isNativeFs && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, [isFullscreen]);

  // Request browser-level full screen if possible, fallback gracefully to React State Overlay
  const toggleFullscreenState = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      // Attempt to go native fullscreen on the container for the ultimate client experience
      const container = fullscreenRef.current || document.documentElement;
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {
          // Silent fallback if browser/iframe blocks native fullscreen
        });
      }
    } else {
      setIsFullscreen(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Laser Pointer position trackers
  const handleStageMouseMove = (e: React.MouseEvent) => {
    if (!laserPointerActive || !slideStageRef.current) return;
    const rect = slideStageRef.current.getBoundingClientRect();
    setLaserPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleFullscreenMouseMove = (e: React.MouseEvent) => {
    if (!laserPointerActive || !fullscreenRef.current) return;
    const rect = fullscreenRef.current.getBoundingClientRect();
    setLaserPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Context-aware coaching strategies based on the active slide
  const getPitchStrategy = (id: number) => {
    switch (id) {
      case 1:
        return "Hook the client early. Introduce MetaWave, acknowledge the prestige of BBQ Tonight, and focus on the direct-to-guest experience.";
      case 2:
        return "Explain the paradigm shift: this custom platform reduces reliance on high-commission aggregators, maximizing your restaurant profitability.";
      case 3:
        return "Highlight operational growth. Point out how direct online reservations, custom menus, and catering capture forms streamline bookings.";
      case 4:
        return "Demonstrate our tailored blueprint. Show how our proposed pages and interactive modules like the Custom Platter Builder drive high-value sales.";
      case 5:
        return "Focus on operational simplicity. Reassure them that the kitchen tablet dashboard is incredibly intuitive, taking under 10 minutes to learn.";
      case 6:
        return "Pitch performance stability. Blazing-fast load speeds mean customers can book tables or order deliveries instantly even during peak Sunday evening traffic.";
      case 7:
        return "Deliver the signature call-to-action. State clearly that their high-end culinary experience is now matched with a digital hub of equal caliber. Ask for next steps.";
      default:
        return "Maintain clear focus, good posture, and conversational eye contact.";
    }
  };

  // Image assets loaded from premium high-resolution BBQ and restaurant photography
  const imageAssets = {
    dentistPortrait: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=80", // delicious kebabs
    orthodonticsClinic: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80", // sizzling grill flames
    patientInteraction: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" // luxury dining ambiance
  };

  const activeSlide = PRESENTATION_SLIDES[currentSlideIdx];

  return (
    <div className="min-h-screen bg-bbq-charcoal text-stone-200 flex flex-col font-sans selection:bg-bbq-red selection:text-white">
      
      {/* CORPORATE BRAND HEADER / NAVBAR */}
      <header className="bg-stone-900 border-b border-stone-850 py-4 px-6 md:px-8 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-50">
        
        {/* Brand & Pitch Partner Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={bbqTonightLogo} 
            alt="BBQ Tonight Logo" 
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full object-cover border-2 border-bbq-gold/40 shadow-md bg-stone-900"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-white tracking-tight text-sm md:text-base leading-none">
                BBQ Tonight Pitch Hub
              </h1>
              <span className="bg-bbq-red/20 text-bbq-orange font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-bbq-red/40 uppercase tracking-wider">
                Active Proposal
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Prepared for BBQ Tonight Management by <span className="text-bbq-gold font-semibold font-display">MetaWave Innovations</span>
            </p>
          </div>
        </div>

        {/* Global Slide-Show Master Control Panel */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setLaserPointerActive(!laserPointerActive)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              laserPointerActive 
                ? 'bg-red-950/40 border-bbq-red text-bbq-orange font-bold animate-pulse' 
                : 'bg-stone-900 border-stone-800 hover:border-bbq-gold text-stone-400 hover:text-white'
            }`}
            title="Toggle interactive simulated laser pointer"
          >
            <Pointer size={14} />
            <span>Laser</span>
          </button>

          <button
            onClick={toggleFullscreenState}
            className="bg-bbq-red hover:bg-emerald-800 border border-bbq-gold/25 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg scale-100 hover:scale-[1.03]"
            title="Start immersive full screen slide show presentation"
          >
            <MonitorPlay size={14} />
            <span>Start Slideshow</span>
          </button>
        </div>

        {/* Brand Color Pillars */}
        <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono font-medium text-stone-400">
          <span className="flex items-center gap-1 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40">
            <span className="w-1.5 h-1.5 bg-bbq-green rounded-full"></span>
            <span>Forest Green (Heritage)</span>
          </span>
          <span className="flex items-center gap-1 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/40">
            <span className="w-1.5 h-1.5 bg-bbq-gold rounded-full"></span>
            <span>Gold (Luxury)</span>
          </span>
        </div>

      </header>

      {/* CORE WORKSPACE: TWO COLUMN SLIDE MANAGER */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Slide Thumbnails Panel (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5 bg-stone-900 border border-stone-850 p-4 rounded-2xl shadow-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Layers size={14} className="text-stone-400" />
                <h3 className="font-sans font-bold text-xs text-stone-200 uppercase tracking-wider">
                  Proposal Slides ({PRESENTATION_SLIDES.length})
                </h3>
              </div>
              <span className="bg-stone-800 text-stone-300 font-mono text-[10px] px-1.5 py-0.5 rounded border border-stone-750">
                7 Slides
              </span>
            </div>

            {/* Thumbnail Cards Container */}
            <div className="flex flex-row lg:flex-col gap-2.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none snap-x snap-mandatory scroll-smooth">
              {PRESENTATION_SLIDES.map((slide, index) => {
                const isActive = index === currentSlideIdx;
                return (
                  <button
                     key={slide.id}
                     onClick={() => setCurrentSlideIdx(index)}
                     className={`flex-shrink-0 w-44 lg:w-full snap-start text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 group relative ${
                      isActive 
                        ? 'bg-bbq-red/10 border-bbq-red shadow-sm text-white' 
                        : 'bg-stone-950 border-stone-850 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    {/* Slide Number Tag */}
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold ${
                      isActive ? 'bg-bbq-red text-white' : 'bg-stone-800 text-stone-400 group-hover:bg-stone-700'
                    }`}>
                      {slide.id}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-mono font-bold uppercase ${
                          isActive ? 'text-bbq-gold' : 'text-stone-500'
                        }`}>
                          {slide.layoutType} layout
                        </span>
                        {isActive && <span className="w-1.5 h-1.5 bg-bbq-red rounded-full"></span>}
                      </div>
                      <h4 className={`text-xs font-semibold truncate mt-0.5 ${
                        isActive ? 'text-white font-medium' : 'text-stone-400 group-hover:text-stone-200'
                      }`}>
                        {slide.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Slide display preview stage (9 cols) */}
          <div className="lg:col-span-9 flex flex-col gap-5">
            
            {/* Interactive slide projector wrapper */}
            <div 
              ref={slideStageRef}
              onMouseMove={handleStageMouseMove}
              className="w-full relative bg-stone-950 border border-stone-850 rounded-3xl overflow-hidden shadow-2xl hover:shadow-black/80 transition-all duration-300 flex flex-col"
            >
              {/* Primary viewport stage with bottom padding for floating controls */}
              <div className="relative w-full min-h-[380px] sm:min-h-[480px] flex flex-col items-stretch justify-center p-3 sm:p-5 pb-24 select-none">
                <AnimatePresence mode="wait">
                  <SlideRenderer 
                    key={currentSlideIdx}
                    slide={activeSlide}
                    orthodonticsClinicUrl={imageAssets.orthodonticsClinic}
                    patientInteractionUrl={imageAssets.patientInteraction}
                    dentistPortraitUrl={imageAssets.dentistPortrait}
                  />
                </AnimatePresence>

                {/* Simulated Hover Arrow Handles */}
                <button
                  onClick={() => handlePrevSlide(true)}
                  disabled={currentSlideIdx === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-200 rounded-full shadow-lg opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity disabled:opacity-0 cursor-pointer z-20 animate-none"
                  title="Previous Slide"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() => handleNextSlide(true)}
                  disabled={currentSlideIdx === PRESENTATION_SLIDES.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-200 rounded-full shadow-lg opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity disabled:opacity-0 cursor-pointer z-20 animate-none"
                  title="Next Slide"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Laser Pointer simulation overlay */}
                {laserPointerActive && (
                  <div 
                    style={{ 
                      position: 'absolute',
                      left: `${laserPos.x}px`,
                      top: `${laserPos.y}px`,
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                    }}
                    className="w-6 h-6 bg-red-500/30 rounded-full flex items-center justify-center z-40 transition-all duration-75"
                  >
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444] animate-pulse"></div>
                  </div>
                )}

                {/* DYNAMIC FLOATING GLASSMORPHIC CONTROL DECK (BOTTOM CENTER) */}
                <div 
                  id="floating_presenter_dock" 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-stone-900/95 hover:bg-stone-900 backdrop-blur-md border border-stone-800 rounded-2xl sm:rounded-full py-2.5 px-4 sm:px-6 shadow-2xl flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-4 text-white max-w-[95vw] w-max select-none transition-all duration-300 relative overflow-hidden"
                >
                  {/* Glowing thin edge progress indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-800">
                    <div 
                      className="h-full bg-bbq-red transition-all duration-100 ease-linear shadow-[0_0_8px_#ef4444]"
                      style={{ width: `${isAutoplay ? autoplayProgress : 0}%` }}
                    />
                  </div>

                  {/* Left block: Slide counter indicator */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-stone-300">
                      {currentSlideIdx + 1} <span className="text-stone-600">/</span> {PRESENTATION_SLIDES.length}
                    </span>
                  </div>

                  {/* Vertical Separator */}
                  <div className="hidden sm:block h-4 w-px bg-stone-800" />

                  {/* Center block: Standard & Autoplay controls */}
                  <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-stone-850">
                    <button
                      onClick={() => handlePrevSlide(true)}
                      disabled={currentSlideIdx === 0}
                      className="p-1.5 hover:bg-white/10 disabled:opacity-30 rounded-lg text-stone-300 hover:text-white transition cursor-pointer"
                      title="Previous Slide"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {/* Autoplay Play/Pause button */}
                    <button
                      onClick={() => setIsAutoplay(!isAutoplay)}
                      className={`p-1.5 rounded-lg text-white transition flex items-center justify-center cursor-pointer ${
                        isAutoplay 
                          ? 'bg-bbq-red hover:bg-red-800 border border-bbq-gold/20 animate-pulse' 
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      title={isAutoplay ? 'Pause Presentation Autoplay' : 'Start Presentation Autoplay'}
                    >
                      {isAutoplay ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    <button
                      onClick={() => handleNextSlide(true)}
                      disabled={currentSlideIdx === PRESENTATION_SLIDES.length - 1}
                      className="p-1.5 hover:bg-white/10 disabled:opacity-30 rounded-lg text-stone-300 hover:text-white transition cursor-pointer"
                      title="Next Slide"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Speed toggle selector */}
                  <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-xl border border-stone-850">
                    <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">Speed:</span>
                    <button
                      onClick={() => {
                        setAutoplaySpeed((prev) => {
                          if (prev === 3) return 5;
                          if (prev === 5) return 10;
                          return 3;
                        });
                      }}
                      className="text-[11px] font-mono font-bold bg-stone-850 hover:bg-stone-800 px-2 py-0.5 rounded-md text-bbq-gold hover:text-amber-400 transition cursor-pointer border border-stone-800"
                      title="Adjust slide cycle speed (3s / 5s / 10s)"
                    >
                      {autoplaySpeed}s
                    </button>
                  </div>

                  {/* Separator */}
                  <div className="h-4 w-px bg-stone-800" />

                  {/* Quick Dots / Miniature Navigation indicators inside dock */}
                  <div className="hidden md:flex items-center gap-1.5">
                    {PRESENTATION_SLIDES.map((_, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          setIsAutoplay(false);
                          setCurrentSlideIdx(sIdx);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          sIdx === currentSlideIdx 
                            ? 'w-4 bg-bbq-red shadow-[0_0_6px_#ef4444]' 
                            : 'w-1.5 bg-white/30 hover:bg-white/60'
                        }`}
                        title={`Go to slide ${sIdx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Separator */}
                  <div className="hidden md:block h-4 w-px bg-stone-800" />

                  {/* Right block: Extra utility toggles inside dock */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setLaserPointerActive(!laserPointerActive)}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        laserPointerActive 
                          ? 'bg-red-600 border-red-500 text-white animate-pulse' 
                          : 'bg-white/5 border-white/5 text-stone-300 hover:text-white hover:bg-white/10'
                      }`}
                      title="Toggle simulated Laser pointer highlighter"
                    >
                      <Pointer size={14} />
                    </button>

                    <button
                      onClick={toggleFullscreenState}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition cursor-pointer"
                      title="Toggle full screen presentation mode"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>

                </div>

              </div>

            </div>



          </div>

        </div>


      </main>

      {/* PERSISTENT CORPORATE WATERMARK FOOTER */}
      <footer className="bg-stone-950 border-t border-stone-900 py-6 text-center text-xs text-stone-500 mt-12 font-mono">
        <p>MetaWave Innovations Pitch Companion Workspace • 2026</p>
        <p className="text-[10px] text-stone-600 mt-1">Vite + React + Tailwind v4 + Framer Motion Engine • Hospitality Technology Practice</p>
      </footer>

      {/* -------------------- IMMERSIVE IMMERSIVE FULL SCREEN VIEW -------------------- */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            ref={fullscreenRef}
            onMouseMove={handleFullscreenMouseMove}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-stone-950 text-white flex flex-col justify-between p-4 sm:p-6 select-none"
            style={{ touchAction: 'none' }}
          >
            {/* Fullscreen Header Strip */}
            <div className="flex justify-between items-center border-b border-stone-900 pb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={bbqTonightLogo} 
                  alt="BBQ Tonight Logo" 
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border border-bbq-gold/30 shadow-sm bg-stone-900"
                />
                <span className="bg-bbq-red text-white font-mono text-xs font-bold px-2.5 py-0.5 rounded border border-bbq-gold/20 tracking-wide uppercase shadow">
                  BBQ Tonight Presenter Show
                </span>
                <span className="text-xs text-stone-400 font-medium hidden sm:inline">
                  Client: BBQ Tonight Management
                </span>
              </div>

              {/* Status information */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-stone-400 bg-stone-900 px-2.5 py-1 rounded border border-stone-800">
                  <Clock size={13} className="text-bbq-gold animate-pulse" />
                  <span>{formatTime(timerSeconds)}</span>
                </div>
                <button
                  onClick={toggleFullscreenState}
                  className="bg-stone-900 hover:bg-stone-850 text-white border border-stone-800 p-1.5 px-2.5 rounded-lg flex items-center gap-1.5 transition text-xs font-medium cursor-pointer"
                  title="Exit Full Screen Show"
                >
                  <Minimize2 size={13} />
                  <span>Exit Show</span>
                </button>
              </div>
            </div>

            {/* Centered slide viewer body */}
            <div className="flex-grow flex items-center justify-center max-w-5xl mx-auto w-full my-2 sm:my-6 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <SlideRenderer 
                  key={currentSlideIdx}
                  slide={activeSlide}
                  orthodonticsClinicUrl={imageAssets.orthodonticsClinic}
                  patientInteractionUrl={imageAssets.patientInteraction}
                  dentistPortraitUrl={imageAssets.dentistPortrait}
                />
              </AnimatePresence>

              {/* Fullscreen Floating Navigation Arrows (On screen margins) */}
              <button
                onClick={handlePrevSlide}
                disabled={currentSlideIdx === 0}
                className="absolute left-2 p-3 bg-stone-900/80 hover:bg-stone-800 text-white rounded-full border border-stone-800 shadow-xl disabled:opacity-0 cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNextSlide}
                disabled={currentSlideIdx === PRESENTATION_SLIDES.length - 1}
                className="absolute right-2 p-3 bg-stone-900/80 hover:bg-stone-800 text-white rounded-full border border-stone-800 shadow-xl disabled:opacity-0 cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>

              {/* Laser Pointer overlay */}
              {laserPointerActive && (
                <div 
                  style={{ 
                    position: 'absolute',
                    left: `${laserPos.x}px`,
                    top: `${laserPos.y}px`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                  }}
                  className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center z-[999999] transition-all duration-75"
                >
                  <div className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-[0_0_15px_#ef4444] animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Fullscreen Float Action Control Hub at Bottom */}
            <div className="flex justify-center">
              <div className="bg-stone-900/95 border border-stone-800 backdrop-blur-md py-2.5 px-4 sm:px-6 rounded-2xl sm:rounded-full flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-4 shadow-2xl text-white max-w-[95vw] w-max select-none transition-all duration-300 relative overflow-hidden">
                
                {/* Glowing thin edge progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-850">
                  <div 
                    className="h-full bg-bbq-red transition-all duration-100 ease-linear shadow-[0_0_8px_#ef4444]"
                    style={{ width: `${isAutoplay ? autoplayProgress : 0}%` }}
                  />
                </div>

                {/* Left block: Slide counter indicator */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-stone-300">
                    Slide {currentSlideIdx + 1} <span className="text-stone-500">/</span> {PRESENTATION_SLIDES.length}
                  </span>
                </div>

                {/* Vertical Separator */}
                <div className="hidden sm:block h-4 w-px bg-stone-800" />

                {/* Center block: Standard & Autoplay controls */}
                <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-stone-800">
                  <button
                    onClick={() => handlePrevSlide(true)}
                    disabled={currentSlideIdx === 0}
                    className="p-1.5 hover:bg-white/10 disabled:opacity-30 rounded-lg text-stone-300 hover:text-white transition cursor-pointer"
                    title="Previous Slide"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Autoplay Play/Pause button */}
                  <button
                    onClick={() => setIsAutoplay(!isAutoplay)}
                    className={`p-1.5 rounded-lg text-white transition flex items-center justify-center cursor-pointer ${
                      isAutoplay 
                        ? 'bg-bbq-red hover:bg-red-800 border border-bbq-gold/20 animate-pulse' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    title={isAutoplay ? 'Pause Presentation Autoplay' : 'Start Presentation Autoplay'}
                  >
                    {isAutoplay ? <Pause size={16} /> : <Play size={16} />}
                  </button>

                  <button
                    onClick={() => handleNextSlide(true)}
                    disabled={currentSlideIdx === PRESENTATION_SLIDES.length - 1}
                    className="p-1.5 hover:bg-white/10 disabled:opacity-30 rounded-lg text-stone-300 hover:text-white transition cursor-pointer"
                    title="Next Slide"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Speed toggle selector */}
                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">Speed:</span>
                  <button
                    onClick={() => {
                      setAutoplaySpeed((prev) => {
                        if (prev === 3) return 5;
                        if (prev === 5) return 10;
                        return 3;
                      });
                    }}
                    className="text-[11px] font-mono font-bold bg-stone-850 hover:bg-stone-800 px-2 py-0.5 rounded-md text-bbq-gold hover:text-amber-400 transition cursor-pointer border border-stone-800"
                    title="Adjust slide cycle speed (3s / 5s / 10s)"
                  >
                    {autoplaySpeed}s
                  </button>
                </div>

                {/* Separator */}
                <div className="h-4 w-px bg-stone-800" />

                {/* Quick Dots / Miniature Navigation indicators inside dock */}
                <div className="hidden md:flex items-center gap-1.5">
                  {PRESENTATION_SLIDES.map((_, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        setIsAutoplay(false);
                        setCurrentSlideIdx(sIdx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        sIdx === currentSlideIdx 
                          ? 'w-4 bg-bbq-red shadow-[0_0_6px_#ef4444]' 
                          : 'w-1.5 bg-white/30 hover:bg-white/60'
                      }`}
                      title={`Go to slide ${sIdx + 1}`}
                    />
                  ))}
                </div>

                {/* Separator */}
                <div className="hidden md:block h-4 w-px bg-stone-800" />

                {/* Right block: Extra utility toggles inside dock */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setLaserPointerActive(!laserPointerActive)}
                    className={`p-1.5 rounded-lg border transition cursor-pointer ${
                      laserPointerActive 
                        ? 'bg-rose-600 border-rose-500 text-white animate-pulse' 
                        : 'bg-white/5 border-white/5 text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                    title="Toggle simulated Laser pointer highlighter"
                  >
                    <Pointer size={14} />
                  </button>
                </div>

              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

