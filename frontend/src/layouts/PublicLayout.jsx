import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";

const PublicLayout = ({ children, hideFooter = false }) => (
  <div className="min-h-screen flex flex-col bg-navy-950">
    <Navbar variant="public" />
    <main className="flex-1">{children}</main>
    {!hideFooter && <Footer />}
  </div>
);

export default PublicLayout;
