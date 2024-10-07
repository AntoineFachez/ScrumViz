import React, { memo, useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import { v4 as uuidv4 } from 'uuid';
import DataGridDemo from './DataGrid';

import { debounce } from 'lodash';
import SearchContext from '../../context/SearchContext';
import FormContext from '../../context/FormContext';
const Index = ({
  collection,
  data,
  parentItemInFocus,
  itemInFocus,
  itemContext,
  orderedBy,
  keys,
  // createRow,
  headerCells,
  handleSetInFocus,
  isExpandedTable,
  setIsExpandedTable,
  overLayElement,
  alertElement,
  styled,
}) => {
  const { activeSearchTerm, setActiveSearchTerm } = useContext(SearchContext);

  const { activeSections, activeKeys, filterModel, setFilterModel } =
    useContext(FormContext);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedColumn, setSelectedColumn] = useState(
    headerCells?.[0]?.gridHeader?.id
  );
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState(rows);
  const handleColumnHeaderClick = (params, event, details) =>
    setSelectedColumn(params?.field);

  const handleSearchTermChange = (event) => {
    setActiveSearchTerm(event.target.value);
  };

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };
  const buildRows = async (array) => {
    let tempRows = [];
    // let counter = 0;
    array?.forEach((element) => {
      tempRows.push(createRow(element));
      // counter++;
    });
    setRows(tempRows);
    // console.log("tempRows", rows);
  };
  function createRow(element, isExpandedTable = false) {
    const row = { id: uuidv4() };
    // console.log("isExpandedTable", element, isExpandedTable);
    for (const sectionKey in element) {
      const section = element[sectionKey];

      for (const fieldKey in section) {
        if (section[fieldKey])
          if (section.hasOwnProperty(fieldKey) && section[fieldKey].gridRow) {
            // Check if the field and gridRow properties exist
            const { gridRow, value } = section[fieldKey];

            // Only add field to row if appropriate for the table type
            if (gridRow[isExpandedTable ? 'expandedTable' : 'collapsedTable']) {
              if (fieldKey === 'universityId') {
                // Apply the conditional logic for universityId, element, and alertElement
                row.universityId =
                  element?.basics?.universityId?.value || 'alert';
                row.element = element;
                row.alertElement = alertElement(element); // Assuming you have alertElement function
              } else {
                // For other fields, assign the value or an empty string
                row[fieldKey] = value ?? '';
              }
            }
          }
      }
    }
    return row;
  }
  // console.log("itemContext", itemContext);
  const filterRows = (array, term, field) => {
    if (!term || !field) return setFilteredRows(_.uniqWith(array)); // No filtering if no term or column
    setFilteredRows(null);
    const filtered = array?.filter((row) => {
      const value = row[field]; // Get the value from the selected column
      return value?.toString()?.toLowerCase()?.includes(term.toLowerCase()); // Case-insensitive search
    });
    // console.log("filtered", filtered);
    if (filtered) {
      return setFilteredRows(_.uniqWith(filtered));
    } else {
      return setFilteredRows(_.uniqWith(array));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setFilteredRows('');
    buildRows(data);
    setIsLoading(false);
    // console.log(
    //   "parentItemInFocus",

    //   activeSearchTerm,
    //   filterModel,
    //   activeSections,
    //   activeKeys,
    // );
    return () => {};
  }, [
    data,
    parentItemInFocus,
    itemInFocus,
    isExpandedTable,
    activeSearchTerm,
    setActiveSearchTerm,
    filterModel,

    activeSections,
    activeKeys,
    // buildRows,
  ]);
  useEffect(() => {
    // filterRows(rows, activeSearchTerm, selectedColumn);
    return () => {};
  }, [activeSearchTerm, selectedColumn]);
  useEffect(() => {
    setIsLoading(true);
    setFilteredRows('');
    buildRows(data);
    // setTimeout(() => {
    setIsLoading(false);
    // }, 1000);
    return () => {};
  }, []);
  const debouncedRenderRows = debounce(buildRows, 2000); // Replace with your actual function
  // console.log("headerCells", headerCells);
  return (
    <>
      {alertElement}
      {isLoading ? (
        <div>Loading...</div> // Show isLoading indicator
      ) : (
        <>
          {' '}
          <DataGridDemo
            isLoading={isLoading}
            rows={filteredRows ? filteredRows : rows}
            // rows={rows}
            columns={headerCells}
            parentItemInFocus={parentItemInFocus}
            itemInFocus={itemInFocus}
            itemContext={itemContext}
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
            isExpandedTable={isExpandedTable}
            setIsExpandedTable={setIsExpandedTable}
            debouncedRenderRows={debouncedRenderRows}
            overLayElement={overLayElement}
            handleSetInFocus={handleSetInFocus}
            handleColumnHeaderClick={handleColumnHeaderClick}
            // handleSortModelChange={handleSortModelChange}
            // handleRowOrderChange={handleRowOrderChange}
            // handleFetchByPagination={handleFetchByPagination}
            styled={styled}
          />
        </>
      )}
    </>
  );
};
export default Index;
