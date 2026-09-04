import { Outlet } from "react-router-dom";
import NoticeBanner from "@/components/NoticeBanner";
import SiteHeader from "@/layout/SiteHeader";
import SiteFooter from "@/layout/SiteFooter";

const SiteLayout = () => (
  <>
    <SiteHeader />
    <main className="site-main">
      <Outlet />
    </main>
    <SiteFooter />
    <NoticeBanner />
  </>
);

export default SiteLayout;
