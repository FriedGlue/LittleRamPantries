import IndexButtons from '../components/LandingPage/IndexButtons/IndexButton.tsx';
import Stack from 'react-bootstrap/Stack';
import '../index.css';
import { SchoolConfig } from '../types/types.tsx';

function Index(
  { schoolConfig }:
  { schoolConfig : SchoolConfig }
) {
  return (
    <>
    <div className="index-hero-container">
      {/* Hero Image and Text */}
      <div className="hero-section">
        <img src={schoolConfig.banners.landing_banner} alt="Background" className="hero-image" />
        <div className="index-hero-text-block">
          <Stack gap={3}>
            <h1>Little Ram Pantries</h1>
            <p>{schoolConfig.blurb_1}</p>
            <p id="indexFillerText"> {schoolConfig.blurb_2} </p>
            <h3>Browse. Select. Eat. Repeat.</h3>
          </Stack>
        </div>
      </div>
      <IndexButtons />
    </div>
    </>
  );
}

export default Index;
