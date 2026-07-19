function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        className="
        w-full
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        px-4
        py-3
        text-white
        outline-none
        transition

        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/20
        "
        {...props}
      />
    </div>
  );
}

export default Input;