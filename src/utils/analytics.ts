import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// GTM Configuration
const GTM_ID = 'GTM-KR2LQG9K';

// Initialize Google Tag Manager
export const initGTM = () => {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Add GTM script
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
    document.head.appendChild(script);
    
    // Track initial page load
    window.dataLayer.push({
      event: 'gtm.init',
      'gtm.start': new Date().getTime()
    });
  }
};

// Enhanced page tracking for SPA
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      // Clean page path
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
      
      // Also push virtual pageview for GTM
      window.dataLayer.push({
        event: 'virtual_pageview',
        virtualPagePath: pagePath,
        virtualPageTitle: document.title
      });
    }
  }, [location]);
};

// Enhanced form submission tracking
export const trackFormSubmission = (formName: string, formData: Record<string, any>, success: boolean = true) => {
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
      form_metadata: cleanedData
    });
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