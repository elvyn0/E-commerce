import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import Bestseller from "../components/Bestseller";
import Policy from "../components/Policy";
import NewsLetterBox from "../components/NewsLetterBox";

function Home() {
  return (
    <div className="flex flex-col gap-5">
      <Hero />
      <LatestCollection />
      <Bestseller />
      <Policy />
      <NewsLetterBox />
    </div>
  );
}

export default Home;
