
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-prometheus-navy text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo & About */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src="/logo-placeholder.svg"
                alt="Prometheus Agency"
                className="h-10 w-auto invert"
              />
            </Link>
            <p className="text-prometheus-gray mb-4">
              We unleash growth by taming technology for B2B and DTC businesses.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white hover:text-prometheus-orange transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white hover:text-prometheus-orange transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white hover:text-prometheus-orange transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:info@prometheusagency.co" 
                className="text-white hover:text-prometheus-orange transition-colors"
                aria-label="Email Us"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Who We Help</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/b2b" className="text-prometheus-gray hover:text-white transition-colors">
                  B2B Businesses
                </Link>
              </li>
              <li>
                <Link to="/manufacturing" className="text-prometheus-gray hover:text-white transition-colors">
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link to="/professional-services" className="text-prometheus-gray hover:text-white transition-colors">
                  Professional Services
                </Link>
              </li>
              <li>
                <Link to="/dtc" className="text-prometheus-gray hover:text-white transition-colors">
                  Direct-to-Consumer
                </Link>
              </li>
              <li>
                <Link to="/restoration" className="text-prometheus-gray hover:text-white transition-colors">
                  Restoration
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/ai-enablement" className="text-prometheus-gray hover:text-white transition-colors">
                  AI Enablement
                </Link>
              </li>
              <li>
                <Link to="/services/consulting-gtm" className="text-prometheus-gray hover:text-white transition-colors">
                  GTM Strategy
                </Link>
              </li>
              <li>
                <Link to="/services/crm-implementation" className="text-prometheus-gray hover:text-white transition-colors">
                  CRM Implementation
                </Link>
              </li>
              <li>
                <Link to="/services/customer-journey" className="text-prometheus-gray hover:text-white transition-colors">
                  Customer Journey
                </Link>
              </li>
              <li>
                <Link to="/services/reporting-analytics" className="text-prometheus-gray hover:text-white transition-colors">
                  Analytics & Reporting
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Insights</h3>
            <p className="text-prometheus-gray mb-4">
              Subscribe to our newsletter for growth insights and AI strategies.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-prometheus-orange hover:bg-prometheus-orange/90">
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-prometheus-gray text-sm mb-4 md:mb-0">
            © {currentYear} Prometheus Agency. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-prometheus-gray hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-prometheus-gray hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-prometheus-gray hover:text-white transition-colors text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
