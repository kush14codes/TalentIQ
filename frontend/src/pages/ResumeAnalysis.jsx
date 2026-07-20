import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import ResumeUploader from "../components/resume/ResumeUploader";
import JobDescriptionInput from "../components/resume/JobDescriptionInput";
import LoadingAnalysis from "../components/resume/LoadingAnalysis";

import ATSScoreCard from "../components/resume/ATSScoreCard";
import CandidateCard from "../components/resume/CandidateCard";
import SkillsCard from "../components/resume/SkillsCard";
import RecommendationsCard from "../components/resume/RecommendationsCard";
import SemanticMatchesCard from "../components/resume/SemanticMatchesCard";

import AIResumeSummaryCard from "../components/resume/AIResumeSummaryCard";
import RecruiterReviewCard from "../components/resume/RecruiterReviewCard";
import AISuggestionsCard from "../components/resume/AISuggestionsCard";
import InterviewQuestionsCard from "../components/resume/InterviewQuestionsCard";

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
    file &&
    jobDescription.trim().length > 0 &&
    !loading;

  return (
    <DashboardLayout>

      {/* Page Header */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-white">
          AI Resume Analysis
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-400">
          Upload your resume and compare it with any
          job description using TalentIQ's semantic AI
          matching engine.
        </p>

      </div>

      {/* Input Section */}

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
          {loading
            ? "Analyzing Resume..."
            : "Analyze Resume"}
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

          {/* ATS Score */}

          <ATSScoreCard
            score={result.ats.score}
          />

          {/* Candidate */}

          <CandidateCard
            candidate={result.candidate}
          />

          {/* AI Resume Summary */}

          <AIResumeSummaryCard
            summary={result.ai?.summary}
          />

          {/* Recruiter Review */}

          <RecruiterReviewCard
            review={result.ai?.review}
          />

          {/* AI Suggestions */}

          <AISuggestionsCard
            suggestions={result.ai?.suggestions}
          />

          {/* Interview Questions */}

          <InterviewQuestionsCard
            questions={result.ai?.interview_questions}
          />

          {/* Semantic Matches */}

          <SemanticMatchesCard
            semanticMatches={
              result.ats.semantic_matches || []
            }
          />

          {/* Skills */}

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

          {/* Recommendations */}

          <RecommendationsCard
            recommendations={
              result.recommendations || []
            }
          />

          {/* Footer Stats */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="mb-6 text-2xl font-bold text-white">
              Semantic AI Summary
            </h2>

            <div className="grid gap-6 md:grid-cols-3">

              <div className="rounded-2xl bg-slate-900/70 p-6">

                <p className="text-sm text-slate-400">
                  ATS Score
                </p>

                <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                  {result.ats.score}%
                </h3>

              </div>

              <div className="rounded-2xl bg-slate-900/70 p-6">

                <p className="text-sm text-slate-400">
                  Average Similarity
                </p>

                <h3 className="mt-2 text-3xl font-bold text-violet-400">
                  {result.ats.average_similarity
                    ? `${(
                        result.ats.average_similarity *
                        100
                      ).toFixed(1)}%`
                    : "0%"}
                </h3>

              </div>

              <div className="rounded-2xl bg-slate-900/70 p-6">

                <p className="text-sm text-slate-400">
                  Semantic Matches
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-400">
                  {result.ats.semantic_matches
                    ? result.ats.semantic_matches.length
                    : 0}
                </h3>

              </div>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default ResumeAnalysis;