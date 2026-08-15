import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const PaperF1 = lazy(() => import('./pages/PaperF1'));

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<Suspense fallback={null}><ProjectDetail /></Suspense>} />
          <Route path="/research/f1-lap-time-pitstop-prediction" element={<Suspense fallback={null}><PaperF1 /></Suspense>} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
