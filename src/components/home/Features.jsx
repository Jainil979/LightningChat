// src/components/home/Features.jsx

const features = [
  {
    icon: 'fa-bolt',
    colorClass: 'text-dark-bg',
    title: 'Lightning‑Fast Messaging',
    desc: 'Messages arrive instantly via direct peer‑to‑peer connections (WebRTC) with an ultra‑light WebSocket fallback. Optimised to the millisecond.',
  },
  {
    icon: 'fa-shield-alt',
    colorClass: 'text-dark-bg',
    title: 'Zero‑Server Privacy',
    desc: 'Your chats, media, and call metadata are never stored on any server. All data resides exclusively in your browser’s secure storage.',
  },
  {
    icon: 'fa-lock',
    colorClass: 'text-dark-bg',
    title: 'End‑to‑End Encryption',
    desc: 'Every message is secured with Signal‑grade protocols (X3DH + Double Ratchet). Encryption and decryption happen entirely on your device.',
  },
  {
    // icon: 'fa-phone-alt',
    icon: 'fas fa-phone',
    colorClass: 'text-dark-bg',
    title: 'Crystal‑Clear Audio & Video Calls',
    desc: 'Make one‑to‑one voice and video calls directly from the browser using WebRTC. No plugins, no accounts – just peer‑to‑peer.',
  },
  {
    icon: 'fa-smile',
    colorClass: 'text-dark-bg',
    title: 'Emoji & Rich Text',
    desc: 'Express yourself with the full range of Unicode emojis. Messages support rich text for lively conversations.',
  },
  {
    icon: 'fa-circle',
    colorClass: 'text-dark-bg',   // Live presence indicator – now properly green
    title: 'Live Presence & Last Seen',
    desc: 'See instantly who’s online with the green presence dot. For offline contacts, see the exact last seen time – updated in real time.',
  },
  {
    icon: 'fa-pencil-alt',
    colorClass: 'text-dark-bg',
    title: 'Typing Indicators',
    desc: 'Know when the other person is composing a message, making conversations feel alive and immediate.',
  },
  {
    icon: 'fa-check-double',
    colorClass: 'text-dark-bg',
    title: 'Delivery & Read Receipts',
    desc: 'Track every message: sending → sent → delivered → read (with blue double ticks).',
  },
  {
    icon: 'fa-file-upload',
    colorClass: 'text-dark-bg',
    title: 'File & Media Sharing',
    desc: 'Securely send images, documents, and files directly over the encrypted peer‑to‑peer channel. Compressed on‑device.',
  },
  {
    icon: 'fa-database',
    colorClass: 'text-dark-bg',
    title: 'Massive Local Storage, Minimal Memory',
    desc: 'Store millions of messages in just a few hundred MB thanks to IndexedDB + MessagePack + gzip compression.',
  },
  // Two new features
  {
    icon: 'fa-globe',
    colorClass: 'text-dark-bg',
    title: 'Works Anywhere',
    desc: 'No installation required – just a modern browser. Chat instantly on desktop, tablet, or phone.',
  },
  {
    icon: 'fa-code',
    colorClass: 'text-dark-bg',
    title: 'Open & Auditable',
    desc: 'Built on open‑source cryptographic libraries and standard Web APIs. Anyone can verify the code.',
  },
];

const Features = () => (
  <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-darker-bg">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
          <i className="fas fa-bolt text-primary mr-2"></i>
          <span className="text-sm font-medium text-primary">Why LightningChat?</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-6">
          Everything You Need for
          <span className="gradient-text block">Private Communication</span>
        </h2>
        <p className="text-xl text-color max-w-3xl mx-auto">
          Designed for individuals who demand speed, security, and total control over their data.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="feature-card p-8 rounded-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-6 feature-icon transition-transform duration-300">
              <i className={`fas ${f.icon} ${f.colorClass} text-xl`}></i>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">{f.title}</h3>
            <p className="text-color">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;