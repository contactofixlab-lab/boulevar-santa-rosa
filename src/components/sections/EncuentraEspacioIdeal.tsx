export const EncuentraEspacioIdeal = () => {

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B]">
            Encuentra tu{" "}
            <span className="text-[#0671AE]">espacio ideal</span>
          </h2>
          <div className="w-14 h-[3px] bg-[#84CE25] rounded-full mx-auto mt-3" />
        </div>

        {/* Cotizador Mobysuite - Web Component */}
        <div className="flex justify-center w-full" style={{ minHeight: "600px" }}>
          <div style={{ width: "100%", maxWidth: "1200px" }}>
            {/* @ts-ignore */}
            <mobysuite-quote
              data-version="2"
              data-real-estate="inesdesuarez"
              data-project-id="4"
              data-container="mobysuite-cotizador-boulevard"
              data-template="default"
              data-country-code="CL"
              data-show-real-estate-logo="true"
              data-show-project-logo="true"
              data-primary-color="#0671AE"
              data-secondary-color="#84CE25"
              data-success-view-type="simple"
              data-hide-selected-assets="false"
              data-hide-project-data="true"
              data-use-secondary-image="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
