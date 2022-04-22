import React, { Component, useState } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';

const Chart = () => {

    const [chartData, setChartData] = useState(
        {
            labels: ["a", "b", "c"],
            datasets: [
                {
                    label: "Entities",
                    data: [
                        100, 50, 25
                    ],
                    backgroundColor: [
                        'red', 'green', 'blue'
                    ]
                }
            ]
        }
    );

    return (
        <div className="chart">
            Charts

            <Bar
                data={chartData}
                options={{}}
                />
        </div>
    )
}

export default Chart;