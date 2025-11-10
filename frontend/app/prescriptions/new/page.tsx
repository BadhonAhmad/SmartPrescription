"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

interface Patient {
  id: number;
  name: string;
}

export default function NewPrescriptionPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    complaint: "",
    history: "",
    onexamination: "",
    investigation: "",
    diagnosis: "",
    medicine: "",
    advice: "",
    followup: "",
    treatmentplan: "",
    notes: "",
  });

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
      const response = await fetch("http://localhost:8080/api/patients", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setPatients(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handlePatientChange = (patientId: string) => {
    const patient = patients.find((p) => p.id.toString() === patientId);
    if (patient) {
      setFormData({ ...formData, id: patientId, name: patient.name });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...formData,
          id: parseInt(formData.id),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Prescription created successfully");
        router.push("/prescriptions");
      } else {
        toast.error(result.message || "Failed to create prescription");
      }
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast.error("Failed to create prescription");
    } finally {
      setIsSubmitting(false);
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
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/prescriptions"
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-blue-600">
              New Prescription
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Selection */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Patient *
                </label>
                <select
                  className="input"
                  value={formData.id}
                  onChange={(e) => handlePatientChange(e.target.value)}
                  required
                >
                  <option value="">Choose a patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  className="input bg-gray-50"
                  value={formData.name}
                  readOnly
                  placeholder="Select a patient first"
                />
              </div>
            </div>
          </div>

          {/* Clinical Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Clinical Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chief Complaint
                </label>
                <textarea
                  className="input"
                  rows={2}
                  value={formData.complaint}
                  onChange={(e) =>
                    setFormData({ ...formData, complaint: e.target.value })
                  }
                  placeholder="Enter chief complaint"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  History
                </label>
                <textarea
                  className="input"
                  rows={2}
                  value={formData.history}
                  onChange={(e) =>
                    setFormData({ ...formData, history: e.target.value })
                  }
                  placeholder="Enter patient history"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  On Examination
                </label>
                <textarea
                  className="input"
                  rows={2}
                  value={formData.onexamination}
                  onChange={(e) =>
                    setFormData({ ...formData, onexamination: e.target.value })
                  }
                  placeholder="Enter examination findings"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investigation
                </label>
                <textarea
                  className="input"
                  rows={2}
                  value={formData.investigation}
                  onChange={(e) =>
                    setFormData({ ...formData, investigation: e.target.value })
                  }
                  placeholder="Enter investigations"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnosis
                </label>
                <textarea
                  className="input"
                  rows={2}
                  value={formData.diagnosis}
                  onChange={(e) =>
                    setFormData({ ...formData, diagnosis: e.target.value })
                  }
                  placeholder="Enter diagnosis"
                />
              </div>
            </div>
          </div>

          {/* Treatment */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Treatment
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medicine
                </label>
                <textarea
                  className="input"
                  rows={4}
                  value={formData.medicine}
                  onChange={(e) =>
                    setFormData({ ...formData, medicine: e.target.value })
                  }
                  placeholder="Enter medicines (one per line)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treatment Plan
                </label>
                <textarea
                  className="input"
                  rows={2}
                  value={formData.treatmentplan}
                  onChange={(e) =>
                    setFormData({ ...formData, treatmentplan: e.target.value })
                  }
                  placeholder="Enter treatment plan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advice
                </label>
                <textarea
                  className="input"
                  rows={2}
                  value={formData.advice}
                  onChange={(e) =>
                    setFormData({ ...formData, advice: e.target.value })
                  }
                  placeholder="Enter advice"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up
                </label>
                <textarea
                  className="input"
                  rows={2}
                  value={formData.followup}
                  onChange={(e) =>
                    setFormData({ ...formData, followup: e.target.value })
                  }
                  placeholder="Enter follow-up instructions"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Notes
                </label>
                <textarea
                  className="input"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Enter any special notes"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/prescriptions" className="btn-secondary flex-1">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <Save size={20} />
              {isSubmitting ? "Creating..." : "Create Prescription"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
