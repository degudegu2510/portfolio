import { Outlet, ScrollRestoration } from "react-router";
import { Header } from "../../Organisms/Header/Header";
import { Footer } from "../../Organisms/Footer/Footer";
import { useRef } from "react";

export const Base = () => {
  const LogoRef = useRef<HTMLAnchorElement>(null)
  
  return (
    <>
      <Header logoRef={LogoRef}/>
      <Outlet />
      <Footer logoRef={LogoRef}/>
      <ScrollRestoration />
    </>
  );
};