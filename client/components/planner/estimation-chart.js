import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const EstimationChart = ({ estimation }) => {
  const [labels, setLabels] = useState([]);
  const [dev, setDev] = useState([]);
  const [qa, setQa] = useState([]);
  const [ba, setBa] = useState([]);

  const options = {
    responsive: true,
    legend: {
      display: true,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 10,
      },
    },
    type: "bar",
  };

  useEffect(() => {
    console.log(estimation);
    let _labels = [];
    let _dev = [];
    let _qa = [];
    let _ba = [];
    if (estimation.length > 0) {
      estimation.map((est) => {
        _labels.push(est.story);
        _dev.push(est.dev_estimation);
        _qa.push(est.qa_estimation);
        _ba.push(est.ba_estimation);
      });
      setLabels(_labels);
      setDev(_dev);
      setQa(_qa);
      setBa(_ba);
    }
  }, [estimation]);

  return (
    <Bar
      data={{
        labels: labels,
        datasets: [
          {
            label: "Development",
            backgroundColor: "#7bed9f",
            borderColor: "#7bed9f",
            borderWidth: 1,
            hoverBackgroundColor: "#2ed573",
            hoverBorderColor: "#2ed573",
            data: Array.from(dev),
          },
          {
            label: "QA",
            backgroundColor: "#ffa502",
            borderColor: "#ffa502",
            borderWidth: 1,
            hoverBackgroundColor: "#ff7f50",
            hoverBorderColor: "#ff7f50",
            data: Array.from(qa),
          },
          {
            label: "BA",
            backgroundColor: "#ff6b81",
            borderColor: "#ff6b81",
            borderWidth: 1,
            hoverBackgroundColor: "#ff4757",
            hoverBorderColor: "#ff4757",
            data: Array.from(ba),
          },
        ],
      }}
      width={null}
      height={280}
      options={options}
    />
  );
};

export default EstimationChart;
