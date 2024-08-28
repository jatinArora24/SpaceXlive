import { useEffect, useState } from "react";
import LeftPanel from "../components/leftPanel";
import { useDispatch, useSelector } from "react-redux";
import SimplePopup from "../components/popUpwindow";
export default function Rockets() {
  const dispatch = useDispatch();
  async function getRocketdata() {
    try {
      const response = await fetch(
        "https://api.spacexdata.com/v4/rockets/query",
        { method: "POST" }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: "ROCKETS", data: data });
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }
  useEffect(() => {
    getRocketdata();
  }, []);
  const data = useSelector((state) => state.rocekts1);
  const [popUp, setPopUp] = useState(false);
  const [rocket, setRocket] = useState({});

  console.log(data);
  function handleRocket(rocket) {
    setRocket(rocket);
    setPopUp(true);
    console.log(rocket);
  }

  return (
    <div className="app-container">
      <div className="center-plate">
        {/* <button onClick={() => getUpcomingLaunches()}>hello</button> */}
        <LeftPanel />
        <img
          className="bg-img"
          src="https://live.staticflickr.com/7706/26751237322_5a52540ea3_h.jpg"
        ></img>
        <div
          className="rocket-gallery"
          style={{ pointerEvents: popUp ? "none" : "" }}
        >
          {data?.docs?.map((rocket, index) => {
            return (
              <div key={index}>
                <div className="rocket">
                  {rocket.name}
                  <button
                    onClick={() => {
                      handleRocket(rocket);
                    }}
                    className="rocket-button"
                  >
                    <img src={rocket?.flickr_images[0]}></img>
                    <div
                      className={`status ${rocket.active ? "" : "inactive"}`}
                    >
                      STATUS
                      <span style={{ display: "block" }}>
                        {!rocket.active ? "In development" : "Active"}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SimplePopup active={popUp} setPopUp={setPopUp} rocket={rocket} />
    </div>
  );
}
