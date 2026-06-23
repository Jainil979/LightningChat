import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Security from '../components/home/Security';
import CTA from '../components/home/CTA';
import ScrollToTop from '../components/common/ScrollToTop';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Security />
      <CTA />   
      <ScrollToTop/>
    </>
  );
};

export default Home;