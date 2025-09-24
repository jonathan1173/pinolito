import React from "react";
import Hero from "../components/Hero";
import Details from "../components/Details";
import Vision from "../components/Vision";
import HorizontalScrollSection from "../components/scrollHorizontal";
import AboutUs from "../components/AboutUs";
import Map from "../../../shared/components/Map";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <div className="mx-4 md:mx-20">
        <Map mode="departamentos" />
      </div>
      <Details />
      <HorizontalScrollSection />
        {/* <Vision /> */}
    </div>
  );
}
