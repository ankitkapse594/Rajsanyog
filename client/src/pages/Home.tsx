import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Founders from "@/components/Founders";
import Certification from "@/components/Certification";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Founders />
      <Certification />
      <ContactForm />
      <Footer />
    </div>
  );
}
