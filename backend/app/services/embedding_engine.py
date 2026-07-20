from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


class EmbeddingEngine:
    """
    Handles semantic embedding generation and
    similarity calculation using Sentence Transformers.
    """

    _model = None

    @classmethod
    def get_model(cls):
        """
        Lazy loads the embedding model.
        """

        if cls._model is None:
            cls._model = SentenceTransformer(
                "sentence-transformers/all-MiniLM-L6-v2"
            )

        return cls._model

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