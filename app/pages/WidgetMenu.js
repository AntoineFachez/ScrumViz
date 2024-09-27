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

export default function WidgetMenu({
  menuProps,
  handleSelectWidgetContext,
  setSelectedWidgetContext,
  searchString,
  selectedWidgetContext,
  handleSearchTermChange,
  handleSearch,
}) {
  const { palette, styled } = themeSettings('dark');

  const buttonArray = [
    <IconButton
      key={'card'}
      sx={
        selectedWidgetContext === 'card'
          ? styled?.widgetMenuButton?.active
          : styled?.widgetMenuButton?.inactive
      }
      onClick={() =>
        handleSelectWidgetContext(setSelectedWidgetContext, 'card')
      }
    >
      <GridView />
    </IconButton>,
    <IconButton
      key={'chip'}
      sx={
        selectedWidgetContext === 'chip'
          ? styled?.widgetMenuButton?.active
          : styled?.widgetMenuButton?.inactive
      }
      onClick={() =>
        handleSelectWidgetContext(setSelectedWidgetContext, 'chip')
      }
    >
      <Grain />
    </IconButton>,
    <IconButton
      key={'singleItem'}
      sx={
        selectedWidgetContext === 'singleItem'
          ? styled?.widgetMenuButton?.active
          : styled?.widgetMenuButton?.inactive
      }
      onClick={() =>
        handleSelectWidgetContext(setSelectedWidgetContext, 'singleItem')
      }
    >
      <Summarize />
    </IconButton>,

    <IconButton
      key={'tree'}
      sx={
        selectedWidgetContext === 'tree'
          ? styled?.widgetMenuButton?.active
          : styled?.widgetMenuButton?.inactive
      }
      onClick={() =>
        handleSelectWidgetContext(setSelectedWidgetContext, 'tree')
      }
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
        onClick={() =>
          handleSelectWidgetContext(setSelectedWidgetContext, 'table')
        }
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
        contextSelector={<></>}
        // autoCompleteData={autoCompleteData}
        styled={styled}
      />
    </>
  );
}
