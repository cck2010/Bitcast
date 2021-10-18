import "./Homepage.scss";
import { Broadcasting } from "./Broadcasting";
import { ComingAuction } from "./Incoming-auction";
import { Recommendation } from "./Recommendation";
import { SellWithBidcast } from "./SellWithBidcast";

export function Homepage() {
  return (
    <div>
      <section>
        <Broadcasting />
      </section>
      <section>
        <ComingAuction />
      </section>
      <section>
        <Recommendation />
      </section>
      <section>
        <SellWithBidcast />
      </section>
    </div>
  );
}
