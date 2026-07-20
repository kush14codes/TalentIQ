import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  autoComplete = "current-password",
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-slate-900/70
            px-4
            py-3
            pr-12
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-200
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-500/20
          "
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            transition-colors
            hover:text-white
          "
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;