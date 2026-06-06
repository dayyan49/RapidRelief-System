import Sidebar from "../components/common/Sidebar.jsx";
import Navbar from "../components/common/Navbar.jsx";

const DashboardLayout = ({ children, title, subtitle }) => (
  <div className="min-h-screen bg-navy-950">
    <Navbar variant="dashboard" />
    <div className="flex pt-16">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto min-h-[calc(100vh-4rem)]">
        {(title || subtitle) && (
          <div className="mb-6 md:mb-8 animate-fade-in">
            {title && <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>}
            {subtitle && <p className="text-slate-400 mt-1 text-sm md:text-base">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  </div>
);

export default DashboardLayout;
