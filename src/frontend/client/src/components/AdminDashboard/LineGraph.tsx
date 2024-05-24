import { EChart } from '@kbox-labs/react-echarts';
import { format, parseISO } from 'date-fns'
import useFetchData from '../../hooks/useFetchData';

interface LineGraphProps {
    startDate: string;
    endDate: string;
}

interface UsageData {
    date: string;  // assuming date is in ISO format like "2021-01-01"
    count: number;
}

const LineGraph: React.FC<LineGraphProps> = ({ startDate, endDate }) => {
    const apiUrl = import.meta.env.VITE_API_URL + `/admin/${startDate}/${endDate}`;
    const { data, loading, error } = useFetchData<UsageData[]>(apiUrl);

    const xAxisData = data?.map(entry => format(parseISO(entry.date), "MM-dd"))
    const countData = data?.map(entry => entry.count)

    if (data) {
        return (
            <EChart
                renderer={'svg'}
                style={{
                    height: '600px',
                    width: '100%'
                }}
                xAxis={{
                    type: 'category',
                    data: xAxisData,
                    axisTick: {
                        show: false
                    }
                }}
                yAxis={{
                    type: 'value'
                }}
                tooltip={{
                    show: true,
                    trigger: 'axis'
                }}
                series={[
                {
                    data: countData,
                    type: 'line',
                    smooth: true,
                }
                ]}
          />
        )
    }

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    console.log(data)
};

export default LineGraph;
