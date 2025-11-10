"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Phone,
  Calendar,
  FileText,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";

interface Patient {
  id: number;
  name: string;
  age: string;
  phone: string;
  address: string;
  blood: string;
  lastVisit: string;
}

export default function PatientsPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");
      setPatients(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast.error("Failed to load patients");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone?.includes(searchTerm)
  );

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
            <h1 className="text-2xl font-bold text-blue-600">
              Manage Patients
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> Patients are automatically created when you
            create a new prescription. Each prescription generates or updates a
            patient record.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search patients by name or phone..."
              className="input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Patients List */}
        {isLoading ? (
          <div className="text-center py-12">Loading patients...</div>
        ) : filteredPatients.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 mb-2">No patients found</p>
            {searchTerm === "" && (
              <div className="mt-4">
                <p className="text-gray-600 text-sm mb-4">
                  Patients will appear here automatically when you create
                  prescriptions.
                </p>
                <Link
                  href="/prescriptions/create"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Plus size={20} />
                  Create New Prescription
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Age: {patient.age || "N/A"}
                  </p>
                  {patient.blood && (
                    <p className="text-sm text-gray-600">
                      Blood: {patient.blood}
                    </p>
                  )}
                </div>

                {patient.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Phone size={16} />
                    {patient.phone}
                  </div>
                )}

                {patient.lastVisit && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Calendar size={16} />
                    Last visit:{" "}
                    {new Date(patient.lastVisit).toLocaleDateString()}
                  </div>
                )}

                {patient.address && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {patient.address}
                  </p>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href={`/patients/${patient.id}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <FileText size={18} />
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
