import IndexButtons from './components/IndexButton.tsx';
import { SchoolConfig } from '../../types/types.tsx';

function LandingPage({ schoolConfig }: { schoolConfig: SchoolConfig }) {
  return (
    <>
      <div className="relative w-full pt-[35%] mb-5">
        {/* Hero Image and Text */}
        <div className="absolute top-0 left-0 w-full h-full object-cover">
          <img
            src={schoolConfig.banners.landing_banner}
            alt="landing page banner"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute h-auto top-1/2 left-[5%] md:left-[10%] transform -translate-y-1/2 bg-[rgba(250,250,250,0.9)] text-black p-4 md:p-6 rounded-md max-w-[90%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[40%] space-y-3">
            <h1 className="mb-[0.3rem] text-[24px] sm:text-[1.5rem] md:text-[24px] xl:text-[28px]">
              Little Ram Pantries
            </h1>
            <p className="hidden xl:block mb-[0.3rem] text-[20px] xl:text-[24px]">
              {schoolConfig.blurb_1}
            </p>
            <p
              className="hidden lg:block mb-[0.3rem] text-[20px] xl:text-[24px]"
              id="indexFillerText"
            >
              {schoolConfig.blurb_2}
            </p>
            <h3 className="mb-[0.3rem] text-[20px] sm:text-[1.25rem] md:text-[20px] xl:text-[24px]">
              Browse. Select. Eat. Repeat.
            </h3>
          </div>
        </div>
      </div>
      <IndexButtons />
    </>
  );
}

export default LandingPage;
