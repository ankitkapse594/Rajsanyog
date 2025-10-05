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
      className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-background via-background to-primary/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1
                className="text-5xl sm:text-6xl font-bold leading-tight"
                style={{ fontFamily: "'Noto Sans Devanagari', 'Poppins', sans-serif" }}
                data-testid="text-company-name"
              >
                <span className="text-primary">राज</span>
                <span className="text-foreground">sanyog</span>
              </h1>
              <p
                className="text-2xl sm:text-3xl font-semibold text-muted-foreground"
                data-testid="text-tagline"
              >
                Be Better. Achieve Greater.
              </p>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl" data-testid="text-hero-description">
              A government-registered digital startup specializing in web portal development,
              digital consulting, and innovative tech solutions for modern businesses.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("services")}
                data-testid="button-explore-services"
                className="group"
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

            <div className="pt-4">
              <p className="text-sm text-muted-foreground" data-testid="text-udyam-badge">
                🏛️ Govt. Registered | UDYAM-MH-20-0234334
              </p>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src={heroImage}
                alt="Modern digital workspace"
                className="w-full h-auto"
                data-testid="img-hero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
