import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, ChevronDown, Heart, MessageCircle, Rocket, Shield, Sparkles, Target, User, Zap } from "lucide-react"

// Button component replacement
function Button({ children, size = "md", variant = "primary", className = "", ...props }) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl"
  }
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border-2 border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-500"
  }
  
  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const sectionRefs = useRef({})

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  const setSectionRef = (id) => (el) => {
    sectionRefs.current[id] = el
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">Shan Li</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-slate-600 hover:text-slate-900 transition-colors">
                Services
              </a>
              <a href="#pourquoi-moi" className="text-slate-600 hover:text-slate-900 transition-colors">
                Pourquoi moi
              </a>
              <a href="#tarifs" className="text-slate-600 hover:text-slate-900 transition-colors">
                Tarifs
              </a>
            </div>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Me contacter
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Multi-Layer Parallax Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Layer 1 - Base animated background */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          />
          
          {/* Layer 2 - Floating shapes with slower parallax */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              transform: `translateY(${scrollY * 0.03}px)`,
            }}
          >
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-32 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          </div>
          
          {/* Layer 3 - Grid pattern with medium parallax */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(0deg, #cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              transform: `translateY(${scrollY * 0.04}px)`,
            }}
          />
          
          {/* Layer 4 - Top overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/60" />
        </div>

        {/* Hero Content */}
        <div
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: Math.max(0, 1 - scrollY / 600),
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-slate-600">
              Freelance basé à La Réunion | 3 ans d&apos;expérience
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Je crée votre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
              présence digitale
            </span>{" "}
            sur mesure
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sites web, landing pages, applications... Je vous accompagne de A à Z pour donner vie à vos projets.
            Pas de jargon, pas de blabla — juste du concret et des résultats.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20">
              Discutons de votre projet
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              Voir mes réalisations
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-slate-600">
              <Check className="w-5 h-5 text-green-500" />
              <span>Devis gratuit sous 24h</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Check className="w-5 h-5 text-green-500" />
              <span>Tarifs transparents</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Check className="w-5 h-5 text-green-500" />
              <span>Disponible pour échanger</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-slate-400" />
        </div>
      </section>

      {/* Bento Grid Section */}
      <section
        id="services"
        ref={setSectionRef("services")}
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Ce que je peux faire pour vous
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Fort de 3 ans d&apos;expérience, je vous accompagne sur tous vos projets digitaux
            </p>
          </div>

          {/* Bento Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-1000 ${isVisible["services"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Large Card - spans 2 columns */}
            <div className="md:col-span-2 md:row-span-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer">
              <div className="h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Rocket className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Sites Web & Applications
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Vous avez une idée qui vous tient à cœur ? J&apos;adore ça ! Du site vitrine à l&apos;appli web,
                  on la concrétise ensemble et on crée quelque chose qui vous ressemble vraiment et qui marche.
                </p>
                <div className="mt-auto grid grid-cols-3 gap-4">
                  <div className="bg-slate-100 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-slate-900">3 ans</div>
                    <div className="text-sm text-slate-600">Expérience</div>
                  </div>
                  <div className="bg-slate-100 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-slate-900">100%</div>
                    <div className="text-sm text-slate-600">Sur mesure</div>
                  </div>
                  <div className="bg-slate-100 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-slate-900">24h</div>
                    <div className="text-sm text-slate-600">Réponse</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Cards */}
            <BentoCard
              icon={<Target className="w-6 h-6 text-blue-600" />}
              title="Landing Pages"
              description="Une page, un objectif : que vos visiteurs passent à l'action"
              delay="0.1s"
              isVisible={isVisible["services"]}
            />
            <BentoCard
              icon={<Shield className="w-6 h-6 text-blue-600" />}
              title="Sites Vitrines"
              description="Montrez qui vous êtes. Le reste, je m'en occupe"
              delay="0.2s"
              isVisible={isVisible["services"]}
            />
            <BentoCard
              icon={<Zap className="w-6 h-6 text-blue-600" />}
              title="Refonte & Boost"
              description="Votre site date un peu ? On lui redonne une seconde jeunesse"
              delay="0.3s"
              isVisible={isVisible["services"]}
            />
            <BentoCard
              icon={<Sparkles className="w-6 h-6 text-blue-600" />}
              title="Conseil"
              description="Pas sûr de ce qu'il vous faut ? On en parle, c'est gratuit"
              delay="0.4s"
              isVisible={isVisible["services"]}
            />
          </div>
        </div>
      </section>

      {/* Pourquoi me faire confiance Section */}
      <section
        id="pourquoi-moi"
        ref={setSectionRef("pourquoi-moi")}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Pourquoi me faire confiance ?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Je joue cartes sur table : voici ce qui fait la différence quand vous travaillez avec moi
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ${isVisible["pourquoi-moi"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <TrustCard
              icon={<User className="w-7 h-7 text-blue-600" />}
              title="Interlocuteur unique"
              description="Pas de chef de projet, pas de standardiste. Vous parlez directement à l'expert qui réalise votre projet. C'est plus simple, plus rapide et plus efficace."
              delay="0s"
            />
            <TrustCard
              icon={<Shield className="w-7 h-7 text-blue-600" />}
              title="Flexibilité & Prix justes"
              description="Sans structure d'agence coûteuse, je vous propose des tarifs justes et une flexibilité totale. On s'adapte à vos contraintes, pas l'inverse."
              delay="0.1s"
            />
            <TrustCard
              icon={<Heart className="w-7 h-7 text-blue-600" />}
              title="Engagement à 100%"
              description="Votre satisfaction est ma seule publicité. Je m'investis pleinement dans chaque projet car votre réussite fait aussi la mienne."
              delay="0.2s"
            />
          </div>

          {/* Personal touch */}
          <div className={`mt-16 text-center transition-all duration-1000 ${isVisible["pourquoi-moi"] ? "opacity-100" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span className="text-slate-600">
                Basé à l&apos;île de La Réunion, disponible pour échanger ensemble
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="tarifs"
        ref={setSectionRef("tarifs")}
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Parlons de votre projet
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Chaque projet est unique. Je préfère discuter avec vous plutôt que d&apos;afficher des prix génériques.
            </p>
          </div>

          {/* Premium Pricing Card */}
          <div className={`relative transition-all duration-1000 ${isVisible["tarifs"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-3xl blur-xl opacity-30" />

            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-blue-200">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Devis gratuit
                </span>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Comment ça marche ?</h3>
                <p className="text-slate-600 mb-8">
                  Un process simple et transparent, sans surprise
                </p>

                <div className="mb-10">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl md:text-5xl font-bold text-slate-900">Échange gratuit</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    On discute de vos besoins, je vous fais un devis détaillé sous 24h
                  </p>
                </div>

                <ul className="grid md:grid-cols-2 gap-4 text-left mb-10">
                  {[
                    "Discussion pour comprendre vos besoins",
                    "Devis détaillé sous 24h",
                    "Pas d'engagement avant validation",
                    "Tarifs adaptés à votre budget",
                    "Paiement échelonné possible",
                    "Suivi régulier du projet",
                    "Modifications incluses",
                    "Support après livraison",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button size="lg" className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20">
                  Discutons de votre projet
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-sm text-slate-500 mt-4">
                  Réponse garantie sous 24h, même le week-end
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">Shan Li</span>
            </div>
            <div className="flex items-center gap-8 text-slate-600">
              <a href="#" className="hover:text-slate-900 transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Confidentialité
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Contact
              </a>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 Shan Li. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function BentoCard({
  icon,
  title,
  description,
  delay,
  isVisible,
}) {
  return (
    <div
      className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 hover:shadow-xl transition-all cursor-pointer"
      style={{
        transitionDelay: delay,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function TrustCard({
  icon,
  title,
  description,
  delay,
}) {
  return (
    <div
      className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
      style={{ transitionDelay: delay }}
    >
      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  )
}

export default App
