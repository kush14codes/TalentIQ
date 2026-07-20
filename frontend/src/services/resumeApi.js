import api from "./api";

export async function analyzeResume(file, jobDescription) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("job_description", jobDescription);

  const response = await api.post(
    "/resume/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}