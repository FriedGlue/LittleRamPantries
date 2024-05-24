import IndexButtons from './components/IndexButton.tsx';
import Stack from 'react-bootstrap/Stack';
import { SchoolConfig } from '../../types/types.tsx';

function LandingPage(
  { schoolConfig }:
  { schoolConfig : SchoolConfig }
) {
  return (
    <>
    <div className="relative w-full pt-[35%] mb-5">
      {/* Hero Image and Text */}
      <div className="absolute top-0 left-0 w-full h-full object-cover">
        <img src={schoolConfig.banners.landing_banner} alt="landing page banner" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="index-hero-text-block">
          <Stack gap={3}>
            <h1>Little Ram Pantries</h1>
            <p className='hidden lg:block'>{schoolConfig.blurb_1}</p>
            <p className='hidden xl:block' id="indexFillerText"> {schoolConfig.blurb_2} </p>
            <h3 className='hidden sm'>Browse. Select. Eat. Repeat.</h3>
          </Stack>
        </div>
      </div>
    </div>
      <IndexButtons />
    </>
  );
}

export default LandingPage;
