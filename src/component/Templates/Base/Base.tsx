import { Outlet, ScrollRestoration } from "react-router";
import { Header } from "../../Organisms/Header/Header";
import { Footer } from "../../Organisms/Footer/Footer";
import { GradientBackground } from "../../Atoms/GradientBackground/GradientBackground";
import { useCallback, useEffect, useRef, useState } from "react";

export const Base = () => {
  const LogoRef = useRef<HTMLAnchorElement>(null)
  const [isAnimating, setIsAnimating] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e: MediaQueryListEvent) => setIsAnimating(!e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const handleAnimationToggle = useCallback(() => {
    setIsAnimating((prev) => !prev)
  }, [])

  return (
    <>
      <GradientBackground isAnimating={isAnimating} />
      <div className="relative">
        <Header logoRef={LogoRef} isAnimating={isAnimating} onAnimationToggle={handleAnimationToggle} />
        <Outlet />
        <Footer logoRef={LogoRef}/>
      </div>
      <ScrollRestoration />
    </>
  );
};
