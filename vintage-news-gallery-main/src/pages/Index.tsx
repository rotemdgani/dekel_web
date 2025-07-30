import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Store from "@/components/Store";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Press from "@/components/Press";
import Artworkhub from "@/components/Artworkhub";

const Index = () => {
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
