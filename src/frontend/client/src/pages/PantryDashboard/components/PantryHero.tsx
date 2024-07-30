import { SchoolConfig } from '../../../types/types';

function PantryHero({ schoolConfig }: { schoolConfig: SchoolConfig }) {
  return (
    <div className="relative w-full pt-[25%] lg:pt-[30%] md:pt-[40%] overflow-hidden">
      <img
        src={schoolConfig.assets.dashboard_banner}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute h-auto top-1/2 right-[5%] md:right-[5%] lg:right-[10%] transform -translate-y-1/2 bg-[rgba(250,250,250,0.9)] text-black p-2 md:p-4 rounded-md max-w-[90%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[40%]">
        <div className="space-y-3">
          <h2 className="mb-[0.3rem] text-[20px] sm:text-[1.25rem] md:text-[20px] xl:text-[24px]">
            Favorites at Your Fingertips
          </h2>
          <p className="mb-[0.3rem] text-[20px] hidden md:block xl:text-[24px]">
            {schoolConfig.blurb_1}&nbsp;{schoolConfig.blurb_2}
          </p>
          <p className="mb-[0.3rem] text-[20px] hidden xl:block xl:text-[24px]">
            Spot a pantry you love? Simply click the star to favorite it, making
            it easier to find next time you're nearby.
          </p>
          <h3 className="mb-[0.3rem] text-[20px] sm:text-[1.25rem] md:text-[20px] xl:text-[24px]">
            Browse. Select. Eat. Repeat.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default PantryHero;
