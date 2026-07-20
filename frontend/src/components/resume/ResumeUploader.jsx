import { UploadCloud, FileText, Trash2 } from "lucide-react";

function ResumeUploader({ file, setFile }) {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

      <div className="mb-6 flex items-center gap-3">

        <UploadCloud className="text-cyan-400" size={30} />

        <h2 className="text-2xl font-bold text-white">
          Upload Resume
        </h2>

      </div>

      {!file ? (
        <label
          htmlFor="resume-upload"
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-600 p-12 transition hover:border-cyan-400 hover:bg-slate-800/40"
        >
          <UploadCloud
            size={60}
            className="mb-5 text-cyan-400"
          />

          <p className="text-lg font-semibold text-white">
            Drag & Drop your resume here
          </p>

          <p className="mt-2 text-slate-400">
            or click to browse
          </p>

          <p className="mt-5 text-sm text-slate-500">
            PDF or DOCX • Max 5 MB
          </p>

          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">

          <div className="flex items-center gap-4">

            <FileText
              size={36}
              className="text-cyan-400"
            />

            <div>

              <h3 className="font-semibold text-white">
                {file.name}
              </h3>

              <p className="text-sm text-slate-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

            </div>

          </div>

          <button
            onClick={removeFile}
            className="rounded-xl bg-red-500/20 p-3 text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={20} />
          </button>

        </div>
      )}
    </div>
  );
}

export default ResumeUploader;