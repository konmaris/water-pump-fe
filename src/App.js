import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SensorDataListGroup from "./SensorDataListGroup";

function App() {
  const [sensorData, setSensorData] = useState([]);

  async function getSensorData() {
    await axios
      .get("https://drab-plum-coati-wear.cyclic.app/api/pressure")
      .then((res) => {
        console.log(res.data);
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

  return (
    <>
      <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1>Water Pump SB11</h1>
        {/* <SensorDataListGroup></SensorDataListGroup> */}
        <pre className="w-75">{JSON.stringify(sensorData, null, 4)}</pre>
      </div>
    </>
  );
}

export default App;
