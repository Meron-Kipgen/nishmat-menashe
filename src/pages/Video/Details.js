import React from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import MobileDetails from "./MobileDetails";
import PcDetails from "./PcDetails";

export default function Details() {
  const isMobile = useMediaQuery('screen and (max-width: 768px)');
  return (
    <>
      {isMobile ? <MobileDetails /> : <PcDetails />}
    </>
  );
}
