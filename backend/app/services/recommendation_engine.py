class RecommendationEngine:
    @staticmethod
    def generate(
        ats_score: float,
        matched_skills: list,
        missing_skills: list,
        candidate: dict,
    ):
        recommendations = []

        # ATS Score Based

        if ats_score >= 90:
            recommendations.append(
                "Excellent resume match. Continue tailoring your resume for each job application."
            )

        elif ats_score >= 75:
            recommendations.append(
                "Your resume matches the job well, but adding a few missing skills could significantly improve your ATS score."
            )

        elif ats_score >= 60:
            recommendations.append(
                "Your resume is a moderate match. Consider improving your technical skills and aligning your resume more closely with the job description."
            )

        else:
            recommendations.append(
                "Your resume requires significant improvement to increase its chances of passing ATS screening."
            )

        # Missing Skills

        if missing_skills:
            recommendations.append(
                "Consider adding these missing skills if you have experience with them:"
            )

            for skill in missing_skills[:5]:
                recommendations.append(f"• {skill}")

        # Resume Content

        if len(matched_skills) < 5:
            recommendations.append(
                "Highlight more relevant technical skills throughout your resume."
            )

        if candidate.get("email") is None:
            recommendations.append(
                "Add a professional email address."
            )

        if candidate.get("phone") is None:
            recommendations.append(
                "Include a contact phone number."
            )

        if candidate.get("name") is None:
            recommendations.append(
                "Ensure your full name appears clearly at the top of your resume."
            )

        # General Improvements

        recommendations.append(
            "Use action verbs such as Developed, Designed, Implemented, Built, and Optimized."
        )

        recommendations.append(
            "Quantify your achievements with numbers wherever possible."
        )

        recommendations.append(
            "Keep your resume concise and focused on relevant experience."
        )

        recommendations.append(
            "Customize your resume for every job application."
        )

        return recommendations