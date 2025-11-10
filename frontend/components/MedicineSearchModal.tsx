"use client";

import { useState, useEffect } from "react";
import { X, Search, Plus } from "lucide-react";
import api from "@/lib/api";

interface Medicine {
  id: number;
  brandName: string;
  genericName: string;
  strength: string;
  medicineType: string;
  manufacturerName: string;
}

interface MedicineItem {
  medicine: string;
  schedule: string;
  duration: string;
  note: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: MedicineItem) => void;
}

export default function MedicineSearchModal({ isOpen, onClose, onAdd }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [showQuickSelect, setShowQuickSelect] = useState(true);

  // Medicine details
  const [schedule, setSchedule] = useState({
    morning: 0,
    afternoon: 0,
    night: 0,
  });
  const [unit, setUnit] = useState("টি"); // Default Bangla unit
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("দিন");
  const [beforeAfterMeal, setBeforeAfterMeal] = useState("after");
  const [note, setNote] = useState("");

  // Common medicines for quick selection
  const commonMedicines = [
    { name: "Tab. Napa 500mg", type: "Tablet" },
    { name: "Tab. Ace 100mg", type: "Tablet" },
    { name: "Tab. Metformin 500mg", type: "Tablet" },
    { name: "Tab. Amlodipine 5mg", type: "Tablet" },
    { name: "Tab. Atorvastatin 10mg", type: "Tablet" },
    { name: "Cap. Omeprazole 20mg", type: "Capsule" },
    { name: "Tab. Losartan 50mg", type: "Tablet" },
    { name: "Tab. Aspirin 75mg", type: "Tablet" },
    { name: "Tab. Insulin Mixtard 30/70", type: "Injection" },
    { name: "Syp. Antacid 200ml", type: "Syrup" },
    { name: "Tab. Fexofenadine 120mg", type: "Tablet" },
    { name: "Cap. Ranitidine 150mg", type: "Capsule" },
  ];

  useEffect(() => {
    if (searchTerm.length >= 2) {
      searchMedicines();
      setShowQuickSelect(false);
    } else {
      setMedicines([]);
      setShowQuickSelect(true);
    }
  }, [searchTerm]);

  const searchMedicines = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/medicines/search?q=${searchTerm}`);
      if (response.data.success) {
        setMedicines(response.data.data || []);
      }
    } catch (error) {
      console.error("Medicine search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMedicine = (med: Medicine) => {
    setSelectedMedicine(med);
    setSearchTerm(`${med.brandName} ${med.strength}`);
    setMedicines([]);
    setShowQuickSelect(false);
  };

  const handleQuickSelect = (medicineName: string) => {
    setSearchTerm(medicineName);
    setSelectedMedicine(null);
    setShowQuickSelect(false);
  };

  const handleAddToPrescription = () => {
    const scheduleStr = `${schedule.morning}+${schedule.afternoon}+${schedule.night}`;
    const durationStr = duration ? `${duration} ${durationUnit}` : "";
    const mealTime =
      beforeAfterMeal === "before" ? "খাওয়ার আগে" : "খাওয়ার পরে";

    const medicineText = selectedMedicine
      ? `${selectedMedicine.brandName} ${selectedMedicine.strength}`
      : searchTerm;

    const fullNote = [scheduleStr, unit, durationStr, mealTime, note]
      .filter(Boolean)
      .join(" ");

    onAdd({
      medicine: medicineText,
      schedule: scheduleStr,
      duration: durationStr,
      note: fullNote,
    });

    // Reset
    setSearchTerm("");
    setSelectedMedicine(null);
    setSchedule({ morning: 0, afternoon: 0, night: 0 });
    setDuration("");
    setNote("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between sticky top-0">
          <h2 className="text-xl font-semibold">Medicine Search</h2>
          <button onClick={onClose} className="hover:bg-blue-700 p-1 rounded">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search medicine by name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          {/* Medicine List */}
          {loading && <p className="text-center text-gray-500">Searching...</p>}
          {medicines.length > 0 && (
            <div className="border rounded-lg max-h-48 overflow-y-auto">
              {medicines.map((med) => (
                <div
                  key={med.id}
                  onClick={() => handleSelectMedicine(med)}
                  className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                >
                  <div className="font-medium text-gray-900">
                    {med.brandName} {med.strength}
                  </div>
                  <div className="text-sm text-gray-600">
                    {med.genericName} • {med.medicineType} •{" "}
                    {med.manufacturerName}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Select Common Medicines */}
          {showQuickSelect && !loading && medicines.length === 0 && (
            <div className="border rounded-lg">
              <div className="bg-gray-100 px-4 py-2 font-semibold text-gray-700 text-sm border-b">
                Common Medicines - Click to Select
              </div>
              <div className="max-h-64 overflow-y-auto">
                {commonMedicines.map((med, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleQuickSelect(med.name)}
                    className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {med.name}
                      </div>
                      <div className="text-xs text-gray-500">{med.type}</div>
                    </div>
                    <div className="text-blue-600 text-sm">Select →</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule Section */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3 text-gray-700">Schedule</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">Morning</label>
                <input
                  type="number"
                  min="0"
                  value={schedule.morning}
                  onChange={(e) =>
                    setSchedule({
                      ...schedule,
                      morning: Number(e.target.value),
                    })
                  }
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Afternoon</label>
                <input
                  type="number"
                  min="0"
                  value={schedule.afternoon}
                  onChange={(e) =>
                    setSchedule({
                      ...schedule,
                      afternoon: Number(e.target.value),
                    })
                  }
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Night</label>
                <input
                  type="number"
                  min="0"
                  value={schedule.night}
                  onChange={(e) =>
                    setSchedule({ ...schedule, night: Number(e.target.value) })
                  }
                  className="input w-full"
                />
              </div>
            </div>
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm mb-1">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="input"
            >
              <option value="টি">টি (Pieces)</option>
              <option value="চা চামচ">চা চামচ (Teaspoon)</option>
              <option value="পাফ">পাফ (Puff)</option>
            </select>
          </div>

          {/* Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 7, 14, 30"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Duration Unit</label>
              <select
                value={durationUnit}
                onChange={(e) => setDurationUnit(e.target.value)}
                className="input"
              >
                <option value="দিন">দিন (Days)</option>
                <option value="সপ্তাহ">সপ্তাহ (Weeks)</option>
                <option value="মাস">মাস (Months)</option>
              </select>
            </div>
          </div>

          {/* Before/After Meal */}
          <div>
            <label className="block text-sm mb-2">Meal Time</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="before"
                  checked={beforeAfterMeal === "before"}
                  onChange={(e) => setBeforeAfterMeal(e.target.value)}
                />
                <span>খাওয়ার আগে (Before meal)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="after"
                  checked={beforeAfterMeal === "after"}
                  onChange={(e) => setBeforeAfterMeal(e.target.value)}
                />
                <span>খাওয়ার পরে (After meal)</span>
              </label>
            </div>
          </div>

          {/* Additional Note */}
          <div>
            <label className="block text-sm mb-1">Note (Optional)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any additional instructions"
              className="input"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddToPrescription}
            disabled={!searchTerm.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add To Prescription
          </button>
        </div>
      </div>
    </div>
  );
}
