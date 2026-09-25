"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EnterpriseNavbar from "@/components/EnterpriseNavbar";
import DocumentValidationPipeline from "@/components/DocumentValidationPipeline";
import { usePlatformState, computeSha256 } from "@/lib/platform-state";
import { DOCUMENT_CATEGORIES } from "@/lib/mock-platform-data";
import {
  FileCheck2,
  Building2,
  User,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  FileText,
  Binary
} from "lucide-react";

export default function UniversityDocumentUploadWizard() {
  const router = useRouter();
  const { students, addDocument, activeRole } = usePlatformState();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("stu_alex_001");
  const [selectedCategory, setSelectedCategory] = useState<string>("UNDERGRADUATE DOCUMENTS");
  const [selectedDocType, setSelectedDocType] = useState<string>("Degree Certificate (Final)");

  const [docNumber, setDocNumber] = useState<string>("MIT-CS-2026-9921");
  const [issueDate, setIssueDate] = useState<string>("2026-06-04");
  const [academicYear, setAcademicYear] = useState<string>("2022-2026");
  const [course, setCourse] = useState<string>("B.S. in Computer Science & Artificial Intelligence");
  const [department, setDepartment] = useState<string>("Department of Electrical Engineering & Computer Science");
  const [semester, setSemester] = useState<string>("Final Term (Term 8)");
  const [gradeResult, setGradeResult] = useState<string>("First Class with High Honors (GPA: 4.95/5.0)");

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("Official_Degree_Certificate_Signed.pdf");
  const [fileSize, setFileSize] = useState<string>("2.1 MB");
  const [generatedHash, setGeneratedHash] = useState<string>(
    "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
  );
  const [isHashing, setIsHashing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setFileName(f.name);
    setFileSize((f.size / (1024 * 1024)).toFixed(2) + " MB");
    setIsHashing(true);
    try {
      const hash = await computeSha256(f);
      setGeneratedHash(hash);
    } catch (err) {
      console.error(err);
    } finally {
      setIsHashing(false);
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newDoc = {
        id: "doc_mit_" + Math.random().toString(36).substring(2, 7),
        studentId: selectedStudent.id,
        studentName: selectedStudent.name,
        studentDid: selectedStudent.did,
        universityId: "inst_mit_001",
        universityName: "Massachusetts Institute of Technology",
        documentType: selectedDocType,
        category: selectedCategory.includes("UNDERGRADUATE")
          ? ("UNDERGRADUATE" as const)
          : selectedCategory.includes("SCHOOL")
          ? ("SCHOOL" as const)
          : selectedCategory.includes("POSTGRADUATE")
          ? ("POSTGRADUATE" as const)
          : ("IDENTITY" as const),
        documentNumber: docNumber,
        issueDate: issueDate,
        academicYear: academicYear,
        sha256Hash: generatedHash,
        status: "VERIFIED" as const,
        uploadedBy: "Prof. Arthur Pendelton (Dean of Engineering)",
        uploadedAt: new Date().toISOString(),
        fileName: fileName,
        fileSize: fileSize,
        ipfsCid: "Qm" + Math.random().toString(36).substring(2, 15) + "SignedDocumentCid",
        credentialId: "cred_mit_" + Math.random().toString(36).substring(2, 7),
        checks: {
          fileValid: true,
          metadataValid: true,
          studentMatched: true,
          universityMatched: true,
          issuerAuthorized: true,
          hashGenerated: true,
          duplicateFree: true,
          blockchainAnchored: true
        },
        versions: [
          {
            versionNumber: 1,
            sha256Hash: generatedHash,
            uploadedAt: new Date().toISOString(),
            status: "ACTIVE"
          }
        ]
      };

      addDocument(newDoc);
      setIsSubmitting(false);
      setUploadSuccess(true);
    }, 1200);
  };

  const steps = [
    "Select Student",
    "Document Type",
    "Metadata",
    "Upload & Hash",
    "Pipeline Check",
    "Review & Anchor"
  ];

  return (
    <div className="min-h-screen bg-canvas-texture text-forest pb-24">
      <EnterpriseNavbar activeRole="UNIVERSITY" />

      {/* Header */}
      <section className="border-b border-forest/10 bg-white/70 backdrop-blur px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-xs font-semibold uppercase tracking-wider text-forest/80 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-ochre" />
              Source of Authority Registrar Pipeline • 7-Step Verification
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
              Upload & Anchor Source Document
            </h1>
            <p className="mt-1 text-forest/75 text-sm max-w-xl">
              Academic source documents can only be attached by an authorized university. Every document undergoes an internal 10-point cryptographic validation pipeline.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 pt-8 space-y-8">
        {/* Step Progress Bar */}
        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            {steps.map((label, idx) => {
              const stepNumber = idx + 1;
              const isDone = currentStep > stepNumber;
              const isCurrent = currentStep === stepNumber;
              return (
                <div key={label} className="flex-1 flex flex-col items-center relative">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition z-10 ${
                      isDone
                        ? "bg-emerald-600 text-white"
                        : isCurrent
                        ? "bg-forest text-white ring-4 ring-ochre/30"
                        : "bg-forest/10 text-forest/50"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : stepNumber}
                  </div>
                  <span
                    className={`text-[11px] mt-2 font-semibold text-center hidden sm:block ${
                      isCurrent ? "text-forest font-bold" : "text-forest/60"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1: Select Student */}
        {currentStep === 1 && (
          <div className="bg-white border border-forest/10 rounded-2xl p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-forest/50 uppercase tracking-wider">
                Step 1 of 6
              </span>
              <h2 className="text-xl font-bold text-forest mt-1">Select Enrolled Student</h2>
              <p className="text-xs text-forest/70 mt-1">
                Attach this authoritative document to a verified student profile within your institutional cohort.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map((stu) => (
                <div
                  key={stu.id}
                  onClick={() => setSelectedStudentId(stu.id)}
                  className={`cursor-pointer p-5 rounded-2xl border transition flex flex-col justify-between ${
                    selectedStudentId === stu.id
                      ? "border-forest bg-forest/5 ring-2 ring-forest/10"
                      : "border-forest/10 hover:border-forest/30 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-forest text-base">{stu.name}</div>
                      <div className="text-xs text-forest/70 mt-0.5">{stu.program}</div>
                      <div className="text-[11px] text-forest/50">{stu.department}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedStudentId === stu.id
                          ? "border-forest bg-forest text-white"
                          : "border-forest/20"
                      }`}
                    >
                      {selectedStudentId === stu.id && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-forest/10 flex items-center justify-between text-[11px] font-mono text-forest/60">
                    <span>{stu.year}</span>
                    <span>{stu.did.slice(0, 24)}...</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center gap-2"
              >
                Continue to Document Type <ArrowRight className="w-4 h-4 text-ochre" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Document Type */}
        {currentStep === 2 && (
          <div className="bg-white border border-forest/10 rounded-2xl p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-forest/50 uppercase tracking-wider">
                Step 2 of 6
              </span>
              <h2 className="text-xl font-bold text-forest mt-1">
                Select Authoritative Document Type
              </h2>
              <p className="text-xs text-forest/70 mt-1">
                Categorized institutional records recognized under the AcadShield Credential Architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Selector */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-forest/60 uppercase">Category</span>
                <div className="space-y-1.5">
                  {Object.keys(DOCUMENT_CATEGORIES).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedDocType(DOCUMENT_CATEGORIES[cat][0]);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        selectedCategory === cat
                          ? "bg-forest text-white shadow-sm"
                          : "bg-forest/5 hover:bg-forest/10 text-forest"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-types */}
              <div className="md:col-span-2 space-y-2">
                <span className="text-xs font-bold text-forest/60 uppercase">
                  Available Documents in {selectedCategory}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DOCUMENT_CATEGORIES[selectedCategory]?.map((docType) => (
                    <div
                      key={docType}
                      onClick={() => setSelectedDocType(docType)}
                      className={`cursor-pointer p-3.5 rounded-xl border text-xs font-medium transition flex items-center justify-between ${
                        selectedDocType === docType
                          ? "border-forest bg-forest/5 font-bold text-forest ring-1 ring-forest"
                          : "border-forest/10 hover:border-forest/20 text-forest/80"
                      }`}
                    >
                      <span>{docType}</span>
                      {selectedDocType === docType && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-forest/10">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-xl border border-forest/20 text-xs font-bold text-forest flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center gap-2"
              >
                Proceed to Metadata <ArrowRight className="w-4 h-4 text-ochre" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Metadata */}
        {currentStep === 3 && (
          <div className="bg-white border border-forest/10 rounded-2xl p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-forest/50 uppercase tracking-wider">
                Step 3 of 6
              </span>
              <h2 className="text-xl font-bold text-forest mt-1">Enter Academic Metadata</h2>
              <p className="text-xs text-forest/70 mt-1">
                Official registrar records to bind with the document cryptographic hash.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-forest mb-1">
                  Document / Serial Number *
                </label>
                <input
                  type="text"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest mb-1">
                  Issue / Convocation Date *
                </label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest mb-1">
                  Academic Year Cohort
                </label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest mb-1">
                  Semester / Term
                </label>
                <input
                  type="text"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest mb-1">
                  Department / School
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest mb-1">
                  Grade / Honors Result
                </label>
                <input
                  type="text"
                  value={gradeResult}
                  onChange={(e) => setGradeResult(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-forest/10">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded-xl border border-forest/20 text-xs font-bold text-forest flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center gap-2"
              >
                Upload File & Compute Fingerprint <ArrowRight className="w-4 h-4 text-ochre" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Upload File & Compute Hash */}
        {currentStep === 4 && (
          <div className="bg-white border border-forest/10 rounded-2xl p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-forest/50 uppercase tracking-wider">
                Step 4 of 6
              </span>
              <h2 className="text-xl font-bold text-forest mt-1">
                Upload File & Compute Cryptographic Fingerprint
              </h2>
              <p className="text-xs text-forest/70 mt-1">
                Your browser calculates the SHA-256 hash using the Web Crypto API before the file is anchored.
              </p>
            </div>

            <label className="border-2 border-dashed border-forest/20 hover:border-ochre hover:bg-ochre/5 transition rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer group bg-forest/5">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-forest/10 group-hover:bg-ochre/20 flex items-center justify-center text-forest group-hover:text-ochre transition mb-3">
                <Upload className="w-7 h-7" />
              </div>
              <p className="text-base font-bold text-forest">
                Click to browse or drop official academic document
              </p>
              <p className="text-xs text-forest/60 mt-1">
                PDF, JPG, PNG (Max 50MB) • Signed Registrar Copy
              </p>
            </label>

            {/* Generated Hash Box */}
            <div className="p-4 rounded-xl bg-forest/5 border border-forest/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-forest flex items-center gap-1.5">
                  <Binary className="w-4 h-4 text-ochre" />
                  SHA-256 Document Fingerprint
                </span>
                {isHashing ? (
                  <span className="text-ochre font-bold animate-pulse">Computing hash...</span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Computed
                  </span>
                )}
              </div>
              <div className="font-mono text-xs text-forest/90 bg-white p-3 rounded-lg border border-forest/10 break-all select-all">
                {generatedHash}
              </div>
              <p className="text-[11px] text-forest/60">
                This fingerprint uniquely represents this exact document file. If even a single byte is altered, the fingerprint changes entirely.
              </p>
            </div>

            <div className="flex justify-between pt-4 border-t border-forest/10">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 rounded-xl border border-forest/20 text-xs font-bold text-forest flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="px-6 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center gap-2"
              >
                Run Validation Pipeline <ArrowRight className="w-4 h-4 text-ochre" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Document Validation Pipeline */}
        {currentStep === 5 && (
          <div className="bg-white border border-forest/10 rounded-2xl p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-forest/50 uppercase tracking-wider">
                Step 5 of 6
              </span>
              <h2 className="text-xl font-bold text-forest mt-1">
                Internal 10-Point Validation Pipeline
              </h2>
              <p className="text-xs text-forest/70 mt-1">
                AcadShield X does NOT automatically trust documents simply because an institution uploaded them. Every record must pass internal integrity validations.
              </p>
            </div>

            {/* Reusable Pipeline Component */}
            <DocumentValidationPipeline
              fileName={fileName}
              studentName={selectedStudent.name}
              universityName="Massachusetts Institute of Technology"
              documentType={selectedDocType}
              documentNumber={docNumber}
              sha256Hash={generatedHash}
            />

            <div className="flex justify-between pt-4 border-t border-forest/10">
              <button
                onClick={() => setCurrentStep(4)}
                className="px-4 py-2 rounded-xl border border-forest/20 text-xs font-bold text-forest flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(6)}
                className="px-6 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center gap-2"
              >
                Proceed to Review & Sign <ArrowRight className="w-4 h-4 text-ochre" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Review & Final Submit */}
        {currentStep === 6 && !uploadSuccess && (
          <div className="bg-white border border-forest/10 rounded-2xl p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-forest/50 uppercase tracking-wider">
                Step 6 of 6
              </span>
              <h2 className="text-xl font-bold text-forest mt-1">Review & Anchor Document</h2>
              <p className="text-xs text-forest/70 mt-1">
                Verify that all metadata accurately corresponds to official university registrar archives before signing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-forest/5 border border-forest/10 space-y-2">
                <span className="font-bold text-forest uppercase tracking-wider text-[10px] text-forest/50 block">
                  Student Holder
                </span>
                <div className="font-bold text-sm text-forest">{selectedStudent.name}</div>
                <div className="text-forest/60 font-mono">{selectedStudent.did}</div>
                <div className="text-forest/70">{selectedStudent.program}</div>
              </div>

              <div className="p-4 rounded-xl bg-forest/5 border border-forest/10 space-y-2">
                <span className="font-bold text-forest uppercase tracking-wider text-[10px] text-forest/50 block">
                  Document Identity
                </span>
                <div className="font-bold text-sm text-forest">{selectedDocType}</div>
                <div className="text-forest/60">Serial #: {docNumber}</div>
                <div className="text-forest/70">Issue Date: {issueDate} • Year: {academicYear}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-900 block">
                Cryptographic Anchor Details
              </span>
              <div className="font-mono text-emerald-800 break-all">
                SHA-256: {generatedHash}
              </div>
              <div className="text-emerald-700 text-[11px] pt-1">
                Will be registered to smart contract on Polygon Amoy under Issuer DID.
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-forest/10">
              <button
                onClick={() => setCurrentStep(5)}
                className="px-4 py-2 rounded-xl border border-forest/20 text-xs font-bold text-forest flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="px-7 py-3 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Signing & Anchoring to Registry...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-ochre" />
                    Submit Authoritative Record
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Upload Success Screen */}
        {uploadSuccess && (
          <div className="bg-white border-2 border-emerald-500 rounded-2xl p-8 shadow-md text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-2xl font-black text-forest">
              Academic Document Successfully Registered!
            </h2>
            <p className="text-xs text-forest/75 max-w-lg mx-auto leading-relaxed">
              The document has been cryptographically fingerprinted, verified through the 10-point internal pipeline, and permanently registered under MIT’s institutional authority.
            </p>

            <div className="p-4 rounded-xl bg-forest/5 border border-forest/10 max-w-md mx-auto text-left text-xs font-mono space-y-1 text-forest/80">
              <div>Doc: {selectedDocType}</div>
              <div>Student: {selectedStudent.name}</div>
              <div className="truncate">Hash: {generatedHash}</div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => router.push("/university/documents")}
                className="px-5 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow"
              >
                Return to Document Center
              </button>
              <button
                onClick={() => {
                  setUploadSuccess(false);
                  setCurrentStep(1);
                }}
                className="px-4 py-2.5 rounded-xl border border-forest/20 text-forest font-bold text-xs hover:bg-forest/5 transition"
              >
                Upload Another Document
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
