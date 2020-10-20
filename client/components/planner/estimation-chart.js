import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";

const useStyles = makeStyles({
  chart__total: {
    width: "100%",
    height: "6vh",
    borderRadius: "2px",
    margin: "4px auto",
    display: "flex",
    justifyContent: "space-around",
  },
  chart__all_total: {
    margin: "auto",
    width: "32%",
    height: "5vh",
    textAlign: "center",
    fontSize: "3.8vh",
    fontWeight: "bolder",
    borderRadius: "2px",
  },
  chart__dev_total: {
    backgroundColor: "#7bed9f",
  },
  chart__qa_total: {
    backgroundColor: "#ffa502",
  },
  chart__ba_total: {
    backgroundColor: "#ff6b81",
  },
});

const EstimationChart = ({ estimation }) => {
  const classes = useStyles();
  const [labels, setLabels] = useState([]);
  const [dev, setDev] = useState([]);
  const [qa, setQa] = useState([]);
  const [ba, setBa] = useState([]);
  const [devTotal, setDevTotal] = useState(0);
  const [qaTotal, setQaTotal] = useState(0);
  const [baTotal, setBaTotal] = useState(0);

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
    let _devTotal = 0;
    let _qaTotal = 0;
    let _baTotal = 0;
    if (estimation.length > 0) {
      estimation.map((est) => {
        _labels.push(est.story);
        _dev.push(est.dev_estimation);
        _qa.push(est.qa_estimation);
        _ba.push(est.ba_estimation);
        _devTotal += est.dev_estimation || 0;
        _qaTotal += est.qa_estimation || 0;
        _baTotal += est.ba_estimation || 0;
      });
      setLabels(_labels);
      setDev(_dev);
      setQa(_qa);
      setBa(_ba);
      setDevTotal(_devTotal);
      setQaTotal(_qaTotal);
      setBaTotal(_baTotal);
    }
  }, [estimation]);

  return (
    <div>
      <div className={classes.chart__total}>
        <span
          className={[classes.chart__dev_total, classes.chart__all_total].join(
            " "
          )}
        >
          {devTotal}
        </span>
        <span
          className={[classes.chart__qa_total, classes.chart__all_total].join(
            " "
          )}
        >
          {qaTotal}
        </span>
        <span
          className={[classes.chart__ba_total, classes.chart__all_total].join(
            " "
          )}
        >
          {baTotal}
        </span>
      </div>
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
        // width={null}
        // height={170}
        options={options}
      />
    </div>
  );
};

export default EstimationChart;
