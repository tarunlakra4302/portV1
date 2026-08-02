"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { usePageNavigate } from "@/lib/view-transition";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const SterlingNavigation = React.forwardRef<
  HTMLDivElement,
  { style?: React.CSSProperties; isCompleted?: boolean }
>(({ style, isCompleted = true }, ref) => {
  const pathname = usePathname();
  const navigateWithTransition = usePageNavigate();
  const [currentTime, setCurrentTime] = useState("13:29");

  // Dynamic Kolkata local time clock
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href === "/") {
      try {
        sessionStorage.setItem("animateHeroText", "true");
      } catch (err) {
        // ignore
      }
    }
    navigateWithTransition(href, "rectangle", "left-right");
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Craft", href: "/projects" },
    { label: "Thoughts", href: "/thoughts" },
    { label: "Contact", href: "/contact" },
  ];

  const isDarkRoute = pathname === "/contact";
  const hideTopHeader = pathname === "/" || pathname === "/about";

  if (pathname === "/") {
    return null;
  }

  return (
    <header
      ref={ref}
      style={{
        opacity: isCompleted ? 1 : 0,
        pointerEvents: isCompleted ? "auto" : "none",
        transition: "opacity 0.5s ease",
        ...style,
      }}
      className={`w-full font-sans relative z-40 border-b ${
        isDarkRoute
          ? "bg-[#09090b] text-white border-neutral-800/80"
          : "bg-white text-black border-gray-100"
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-4 relative">
        {/* Top Row: Brand + Local Time on Left, Bio Statement on Right (hidden on homepage & about page) */}
        {!hideTopHeader && (
          <div
            className={`flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 mb-4 ${
              isDarkRoute ? "" : "border-b border-gray-100/60"
            }`}
          >
            {/* Left: Brand Name & Local Time */}
            <div className="flex flex-col justify-start">
              <Link
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
                className={`text-xl md:text-2xl font-bold tracking-tight hover:opacity-75 transition-opacity ${
                  isDarkRoute ? "text-white" : "text-black"
                }`}
              >
                Tarun Lakra
              </Link>
              <p
                className={`text-sm mt-1 ${
                  isDarkRoute ? "text-neutral-500" : "text-[#c2c2c2]"
                }`}
              >
                Local time — {currentTime} New Delhi, India.
              </p>
            </div>

            {/* Right: Bio Statement */}
            <div
              className={`text-left md:text-right font-normal text-sm md:text-base max-w-2xl lg:max-w-3xl leading-relaxed transition-all duration-300 cursor-default group ${
                isDarkRoute
                  ? "text-white md:text-neutral-400 md:hover:text-white"
                  : "text-black md:text-[#c2c2c2] md:hover:text-black"
              }`}
            >
              {pathname === "/thoughts" ? (
                <>
                  If you ask the grass, the zebra is the monster, and the lion is the protector. Who is the villain depends on &ldquo;
                  <span
                    className={`transition-all duration-300 font-semibold underline underline-offset-4 decoration-2 ${
                      isDarkRoute
                        ? "text-white decoration-pink-500 md:font-normal md:no-underline md:group-hover:text-white md:group-hover:font-semibold md:group-hover:underline"
                        : "text-black decoration-pink-500 md:font-normal md:no-underline md:group-hover:text-black md:group-hover:font-semibold md:group-hover:underline"
                    }`}
                  >
                    who is telling the story
                  </span>
                  &rdquo;.
                </>
              ) : pathname === "/projects" ? (
                <>
                  Focused on crafting products with{" "}
                  <span
                    className={`italic transition-all duration-300 font-semibold ${
                      isDarkRoute
                        ? "text-white md:font-normal md:group-hover:text-white md:group-hover:font-semibold"
                        : "text-black md:font-normal md:group-hover:text-black md:group-hover:font-semibold"
                    }`}
                  >
                    exceptional performance
                  </span>{" "}
                  and{" "}
                  <span
                    className={`italic transition-all duration-300 font-semibold ${
                      isDarkRoute
                        ? "text-white md:font-normal md:group-hover:text-white md:group-hover:font-semibold"
                        : "text-black md:font-normal md:group-hover:text-black md:group-hover:font-semibold"
                    }`}
                  >
                    polish
                  </span>
                  .
                  <br />
                  Worst-case scenario, I&apos;ll make it; best-case scenario,{" "}
                  <span
                    className={`transition-all duration-300 font-semibold underline underline-offset-4 decoration-2 ${
                      isDarkRoute
                        ? "text-white decoration-yellow-400 md:font-normal md:no-underline md:group-hover:text-white md:group-hover:font-semibold md:group-hover:underline"
                        : "text-black decoration-pink-500 md:font-normal md:no-underline md:group-hover:text-black md:group-hover:font-semibold md:group-hover:underline"
                    }`}
                  >
                    I&apos;ll make it big
                  </span>
                  .
                </>
              ) : pathname === "/contact" ? (
                <>
                  My toxic trait is that I want to{" "}
                  <span
                    className={`transition-all duration-300 font-semibold underline underline-offset-4 decoration-2 ${
                      isDarkRoute
                        ? "text-white decoration-yellow-400 md:font-normal md:no-underline md:group-hover:text-white md:group-hover:font-semibold md:group-hover:underline"
                        : "text-black decoration-pink-500 md:font-normal md:no-underline md:group-hover:text-black md:group-hover:font-semibold md:group-hover:underline"
                    }`}
                  >
                    create everything
                  </span>{" "}
                  all at once.
                </>
              ) : (
                <>
                  My toxic trait is that I want to{" "}
                  <span
                    className={`transition-all duration-300 font-semibold underline underline-offset-4 decoration-2 ${
                      isDarkRoute
                        ? "text-white decoration-yellow-400 md:font-normal md:no-underline md:group-hover:text-white md:group-hover:font-semibold md:group-hover:underline"
                        : "text-black decoration-pink-500 md:font-normal md:no-underline md:group-hover:text-black md:group-hover:font-semibold md:group-hover:underline"
                    }`}
                  >
                    create everything
                  </span>{" "}
                  all at once.
                </>
              )}
            </div>
          </div>
        )}

        {/* Bottom Row: Navigation Links & Lottie Animation */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-6 text-sm font-medium tracking-wide">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? isDarkRoute
                        ? "text-white font-bold border-b-2 border-white pb-0.5"
                        : "text-black font-bold border-b-2 border-black pb-0.5"
                      : isDarkRoute
                      ? "text-neutral-400 hover:text-white"
                      : "text-[#c2c2c2] hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {pathname?.startsWith("/about") && (
            <div className="absolute right-6 md:right-12 -bottom-4 translate-y-1 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center shrink-0 pointer-events-none">
              <DotLottieReact
                src="https://lottie.host/7400cdfb-986c-4f87-9b5d-d7f90c7a0f4f/6P3YDZEwXf.json"
                loop
                autoplay
              />
            </div>
          )}

          {pathname?.startsWith("/projects") && (
            <div className="absolute right-6 md:right-12 -bottom-4 translate-y-1 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center shrink-0 pointer-events-none">
              <DotLottieReact
                src="https://lottie.host/3d6470da-e1df-43ea-b8c5-d7954c1a497f/nCFmfwv2hN.json"
                loop
                autoplay
              />
            </div>
          )}

          {pathname?.startsWith("/thoughts") && (
            <div className="absolute right-6 md:right-12 -bottom-4 translate-y-1 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center shrink-0 pointer-events-none">
              <DotLottieReact
                src="https://lottie.host/182b5d6e-3649-46c4-97ef-dc09b6dfc7af/f5NiPLU9vp.json"
                loop
                autoplay
              />
            </div>
          )}

          {pathname?.startsWith("/contact") && (
            <div className="absolute right-6 md:right-12 -bottom-4 translate-y-1 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center shrink-0 pointer-events-none">
              <DotLottieReact
                src="https://lottie.host/b92851da-ead9-408d-9602-f688fa1234ec/66tklHI50M.json"
                loop
                autoplay
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
});

SterlingNavigation.displayName = "SterlingNavigation";

export default SterlingNavigation;
