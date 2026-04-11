import { useEffect, useRef, useState } from "react"
import { ArrowRight, Figma, Layout, Palette, Code, Smartphone, Lightbulb } from "lucide-react"

// Color Palette - Dark Mode
const colors = {
  primary: "#2E50A1",      // Cobalt Blue
  secondary: "#919CC5",    // Lavender Blue
  frost: "#D6E4FF",        // Frost Blue
  darkNavy: "#1A2B52",     // Dark Navy Blue
  bg: "#0F172A",           // Slate 900 - dark background
  surface: "#1E293B",      // Slate 800 - card surface
  text: "#F1F5F9",         // Slate 100 - primary text
  muted: "#94A3B8",        // Slate 400 - muted text
  border: "#334155",       // Slate 700 - borders
}

// Bento Card Component
function BentoCard({ icon, title, description, className = "" }) {
  return (
    <div 
      className={`rounded-2xl p-6 border transition-all duration-300 hover:border-opacity-50 cursor-pointer group ${className}`}
      style={{ 
        backgroundColor: colors.surface,
        borderColor: colors.border
      }}
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ backgroundColor: colors.primary + "20" }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>
        {description}
      </p>
    </div>
  )
}

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const servicesRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (servicesRef.current) observer.observe(servicesRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p 
            className="text-sm font-medium tracking-widest uppercase mb-6"
            style={{ color: colors.secondary }}
          >
            UX/UI Designer
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 leading-tight" style={{ color: colors.text }}>
            Shan Li
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: colors.muted }}>
            Je crée des interfaces simples, élégantes et pensées pour l&apos;utilisateur.
          </p>
          <a 
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:gap-3"
            style={{ backgroundColor: colors.primary, color: colors.text }}
          >
            Mes services
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Services - Bento Grid */}
      <section 
        id="services" 
        ref={servicesRef}
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Ce que je fais
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: colors.muted }}>
              Du concept à la livraison, chaque projet est conçu avec soin.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Large Card - spans 2 columns */}
            <div 
              className="md:col-span-2 rounded-2xl p-8 border transition-all duration-300 hover:border-opacity-50 cursor-pointer group"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{ backgroundColor: colors.primary + "20" }}
              >
                <Figma className="w-7 h-7" style={{ color: colors.primary }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: colors.text }}>
                Design d&apos;interfaces
              </h3>
              <p className="leading-relaxed mb-6" style={{ color: colors.muted }}>
                Maquettes, prototypes et systèmes de design. Je transforme vos idées en interfaces claires et cohérentes.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl p-4 text-center" style={{ backgroundColor: colors.bg }}>
                  <div className="text-2xl font-bold" style={{ color: colors.text }}>Figma</div>
                  <div className="text-sm" style={{ color: colors.muted }}>Expert</div>
                </div>
                <div className="rounded-xl p-4 text-center" style={{ backgroundColor: colors.bg }}>
                  <div className="text-2xl font-bold" style={{ color: colors.text }}>3 ans</div>
                  <div className="text-sm" style={{ color: colors.muted }}>Expérience</div>
                </div>
                <div className="rounded-xl p-4 text-center" style={{ backgroundColor: colors.bg }}>
                  <div className="text-2xl font-bold" style={{ color: colors.text }}>100%</div>
                  <div className="text-sm" style={{ color: colors.muted }}>Sur mesure</div>
                </div>
              </div>
            </div>

            {/* Small Cards */}
            <BentoCard
              icon={<Layout className="w-6 h-6" style={{ color: colors.primary }} />}
              title="Landing Pages"
              description="Une page, un objectif : convertir vos visiteurs"
            />
            <BentoCard
              icon={<Palette className="w-6 h-6" style={{ color: colors.primary }} />}
              title="Direction Artistique"
              description="Identité visuelle et univers graphique cohérent"
            />
            <BentoCard
              icon={<Smartphone className="w-6 h-6" style={{ color: colors.primary }} />}
              title="Design Mobile"
              description="Interfaces natives pensées pour le tactile"
            />
            <BentoCard
              icon={<Code className="w-6 h-6" style={{ color: colors.primary }} />}
              title="Design System"
              description="Composants réutilisables et documentation vivante"
            />
            <BentoCard
              icon={<Lightbulb className="w-6 h-6" style={{ color: colors.primary }} />}
              title="Conseil UX"
              description="Audit, tests utilisateurs et recommandations"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
