import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
// import ScrollToTop from '../common/ScrollToTop';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* <ScrollToTop /> */}
    </>
  );
};

export default RootLayout;