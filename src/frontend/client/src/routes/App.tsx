import useFetchData from '../hooks/useFetchData';
import Dashboard from '../components/Dashboard/Dashboard';
import Hero from '../components/Heros/AppHero';
import { SchoolConfig, PantryJson} from '../types/types';

const apiUrl = import.meta.env.VITE_API_URL;

interface AppProps {
  schoolConfig: SchoolConfig;
}

function App({ schoolConfig }: AppProps) {
  const { data: pantryData, loading, error } = useFetchData<PantryJson[]>(`${apiUrl}/pantries/${schoolConfig.short_name}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    <>
      <Hero schoolConfig={schoolConfig} />
      <Dashboard schoolConfig={schoolConfig} pantryData={pantryData || []} />
    </>
  );
}

export default App;
