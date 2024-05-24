import { useState, useEffect, useCallback } from 'react';

interface DateSelectorProps {
  onDateChange: (startDate: string, endDate: string) => void;
  defaultStartDate: string;
  defaultEndDate: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  onDateChange,
  defaultStartDate,
  defaultEndDate,
}) => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [error, setError] = useState('');

  // Memoize the onDateChange callback to avoid unnecessary re-renders
  const memoizedOnDateChange = useCallback(onDateChange, [onDateChange]);

  useEffect(() => {
    if (defaultStartDate && defaultEndDate) {
      memoizedOnDateChange(defaultStartDate, defaultEndDate);
    }
  }, [defaultStartDate, defaultEndDate, memoizedOnDateChange]);

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
      memoizedOnDateChange(newStartDate, endDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (validateDates(startDate, newEndDate)) {
      memoizedOnDateChange(startDate, newEndDate);
    }
  };

  return (
    <div className="mr-5">
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={handleStartDateChange} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </label>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default DateSelector;
