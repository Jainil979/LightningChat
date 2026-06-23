import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const testimonials = [
  { text: "Best secure messenger I've ever used. Works flawlessly in browser.", name: "Alex Johnson", role: "Developer" },
  { text: "Finally a chat app that respects privacy. UI is stunning!", name: "Maria Garcia", role: "Designer" },
];

const Testimonials = () => {
  const ref = useScrollAnimation();
  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-white">What <span className="text-primary">Users Say</span></h2>
      </div>
      <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 3000 }} spaceBetween={30} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 } }} className="pb-12">
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="bg-card/50 p-6 rounded-2xl border border-white/10">
              <p className="text-content">{t.text}</p>
              <h4 className="text-white mt-4 font-semibold">{t.name}</h4>
              <span className="text-primary text-sm">{t.role}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;