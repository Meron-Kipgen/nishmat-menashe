import React, { useEffect, useRef } from "react";
import Navbar from "./header/Navbar";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import useMediaQuery from "./../hooks/useMediaQuery";

import FooterMenu from "./MobileMenu/FooterMenu";
import HeaderMenu from "./MobileMenu/HeaderMenu";

export default function Layout() {
  // Use useRef to persist the lastScrollY value across renders
  const lastScrollY = useRef(window.scrollY);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY.current) {
      lastScrollY.current = window.scrollY;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {isMobile ? (
        <>
          <HeaderMenu />
          <Main />
          <FooterMenu />
        </>
      ) : (
        <>
          <Navbar />
          <Main />
        </>
      )}
    </>
  );
}
