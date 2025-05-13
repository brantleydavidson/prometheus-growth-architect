
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import WhoWeHelpMenu from "./WhoWeHelpMenu";
import ServicesMenu from "./ServicesMenu";
import InsightsMenu from "./InsightsMenu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/7dbfc2c4-9dea-4bcd-a3b3-c1177facb45a.png" 
            alt="Prometheus Agency" 
            className="h-10 w-auto" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <WhoWeHelpMenu />
          <ServicesMenu />
          <InsightsMenu />
          <Link to="/about" className="font-medium text-base hover:text-prometheus-orange transition-colors">
            About
          </Link>
          <Link to="/book-audit">
            <Button className="bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
              Book Growth Audit
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-prometheus-navy"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white w-full py-4 shadow-md">
          <div className="container-custom flex flex-col space-y-4">
            <Link 
              to="/who-we-help" 
              className="font-medium text-lg text-prometheus-navy py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Who We Help
            </Link>
            <Link 
              to="/services" 
              className="font-medium text-lg text-prometheus-navy py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/insights" 
              className="font-medium text-lg text-prometheus-navy py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Insights & Playbooks
            </Link>
            <Link 
              to="/ai-quotient" 
              className="font-medium text-lg text-prometheus-navy py-2 border-b border-gray-100 pl-4"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Quotient Assessment
            </Link>
            <Link 
              to="/about" 
              className="font-medium text-lg text-prometheus-navy py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/book-audit" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="w-full bg-prometheus-orange hover:bg-prometheus-orange/90 text-white">
                Book Growth Audit
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
