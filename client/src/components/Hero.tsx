import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/Modern_office_workspace_hero_image_020741df.png";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Animated cyber grid background */}
      <div className="absolute inset-0 cyber-grid pointer-events-none" />

      {/* Glowing orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,233,255,0.08) 0%, transparent 70%)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,233,255,0.06) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1
                className="text-5xl sm:text-6xl font-bold leading-tight animate-fade-in-left"
                style={{ fontFamily: "'Noto Sans Devanagari', 'Poppins', sans-serif" }}
                data-testid="text-company-name"
              >
                <span className="text-primary animate-text-glow">राज</span>
                <span className="text-foreground">sanyog</span>
              </h1>
              <p
                className="text-2xl sm:text-3xl font-semibold text-muted-foreground animate-fade-in-left delay-200"
                data-testid="text-tagline"
              >
                Be Better. Achieve Greater.
              </p>
            </div>

            <p
              className="text-lg text-muted-foreground max-w-xl animate-fade-in-left delay-300"
              data-testid="text-hero-description"
            >
              A government-registered digital startup specializing in web portal development,
              digital consulting, and innovative tech solutions for modern businesses.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400">
              <Button
                size="lg"
                onClick={() => scrollToSection("services")}
                data-testid="button-explore-services"
                className="group animate-glow-pulse"
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                data-testid="button-contact"
              >
                Get In Touch
              </Button>
            </div>

            <div className="pt-4 animate-fade-in-up delay-500">
              <p className="text-sm text-muted-foreground" data-testid="text-udyam-badge">
                🏛️ Govt. Registered | UDYAM-MH-20-0234334
              </p>
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-in-right delay-300">
            <div className="relative rounded-lg overflow-hidden animate-glow-pulse">
              <img
                src={heroImage}
                alt="Modern digital workspace"
                className="w-full h-auto animate-float"
                data-testid="img-hero"
              />
              {/* Shimmer overlay */}
              <div className="absolute inset-0 animate-shimmer pointer-events-none rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
