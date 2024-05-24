import { useState } from 'react';
import { PantryJson, SchoolConfig } from '../../../types/types.tsx';

const assetUrl = import.meta.env.VITE_ASSET_URL;

function DashboardItem({
  pantryJson,
  onFavorite,
  isFavorited,
}: {
  schoolConfig: SchoolConfig;
  pantryJson: PantryJson;
  onFavorite: (publicKey: string) => void;
  isFavorited: boolean;
}) {
  const [showImage, setShowImage] = useState(false);
  const buttonText = showImage ? "See what's inside" : 'See more info';

  const handleButtonClick = () => {
    setShowImage(!showImage);
  };

  const handleFavoriteClick = () => {
    onFavorite(pantryJson.campus + ' ' + pantryJson.facility);
  };

  const imageSource = showImage
    ? `${assetUrl}/exterior/${pantryJson.pantry_exterior_url}`
    : `${assetUrl}/interior/${pantryJson.latest_contents_url}`;
  const imageAlt = showImage
    ? `Image of the contents of ${pantryJson.name}`
    : `An image of the exterior of ${pantryJson.name}`;

  const infoList = showImage ? (
    <ul className="info-list">
      <li>
        <b>Facility:</b> {pantryJson.facility}
      </li>
      <li>
        <b>Campus:</b> {pantryJson.campus}
      </li>
      <li>
        <b>Floor:</b> {pantryJson.floor}
      </li>
    </ul>
  ) : (
    <ul className="info-list">
      <li>
        <b>Pantry Name:</b> {pantryJson.name}
      </li>
      <li>
        <b>Open:</b> {pantryJson.hours}
      </li>
      <li>
        <b>Directions:</b> {pantryJson.directions}
      </li>
    </ul>
  );

  return (
    <div className="border-2 border-black rounded-lg overflow-hidden relative">
      <img
        className="relative z-0 border-b-2 border-black rounded-t-lg"
        src={imageSource}
        alt={imageAlt}
      />
      <div className="absolute top-2 left-2 z-10">
        <div className="favorite-star-button-border"></div>
        <button
          onClick={handleFavoriteClick}
          className={`favorite-star-button ${isFavorited ? 'favorite-active' : ''}`}
        />
      </div>
      <div className="relative z-10 p-4 bg-white">
        <div className="text-left bg-white">{infoList}</div>
      </div>
      <div className="p-0">
        <button
          onClick={handleButtonClick}
          className="bg-yellow-500 rounded-b-lg text-gray-800 w-full text-xl py-2 transition-colors duration-300 ease-in-out hover:bg-gray-700 hover:text-white"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default DashboardItem;
