"use client";

import Link from "next/link";
import {
  FileText,
  Users,
  Pill,
  BarChart3,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Stethoscope,
  Calendar,
  Activity,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Digital Prescriptions",
      description:
        "Create, edit, and manage prescriptions digitally with ease. Professional templates and instant generation.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Patient Management",
      description:
        "Maintain comprehensive patient records and history. Quick access to patient information anytime.",
    },
    {
      icon: <Pill className="w-8 h-8" />,
      title: "Medicine Database",
      description:
        "Extensive medicine search with dosage information. Smart auto-complete for faster prescription writing.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics & Reports",
      description:
        "Day-wise prescription counts and trends. Visual insights into your practice performance.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time Efficient",
      description:
        "Save time with templates and reusable components. Focus more on patient care than paperwork.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description:
        "Your data is secure with user authentication. Each doctor has their own private workspace.",
    },
  ];

  const benefits = [
    "Professional prescription templates",
    "Bilingual support (English & Bangla)",
    "Patient history tracking",
    "Chief complaint management",
    "Investigation & diagnosis records",
    "Follow-up scheduling",
    "Print-ready prescriptions",
    "Cloud-based access",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SmartPrescription
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="px-5 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Activity className="w-4 h-4" />
              Modern Clinic Management
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Streamline Your
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Medical Practice
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Comprehensive digital solution for prescription management,
              patient records, and clinic operations. Save time, reduce errors,
              and focus on what matters most - your patients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 font-semibold text-lg transition-all shadow-md border-2 border-gray-200"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Clinic
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed specifically for medical professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-blue-100 hover:scale-105"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose SmartPrescription?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Built by doctors, for doctors. Our platform combines simplicity
                with powerful features to help you deliver better patient care
                efficiently.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">10x</div>
                    <div className="text-blue-100">Faster Prescriptions</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-blue-100">Access Anywhere</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">100%</div>
                    <div className="text-blue-100">Secure & Private</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join hundreds of doctors who have modernized their clinic management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white rounded-xl hover:bg-white/10 font-semibold text-lg transition-all border-2 border-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              SmartPrescription
            </span>
          </div>
          <p className="text-gray-400 mb-4">Modern Clinic Management System</p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} SmartPrescription. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
