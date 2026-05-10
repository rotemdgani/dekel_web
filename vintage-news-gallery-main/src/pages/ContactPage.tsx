import { CONTACT_EMAIL, WHATSAPP_PHONE, INSTAGRAM_URL } from "@/config/site";
import "./ContactPage.css";

const ContactPage = () => {
  const waHref = `https://wa.me/${WHATSAPP_PHONE}`;
  const mailHref = `mailto:${CONTACT_EMAIL}`;

  return (
    <div className="contact-editorial">
      <p className="contact-kicker">Contact</p>
      <p className="contact-intro">For inquiries, exhibitions, and press:</p>
      <p className="contact-email-wrap">
        <a className="contact-email-lg" href={mailHref}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="contact-wa-wrap">
        <a
          className="contact-wa-lg"
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </p>
      <p className="contact-instagram-wrap">
        <a
          className="contact-instagram"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </p>
    </div>
  );
};

export default ContactPage;
