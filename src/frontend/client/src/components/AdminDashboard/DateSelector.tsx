import React, { useState, useEffect } from 'react';

interface DateSelectorProps {
  onDateChange: (startDate: string, endDate: string) => void;
  defaultStartDate: string;
  defaultEndDate: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange, defaultStartDate, defaultEndDate }) => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultStartDate && defaultEndDate) {
      onDateChange(defaultStartDate, defaultEndDate);
    }
  }, [defaultStartDate, defaultEndDate, onDateChange]);

  const validateDates = (newStartDate: string, newEndDate: string) => {
    if (newStartDate && newEndDate && newStartDate > newEndDate) {
      setError('Start date cannot be greater than end date');
      return false;
    }
    setError('');
    return true;
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (validateDates(newStartDate, endDate)) {
      onDateChange(newStartDate, endDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (validateDates(startDate, newEndDate)) {
      onDateChange(startDate, newEndDate);
    }
  };

  return (
    <div className='date-filters'>
      <label>
        Start Date:
        <input
          type='date'
          value={startDate}
          onChange={handleStartDateChange}
        />
      </label>
      <label>
        End Date:
        <input
          type='date'
          value={endDate}
          onChange={handleEndDateChange}
        />
      </label>
      {error && <div className='error'>{error}</div>}
    </div>
  );
};

export default DateSelector;
