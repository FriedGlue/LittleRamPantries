import useFetchData from '../hooks/useFetchData.tsx'; // adjust the path as needed
import Dashboard from '../components/Dashboard/Dashboard.tsx';
import Hero from '../components/Heros/AppHero.tsx';
import { SchoolConfig } from '../types/types.tsx';

// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = "https://api.littlerampantries.com"

function App(
  { schoolConfig }:
  { schoolConfig : SchoolConfig }) {

  const { data: pantryData, loading, error } = useFetchData(`${apiUrl}/get/${schoolConfig.short_name}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    <>
      <Hero schoolConfig={schoolConfig}/>
      <Dashboard schoolConfig={schoolConfig} pantryData={pantryData} />
    </>
  );
}

export default App;
