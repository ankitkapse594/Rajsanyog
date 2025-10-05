import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, Building2, FileText, Download } from "lucide-react";

export default function Certification() {
  const certificationDetails = [
    {
      icon: FileText,
      label: "Udyam Number",
      value: "UDYAM-MH-20-0234334",
    },
    {
      icon: Building2,
      label: "Enterprise Type",
      value: "Micro (Services Sector)",
    },
    {
      icon: Award,
      label: "Activity",
      value: "Information Service Activities",
    },
    {
      icon: Calendar,
      label: "Incorporation Date",
      value: "12 February 2024",
    },
  ];

  return (
    <section id="certification" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-chart-3 text-foreground" data-testid="badge-government">
            Government Registered
          </Badge>
          <h2 className="text-4xl font-semibold mb-4" data-testid="text-certification-heading">
            Official Certification
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-certification-description">
            राजsanyog is officially registered under the Government of India's Udyam Registration
            scheme, ensuring credibility and compliance with national standards.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-8 md:p-12 border border-primary/30 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2" data-testid="text-udyam-title">
                Udyam Registration Certificate
              </h3>
              <p className="text-muted-foreground" data-testid="text-udyam-subtitle">
                Ministry of Micro, Small and Medium Enterprises
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {certificationDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-accent/30"
                data-testid={`item-certification-${index}`}
              >
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-md">
                  <detail.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1" data-testid={`text-cert-label-${index}`}>
                    {detail.label}
                  </p>
                  <p className="font-semibold" data-testid={`text-cert-value-${index}`}>
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => console.log("Download certificate")}
              data-testid="button-download-certificate"
              className="group"
            >
              <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              Download Certificate (PDF)
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
