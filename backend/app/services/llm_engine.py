import json
import os

from dotenv import load_dotenv
from groq import Groq

from app.schemas import AIAnalysisResponse
from app.services.prompts import PromptTemplates

# Load environment variables
load_dotenv()


class LLMEngine:
    """
    TalentIQ LLM Engine

    Handles all communication with Groq.
    """

    _client = None

    @classmethod
    def get_client(cls):
        """
        Returns a singleton Groq client.
        """

        if cls._client is None:

            api_key = os.getenv("GROQ_API_KEY")

            if not api_key:
                raise ValueError(
                    "GROQ_API_KEY not found in environment variables."
                )

            cls._client = Groq(api_key=api_key)

        return cls._client

    @classmethod
    def _generate(cls, prompt: str) -> str:
        """
        Sends a prompt to Groq and returns the raw response.
        """

        client = cls.get_client()

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0.2,
            response_format={"type": "json_object"},
            max_tokens=1500,
        )

        return response.choices[0].message.content

    @classmethod
    def generate_complete_analysis(
        cls,
        candidate,
        ats_score,
        matched_skills,
        missing_skills,
    ) -> AIAnalysisResponse:
        """
        Generates complete AI analysis.
        """

        prompt = PromptTemplates.complete_analysis(
            candidate,
            ats_score,
            matched_skills,
            missing_skills,
        )

        response = cls._generate(prompt)

        try:
            parsed = json.loads(response)

            return AIAnalysisResponse(**parsed)

        except Exception:

            return AIAnalysisResponse(
                summary=response,
                review={
                    "strengths": [],
                    "weaknesses": [],
                    "recommendation": "Consider",
                },
                suggestions=[],
                interview_questions=[],
            )