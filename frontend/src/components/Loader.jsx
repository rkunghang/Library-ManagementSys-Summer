const Loader = ({ label = "Loading" }) => (
    <div className="flex items-center gap-3 py-6">
        <span className="w-2 h-2 bg-ink animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">{label}...</span>
    </div>
);

export default Loader;