import { MotionConfig } from 'framer-motion'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Services } from './components/Services'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    // reducedMotion="user" turns transform animations off for people who ask their OS for less motion
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
