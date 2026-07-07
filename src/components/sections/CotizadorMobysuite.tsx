"use client";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mobysuite-quote': {
        'real-estate'?: string;
        'project-id'?: string;
        'container'?: string;
        'template'?: string;
        'country-code'?: string;
        'show-real-estate-logo'?: string;
        'real-estate-logo-url'?: string;
        'show-project-logo'?: string;
        'primary-color'?: string;
        'secondary-color'?: string;
        'success-view-type'?: string;
        'hide-selected-assets'?: string;
        'use-secondary-image'?: string;
        [key: string]: any;
      };
    }
  }
}

export const CotizadorMobysuite = () => {
  return (
    <section id="cotizador" className="py-12 bg-surface-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Contenedor del cotizador Mobysuite - Web Component */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <mobysuite-quote
            real-estate="Boulevard Santa Rosa"
            project-id=""
            container="mobysuite-cotizador-boulevard"
            template="default"
            country-code="CL"
            show-real-estate-logo="true"
            real-estate-logo-url="/Boulevard_horizontal_color.png"
            show-project-logo="true"
            primary-color="#0671AE"
            secondary-color="#84CE25"
            success-view-type="simple"
            hide-selected-assets="false"
            use-secondary-image="false"
          />
        </div>
      </div>
    </section>
  );
};
