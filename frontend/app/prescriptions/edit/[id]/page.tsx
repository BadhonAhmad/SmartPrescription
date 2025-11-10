"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Save, Printer } from "lucide-react";

export default function EditPrescriptionPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const params = useParams();

  // Form state
  const [formData, setFormData] = useState({
    prescriptionDate: "",
    patientName: "",
    patientAge: "",
    patientGender: "M",
    chiefComplaint: "",
    history: "",
    onExamination: "",
    diagnosis: "",
    medicines: "",
    advice: "",
    nextVisitDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    } else if (params.id) {
      fetchPrescription();
    }
  }, [isAuthenticated, loading, params.id]);

  const fetchPrescription = async () => {
    try {
      const response = await api.get(`/prescriptions/${params.id}`);
      const data = response.data.data;

      setFormData({
        prescriptionDate: data.visit || "",
        patientName: data.name || "",
        patientAge: data.patientAge?.toString() || "",
        patientGender: data.gender || "M",
        chiefComplaint: data.complaint || "",
        history: data.history || "",
        onExamination: data.onExamination || "",
        diagnosis: data.diagnosis || "",
        medicines: data.medicine || "",
        advice: data.advice || "",
        nextVisitDate: data.nextVisit || "",
      });
    } catch (error) {
      console.error("Error fetching prescription:", error);
      toast.error("Failed to load prescription");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }

    if (!formData.patientAge.trim()) {
      newErrors.patientAge = "Patient age is required";
    } else {
      const age = parseInt(formData.patientAge);
      if (isNaN(age) || age < 0 || age > 150) {
        newErrors.patientAge = "Please enter a valid age (0-150)";
      }
    }

    if (!formData.patientGender) {
      newErrors.patientGender = "Gender is required";
    }

    if (!formData.prescriptionDate) {
      newErrors.prescriptionDate = "Prescription date is required";
    }

    if (formData.nextVisitDate) {
      const nextDate = new Date(formData.nextVisitDate);
      if (isNaN(nextDate.getTime())) {
        newErrors.nextVisitDate = "Please enter a valid date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (print = false) => {
    if (!validateForm()) {
      toast.error("Please fix the validation errors");
      return;
    }

    try {
      const payload = {
        prescriptionDate: formData.prescriptionDate,
        patientName: formData.patientName,
        patientAge: parseInt(formData.patientAge),
        patientGender: formData.patientGender,
        chiefComplaint: formData.chiefComplaint,
        history: formData.history,
        onExamination: formData.onExamination,
        diagnosis: formData.diagnosis,
        medicines: formData.medicines,
        advice: formData.advice,
        nextVisitDate: formData.nextVisitDate || null,
      };

      await api.put(`/API/v1/prescription/${params.id}`, payload);
      toast.success("Prescription updated successfully!");

      if (print) {
        router.push(`/prescriptions/view/${params.id}`);
      } else {
        router.push("/prescriptions");
      }
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update prescription");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div>
            <h1 className="text-2xl font-bold">DR. ABU NOYIM MOHAMMAD</h1>
            <p className="text-sm opacity-90">
              MBBS,DEM (Endocrinology & Metabolism)
            </p>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Edit Prescription
          </h2>

          <div className="space-y-6">
            {/* Prescription Date & Patient Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prescription Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="prescriptionDate"
                  value={formData.prescriptionDate}
                  onChange={handleChange}
                  className={`input w-full ${
                    errors.prescriptionDate ? "border-red-500" : ""
                  }`}
                />
                {errors.prescriptionDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.prescriptionDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Enter patient name"
                  className={`input w-full ${
                    errors.patientName ? "border-red-500" : ""
                  }`}
                />
                {errors.patientName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.patientName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="patientAge"
                  value={formData.patientAge}
                  onChange={handleChange}
                  placeholder="Enter age"
                  min="0"
                  max="150"
                  className={`input w-full ${
                    errors.patientAge ? "border-red-500" : ""
                  }`}
                />
                {errors.patientAge && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.patientAge}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="patientGender"
                  value={formData.patientGender}
                  onChange={handleChange}
                  className={`input w-full ${
                    errors.patientGender ? "border-red-500" : ""
                  }`}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.patientGender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.patientGender}
                  </p>
                )}
              </div>
            </div>

            {/* Chief Complaint */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chief Complaint
              </label>
              <textarea
                name="chiefComplaint"
                value={formData.chiefComplaint}
                onChange={handleChange}
                placeholder="Enter chief complaint..."
                rows={3}
                className="input w-full"
              />
            </div>

            {/* History */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                History
              </label>
              <textarea
                name="history"
                value={formData.history}
                onChange={handleChange}
                placeholder="Enter patient history..."
                rows={3}
                className="input w-full"
              />
            </div>

            {/* On Examination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                On Examination
              </label>
              <textarea
                name="onExamination"
                value={formData.onExamination}
                onChange={handleChange}
                placeholder="Enter examination findings..."
                rows={3}
                className="input w-full"
              />
            </div>

            {/* Diagnosis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diagnosis
              </label>
              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                placeholder="Enter diagnosis..."
                rows={3}
                className="input w-full"
              />
            </div>

            {/* Medicines */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medicines
              </label>
              <textarea
                name="medicines"
                value={formData.medicines}
                onChange={handleChange}
                placeholder="Enter medicines..."
                rows={4}
                className="input w-full"
              />
            </div>

            {/* Advice */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Advice
              </label>
              <textarea
                name="advice"
                value={formData.advice}
                onChange={handleChange}
                placeholder="Enter medical advice..."
                rows={3}
                className="input w-full"
              />
            </div>

            {/* Next Visit Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Next Visit Date (Optional)
              </label>
              <input
                type="date"
                name="nextVisitDate"
                value={formData.nextVisitDate}
                onChange={handleChange}
                className={`input w-full ${
                  errors.nextVisitDate ? "border-red-500" : ""
                }`}
              />
              {errors.nextVisitDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nextVisitDate}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <Save size={20} />
              Update
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <Printer size={20} />
              Update & Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
