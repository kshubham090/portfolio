import { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import Testimonial from '../components/Testimonial';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Journey from '../components/Journey';
import Research from '../components/Research';
import Thoughts from '../components/Thoughts';
import FooterCTA from '../components/FooterCTA';

const GitHubActivity = lazy(() => import('../components/GitHubActivity'));

export default function Home() {
  return (
    <div className="site-wrap">
      <Hero />
      <About />
      <Projects />
      <Testimonial />
      <Skills />
      <Suspense fallback={null}>
        <GitHubActivity />
      </Suspense>
      <Journey />
      <Research />
      <Thoughts />
      <FooterCTA />
    </div>
  );
}
