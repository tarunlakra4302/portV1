"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { usePageNavigate } from "@/lib/view-transition";

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
    navigateWithTransition(href, "rectangle", "left-right");
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/projects" },
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
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-4">
        {/* Top Row: Brand + Local Time on Left, Bio Statement on Right (hidden on homepage & about page) */}
        {!hideTopHeader && (
          <div
            className={`flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b mb-4 ${
              isDarkRoute ? "border-neutral-800/60" : "border-gray-100/60"
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
                  ? "text-neutral-400 hover:text-white"
                  : "text-[#c2c2c2] hover:text-black"
              }`}
            >
              {pathname === "/thoughts" ? (
                <>
                  If you ask the grass, the zebra is the monster, and the lion is the protector. Who is the Villain is dependent on &ldquo;
                  <span
                    className={`transition-all duration-300 ${
                      isDarkRoute
                        ? "group-hover:text-white group-hover:font-semibold group-hover:underline underline-offset-4 decoration-pink-500 decoration-2"
                        : "group-hover:text-black group-hover:font-semibold group-hover:underline underline-offset-4 decoration-pink-500 decoration-2"
                    }`}
                  >
                    Who is telling the story
                  </span>
                  &rdquo;
                </>
              ) : pathname === "/projects" ? (
                <>
                  Focused on crafting products with{" "}
                  <span
                    className={`italic transition-all duration-300 ${
                      isDarkRoute
                        ? "group-hover:text-white group-hover:font-semibold"
                        : "group-hover:text-black group-hover:font-semibold"
                    }`}
                  >
                    exceptional performance
                  </span>{" "}
                  and{" "}
                  <span
                    className={`italic transition-all duration-300 ${
                      isDarkRoute
                        ? "group-hover:text-white group-hover:font-semibold"
                        : "group-hover:text-black group-hover:font-semibold"
                    }`}
                  >
                    polish
                  </span>
                  .
                  <br />
                  Worst case scenario I&apos;ll make it, best case scenario{" "}
                  <span
                    className={`transition-all duration-300 ${
                      isDarkRoute
                        ? "group-hover:text-white group-hover:font-semibold group-hover:underline underline-offset-4 decoration-yellow-400 decoration-2"
                        : "group-hover:text-black group-hover:font-semibold group-hover:underline underline-offset-4 decoration-pink-500 decoration-2"
                    }`}
                  >
                    I&apos;ll make it big
                  </span>
                  .
                </>
              ) : (
                <>
                  I turn my{" "}
                  <span
                    className={`transition-all duration-300 ${
                      isDarkRoute
                        ? "group-hover:text-white group-hover:font-semibold"
                        : "group-hover:text-black group-hover:font-semibold"
                    }`}
                  >
                    frustrations and passions
                  </span>{" "}
                  into products that{" "}
                  <span
                    className={`transition-all duration-300 ${
                      isDarkRoute
                        ? "group-hover:text-white group-hover:font-semibold"
                        : "group-hover:text-black group-hover:font-semibold"
                    }`}
                  >
                    improve
                  </span>{" "}
                  how people work and interact with their lives.
                  <br />
                  Worst case scenario I&apos;ll make it, best case scenario{" "}
                  <span
                    className={`transition-all duration-300 ${
                      isDarkRoute
                        ? "group-hover:text-white group-hover:font-semibold group-hover:underline underline-offset-4 decoration-yellow-400 decoration-2"
                        : "group-hover:text-black group-hover:font-semibold group-hover:underline underline-offset-4 decoration-pink-500 decoration-2"
                    }`}
                  >
                    I&apos;ll make it big
                  </span>
                  .
                </>
              )}
            </div>
          </div>
        )}

        {/* Bottom Row: Navigation Links */}
        <div className="flex items-center gap-6 pt-2 text-sm font-medium tracking-wide">
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
      </div>
    </header>
  );
});

SterlingNavigation.displayName = "SterlingNavigation";

export default SterlingNavigation;
