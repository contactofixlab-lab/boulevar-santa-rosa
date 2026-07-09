export const ProyectoPartnersSection = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-sm uppercase tracking-widest font-semibold text-[#4A6275] mb-2">
            Un proyecto de
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-[#0671AE] to-[#84CE25] rounded-full mx-auto" />
        </div>

        {/* Grid de Logos de Partners */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center max-w-3xl mx-auto">
          {/* Placeholders para logos de socios/integrantes */}
          <div className="h-20 flex items-center justify-center bg-gray-50 rounded-lg text-[#4A6275] text-xs opacity-60 w-full hover:bg-gray-100 transition-colors">
            Partner 1
          </div>
          <div className="h-20 flex items-center justify-center bg-gray-50 rounded-lg text-[#4A6275] text-xs opacity-60 w-full hover:bg-gray-100 transition-colors">
            Partner 2
          </div>
          <div className="h-20 flex items-center justify-center bg-gray-50 rounded-lg text-[#4A6275] text-xs opacity-60 w-full hover:bg-gray-100 transition-colors">
            Partner 3
          </div>
          <div className="h-20 flex items-center justify-center bg-gray-50 rounded-lg text-[#4A6275] text-xs opacity-60 w-full hover:bg-gray-100 transition-colors">
            Partner 4
          </div>
        </div>
      </div>
    </section>
  );
};
