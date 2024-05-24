import IndexButtons from '../components/LandingPage/IndexButtons/IndexButton.tsx';
import '../index.css';
import { SchoolConfig } from '../types/types.tsx';

function Index(
  { schoolConfig }:
  { schoolConfig : SchoolConfig }
) {
  return (
    <>
    <div className="relative w-full pt-[35%] mb-5">
      <div className="absolute top-0 left-0 w-full h-full object-cover">
        <img src={schoolConfig.banners.landing_banner} alt="landing page banner" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="index-hero-text-block md:block:left-17p md:block:w-30p">
            <h1>Little Ram Pantries</h1>
            <p className='hidden lg:block'>{schoolConfig.blurb_1}</p>
            <p className='hidden md:block' id="indexFillerText"> {schoolConfig.blurb_2} </p>
            <h3>Browse. Select. Eat. Repeat.</h3>
        </div>
      </div>
    </div>
      <IndexButtons />
    </>
  );
}

export default Index;
