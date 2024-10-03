import React, { useContext } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
// import SearchContext from "../../context/SearchContext";
// import AutoCompleteTextField from '../auto-complete/Index';
import { Settings } from '@mui/icons-material';

export default function Menu({
  menuProps,
  isOpen,
  setIsOpen,
  verticalArray,
  horizontalArray,
  isFiltered,
  onResetFiltered,
  styled,
}) {
  return (
    <>
      <Paper
        sx={{
          position: 'absolute',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            ...styled?.textBody,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          variant={styled?.textBody?.variant}
        >
          {menuProps?.states?.widgetProps?.collection}
        </Typography>
      </Paper>

      {menuProps.states.showMenu && isOpen ? (
        <>
          {' '}
          <Paper className="widgetMenuExpand" sx={styled?.widgetMenuExpand}>
            <IconButton
              sx={{
                ...styled?.navBarButton?.active,
                width: '2rem',
                height: '2rem',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={() => {
                setIsOpen(true);
                return menuProps.functions.handleShowMenu(true);
              }}
              // onMouseEnter={() => setIsOpen(true)}
              // onMouseLeave={() =>
              //   setTimeout(() => menuProps.functions.handleShowMenu(false), 0)
              // }
            >
              <Settings />
            </IconButton>{' '}
            <Paper
              className="widgetMenuButtonArray"
              sx={{
                ...styled?.navBarButtonList,
                flexFlow: 'column nowrap',
                // backgroundColor: 'transparent',
              }}
              onMouseEnter={() => {
                setIsOpen(true);
                menuProps.functions.handleShowMenu(true);
                return;
              }}
              onMouseLeave={() =>
                setTimeout(() => {
                  setIsOpen(false);
                  menuProps.functions.handleShowMenu(false);
                }, 0)
              }

              // onMouseLeave={() => setTimeout(() => setIsOpen(false), 0)}
            >
              {verticalArray?.map((button, i) => (
                <Tooltip
                  key={i}
                  title={button?.props?.tooltip}
                  placement="right"
                >
                  {button}
                </Tooltip>
              ))}
            </Paper>{' '}
          </Paper>
          <Paper
            className="widgetMenuButtonArray hor"
            sx={{
              ...styled?.widgetMenuButtonArray.hor,
            }}
          >
            {horizontalArray?.map((item, i) => (
              <Paper
                // sx={styled?.widgetMenuButtonArrayElement}
                sx={{
                  width: '100%',
                  // height: "2rem",
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  margin: 0,
                  // padding: "2px 0 0 0",
                  '& >*': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    margin: 0,
                    padding: 0,
                  },
                  '& .MuiFormControl-root,.MuiTextField-root, .MuiInputBase-input, .MuiOutlinedInput-input':
                    {
                      height: '100%',
                      // display: "flex",
                      justifyContent: 'center',
                      alignItems: 'center',
                      // margin: "3px 0 0 0",
                      padding: '0 0.2rem 0 0.2rem',
                    },
                }}
                key={i}
              >
                {item}
              </Paper>
            ))}
          </Paper>
        </>
      ) : (
        <>
          <Box className="widgetMenuCollapse" sx={styled?.widgetMenuCollapse}>
            <IconButton
              sx={{
                ...styled?.navBarButton?.inactive,
                width: '2rem',
                height: '2rem',
              }}
              onMouseEnter={() => {
                setIsOpen(true);
                return menuProps.functions.handleShowMenu(true);
              }}
            >
              <Settings />
            </IconButton>
          </Box>
        </>
      )}
    </>
  );
}
