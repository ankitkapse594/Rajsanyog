import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Linkedin } from "lucide-react";
import ankitImage from "@assets/generated_images/Professional_founder_portrait_-_Ankit_4035cbf5.png";
import ganeshImage from "@assets/generated_images/Professional_founder_portrait_-_Ganesh_7ea30b04.png";

export default function Founders() {
  const founders = [
    {
      name: "Ankit Kapse",
      phone: "7499039470",
      image: ankitImage,
    },
    {
      name: "Ganesh Chondekar",
      phone: "9423245297",
      image: ganeshImage,
    },
  ];

  return (
    <section id="founders" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold mb-4" data-testid="text-founders-heading">
            Meet Our Founders
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-founders-description">
            Visionary entrepreneurs committed to delivering excellence and driving digital
            transformation for businesses across India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {founders.map((founder, index) => (
            <Card
              key={index}
              className="p-8 hover-elevate transition-all duration-300"
              data-testid={`card-founder-${index}`}
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-founder-${index}`}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2" data-testid={`text-founder-name-${index}`}>
                    {founder.name}
                  </h3>
                  <p className="text-muted-foreground mb-1" data-testid={`text-founder-role-${index}`}>
                    Co-Founder
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => (window.location.href = `tel:${founder.phone}`)}
                    data-testid={`button-founder-phone-${index}`}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {founder.phone}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => console.log("LinkedIn clicked")}
                    data-testid={`button-founder-linkedin-${index}`}
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
