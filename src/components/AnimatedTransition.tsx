
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedTransition = ({ 
  children, 
  className = "", 
  delay = 0 
}: AnimatedTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.4, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTransition;
