import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { FaRocket, FaMobileAlt, FaHeart } from "react-icons/fa";

const About = () => {
  const ref = useScrollAnimation();
  return (
    <section id="about" className="py-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-white">Built for <span className="text-primary">Modern Communication</span></h2>
          <p className="text-content text-lg mt-4">Chatterly represents the next evolution in web-based messaging.</p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-card/50 p-6 rounded-xl text-center"><div className="text-2xl font-bold text-primary">Instant</div><div className="text-content">Setup</div></div>
            <div className="bg-card/50 p-6 rounded-xl text-center"><div className="text-2xl font-bold text-primary">Secure</div><div className="text-content">By Design</div></div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-8 rounded-3xl space-y-6">
          <div className="flex gap-4"><FaRocket className="text-primary text-2xl" /><div><h4 className="text-white font-semibold">Lightning Fast</h4><p className="text-content">Optimized for speed</p></div></div>
          <div className="flex gap-4"><FaMobileAlt className="text-primary text-2xl" /><div><h4 className="text-white font-semibold">Cross-Platform</h4><p className="text-content">Works on any browser</p></div></div>
          <div className="flex gap-4"><FaHeart className="text-primary text-2xl" /><div><h4 className="text-white font-semibold">User-Friendly</h4><p className="text-content">Intuitive interface</p></div></div>
        </div>
      </div>
    </section>
  );
};

export default About;