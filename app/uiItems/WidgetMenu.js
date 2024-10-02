import { IconButton, TextField } from '@mui/material';
import {
  AccountTree,
  CloseFullscreen,
  FilterList,
  Grain,
  GridView,
  OpenInFull,
  SearchOutlined,
  Summarize,
} from '@mui/icons-material';
import Menu from '../components/menu/Index';
import { themeSettings } from '@/app/theme/ThemeContext';
import { Fragment } from 'react';
import { buttonData } from './widgetMenuButtonData';

export default function WidgetMenu({
  widget,
  widgetProps,
  menuProps,
  handleSelectWidgetContext,
  setSelectedWidgetContext,
  searchString,
  selectedWidgetContext,
  handleSearchTermChange,
  handleSearch,
  // buttonData,
}) {
  const { palette, styled } = themeSettings('dark');

  const renderedButtons = (buttonDataToRender) => {
    return buttonDataToRender.map((buttonData, index) => {
      // if (buttonData.state === 'table') {
      //   // Special case for 'table' button with expansion
      //   return (
      //     <>

      //     <Fragment key={index}>
      //       {' '}
      //       {/* Fragment to group multiple elements */}
      //       <IconButton
      //         toolTip={buttonData.state}
      //         sx={
      //           selectedWidgetContext === 'table'
      //             ? styled?.widgetMenuButton?.active
      //             : styled?.widgetMenuButton?.inactive
      //         }
      //         onClick={() =>
      //           handleSelectWidgetContext(
      //             widget,
      //             widgetProps,
      //             setSelectedWidgetContext,
      //             'table'
      //           )
      //         }
      //       >
      //         {buttonData.icon} {/* Use the icon from buttonData */}
      //       </IconButton>
      //       {selectedWidgetContext === 'table' ? (
      //         <IconButton
      //           toolTip={buttonData.state}
      //           onClick={() => setIsExpandedTable((prev) => !prev)}
      //           sx={styled?.widgetMenuButton?.inactive}
      //         >
      //           {isExpandedTable ? <CloseFullscreen /> : <OpenInFull />}
      //         </IconButton>
      //       ) : null}
      //     </Fragment>
      //     </>
      //   );
      // } else {
      // Standard button rendering
      return (
        <IconButton
          tooltip={buttonData.state}
          key={buttonData.state} // Use state as the key
          sx={
            selectedWidgetContext === buttonData.state
              ? styled?.widgetMenuButton?.active
              : styled?.widgetMenuButton?.inactive
          }
          onClick={() =>
            handleSelectWidgetContext(
              widget,
              widgetProps,
              setSelectedWidgetContext,
              buttonData.state
            )
          }
        >
          {buttonData.icon}
        </IconButton>
      );
      // }
    });
  };

  const fieldsArray = [
    <>
      <TextField
        id="outlined-controlled"
        sx={styled?.widgetMenuTextField}
        size="small"
        variant={styled?.widgetMenuTextField?.variant}
        value={searchString}
        onChange={handleSearchTermChange}
      />
      <IconButton
        tooltip={'search'}
        onClick={handleSearch}
        // sx={styled.widgetSettingButton?.inactive}
      >
        <SearchOutlined />
      </IconButton>
    </>,
  ];
  return (
    <>
      <Menu
        menuProps={menuProps}
        verticalArray={renderedButtons(buttonData)}
        horizontalArray={fieldsArray}
        contextSelector={<></>}
        // autoCompleteData={autoCompleteData}
        styled={styled}
      />
    </>
  );
}