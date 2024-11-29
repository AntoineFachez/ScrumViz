'use client';
import React, { useContext, useState } from 'react';
import { Close } from '@mui/icons-material';

import ProductBackLogsContext from '../../widgets/productBacklogs/ProductBackLogsContext';
import PromptsContext from '../../widgets/prompts/PromptsContext';

import NewItem from './NewItem';
import QuickMenu from '../widgetItems/QuickMenu';

import { handleNewProductBackLog } from '../../widgets/productBacklogs/functions/dbFunctions';
import { singleItemScheme } from '../../widgets/productBacklogs/dataScheme';

import { useMode } from '../../theme/ThemeContext';

export default function DrawerNewItem({}) {
  const {
    optionsVertMenu,
    displayProductBackLogs,
    setDisplayProductBackLogs,
    selectedProductBackLogs,
    setSelectedProductBackLogs,
    productBackLogInFocus,
    setProductBackLogInFocus,
    handleSetProductBackLogInFocus,
    scheme,
    handleSetExampleProduct,
  } = useContext(ProductBackLogsContext);
  const { handleOnChangeAdoptPrompt } = useContext(PromptsContext);
  const [theme, colorMode, palette, styled] = useMode();

  const collection = 'productBackLogs';
  const widgetProps = {
    collection: collection,
    tooltipTitle_clearFields: 'clear fields',
    handleSetItemInFocus: handleSetProductBackLogInFocus,
    data: selectedProductBackLogs,
    selectedData: selectedProductBackLogs,
    setSelectedItem: setSelectedProductBackLogs,
    itemInFocus: productBackLogInFocus,

    singleItemScheme: singleItemScheme,
    optionsVertMenu: optionsVertMenu,
    scheme: scheme,
    dialogTitle: 'Create new Product',
    handleSetExample: handleSetExampleProduct,

    quickMenuButtonArray: [
      {
        tooltip_title: 'clear fields',
        onClickHandler: () => setProductBackLogInFocus({}),
        icon: <Close />,
      },
    ],
  };

  const handleSaveNewProduct = (dataToStore) => {
    handleNewProductBackLog(
      widgetProps,
      setProductBackLogInFocus,
      dataToStore,
      displayProductBackLogs,
      setDisplayProductBackLogs
    );
  };
  return (
    <>
      <QuickMenu widgetProps={widgetProps} styled={styled} />
      <NewItem
        widgetProps={widgetProps}
        handleOnChangeAdoptPrompt={handleOnChangeAdoptPrompt}
        handleSaveNewProduct={handleSaveNewProduct}
        styled={styled}
      />
    </>
  );
}
