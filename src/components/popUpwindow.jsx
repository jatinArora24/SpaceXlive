import * as React from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/system";
import Carousel from "react-material-ui-carousel";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function SimplePopup(props) {
  const [screen, setScreen] = React.useState("overview");
  const id = props.active ? "simple-popper" : undefined;
  const anchor = document.getElementsByClassName("app-container")[0];
  console.log(anchor);
  return (
    <div>
      <BasePopup id={id} open={props.active} anchor={null}>
        <PopupBody>
          <button
            title="Close"
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => {
              props.setPopUp(false);
              props.setRocketNo(0);
              setScreen("overview");
            }}
          >
            X
          </button>
          <div className="popup-wrapper">
            <div>
              {props.rocket.name}
              <button
                className={`popupbtn ${screen === "overview" ? "active" : ""}`}
                onClick={() => setScreen("overview")}
              >
                Overview
              </button>
              <button
                className={`popupbtn ${screen === "photos" ? "active" : ""}`}
                onClick={() => setScreen("photos")}
              >
                Photos
              </button>
            </div>
            <div className="popup-content">
              {screen === "overview" ? (
                <div
                  style={{
                    height: "727px",
                    width: "1000px",
                    display: "flex",
                    gap: "10px",
                    borderRadius: "15px",
                  }}
                >
                  <img
                    className="rocket-img"
                    src={props?.rocket?.flickr_images}
                  />
                  <div className="desc-pop">
                    <h3>DESCRIPTION</h3>
                    <div>{props.rocket?.description}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <Carousel
                    sx={{ width: "1000px" }}
                    navButtonsAlwaysVisible
                    animation="slide"
                    duration={700}
                    height={700}
                  >
                    {props.rocket?.flickr_images?.map((item, i) => {
                      return (
                        <div>
                          <img
                            className="carosel-img"
                            key={i}
                            srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              )}
            </div>
          </div>
        </PopupBody>
      </BasePopup>
    </div>
  );
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};
const BasePopUp = styled(BasePopup)({
  position: "static",
});

const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
  position: static;
`
);

const Button = styled("button")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`
);
