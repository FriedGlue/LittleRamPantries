import { useNavigate } from 'react-router-dom';

const IndexButtons = () => {
  const navigate = useNavigate();

  const navigateToPantry = () => {
    navigate('./pantries');
  };

  const navigateToBlog = () => {
    window.open(
      'https://news.vcu.edu/article/2021/10/little-ram-pantries-will-provide-emergency-food-assistance-to-vcu-students'
    );
  };

  return (
    <div className="z-10 w-full my-4">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="md:w-1/3 p-2">
          <button
            className="w-full bg-vcu-gold text-black text-lg py-3 px-6 rounded md:py-4 md:px-8 md:text-xl"
            onClick={navigateToPantry}
          >
            View The Pantries
          </button>
        </div>
        <div className="md:w-1/3 p-2">
          <button
            className="w-full bg-gray-500 text-white text-lg py-3 px-6 rounded md:py-4 md:px-8 md:text-xl"
            onClick={navigateToBlog}
          >
            Learn Our Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndexButtons;
