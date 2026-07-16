import { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import Testimonial from '../components/Testimonial';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Journey from '../components/Journey';
import Thoughts from '../components/Thoughts';
import FooterCTA from '../components/FooterCTA';

const GitHubActivity = lazy(() => import('../components/GitHubActivity'));

export default function Home() {
  return (
    <div className="site-wrap">
      <Hero />
      <Testimonial />
      <About />
      <Projects />
      <Skills />
      <Suspense fallback={null}>
        <GitHubActivity />
      </Suspense>
      <Journey />
      <Thoughts />
      <FooterCTA />
    </div>
  );
}
