import { useEffect, useState } from 'react';
import DashboardItem from './DashboardItem/DashboardItem.tsx';
import { PantryJson, SchoolConfig } from '../../types/types.tsx';

const Dashboard = (
  { schoolConfig, pantryData }:
  { schoolConfig: SchoolConfig, pantryData: PantryJson[] } ) => {

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const localStorageFavorites = localStorage.getItem('favorites');
      return localStorageFavorites ? JSON.parse(localStorageFavorites) : [];
    } catch (error) {
      console.error('Error reading favorites from Local Storage:', error);
      return [];
    }
  });

  useEffect(() => {
    // Read favorites from Local Storage when the component mounts
    const localStorageFavorites = localStorage.getItem('favorites');
    if (localStorageFavorites) {
      setFavorites(JSON.parse(localStorageFavorites));
    }
  }, []);

  useEffect(() => {
    // Write favorites to Local Storage whenever the favorites state changes
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (publicKey: string) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(publicKey) 
        ? prevFavorites.filter(key => key !== publicKey)
        : [publicKey, ...prevFavorites];
      return newFavorites;
    });
  };

  const sortedPantryData = [...pantryData].sort((a, b) => {
    const isAFavorited = favorites.includes(a.campus + ' ' + a.facility);
    const isBFavorited = favorites.includes(b.campus + ' ' + b.facility);
    return isAFavorited === isBFavorited ? 0 : isAFavorited ? -1 : 1;
  });

return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 auto-rows-auto gap-y-8 gap-x-3 md:grid-cols-3 md:gap-x-10 sm:grid-cols-2 sm:gap-y-16 ">
        {sortedPantryData.map((item) => (
            <DashboardItem 
                schoolConfig={schoolConfig}
                key={item.campus + ' ' + item.facility} 
                pantryJson={item} 
                onFavorite={handleFavorite} 
                isFavorited={favorites.includes(item.campus + ' ' + item.facility)}
            />
        ))}
    </div>
);

};

export default Dashboard;
