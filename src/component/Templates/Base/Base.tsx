import { Outlet, ScrollRestoration } from "react-router";
import { Header } from "../../Organisms/Header/Header";
import { Footer } from "../../Organisms/Footer/Footer";
import { GradientBackground } from "../../Atoms/GradientBackground/GradientBackground";
import { useRef } from "react";

export const Base = () => {
  const LogoRef = useRef<HTMLAnchorElement>(null)

  return (
    <>
      <GradientBackground />
      <div className="relative">
        <Header logoRef={LogoRef}/>
        <Outlet />
        <Footer logoRef={LogoRef}/>
      </div>
      <ScrollRestoration />
    </>
  );
};