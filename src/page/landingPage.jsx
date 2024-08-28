import LeftPanel from "../components/leftPanel";
import "./styles.scss";
import Cards from "../components/cards";

export default function LandingPage() {
    
  return (
    <div className="app-container">

      <div className="center-plate">
        {/* <button onClick={() => getUpcomingLaunches()}>hello</button> */}
        <LeftPanel/>
        <img className="bg-img" src="https://live.staticflickr.com/7706/26751237322_5a52540ea3_h.jpg"></img>
        <div className="background-img">
          {/* <button onClick={() => getPastLaunch()}>hello2</button>
          <button onClick={() => getLaunchpads()}>hello3</button> */}
       <Cards/>

        </div>
      </div>
    </div>
  );
}
