import { useState } from 'react';
import { SchoolConfig } from '../types/types.tsx';
import Histogram from '../components/AdminDashboard/LineGraph.tsx';
import DateSelector from '../components/AdminDashboard/DateSelector.tsx';

function Admin(
  { schoolConfig }: { schoolConfig: SchoolConfig }
) {
  // Calculate the default start and end dates
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const formatDate = (date: Date) => date.toISOString().split('T')[0]; // Format as YYYY-MM-DD

  const defaultStartDate = formatDate(oneWeekAgo);
  const defaultEndDate = formatDate(today);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleDateChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <>
      <h1> Hello {schoolConfig.short_name}</h1>
      <div className='flex flex-col'>
        <DateSelector 
          onDateChange={handleDateChange}
          defaultStartDate={defaultStartDate}
          defaultEndDate={defaultEndDate}
        />
        <div className='flex-grow'>
          <Histogram startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </>
  );
}

export default Admin;
