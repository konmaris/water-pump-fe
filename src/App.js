import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SensorDataListGroup from "./SensorDataListGroup";
import { ListGroupItem } from "react-bootstrap";
import moment from "moment/moment";

function App() {
  const [sensorData, setSensorData] = useState([]);

  async function getSensorData() {
    await axios
      .get("https://drab-plum-coati-wear.cyclic.app/api/pressure")
      .then((res) => {
        // console.log(res.data);
        setSensorData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      await getSensorData();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const sensorDataListItems = sensorData.map((x) => {
    const voltage = x.voltage;
    const offset = 0.4784;
    const maxPressure = 5.4;
    const pressure = (voltage - offset) * 250 - 100;
    const percentage = ((pressure / maxPressure) * 100).toFixed(2);

    return (
      <ListGroupItem key={x._id}>
        Voltage: {voltage} Volts
        <br />
        Pressure: {pressure} KPa
        <br />
        Percentage: {percentage}%
        <br />
        Time: {moment(x.time).format("hh:mm:ss")}
      </ListGroupItem>
    );
  });

  return (
    <>
      <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1>Water Pump SB11</h1>
        <SensorDataListGroup>{sensorDataListItems}</SensorDataListGroup>
      </div>
    </>
  );
}

export default App;
