
import React from "react";

interface Client {
  name: string;
  logo: string;
}

interface KPI {
  value: string;
  label: string;
}

interface ProofRibbonProps {
  clients: Client[];
  kpis: KPI[];
}

const ProofRibbon = ({ clients, kpis }: ProofRibbonProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-2xl font-semibold text-center text-prometheus-navy mb-12">
          Trusted by Industry Leaders
        </h2>
        
        {/* Client Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center mb-16">
          {clients.map((client, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={client.logo}
                alt={`${client.name} logo - Prometheus Agency client`}
                className="max-h-12 max-w-full grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center animate-counter-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-prometheus-orange mb-2">
                {kpi.value}
              </div>
              <div className="text-prometheus-gray">{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofRibbon;
