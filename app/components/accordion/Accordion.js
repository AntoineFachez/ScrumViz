import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import "./accordion.scss";
import { ExpandLess } from "@mui/icons-material";

export default function AccordionComponent({
  accordionData,
  fields,
  setItemInFocus,
  styledComponent,
}) {
  const [activePanel, setActivePanel] = useState(null);
  const listHeight = "3rem";
  const fieldShortCut = "eventName";
  // console.log(
  //   "accordionData",
  //   `${accordionData[0]?.[fields?.dataClass]?.[fieldShortCut]}`,
  // );
  // console.log("accordionData", accordionData, fields);
  const handleSelectActivePanel = (e, i, item, id) => {
    e.preventDefault();
    // console.log("accordion", i);
    // accordion?.addEventListener("click", (e) => {
    const activatePanel = e.target.closest(".accordion-panel");
    // console.log("clicked");
    if (!activatePanel) return;
    // setItemInFocus(`${item?.[fields?.dataClass]?.[fields?.id]}`);
    setItemInFocus(item);
    setActivePanel(activatePanel);
    togglePanel(i, activatePanel);
    // });
  };
  const togglePanel = (i, chosenPanel) => {
    const accordion = document.querySelector(".accordion");
    const panels = accordion.querySelectorAll(".accordion-panel");

    // console.log("accordion", panels);

    const expandedPanel = accordion.getElementsByClassName(
      "accordion-panel-expanded",
    )[i];
    // console.log(expandedPanel);

    // console.log("panels", panels);
    panels.forEach((panel) => {
      panel?.classList.remove("accordion-panel-expanded");
      panel?.classList.add("accordion-panel-collapsed");
    });
    if (chosenPanel !== expandedPanel) {
      chosenPanel?.classList.add("accordion-panel-expanded");
      chosenPanel?.classList.remove("accordion-panel-collapsed");
    }
  };
  useEffect(() => {
    // console.log("activePanel", activePanel);
    return () => {};
  }, [activePanel]);
  return (
    <Box
      sx={{
        width: "fit-content",
        // height: `calc(${100 - parseInt(listHeight)})%`,
        height: `calc(${100 - parseInt(listHeight)}%)`,
        display: "flex",
        flexFlow: "row wrap",
        flexShrink: 2,
        flexGrow: 2,
        justifyContent: "space-between",
        // alignContent: "stretch",
        overflowY: "auto",
        gap: 1,
      }}
    >
      {accordionData?.map((item, i) => {
        return (
          <Accordion
            key={i}
            id={`accordion-panel${i}`}
            className="accordion"
            onClick={(e) => {
              handleSelectActivePanel(
                e,
                i,
                item,
                `${item?.[fields?.dataClass]?.[fields?.id]}`,
              );
            }}
            sx={{
              zIndex: 15,
              position: "relative",
              // maxWidth: "40ch",
              // width: "fit-content",
              flexShrink: 2,
              flexGrow: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: "0.5rem",
              backgroundColor: "rgba(25,25,25,0.5)",
              borderRadius: "10px",
              border: "1px solid #555",
            }}
            // className={`accordion-panel-collapsed accordion-panel`}

            // aria-controls={`panel${i}-content`}
            // aria-expanded="false"
          >
            <AccordionSummary
              sx={{
                // zIndex: 15,
                position: "relative",
                width: "fit-content",
                // width: "30%",
                height: "100%",

                // display: "flex",
                // flexShrink: 2,
                // flexGrow: 2,
                // flexDirection: "row",
                // justifyContent: "flex-start",
                // alignItems: "flex-start",
                // padding: "0.5rem",
                backgroundColor: "rgba(80,80,80,0.5)",
                // borderRadius: "10px",
                // border: "1px solid #555",
              }}
            >
              {/* <ExpandMoreIcon sx={{ zIndex: 1 }} /> */}
              {item?.[fields?.dataClass]?.[fields?.imageUrl] && (
                <img
                  style={{
                    zIndex: "0",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    objectFit: "cover",
                    border: 0,
                  }}
                  src={`${item?.[fields?.dataClass]?.[fields?.imageUrl]}`}
                  alt=""
                />
              )}
              {/* {`accordion-panel${i}` ? <ExpandLess /> : <ExpandMoreIcon />} */}
              <Box
                id={`accordion-panel-select-btn-${i}`}
                className="accordion-trigger accordion-panel-select-btn"
                // aria-controls={`panel${i}-content`}
                aria-controls={`accordion-panel${i}`}
                aria-expanded="false"
                // id={`panel${i}-title`}
                // className={`panel-title`}
                sx={{
                  width: "100%",
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  // border: "none",
                }}
              >
                <Typography
                  variant="p"
                  id={`panel${i}-heading`}
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    alignItems: "flex-start",
                    border: "none",
                  }}
                >
                  {`${item?.[fields?.dataClass]?.[fields?.heading]}`}
                </Typography>
                {/* <img
                  // className="accordion-image"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    objectFit: "cover",
                  }}
                  src={`${item?.[fields?.dataClass]?.[fields?.imageUrl]}`}
                  alt=""
                  // alt={`${
                  //   item?.[fields?.dataClass]?.[fields?.imageDescription]
                  // }`}
                  // style={styledComponent?.imageAbsoluteFullSpace}
                />{" "} */}
              </Box>
            </AccordionSummary>
            <AccordionDetails
              className="accordion-content"
              id="panel1-content"
              aria-hidden="false"
              aria-labelledby="panel1-heading"
              role="region"
              // sx={{ width: "100%" }}
            >
              <Typography
                className="accordion-content-text"
                variant="p"
                style={{
                  //   zIndex: 20,
                  width: "100%",
                  height: "fit-content",
                  textAlign: "left",
                  color: "white",
                  // border: "none",
                  // backgroundColor: "pink",
                }}
              >
                <p className="" variant="p">
                  {/* {`${item?.[fields?.dataClass]?.[fields?.subHeading]}`}
                  <br /> */}
                  {`${item?.[fields?.dataClass]?.[fields?.content]}`}
                </p>{" "}
              </Typography>
              {/* <Box className="accordion-image">
                <img
                  style={{ width: "100%", objectFit: "cover" }}
                  src={`${item?.[fields?.dataClass]?.[fields?.imageUrl]}`}
                  alt=""
                  // alt={`${
                  //   item?.[fields?.dataClass]?.[fields?.imageDescription]
                  // }`}
                  // style={styledComponent?.imageAbsoluteFullSpace}
                />{" "}
              </Box> */}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
