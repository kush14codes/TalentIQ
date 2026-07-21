"""
Centralized prompt templates for TalentIQ.
"""

import json


class PromptTemplates:

    @staticmethod
    def complete_analysis(
        candidate,
        ats_score,
        matched_skills,
        missing_skills,
        mode="semantic",
    ):

        if mode == "semantic":

            context = f"""
Matched Skills:
{", ".join(matched_skills)}

Missing Skills:
{", ".join(missing_skills)}

You are comparing this candidate against a specific Job Description.

Evaluate:
- Job fit
- Missing skills
- Strengths
- Weaknesses
- Hiring recommendation
"""

        else:

            context = f"""
Technical Skills:
{", ".join(matched_skills)}

There is NO Job Description.

Evaluate the overall quality of the resume.

Do NOT invent missing job-specific skills.

Instead evaluate:

- Resume quality
- ATS friendliness
- Technical profile
- Skills section
- Project quality
- Resume writing
- Resume completeness

Base your review ONLY on the candidate information provided.
"""

        return f"""
You are an expert Technical Recruiter and ATS Specialist.

Analyze the following candidate.

Candidate Information:
{json.dumps(candidate, indent=2)}

ATS Score:
{ats_score}

{context}

Return ONLY valid JSON.

Do NOT wrap the JSON inside markdown.

Return exactly this structure:

{{
  "summary":"",

  "review":{{
      "strengths":[
          "",
          "",
          ""
      ],
      "weaknesses":[
          "",
          "",
          ""
      ],
      "recommendation":"Strong Hire"
  }},

  "suggestions":[
      "",
      "",
      "",
      "",
      ""
  ],

  "interview_questions":[
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
  ]
}}

Rules:

- Summary should be 100-150 words.
- Strengths should be concise.
- Weaknesses should be actionable.
- Recommendation must be exactly one of:
  - Strong Hire
  - Hire
  - Consider
  - Reject
- Suggestions should improve the resume.
- Interview questions should be based on the candidate's skills.
- Return JSON ONLY.
"""