import React from 'react';
import {
  GridToolbar,
  GridToolbarContainer,
  gridPageCountSelector,
  gridPageSelector,
  useGridSelector,
  useGridApiContext,
} from '@mui/x-data-grid';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { CheckBox, Download, SearchOff } from '@mui/icons-material';

export default function Toolbar(props, {}) {
  const {
    setFilterModel,
    apiRef,
    selectedColumn,
    rows,
    isExpandedTable,
    filterModel,
    handleFilterButtonClick,
    styled,
  } = props;
  function ButtonArray() {
    const buttenArrayRef = useGridApiContext();
    const handleGetSelectedRowsId = () => {
      const selectedRows = buttenArrayRef.current.getSelectedRows();
      console.log('selectedRows', selectedRows);
    };
    const handleExportAsCSV = () => {
      const exportedCSV = buttenArrayRef.current.exportDataAsCsv();
    };
    // const handleGoToPage1 = () => {
    //   buttenArrayRef.current.setPage(1);
    // };

    // const handleGetAllRowIds = () => {
    //   buttenArrayRef.current.getAllRowIds();
    // };
    // const handleForceUpdate = () => {
    //   buttenArrayRef.current.forceUpdate();
    //   console.log("buttenArrayRef", buttenArrayRef.current);
    // };
    // const handleFilterModelChange = (newFilterModel) => {
    //   // Update state and then apply the filter model to the DataGrid.
    //   setFilterModel(newFilterModel);
    //   apiRef.current.setFilterModel(newFilterModel);
    // };

    return (
      <GridToolbarContainer>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
          }}
        >
          {/* <IconButton
            sx={styled?.iconButton?.action}
            onClick={handleGoToPage1}
          >
            <FirstPage />
          </IconButton> */}
          {/* <Button
            sx={styled?.menuButtonText.action}
            onClick={handleForceUpdate}
          >
            Update
          </Button>{" "} */}
          {/* <IconButton
            sx={styled?.iconButton?.action}
            onClick={handleForceUpdate}
          >
            <Cached />
          </IconButton> */}
          {/* <Button
            sx={styled?.menuButtonText.action}
            onClick={() => apiRef.current.sortColumn("firstName", "asc")}
          >
            Sort by ASC
          </Button>
          <Button
            sx={styled?.menuButtonText.action}
            onClick={() => apiRef.current.sortColumn("firstName", "desc")}
          >
            Sort by DESC
          </Button> */}
          <IconButton
            sx={styled?.iconButton?.action}
            onClick={handleGetSelectedRowsId}
          >
            <CheckBox />
          </IconButton>{' '}
          <IconButton
            sx={styled?.iconButton?.action}
            onClick={handleExportAsCSV}
          >
            <Download />
          </IconButton>{' '}
          <IconButton
            sx={styled?.iconButton?.action}
            onClick={() => apiRef.current.sortColumn(selectedColumn, null)}
          >
            <SearchOff />
          </IconButton>{' '}
          <IconButton
            sx={styled?.iconButton?.action}
            onClick={() => apiRef.current.sortColumn(selectedColumn, null)}
          >
            <SearchOff />
          </IconButton>{' '}
        </Box>
      </GridToolbarContainer>
    );
  }
  function Toolbar(props) {
    const toolBarRef = useGridApiContext();
    const page = useGridSelector(toolBarRef, gridPageSelector);
    const pageCount = useGridSelector(toolBarRef, gridPageCountSelector);
    const rowsLength = rows?.length;
    // console.log(
    //   "firstChar",
    //   rowsLength,
    //   rows?.[rowsLength],
    //   rows?.[`${+rowsLength - 1}`]?.[`${itemContext}Name`],
    // );
    const marks = [
      {
        value: page + 1,
        label: `${+rowsLength - 1}/${pageCount}`,
      },
      // {
      //   value: pageCount / 2,
      //   label: pageCount,
      // },
      // {
      //   value: pageCount,
      //   label: rows?.[rows?.length - 1]?.[`${itemContext}Name`],
      // },
    ];
    return (
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 2rem',
        }}
      >
        {isExpandedTable ? (
          <>
            <ButtonArray /> <GridToolbar {...props} />{' '}
            {filterModel.items.map((item, index) => (
              <Typography key={index} onClick={handleFilterButtonClick}>
                Filter set to {item.field} by {item.value}
              </Typography>
            ))}{' '}
          </>
        ) : null}
        {pageCount > 1 ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
            }}
          >
            <Slider
              sx={{
                ...styled?.slider,
                position: 'relative',
                // width: "100%",
                // // color: "pink",
                padding: '0',
                '&:hover': {
                  color: 'white',
                },
                // color: theme?.palette?.warning,
                // backgroundColor: theme?.palette?.warning,
              }}
              min={1}
              max={pageCount}
              value={page + 1}
              onChange={(event, value) => apiRef?.current?.setPage(value - 1)}
              aria-label="Always visible"
              defaultValue={1}
              // getAriaValueText={() => page}
              step={1}
              // marks={marks}
              valueLabelDisplay="auto"
            />
            <Typography
              sx={{
                ...styled?.textBody,
                width: '5ch',
                textAlign: 'right',
                color: 'white',
                padding: 0,
              }}
            >
              {pageCount}
            </Typography>
            {/* {page}
              {pageCount} */}
            {/* <Pagination
            // sx={(theme) => ({
            //   padding: theme.spacing(1.5, 0),
            // })}
            sx={{
              height: "2rem",
              display: "flex",
              flexFlow: "column nowrap",
              // color: "white",
              // backgroundColor: "white",
            }}
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
          /> */}{' '}
          </Box>
        ) : null}
      </Box>
    );
  }
  return <Toolbar />;
}
