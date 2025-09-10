import React from "react";
import MapView from "../components/MapView";
import Hero from "../components/Hero";
import Details from "../components/Details";
import Vision from "../components/Vision";
import HorizontalScrollSection from '../components/scrollHorizontal';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Details />
      <MapView />
      <HorizontalScrollSection/>
      <Vision />
    </div>
  );
}
