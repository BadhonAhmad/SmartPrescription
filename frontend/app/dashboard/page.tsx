"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { User, FileText, Pill, BarChart3 } from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";

export default function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              SmartPrescription
            </h1>
            <ProfileDropdown />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-2">Manage your clinic efficiently</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/prescriptions/create"
              className="card hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText size={24} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    New Prescription
                  </h4>
                  <p className="text-sm text-gray-600">
                    Create new prescription
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/prescriptions"
              className="card hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText size={24} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    View Prescriptions
                  </h4>
                  <p className="text-sm text-gray-600">See all prescriptions</p>
                </div>
              </div>
            </Link>

            <Link
              href="/patients"
              className="card hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <User size={24} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Manage Patients
                  </h4>
                  <p className="text-sm text-gray-600">View patient records</p>
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/report"
              className="card hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500 rounded-lg">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Report</h4>
                  <p className="text-sm text-gray-600">
                    View statistics & reports
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Additional Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/medicines"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Pill size={20} className="text-purple-600" />
              <div>
                <h4 className="font-medium text-gray-900">Medicine Database</h4>
                <p className="text-sm text-gray-600">Browse medicines</p>
              </div>
            </Link>
            <Link
              href="/prescriptions/rxnav"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FileText size={20} className="text-blue-600" />
              <div>
                <h4 className="font-medium text-gray-900">Drug Interactions</h4>
                <p className="text-sm text-gray-600">Check RXNAV data</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
