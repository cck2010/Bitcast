import "./App.scss";
import { Footer } from "./Footer";
import { ComingAuction } from "./Incoming-auction";
import { HomePageNavbar } from "./Navbar";
import { Recommendation } from "./Recommendation";

export function Homepage() {
  return (
    <div>
      <HomePageNavbar />
      <section>
        <ComingAuction />
      </section>
      <section>
        <Recommendation />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}
