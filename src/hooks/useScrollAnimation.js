import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    console.log('ref : ' , ref);
    console.log('inView : ' , isInView);
    
    if (isInView && ref.current) {
      ref.current.classList.add("animate-slide-up");
    }
  }, [isInView]);

  return ref;
};