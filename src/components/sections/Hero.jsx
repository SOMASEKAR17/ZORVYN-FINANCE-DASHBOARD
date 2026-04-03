import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTransform, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAMES_COUNT = 195;
const FRAME_PATH = (frame) => `/animation/ezgif-frame-${frame.toString().padStart(3, '0')}.png`;



export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textRef = useRef(null);

useEffect(() => {
  gsap.to(textRef.current, {
    y: 100,
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top top',
      end: '25% top',
      scrub: true,
    }
  });
}, []);
  const progressToFrame = useTransform(scrollYProgress, [0, 1], [1, FRAMES_COUNT]);

  const renderFrame = useCallback((index) => {
  if (!canvasRef.current || images.length < FRAMES_COUNT) return;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  const img = images[Math.max(0, Math.min(Math.floor(index) - 1, FRAMES_COUNT - 1))];

  if (img && img.complete) {
    const mobile = window.innerWidth < 768;
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const horizontalShift = mobile ? 0 : -canvas.width * 0.08;
    const verticalShift = mobile ? -canvas.height * 0.1 : 0;
    const x = (canvas.width - img.width * scale) / 2 + horizontalShift;
    const y = (canvas.height - img.height * scale) / 2 + verticalShift;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * scale, img.height * scale);
  }
}, [images]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const loadedImages = [];
    for (let i = 1; i <= FRAMES_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        setLoadedCount(prev => prev + 1);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    if (images.length === FRAMES_COUNT) renderFrame(1);
  }, [images, renderFrame]);

  useEffect(() => {
    let frameId;
    const update = () => {
      renderFrame(progressToFrame.get());
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [progressToFrame, renderFrame]);

  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    return () => window.removeEventListener('resize', resize);
  }, []);

  const isLoading = loadedCount < FRAMES_COUNT;
  const loadProgress = (loadedCount / FRAMES_COUNT) * 100;

  return (
    <section ref={containerRef} className="relative w-full h-[250vh] bg-white">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#14222E] gap-6">
          <p className="text-[#831AE3]/20 text-[10px] tracking-[0.4em] uppercase font-bold">
            Zorvyn
          </p>
          <div className="w-48 h-px bg-white/5 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-[#6E859F] transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-[#CBD6D9]/40 text-[10px] tabular-nums font-medium tracking-widest">
            {Math.round(loadProgress)}%
          </p>
        </div>
      )}

      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#818F9B] pointer-events-none" />

        <div className="relative z-10 w-full h-full flex items-end pb-[3vh] sm:pb-[5vh] px-6 sm:px-10 md:px-16 lg:px-24 pointer-events-none">
          <div className="overflow-hidden">
            <div ref={textRef} className="pointer-events-auto w-full max-w-5xl">
              <h1 className="font-black uppercase leading-[0.82] tracking-[-0.03em] text-[clamp(3rem,11vw,8.5rem)]">
                Zorvyn
                <br />
                <span className="text-[#CBD6D9]/70">DASHBOARD</span>
              </h1>

              <p className="mt-6 text-white font-medium tracking-tight text-[clamp(1rem,2vw,1.25rem)] max-w-[min(600px,90vw)] leading-relaxed">
                The financial dashboard ,{' '}
                <span className="text-white/50 font-light">
                  engineered for absolute precision and crystalline security.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}