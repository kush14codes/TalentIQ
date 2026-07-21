import re


class GeneralATSEngine:
    """
    General ATS Engine

    Evaluates the overall quality of a resume
    without requiring a Job Description.
    """

    ACTION_VERBS = [
        "developed",
        "built",
        "created",
        "designed",
        "implemented",
        "optimized",
        "improved",
        "led",
        "managed",
        "analyzed",
        "automated",
        "deployed",
        "trained",
        "collaborated",
        "engineered",
    ]

    @classmethod
    def evaluate(cls, resume_analysis, resume_text):

        score = 0

        strengths = []

        weaknesses = []

        missing_sections = []

        # -----------------------------
        # Contact Information (15)
        # -----------------------------

        if resume_analysis.get("name"):
            score += 5
        else:
            missing_sections.append("Name")

        if resume_analysis.get("email"):
            score += 5
        else:
            missing_sections.append("Email")

        if resume_analysis.get("phone"):
            score += 5
        else:
            missing_sections.append("Phone")

        # -----------------------------
        # Skills (20)
        # -----------------------------

        skills = resume_analysis.get("skills", [])

        if len(skills) >= 10:
            score += 20
            strengths.append("Strong technical skill set.")

        elif len(skills) >= 6:
            score += 15
            strengths.append("Good technical skill coverage.")

        elif len(skills) >= 3:
            score += 8
            weaknesses.append(
                "Add more technical skills."
            )

        else:
            weaknesses.append(
                "Very limited technical skills section."
            )

        # -----------------------------
        # Education (15)
        # -----------------------------

        education = resume_analysis.get(
            "education",
            ""
        )

        if education:
            score += 15
        else:
            missing_sections.append("Education")

        # -----------------------------
        # Projects (20)
        # -----------------------------

        projects = resume_analysis.get(
            "projects",
            []
        )

        if len(projects) >= 3:
            score += 20
            strengths.append(
                "Multiple technical projects included."
            )

        elif len(projects) >= 1:
            score += 12
            weaknesses.append(
                "Consider adding more projects."
            )

        else:
            missing_sections.append("Projects")

        # -----------------------------
        # Experience (10)
        # -----------------------------

        experience = resume_analysis.get(
            "experience",
            ""
        )

        if experience:
            score += 10
        else:
            weaknesses.append(
                "No work or internship experience detected."
            )

        # -----------------------------
        # Resume Length (5)
        # -----------------------------

        words = len(resume_text.split())

        if 300 <= words <= 800:
            score += 5
        else:
            weaknesses.append(
                "Resume length could be improved."
            )

        # -----------------------------
        # Action Verbs (10)
        # -----------------------------

        action_count = 0

        text = resume_text.lower()

        for verb in cls.ACTION_VERBS:

            if verb in text:
                action_count += 1

        if action_count >= 8:
            score += 10

        elif action_count >= 4:
            score += 6

        else:
            weaknesses.append(
                "Use more action verbs."
            )

        # -----------------------------
        # Final Score
        # -----------------------------

        score = min(score, 100)

        return {
            "mode": "general",
            "score": score,
            "strengths": strengths,
            "weaknesses": weaknesses,
            "missing_sections": missing_sections,
        }