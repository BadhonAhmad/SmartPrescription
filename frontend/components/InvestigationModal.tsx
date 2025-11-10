"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";

interface InvestigationItem {
  test: string;
  remark: string;
}

interface InvestigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: InvestigationItem) => void;
}

export default function InvestigationModal({
  isOpen,
  onClose,
  onAdd,
}: InvestigationModalProps) {
  const [selectedTest, setSelectedTest] = useState("");
  const [customTest, setCustomTest] = useState("");
  const [remark, setRemark] = useState("");
  const [showQuickSelect, setShowQuickSelect] = useState(true);

  // Preset investigation tests
  const presetTests = [
    "CBC (Complete Blood Count)",
    "Dengue NS1 Antigen",
    "Dengue IgG/IgM",
    "Blood Sugar (Fasting)",
    "Blood Sugar (Random)",
    "HbA1c",
    "Lipid Profile",
    "Liver Function Test (LFT)",
    "Kidney Function Test (KFT)",
    "Serum Creatinine",
    "Urine R/E",
    "X-Ray Chest",
    "ECG",
    "Thyroid Function Test (TSH, T3, T4)",
    "Electrolytes (Na, K, Cl)",
    "Blood Urea",
    "Serum Uric Acid",
    "ESR",
    "CRP",
    "Vitamin D",
    "Vitamin B12",
    "Ultrasound Abdomen",
    "CT Scan",
    "MRI",
  ];

  // Common remarks
  const commonRemarks = ["Normal", "Good", "Bad", "Abnormal", "Pending"];

  const handleSelectPreset = (test: string) => {
    setSelectedTest(test);
    setCustomTest("");
    setShowQuickSelect(false);
  };

  const handleCustomTestChange = (value: string) => {
    setCustomTest(value);
    setSelectedTest("");
    if (value.trim()) {
      setShowQuickSelect(false);
    } else {
      setShowQuickSelect(true);
    }
  };

  const handleAdd = () => {
    const testName = selectedTest || customTest.trim();
    if (testName) {
      onAdd({
        test: testName,
        remark: remark.trim(),
      });
      // Reset form
      setSelectedTest("");
      setCustomTest("");
      setRemark("");
      setShowQuickSelect(true);
    }
  };

  const handleClose = () => {
    setSelectedTest("");
    setCustomTest("");
    setRemark("");
    setShowQuickSelect(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Add Investigation
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[65vh]">
          {/* Quick Select - Preset Tests */}
          {showQuickSelect && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Select - Common Tests
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                {presetTests.map((test, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(test)}
                    className="px-3 py-2 text-left text-sm border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-500 transition-colors bg-white"
                  >
                    {test}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Test Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Name {selectedTest && "(Selected from Quick Select)"}
            </label>
            {selectedTest ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={selectedTest}
                  readOnly
                  className="flex-1 px-3 py-2 border border-blue-500 rounded bg-blue-50 font-medium"
                />
                <button
                  onClick={() => {
                    setSelectedTest("");
                    setShowQuickSelect(true);
                  }}
                  className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm"
                >
                  Clear
                </button>
              </div>
            ) : (
              <input
                type="text"
                value={customTest}
                onChange={(e) => handleCustomTestChange(e.target.value)}
                placeholder="Or type custom test name..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}
          </div>

          {/* Remark Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remark / Result (Optional)
            </label>

            {/* Common Remark Buttons */}
            <div className="flex gap-2 mb-2 flex-wrap">
              {commonRemarks.map((commonRemark, idx) => (
                <button
                  key={idx}
                  onClick={() => setRemark(commonRemark)}
                  className={`px-3 py-1 text-sm border rounded transition-colors ${
                    remark === commonRemark
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {commonRemark}
                </button>
              ))}
            </div>

            {/* Custom Remark Input */}
            <input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Or type custom remark..."
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Preview */}
          {(selectedTest || customTest.trim()) && (
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
              <p className="text-gray-800">
                <span className="font-semibold">
                  {selectedTest || customTest}
                </span>
                {remark && <span className="text-gray-600"> - {remark}</span>}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end gap-2 bg-gray-50">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedTest && !customTest.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium flex items-center gap-1 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Plus size={18} />
            Add Investigation
          </button>
        </div>
      </div>
    </div>
  );
}
