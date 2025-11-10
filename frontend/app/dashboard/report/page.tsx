"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { LogOut, ArrowLeft } from "lucide-react";

export default function ReportPage() {
  const { isAuthenticated, username, logout, loading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState({
    totalVisits: 0,
    todayVisits: 0,
    thisMonthVisits: 0,
    lastMonthVisits: 0,
    totalPatients: 0,
    todayPatients: 0,
    thisMonthPatients: 0,
    lastMonthPatients: 0,
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStatistics();
    }
  }, [isAuthenticated]);

  const fetchStatistics = async () => {
    setIsLoadingStats(true);
    try {
      const response = await api.get("/API/v1/prescription");
      const prescriptions = response.data || [];

      const now = new Date();
      const today = now.toISOString().split("T")[0];
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split("T")[0];
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        .toISOString()
        .split("T")[0];
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)
        .toISOString()
        .split("T")[0];

      const totalVisits = prescriptions.length;
      const todayVisits = prescriptions.filter(
        (p: any) => p.visit === today
      ).length;
      const thisMonthVisits = prescriptions.filter(
        (p: any) => p.visit >= thisMonthStart
      ).length;
      const lastMonthVisits = prescriptions.filter(
        (p: any) => p.visit >= lastMonthStart && p.visit <= lastMonthEnd
      ).length;

      const allPatientIds = new Set(prescriptions.map((p: any) => p.id));
      const todayPatientIds = new Set(
        prescriptions
          .filter((p: any) => p.visit === today)
          .map((p: any) => p.id)
      );
      const thisMonthPatientIds = new Set(
        prescriptions
          .filter((p: any) => p.visit >= thisMonthStart)
          .map((p: any) => p.id)
      );
      const lastMonthPatientIds = new Set(
        prescriptions
          .filter(
            (p: any) => p.visit >= lastMonthStart && p.visit <= lastMonthEnd
          )
          .map((p: any) => p.id)
      );

      setStats({
        totalVisits,
        todayVisits,
        thisMonthVisits,
        lastMonthVisits,
        totalPatients: allPatientIds.size,
        todayPatients: todayPatientIds.size,
        thisMonthPatients: thisMonthPatientIds.size,
        lastMonthPatients: lastMonthPatientIds.size,
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleDateFilter = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    setIsLoadingStats(true);
    try {
      const response = await api.get("/API/v1/prescription");
      const prescriptions = response.data || [];

      const filteredPrescriptions = prescriptions.filter(
        (p: any) => p.visit >= startDate && p.visit <= endDate
      );

      const uniquePatients = new Set(
        filteredPrescriptions.map((p: any) => p.id)
      );

      setStats((prev) => ({
        ...prev,
        totalVisits: filteredPrescriptions.length,
        totalPatients: uniquePatients.size,
      }));
    } catch (error) {
      console.error("Error filtering statistics:", error);
    } finally {
      setIsLoadingStats(false);
    }
  };

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
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl font-bold text-blue-600">
                SmartPrescription - Report
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {username}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Report</h2>
          <p className="text-gray-600 mt-2">
            View your clinic statistics and patient data
          </p>
        </div>

        {/* Visit Statistics */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Visit Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-2">Total Visit:</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.totalVisits}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-2">Todays Visit:</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.todayVisits}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-2">This Month Visit:</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.thisMonthVisits}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-2">Last Months Visit:</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.lastMonthVisits}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Statistics */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Patient Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-2">Total Patient:</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.totalPatients}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-2">Todays Patient:</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.todayPatients}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-2">
                  This Months Patient:
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.thisMonthPatients}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-2">
                  Last Months Patient:
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.lastMonthPatients}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="bg-white rounded-lg shadow p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Filter by Date Range
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <label className="text-gray-700 mb-2 font-medium">
                Pick Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-px h-24 bg-blue-500 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <label className="text-gray-700 mb-2 font-medium">
                Pick End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleDateFilter}
              disabled={isLoadingStats}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold transition-colors"
            >
              {isLoadingStats ? "Loading..." : "Apply Filter"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
