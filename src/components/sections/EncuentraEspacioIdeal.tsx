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

        {/* Cotizador Mobysuite */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div id="mobysuite-cotizador-boulevard"></div>
          <script
            src="https://cotizador.mobysuite.cl/cotizador.js"
            data-real-estate="Boulevard Santa Rosa"
            data-project-id=""
            data-container="mobysuite-cotizador-boulevard"
            data-template="default"
            data-country-code="CL"
            data-show-real-estate-logo="true"
            data-real-estate-logo-url="/Boulevard_horizontal_color.png"
            data-show-project-logo="true"
            data-primary-color="#0671AE"
            data-secondary-color="#84CE25"
            data-success-view-type="simple"
            data-hide-selected-assets="false"
            data-use-secondary-image="false"
          ></script>
        </div>
      </div>
    </section>
  );
};
