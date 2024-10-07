import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridApiRef,
  useGridSelector,
} from '@mui/x-data-grid';
import {
  Button,
  IconButton,
  Pagination,
  Select,
  Slider,
  Typography,
} from '@mui/material';
import { CheckBox, Download, SearchOff, SwapVert } from '@mui/icons-material';
// import { useMode } from "../../themes/Theme";
import './datagrid.scss';
import FormContext from '../../context/FormContext';
import { useMode } from '../../themes/Theme';

const DataGridDemo = ({
  isLoading,
  rows,
  columns,
  parentItemInFocus,
  itemInFocus,
  itemContext,
  selectedColumn,
  setSelectedColumn,
  isExpandedTable,
  setIsExpandedTable,
  debouncedRenderRows,
  overLayElement,
  handleSetInFocus,
  handleSortModelChange,
  handleRowOrderChange,
  handleFetchByPagination,
  handleColumnHeaderClick,
  styled,
}) => {
  const [density, setDensity] = useState(
    isExpandedTable ? 'comfortable' : 'compact'
  );
  const { filterModel, setFilterModel } = useContext(FormContext);
  const [theme, colorMode] = useMode();
  const apiRef = useRef(null);
  const initialFilterApplied = useRef(false);
  // const apiContext = useGridApiContext();
  // const apiRef = useGridApiRef();

  // You can now use the api object to interact with the DataGrid programmatically
  // For example, to get the current page number:
  // const currentPage = apiRef.getCurrentPage();
  // console.log("apiRef", apiContext);

  // Initial filter model (preset filter)

  // const [initialFilterApplied, setInitialFilterApplied] = useState(false);

  const handleFilterButtonClick = () => {
    setFilterModel({
      items: [
        { field: 'location', operator: 'startsWith', value: 'alf' },
        // { field: "universityId", operator: "equals", value: "alert" },
      ],
    });
  };

  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
  };
  const getRowClassName = (row) => {
    row.row.editable = false;
    // console.log(row?.row);
    if (!itemInFocus) return;
    return row?.row?.element?.basics?.[`${itemContext}Id`]?.value ===
      itemInFocus?.basics?.[`${itemContext}Id`]?.value
      ? 'activeRow'
      : 'inactiveRow';
  };
  function ButtonArray() {
    const buttenArrayRef = useGridApiContext();
    const handleGoToPage1 = () => {
      buttenArrayRef.current.setPage(1);
    };

    const handleGetAllRowIds = () => {
      buttenArrayRef.current.getAllRowIds();
    };
    const handleGetSelectedRowsId = () => {
      const selectedRows = buttenArrayRef.current.getSelectedRows();
      console.log('selectedRows', selectedRows);
    };
    const handleExportAsCSV = () => {
      const exportedCSV = buttenArrayRef.current.exportDataAsCsv();
    };
    const handleForceUpdate = () => {
      buttenArrayRef.current.forceUpdate();
      console.log('buttenArrayRef', buttenArrayRef.current);
    };
    const handleFilterModelChange = (newFilterModel) => {
      // Update state and then apply the filter model to the DataGrid.
      setFilterModel(newFilterModel);
      apiRef.current.setFilterModel(newFilterModel);
    };

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

    const marks = [
      {
        value: page + 1,
        label: `${+rowsLength - 1}/${pageCount}`,
      },
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
                padding: '0',
                '&:hover': {
                  color: 'white',
                },
              }}
              min={1}
              max={pageCount}
              value={page + 1}
              onChange={(event, value) => apiRef?.current?.setPage(value - 1)}
              aria-label="Always visible"
              defaultValue={1}
              step={1}
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
          </Box>
        ) : null}
      </Box>
    );
  }

  const MyNoRowsOverlay = () => {
    const gridRef = useGridApiContext();

    // Handle any actions you want to take when there are no rows (optional)

    const handleClick = () => {
      gridRef?.current?.setRowMode('create'); // Assuming you want to set 'create' mode
    };
    return (
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {overLayElement}
      </Box>
    );
  };
  useEffect(() => {
    setDensity(isExpandedTable ? 'comfortable' : 'compact');

    return () => {};
  }, [isExpandedTable]);
  return (
    <Box
      // className="widget"
      sx={{
        width: 'inherit',
        height: '100%',
        display: 'block',
        overflowX: 'hidden',

        '& .MuiDataGrid-root': {
          border: 'none',
          outline: 'none',
          borderRadius: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          '& .activeRow': {
            border: 'none',
            outline: 'none',
            backgroundColor: 'steelblue',
            '&:hover': {
              /* Nest the hover pseudo-class here */
              backgroundColor:
                'steelblue' /* Change the hover color to dodgerblue */,
            },
            '& > *': {
              outline: 'none',
              border: 'none',
            },
          },
          '& .inactiveRow': {
            backgroundColor: 'grey',
            '&:hover': {
              backgroundColor:
                'green' /* Change the hover color to dodgerblue */,
            },
            '& > *': {},
          },
        },
        '& .MuiDataGrid-main >*': {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },

        '& .MuiDataGrid-virtualScroller': {
          scrollbarWidth: 'auto',
        },
        '& .MuiDataGrid-virtualScroller >*': {},
        '& .MuiDataGrid-scrollbar': {
          position: 'relative',
          scrollbarWidth: 'auto',
        },
        '& .MuiDataGrid-root--densityComfortable': {
          border: 'none',
          outline: 'none',
        },
        '& .MuiDataGrid-withBorderColor > *': {
          border: 'none',
          outline: 'none',
        },

        '& .MuiDataGrid-columnHeader': {
          width: '100%',
          color: '#fff',
          backgroundColor: '#333433',
        },
        '& .MuiDataGrid-filler': {
          width: '100%',
          color: '#fff',
          backgroundColor: '#333433',
        },
        '& .MuiDataGrid-columnSeparator >*': {
          width: '100%',
          color: '#fff',
          backgroundColor: 'steelblue',
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '& .MuiDataGrid-columnHeaderTitle > svg ': {
            width: '100%',
            color: '#fff',
            backgroundColor: '#333433',
            '&:hover': { color: 'white', backgroundColor: 'steelblue' },
          },
        },
        '& .MuiDataGrid-iconButtonContainer >*': {
          width: '1rem',
          height: '1rem',
          color: 'white',
          backgroundColor: 'steelblue',
        },
        '& .MuiDataGrid-menuIcon, .MuiDataGrid-menuIcon >*': {
          border: 'none',
          color: '#fff',
          outline: 'none',
        },
        '& .MuiDataGrid-cell': {
          color: '#aaa',
          outline: 'none',
          userSelect: 'none',
        },
        '& .MuiDataGrid-cell:active': {
          outline: 'none',
        },
        '& .MuiDataGrid-cell:focus': {
          color: '#fff',
          outline: 'none',
        },
        '& .MuiDataGrid-cell:hover': {
          color: '#fff',
        },
      }}
    >
      <DataGrid
        isLoading={isLoading}
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => {
          setFilterModel(newFilterModel);
        }}
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        pagination
        rowReordering
        // rowBufferPx={400}
        autoPageSize={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
          scroll: {
            left: 0, // Start at the leftmost position
          },
        }}
        slots={{
          toolbar: Toolbar,
          noRowsOverlay: MyNoRowsOverlay,
        }}
        slotProps={{
          columnMenu: { background: 'red', counter: rows.length },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        onColumnHeaderClick={(params, event, details) => {
          handleColumnHeaderClick(params, event, details);
        }}
        onRowClick={(row) => handleSetInFocus(row?.row?.element)}
        density={density} // Set initial density from state
        onDensityChange={handleDensityChange} // Handle density changes
        checkboxSelection={isExpandedTable ? true : false}
        hideFooter={!isExpandedTable ? true : false}
        hideFooterSelectedRowCount={!isExpandedTable ? true : false}
        hideFooterPagination={!isExpandedTable ? true : false}
        isCellEditable={() => 'highlightedRow'}
        // onCellKeyDown={(e) => console.log(e)}
        getRowClassName={getRowClassName}
        onRowOrderChange={handleRowOrderChange}
        showColumnVerticalBorder={true}
        onSortChange={(sortModel) => {
          debouncedRenderRows(rows, sortModel); // Call the debounced function with data and sort information
        }}
        onPaginationMetaChange={handleFetchByPagination}
        onPaginationModelChange={handleFetchByPagination}
      />
    </Box>
  );
};

export default DataGridDemo;
