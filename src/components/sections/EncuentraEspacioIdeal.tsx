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
              version="2"
              real-estate="inesdesuarez"
              project-id=""
              container="mobysuite-cotizador-boulevard"
              template="default"
              country-code="CL"
              show-real-estate-logo="true"
              show-project-logo="true"
              primary-color="#0671AE"
              secondary-color="#84CE25"
              success-view-type="simple"
              hide-selected-assets="false"
              use-secondary-image="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
