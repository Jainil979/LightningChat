import { motion } from "framer-motion";

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const base = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2";
  const variants = {
    primary: "bg-primary text-dark hover:shadow-lg hover:scale-105",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
    ghost: "text-primary hover:bg-primary/10",
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;