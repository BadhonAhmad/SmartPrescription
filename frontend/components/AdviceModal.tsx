"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";

interface AdviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (advice: string) => void;
}

export default function AdviceModal({
  isOpen,
  onClose,
  onAdd,
}: AdviceModalProps) {
  const [customAdvice, setCustomAdvice] = useState("");

  // Preset medical advices
  const presetAdvices = [
    "Take adequate rest",
    "Drink plenty of water",
    "Avoid oily and spicy food",
    "Avoid smoking",
    "Avoid alcohol",
    "Regular exercise",
    "Maintain healthy diet",
    "Check blood sugar regularly",
    "Check blood pressure regularly",
    "Take medicine on time",
    "Come for follow up",
    "Avoid cold water",
    "Take warm water",
    "Avoid stress",
    "Get adequate sleep",
    "Use mask in public",
    "Maintain hygiene",
    "Avoid crowded places",
    "Monitor temperature daily",
    "Isolate if symptoms worsen",
  ];

  const handleSelectPreset = (advice: string) => {
    onAdd(advice);
    onClose();
  };

  const handleAddCustom = () => {
    if (customAdvice.trim()) {
      onAdd(customAdvice.trim());
      setCustomAdvice("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Add Advice</h2>
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
              Custom Advice
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customAdvice}
                onChange={(e) => setCustomAdvice(e.target.value)}
                placeholder="Type custom advice..."
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
              Quick Select - Common Advices
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presetAdvices.map((advice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(advice)}
                  className="px-4 py-2 text-left border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-500 transition-colors"
                >
                  {advice}
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
