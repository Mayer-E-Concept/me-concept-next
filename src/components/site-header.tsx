import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-mec-petrol font-sans font-800 text-xl tracking-tight">
            ME
          </span>
          <Separator orientation="vertical" className="h-5 bg-mec-copper" />
          <span className="text-foreground font-sans font-600 text-sm uppercase tracking-widest">
            Concept
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {["Servicii", "Portfolio", "Despre", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-body font-500 text-muted-foreground hover:text-mec-petrol transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <Button
          size="sm"
          className="bg-mec-petrol hover:bg-mec-petrol-dark text-white font-body font-600 tracking-wide"
        >
          Solicită Ofertă
        </Button>
      </div>
    </header>
  );
}
