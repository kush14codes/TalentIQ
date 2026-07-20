import { Loader2 } from "lucide-react";

function Button({
  children,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
  className = "",
}) {
  const baseClasses =
    "w-full rounded-xl py-3 px-4 font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-cyan-500 text-slate-900 hover:bg-cyan-400",
    secondary:
      "bg-slate-800 text-white border border-white/10 hover:bg-slate-700",
    danger:
      "bg-red-600 text-white hover:bg-red-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          Please wait...
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;