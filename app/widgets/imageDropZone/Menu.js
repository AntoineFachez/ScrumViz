import React, { useContext, useState } from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import {
  AccountTree,
  ArrowBackIos,
  CloseFullscreen,
  FilterList,
  GridView,
  OndemandVideo,
  OpenInFull,
  SearchOutlined,
  Summarize,
  TableChart,
  ViewSidebar,
  Widgets,
} from '@mui/icons-material';

// import chatGPTIcon from '../../assets/icons/ChatGPT_logo.svg.png';
// import googleBardIcon from '../../assets/icons/Google_Bard_logo.png';
import UIContext from '../../../context/UIContext';
import Menu from '../../components/menu/Index';
import { useMode } from '@/app/theme/ThemeContext';

export default function MenuImageDrop({
  widgetProps,
  appContext,
  setAppContext,
  setWidgetActive,
  setArticleInFocus,
  setShowArticleInFocusInfoBox,
  handleSelectWidgetContext,
  searchString,
  selectedWidgetContext,
  showSearchVideo,
  setShowSearchVideo,
  handleSearchTermChange,
  handleSearch,
  handleFilterEntities,
  isLoading,
  getAllentitiesTypes,
  handlePaste,
  handleSubmit,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { showImageDropMenu, setShowImageDropMenu, toggleDrawer } =
    useContext(UIContext);
  const menuProps = {
    functions: {
      handleShowMenu: setShowImageDropMenu,
    },
    states: { showMenu: showImageDropMenu },
  };
  // console.log("selectedWidgetContext", selectedWidgetContext);
  const buttonArray = [
    <IconButton
      key={'card'}
      sx={
        selectedWidgetContext === 'card'
          ? styled?.widgetMenuButton?.active
          : styled?.widgetMenuButton?.inactive
      }
      // sx={{ backgroundColor: "white" }}
      onClick={() => handleSelectWidgetContext('card')}
    >
      <GridView />
    </IconButton>,
    <IconButton
      key={'singleItem'}
      sx={
        selectedWidgetContext === 'singleItem'
          ? styled?.widgetMenuButton?.active
          : styled?.widgetMenuButton?.inactive
      }
      // sx={{ backgroundColor: "white" }}
      onClick={() => handleSelectWidgetContext('singleItem')}
    >
      <Summarize />
    </IconButton>,
    // <IconButton
    //   sx={
    //     selectedWidgetContext === "selector"
    //       ? styled?.widgetMenuButton?.active
    //       : styled?.widgetMenuButton?.inactive
    //   }
    //   // sx={{ backgroundColor: "white" }}
    //   onClick={() => handleSelectWidgetContext("selector")}
    // >
    //   {" "}
    //   <Widgets />
    // </IconButton>,
    <IconButton
      key={'tree'}
      sx={
        selectedWidgetContext === 'tree'
          ? styled?.widgetMenuButton?.active
          : styled?.widgetMenuButton?.inactive
      }
      // sx={{ backgroundColor: "white" }}
      onClick={() => handleSelectWidgetContext('tree')}
    >
      {' '}
      <AccountTree />
    </IconButton>,
    <>
      <IconButton
        sx={
          selectedWidgetContext === 'table'
            ? styled?.widgetMenuButton?.active
            : styled?.widgetMenuButton?.inactive
        }
        // sx={{ backgroundColor: "white" }}
        onClick={() => handleSelectWidgetContext('table')}
      >
        <FilterList />
      </IconButton>
      {selectedWidgetContext === 'table' ? (
        <IconButton
          onClick={() => setIsExpandedTable((prev) => !prev)}
          sx={styled?.widgetMenuButton?.inactive}
        >
          {isExpandedTable ? <CloseFullscreen /> : <OpenInFull />}
        </IconButton>
      ) : null}
    </>,
  ];
  {
    /* <IconButton onClick={() => handleResetFilteredEvents()}>
      <ResetTv />
    </IconButton> */
  }
  const fieldsArray = [
    <>
      <TextField
        id="outlined-controlled"
        // sx={styled?.widgetMenuTextField}
        size="small"
        variant={styled?.widgetMenuTextField?.variant}
        value={searchString}
        onChange={(event) => {
          setSearchString(event.target.value);
        }}
      />
      <IconButton
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
        verticalArray={buttonArray}
        horizontalArray={fieldsArray}
        contextSelector={
          <>
            {/* <ContextSelector
              appContext={appContext}
              setAppContext={setAppContext}
              selectedContext={selectedContext}
              storyContext={storyContext}
              setStoryContext={setStoryContext}
              selectorItems={selectorMenuItems}
              handleSelect={handleChangeStoryContext}
            styled={styled}
            /> */}
          </>
        }
        // autoCompleteData={autoCompleteData}
        // keys={keys}
        // imageUrl={imageUrl}
        // query={query}
        // setQuery={setQuery}
        // setAnswer={setAnswer}
        // textfieldLabel={textfieldLabel}
        styled={styled}
      />
    </>
  );
}
