"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Save, Printer, Plus, X } from "lucide-react";
import MedicineSearchModal from "@/components/MedicineSearchModal";
import DiagnosisAutoComplete from "@/components/DiagnosisAutoComplete";
import ChiefComplaintModal from "@/components/ChiefComplaintModal";
import HistoryModal from "@/components/HistoryModal";
import AdviceModal from "@/components/AdviceModal";
import InvestigationModal from "@/components/InvestigationModal";
import ProfileDropdown from "@/components/ProfileDropdown";

type Errors = Record<string, string>;

interface MedicineItem {
  medicine: string;
  schedule: string;
  duration: string;
  note: string;
}

interface InvestigationItem {
  test: string;
  remark: string;
}

export default function CreatePrescriptionPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    prescriptionDate: new Date().toISOString().split("T")[0],
    patientName: "",
    patientAge: "",
    patientGender: "M",
    diagnosis: "",
    nextVisitDate: "",
  });

  const [medicineList, setMedicineList] = useState<MedicineItem[]>([]);
  const [chiefComplaintList, setChiefComplaintList] = useState<string[]>([]);
  const [historyList, setHistoryList] = useState<string[]>([]);
  const [investigationList, setInvestigationList] = useState<
    InvestigationItem[]
  >([]);
  const [adviceList, setAdviceList] = useState<string[]>([]);

  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showInvestigationModal, setShowInvestigationModal] = useState(false);
  const [showAdviceModal, setShowAdviceModal] = useState(false);

  const [errors, setErrors] = useState<Errors>({});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.prescriptionDate) {
      newErrors.prescriptionDate = "Prescription date is required";
    } else if (isNaN(new Date(formData.prescriptionDate).getTime())) {
      newErrors.prescriptionDate = "Please enter a valid date";
    }

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }

    if (!formData.patientAge.trim()) {
      newErrors.patientAge = "Patient age is required";
    } else {
      const age = Number(formData.patientAge);
      if (!Number.isInteger(age) || age < 0 || age > 150) {
        newErrors.patientAge = "Please enter a valid age (0-150)";
      }
    }

    if (!formData.patientGender) {
      newErrors.patientGender = "Gender is required";
    }

    if (
      formData.nextVisitDate &&
      isNaN(new Date(formData.nextVisitDate).getTime())
    ) {
      newErrors.nextVisitDate = "Please enter a valid date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMedicine = (item: MedicineItem) => {
    setMedicineList([...medicineList, item]);
  };

  const handleRemoveMedicine = (index: number) => {
    setMedicineList(medicineList.filter((_, i) => i !== index));
  };

  const handleAddComplaint = (complaint: string) => {
    setChiefComplaintList([...chiefComplaintList, complaint]);
  };

  const handleRemoveComplaint = (index: number) => {
    setChiefComplaintList(chiefComplaintList.filter((_, i) => i !== index));
  };

  const handleAddHistory = (history: string) => {
    setHistoryList([...historyList, history]);
  };

  const handleRemoveHistory = (index: number) => {
    setHistoryList(historyList.filter((_, i) => i !== index));
  };

  const handleAddInvestigation = (item: InvestigationItem) => {
    setInvestigationList([...investigationList, item]);
  };

  const handleRemoveInvestigation = (index: number) => {
    setInvestigationList(investigationList.filter((_, i) => i !== index));
  };

  const handleAddAdvice = (advice: string) => {
    setAdviceList([...adviceList, advice]);
  };

  const handleRemoveAdvice = (index: number) => {
    setAdviceList(adviceList.filter((_, i) => i !== index));
  };

  const formatMedicinesForSubmit = () => {
    return medicineList
      .map((item, idx) => `${idx + 1}) ${item.medicine} - ${item.note}`)
      .join("\n");
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
        patientAge: Number(formData.patientAge),
        patientGender: formData.patientGender,
        diagnosis: formData.diagnosis || "",
        medicines: formatMedicinesForSubmit(),
        nextVisitDate: formData.nextVisitDate || null,
      };

      const response = await api.post("/API/v1/prescription", payload);
      toast.success("Prescription saved successfully!");

      if (print && response.data?.data?.prescriptionId) {
        router.push(`/prescriptions/view/${response.data.data.prescriptionId}`);
      } else {
        router.push("/prescriptions");
      }
    } catch (error: any) {
      if (error.response?.status === 400 && error.response?.data) {
        const backendErrors = error.response.data as Errors;
        setErrors(backendErrors);
        const firstMsg = Object.values(backendErrors)[0];
        toast.error(
          typeof firstMsg === "string" ? firstMsg : "Validation failed"
        );
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to save prescription");
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
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dashboard Button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md font-medium transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Dashboard
        </button>
      </div>

      {/* Profile Dropdown */}
      <div className="absolute top-4 right-4 z-20">
        <ProfileDropdown />
      </div>

      {/* Header - Doctor Info (English Left, Bangla Right) */}
      <header className="bg-white border-b-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-green-700">
              DR. ABU NOYIM MOHAMMAD
            </h1>
            <p className="text-sm text-gray-700">
              MBBS, DEM (Endocrinology & Metabolism)
            </p>
          </div>
          <div className="text-right">
            <h1 className="text-xl font-bold text-green-700">
              ডা.আবু নঈম মোহাম্মদ
            </h1>
            <p className="text-sm text-gray-700">
              এমবিবিএস, ডিইএম(এন্ডোক্রাইনোলজি & মেটাবলিজম)
            </p>
          </div>
        </div>
      </header>

      {/* Single Line - Patient Info */}
      <div className="bg-white border-b border-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="grid grid-cols-5 gap-4 items-center">
            <div className="col-span-2 flex items-center gap-2">
              <label className="font-medium text-gray-700">Name:</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Patient Name"
                className={`flex-1 px-2 py-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none ${
                  errors.patientName ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Date:</label>
              <input
                type="date"
                name="prescriptionDate"
                value={formData.prescriptionDate}
                onChange={handleChange}
                className={`flex-1 px-2 py-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none ${
                  errors.prescriptionDate ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Age:</label>
              <input
                type="number"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleChange}
                placeholder="Age"
                min="0"
                max="150"
                className={`flex-1 px-2 py-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none w-20 ${
                  errors.patientAge ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Gender:</label>
              <select
                name="patientGender"
                value={formData.patientGender}
                onChange={handleChange}
                className={`flex-1 px-2 py-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none ${
                  errors.patientGender ? "border-red-500" : ""
                }`}
              >
                <option value="M">M</option>
                <option value="F">F</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {Object.keys(errors).length > 0 && (
            <div className="mt-2 text-red-500 text-sm">
              {Object.values(errors).map((err, i) => (
                <div key={i}>• {err}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-4 pb-24">
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
          <div className="grid grid-cols-3 min-h-[600px]">
            {/* Left Column */}
            <div className="col-span-1 border-r border-gray-300 p-4 space-y-4">
              {/* Chief Complaint */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold text-gray-800">
                    Chief Complaint
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowComplaintModal(true)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="space-y-1 min-h-[60px] border border-gray-200 rounded p-2 bg-gray-50">
                  {chiefComplaintList.length === 0 ? (
                    <div className="text-center text-gray-400 text-sm py-2">
                      Click + to add
                    </div>
                  ) : (
                    chiefComplaintList.map((complaint, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-white px-2 py-1 rounded border border-gray-200"
                      >
                        <span className="text-sm text-gray-800">
                          • {complaint}
                        </span>
                        <button
                          onClick={() => handleRemoveComplaint(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* History */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold text-gray-800">History</label>
                  <button
                    type="button"
                    onClick={() => setShowHistoryModal(true)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="space-y-1 min-h-[60px] border border-gray-200 rounded p-2 bg-gray-50">
                  {historyList.length === 0 ? (
                    <div className="text-center text-gray-400 text-sm py-2">
                      Click + to add
                    </div>
                  ) : (
                    historyList.map((history, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-white px-2 py-1 rounded border border-gray-200"
                      >
                        <span className="text-sm text-gray-800">
                          • {history}
                        </span>
                        <button
                          onClick={() => handleRemoveHistory(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Investigation */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold text-gray-800">
                    Diagnosis
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowInvestigationModal(true)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="space-y-1 min-h-[80px] border border-gray-200 rounded p-2 bg-gray-50">
                  {investigationList.length === 0 ? (
                    <div className="text-center text-gray-400 text-sm py-2">
                      Click + to add
                    </div>
                  ) : (
                    investigationList.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-white px-2 py-1 rounded border border-gray-200"
                      >
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-800">
                            • {item.test}
                          </span>
                          {item.remark && (
                            <span className="text-sm text-gray-600">
                              {" "}
                              - {item.remark}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveInvestigation(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Diagnosis */}
              {/* <div>
                <DiagnosisAutoComplete
                  value={formData.diagnosis}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, diagnosis: value }))
                  }
                />
              </div> */}
            </div>

            {/* Right Column - Rx, Advice, Follow Up, Special Note */}
            <div className="col-span-2 p-4 space-y-4">
              {/* Rx Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="rx-badge">℞</span>
                    <h3 className="font-semibold text-lg text-gray-800">Rx</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMedicineModal(true)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium"
                  >
                    <Plus size={16} />
                    Add Medicine
                  </button>
                </div>

                {/* Medicine List */}
                <div className="space-y-2 mb-4 min-h-[300px] border border-gray-200 rounded p-3 bg-gray-50">
                  {medicineList.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      No medicines added. Click "Add Medicine" to add.
                    </div>
                  ) : (
                    medicineList.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between bg-white p-2 rounded border border-gray-200"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">
                            {idx + 1}. {item.medicine}
                          </div>
                          <div className="text-sm text-gray-600">
                            {item.note}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveMedicine(idx)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Advices */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold text-gray-800">Advices</label>
                  <button
                    type="button"
                    onClick={() => setShowAdviceModal(true)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="space-y-1 min-h-[100px] border border-gray-200 rounded p-2 bg-gray-50">
                  {adviceList.length === 0 ? (
                    <div className="text-center text-gray-400 text-sm py-2">
                      Click + to add advice
                    </div>
                  ) : (
                    adviceList.map((advice, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-white px-2 py-1 rounded border border-gray-200"
                      >
                        <span className="text-sm text-gray-800">
                          • {advice}
                        </span>
                        <button
                          onClick={() => handleRemoveAdvice(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Follow Up */}
              <div>
                <label className="font-semibold text-gray-800 mb-2 block">
                  Follow Up +
                </label>
                <input
                  type="date"
                  name="nextVisitDate"
                  value={formData.nextVisitDate}
                  onChange={handleChange}
                  className={`w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none ${
                    errors.nextVisitDate ? "border-red-500" : ""
                  }`}
                />
                {errors.nextVisitDate && (
                  <p className="error-text">{errors.nextVisitDate}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <Printer size={20} />
            Save & Print
          </button>
        </div>
      </div>

      {/* Medicine Modal */}
      <MedicineSearchModal
        isOpen={showMedicineModal}
        onClose={() => setShowMedicineModal(false)}
        onAdd={handleAddMedicine}
      />

      {/* Chief Complaint Modal */}
      <ChiefComplaintModal
        isOpen={showComplaintModal}
        onClose={() => setShowComplaintModal(false)}
        onAdd={handleAddComplaint}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        onAdd={handleAddHistory}
      />

      {/* Investigation Modal */}
      <InvestigationModal
        isOpen={showInvestigationModal}
        onClose={() => setShowInvestigationModal(false)}
        onAdd={handleAddInvestigation}
      />

      {/* Advice Modal */}
      <AdviceModal
        isOpen={showAdviceModal}
        onClose={() => setShowAdviceModal(false)}
        onAdd={handleAddAdvice}
      />
    </div>
  );
}
