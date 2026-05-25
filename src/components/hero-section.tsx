import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-mec-bg overflow-hidden">
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-mec-petrol) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-mec-petrol) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <Badge
          variant="outline"
          className="mb-8 border-mec-copper text-mec-copper font-body font-500 tracking-widest uppercase text-xs px-4 py-1.5"
        >
          Instalații Electrice Premium
        </Badge>

        <h1 className="font-sans font-800 text-5xl md:text-7xl tracking-tight text-mec-ink leading-[1.05] mb-6">
          Inginerie electrică{" "}
          <span className="text-mec-petrol">de precizie</span>
        </h1>

        <p className="font-body font-400 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
          Proiectăm și executăm instalații electrice pentru clădiri rezidențiale
          și comerciale. Calitate certificată, termene respectate, garanție
          extinsă.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-mec-petrol hover:bg-mec-petrol-dark text-white font-body font-600 h-12 px-8 tracking-wide"
          >
            Solicită Consultanță Gratuită
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-mec-petrol text-mec-petrol hover:bg-mec-petrol/5 font-body font-500 h-12 px-8"
          >
            Vezi Portfolio
          </Button>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "500+", label: "Proiecte finalizate" },
            { value: "12+", label: "Ani experiență" },
            { value: "100%", label: "Satisfacție clienți" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-sans font-800 text-3xl text-mec-petrol">
                {value}
              </div>
              <div className="font-body text-xs text-muted-foreground mt-1 leading-tight">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copper accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mec-copper to-transparent opacity-40" />
    </section>
  );
}
