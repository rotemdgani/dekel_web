import Header from "@/components/Header";
import MuseumHero from "@/components/MuseumHero";
import MuseumGallery from "@/components/MuseumGallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Press from "@/components/Press";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { artworks } from "@/data/artworks";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToId = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const path = location.pathname.toLowerCase();
    if (path === "/") {
      scrollToId("home");
      return;
    }
    const collectionsMatch = path.match(/^\/collections(?:\/([^\/#?]+))?$/);
    if (collectionsMatch) {
      const slug = collectionsMatch[1];
      scrollToId(slug || "gallery");
      return;
    }
    if (path === "/exhibitions") {
      scrollToId("exhibitions");
      return;
    }
    if (path === "/press") {
      scrollToId("press");
      return;
    }
    if (path === "/about") {
      scrollToId("about");
      return;
    }
    if (path === "/contact") {
      scrollToId("contact");
      return;
    }
    // Fallback to hash if present
    if (location.hash) {
      const id = location.hash.replace("#", "");
      scrollToId(id);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <MuseumHero />
        <MuseumGallery artworks={artworks} />
        <Press />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
