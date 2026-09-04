import { CONTACT_EMAIL } from "@/config/site";
import "./PrivacyPolicyPage.css";

const PrivacyPolicyPage = () => (
  <article className="privacy-policy-editorial">
    <header className="privacy-policy-header">
      <h1 className="privacy-policy-title">Privacy Policy</h1>
      <p className="privacy-policy-updated">Last updated: 11 May 2026</p>
    </header>

    <div className="privacy-policy-body">
      <p>This website is operated by Dekel Harari.</p>
      <p>
        Your privacy is important to me. This Privacy Policy explains what
        information may be collected when you visit this website or contact me
        through it.
      </p>

      <h2 className="privacy-policy-heading">Information I Collect</h2>
      <p>
        When you contact me through the website, I may collect the information
        you choose to provide, such as your name, email address, phone number,
        and the content of your message.
      </p>
      <p>
        The website may also collect basic technical information, such as your
        IP address, browser type, device information, pages visited, and general
        website usage data.
      </p>

      <h2 className="privacy-policy-heading">How I Use the Information</h2>
      <p>The information collected may be used to:</p>
      <ul className="privacy-policy-list">
        <li>respond to your inquiries;</li>
        <li>
          provide information about artworks, exhibitions, collaborations, or
          purchases;
        </li>
        <li>improve the website and user experience;</li>
        <li>keep basic records of communication;</li>
        <li>
          send updates or invitations, only if you have agreed to receive them.
        </li>
      </ul>

      <h2 className="privacy-policy-heading">Cookies & analytics</h2>
      <p>
        This website does not use non-essential cookies and does not require a
        cookie consent banner.
      </p>
      <p>
        Site traffic is measured with Plausible Analytics, a cookieless,
        privacy-friendly service that does not collect personal data or use
        tracking cookies.
      </p>

      <h2 className="privacy-policy-heading">Sharing Information</h2>
      <p>I do not sell or rent your personal information.</p>
      <p>
        Information may be shared only when necessary, for example with website
        hosting providers, email services, analytics tools, or if required by
        law.
      </p>

      <h2 className="privacy-policy-heading">Data Security</h2>
      <p>
        I take reasonable steps to protect the information provided through this
        website. However, no method of online transmission or storage is
        completely secure.
      </p>

      <h2 className="privacy-policy-heading">Third-Party Links</h2>
      <p>
        This website may include links to external websites, social media pages,
        or third-party platforms. I am not responsible for the privacy practices
        or content of those websites.
      </p>

      <h2 className="privacy-policy-heading">Your Rights</h2>
      <p>
        You may contact me to request access to, correction of, or deletion of
        personal information you have provided, subject to applicable law.
      </p>

      <h2 className="privacy-policy-heading">Contact</h2>
      <p>For any privacy-related questions, please contact:</p>
      <p className="privacy-policy-contact">
        Email:{" "}
        <a className="privacy-policy-mail" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
    </div>
  </article>
);

export default PrivacyPolicyPage;
