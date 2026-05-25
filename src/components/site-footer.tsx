import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="bg-mec-navy text-white/70 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-white font-sans font-800 text-lg tracking-tight">
                ME
              </span>
              <Separator
                orientation="vertical"
                className="h-4 bg-mec-copper opacity-60"
              />
              <span className="text-white/80 font-sans font-600 text-xs uppercase tracking-widest">
                Concept
              </span>
            </div>
            <p className="font-body text-xs leading-relaxed max-w-xs">
              Instalații electrice de calitate pentru proiecte rezidențiale și
              comerciale.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="font-body font-600 text-white text-xs uppercase tracking-widest mb-3">
                Contact
              </p>
              <p className="font-body text-xs">m.poenar@me-concept.de</p>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 mb-6" />

        <p className="font-body text-xs text-center">
          © {new Date().getFullYear()} ME-Concept. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
