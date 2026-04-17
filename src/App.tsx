import Cursor from "./components/Cursor";
import SmoothScroll from "./components/SmoothScroll";
import ScrollBar from "./components/ScrollBar";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import NowPlaying from "./components/NowPlaying";
import Skills from "./components/Skills";
import Marquee from "./components/Marquee";
import Timeline from "./components/Timeline";
import Work from "./components/Work";
import MoodPicker from "./components/MoodPicker";
import Mind from "./components/Mind";
import Whispers from "./components/Whispers";
import StickyBoard from "./components/StickyBoard";
import TypeRacer from "./components/TypeRacer";
import DoYouLoveMe from "./components/DoYouLoveMe";
import Manifesto from "./components/Manifesto";
import Stats from "./components/Stats";
import ScratchCard from "./components/ScratchCard";
import Terminal from "./components/Terminal";
import BusinessCard from "./components/BusinessCard";
import VaultHandles from "./components/VaultHandles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import EasterEgg from "./components/EasterEgg";
import Loader from "./components/Loader";
import BabyChat from "./components/BabyChat";

export default function App() {
  return (
    <div className="relative grain bg-cream text-ink">
      <Loader />
      <SmoothScroll />
      <Cursor />
      <ScrollBar />
      <Nav />
      <CommandPalette />
      <EasterEgg />
      <main>
        <Hero />
        <About />
        <NowPlaying />
        <Skills />
        <Marquee />
        <Timeline />
        <Work />
        <MoodPicker />
        <Mind />
        <Whispers />
        <StickyBoard />
        <TypeRacer />
        <DoYouLoveMe />
        <Manifesto />
        <Stats />
        <ScratchCard />
        <Terminal />
        <BusinessCard />
        <VaultHandles />
        <Contact />
      </main>
      <Footer />
      <BabyChat />
    </div>
  );
}
