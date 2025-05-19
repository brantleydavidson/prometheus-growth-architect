import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Initialize Google Tag Manager
export const initGTM = () => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KR2LQG9K');
    `;
    document.head.appendChild(script);
  }
};

// Track page views for SPA
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: location.pathname,
          title: document.title,
          referrer: document.referrer,
          hostname: window.location.hostname
        }
      });
    }
  }, [location]);
};

// Track form submissions
export const trackFormSubmission = (formName: string, formData: Record<string, any>) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'form_submission',
      form_name: formName,
      form_data: formData
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'button_click',
      button_name: buttonName,
      button_location: buttonLocation
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