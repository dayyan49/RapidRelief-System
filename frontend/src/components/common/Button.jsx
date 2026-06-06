const variants = {
  primary: "bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20",
  secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-white/10",
  danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20",
  outline: "border border-teal-500/50 text-teal-400 hover:bg-teal-500/10",
  ghost: "text-slate-300 hover:bg-white/5 hover:text-white",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading && (
      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    )}
    {children}
  </button>
);

export default Button;
