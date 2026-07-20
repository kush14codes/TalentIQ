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
    ):
        return f"""
You are an expert Technical Recruiter and ATS Specialist.

Analyze the following candidate.

Candidate Information:
{json.dumps(candidate, indent=2)}

ATS Score:
{ats_score}

Matched Skills:
{", ".join(matched_skills)}

Missing Skills:
{", ".join(missing_skills)}

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