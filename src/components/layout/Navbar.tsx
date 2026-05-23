"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Circulars", href: "/circulars" },
    { name: "Districts", href: "/districts" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">K</div>
          <div className="flex flex-col">
            <span className={`font-bold leading-tight ${scrolled ? "text-primary" : "text-white"}`}>KSEBWA</span>
            <span className={`text-[10px] ${scrolled ? "text-gray-600" : "text-white/80"}`}>Workers Association</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`font-medium hover:text-primary transition-colors ${scrolled ? "text-gray-700" : "text-white"}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/login" className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-semibold transition-all flex items-center gap-2">
            <LogIn size={18} />
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} className={scrolled ? "text-primary" : "text-white"} /> : <Menu size={28} className={scrolled ? "text-primary" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 flex flex-col items-center gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-800 font-semibold text-lg hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="bg-primary text-white px-8 py-3 rounded-full font-bold mt-2"
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
