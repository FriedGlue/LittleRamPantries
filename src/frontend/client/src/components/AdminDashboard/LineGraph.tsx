import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
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
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (data && data.length > 0 && svgRef.current) {
            const svg = d3.select(svgRef.current);
            svg.selectAll("*").remove();  // Clear svg content before adding new elements

            const margin = { top: 20, right: 30, bottom: 30, left: 50 };
            const width = 1200 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            const xExtent = d3.extent(data, d => new Date(d.date)) as [Date, Date];

            const x = d3.scaleTime()
                .domain(xExtent)
                .range([0, width])
                .nice();

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.count) ?? 0])
                .range([height, 0])
                .nice();

            const line = d3.line<UsageData>()
                .x(d => x(new Date(d.date)))
                .y(d => y(d.count));

            const g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            g.append('g')
                .call(d3.axisLeft(y));

            g.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x)
                    .ticks(d3.timeDay.every(1))
                    .tickFormat((d) => d3.timeFormat('%m-%d')(d as Date)));

            g.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-width', 1.5)
                .attr('d', line);
        }
    }, [data]);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <svg ref={svgRef} width={1200} height={400}></svg>
    );
};

export default LineGraph;
