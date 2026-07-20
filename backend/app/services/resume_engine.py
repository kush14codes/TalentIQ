from pathlib import Path
import re

import spacy

from app.services.extractor import ResumeExtractor


class ResumeEngine:
    """
    Generic text analysis engine.

    Can process:
    - Resume text
    - Job Description text
    """

    _nlp = None
    _skills = None

    @classmethod
    def get_nlp(cls):
        if cls._nlp is None:
            cls._nlp = spacy.load("en_core_web_sm")
        return cls._nlp

    @classmethod
    def load_skills(cls):
        if cls._skills is None:
            skills_file = (
                Path(__file__).resolve().parent.parent
                / "resources"
                / "skills.txt"
            )

            with open(skills_file, "r", encoding="utf-8") as f:
                cls._skills = [
                    line.strip()
                    for line in f
                    if line.strip()
                ]

        return cls._skills

    @classmethod
    def process(cls, text: str, is_resume: bool = True):
        """
        Process any text.

        Resume:
            - name
            - email
            - phone
            - skills

        Job Description:
            - skills only
        """

        result = {
            "skills": cls.extract_skills(text)
        }

        if is_resume:
            result.update({
                "name": cls.extract_name(text),
                "email": ResumeExtractor.extract_email(text),
                "phone": ResumeExtractor.extract_phone(text)
            })

        return result

    @classmethod
    def extract_name(cls, text: str):

        first_lines = "\n".join(
            text.splitlines()[:5]
        )

        doc = cls.get_nlp()(first_lines)

        for ent in doc.ents:
            if ent.label_ == "PERSON":
                return ent.text.strip()

        for line in first_lines.splitlines():

            line = line.strip()

            if (
                2 <= len(line.split()) <= 4
                and re.fullmatch(r"[A-Z ]+", line)
            ):
                return line.title()

        return None

    @classmethod
    def extract_skills(cls, text: str):

        text_lower = text.lower()

        found = []

        for skill in cls.load_skills():
            if skill.lower() in text_lower:
                found.append(skill)

        return sorted(set(found))