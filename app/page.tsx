"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Calendar,
  GraduationCap,
  Briefcase,
  Code,
  Smartphone,
  Database,
  Globe,
  Award,
  Menu,
  X,
  ExternalLink,
  Play,
  Target,
  Users,
  TrendingUp,
  BookOpen,
  Star,
  CheckCircle,
  ChevronDown,
  Sparkles,
  Rocket,
  Send,
  Heart,
  Coffee,
  Loader2,
} from "lucide-react"


// Hook to detect mobile devices - more specific detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      // More specific mobile detection - only phones, not tablets
      setIsMobile(window.innerWidth < 640) // sm breakpoint
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}

// Completely remove animations for mobile
const FloatingShapes = () => {
  const isMobile = useIsMobile()

  // No animations at all on mobile
  if (isMobile) return null

  // Full animations for desktop/tablet
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-float-slow"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full animate-float-medium"></div>
      <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full animate-float-fast"></div>
      <div className="absolute bottom-20 right-32 w-28 h-28 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-float-slow"></div>

      {/* Animated squares */}
      <div className="absolute top-60 left-1/4 w-16 h-16 bg-gradient-to-r from-indigo-400/15 to-blue-400/15 rotate-45 animate-spin-slow"></div>
      <div className="absolute bottom-60 right-1/4 w-20 h-20 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rotate-12 animate-pulse-slow"></div>

      {/* Animated triangles */}
      <div className="absolute top-1/3 right-10 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-cyan-400/20 animate-bounce-slow"></div>
      <div className="absolute bottom-1/3 left-1/3 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-emerald-400/20 animate-wiggle"></div>

      {/* Floating dots */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full animate-float-random"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  )
}

// Remove grid animation for mobile
const AnimatedGrid = () => {
  const isMobile = useIsMobile()

  if (isMobile) return null // Completely disabled on mobile

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      ></div>
    </div>
  )
}

// Remove particle system for mobile
const ParticleSystem = () => {
  const isMobile = useIsMobile()

  if (isMobile) return null // Completely disabled on mobile

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )
}

// Remove gradient orbs for mobile
const GradientOrbs = () => {
  const isMobile = useIsMobile()

  if (isMobile) return null // Completely disabled on mobile

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-drift-1"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-red-400/10 rounded-full blur-3xl animate-drift-2"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-3xl animate-drift-3"></div>
      <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-drift-4"></div>
    </div>
  )
}

// Simplified intersection observer - no animations on mobile
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    // On mobile, immediately set to intersecting (no animation delays)
    if (isMobile) {
      setIsIntersecting(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options, isMobile])

  return [ref, isIntersecting]
}

// No animations on mobile - instant display
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  })
  const isMobile = useIsMobile()

  // On mobile, no animations - just show content immediately
  if (isMobile) {
    return <div className={`opacity-100 translate-y-0 ${className}`}>{children}</div>
  }

  // Desktop/tablet animations
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const isMobile = useIsMobile()

  useEffect(() => {
    // Instant loading for mobile, animated for desktop
    const timer = setTimeout(
      () => {
        setIsLoaded(true)
      },
      isMobile ? 0 : 500, // Instant for mobile
    )

    const handleScroll = () => {
      setScrollY(window.scrollY)
      const sections = ["home", "about", "experience", "skills", "projects", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [isMobile])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const skills = {
    "Mobile Development": {
      skills: ["Flutter", "Dart"],
      icon: Smartphone,
      gradient: "from-blue-500 to-cyan-500",
    },
    "State Management": {
      skills: ["BLoC", "Provider", "GetX", "Riverpod"],
      icon: Code,
      gradient: "from-emerald-500 to-teal-500",
    },
    "Backend & Database": {
      skills: ["Firebase", "Hive", "SQLite"],
      icon: Database,
      gradient: "from-purple-500 to-violet-500",
    },
    "API Integration": {
      skills: ["RESTful APIs", "JSON", "HTTP", "DIO"],
      icon: Globe,
      gradient: "from-orange-500 to-red-500",
    },
    Additional: {
      skills: ["Google AdMob", "Clean Architecture"],
      icon: Award,
      gradient: "from-pink-500 to-rose-500",
    },
  }

  const experiences = [
    {
      title: "Junior Flutter Developer",
      company: "Tenacious Techies",
      period: "Oct 2024 - Present",
      description: [
        "Developed and maintained FoodChow POS system, handling 500+ daily transactions",
        "Optimized FoodChow KDS performance, reducing order processing time by 30%",
        "Implemented Provider state management and Hive local storage for seamless data handling",
        "Collaborated with cross-functional teams to enhance UI/UX, improving user satisfaction",
        "Independently mastered advanced technologies: BLoC, Firebase services, and AdMob integration",
      ],
      gradient: "from-blue-600 to-purple-600",
    },
    {
      title: "Flutter Developer Intern",
      company: "Tenacious Techies",
      period: "June 2024 - Sep 2024",
      description: [
        "Contributed to FoodChow POS and Customer App development with focus on UI enhancements",
        "Successfully integrated Provider for state management and Hive for local data persistence",
        "Implemented RESTful API integrations, improving backend communication efficiency by 25%",
        "Gained expertise in Flutter development best practices and clean code principles",
      ],
      gradient: "from-emerald-600 to-teal-600",
    },
  ]

  const projects = [
    {
      title: "FoodChow POS",
      type: "Professional",
      technologies: ["Flutter", "Provider", "API Integration", "Hive"],
      description:
        "Developed and optimized the POS system for restaurant management with seamless order processing and payment handling.",
      features: ["Local data storage with Hive", "Provider state management", "API integrations", "Payment processing"],
      link: "https://play.google.com/store/apps/details?id=com.tenacioustechies.foodchow.pos&pcampaignid=web_share",
      linkType: "playstore",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "FoodChow Customer App",
      type: "Professional",
      technologies: ["Flutter", "Provider", "API Integration"],
      description: "Contributed to UI enhancements for customer-facing restaurant application.",
      features: ["Enhanced UI/UX", "Customer order management", "Real-time updates"],
      link: "https://play.google.com/store/apps/details?id=com.tenacioustechies.foodchow&pcampaignid=web_share",
      linkType: "playstore",
      gradient: "from-green-500 to-teal-600",
    },
    {
      title: "FoodChow KDS",
      type: "Professional",
      technologies: ["Flutter", "GetX", "API Integration"],
      description: "Enhanced kitchen display system with improved UI and new functionalities.",
      features: ["Kitchen order management", "Real-time order tracking", "Performance optimization"],
      link: "https://play.google.com/store/apps/details?id=com.tenacioustechies.foodchow.kds&pcampaignid=web_share",
      linkType: "playstore",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "AutoMob",
      type: "Academic",
      technologies: ["PHP", "MySQL"],
      description: "Vehicle buying platform for bikes, scooters, cars, and EVs with comprehensive vehicle details.",
      features: ["Vehicle categorization", "Contact system", "Admin panel"],
      link: "https://github.com/SahilLiotech/AutoMob",
      linkType: "github",
      gradient: "from-orange-500 to-red-600",
    },
    {
      title: "MoneyMate",
      type: "Academic",
      technologies: ["Android (Kotlin)", "SQLite"],
      description: "Dummy banking app with local data management and comprehensive banking features.",
      features: ["User authentication", "Fund transfer simulation", "Transaction history"],
      link: null,
      linkType: null,
      gradient: "from-cyan-500 to-blue-600",
    },
  ]

  const education = [
    {
      degree: "Bachelor of Computer Application (B.C.A.)",
      institution: "Shree G.K. & C.K. Bosmia College, Jetpur",
      period: "2021-2024",
      status: "Completed",
      grade: "First Class",
    },
    {
      degree: "12th H.S.C.",
      institution: "Shree A.Z. Kaneriya High School, Dhoraji",
      period: "2020-2021",
      status: "Completed",
      grade: "First Class",
    },
    {
      degree: "10th S.S.C.",
      institution: "M.M.School, Dhoraji",
      period: "2018-2019",
      status: "Completed",
      grade: "First Class",
    },
  ]

  const achievements = [
    {
      icon: TrendingUp,
      title: "Performance Optimization",
      desc: "Improved app performance by 30%",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      desc: "Cross-functional team experience",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Target,
      title: "Project Delivery",
      desc: "5+ successful project deliveries",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Star,
      title: "Technical Excellence",
      desc: "Mastered multiple state management solutions",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Add all animated background components */}
      <FloatingShapes />
      <AnimatedGrid />
      <ParticleSystem />
      <GradientOrbs />

      {/* Improved Loading Overlay - Fixed centering */}
      {/* No loading overlay on mobile - instant display */}
      {!isLoaded && !isMobile && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <div className="absolute w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="text-gray-600 font-medium mt-4">Loading Portfolio...</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className={`flex-shrink-0 transition-all duration-500 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sahil Pathan
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {["home", "about", "experience", "skills", "projects", "education", "contact"].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      activeSection === item
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : "text-gray-700 hover:text-blue-600 hover:bg-white/50 backdrop-blur-sm"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: isLoaded ? "fadeInDown 0.6s ease-out forwards" : "none",
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-white/50 backdrop-blur-sm rounded-full"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-xl border-t border-gray-200/50">
            {["home", "about", "experience", "skills", "projects", "education", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`block px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-all duration-200 ${
                  activeSection === item
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            {/* Profile Image */}
            <div
              className={`mb-8 ${isMobile ? "opacity-100 translate-y-0" : `transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}`}
            >
              <div className="relative inline-block">
                <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl border-4 border-white ring-4 ring-blue-100">
                  <img
                    src="/profile-image.jpg"
                    alt="Sahil Pathan - Flutter Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div
              className={`${isMobile ? "opacity-100 translate-y-0" : `transition-all duration-1000 delay-200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}`}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-sm font-medium text-green-700 mb-6 shadow-md">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Available for opportunities
                <Sparkles className="w-4 h-4 ml-2" />
              </div>
            </div>

            <div
              className={`${isMobile ? "opacity-100 translate-y-0" : `transition-all duration-1000 delay-400 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}`}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Sahil Pathan
                </span>
              </h1>
            </div>

            <div
              className={`${isMobile ? "opacity-100 translate-y-0" : `transition-all duration-1000 delay-600 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}`}
            >
              <p className="text-xl sm:text-2xl md:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Flutter Developer
              </p>
            </div>

            <div
              className={`${isMobile ? "opacity-100 translate-y-0" : `transition-all duration-1000 delay-800 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}`}
            >
              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed px-4">
                🚀 Passionate Flutter Developer crafting high-performance mobile applications with clean architecture
                and modern design principles. Specialized in POS and KDS systems with 1+ years of hands-on experience.
              </p>
            </div>

            <div
              className={`${isMobile ? "opacity-100 translate-y-0" : `transition-all duration-1000 delay-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}`}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 px-4">
                <Button
                  size={isMobile ? "default" : "lg"}
                  onClick={() => scrollToSection("contact")}
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl ${!isMobile && "hover:shadow-2xl transition-all duration-300 transform hover:scale-105"} px-6 sm:px-8 py-3 sm:py-4 group w-full sm:w-auto`}
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Let's Connect
                  <Rocket
                    className={`w-4 h-4 sm:w-5 sm:h-5 ml-2 ${!isMobile && "group-hover:translate-x-1 transition-transform"}`}
                  />
                </Button>
                <Button
                  size={isMobile ? "default" : "lg"}
                  variant="outline"
                  className={`border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 ${!isMobile && "transition-all duration-300 transform hover:scale-105"} px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-sm bg-white/50 w-full sm:w-auto`}
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/1i5T4c5mx1b203QcafTk_lNTk-K8SoJhc/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>

            <div
              className={`${isMobile ? "opacity-100 translate-y-0" : `transition-all duration-1000 delay-1200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}`}
            >
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 text-sm px-4">
                <div className="flex items-center text-gray-600 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/20">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  Surat, Gujarat, India
                </div>
                <div className="flex items-center text-gray-600 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/20">
                  <Mail className="w-4 h-4 mr-2 text-emerald-500" />
                  pathansahil1800@gmail.com
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            {!isMobile && (
              <div
                className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1400 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <div className="animate-bounce">
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
                About Me
              </h2>
              <p className="text-base sm:text-lg text-gray-600">Passionate developer crafting digital experiences</p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Professional Summary */}
            <AnimatedSection className="lg:col-span-2" delay={200}>
              <Card
                className={`h-full border-0 ${!isMobile && "shadow-xl bg-gradient-to-br from-white to-blue-50/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-xl sm:text-2xl text-gray-900">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-3 sm:mr-4 shadow-lg">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    Professional Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    🎯 I'm a passionate Flutter developer with expertise in building high-performance mobile
                    applications. Currently working in a product-based company, I specialize in POS and KDS systems,
                    with strong skills in state management, API integration, and local storage solutions.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    💡 My experience includes working with various state management solutions like BLoC, Provider, GetX,
                    and Riverpod, along with Firebase services, SQLite, and Google AdMob integration. I'm committed to
                    writing clean, efficient code and following best practices in mobile app development.
                  </p>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                    <div className="text-center p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-3xl sm:text-4xl font-bold mb-2">1+</div>
                      <div className="text-xs sm:text-sm opacity-90">Years Experience</div>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-3xl sm:text-4xl font-bold mb-2">5+</div>
                      <div className="text-xs sm:text-sm opacity-90">Projects Completed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Achievements & Objective */}
            <div className="space-y-6">
              <AnimatedSection delay={400}>
                <Card
                  className={`border-0 ${!isMobile && "shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"}`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg sm:text-xl text-gray-900">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3 shadow-md">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      Objective
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      🎯 Aspiring to leverage my expertise in Flutter development to build high-performance, scalable,
                      and user-friendly mobile applications. Seeking opportunities to contribute innovative solutions
                      while continuously enhancing my skills.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={600}>
                <Card
                  className={`border-0 ${!isMobile && "shadow-xl bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"}`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg sm:text-xl text-gray-900">
                      <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg mr-3 shadow-md">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      Key Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`flex items-start space-x-3 p-3 rounded-xl ${achievement.bg} hover:scale-105 transition-all duration-200`}
                        >
                          <achievement.icon
                            className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${achievement.color}`}
                          />
                          <div>
                            <div className="font-medium text-gray-900 text-xs sm:text-sm">{achievement.title}</div>
                            <div className="text-gray-600 text-xs">{achievement.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 sm:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
                Professional Experience
              </h2>
              <p className="text-base sm:text-lg text-gray-600">My journey in Flutter development</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {experiences.map((exp, index) => (
              <AnimatedSection key={index} delay={index * 200}>
                <Card
                  className={`overflow-hidden ${!isMobile && "hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"} border-0 group`}
                >
                  <CardHeader className={`bg-gradient-to-r ${exp.gradient} text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="secondary"
                          className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs"
                        >
                          {index === 0 ? "🔥 Current Role" : "📚 Previous Role"}
                        </Badge>
                        <div className="flex items-center text-white/90 text-xs sm:text-sm">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          {exp.period}
                        </div>
                      </div>
                      <CardTitle className="text-lg sm:text-2xl mb-2 flex items-center">
                        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                        {exp.title}
                      </CardTitle>
                      <CardDescription className="text-white/90 font-medium text-base sm:text-lg">
                        {exp.company}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-8 bg-white">
                    <ul className="space-y-3 sm:space-y-4">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start group/item">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 mr-3 sm:mr-4 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                          <span className="text-gray-600 leading-relaxed group-hover/item:text-gray-800 transition-colors duration-200 text-sm sm:text-base">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
                Technical Skills
              </h2>
              <p className="text-base sm:text-lg text-gray-600">Technologies and tools I master</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Object.entries(skills).map(([category, data], index) => {
              const IconComponent = data.icon

              return (
                <AnimatedSection key={index} delay={index * 150}>
                  <Card
                    className={`overflow-hidden ${!isMobile && "hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"} border-0 group`}
                  >
                    <CardHeader className="relative overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${data.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                      ></div>
                      <CardTitle className="flex items-center text-lg sm:text-xl relative z-10">
                        <div
                          className={`p-2 sm:p-3 rounded-xl mr-3 sm:mr-4 bg-gradient-to-r ${data.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs sm:text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 cursor-default"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
                Featured Projects
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Professional and academic projects showcasing my expertise
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card
                  className={`overflow-hidden ${!isMobile && "hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"} h-full border-0 group overflow-hidden flex flex-col`}
                >
                  <CardHeader className="relative overflow-hidden flex-shrink-0">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>
                    <div className="flex items-start justify-between mb-3 relative z-10">
                      <CardTitle className="text-lg sm:text-xl text-gray-900 flex-1 pr-3">{project.title}</CardTitle>
                      <Badge
                        variant={project.type === "Professional" ? "default" : "secondary"}
                        className={
                          project.type === "Professional"
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md flex-shrink-0 text-xs"
                            : "bg-gray-100 text-gray-700 flex-shrink-0 text-xs"
                        }
                      >
                        {project.type === "Professional" ? "🚀 Professional" : "🎓 Academic"}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed text-gray-600 relative z-10 min-h-[3rem]">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-4 sm:p-6">
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2 flex items-center">
                        <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-500" />
                        Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs border-gray-300 text-gray-600 hover:bg-blue-50 transition-colors duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2 flex items-center">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-orange-500" />
                        Key Features:
                      </h4>
                      <ul className="space-y-1">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.link && (
                      <div className="mt-auto pt-4">
                        <Button
                          size="sm"
                          className={`w-full bg-gradient-to-r ${project.gradient} hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white text-sm`}
                          asChild
                        >
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            {project.linkType === "playstore" ? (
                              <>
                                <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                View on Play Store
                              </>
                            ) : (
                              <>
                                <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                View on GitHub
                              </>
                            )}
                            <ExternalLink className="w-3 h-3 ml-2" />
                          </a>
                        </Button>
                      </div>
                    )}

                    {!project.link && (
                      <div className="mt-auto pt-4">
                        <div className="w-full p-3 bg-gray-100 rounded-lg text-center">
                          <span className="text-gray-500 text-sm">Private Project</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-12 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
                Education
              </h2>
              <p className="text-base sm:text-lg text-gray-600">My academic journey and achievements</p>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block rounded-full"></div>

            <div className="space-y-6 sm:space-y-8">
              {education.map((edu, index) => (
                <AnimatedSection key={index} delay={index * 200}>
                  <div className="relative group">
                    {/* Timeline dot */}
                    <div className="absolute left-4 sm:left-6 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 sm:border-4 border-white shadow-xl hidden md:block group-hover:scale-125 transition-transform duration-300"></div>

                    <Card
                      className={`md:ml-16 sm:md:ml-20 ${!isMobile && "hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"} border-0 overflow-hidden`}
                    >
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex items-start">
                            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mr-4 sm:mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                              <p className="text-gray-600 mb-3 text-base sm:text-lg">{edu.institution}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                <Badge
                                  variant="outline"
                                  className="text-xs sm:text-sm bg-emerald-50 text-emerald-700 border-emerald-200 w-fit"
                                >
                                  ✅ {edu.status}
                                </Badge>
                                <Badge
                                  variant="secondary"
                                  className="text-xs sm:text-sm bg-blue-50 text-blue-700 w-fit"
                                >
                                  🏆 {edu.grade}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 mt-4 lg:mt-0 bg-gradient-to-r from-gray-50 to-blue-50 px-3 sm:px-4 py-2 rounded-full border border-gray-200 w-fit">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            <span className="font-medium text-sm sm:text-base">{edu.period}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Fixed for mobile */}
      <section
        id="contact"
        className="py-12 sm:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
                Let's Connect
              </h2>
              <p className="text-base sm:text-lg text-gray-600">Ready to discuss opportunities and collaborations</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <AnimatedSection delay={200}>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Get In Touch</h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mr-4 sm:mr-6 shadow-lg flex-shrink-0">
                      <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-base sm:text-lg">Email</p>
                      <a
                        href="mailto:pathansahil1800@gmail.com"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm sm:text-lg break-all"
                      >
                        pathansahil1800@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mr-4 sm:mr-6 shadow-lg flex-shrink-0">
                      <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-base sm:text-lg">Phone</p>
                      <a
                        href="tel:+917874443558"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm sm:text-lg"
                      >
                        +91-7874443558
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mr-4 sm:mr-6 shadow-lg flex-shrink-0">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-base sm:text-lg">Location</p>
                      <p className="text-gray-600 text-sm sm:text-lg">Surat, Gujarat, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 sm:mt-10">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Connect With Me</h4>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <Button
                      size={isMobile ? "default" : "lg"}
                      className="flex items-center bg-gray-900 hover:bg-gray-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto justify-center"
                      asChild
                    >
                      <a href="https://github.com/SahilLiotech/" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      size={isMobile ? "default" : "lg"}
                      className="flex items-center bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto justify-center"
                      asChild
                    >
                      <a
                        href="https://www.linkedin.com/in/sahil-pathan-a23a94249/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl">Send a Message</CardTitle>
                  <CardDescription className="text-base sm:text-lg">
                    I'd love to hear from you. Send me a message and I'll respond as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base sm:text-lg"
                        placeholder="Your Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base sm:text-lg"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={isMobile ? 4 : 5}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base sm:text-lg resize-none"
                        placeholder="Your message..."
                      ></textarea>
                    </div>

                    {submitStatus === "success" && (
                      <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="text-green-700 font-medium text-sm sm:text-base">
                          ✅ Message sent successfully! I'll get back to you soon.
                        </p>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-700 font-medium text-sm sm:text-base">
                          ❌ Failed to send message. Please try again or email me directly.
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      size={isMobile ? "default" : "lg"}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-base sm:text-lg py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Send Message
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-2" />
              <p className="text-gray-300 text-base sm:text-lg">Made with passion by Sahil Pathan</p>
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 ml-2" />
            </div>
            <p className="text-gray-400 text-sm sm:text-base">© 2024 Sahil Pathan. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -100%, 0);
          }
        to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .animation-delay-150 {
          animation-delay: 150ms;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(270deg); }
        }

        @keyframes float-random {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(90deg); }
          50% { transform: translate(-5px, -20px) rotate(180deg); }
          75% { transform: translate(-10px, 5px) rotate(270deg); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes drift-1 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        @keyframes drift-2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-40px, -20px) rotate(180deg); }
        }

        @keyframes drift-3 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(20px, -40px) rotate(90deg); }
          75% { transform: translate(-30px, 10px) rotate(270deg); }
        }

        @keyframes drift-4 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(-25px, -15px) rotate(120deg); }
          66% { transform: translate(35px, -25px) rotate(240deg); }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }

        .animate-float-random {
          animation: float-random 8s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .animate-drift-1 {
          animation: drift-1 20s ease-in-out infinite;
        }

        .animate-drift-2 {
          animation: drift-2 15s ease-in-out infinite;
        }

        .animate-drift-3 {
          animation: drift-3 18s ease-in-out infinite;
        }

        .animate-drift-4 {
          animation: drift-4 22s ease-in-out infinite;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .animate-float-slow,
          .animate-float-medium,
          .animate-float-fast,
          .animate-float-random,
          .animate-spin-slow,
          .animate-wiggle,
          .animate-drift-1,
          .animate-drift-2,
          .animate-drift-3,
          .animate-drift-4 {
            animation-duration: 2s;
            animation-iteration-count: 1;
          }
        }
      `}</style>
    </div>
  )
}
