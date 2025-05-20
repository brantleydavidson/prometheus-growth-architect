import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import WhoWeHelpMenu from "./WhoWeHelpMenu";
import ServicesMenu from "./ServicesMenu";
import PlaybooksMenu from "./PlaybooksMenu";
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
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-prometheus-navy"
      >
        Skip to main content
      </a>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md py-2"
            : "bg-white/90 backdrop-blur-sm py-4"
        }`}
        role="banner"
      >
        <div className="container-custom flex justify-between items-center">
          <Link to="/" className="flex items-center" aria-label="Prometheus Agency - Home">
            <img 
              src="/lovable-uploads/7dbfc2c4-9dea-4bcd-a3b3-c1177facb45a.png" 
              alt="Prometheus Agency Logo" 
              width="120" height="40"
              className="h-10 w-auto" 
              loading="lazy" decoding="async"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Main navigation">
            <WhoWeHelpMenu />
            <ServicesMenu />
            <PlaybooksMenu />
            <Link 
              to="/insights" 
              className="font-medium text-base hover:text-prometheus-orange transition-colors"
              aria-label="Insights"
            >
              Insights
            </Link>
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
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="lg:hidden bg-white w-full py-4 shadow-md" role="navigation" aria-label="Mobile navigation">
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
                to="/playbooks" 
                className="font-medium text-lg text-prometheus-navy py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Tools & Playbooks
              </Link>
              <Link 
                to="/ai-quotient" 
                className="font-medium text-lg text-prometheus-navy py-2 border-b border-gray-100 pl-4"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Quotient Assessment
              </Link>
              <Link 
                to="/insights" 
                className="font-medium text-lg text-prometheus-navy py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Insights
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
    </>
  );
};

export default Navbar;
