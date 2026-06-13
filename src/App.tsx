import { Analytics } from '@vercel/analytics/react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Thoughts from './components/Thoughts';
import Quote from './components/Quote';
import FooterCTA from './components/FooterCTA';
import Footer from './components/Footer';
import AgentDrawer from './components/AgentDrawer';
import Neko from './components/Neko';
import Tour from './components/Tour';

export default function App() {
  return (
    <>
      <Nav />
      <div className="site-wrap">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Thoughts />
        <Quote />
        <FooterCTA />
      </div>
      <Footer />
      <AgentDrawer />
      <Neko />
      <Tour />
      <Analytics />
    </>
  );
}
