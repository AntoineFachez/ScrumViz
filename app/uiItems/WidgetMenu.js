import { IconButton, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import Menu from '../components/menu/Index';
import { useMode } from '@/app/theme/ThemeContext';
import { Fragment } from 'react';
import { buttonData } from './widgetMenuButtonData';

export default function WidgetMenu({ widgetProps }) {
  const [theme, colorMode, palette, styled] = useMode();

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
          key={buttonData.state}
          sx={
            widgetProps.selectedWidgetContext === buttonData.state
              ? styled?.widgetMenuButton?.active
              : styled?.widgetMenuButton?.inactive
          }
          onClick={() =>
            widgetProps.handleSelectWidgetContext(widgetProps, buttonData.state)
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
        value={widgetProps.searchString}
        onChange={widgetProps.handleSearchTermChange}
      />
      <IconButton
        tooltip={'search'}
        onClick={widgetProps.handleSearch}
        // sx={styled.widgetSettingButton?.inactive}
      >
        <SearchOutlined />
      </IconButton>
    </>,
  ];
  return (
    <>
      <Menu
        menuProps={widgetProps?.menuProps}
        verticalArray={renderedButtons(buttonData)}
        horizontalArray={fieldsArray}
        contextSelector={<></>}
        // autoCompleteData={autoCompleteData}
        styled={styled}
      />
    </>
  );
}
