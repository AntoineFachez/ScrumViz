import React, { memo, useMemo, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import ToolTipComponent from '../tooltip/ToolTipComponent';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    headCells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    isExpandedTable,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  // console.log("orderBy", orderBy);
  return (
    <TableHead>
      <TableRow>
        {isExpandedTable && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            sx={{}}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                  padding: '0 0.7rem 0 0.8rem',
                }}
              >
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  isExpandedTable: PropTypes.bool.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, collection, isExpandedTable, setIsExpandedTable } =
    props;

  return (
    <Toolbar
      sx={{
        minHeight: { xs: 'none', md: 10 },
        // position: "fixed",
        pl: { sm: 0 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {' '}
      {isExpandedTable && (
        <>
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {collection}
            </Typography>
          )}
          {numSelected > 0 ? (
            <ToolTipComponent
              i={i}
              title="Delete"
              placement="right"
              arrow={true}
              content={
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              }
            />
          ) : (
            <ToolTipComponent
              i={i}
              title="Filter list"
              placement="right"
              arrow={true}
              content={
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              }
            />
          )}
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const TableComponent = ({
  collection,
  data,
  itemInFocus,
  itemContext,
  orderedBy,
  keys,
  headCells,
  rows,
  handleSetInFocus,
  isExpandedTable,
  setIsExpandedTable,
  styled,
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(orderedBy);
  // console.log("orderBy", collection, orderedBy, orderBy);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n, i) => i);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (e, id, element) => {
    // console.log("elementId", id);
    e.preventDefault();

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected?.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected?.slice(0, selectedIndex),
        selected?.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleClickSetInFocus = (e, element) => {
    e.preventDefault();

    handleSetInFocus(element);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows?.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );
  useEffect(() => {
    handleRequestSort(orderedBy);

    return () => {};
  }, [data]);
  useEffect(() => {
    handleRequestSort();
    return () => {};
  }, []);

  if (!data) return;

  const paginationStyles = isExpandedTable
    ? {
        '& .MuiTablePagination-actions': { visibility: 'visible' },
        '& .MuiTablePagination-displayedRows': {
          // width: 0,
          visibility: 'visible',
        },
        '& .MuiTablePagination-selectLabel': {
          // width: 0,
          visibility: 'visible',
        },
        '& .MuiTablePagination-input': {
          // width: 0,
          visibility: 'visible',
        },
      }
    : {
        '& >*': {
          display: 'none',
        },
        '& .MuiToolbar-root >*': {
          marginLeft: 0,
        },
        '& .MuiTablePagination-actions': {
          // visibility: "visible",
          marginLeft: 0,

          // width: "100%",ˇˇ
        },
        '& .MuiTablePagination-displayedRows': {
          // width: 0,
          display: 'none',
          overflow: 'hidden',
        },
        '& .MuiTablePagination-selectLabel': {
          width: 0,
          // visibility: "hidden",
          display: 'none',
        },
        '& .MuiTablePagination-input': {
          width: 0,
          // visibility: "hidden",
          display: 'none',
        },
        '& .MuiTablePagination-toolbar': {
          width: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          // height: "1rem",
          padding: '0 0 0 0',
          minHeight: 'none',
          marginLeft: 0,
          paddingLeft: 'none',
          overflow: 'hidden',
          // visibility: "hidden",
          // display: "none",
        },
      };
  return (
    <Box
      className={`${collection} table`}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'scroll',
        padding: '0rem 0rem 3rem 0rem',
        // overflow: "hidden",
      }}
    >
      {' '}
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          // "& .MuiTableHead-root": { width: "100%", backgroundColor: "white" },
          // "& > .MuiTableHead": {
          //   width: "100%",
          //   padding: "1rem",
          //   backgroundColor: "red",
          // },
        }}
      >
        {isExpandedTable && (
          <EnhancedTableToolbar
            numSelected={selected.length}
            collection={collection}
            isExpandedTable={isExpandedTable}
            setIsExpandedTable={setIsExpandedTable}
          />
        )}
        <TableContainer
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'scroll',
          }}
        >
          {' '}
          <Table
            sx={{
              position: 'relative',
              width: '100%',

              overflow: 'scroll',
            }}
            stickyHeader
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
              isExpandedTable={isExpandedTable}
            />
            <TableBody
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                // height: "auto",

                overflow: 'scroll',
                // overflow: "hidden",
              }}
            >
              {visibleRows?.map((row, i) => {
                const isItemSelected = isSelected(i);

                const labelId = `enhanced-table-checkbox-${i}`;

                return (
                  <TableRow
                    // hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                    tabIndex={-1}
                    key={row[`${keys[i]}`]}
                    sx={
                      row?.element?.[`${itemContext}Id`]?.value ===
                      itemInFocus?.[`${itemContext}Id`]?.value
                        ? styled?.tableCell?.selected
                        : styled?.tableCell
                    }
                  >
                    {isExpandedTable && (
                      <TableCell
                        className={`tableCell ${keys[i]}`}
                        padding="checkbox"
                      >
                        <Checkbox
                          className={`checkBox ${keys[i]}`}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={(e) => handleSelect(e, i, row?.element)}
                        />
                      </TableCell>
                    )}
                    {keys?.map((key, j) => (
                      <>
                        {key !== 'url' && key !== 'id' ? (
                          <TableCell
                            className={`tableCell ${keys[j]}`}
                            key={j}
                            sx={
                              row?.element?.length < 20
                                ? {
                                    width: '100%',
                                    height: '100%',
                                    userSelect: 'none',
                                    // padding: "0 0 0 0",
                                  }
                                : styled?.truncate
                            }
                            align="left"
                            onClick={(e) =>
                              handleClickSetInFocus(
                                e,
                                row?.element ? row?.element : row
                              )
                            }
                          >
                            <Typography
                              sx={
                                row[keys[i]]?.length < 40
                                  ? {
                                      // width: "fit-content",
                                      // maxWidth: "30ch",
                                      // height: "20px",
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      textAlign: 'left',
                                      // color: "lightgrey",
                                      fontSize: '0.75rem',
                                      padding: '0 0.8rem 0 0.8rem',
                                      userSelect: 'none',
                                    }
                                  : {
                                      // width: "30ch",
                                      // height: "20px",
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      textAlign: 'left',
                                      // color: "lightgrey",
                                      fontSize: '0.75rem',
                                      padding: '0 0.8rem 0 0.8rem',
                                      userSelect: 'none',
                                    }
                              }
                            >
                              {row[`${keys[j]}`]}
                            </Typography>
                          </TableCell>
                        ) : null}
                      </>
                    ))}
                    {row[`${keys[6]}`] && (
                      <TableCell
                        sx={{
                          width: '100%',
                        }}
                        align="left"
                        onClick={(e) =>
                          handleClickSetInFocus(
                            e,
                            row?.element ? row?.element : row
                          )
                        }
                      >
                        <img
                          style={{
                            // zIndex: 1,
                            // position: "absolute",
                            // top: 0,
                            // right: 0,
                            // bottom: 0,
                            left: '3rem',
                            width: '100%',
                            maxWidth: '3rem',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          // style={styled?.imageAbsoluteFullSpace}
                          src={row[`${keys[6]}`]}
                          alt={row[`${keys[1]}`]}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            display: 'flex',
            justifyContent: isExpandedTable ? 'center' : 'space-around',
          }}
        >
          <TablePagination
            sx={paginationStyles}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Σ"
            showFirstButton={true}
            showLastButton={true}
          />
        </Box>
      </Paper>
    </Box>
  );
};
export default TableComponent;
