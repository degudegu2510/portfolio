import { Outlet, ScrollRestoration } from "react-router";
import { Header } from "../../Organisms/Header/Header";

export const Base = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  );
};