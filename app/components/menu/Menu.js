import React, { useContext } from 'react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
// import SearchContext from "../../context/SearchContext";
// import AutoCompleteTextField from '../auto-complete/Index';
import { Settings } from '@mui/icons-material';
import ToolTipComponent from '../tooltip/ToolTipComponent';

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
      {menuProps?.states?.showMenu && isOpen ? (
        <>
          {' '}
          <Box className="widgetMenuExpand" sx={styled?.widgetMenuExpand}>
            <IconButton
              sx={styled?.widgetSettingButton?.active}
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
            <Box
              className="widgetMenuButtonArray"
              sx={styled?.widgetMenuButtonArray?.vert}
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
                <>
                  <ToolTipComponent
                    i={i}
                    title={button?.props?.tooltip}
                    placement="right"
                    arrow={true}
                    content={button}
                  />
                </>
              ))}
            </Box>{' '}
          </Box>
          <Box
            className="widgetMenuButtonArray hor"
            sx={styled?.widgetMenuButtonArray?.hor}
            // sx={{
            //   position: 'absolute',
            //   top: 0,
            //   width: '100%',
            //   height: '2rem',
            //   display: 'flex',
            //   flexDirection: 'row',
            //   padding: '0 0rem 0 2rem',
            // }}
            // noValidate
            // autoComplete="off"
          >
            {horizontalArray?.map((item, i) => (
              <Box
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
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <>
          <Box className="widgetMenuCollapse" sx={styled?.widgetMenuCollapse}>
            <IconButton
              sx={styled?.widgetSettingButton?.inactive}
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
