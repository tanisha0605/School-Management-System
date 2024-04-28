import React, { Fragment, useState } from "react";
import { AgChartsReact } from "ag-charts-react";

export const BarChart = (data) => {
    function getData() {
        return [
          {
            quarter: "Q1'18",
            SalaryofTeachers: 14,
            FeesReceived: 16,
            ProfitEarned: 14,
          }
        ];
      }
  const [options, setOptions] = useState({
    title: {
      text: "Profit by Month",
    },
    subtitle: {
      text: "In Rupees",
    },
    data: getData(),
    series: [
      {
        type: "bar",
        xKey: "quarter",
        yKey: "SalaryofTeachers",
        yName: "Salary of Teachers",
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "FeesReceived",
        yName: "Fees Received",
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "ProfitEarned",
        yName: "Profit Earned",
      }
    ],
  });

  return <AgChartsReact options={options} />;
};
