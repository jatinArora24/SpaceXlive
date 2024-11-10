import { useEffect, useState } from "react";
// import { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LinksImages from "./linksImages";
import RocketLogo from "./rocketLogo";
import CrewImg from "./crewImg";
import Starlink from "./starlink";
export default function Cards() {
  async function getStarlink() {
    try {
      const response = await fetch(
        "https://api.spacexdata.com/v4/starlink/query",
        { method: "POST" }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: "STARLINK", data: data });
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }
  async function getAPI(link, type) {
    try {
      const response = await fetch(link);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: type, data: data });
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  const dispatch = useDispatch();
  const data = useSelector((state) => state.upcomingLaunches1);
  //const data3 = [{}];
  const data2 = useSelector((state) => state.launchpad);
  const data3 = useSelector((state) => state.pastlaunch);
  const data4 = useSelector((state) => state.starlink);

  console.log(data2);
  useEffect(() => {
    getAPI("https://api.spacexdata.com/v3/launchpads?limit=3", "LAUNCHPAD");
    getAPI("https://api.spacexdata.com/v3/launches/upcoming", "UPDATE");
    getAPI("https://api.spacexdata.com/v4/launches/latest", "PASTLAUNCH");
    getStarlink();
  }, []);
  useEffect(() => {
    let increment = 0;

    if (Object.keys(data).length !== 0) {
      increment += 25;
    }
    if (Object.keys(data2).length !== 0) {
      increment += 25;
    }
    if (Object.keys(data3).length !== 0) {
      increment += 25;
      resolveRocket(data3.rocket);
    }
    if (Object.keys(data4).length !== 0) {
      increment += 25;
    }

    setPercentage(increment);
  }, [data, data2, data3, data4]);
  const [percentage, setPercentage] = useState(0);
  const [rocketId, setRocketId] = useState(0);

  function formatDate(date1) {
    const date = new Date(date1);

    const optionsDate = { month: "short", day: "2-digit" };
    const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };

    const formattedDate = date.toLocaleDateString("en-US", optionsDate);
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

    return `${formattedDate}, ${formattedTime}`;
  }
  async function resolveRocket(id) {
    try {
      const response = await fetch(
        `https://api.spacexdata.com/v4/rockets/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to get rocket", response.status);
      }
      const data = await response.json();
      setRocketId(data.name);
      return data.name;
    } catch (error) {
      setRocketId(0);
      console.error(error);
      // return null
    }
  }

  return (
    <>
      {Object.keys(data).length === 0 ? (
        <div
          style={{
            width: "200px",
            height: "200px",
            position: "absolute",
            margin: "330px",
          }}
        >
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
      ) : (
        <>
          <div>
            <article>
              <h3 className="title">Upcoming Launch</h3>
              <div className="content-wrapper">
                <div className="left-div">
                  <div className="content-container">
                    <h4 className="content-type">MISSION NAME</h4>
                    <p className="content">{data[0]?.mission_name}</p>
                  </div>
                  <div className="content-container">
                    <h4 className="content-type">Rocket</h4>
                    <p className="content">{data[0]?.rocket.rocket_name}</p>
                  </div>
                  <div className="content-container">
                    <h4 className="content-type">Flight number</h4>
                    <p className="content">{data[0]?.flight_number}</p>
                  </div>
                  <div className="content-container">
                    <h4 className="content-type">Time(utc)</h4>
                    <p className="content">
                      {formatDate(data[0]?.launch_date_utc)}
                    </p>
                  </div>
                  <div className="content-container">
                    <h4 className="content-type">Links</h4>
                    <div className="content">
                      <LinksImages />
                    </div>
                  </div>
                </div>
                <div className="right-div">
                  <div className="content-container">
                    <h4 className="content-type">Rocket logo</h4>
                    <p className="content">
                      <RocketLogo url={data[0]?.links?.mission_patch_small} />
                    </p>
                  </div>
                  <div className="content-container">
                    <h4 className="content-type">launchpad</h4>
                    <p className="content">{data[0].launch_site.site_name}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div>
            <article>
              <h3>Launch facilities</h3>
              <div className="weather-article">
                {data2?.map((base, index) => {
                  return (
                    <div key={index}>
                      <div className={`weather-bg w${index}`}>
                        <div className="upper-wrapper">
                          <div className="content-container">
                            <p className="content">{base?.location?.name}</p>
                            <h4 className="content-type">{base?.name}</h4>
                          </div>
                          <div className="content-container u2">
                            <p className="content">{base?.location?.region}</p>
                            <h4 className="content-type u2">region</h4>
                          </div>
                        </div>
                        <div className="lower-wrapper">
                          <div className="content-container">
                            <p className="content">{"TEMP "}</p>
                            <h4 className="content-type">
                              {index + 30 + "°C"}
                            </h4>
                          </div>
                          <div className="content-container l2">
                            <p className="content">{"WEATHER "}</p>
                            <h4 className="content-type">{"clear"}</h4>
                          </div>
                          <div className="content-container l3">
                            <p className="content">{"WIND"}</p>
                            <h4 className="content-type">
                              {index + 5 + "m/s"}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          </div>
          <div>
            <article>
              <h3 className="title">Previous launch</h3>
              <div className="content-wrapper">
                <div className="left-div">
                  <div className="content-container">
                    <h4 className="content-type">MISSION NAME</h4>
                    <p className="content">{data3?.name}</p>
                  </div>
                  <div className="content-container">
                    <h4 className="content-type">Rocket</h4>
                    <div className="content">{rocketId}</div>
                  </div>
                  <div className="content-container">
                    <h4 className="content-type">Flight number</h4>
                    <p className="content">{data3.flight_number}</p>
                  </div>
                  <div className="content-container">
                    <h4 className="content-type">Time(utc)</h4>
                    <p className="content">{formatDate(data3?.date_utc)}</p>
                  </div>
                  <div className="content-container">
                    <h4 className="content-type">Links</h4>
                    <div className="content">
                      <LinksImages />
                    </div>
                  </div>
                </div>
                <div className="right-div">
                  <div className="content-container">
                    <h4 className="content-type">Mission patch</h4>
                    <p className="content">
                      <RocketLogo url={data3?.links?.patch?.small} />
                    </p>
                  </div>
                  <div className="content-container">
                    <h4 className="content-type">crew</h4>
                    <div className="content">
                      {data3?.crew?.map((i) => {
                        return (
                          <div key={i}>
                            <CrewImg />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div>
            <article style={{}}>
              <h3>Starlink</h3>
              <Starlink />
              <div>
                There are currently {data4?.totalDocs} active Starlink
                satellites on the low Earth orbit.
              </div>
            </article>
          </div>
        </>
      )}
    </>
  );
}
