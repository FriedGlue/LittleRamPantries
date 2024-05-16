import Stack from "react-bootstrap/Stack";
import "./Hero.css";
import { SchoolConfig } from "../../types/types";

function Hero(
  { schoolConfig }:
  { schoolConfig: SchoolConfig }) {
    
  return (
    <div className="hero-container">
      <img src={schoolConfig.banners.dashboard_banner} alt="Background" className="hero-image" />
      <div className="hero-text-block">
        <Stack gap={3}>
          <h2>Favorites at Your Fingertips</h2>
          <p id="heroFillerText">
            {schoolConfig.blurb_1}&nbsp;{schoolConfig.blurb_2}
          </p>
          <p>
            Spot a pantry you love? Simply click the star to favorite it, making it easier to find next time you're nearby.
          </p>
          <h3>Browse. Select. Eat. Repeat.</h3>
        </Stack>
      </div>
    </div>
  );
}

export default Hero;
