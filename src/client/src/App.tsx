import { useEffect, useState } from "react";
import { api } from "../config";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import DashboardItem from "./components/DashboardItem/DashboardItem"

// import pantries from "./pantries.json";


function App() {
  const [pantryJson, setPantryJson] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get(api + "pantries_info.json")
      .then(function(response) {
        setPantryJson(response.data); // Update the pantryJson state with the API data
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="Dashboard-grid">
        {pantryJson.map((pantryJson) => (
          <div className="DashboardItems">
            <DashboardItem pantryJson={pantryJson} />
          </div>
          ))}
      </div>
    </>
  );
}

export default App;
