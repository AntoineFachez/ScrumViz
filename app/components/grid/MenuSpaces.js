import { Box, Button } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ArrowBack, ArrowForward, PreviewOutlined } from '@mui/icons-material';
export default function MenuSpaces({
  direction,
  showPaneMenu,
  // handleSetPervNextWidget,
  handleCloseSpace,
  styled,
}) {
  return (
    <>
      {showPaneMenu && (
        <Box sx={styled?.widgetMenuButtonArray.hor} className="menuSpaces">
          <Button
            sx={styled?.iconButton}
            // onClick={(e) => handleSetPervNextWidget(-1)}
          >
            <ArrowBack />
          </Button>
          <Button
            sx={styled?.iconButton}
            // onClick={(e) => handleSetPervNextWidget(1)}
          >
            <ArrowForward />
          </Button>
          <Button
            sx={styled?.iconButton}
            onClick={(e) => handleCloseSpace(e, direction)}
          >
            <CloseIcon />
          </Button>
        </Box>
      )}
    </>
  );
}
