import re


class TextCleaner:
    """
    Utility class responsible for cleaning extracted resume text
    before it enters the NLP pipeline.
    """

    @staticmethod
    def clean(text: str) -> str:
        if not text:
            return ""

        # Normalize line endings
        text = text.replace("\r\n", "\n").replace("\r", "\n")

        # Replace tabs with spaces
        text = text.replace("\t", " ")

        # Remove non-breaking spaces
        text = text.replace("\xa0", " ")

        # Collapse multiple spaces
        text = re.sub(r"[ ]{2,}", " ", text)

        # Collapse excessive blank lines
        text = re.sub(r"\n{3,}", "\n\n", text)

        # Remove trailing spaces on each line
        text = "\n".join(line.strip() for line in text.splitlines())

        return text.strip()