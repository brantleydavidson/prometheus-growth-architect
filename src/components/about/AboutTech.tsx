import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getOptimizedImageProps } from "@/utils/imageOptimization";

const BUCKET = "cms_media";
const FOLDER = "Technology Logos";

const AboutTech = () => {
  const [logos, setLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let didCancel = false;
    setLoading(true);
    setError(null);
    const fetchLogos = async () => {
      try {
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), 5000));
        const fetch = supabase.storage.from(BUCKET).list(FOLDER, { limit: 100 });
        const result = await Promise.race([fetch, timeout]);
        if (didCancel) return;
        // result is { data, error }
        const { data, error } = result as { data: any[]; error: any };
        if (error) {
          setError("Failed to load technology logos.");
          setLogos([]);
        } else {
          const pngs = (data || []).filter((file: any) => file.name.endsWith('.png'));
          const urls = pngs.map((file: any) =>
            `https://xkarbwfzxfxgtnefcout.supabase.co/storage/v1/object/public/${BUCKET}/${encodeURIComponent(FOLDER)}/${encodeURIComponent(file.name)}`
          );
          setLogos(urls);
        }
      } catch (e) {
        if (!didCancel) {
          setError("Failed to load technology logos.");
          setLogos([]);
        }
      } finally {
        if (!didCancel) setLoading(false);
      }
    };
    fetchLogos();
    return () => { didCancel = true; };
  }, []);

  return (
    <section className="py-12 bg-white" aria-labelledby="technologies-heading">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h2 id="technologies-heading" className="text-4xl md:text-5xl font-semibold text-prometheus-navy mb-6 leading-tight">
            Technology Solutions
          </h2>
          <p className="text-lg text-prometheus-gray max-w-2xl mx-auto mb-0">
            We partner with industry-leading platforms to deliver comprehensive solutions for your business.
          </p>
        </div>
        {loading ? (
          <div className="text-center py-12 text-prometheus-gray">Loading logos...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {logos.map((src, index) => (
              <div key={index} className="flex items-center justify-center bg-white">
                <img
                  {...getOptimizedImageProps(src, `Technology logo ${index + 1}`, {
                    width: 150,
                    sizes: '(max-width: 640px) 100px, 150px',
                    loading: 'lazy'
                  })}
                  className="max-h-12 md:max-h-16 w-auto grayscale opacity-80 object-contain"
                  onError={e => { e.currentTarget.src = "/fallback-tech-logo.svg"; }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutTech;
