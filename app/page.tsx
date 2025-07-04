import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import CertificationsSection from "@/components/certifications-section"
import ContactSection from "@/components/contact-section"
import SpaceBackground from "@/components/space-background"
import Navbar from "@/components/navbar"
import CustomCursor from "@/components/custom-cursor"
import StarBackground from "@/components/StarBackground"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <StarBackground />
        <SpaceBackground />
      </div>

      {/* Cursor Layer */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        <CustomCursor />
      </div>

      {/* Content Layer */}
      <div className="relative z-20">
        <Navbar />
        <div className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
        </div>
      </div>
    </main>
  )
}

