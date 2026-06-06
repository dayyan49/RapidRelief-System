import { Link } from "react-router-dom";

const Terms = () => (
  <div className="min-h-screen pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
      <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 md:p-8 space-y-5 text-slate-300 text-sm leading-relaxed">
        <p><strong className="text-white">Last updated:</strong> June 2026</p>

        <section>
          <h2 className="text-white font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>By using RapidRelief, you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold mb-2">2. Platform Purpose</h2>
          <p>RapidRelief is an emergency coordination platform. It supplements — but does not replace — official emergency services. Always call local emergency numbers (100, 108, 112) for life-threatening situations.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold mb-2">3. User Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide accurate information when reporting incidents</li>
            <li>Do not submit false or malicious emergency reports</li>
            <li>Rescue volunteers must maintain valid credentials and follow assigned protocols</li>
            <li>Administrators are responsible for verifying volunteer applications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold mb-2">4. Account Security</h2>
          <p>You are responsible for maintaining the confidentiality of your login credentials. Notify us immediately of any unauthorized account access.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold mb-2">5. Limitation of Liability</h2>
          <p>RapidRelief is provided as-is. We are not liable for delays in rescue response, ML prediction inaccuracies, or service interruptions caused by network outages or natural disasters.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold mb-2">6. Modifications</h2>
          <p>We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.</p>
        </section>
      </div>
      <p className="text-center mt-6">
        <Link to="/" className="text-teal-400 hover:text-teal-300 text-sm">Back to Home</Link>
      </p>
    </div>
  </div>
);

export default Terms;
