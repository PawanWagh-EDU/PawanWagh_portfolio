import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Services />
      <Education />
      <Contact />
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Index;
