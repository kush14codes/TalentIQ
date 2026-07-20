from app.services.embedding_engine import EmbeddingEngine


class ATSEngine:
    """
    Semantic ATS Engine
    """

    SIMILARITY_THRESHOLD = 0.70

    @classmethod
    def compare(cls, resume_skills, jd_skills):

        if not jd_skills:
            return {
                "score": 0,
                "matched_skills": [],
                "missing_skills": [],
                "semantic_matches": [],
                "average_similarity": 0
            }

        if not resume_skills:
            return {
                "score": 0,
                "matched_skills": [],
                "missing_skills": jd_skills,
                "semantic_matches": [],
                "average_similarity": 0
            }

        similarity_matrix = EmbeddingEngine.similarity_matrix(
            resume_skills,
            jd_skills
        )

        matched_resume_skills = set()
        matched_jd_skills = set()

        semantic_matches = []

        total_similarity = 0

        for jd_index, jd_skill in enumerate(jd_skills):

            best_score = 0
            best_resume_skill = None

            for resume_index, resume_skill in enumerate(resume_skills):

                similarity = float(
                    similarity_matrix[
                        resume_index
                    ][
                        jd_index
                    ]
                )

                if similarity > best_score:
                    best_score = similarity
                    best_resume_skill = resume_skill

            if (
                best_resume_skill
                and best_score >= cls.SIMILARITY_THRESHOLD
            ):

                matched_resume_skills.add(
                    best_resume_skill
                )

                matched_jd_skills.add(
                    jd_skill
                )

                total_similarity += best_score

                semantic_matches.append(
                    {
                        "resume_skill": best_resume_skill,
                        "job_skill": jd_skill,
                        "similarity": round(
                            best_score,
                            3,
                        ),
                    }
                )

        missing_skills = sorted(
            list(
                set(jd_skills) -
                matched_jd_skills
            )
        )

        if matched_jd_skills:

            average_similarity = round(
                total_similarity /
                len(matched_jd_skills),
                3,
            )

        else:

            average_similarity = 0

        semantic_score = (
            total_similarity /
            len(jd_skills)
        ) * 100

        semantic_score = round(
            semantic_score,
            2,
        )

        return {

            "score": semantic_score,

            "average_similarity":
                average_similarity,

            "matched_skills":
                sorted(
                    list(
                        matched_resume_skills
                    )
                ),

            "missing_skills":
                missing_skills,

            "semantic_matches":
                sorted(
                    semantic_matches,
                    key=lambda x:
                    x["similarity"],
                    reverse=True,
                ),
        }