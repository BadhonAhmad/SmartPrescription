"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  FileText,
  Pill,
  BarChart3,
  Calendar,
  Eye,
  Filter,
  Edit,
  Trash2,
  AlertCircle,
  X,
} from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { isProfileComplete } from "@/lib/profileUtils";

export default function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<any[]>([]);
  const [loadingPrescriptions, setLoadingPrescriptions] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [showProfileWarning, setShowProfileWarning] = useState(false);

  // Date range filter (default: current month)
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return date.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return date.toISOString().split("T")[0];
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    } else if (isAuthenticated) {
      // Check if profile is complete
      setShowProfileWarning(!isProfileComplete());
    }
  }, [isAuthenticated, loading, router]);

  // Re-check profile status when page becomes visible (user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        setShowProfileWarning(!isProfileComplete());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also check on window focus
    const handleFocus = () => {
      if (isAuthenticated) {
        setShowProfileWarning(!isProfileComplete());
      }
    };
    
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPrescriptions();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterPrescriptionsByDateRange();
  }, [prescriptions, startDate, endDate]);

  const fetchPrescriptions = async () => {
    try {
      setLoadingPrescriptions(true);
      // Use the same API endpoint as the prescriptions page
      const response = await api.get("/API/v1/prescription");
      const data = response.data || [];
      setPrescriptions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      setPrescriptions([]);
    } finally {
      setLoadingPrescriptions(false);
    }
  };

  const filterPrescriptionsByDateRange = () => {
    if (!prescriptions.length) {
      setFilteredPrescriptions([]);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the entire end date

    const filtered = prescriptions.filter((prescription) => {
      const prescriptionDate = new Date(prescription.visit);
      return prescriptionDate >= start && prescriptionDate <= end;
    });

    setFilteredPrescriptions(filtered);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeletePrescription = async (id: number) => {
    try {
      await api.delete(`/API/v1/prescription/${id}`);
      toast.success("Prescription deleted successfully!");
      setDeleteConfirmId(null);
      // Refresh the prescriptions list
      fetchPrescriptions();
    } catch (error: any) {
      console.error("Error deleting prescription:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete prescription"
      );
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                SmartPrescription
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">Medical Management System</p>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Completion Warning */}
        {showProfileWarning && (
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                  Complete Your Profile
                </h3>
                <p className="text-amber-800 mb-4">
                  Please complete your doctor profile before creating prescriptions. 
                  Your profile information will be displayed on all prescriptions.
                </p>
                <Link
                  href="/profile/settings"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium transition-colors shadow-sm"
                >
                  Complete Profile Now
                </Link>
              </div>
              <button
                onClick={() => setShowProfileWarning(false)}
                className="flex-shrink-0 text-amber-600 hover:text-amber-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-lg text-gray-600">
            Manage your clinic operations efficiently
          </p>
        </div>

        {/* Quick Actions Grid - Now 5 cards in a responsive grid */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* New Prescription Card */}
            <Link
              href="/prescriptions/create"
              className="group relative bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  New Rx
                </h3>
                <p className="text-emerald-100 text-sm">
                  Create prescription
                </p>
              </div>
            </Link>

            {/* View Prescriptions Card */}
            <Link
              href="/prescriptions"
              className="group relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Prescriptions
                </h3>
                <p className="text-blue-100 text-sm">
                  View all records
                </p>
              </div>
            </Link>

            {/* Manage Patients Card */}
            <Link
              href="/patients"
              className="group relative bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Patients
                </h3>
                <p className="text-purple-100 text-sm">
                  Manage records
                </p>
              </div>
            </Link>

            {/* Medicine Database Card */}
            <Link
              href="/medicines"
              className="group relative bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Pill size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Medicines
                </h3>
                <p className="text-pink-100 text-sm">
                  Browse catalog
                </p>
              </div>
            </Link>

            {/* Reports Card */}
            <Link
              href="/dashboard/report"
              className="group relative bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Reports
                </h3>
                <p className="text-orange-100 text-sm">
                  View analytics
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Prescriptions Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Recent Prescriptions
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Overview of recent patient visits
              </p>
            </div>
            <Link
              href="/prescriptions"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg"
            >
              View All
            </Link>
          </div>

          {/* Date Range Filter */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Calendar size={18} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Date Range Filter
                </span>
              </div>
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-600">From:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-600">To:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  />
                </div>
                <div className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md">
                  {filteredPrescriptions.length} found
                </div>
              </div>
            </div>
          </div>

          {loadingPrescriptions ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
              <p className="text-gray-500 mt-4">Loading prescriptions...</p>
            </div>
          ) : prescriptions.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={40} className="text-blue-600" />
              </div>
              <p className="text-gray-700 text-lg font-medium mb-2">
                No prescriptions yet
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Start by creating your first prescription
              </p>
              <Link
                href="/prescriptions/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-medium"
              >
                <FileText size={18} />
                Create Prescription
              </Link>
            </div>
          ) : filteredPrescriptions.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter size={40} className="text-purple-600" />
              </div>
              <p className="text-gray-700 text-lg font-medium mb-2">
                No results found
              </p>
              <p className="text-gray-500 text-sm">
                Try adjusting the date range filter
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Patient Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Diagnosis
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredPrescriptions.map((prescription) => (
                      <tr
                        key={prescription.prescriptionId}
                        className="hover:bg-blue-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {formatDate(prescription.visit)}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {prescription.name || "Unknown Patient"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {prescription.patientAge || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {prescription.gender || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div
                            className="max-w-xs truncate"
                            title={prescription.diagnosis}
                          >
                            {prescription.diagnosis || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href={`/prescriptions/view/${prescription.prescriptionId}`}
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg text-xs font-medium"
                            >
                              <Eye size={14} />
                              View
                            </Link>
                            <Link
                              href={`/prescriptions/edit/${prescription.prescriptionId}`}
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-lg hover:from-emerald-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg text-xs font-medium"
                            >
                              <Edit size={14} />
                              Edit
                            </Link>
                            <button
                              onClick={() =>
                                setDeleteConfirmId(prescription.prescriptionId)
                              }
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg text-xs font-medium"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Delete Prescription
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this prescription? This action
              cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePrescription(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
