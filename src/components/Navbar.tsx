const Navbar = () => {
  return (
    <nav className="bg-white/90 sticky top-0 z-50 border-b border-slate-200 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[#2b9a5e] flex items-center justify-center shadow-sm">
            <span className="text-white font-bold">B</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Bykea Pro</p>
            <p className="text-xs text-slate-500">Local search made simple</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
