"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";

interface Prescription {
  prescriptionId: number;
  visit: string;
  name: string;
  patientAge: number;
  gender: string;
  diagnosis: string;
  medicine: string;
}

export default function PrescriptionsPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

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
    // Get patient name from URL query parameter
    const patientName = searchParams.get("patientName");
    if (patientName) {
      setSearchTerm(patientName);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await api.get("/API/v1/prescription");
      setPrescriptions(response.data || []);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      toast.error("Failed to load prescriptions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/API/v1/prescription/${id}`);
      toast.success("Prescription deleted successfully");
      setDeleteConfirmId(null);
      fetchPrescriptions();
    } catch (error) {
      console.error("Error deleting prescription:", error);
      toast.error("Failed to delete prescription");
    }
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch = prescription.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const prescDate = new Date(prescription.visit);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const matchesDateRange = prescDate >= start && prescDate <= end;
    return matchesSearch && matchesDateRange;
  });

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-blue-600">Prescriptions</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Range Filter */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold mb-4">Filter by Date Range</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input w-full"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchPrescriptions}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                Apply Filter
              </button>
            </div>
          </div>
        </div>

        {/* Search and Add */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search prescriptions by patient name..."
              className="input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link
            href="/prescriptions/create"
            className="btn-primary flex items-center gap-2 justify-center"
          >
            <Plus size={20} />
            New Prescription
          </Link>
        </div>

        {/* Prescriptions List */}
        {isLoading ? (
          <div className="text-center py-12">Loading prescriptions...</div>
        ) : filteredPrescriptions.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500">No prescriptions found</p>
            {searchTerm === "" && (
              <Link
                href="/prescriptions/create"
                className="btn-primary inline-flex items-center gap-2 mt-4"
              >
                <Plus size={20} />
                Create Your First Prescription
              </Link>
            )}
          </div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diagnosis
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPrescriptions.map((prescription) => (
                  <tr
                    key={prescription.prescriptionId}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(prescription.visit).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {prescription.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {prescription.patientAge}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {prescription.gender}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {prescription.diagnosis || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/prescriptions/view/${prescription.prescriptionId}`}
                          className="text-green-600 hover:text-green-900"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/prescriptions/edit/${prescription.prescriptionId}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteConfirmId(prescription.prescriptionId)
                          }
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Link href="/prescriptions/report" className="btn-primary">
            View Day-wise Report
          </Link>
          <Link href="/prescriptions/rxnav" className="btn-primary">
            Drug Interactions (RXNAV)
          </Link>
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
                onClick={() => handleDelete(deleteConfirmId)}
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
