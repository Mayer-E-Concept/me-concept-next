import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: "⚡",
    title: "Instalații Rezidențiale",
    desc: "Tablouri electrice, prize, iluminat, sisteme de siguranță pentru locuințe.",
  },
  {
    icon: "🏗️",
    title: "Instalații Industriale",
    desc: "Automatizări, tablouri forță, cablaje structurate pentru spații comerciale.",
  },
  {
    icon: "☀️",
    title: "Sisteme Fotovoltaice",
    desc: "Proiectare și montaj panouri solare, invertoare, stocare energie.",
  },
  {
    icon: "🔌",
    title: "Stații de Încărcare EV",
    desc: "Instalare puncte de încărcare pentru vehicule electrice — rezidențial și public.",
  },
  {
    icon: "🏠",
    title: "Smart Home",
    desc: "Sisteme KNX, Loxone, automatizare iluminat și climatizare.",
  },
  {
    icon: "📋",
    title: "Proiectare & Avize",
    desc: "Documentație tehnică, proiecte ANRE, avize și recepții la cheie.",
  },
];

export function FeaturesSection() {
  return (
    <section id="servicii" className="bg-mec-bg-alt py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body font-500 text-mec-copper text-xs uppercase tracking-[0.2em] mb-3">
            Ce facem
          </p>
          <h2 className="font-sans font-800 text-4xl md:text-5xl text-mec-ink tracking-tight">
            Servicii complete
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon, title, desc }) => (
            <Card
              key={title}
              className="bg-card border-border hover:border-mec-petrol/30 hover:shadow-md transition-all duration-300 group"
            >
              <CardHeader className="pb-3">
                <div className="text-2xl mb-2">{icon}</div>
                <CardTitle className="font-sans font-700 text-base text-mec-ink group-hover:text-mec-petrol transition-colors">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
