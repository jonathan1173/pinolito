import React from "react";
import MapView from "../components/MapView";
import Hero from "../components/Hero";
import Details from "../components/Details";
import Vision from "../components/Vision";
import HorizontalScrollSection from "../components/scrollHorizontal";
import AboutUs from "../components/AboutUs";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <MapView />
      <Details />
      <HorizontalScrollSection />
      <Vision />
    </div>
  );
}
