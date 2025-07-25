import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">GET IN TOUCH</h2>
          <div className="contact-divider"></div>
          <p className="contact-subtitle">
            Interested in purchasing artwork, commissioning a custom piece, or learning more about 
            Dekel Harari's modern and pop art creations? Let's connect.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-info-title">Let's Collaborate</h3>
            <p className="contact-info-text">
              Whether you're interested in purchasing original artwork from the store, 
              commissioning a custom piece, or exploring collaboration opportunities, 
              Dekel is always excited to discuss new projects and share his artistic vision.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-icon">
                  <Mail className="contact-icon-svg" />
                </div>
                <div>
                  <p className="contact-detail-title">Email</p>
                  <p className="contact-detail-text">dekel.harari@example.com</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-icon">
                  <Phone className="contact-icon-svg" />
                </div>
                <div>
                  <p className="contact-detail-title">Phone</p>
                  <p className="contact-detail-text">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-icon">
                  <MapPin className="contact-icon-svg" />
                </div>
                <div>
                  <p className="contact-detail-title">Studio</p>
                  <p className="contact-detail-text">Tel Aviv, Israel</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-icon">
                  <Instagram className="contact-icon-svg" />
                </div>
                <div>
                  <p className="contact-detail-title">Instagram</p>
                  <p className="contact-detail-text">@dekel.harari.art</p>
                </div>
              </div>
            </div>

            <Card className="contact-commission-card">
              <h4 className="contact-commission-title">Commission Information</h4>
              <ul className="contact-commission-list">
                <li>Custom pieces typically take 4-6 weeks</li>
                <li>Pricing starts at $800 for small works</li>
                <li>50% deposit required to begin</li>
                <li>Free consultation for all projects</li>
              </ul>
            </Card>
          </div>

          <Card className="contact-form-card">
            <form className="contact-form">
              <h3 className="contact-form-title">Send a Message</h3>

              <div className="contact-form-fields">
                <div className="contact-form-field">
                  <label className="contact-form-label">First Name</label>
                  <Input placeholder="Your first name" className="contact-form-input" />
                </div>
                <div className="contact-form-field">
                  <label className="contact-form-label">Last Name</label>
                  <Input placeholder="Your last name" className="contact-form-input" />
                </div>
              </div>

              <div className="contact-form-field">
                <label className="contact-form-label">Email</label>
                <Input type="email" placeholder="your@email.com" className="contact-form-input" />
              </div>

              <div className="contact-form-field">
                <label className="contact-form-label">Subject</label>
                <Input placeholder="What's this about?" className="contact-form-input" />
              </div>

              <div className="contact-form-field">
                <label className="contact-form-label">Message</label>
                <Textarea
                  placeholder="Tell me about your project or inquiry..."
                  rows={6}
                  className="contact-form-textarea"
                />
              </div>

              <Button type="submit" size="lg" className="contact-form-submit">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;