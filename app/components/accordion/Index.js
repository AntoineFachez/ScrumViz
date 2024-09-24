import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import UIContext from "../../context/UIContext";
import Accordion from "./Accordion";

export default function Index({
  accordionData,
  fields,
  setItemInFocus,
  styledComponent,
}) {
  const { images } = useContext(UIContext);

  return (
    <>
      {/* <Box style={styledComponent.widget}> */}
      <Accordion
        accordionData={accordionData}
        fields={fields}
        setItemInFocus={setItemInFocus}
        images={images}
        styledComponent={styledComponent}
      />
      {/* </Box> */}
    </>
  );
}
