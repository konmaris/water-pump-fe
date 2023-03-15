import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import moment from "moment/moment";

function App() {
  const [sensorData, setSensorData] = useState([]);

  async function getSensorData() {
    await axios
      .get("https://drab-plum-coati-wear.cyclic.app/api/pressure")
      .then((res) => {
        // console.log(res.data);
        // setSensorData(res.data);

        let sum = 0;
        res.data.forEach((x) => {
          sum += parseFloat(x.voltage);
        });

        const avg = sum / 100;
        // console.log({ avg });

        let arr = res.data.filter((val) => val.voltage - avg > 0);
        // console.log({ arr });

        setSensorData(arr);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    const interval = setInterval(getSensorData, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const sensorDataListItems = sensorData.map((x) => {
    const voltage = x.voltage;
    const offset = 0.48173;
    const maxPressure = 5.39;
    const pressure = (voltage - offset) * 250 - 100;
    const percentage = ((pressure.toFixed(2) / maxPressure) * 100).toFixed(2);
    const time = moment(x.createdAt).format("HH:mm:ss");

    return (
      <ListGroupItem key={x._id}>
        <strong>Voltage:</strong> {voltage} Volts
        <br />
        <strong>Pressure:</strong> {pressure.toFixed(2)} KPa
        <br />
        <strong>Percentage:</strong> {percentage}%
        <br />
        <strong>Time:</strong> {time}
      </ListGroupItem>
    );
  });

  return (
    <>
      <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="mb-4">Water Pump SB11</h1>
        <h5>
          Showing {sensorData.length} of 100 results from database. These were
          considered accurate.
        </h5>
        <ListGroup className="h-75 w-50" style={{ overflowY: "auto" }}>
          {sensorDataListItems}
        </ListGroup>
      </div>
    </>
  );
}

export default App;
