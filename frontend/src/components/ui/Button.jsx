import { motion } from "framer-motion";

function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 text-white shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40",

    secondary:
      "border border-white/10 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10",

    ghost:
      "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
  };

  return (
    <motion.button
      type={type}
      whileHover={{
        scale: 1.04,
        y: -2,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        px-7
        py-3.5
        font-semibold
        transition-all
        duration-300
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;