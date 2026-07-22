import logging
import os
import time

from huggingface_hub import login
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


logger = logging.getLogger("embedding_engine")


class EmbeddingEngine:
    """
    Handles semantic embedding generation and
    similarity calculation using Sentence Transformers.
    """

    _model = None

    @classmethod
    def get_model(cls):
        """
        Lazy loads the embedding model (falls back path — normally
        `preload()` should already have loaded this at app startup).
        """

        if cls._model is None:
            cls._load_model()

        return cls._model

    @classmethod
    def _load_model(cls):
        t0 = time.monotonic()

        token = os.getenv("HF_TOKEN")

        if token:
            login(
                token=token,
                add_to_git_credential=False
            )

        cls._model = SentenceTransformer(
            "sentence-transformers/all-MiniLM-L6-v2"
        )

        logger.info(
            f"SentenceTransformer loaded in {time.monotonic() - t0:.2f}s"
        )

    @classmethod
    def preload(cls):
        """
        Call this once at app startup so the model download/init cost
        is paid during boot, not during a user's first request.
        """

        if cls._model is None:
            cls._load_model()

    @classmethod
    def generate_embeddings(cls, texts):
        """
        Generates embeddings for a list of texts.

        Parameters
        ----------
        texts : list[str]

        Returns
        -------
        numpy.ndarray
        """

        model = cls.get_model()

        return model.encode(
            texts,
            convert_to_numpy=True,
            normalize_embeddings=True,
        )

    @classmethod
    def similarity(cls, text1, text2):
        """
        Returns cosine similarity between
        two strings.
        """

        embeddings = cls.generate_embeddings(
            [text1, text2]
        )

        score = cosine_similarity(
            [embeddings[0]],
            [embeddings[1]]
        )[0][0]

        return float(score)

    @classmethod
    def similarity_matrix(
        cls,
        resume_skills,
        jd_skills,
    ):
        """
        Computes similarity matrix between
        resume skills and JD skills.

        Returns:
            matrix
        """

        resume_embeddings = cls.generate_embeddings(
            resume_skills
        )

        jd_embeddings = cls.generate_embeddings(
            jd_skills
        )

        matrix = cosine_similarity(
            resume_embeddings,
            jd_embeddings,
        )

        return matrix