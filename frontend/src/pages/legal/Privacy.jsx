import { Link } from "react-router-dom";

const Privacy = () => (
  <div className="min-h-screen pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
      <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 md:p-8 space-y-5 text-slate-300 text-sm leading-relaxed">
        <p><strong className="text-white">Last updated:</strong> June 2026</p>

        <section>
          <h2 className="text-white font-semibold mb-2">1. Information We Collect</h2>
          <p>RapidRelief collects information you provide when registering, reporting incidents, or applying as a rescue volunteer. This includes your name, email, phone number, location data during emergencies, and uploaded verification documents.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold mb-2">2. How We Use Your Data</h2>
          <p>Your data is used to coordinate disaster response, assign rescue teams, provide real-time tracking, and improve resource allocation through our ML prediction system. Location data is only collected when you report an incident, send an SOS, or actively share GPS as rescue personnel.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold mb-2">3. Data Storage & Security</h2>
          <p>Operational data is stored in a secured MongoDB database. Verification documents are stored in Cloudinary cloud storage. We use JWT authentication and encrypted sessions to protect your account.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold mb-2">4. Data Sharing</h2>
          <p>Incident location and severity are shared with authorized rescue personnel and administrators during active emergencies. We do not sell personal data to third parties.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold mb-2">5. Your Rights</h2>
          <p>You may request account deletion or data correction by contacting support@rapidrelief.com. Emergency incident records may be retained for audit and compliance purposes.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold mb-2">6. Contact</h2>
          <p>Questions about this policy? Email <span className="text-teal-400">support@rapidrelief.com</span></p>
        </section>
      </div>
      <p className="text-center mt-6">
        <Link to="/" className="text-teal-400 hover:text-teal-300 text-sm">Back to Home</Link>
      </p>
    </div>
  </div>
);

export default Privacy;
