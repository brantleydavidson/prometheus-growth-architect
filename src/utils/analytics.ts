import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// GTM Configuration
// Option 1: Use same container for both environments (recommended)
const GTM_ID = 'GTM-MSP3RD38'; // Your production container

// GTM Environment Configuration
// Replace these with your actual GTM environment tokens if using GTM environments
const GTM_ENVIRONMENTS = {
  staging: {
    auth: '', // Add your staging auth token here if using GTM environments
    preview: '', // Add your staging preview ID here if using GTM environments
  },
  production: {
    auth: null, // Production doesn't need auth
    preview: null, // Production doesn't need preview
  }
};

// Determine current environment
const getCurrentEnvironment = () => {
  return window.location.hostname.includes('.io') ? 'staging' : 'production';
};

// Initialize Google Tag Manager - Optimized for performance
export const initGTM = () => {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Get environment settings
    const env = getCurrentEnvironment();
    const envConfig = GTM_ENVIRONMENTS[env];
    
    // Build GTM URL with optional environment parameters
    let gtmUrl = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    if (envConfig.auth && envConfig.preview) {
      gtmUrl += `&gtm_auth=${envConfig.auth}&gtm_preview=${envConfig.preview}&gtm_cookies_win=x`;
    }
    
    // Add GTM script asynchronously with defer
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = gtmUrl;
    
    // Add performance optimization attributes
    script.setAttribute('fetchpriority', 'low');
    
    // Insert script after window load to not block rendering
    if (document.readyState === 'complete') {
      document.head.appendChild(script);
    } else {
      window.addEventListener('load', () => {
        document.head.appendChild(script);
      });
    }
  }
};

// Custom hook for page tracking
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Wait for GTM to be available
    if (window.dataLayer) {
      const pagePath = location.pathname + location.search;
      
      // Push enhanced pageview event
      window.dataLayer.push({
        event: 'page_view',
        page_location: window.location.href,
        page_path: pagePath,
        page_title: document.title,
        page_referrer: document.referrer,
        // Custom parameters for better tracking
        site_environment: window.location.hostname.includes('.io') ? 'staging' : 'production',
        timestamp: new Date().toISOString()
      });
    }
  }, [location]);
};

// Event tracking helper - with performance optimization
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  // Use requestIdleCallback for non-critical tracking
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          ...parameters,
          site_environment: getCurrentEnvironment(),
          timestamp: new Date().toISOString()
        });
      }
    });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          ...parameters,
          site_environment: getCurrentEnvironment(),
          timestamp: new Date().toISOString()
        });
      }
    }, 0);
  }
};

// Ecommerce tracking helper
export const trackPurchase = (transactionData: {
  transactionId: string;
  value: number;
  currency: string;
  items: Array<{
    name: string;
    category: string;
    price: number;
    quantity: number;
  }>;
}) => {
  trackEvent('purchase', transactionData);
};

// Initialize GTM when this module loads
// We'll do this after critical resources
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    // If page already loaded, wait a bit before initializing
    setTimeout(initGTM, 100);
  } else {
    // Otherwise wait for window load
    window.addEventListener('load', () => {
      setTimeout(initGTM, 100);
    });
  }
}

// Enhanced form submission tracking with performance optimization
export const trackFormSubmission = (formName: string, formData: Record<string, any> = {}, success: boolean = true) => {
  // Use requestIdleCallback for non-critical tracking
  const trackingFunction = () => {
    if (window.dataLayer) {
      // Clean form data to avoid sending PII
      const cleanedData = Object.keys(formData).reduce((acc, key) => {
        if (!['email', 'phone', 'name', 'firstName', 'lastName'].includes(key)) {
          acc[key] = formData[key];
        }
        return acc;
      }, {} as Record<string, any>);
      
      window.dataLayer.push({
        event: 'form_submission',
        form_name: formName,
        form_id: formName.toLowerCase().replace(/\s+/g, '_'),
        form_destination: window.location.pathname,
        form_submit_success: success,
        form_fields: Object.keys(formData).join(','),
        // Don't send actual form data, just metadata
        form_metadata: cleanedData,
        site_environment: getCurrentEnvironment(),
        timestamp: new Date().toISOString()
      });
    }
  };
  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(trackingFunction);
  } else {
    setTimeout(trackingFunction, 0);
  }
};

// Enhanced button click tracking
export const trackButtonClick = (buttonName: string, buttonLocation: string, buttonAction?: string) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'button_click',
      button_name: buttonName,
      button_location: buttonLocation,
      button_action: buttonAction || 'click',
      click_url: window.location.href,
      click_timestamp: new Date().toISOString()
    });
  }
};

// Track file downloads
export const trackFileDownload = (fileName: string, fileType: string) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'file_download',
      file_name: fileName,
      file_type: fileType
    });
  }
};

// Track scroll depth
export const initScrollTracking = () => {
  let scrollMarks = [25, 50, 75, 90];
  let marks = new Set();

  const calculateScrollPercentage = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    return (window.scrollY / scrollHeight) * 100;
  };

  const handleScroll = () => {
    const scrolled = calculateScrollPercentage();
    scrollMarks.forEach(mark => {
      if (scrolled >= mark && !marks.has(mark)) {
        marks.add(mark);
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'scroll_depth',
            scroll_percentage: mark
          });
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
};

// Track outbound links
export const trackOutboundLink = (url: string, linkText: string) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'outbound_link_click',
      link_url: url,
      link_text: linkText
    });
  }
};

// Track user engagement
export const trackEngagement = (action: string, category: string, label?: string) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'user_engagement',
      engagement_action: action,
      engagement_category: category,
      engagement_label: label
    });
  }
};

// Declare global window interface
declare global {
  interface Window {
    dataLayer: any[];
  }
} 