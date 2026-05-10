import { Outlet } from "react-router-dom";
import CookieConsent from "@/components/CookieConsent";
import SiteHeader from "@/layout/SiteHeader";
import SiteFooter from "@/layout/SiteFooter";

const SiteLayout = () => (
  <>
    <SiteHeader />
    <main className="site-main">
      <Outlet />
    </main>
    <SiteFooter />
    <CookieConsent />
  </>
);

export default SiteLayout;
