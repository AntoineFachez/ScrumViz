'use client';
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Add, ArrowBack, Close, Menu, WidthWide } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';

import ProductBackLogsContext from '../widgets/productBacklogs/ProductBackLogsContext';
import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';
import PromptsContext from '../widgets/prompts/PromptsContext';
// import Profile from '../profile/page';
// import { useSession } from 'next-auth/react';

import SketchWrapper from '../p5/neonText/SketchWrapper';
import CardItem from '../components/card/CardItem';
import ChatInFocus from '../widgets/chats/Index';
import EnvProductionIcon from '../components/icons/EnvProductionIcon';
import SimpleDialog from '../components/dialog/Dialog';
import NewItem from '../uiItems/widgetItems/NewItem';

import {
  scheme,
  singleItemScheme,
} from '../widgets/productBacklogs/dataScheme';
import { handleCloseNewItem } from '../widgets/actions';
import { handleNewProductBackLog } from '../widgets/productBacklogs/functions/dbFunctions';

import { useMode } from '../theme/ThemeContext';

export default function Home() {
  const { setAppContext, setUiGridMapContext } = useContext(AppContext);
  const {
    orientationDrawer,
    setDrawerMenu,
    setDrawerFloorElement,
    handleToggleDrawer,
  } = useContext(UIContext);
  const {
    showNewItem,
    setShowNewItem,
    optionsVertMenu,
    displayProductBackLogs,
    setDisplayProductBackLogs,
    selectedProductBackLogs,
    setSelectedProductBackLogs,
    productBackLogInFocus,
    setProductBackLogInFocus,
    handleSetProductBackLogInFocus,
    handleNewItem,
    scheme,
  } = useContext(ProductBackLogsContext);
  const { promptInFocus, setPromptInFocus, handleOnChangeAdoptPrompt } =
    useContext(PromptsContext);
  const [theme, colorMode, palette, styled] = useMode();

  const collection = 'productBackLogs';
  const widgetProps = {
    collection: collection,
    tooltipTitle_clearFields: 'clear fields',
    handleSetItemInFocus: handleSetProductBackLogInFocus,
    data: selectedProductBackLogs,
    selectedData: selectedProductBackLogs,
    setSelectedItem: setSelectedProductBackLogs,
    singleItemScheme: singleItemScheme,
    optionsVertMenu: optionsVertMenu,
    scheme: scheme,
    dialogTitle: 'Create new Product',

    openDialogueState: showNewItem,
    onCloseDialogue: () => handleCloseNewItem(setShowNewItem, collection),
    onClick: () => {
      setAppContext('scrumManager');
      setUiGridMapContext('userStories');
    },
    // handleSaveNewProduct: handleSaveNewProduct,
    itemInFocus: productBackLogInFocus,
  };
  const handleClickNewProduct = () => {
    // handleToggleDrawer('left', true);
    handleNewItem();
    console.log('clicked');
  };
  const [dataToStore, setDataToStore] = useState({});
  const [formData, setFormData] = useState({});

  const handleSaveNewProduct = (dataToStore) => {
    console.log('handleSaveNewProduct', dataToStore);
    // handleNewProductBackLog();
    handleNewProductBackLog(
      widgetProps,
      setProductBackLogInFocus,
      dataToStore,
      displayProductBackLogs,
      setDisplayProductBackLogs
    );
  };
  const newItem = (
    <>
      <NewItem
        widgetProps={widgetProps}
        dataToStore={dataToStore}
        setDataToStore={setDataToStore}
        formData={formData}
        setFormData={setFormData}
        handleOnChangeAdoptPrompt={handleOnChangeAdoptPrompt}
        handleSaveNewProduct={handleSaveNewProduct}
        styled={styled}
      />
    </>
  );

  const dialogCustomComponent = (
    <Box
      className="widget"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'row',
        // paddingRight: '1rem',
        backgroundColor: '#333433',
      }}
    >
      {' '}
      <Box
        className="newItem"
        sx={{
          // ...styled?.widget,
          width: '60ch',

          // width: '100%',
          height: '100%',
          display: 'flex',
          flexFlow: 'column',
          // paddingRight: '1rem',
        }}
      >
        <Box sx={styled.spacesMenu} className="quickMenu">
          <Tooltip
            title={widgetProps.tooltipTitle_clearFields}
            placement="top"
            arrow
          >
            <IconButton
              onClick={() => setProductBackLogInFocus({})}
              sx={{ ...styled?.iconButton?.action }}
            >
              <Close />
            </IconButton>
          </Tooltip>
        </Box>

        {newItem}
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexFlow: 'column',
          // paddingRight: '1rem',
        }}
      >
        <ChatInFocus startUpWidgetLayout="vertical" />{' '}
        <Box
          sx={{
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexFlow: 'column',
            // paddingRight: '1rem',
          }}
        >
          <ChatInFocus startUpWidgetLayout="inputField" />
        </Box>
      </Box>
    </Box>
  );

  useEffect(() => {
    setDrawerMenu(
      <Box
        sx={{ ...styled.spacesMenu, flexFlow: 'row' }}
        className="widgetMenu"
      >
        <Box className="quickMenu" sx={styled.quickMenu}>
          <IconButton
            onClick={handleToggleDrawer('right', false)}
            sx={{ ...styled?.iconButton?.action }}
          >
            <Menu />
          </IconButton>
          <IconButton
            onClick={() => handleGoBack('')}
            sx={{ ...styled?.iconButton?.action }}
          >
            <ArrowBack />
          </IconButton>
        </Box>
        <Typography>drawerMenu</Typography>
      </Box>
    );
    setDrawerFloorElement(dialogCustomComponent);
    return () => {};
  }, [orientationDrawer]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        className="flexList"
        sx={{
          ...styled?.flexList,
          width: '100%',
          maxWidth: '48rem',
          height: '100%',
          maxHeight: '100%',
          overflow: 'scroll',
          '& .MuiPaper-root': {
            width: '18rem',
            height: '14rem',
          },
        }}
      >
        {' '}
        <Box
          sx={{
            ...styled.card,
            width: '18rem',
            height: '14rem',
            position: 'relative',

            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow:
              '-1px 0 0 red, 0 1px 0 yellow, 1px 0 0 green, 0 -1px 0 blue',
          }}
        >
          <IconButton
            onClick={
              // () => {
              //   toggleDrawer("left", true);
              //   return toggleDrawer("left", true);
              // }
              handleToggleDrawer('right', true)
            }
            sx={styled?.iconButton?.action}
            // sx={
            //   selectedWidgetContext === 'drawer'
            //     ? styled?.iconButton?.active
            //     : styled?.iconButton?.inactive
            // }
          >
            <Add
              sx={{
                width: '3rem',
                height: '3rem',
              }}
            />
          </IconButton>

          <Typography
            sx={{
              ...styled.subTitle,

              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.5rem',
              transform: 'translate(0, 1rem)',
            }}
            variant={styled.subTitle.variant}
          >
            Create a Project
          </Typography>
        </Box>
        {displayProductBackLogs &&
          displayProductBackLogs?.map((item, i) => {
            if (item.status === 'in production') {
              item.customSubTitleItem = <EnvProductionIcon />;
            } else {
              item.customSubTitleItem = '';
            }
            return (
              <>
                {item.product_name && (
                  <Box
                    onClick={widgetProps.onClick}
                    sx={
                      {
                        // height: '100%',
                        // maxHeight: '100%',
                        // margin: '5%',
                      }
                    }
                  >
                    <CardItem
                      widgetProps={widgetProps}
                      dataSlug={item.id}
                      item={item}
                      handleClick={handleSetProductBackLogInFocus}
                      // styled={{ ...styled.card.width, width: '10rem' }}
                      styled={{ ...styled }}
                    />
                  </Box>
                )}
              </>
            );
          })}
      </Paper>
      {/* {newItemDialogue}{' '} */}
    </Box>
  );
}
