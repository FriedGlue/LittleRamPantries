import { SchoolConfig } from '../types/types.tsx';
import Histogram from '../components/AdminDashboard/Histogram.tsx';


function Admin (
    { schoolConfig }:
    { schoolConfig : SchoolConfig }) {

  return (
    <>
        <h1> hello {schoolConfig.short_name}</h1>
        <div className='Histogram'>
          <Histogram></Histogram>
        </div>
    </>
  );
}

export default Admin;



