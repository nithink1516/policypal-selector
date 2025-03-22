
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen w-full bg-gradient-to-b from-background to-white ${className}`}
    >
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="py-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <h1 className="text-2xl font-semibold tracking-tight">
              <span className="text-primary">Policy</span>Pal
            </h1>
          </motion.div>
        </header>
        <main className="py-8">{children}</main>
        <footer className="py-6 mt-auto">
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PolicyPal. Helping you find the right insurance.
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default Layout;
