
import React, { useEffect, useRef } from 'react';
import { loadHubSpotForm, initHubSpot } from '@/utils/hubspotIntegration';
import { Skeleton } from '@/components/ui/skeleton';

interface HubSpotFormProps {
  formId: string;
  className?: string;
  onSubmitSuccess?: () => void;
  title?: string;
  description?: string;
}

const HubSpotForm: React.FC<HubSpotFormProps> = ({
  formId,
  className = '',
  onSubmitSuccess,
  title,
  description,
}) => {
  const formContainerId = `hubspot-form-${formId}`;
  const formLoaded = useRef(false);
  
  useEffect(() => {
    // Initialize HubSpot tracking
    initHubSpot();
    
    // Add the HubSpot form embedding script if not already present
    if (!document.getElementById('hubspot-forms-script')) {
      const script = document.createElement('script');
      script.id = 'hubspot-forms-script';
      script.src = '//js.hsforms.net/forms/embed/v2.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        if (!formLoaded.current) {
          loadHubSpotForm(formId, formContainerId, () => {
            if (onSubmitSuccess) onSubmitSuccess();
          });
          formLoaded.current = true;
        }
      };
      
      document.head.appendChild(script);
    } else if (window.hbspt && !formLoaded.current) {
      // If script is already loaded but form isn't
      loadHubSpotForm(formId, formContainerId, () => {
        if (onSubmitSuccess) onSubmitSuccess();
      });
      formLoaded.current = true;
    }
    
    return () => {
      formLoaded.current = false;
    };
  }, [formId, onSubmitSuccess]);

  return (
    <div className={className}>
      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
      {description && <p className="text-prometheus-gray mb-4">{description}</p>}
      
      <div id={formContainerId} className="hubspot-form-container">
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
};

export default HubSpotForm;
