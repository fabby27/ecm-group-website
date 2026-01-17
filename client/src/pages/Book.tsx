import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { CheckCircle2, Mail, Phone, Building, MapPin, Calendar, Clock } from "lucide-react";

export default function Book() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    location: "",
    preferredDate: "",
    preferredTime: "",
    additionalInfo: "",
  });

  const submitBooking = trpc.contact.submitBooking.useMutation({
    onSuccess: () => {
      toast.success("Booking request submitted successfully!", {
        description: "We'll contact you within 2 hours to confirm your appointment.",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        serviceType: "",
        location: "",
        preferredDate: "",
        preferredTime: "",
        additionalInfo: "",
      });
    },
    onError: (error) => {
      toast.error("Failed to submit booking request", {
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.company || 
        !formData.serviceType || !formData.location || !formData.preferredDate || !formData.preferredTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    submitBooking.mutate(formData);
  };

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
            <a href="/#services" className="text-sm hover:text-primary transition-colors">Services</a>
            <a href="/#about" className="text-sm hover:text-primary transition-colors">About</a>
            <a href="/#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
          </div>
          <Link href="/book">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              BOOK SWEEP
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              SCHEDULE YOUR SWEEP
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              BOOK YOUR <span className="text-primary">SECURITY SWEEP</span>
            </h1>
            <p className="text-muted-foreground">
              Complete the form below and our certified specialists will contact you within 2 hours to schedule your confidential TSCM sweep. Monthly subscription plans available for ongoing protection.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20 px-4">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@company.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className="pl-10"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="company"
                            placeholder="Acme Corporation"
                            className="pl-10"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type *</Label>
                      <Select value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="boardroom">Boardroom TSCM Sweep</SelectItem>
                          <SelectItem value="csuite">C-Suite Protection</SelectItem>
                          <SelectItem value="conference">Conference Room Sweep</SelectItem>
                          <SelectItem value="mobile">Mobile Device Analysis</SelectItem>
                          <SelectItem value="camera">Hidden Camera Detection</SelectItem>
                          <SelectItem value="assessment">Vulnerability Assessment</SelectItem>
                          <SelectItem value="subscription">Monthly Subscription</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location Address *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="123 Corporate Blvd, Suite 500, City, State"
                          className="pl-10"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Preferred Date *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="preferredDate"
                            type="date"
                            className="pl-10"
                            value={formData.preferredDate}
                            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Time *</Label>
                        <Select value={formData.preferredTime} onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                            <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                            <SelectItem value="emergency">Emergency (ASAP)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Any specific concerns, areas of focus, or special requirements..."
                        rows={4}
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={submitBooking.isPending}
                    >
                      {submitBooking.isPending ? "SUBMITTING..." : "SUBMIT BOOKING REQUEST"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      All information is encrypted and handled with strict confidentiality.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Fast & Confidential</CardTitle>
                  <CardDescription>
                    Our secure booking system ensures your information remains private and protected.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Confirmation call within 2 hours</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Pre-sweep security briefing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Comprehensive on-site sweep</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Detailed findings report</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Security recommendations</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg">Need Immediate Assistance?</CardTitle>
                  <CardDescription>
                    For urgent security threats, email us immediately for priority response.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="mailto:elitecountermeasuresgroup@gmail.com">EMAIL NOW</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <a href="mailto:elitecountermeasuresgroup@gmail.com" className="hover:text-primary transition-colors">
                      elitecountermeasuresgroup@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-lg font-bold text-primary mb-4">ELITE COUNTERMEASURES GROUP</div>
              <p className="text-sm text-muted-foreground">
                Advanced Technical Surveillance Countermeasures (TSCM) protecting Fortune 500 companies from corporate espionage.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold mb-4">QUICK LINKS</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div><Link href="/"><a className="hover:text-primary transition-colors">Home</a></Link></div>
                <div><a href="/#services" className="hover:text-primary transition-colors">Services</a></div>
                <div><a href="/#about" className="hover:text-primary transition-colors">About Us</a></div>
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
