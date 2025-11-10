"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { User, FileText, Pill, BarChart3, Calendar, Eye, Filter } from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";
import api from "@/lib/api";

export default function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<any[]>([]);
  const [loadingPrescriptions, setLoadingPrescriptions] = useState(true);
  
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
    }
  }, [isAuthenticated, loading, router]);

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

        <div className="card mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Prescriptions
            </h3>
            <Link
              href="/prescriptions"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>

          {/* Date Range Filter */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Filter by Date Range:
                </span>
              </div>
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">From:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">To:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="text-sm text-gray-500">
                  {filteredPrescriptions.length} prescription(s) found
                </div>
              </div>
            </div>
          </div>

          {loadingPrescriptions ? (
            <div className="text-center py-8 text-gray-500">
              Loading prescriptions...
            </div>
          ) : prescriptions.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                You have no prescriptions yet to show
              </p>
              <Link
                href="/prescriptions/create"
                className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Prescription
              </Link>
            </div>
          ) : filteredPrescriptions.length === 0 ? (
            <div className="text-center py-12">
              <Filter size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                No prescriptions found for the selected date range
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting the date range filter above
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Patient Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Diagnosis
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPrescriptions.map((prescription) => (
                    <tr
                      key={prescription.prescriptionId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {formatDate(prescription.visit)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {prescription.name || "Unknown Patient"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {prescription.patientAge || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {prescription.gender || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <div className="max-w-xs truncate" title={prescription.diagnosis}>
                          {prescription.diagnosis || "N/A"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <Link
                          href={`/prescriptions/view/${prescription.prescriptionId}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Eye size={14} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
