import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import AgentDrawer from './components/AgentDrawer';
import Neko from './components/Neko';
import WelcomePopup from './components/WelcomePopup';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import { AgentDrawerProvider } from './context/AgentDrawerContext';

export default function App() {
  return (
    <AgentDrawerProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
      <Footer />
      <AgentDrawer />
      <Neko />
      <WelcomePopup />
      <Analytics />
    </AgentDrawerProvider>
  );
}
