import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Press from "@/components/Press";
import Artworkhub from "@/components/Artworkhub";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
      scrollToId(slug || "artworkhub");
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
        <Hero />
        <Artworkhub />
        <Press />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
