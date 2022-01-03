import { useEffect, useCallback, useState } from "react";
import registerService from "../../services/registerService";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./styles.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [graphQuantities, setGraphQuantities] = useState();
  const [graphVaccines, setGraphVaccines] = useState();
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalVaccines, setTotalVaccines] = useState(0);
  const [listPercentage, setListPercentage] = useState(0);
  const colorArray = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#B3B31A",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
  ];

  const fetchRegisters = useCallback(async () => {
    const response = await registerService.getDoses();
    if (response !== null) {
      let dataQuantities = response.data.quantities;

      const dataGraphQuantities = {
        labels: ["Dose Única", "Primeira Dose", "Segunda Dose"],
        datasets: [
          {
            label: "# Quantidades",
            data: [
              dataQuantities.single_dose,
              dataQuantities.first_dose,
              dataQuantities.second_dose,
            ],
            backgroundColor: colorArray.slice(0, 3),
            borderColor: colorArray.slice(0, 3),
            borderWidth: 1,
          },
        ],
      };

      setGraphQuantities(dataGraphQuantities);
      setTotalQuantities(dataQuantities.total);

      let dataVaccines = response.data.vaccines;
      let listNames = [];
      let listQuantities = [];
      let listPercentage = [];

      for (var [, value] of Object.entries(dataVaccines)) {
        listNames.push(value.name);
        listQuantities.push(value.quantity);
        listPercentage.push(value.percentage);
      }

      const dataGraphVaccines = {
        labels: listNames,

        datasets: [
          {
            label: "# Vacinas",
            data: listQuantities,
            backgroundColor: colorArray.slice(3, listNames.length + 3),
            borderColor: colorArray.slice(3, listNames.length + 3),
            borderWidth: 1,
          },
        ],
      };

      setTotalVaccines(response.data.total_vaccines);
      setListPercentage(listPercentage);
      setGraphVaccines(dataGraphVaccines);
    }
    //eslint-disable-next-line
  }, [
    setGraphQuantities,
    setTotalQuantities,
    setGraphVaccines,
    setTotalVaccines,
    setListPercentage,
  ]);

  useEffect(() => {
    (async () => fetchRegisters())();
  }, [fetchRegisters]);

  function DonutQuantities() {
    return graphQuantities ? (
      <div>
        <Doughnut
          data={graphQuantities}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
        {graphQuantities.datasets[0].borderColor.map((item, index) => (
          <div>
            <strong style={{ color: item }}>
              {graphQuantities.labels[index]}:
            </strong>
            <span>
              {" "}
              {graphQuantities.datasets[0].data[index]} (
              {Math.round(
                (graphQuantities.datasets[0].data[index] / totalQuantities) *
                  100
              )}
              %)
            </span>
          </div>
        ))}

        <strong>Total:</strong>
        <span> {totalQuantities}</span>
      </div>
    ) : (
      <></>
    );
  }

  function DonutVaccines() {
    return graphVaccines ? (
      <div>
        <Doughnut
          data={graphVaccines}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
        {listPercentage &&
          listPercentage.map((item, index) => (
            <div>
              <strong
                style={{ color: graphVaccines.datasets[0].borderColor[index] }}
              >
                {graphVaccines.labels[index]}:
              </strong>
              <span>
                {" "}
                {graphVaccines.datasets[0].data[index]} (
                {Math.round(item * 100)}%)
              </span>
            </div>
          ))}
        <div>
          <strong>Total:</strong>
          <span> {totalVaccines}</span>
        </div>
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div className="row-graph">
      <DonutQuantities />
      <DonutVaccines />
    </div>
  );
}
