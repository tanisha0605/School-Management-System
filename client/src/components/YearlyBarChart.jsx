import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";

const YearlyBarChart = ({ sum, fees }) => {
  let profit = 0; // Initialize profit variable

  // Calculate profit based on fees and sum
  if (fees >= sum) {
    profit = fees - sum;
  } else {
    profit = sum - fees;
  }
  //console.log(profit);
  const [options, setOptions] = useState({
    title: {
      text: "Profit Analysis",
    },
    subtitle: {
      text: "In Rupees",
    },
    data: [{
      quarter: "Total",
      SalaryofTeachers: 12*sum,
      FeesReceived: 12*fees,
      ProfitEarned: 12*profit,
    }],
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

export default YearlyBarChart;