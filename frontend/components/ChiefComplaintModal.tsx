"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";

interface ChiefComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (complaint: string) => void;
}

export default function ChiefComplaintModal({
  isOpen,
  onClose,
  onAdd,
}: ChiefComplaintModalProps) {
  const [customComplaint, setCustomComplaint] = useState("");

  // Preset chief complaints
  const presetComplaints = [
    "Fever",
    "Cough",
    "Back pain",
    "Muscle pain - hand",
    "Muscle pain - leg",
    "Headache",
    "Chest pain",
    "Abdominal pain",
    "Shortness of breath",
    "Dizziness",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Fatigue",
    "Weakness",
    "Joint pain",
    "Sore throat",
    "Runny nose",
    "Body ache",
    "Loss of appetite",
  ];

  const handleSelectPreset = (complaint: string) => {
    onAdd(complaint);
    onClose();
  };

  const handleAddCustom = () => {
    if (customComplaint.trim()) {
      onAdd(customComplaint.trim());
      setCustomComplaint("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Add Chief Complaint
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {/* Custom Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Chief Complaint
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customComplaint}
                onChange={(e) => setCustomComplaint(e.target.value)}
                placeholder="Type custom complaint..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAddCustom();
                }}
              />
              <button
                onClick={handleAddCustom}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium flex items-center gap-1"
              >
                <Plus size={18} />
                Add
              </button>
            </div>
          </div>

          {/* Preset Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Select - Common Complaints
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presetComplaints.map((complaint, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(complaint)}
                  className="px-4 py-2 text-left border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-500 transition-colors"
                >
                  {complaint}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
