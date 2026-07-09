import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Journey from '../components/Journey';
import Thoughts from '../components/Thoughts';
import Quote from '../components/Quote';
import FooterCTA from '../components/FooterCTA';

export default function Home() {
  return (
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
  );
}
