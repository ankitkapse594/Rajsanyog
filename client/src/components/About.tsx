import { Card } from "@/components/ui/card";
import { Target, Lightbulb, Users } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower businesses with innovative digital solutions that drive growth and success in the modern digital landscape.",
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description:
        "We stay ahead of technology trends to deliver cutting-edge solutions that give our clients a competitive advantage.",
    },
    {
      icon: Users,
      title: "Client-Centric",
      description:
        "Your success is our success. We build lasting partnerships through dedicated service and exceptional results.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold mb-4" data-testid="text-about-heading">
            About Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-about-description">
            राजsanyog is a micro-enterprise in the services sector, officially registered under the
            Government of India's Udyam initiative. We specialize in information service activities,
            focusing on web portals and online platforms that transform businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className="p-8 hover-elevate transition-all duration-300 border-border/50"
              data-testid={`card-value-${index}`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold" data-testid={`text-value-title-${index}`}>
                  {value.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-value-description-${index}`}>
                  {value.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
