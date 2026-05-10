import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoFull from "@assets/Rajsanyog_Logo_1778388404115.jpeg";

export default function Footer() {
  return (
    <footer className="bg-card text-foreground border-t border-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <img
              src={logoFull}
              alt="राजsanyog logo"
              className="w-40 h-40 object-contain rounded-lg mb-4"
              data-testid="img-footer-logo"
            />
            <p className="text-muted-foreground mb-4" data-testid="text-footer-tagline">
              Be Better. Achieve Greater.
            </p>
            <p className="text-sm text-muted-foreground" data-testid="text-footer-description">
              A government-registered digital startup delivering innovative solutions for modern
              businesses.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="text-footer-services-heading">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li data-testid="text-footer-service-0">Web Portal Development</li>
              <li data-testid="text-footer-service-1">Digital Consulting</li>
              <li data-testid="text-footer-service-2">Startup Tech Solutions</li>
              <li data-testid="text-footer-service-3">Content & Media Management</li>
              <li data-testid="text-footer-service-4">Political Campaign Support</li>
              <li data-testid="text-footer-service-5">Research & Institution Support</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="text-footer-contact-heading">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:rajsanyog40@gmail.com"
                  className="hover:text-primary transition-colors"
                  data-testid="link-footer-email"
                >
                  rajsanyog40@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span data-testid="text-footer-phone">7499039470 / 9423245297</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span data-testid="text-footer-address">
                  Flat No. A3/38, Forest Coop Bag Society, Katol Road, Nagpur, Maharashtra - 440013
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                size="icon"
                variant="outline"
                className="border-primary/50 hover:bg-primary/20"
                onClick={() => console.log("LinkedIn clicked")}
                data-testid="button-footer-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="border-primary/50 hover:bg-primary/20"
                onClick={() => console.log("Instagram clicked")}
                data-testid="button-footer-instagram"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/30 text-center text-sm text-muted-foreground">
          <p data-testid="text-footer-copyright">
            © 2025 Rajsanyog. All rights reserved. | UDYAM-MH-20-0234334
          </p>
        </div>
      </div>
    </footer>
  );
}
