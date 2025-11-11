"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Droplet,
  Calendar,
  FileText,
  Plus,
  Eye,
  Edit,
  Trash2,
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

interface Prescription {
  prescriptionId: number;
  visit: string;
  name: string;
  patientAge: number;
  gender: string;
  diagnosis: string;
  medicine: string;
}

export default function PatientProfilePage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoadingPatient, setIsLoadingPatient] = useState(true);
  const [isLoadingPrescriptions, setIsLoadingPrescriptions] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (patientId) {
      fetchPatient();
      fetchPatientPrescriptions();
    }
  }, [patientId]);

  const fetchPatient = async () => {
    try {
      const response = await api.get(`/patients/${patientId}`);
      setPatient(response.data?.data || response.data);
    } catch (error) {
      console.error("Error fetching patient:", error);
      toast.error("Failed to load patient details");
    } finally {
      setIsLoadingPatient(false);
    }
  };

  const fetchPatientPrescriptions = async () => {
    try {
      const response = await api.get("/API/v1/prescription");
      const allPrescriptions = response.data || [];

      // First, get the patient to get their name
      const patientResponse = await api.get(`/patients/${patientId}`);
      const patientData = patientResponse.data?.data || patientResponse.data;

      // Filter prescriptions by patient name
      const filtered = allPrescriptions.filter(
        (p: Prescription) => p.name === patientData.name
      );
      setPrescriptions(filtered);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      toast.error("Failed to load prescriptions");
    } finally {
      setIsLoadingPrescriptions(false);
    }
  };

  const handleDeletePrescription = async (id: number) => {
    try {
      await api.delete(`/API/v1/prescription/${id}`);
      toast.success("Prescription deleted successfully!");
      setDeleteConfirmId(null);
      fetchPatientPrescriptions();
    } catch (error: any) {
      console.error("Error deleting prescription:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete prescription"
      );
    }
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

  if (isLoadingPatient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading patient details...
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Patient not found</p>
          <Link href="/patients" className="btn-primary">
            Back to Patients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/patients" className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-blue-600">
              Patient Profile
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Info Card */}
        <div className="card mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <User size={32} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {patient.name}
                </h2>
                <p className="text-gray-600">Patient ID: {patient.id}</p>
              </div>
            </div>
            <Link
              href={`/prescriptions/create?patientId=${
                patient.id
              }&patientName=${encodeURIComponent(patient.name)}&patientAge=${
                patient.age
              }`}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              New Prescription
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-semibold text-gray-900">
                  {patient.age || "N/A"}
                </p>
              </div>
            </div>

            {patient.phone && (
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{patient.phone}</p>
                </div>
              </div>
            )}

            {patient.blood && (
              <div className="flex items-center gap-3">
                <Droplet size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Blood Group</p>
                  <p className="font-semibold text-gray-900">{patient.blood}</p>
                </div>
              </div>
            )}

            {patient.lastVisit && (
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Last Visit</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(patient.lastVisit)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {patient.address && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="text-gray-900">{patient.address}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Prescriptions Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Prescriptions History
            </h3>
            <div className="text-sm text-gray-600">
              Total: {prescriptions.length}
            </div>
          </div>

          {isLoadingPrescriptions ? (
            <div className="text-center py-12 text-gray-500">
              Loading prescriptions...
            </div>
          ) : prescriptions.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-4">
                No prescriptions yet for this patient
              </p>
              <Link
                href={`/prescriptions/create?patientId=${
                  patient.id
                }&patientName=${encodeURIComponent(patient.name)}&patientAge=${
                  patient.age
                }`}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Create First Prescription
              </Link>
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
                  {prescriptions.map((prescription) => (
                    <tr
                      key={prescription.prescriptionId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {formatDate(prescription.visit)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {prescription.patientAge || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {prescription.gender || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <div
                          className="max-w-xs truncate"
                          title={prescription.diagnosis}
                        >
                          {prescription.diagnosis || "N/A"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/prescriptions/edit/${prescription.prescriptionId}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Edit size={14} />
                            Edit
                          </Link>
                          <Link
                            href={`/prescriptions/view/${prescription.prescriptionId}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Eye size={14} />
                            View
                          </Link>
                          <button
                            onClick={() =>
                              setDeleteConfirmId(prescription.prescriptionId)
                            }
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
