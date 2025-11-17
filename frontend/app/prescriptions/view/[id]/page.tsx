"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { getDoctorProfile } from "@/lib/profileUtils";

interface Medicine {
  name: string;
  schedule: string;
  timing: string;
  duration: string;
}

interface SectionItem {
  text: string;
  note?: string;
}

interface Prescription {
  prescriptionId: number;
  name: string;
  patientAge: number;
  gender: string;
  visit: string;
  id: number;
  complaint: string;
  history: string;
  onExamination: string;
  investigation: string;
  diagnosis: string;
  treatmentPlan: string;
  medicine: string;
  advice: string;
  followUp: string;
  notes: string;
  nextVisit: string;
}

export default function PrescriptionViewPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [doctorProfile, setDoctorProfile] = useState<any>(null);

  useEffect(() => {
    setDoctorProfile(getDoctorProfile());
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (params.id) {
      fetchPrescription();
    }
  }, [params.id]);

  const fetchPrescription = async () => {
    try {
      const response = await api.get(`/API/v1/prescription/${params.id}`);
      setPrescription(response.data.data);
    } catch (error) {
      console.error("Error fetching prescription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const parseMedicines = (medicineText: string): Medicine[] => {
    if (!medicineText) return [];
    return medicineText
      .split("\n")
      .filter((m) => m.trim())
      .map((med) => {
        const parts = med.split("(");
        return {
          name: parts[0]?.trim() || "",
          schedule: parts[1]?.split(")")[0] || "",
          timing: parts[1]?.split(")")[1]?.split("Days")[0]?.trim() || "",
          duration: med.includes("Days")
            ? med.split("Days")[0].split(" ").pop() + " Days"
            : "",
        };
      });
  };

  const parseSectionItems = (text: string): SectionItem[] => {
    if (!text) return [];
    return text
      .split(";")
      .map((item) => {
        const parts = item.trim().split(" - ");
        return {
          text: parts[0] || "",
          note: parts[1] || "",
        };
      })
      .filter((item) => item.text);
  };

  if (loading || isLoading || !prescription) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const medicines = parseMedicines(prescription.medicine);
  const chiefComplaints = parseSectionItems(prescription.complaint);
  const histories = parseSectionItems(prescription.history);
  const examinations = parseSectionItems(prescription.onExamination);
  const investigations = parseSectionItems(prescription.investigation);
  // Handle diagnosis as either semicolon-separated list or plain text
  const diagnoses = prescription.diagnosis
    ? prescription.diagnosis.includes(";")
      ? parseSectionItems(prescription.diagnosis)
      : [{ text: prescription.diagnosis, note: "" }]
    : [];
  const treatments = parseSectionItems(prescription.treatmentPlan);
  const advices = prescription.advice?.split(";").filter((a) => a.trim()) || [];
  const followUps =
    prescription.followUp?.split(";").filter((f) => f.trim()) || [];
  const specialNotes =
    prescription.notes?.split(";").filter((n) => n.trim()) || [];
  prescription.notes?.split(";").filter((n) => n.trim()) || [];

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
          .prescription-container {
            box-shadow: none !important;
            margin: 0 !important;
          }
        }
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>

      {/* Print Button - Hidden when printing */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-lg"
        >
          ← Back
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
        >
          🖨️ Print
        </button>
      </div>

      {/* A4 Page Container - Non-scrollable, fixed height */}
      <div
        className="prescription-container bg-white"
        style={{
          width: "210mm",
          height: "297mm",
          margin: "0 auto",
          padding: "15mm",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          overflow: "hidden",
          fontSize: "11px",
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.4",
          position: "relative",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: "2px solid #10b981",
            paddingBottom: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "#10b981",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  letterSpacing: "0.5px",
                }}
              >
                {doctorProfile?.doctorName || "DOCTOR NAME"}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#6b7280",
                  fontStyle: "italic",
                }}
              >
                {doctorProfile?.doctorDegree || "Degrees"}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  color: "#10b981",
                  fontSize: "18px",
                  fontWeight: "bold",
                  direction: "rtl",
                  marginBottom: "2px",
                }}
              >
                {doctorProfile?.doctorNameBangla || "ডাক্তারের নাম"}
              </div>
              <div
                style={{
                  fontSize: "9px",
                  color: "#6b7280",
                  direction: "rtl",
                }}
              >
                {doctorProfile?.doctorDegreeBangla || "ডিগ্রি"}
              </div>
            </div>
          </div>
        </div>

        {/* Patient Info Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 1fr 1fr",
            gap: "15px",
            fontSize: "10px",
            marginBottom: "12px",
            paddingBottom: "8px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div>
            <strong>Name:</strong> {prescription.name}
          </div>
          <div>
            <strong>Date:</strong>{" "}
            {new Date(prescription.visit).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>
          <div>
            <strong>Age:</strong> {prescription.patientAge}
          </div>
          <div>
            <strong>Id:</strong> {prescription.id}
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "78mm 1px 120mm",
            gap: "0",
            height: "calc(297mm - 75mm)",
            overflow: "hidden",
          }}
        >
          {/* Left Column */}
          <div
            style={{
              paddingRight: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* Chief Complaint */}
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "#1f2937",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Chief Complaint <span style={{ color: "#10b981" }}>+</span>
              </div>
              {chiefComplaints.length > 0 && (
                <div style={{ fontSize: "10px", color: "#374151" }}>
                  {chiefComplaints.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: "4px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "6px",
                          color: "#ef4444",
                          fontSize: "8px",
                        }}
                      >
                        ●
                      </span>
                      <span>
                        {item.text}
                        {item.note && (
                          <span style={{ color: "#6b7280", marginLeft: "4px" }}>
                            - {item.note}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* History */}
            {histories.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    color: "#1f2937",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  History <span style={{ color: "#10b981" }}>+</span>
                </div>
                <div style={{ fontSize: "10px", color: "#374151" }}>
                  {histories.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: "4px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "6px",
                          color: "#ef4444",
                          fontSize: "8px",
                        }}
                      >
                        ●
                      </span>
                      <span>
                        {item.text}
                        {item.note && (
                          <span
                            style={{
                              color: "#6b7280",
                              fontStyle: "italic",
                              marginLeft: "4px",
                            }}
                          >
                            {item.note}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* On Examination */}
            {examinations.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    color: "#1f2937",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  On Examination <span style={{ color: "#10b981" }}>+</span>
                </div>
                <div style={{ fontSize: "10px", color: "#374151" }}>
                  {examinations.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: "4px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "6px",
                          color: "#ef4444",
                          fontSize: "8px",
                        }}
                      >
                        ●
                      </span>
                      <span>
                        {item.text}
                        {item.note && (
                          <span
                            style={{
                              color: "#10b981",
                              marginLeft: "4px",
                              fontWeight: "600",
                            }}
                          >
                            {item.note}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Investigation */}
            {investigations.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    color: "#1f2937",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Investigation <span style={{ color: "#10b981" }}>+</span>
                </div>
                <div style={{ fontSize: "10px", color: "#374151" }}>
                  {investigations.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: "4px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "6px",
                          color: "#ef4444",
                          fontSize: "8px",
                        }}
                      >
                        ●
                      </span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Diagnosis - Always show with debug info */}
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "#1f2937",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Diagnosis <span style={{ color: "#10b981" }}>+</span>
              </div>
              {prescription.diagnosis && prescription.diagnosis.trim() ? (
                <div style={{ fontSize: "10px", color: "#374151" }}>
                  {diagnoses.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: "4px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "6px",
                          color: "#ef4444",
                          fontSize: "8px",
                        }}
                      >
                        ●
                      </span>
                      <span>
                        {item.text}
                        {item.note && (
                          <span
                            style={{
                              color: "#6b7280",
                              marginLeft: "4px",
                              fontStyle: "italic",
                            }}
                          >
                            {item.note}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "9px",
                    color: "#9ca3af",
                    fontStyle: "italic",
                  }}
                >
                  No diagnosis recorded
                </div>
              )}
            </div>

            {/* Treatment Plan */}
            {treatments.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    color: "#1f2937",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Treatment Plan <span style={{ color: "#10b981" }}>+</span>
                </div>
                <div style={{ fontSize: "10px", color: "#374151" }}>
                  {treatments.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: "4px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "6px",
                          color: "#ef4444",
                          fontSize: "8px",
                        }}
                      >
                        ●
                      </span>
                      <span>
                        {item.text}
                        {item.note && (
                          <span
                            style={{
                              color: "#6b7280",
                              fontStyle: "italic",
                              marginLeft: "4px",
                            }}
                          >
                            {item.note}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Vertical Separator */}
          <div
            style={{
              width: "1px",
              backgroundColor: "#d1d5db",
              height: "100%",
            }}
          />

          {/* Right Column */}
          <div
            style={{
              paddingLeft: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* Rx Header */}
            <div
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "6px",
                display: "flex",
                gap: "15px",
                alignItems: "center",
                color: "#1f2937",
              }}
            >
              <span>Rx</span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "normal",
                  color: "#10b981",
                }}
              >
                +
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "normal",
                  color: "#9ca3af",
                }}
              >
                (Translate)
              </span>
            </div>

            {/* Medicines */}
            {medicines.length > 0 && (
              <div
                style={{
                  fontSize: "10px",
                  marginBottom: "10px",
                }}
              >
                {medicines.map((med, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginBottom: "12px",
                      paddingBottom: "10px",
                      borderBottom:
                        idx < medicines.length - 1
                          ? "1px solid #f3f4f6"
                          : "none",
                      backgroundColor:
                        idx % 2 === 0 ? "#f9fafb" : "transparent",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "4px",
                        color: "#1f2937",
                        fontSize: "11px",
                      }}
                    >
                      {idx + 1}. {med.name}
                    </div>
                    {med.schedule && (
                      <div
                        style={{
                          paddingLeft: "18px",
                          color: "#4b5563",
                          marginBottom: "2px",
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>
                          {med.schedule}
                        </span>
                        {med.timing && (
                          <span style={{ color: "#6b7280" }}>{med.timing}</span>
                        )}
                        {med.duration && (
                          <span style={{ color: "#10b981", fontWeight: "600" }}>
                            {med.duration}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Advices */}
            {advices.length > 0 && (
              <div style={{ marginTop: "8px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    color: "#1f2937",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Advices <span style={{ color: "#10b981" }}>+</span>
                </div>
                <div style={{ fontSize: "10px", color: "#4b5563" }}>
                  {advices.map((advice, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: "4px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "6px",
                          color: "#10b981",
                          fontSize: "8px",
                        }}
                      >
                        ●
                      </span>
                      <span>{advice.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Follow Up */}
            {followUps.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    color: "#1f2937",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Follow Up <span style={{ color: "#10b981" }}>+</span>
                </div>
                <div style={{ fontSize: "10px", color: "#4b5563" }}>
                  {followUps.map((follow, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: "4px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "6px",
                          color: "#10b981",
                          fontSize: "8px",
                        }}
                      >
                        ●
                      </span>
                      <span>{follow.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Note */}
            {specialNotes.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    color: "#1f2937",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Special Note <span style={{ color: "#10b981" }}>+</span>
                </div>
                <div style={{ fontSize: "10px", color: "#4b5563" }}>
                  {specialNotes.map((note, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: "4px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "6px",
                          color: "#10b981",
                          fontSize: "8px",
                        }}
                      >
                        ●
                      </span>
                      <span>{note.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "10mm",
            left: "15mm",
            right: "15mm",
            borderTop: "2px solid #10b981",
            paddingTop: "8px",
            fontSize: "8px",
            color: "#6b7280",
          }}
        >
          {/* Next Visit Date */}
          {prescription.nextVisit && (
            <div
              style={{
                textAlign: "left",
                marginBottom: "6px",
                fontSize: "9px",
                fontWeight: "600",
                color: "#1f2937",
              }}
            >
              Next Visit:{" "}
              <span style={{ color: "#10b981" }}>
                {new Date(prescription.nextVisit).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: "3px", fontWeight: "500" }}>
              Registered To{" "}
              <strong style={{ color: "#1f2937" }}>
                {doctorProfile?.doctorName || "DOCTOR NAME"}
              </strong>{" "}
              {doctorProfile?.phoneNo || ""}
            </div>
            <div style={{ fontSize: "7px" }}>
              © All rights reserved to SmartClinic
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
