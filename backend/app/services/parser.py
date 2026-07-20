import fitz
from docx import Document

from app.services.cleaner import TextCleaner


class ResumeParser:

    @staticmethod
    def extract_text(file_path: str) -> str:
        """
        Detect file type and return cleaned text.
        """

        if file_path.lower().endswith(".pdf"):
            text = ResumeParser.extract_pdf(file_path)

        elif file_path.lower().endswith(".docx"):
            text = ResumeParser.extract_docx(file_path)

        else:
            raise ValueError("Unsupported file format.")

        return TextCleaner.clean(text)

    @staticmethod
    def extract_pdf(file_path: str) -> str:
        """
        Extract text from a PDF using PyMuPDF.
        """

        document = fitz.open(file_path)

        pages = []

        for page in document:
            pages.append(page.get_text())

        document.close()

        return "\n".join(pages)

    @staticmethod
    def extract_docx(file_path: str) -> str:
        """
        Extract text from a DOCX file.
        """

        document = Document(file_path)

        paragraphs = []

        for paragraph in document.paragraphs:
            if paragraph.text.strip():
                paragraphs.append(paragraph.text)

        return "\n".join(paragraphs)