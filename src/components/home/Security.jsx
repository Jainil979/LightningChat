// src/components/home/Security.jsx

const Security = () => (
  <section id="security" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="animate-slide-up">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <i className="fas fa-shield-alt text-primary mr-2"></i>
            <span className="text-sm font-medium text-primary">Zero‑Server Architecture</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Your Privacy is
            <span className="gradient-text block">Guaranteed</span>
          </h2>
          <p className="text-xl text-color mb-8">
            We built LightningChat so that no message ever touches a server. Every byte is encrypted on your device and sent directly to your contact. Even we can’t read your chats.
          </p>
          <div className="space-y-6">
            {[
              {
                title: 'Complete Data Ownership',
                desc: 'All chat history, media, and keys live only in your browser’s secure storage. There is no server copy – ever.',
              },
              {
                title: 'Signal‑Grade Encryption',
                desc: 'We use X3DH key agreement and the Double Ratchet algorithm, the same protocols audited and trusted worldwide.',
              },
              {
                title: 'Zero Metadata Leakage',
                desc: 'Who you talk to, when, and for how long – none of this is logged. No tracking, no analytics, no backdoors.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-primary"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white mb-2">{item.title}</h4>
                  <p className="text-color">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative animate-fade-in">
          <div className="security-badge rounded-3xl p-8 text-center overflow-hidden">
            <div className="relative z-10">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <i className="fas fa-user-secret text-primary text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Server – No Problem</h3>
              <p className="text-color mb-6">Messages travel directly between browsers. The only server is a lightweight relay that never sees your data.</p>
              <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                <div className="font-mono text-sm text-primary space-y-2">
                  <div className="flex items-center space-x-2"><i className="fas fa-check-circle"></i><span>WebRTC + WebSocket relay</span></div>
                  <div className="flex items-center space-x-2"><i className="fas fa-check-circle"></i><span>Perfect Forward Secrecy</span></div>
                  <div className="flex items-center space-x-2"><i className="fas fa-check-circle"></i><span>Open‑source cryptographic libraries</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Security;