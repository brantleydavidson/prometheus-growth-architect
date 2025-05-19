interface HubSpotFormData {
  portalId: string;
  formId: string;
  fields: Record<string, string>;
}

export const submitHubSpotForm = async (data: HubSpotFormData): Promise<Response> => {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${data.portalId}/${data.formId}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: Object.entries(data.fields).map(([name, value]) => ({
        name,
        value,
      })),
    }),
  });

  return response;
}; 