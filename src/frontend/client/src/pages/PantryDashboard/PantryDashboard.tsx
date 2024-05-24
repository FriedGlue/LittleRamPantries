import useFetchData from '../../hooks/useFetchData';
import Dashboard from './components/Dashboard';
import PantryHero from './components/PantryHero';
import { SchoolConfig, PantryJson } from '../../types/types';

const apiUrl = import.meta.env.VITE_API_URL;

interface AppProps {
  schoolConfig: SchoolConfig;
}

function PantryDashboard({ schoolConfig }: AppProps) {
  const {
    data: pantryData,
    loading,
    error,
  } = useFetchData<PantryJson[]>(
    `${apiUrl}/pantries/${schoolConfig.short_name}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    <>
      <PantryHero schoolConfig={schoolConfig} />
      <Dashboard schoolConfig={schoolConfig} pantryData={pantryData || []} />
    </>
  );
}

export default PantryDashboard;
