import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import ResumeUploader from "../components/resume/ResumeUploader";
import JobDescriptionInput from "../components/resume/JobDescriptionInput";
import LoadingAnalysis from "../components/resume/LoadingAnalysis";
import ATSScoreCard from "../components/resume/ATSScoreCard";
import CandidateCard from "../components/resume/CandidateCard";
import SkillsCard from "../components/resume/SkillsCard";
import RecommendationsCard from "../components/resume/RecommendationsCard";

import { analyzeResume } from "../services/resumeApi";

function ResumeAnalysis() {
  const [file, setFile] = useState(null);

  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    setError("");

    if (!file) {
      setError("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await analyzeResume(
        file,
        jobDescription
      );

      setResult(response);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
        "Unable to analyze resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const canAnalyze =
    file !== null &&
    jobDescription.trim().length > 0 &&
    !loading;

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-white">
          AI Resume Analysis
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-400">
          Upload your resume, paste the job description,
          and let TalentIQ evaluate your ATS compatibility
          using AI-powered resume intelligence.
        </p>

      </div>

      {/* Input */}

      <div className="space-y-8">

        <ResumeUploader
          file={file}
          setFile={setFile}
        />

        <JobDescriptionInput
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
        />

        <button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className="w-full rounded-2xl bg-cyan-500 py-4 text-lg font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>

        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-400">
            {error}
          </div>
        )}

      </div>

      {/* Loading */}

      {loading && (
        <div className="mt-12">
          <LoadingAnalysis />
        </div>
      )}

      {/* Results */}

      {!loading && result && (
        <div className="mt-12 space-y-8">

          <ATSScoreCard
            score={result.ats.score}
          />

          <CandidateCard
            candidate={result.candidate}
          />

          <div className="grid gap-8 lg:grid-cols-2">

            <SkillsCard
              title="Matched Skills"
              skills={result.ats.matched_skills}
              type="matched"
            />

            <SkillsCard
              title="Missing Skills"
              skills={result.ats.missing_skills}
              type="missing"
            />

          </div>

          <RecommendationsCard
            recommendations={result.recommendations}
          />

        </div>
      )}
    </DashboardLayout>
  );
}

export default ResumeAnalysis;