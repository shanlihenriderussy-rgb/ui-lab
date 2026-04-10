import { useState } from "react"
import { 
  LayoutDashboard, 
  FolderKanban, 
  BarChart3, 
  Megaphone, 
  Bell, 
  UserCircle, 
  Plus,
  MoreHorizontal,
  TrendingUp,
  Users,
  DollarSign,
  Search
} from "lucide-react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"

// Color Palette
const colors = {
  primary: "#2E50A1",      // Cobalt Blue
  secondary: "#919CC5",    // Lavender Blue
  frost: "#D6E4FF",        // Frost Blue
  darkNavy: "#1A2B52",     // Dark Navy Blue
  white: "#FFFFFF"
}

// Button Component
function Button({ children, variant = "primary", className = "", ...props }) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
  const variantClasses = {
    primary: "text-white hover:opacity-90 focus:ring-opacity-50",
    ghost: "bg-transparent hover:bg-opacity-10"
  }
  
  const bgStyle = variant === "primary" ? { backgroundColor: colors.primary } : {}
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={bgStyle}
      {...props}
    >
      {children}
    </button>
  )
}

// KPI Card Component
function KPICard({ title, value, icon: Icon, trend }) {
  return (
    <div 
      className="rounded-2xl p-6 transition-all duration-200 hover:shadow-lg"
      style={{ backgroundColor: colors.frost }}
    >
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: colors.primary }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-sm font-medium text-green-600 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-3xl font-bold mb-1" style={{ color: colors.darkNavy }}>
        {value}
      </h3>
      <p className="text-sm font-medium" style={{ color: colors.secondary }}>
        {title}
      </p>
    </div>
  )
}

// Status Badge Component
function StatusBadge({ status }) {
  const statusStyles = {
    "En cours": { bg: colors.primary, text: colors.white },
    "Revue": { bg: colors.secondary, text: colors.white },
    "Terminé": { bg: colors.darkNavy, text: colors.white }
  }
  
  const style = statusStyles[status] || statusStyles["En cours"]
  
  return (
    <span 
      className="px-3 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {status}
    </span>
  )
}

// UI LAB Logo Component
function UILABLogo() {
  return (
    <div className="flex items-center gap-3">
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center border-2"
        style={{ borderColor: colors.darkNavy, backgroundColor: colors.white }}
      >
        <span 
          className="text-lg font-bold"
          style={{ color: colors.darkNavy }}
        >
          Ui
        </span>
      </div>
      <span 
        className="text-xl font-bold tracking-tight"
        style={{ color: colors.darkNavy }}
      >
        UI LAB
      </span>
    </div>
  )
}

// Vercel Logo Component
function VercelLogo() {
  return (
    <svg 
      viewBox="0 0 76 65" 
      className="w-5 h-5 inline-block mr-2" 
      fill="currentColor"
    >
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  )
}

// Sample Data for Chart
const analyticsData = [
  { name: "Jan", leads: 4000, conversions: 2400 },
  { name: "Fév", leads: 3000, conversions: 1398 },
  { name: "Mar", leads: 2000, conversions: 9800 },
  { name: "Avr", leads: 2780, conversions: 3908 },
  { name: "Mai", leads: 1890, conversions: 4800 },
  { name: "Juin", leads: 2390, conversions: 3800 },
  { name: "Juil", leads: 3490, conversions: 4300 },
]

// Sample Projects Data
const recentProjects = [
  { id: 1, name: "Refonte Site E-commerce", client: "Boutique Océan", status: "En cours", date: "15 Jan 2026" },
  { id: 2, name: "Landing Page Produit", client: "Tech Réunion", status: "Revue", date: "12 Jan 2026" },
  { id: 3, name: "Application Mobile", client: "Transport Local", status: "Terminé", date: "10 Jan 2026" },
  { id: 4, name: "Campagne Marketing", client: "Hôtel Paradis", status: "En cours", date: "08 Jan 2026" },
]

// Navigation Item Component
function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
      style={{ 
        color: active ? colors.primary : colors.darkNavy,
        backgroundColor: active ? colors.frost : "transparent"
      }}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.white }}>
      {/* Top Navigation */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ 
          backgroundColor: colors.white,
          borderColor: colors.frost
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <UILABLogo />

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-2">
              <NavItem 
                icon={LayoutDashboard} 
                label="Tableau de bord" 
                active={activeTab === "dashboard"}
                onClick={() => setActiveTab("dashboard")}
              />
              <NavItem 
                icon={FolderKanban} 
                label="Projets" 
                active={activeTab === "projets"}
                onClick={() => setActiveTab("projets")}
              />
              <NavItem 
                icon={BarChart3} 
                label="Analytiques" 
                active={activeTab === "analytics"}
                onClick={() => setActiveTab("analytics")}
              />
              <NavItem 
                icon={Megaphone} 
                label="Marketing" 
                active={activeTab === "marketing"}
                onClick={() => setActiveTab("marketing")}
              />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5" style={{ color: colors.darkNavy }} />
                <span 
                  className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                />
              </button>
              <div className="flex items-center gap-2">
                <UserCircle className="w-8 h-8" style={{ color: colors.darkNavy }} />
                <span className="hidden sm:block text-sm font-medium" style={{ color: colors.darkNavy }}>
                  Shan li DERUSSY
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: colors.darkNavy }}
            >
              UI LAB: Panneau de Contrôle
            </h1>
            <p style={{ color: colors.secondary }}>
              Design d&apos;interfaces & Marketing digital
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <KPICard 
              title="Projets Actifs"
              value="24"
              icon={FolderKanban}
              trend="+12%"
            />
            <KPICard 
              title="Lead Generation"
              value="1,284"
              icon={Users}
              trend="+8%"
            />
            <KPICard 
              title="Revenus Marketing"
              value="€45.2k"
              icon={DollarSign}
              trend="+23%"
            />
          </div>

          {/* CTA Button */}
          <div className="mb-8">
            <Button className="px-6 py-3 gap-2">
              <Plus className="w-5 h-5" />
              Nouveau Projet
            </Button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div 
              className="rounded-2xl p-6"
              style={{ backgroundColor: colors.frost }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className="text-xl font-bold"
                  style={{ color: colors.darkNavy }}
                >
                  Projets Récents
                </h2>
                <button 
                  className="p-2 rounded-lg transition-colors hover:bg-white"
                  style={{ color: colors.secondary }}
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-md"
                    style={{ backgroundColor: colors.white }}
                  >
                    <div>
                      <h3 
                        className="font-semibold mb-1"
                        style={{ color: colors.darkNavy }}
                      >
                        {project.name}
                      </h3>
                      <p 
                        className="text-sm"
                        style={{ color: colors.secondary }}
                      >
                        {project.client}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span 
                        className="text-sm"
                        style={{ color: colors.secondary }}
                      >
                        {project.date}
                      </span>
                      <StatusBadge status={project.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Chart */}
            <div 
              className="rounded-2xl p-6"
              style={{ backgroundColor: colors.frost }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className="text-xl font-bold"
                  style={{ color: colors.darkNavy }}
                >
                  Tendances Marketing
                </h2>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <span className="text-sm" style={{ color: colors.secondary }}>Leads</span>
                  <div 
                    className="w-3 h-3 rounded-full ml-2"
                    style={{ backgroundColor: colors.secondary }}
                  />
                  <span className="text-sm" style={{ color: colors.secondary }}>Conversions</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.frost} />
                    <XAxis 
                      dataKey="name" 
                      stroke={colors.secondary}
                      fontSize={12}
                    />
                    <YAxis 
                      stroke={colors.secondary}
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.frost}`,
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="leads" 
                      stroke={colors.primary}
                      strokeWidth={3}
                      dot={{ fill: colors.primary }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="conversions" 
                      stroke={colors.secondary}
                      strokeWidth={3}
                      dot={{ fill: colors.secondary }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer 
        className="py-6 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.darkNavy }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <VercelLogo />
              <span style={{ color: colors.frost }}>
                Hébergé sur Vercel
              </span>
            </div>
            <p 
              className="text-sm"
              style={{ color: colors.frost }}
            >
              UI LAB © 2026. Design d&apos;interfaces & Marketing digital
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="#" 
                className="text-sm hover:underline transition-all"
                style={{ color: colors.frost }}
              >
                Termes de service
              </a>
              <a 
                href="#" 
                className="text-sm hover:underline transition-all"
                style={{ color: colors.frost }}
              >
                Confidentialité
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
