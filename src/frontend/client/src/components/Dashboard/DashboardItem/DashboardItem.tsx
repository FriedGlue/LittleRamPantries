import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PantryJson, SchoolConfig } from '../../../types/types.tsx';
import './DashboardItem.css';

const assetUrl = import.meta.env.VITE_ASSET_URL;

function DashboardItem(
  { pantryJson, onFavorite, isFavorited }:
  { schoolConfig: SchoolConfig, pantryJson: PantryJson, onFavorite: (publicKey: string) => void, isFavorited: boolean } ) {

  const [showImage, setShowImage] = React.useState(false);
  const buttonText = showImage ?  "See what's inside" : "See more info";

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
      <li><b>Facility:</b> {pantryJson.facility}</li>
      <li><b>Campus:</b> {pantryJson.campus}</li>
      <li><b>Floor:</b> {pantryJson.floor}</li>
    </ul>
  ) : (
    <ul className="info-list">
      <li><b>Pantry Name:</b> {pantryJson.name}</li>
      <li><b>Open:</b> {pantryJson.hours}</li>
      <li><b>Directions:</b> {pantryJson.directions}</li>
    </ul>
  );

  return (
    <Card className="dashboard-item-card">
      <Card.Img src={imageSource} alt={imageAlt}/>
      <div className='favorite-star-button-border'></div>
      <Button
        onClick={handleFavoriteClick} 
        variant="light"
        className={`favorite-star-button ${isFavorited ? 'favorite-active' : ''}`}
      />
      <Card.Body>
        <Card.Text className="info-container">
          {infoList}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-grid">
        <Button onClick={handleButtonClick} variant="primary" className="btn-custom" size="lg">{buttonText}</Button>
      </Card.Footer>
    </Card>
  );
}

export default DashboardItem;
