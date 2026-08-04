"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import SterlingNavigation from "../components/SterlingNavigation";

import emailjs from "@emailjs/browser";

// Pupil component for yellow and orange characters

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({ 
  size = 12, 
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };

    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

// Eyeball component for purple and black characters
interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({ 
  size = 48, 
  pupilSize = 16, 
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };

    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
};

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState("12:56");

  // Keep local time dynamic, default matches Indian time formatting
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);

  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking effects
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Looking at each other animation when typing
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => {
        setIsLookingAtEachOther(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  // GSAP Entry Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        infoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2 }
      );

      tl.fromTo(
        formRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2 },
        "-=1.0"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_oznli86";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_0qb5xxu";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "sGWtpIigeRZSZrX63";

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: name,
          from_name: name,
          email: email,
          from_email: email,
          number: phone || "N/A",
          phone: phone || "N/A",
          message: message,
          time: new Date().toLocaleString(),
        },
        publicKey
      );

      setIsSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setError(err?.text || err?.message || "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#09090b] text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white relative overflow-x-hidden"
    >
      <SterlingNavigation />

      {/* Main Grid Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-12 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column - Cartoon Characters Illustration */}
        <div ref={infoRef} className="lg:col-span-6 flex flex-col justify-center items-center">
          <div className="text-center lg:text-left w-full mb-8 space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white leading-none">
              Let&apos;s <span className="font-normal italic text-neutral-300">collaborate</span>.
            </h1>
          </div>

          {/* Interactive Characters Wrapper */}
          <div className="relative overflow-visible" style={{ width: '100%', maxWidth: '500px', height: '350px' }}>
            {/* Purple tall rectangle character - Back layer */}
            <div 
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-300 ease-out"
              style={{
                left: '40px',
                width: '140px',
                height: isTyping ? '330px' : '300px',
                backgroundColor: '#6C3FF5',
                borderRadius: '10px 10px 0 0',
                zIndex: 1,
                transform: isLookingAtEachOther
                  ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(30px)` 
                  : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              {/* Eyes */}
              <div 
                className="absolute flex gap-6 transition-all duration-300 ease-out"
                style={{
                  left: isLookingAtEachOther ? `${45}px` : `${35 + purplePos.faceX}px`,
                  top: isLookingAtEachOther ? `${50}px` : `${35 + purplePos.faceY}px`,
                }}
              >
                <EyeBall
                  size={16}
                  pupilSize={6}
                  maxDistance={4}
                  eyeColor="white"
                  pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={isLookingAtEachOther ? 3 : undefined}
                  forceLookY={isLookingAtEachOther ? 4 : undefined}
                />
                <EyeBall
                  size={16}
                  pupilSize={6}
                  maxDistance={4}
                  eyeColor="white"
                  pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={isLookingAtEachOther ? 3 : undefined}
                  forceLookY={isLookingAtEachOther ? 4 : undefined}
                />
              </div>
            </div>

            {/* Black tall rectangle character - Middle layer */}
            <div 
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-300 ease-out"
              style={{
                left: '170px',
                width: '100px',
                height: '240px',
                backgroundColor: '#1c1c1e',
                borderRadius: '8px 8px 0 0',
                zIndex: 2,
                border: '1px solid rgba(255,255,255,0.05)',
                transform: isLookingAtEachOther
                  ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(15px)`
                  : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              {/* Eyes */}
              <div 
                className="absolute flex gap-5 transition-all duration-300 ease-out"
                style={{
                  left: isLookingAtEachOther ? `${28}px` : `${22 + blackPos.faceX}px`,
                  top: isLookingAtEachOther ? `${10}px` : `${26 + blackPos.faceY}px`,
                }}
              >
                <EyeBall 
                  size={14} 
                  pupilSize={5} 
                  maxDistance={3} 
                  eyeColor="white" 
                  pupilColor="#2D2D2D" 
                  isBlinking={isBlackBlinking}
                  forceLookX={isLookingAtEachOther ? 0 : undefined}
                  forceLookY={isLookingAtEachOther ? -3 : undefined}
                />
                <EyeBall 
                  size={14} 
                  pupilSize={5} 
                  maxDistance={3} 
                  eyeColor="white" 
                  pupilColor="#2D2D2D" 
                  isBlinking={isBlackBlinking}
                  forceLookX={isLookingAtEachOther ? 0 : undefined}
                  forceLookY={isLookingAtEachOther ? -3 : undefined}
                />
              </div>
            </div>

            {/* Orange semi-circle character - Front left */}
            <div 
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-300 ease-out"
              style={{
                left: '0px',
                width: '190px',
                height: '150px',
                zIndex: 3,
                backgroundColor: '#FF9B6B',
                borderRadius: '100px 100px 0 0',
                transform: `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              {/* Eyes */}
              <div 
                className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{
                  left: `${65 + (orangePos.faceX || 0)}px`,
                  top: `${70 + (orangePos.faceY || 0)}px`,
                }}
              >
                <Pupil size={10} maxDistance={4} pupilColor="#2D2D2D" />
                <Pupil size={10} maxDistance={4} pupilColor="#2D2D2D" />
              </div>
            </div>

            {/* Yellow tall rectangle character - Front right */}
            <div 
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-300 ease-out"
              style={{
                left: '230px',
                width: '110px',
                height: '180px',
                backgroundColor: '#E8D754',
                borderRadius: '55px 55px 0 0',
                zIndex: 4,
                transform: `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              {/* Eyes */}
              <div 
                className="absolute flex gap-5 transition-all duration-200 ease-out"
                style={{
                  left: `${38 + (yellowPos.faceX || 0)}px`,
                  top: `${32 + (yellowPos.faceY || 0)}px`,
                }}
              >
                <Pupil size={10} maxDistance={4} pupilColor="#2D2D2D" />
                <Pupil size={10} maxDistance={4} pupilColor="#2D2D2D" />
              </div>
              {/* Mouth */}
              <div 
                className="absolute w-12 h-[3px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
                style={{
                  left: `${30 + (yellowPos.faceX || 0)}px`,
                  top: `${70 + (yellowPos.faceY || 0)}px`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Premium Form */}
        <div className="lg:col-span-6">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 space-y-6 shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Success Overlay */}
            {isSuccess && (
              <div className="absolute inset-0 bg-[#09090b]/95 backdrop-blur-md z-30 flex flex-col items-center justify-center text-center p-8 space-y-6">
                <div className="w-16 h-16 rounded-full border border-neutral-700 flex items-center justify-center text-emerald-400 bg-neutral-900/60 shadow-lg">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="space-y-2 max-w-sm">
                  <h3 className="text-xl font-normal text-white">Message Dispatched</h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Thank you {name || "there"}! Your message has been sent successfully. I will get back to you soon.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900 hover:bg-neutral-800/80 text-xs tracking-widest text-neutral-300 uppercase transition-all duration-300 font-medium cursor-pointer"
                >
                  Send Another
                </button>
              </div>
            )}



            {error && (
              <div className="bg-rose-950/20 border border-rose-900/50 text-rose-300 text-xs px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Input Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-medium text-neutral-400">
                Name , Surname
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Tarun Lakra"
                value={name}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                className="w-full bg-neutral-950/50 border border-neutral-800 hover:border-neutral-700/80 focus:border-white/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Input Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-medium text-neutral-400">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="example@example.com"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                className="w-full bg-neutral-950/50 border border-neutral-800 hover:border-neutral-700/80 focus:border-white/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Input Phone Number */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-xs font-medium text-neutral-400">
                Phone Number
              </label>
              <input
                id="phone"
                name="number"
                type="tel"
                placeholder="+91 _ _ _ _ _ _ _ _ _ _"
                value={phone}
                autoComplete="off"
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                className="w-full bg-neutral-950/50 border border-neutral-800 hover:border-neutral-700/80 focus:border-white/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Input Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-medium text-neutral-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="describe whatever you want."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                className="w-full bg-neutral-950/50 border border-neutral-800 hover:border-neutral-700/80 focus:border-white/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit Button with Video Rain Hover Effect */}
            <button
              type="submit"
              disabled={isLoading}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="w-full h-12 rounded-lg bg-white hover:bg-neutral-100 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 text-xs tracking-[0.25em] font-semibold uppercase transition-all duration-300 shadow-xl relative overflow-hidden flex justify-center items-center cursor-pointer"
            >
              {/* Rain Video Background */}
              <video
                src="https://www.w3schools.com/howto/rain.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full transition-opacity duration-300 pointer-events-none"
                style={{
                  opacity: isButtonHovered ? 1 : 0,
                  filter: 'brightness(1.5)',
                }}
              />

              {/* Dark Overlay */}
              <div
                className="absolute inset-0 w-full h-full bg-black/50 transition-opacity duration-300 pointer-events-none"
                style={{ opacity: isButtonHovered ? 1 : 0 }}
              />

              {/* Button Text */}
              <span
                className="relative z-10 transition-colors duration-300 flex items-center justify-center gap-2"
                style={{ color: isButtonHovered ? 'white' : undefined }}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </span>
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer
        email="lakra.tarun4302@gmail.com"
        location="New Delhi, India"
        linkedinUrl="https://www.linkedin.com/in/tarun-lakra/"
        githubUrl="https://github.com/tarunlakra4302"
        resumeUrl="https://drive.google.com/file/d/1hZEg2OOxralKmsUK_2fWJ3sVvWwob4PN/view?usp=sharing"
        className="relative z-10 mt-auto"
      />
    </div>
  );
}
