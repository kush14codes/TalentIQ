class ATSEngine:

    @staticmethod
    def compare(resume_skills, jd_skills):

        resume = {
            skill.lower().strip()
            for skill in resume_skills
        }

        job = {
            skill.lower().strip()
            for skill in jd_skills
        }

        matched = sorted(
            resume.intersection(job)
        )

        missing = sorted(
            job.difference(resume)
        )

        if len(job) == 0:
            score = 0
        else:
            score = round(
                (len(matched) / len(job)) * 100,
                2
            )

        return {
            "score": score,
            "matched_skills": matched,
            "missing_skills": missing
        }