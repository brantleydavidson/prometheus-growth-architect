import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://xkarbwfzxfxgtnefcout.supabase.co";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET = "cms_media";
const FOLDER = "Technology Logos";

const AboutTech = () => {
  const [logos, setLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      setLoading(true);
      const { data, error } = await supabase.storage.from(BUCKET).list(FOLDER, { limit: 100 });
      if (error) {
        setLogos([]);
        setLoading(false);
        return;
      }
      const pngs = (data || []).filter((file: any) => file.name.endsWith('.png'));
      const urls = pngs.map((file: any) =>
        `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(FOLDER)}/${encodeURIComponent(file.name)}`
      );
      setLogos(urls);
      setLoading(false);
    };
    fetchLogos();
  }, []);

  return (
    <section className="py-12 bg-white" aria-labelledby="technologies-heading">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h3 id="technologies-heading" className="text-2xl font-medium text-prometheus-navy mb-2">Technology Solutions</h3>
          <p className="text-lg text-prometheus-gray max-w-2xl mx-auto">
            We partner with industry-leading platforms to deliver comprehensive solutions for your business.
          </p>
        </div>
        {loading ? (
          <div className="text-center py-12 text-prometheus-gray">Loading logos...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {logos.map((src, index) => (
              <div key={index} className="p-4 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <div className="w-full max-w-[120px]">
                  <img
                    src={src}
                    alt={`Technology logo ${index + 1}`}
                    className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
                    onError={e => { e.currentTarget.src = "/fallback-tech-logo.svg"; }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutTech;
