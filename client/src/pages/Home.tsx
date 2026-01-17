import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Radio, Smartphone, Camera, FileSearch, CheckCircle2, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <a className="text-xl font-bold text-primary">ELITE COUNTERMEASURES GROUP</a>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/"><a className="text-sm hover:text-primary transition-colors">Home</a></Link>
            <a href="#services" className="text-sm hover:text-primary transition-colors">Services</a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
          </div>
          <Link href="/book">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              BOOK SWEEP
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              ELITE TSCM SERVICES
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              PROTECT YOUR <br />
              <span className="text-primary">CORPORATE SECRETS</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Advanced Technical Surveillance Countermeasures detecting corporate espionage before it costs you billions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  SCHEDULE SWEEP
                </Button>
              </Link>
              <Button size="lg" variant="outline">VIEW SERVICES</Button>
            </div>
            <div className="flex flex-wrap gap-6 justify-center mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Monthly Subscriptions Available
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                DoD Certified
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                24/7 Emergency Response
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Fortune 500 Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Sweeps Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Detection Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Emergency Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-sm text-primary font-medium mb-2">OUR SERVICES</div>
            <h2 className="text-4xl font-bold mb-4">COMPREHENSIVE TSCM SOLUTIONS</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Military-grade detection technology protecting your most sensitive conversations and strategic assets.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Boardroom TSCM Sweeps", desc: "Comprehensive electronic surveillance detection in executive meeting spaces and boardrooms." },
              { icon: Eye, title: "C-Suite Protection", desc: "Advanced security sweeps for executive offices, protecting sensitive strategic discussions." },
              { icon: Radio, title: "Conference Room Sweeps", desc: "Pre-meeting bug detection ensuring confidential negotiations remain private." },
              { icon: Smartphone, title: "Mobile Device Analysis", desc: "Detection of compromised smartphones, tablets, and communication devices." },
              { icon: Camera, title: "Hidden Camera Detection", desc: "Locate covert video surveillance equipment using advanced RF and thermal scanning." },
              { icon: FileSearch, title: "Vulnerability Assessments", desc: "Comprehensive security audits identifying potential surveillance entry points." }
            ].map((service, i) => (
              <Card key={i} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <service.icon className="w-10 h-10 text-primary mb-4" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Detection Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm text-primary font-medium mb-2">THREAT DETECTION</div>
              <h2 className="text-4xl font-bold mb-4">WE DETECT WHAT OTHERS MISS</h2>
              <p className="text-muted-foreground mb-6">
                Corporate espionage costs businesses over $600 billion annually. Our advanced TSCM technology identifies and neutralizes surveillance threats before they compromise your competitive advantage.
              </p>
              <Link href="/book">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  REQUEST ASSESSMENT
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Hidden microphones and audio bugs",
                "Covert cameras and video surveillance",
                "GPS tracking devices",
                "Compromised smartphones and IoT devices",
                "WiFi and Bluetooth eavesdropping",
                "Laser microphone attacks",
                "TEMPEST and RF emissions",
                "Insider threat monitoring devices"
              ].map((threat, i) => (
                <div key={i} className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{threat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-sm text-primary font-medium mb-2">ABOUT US</div>
            <h2 className="text-4xl font-bold mb-4">TRUSTED BY INDUSTRY LEADERS</h2>
          </div>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Elite Countermeasures Group is the premier Technical Surveillance Countermeasures (TSCM) provider serving Fortune 500 companies, government agencies, and high-net-worth individuals. Our team of certified specialists brings decades of military and intelligence experience to protect your most sensitive assets. We offer flexible monthly subscription plans for ongoing security monitoring.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Global</div>
              <div className="text-sm text-muted-foreground">Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary/10 to-background">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">SECURE YOUR OPERATIONS TODAY</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't wait until it's too late. Schedule a confidential consultation with our TSCM experts and protect your competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                BOOK SWEEP NOW
              </Button>
            </Link>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:elitecountermeasuresgroup@gmail.com">EMAIL US</a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            elitecountermeasuresgroup@gmail.com
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-lg font-bold text-primary mb-4">ELITE COUNTERMEASURES GROUP</div>
              <p className="text-sm text-muted-foreground">
                Advanced Technical Surveillance Countermeasures (TSCM) protecting Fortune 500 companies from corporate espionage. Industry leaders worldwide.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold mb-4">QUICK LINKS</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div><Link href="/"><a className="hover:text-primary transition-colors">Home</a></Link></div>
                <div><a href="#services" className="hover:text-primary transition-colors">Services</a></div>
                <div><a href="#about" className="hover:text-primary transition-colors">About Us</a></div>
                <div><Link href="/book"><a className="hover:text-primary transition-colors">Book Sweep</a></Link></div>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold mb-4">CONTACT</div>
              <div className="text-sm text-muted-foreground">
                <a href="mailto:elitecountermeasuresgroup@gmail.com" className="hover:text-primary transition-colors">
                  elitecountermeasuresgroup@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 Elite Countermeasures Group. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
