import React, { createContext, useContext, ReactNode } from 'react';

interface HubSpotContextType {
  portalId: string;
  formId: string;
}

const HubSpotContext = createContext<HubSpotContextType>({
  portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '',
  formId: process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || '',
});

export const useHubSpot = () => useContext(HubSpotContext);

interface HubSpotProviderProps {
  children: ReactNode;
}

export const HubSpotProvider: React.FC<HubSpotProviderProps> = ({ children }) => {
  const value = {
    portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '',
    formId: process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || '',
  };

  return (
    <HubSpotContext.Provider value={value}>
      {children}
    </HubSpotContext.Provider>
  );
};

export default HubSpotProvider; 