const Input = ({
  label,
  error,
  icon: Icon,
  className = "",
  ...props
}) => (
  <div className={className}>
    {label && (
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
    )}
    <div className="relative">
      {Icon && (
        <Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
      )}
      <input
        className={`w-full h-11 ${Icon ? "pl-10" : "px-4"} pr-4 rounded-xl bg-slate-800/80 border text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40 transition ${
          error ? "border-red-500/50" : "border-slate-700 hover:border-slate-600"
        }`}
        {...props}
      />
    </div>
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

export default Input;
