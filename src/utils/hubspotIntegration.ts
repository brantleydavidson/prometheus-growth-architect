
/**
 * HubSpot Integration Utility
 * Handles interaction with HubSpot forms and tracking
 */

// Initialize HubSpot tracking code
export const initHubSpot = (): void => {
  // Check if the script is already loaded
  if (document.getElementById('hubspot-script')) return;

  const script = document.createElement('script');
  script.id = 'hubspot-script';
  script.type = 'text/javascript';
  script.async = true;
  script.defer = true;
  script.src = '//js.hs-scripts.com/YOUR_PORTAL_ID.js'; // Replace with your actual HubSpot portal ID
  
  document.head.appendChild(script);
  
  // Add HubSpot tracking cookie
  window._hsq = window._hsq || [];
  window._hsq.push(['setPath', window.location.pathname + window.location.search]);
  window._hsq.push(['trackPageView']);
};

// Track page views for SPA
export const trackPageView = (path: string): void => {
  if (window._hsq) {
    window._hsq.push(['setPath', path]);
    window._hsq.push(['trackPageView']);
  }
};

// Helper to load HubSpot form
export const loadHubSpotForm = (
  formId: string, 
  targetId: string,
  onFormSubmit?: () => void,
  onFormReady?: () => void
): void => {
  if (window.hbspt) {
    window.hbspt.forms.create({
      portalId: 'YOUR_PORTAL_ID', // Replace with your actual HubSpot portal ID
      formId: formId,
      target: `#${targetId}`,
      onFormSubmit: onFormSubmit,
      onFormReady: onFormReady,
    });
  } else {
    console.error('HubSpot form script not loaded');
  }
};

// Declare global window interfaces
declare global {
  interface Window {
    _hsq: any[];
    hbspt: {
      forms: {
        create: (config: any) => void;
      };
    };
  }
}
