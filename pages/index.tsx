import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import Roadmap from "../components/Roadmap";
import Token from "../components/Token";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <div>
        <Mission />
        <Token />
        <Roadmap />
        {/* <Join /> */}
      </div>
    </>
  );
};

export default Home;
