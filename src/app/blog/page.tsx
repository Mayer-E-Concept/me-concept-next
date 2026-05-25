import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import { BlogPage } from "@/components/blog-page";

export const metadata = {
  title: "Blog — Mayer E-Concept | Proiectare instalații electrice",
  description:
    "Articole despre proiectarea instalațiilor electrice, sfaturi pentru alegerea unui proiectant, noutăți din domeniu.",
};

export default function Blog() {
  return (
    <>
      <SiteHeader />
      <main>
        <BlogPage />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
