import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface UsageData {
    date: string;  // assuming date is in ISO format like "2021-01-01"
    count: number;
}

const LineGraph: React.FC = () => {
    const [data, setData] = useState<UsageData[]>([]);
    const svgRef = useRef<SVGSVGElement>(null);

    // Mock data
    const mockData: UsageData[] = [
        { date: "2023-04-01", count: 10},
        { date: "2023-04-02", count: 20},
        { date: "2023-04-03", count: 50},
        { date: "2023-04-04", count: 12},
        { date: "2023-04-05", count: 450 },
        { date: "2023-04-06", count: 500 },
        { date: "2023-04-07", count: 420 },
        { date: "2023-04-08", count: 480 }
    ];

    // Simulate fetching data
    useEffect(() => {
        // Simulate a fetch delay
        setTimeout(() => {
            setData(mockData);
        }, 1000);
    });

    // D3 code to draw the line graph
    useEffect(() => {
        if (data.length > 0 && svgRef.current) {
            const svg = d3.select(svgRef.current);
            svg.selectAll("*").remove();  // Clear svg content before adding new elements

            const margin = { top: 20, right: 30, bottom: 30, left: 50 };
            const width = 800 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            const xExtent = d3.extent(data, d => new Date(d.date)) as [Date, Date];

            const x = d3.scaleTime()
                .domain(xExtent)
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.count) ?? 0])
                .range([height, 0]);

            const line = d3.line<UsageData>()
                .x(d => x(new Date(d.date)))
                .y(d => y(d.count));

            const g = svg.append('g')
                        .attr('transform', `translate(${margin.left},${margin.top})`);

            g.append('g')
            .call(d3.axisLeft(y));

            // Update the x-axis to only show days
            g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x)
                    .ticks(d3.timeDay.every(1)) // Ensuring a tick for every day
                    .tickFormat((d) => d3.timeFormat('%Y-%m-%d')(d as Date))); // Ensuring proper typecasting

            g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', line);
        }
    }, [data]);

    return (
        <svg ref={svgRef} width={800} height={400}></svg>
    );
};

export default LineGraph;