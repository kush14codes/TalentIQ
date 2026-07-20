function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  autoComplete = "off",
  required = false,
}) {
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

      <input
        id={name}
        type={type}
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
    </div>
  );
}

export default Input;