import { Card } from "@/components/ui/card";
import { Globe, TrendingUp, Rocket, Video, Megaphone } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Globe,
      title: "Web Portal Development",
      description:
        "Custom web portals tailored to your business needs. From enterprise solutions to customer-facing platforms, we build scalable and secure web applications.",
    },
    {
      icon: TrendingUp,
      title: "Digital Consulting",
      description:
        "Strategic guidance to navigate the digital landscape. We help businesses optimize their online presence and leverage technology for growth.",
    },
    {
      icon: Rocket,
      title: "Startup Tech Solutions",
      description:
        "End-to-end technology solutions for startups. From MVP development to scaling infrastructure, we support your entrepreneurial journey.",
    },
    {
      icon: Video,
      title: "Creative Content & Media Management",
      description:
        "Professional content creation and media management services. We help you tell your story and engage your audience effectively.",
    },
    {
      icon: Megaphone,
      title: "Political Campaign & Social Media Support",
      description:
        "Empowering political parties with data-driven digital campaigns. We provide social media strategy, targeted outreach, content creation, voter engagement tools, and end-to-end technical support to amplify your political message and maximize campaign impact.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold mb-4" data-testid="text-services-heading">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-services-description">
            Comprehensive digital solutions designed to elevate your business and drive success in
            the modern marketplace.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 hover-elevate transition-all duration-300 border-border/50"
              data-testid={`card-service-${index}`}
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" data-testid={`text-service-title-${index}`}>
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-service-description-${index}`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
