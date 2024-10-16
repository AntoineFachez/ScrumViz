'use client';
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import SketchWrapper from '../p5/neonText/SketchWrapper';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { Add, WidthWide } from '@mui/icons-material';
import { useMode } from '../theme/ThemeContext';
import ProductBackLogsContext from '../widgets/productBacklogs/ProductBackLogsContext';
import CardItem from '../components/card/CardItem';
// import Profile from '../profile/page';
// import { useSession } from 'next-auth/react';
import {
  scheme,
  singleItemScheme,
} from '../widgets/productBacklogs/dataScheme';
import EnvProductionIcon from '../components/icons/EnvProductionIcon';
import SimpleDialog from '../components/dialog/Dialog';
import NewItem from '../uiItems/widgetItems/NewItem';
import { handleCloseNewItem } from '../widgets/actions';
import { handleNewProductBackLog } from '../widgets/productBacklogs/functions/dbFunctions';
import ChatInFocus from '../widgets/chats/Index';
import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';
import DefaultPromptsContext from '../widgets/defaultPrompts/DefaultPromptsContext';

export default function Home() {
  const { setAppContext, setUiGridMapContext } = useContext(AppContext);
  const { orientationDrawer, setDrawerMenu, setDrawerFloorElement } =
    useContext(UIContext);
  const {
    showNewItem,
    setShowNewItem,
    optionsVertMenu,
    displayProductBackLogs,
    setDisplayProductBackLogs,
    selectedProductBackLogs,
    setSelectedProductBackLogs,
    setProductBackLogInFocus,
    handleSetProductBackLogInFocus,
    handleNewItem,
    scheme,
  } = useContext(ProductBackLogsContext);
  const { promptTextInFocus, setPromptTextInFocus } = useContext(
    DefaultPromptsContext
  );
  const [theme, colorMode, palette, styled] = useMode();

  const collection = 'productBackLogs';
  const widgetProps = {
    collection: collection,
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
    itemInFocus: {
      product_name: 'Mushroom App',
      status: 'in developement',
      description:
        'Users of the app can mark locations of where they found a mushroom. Users can shoot an image, upload it to gemini and ask for the according wikipedia article.',
      productBackLog_items: '',
    },
  };
  const handleClickNewProduct = () => {
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
    <NewItem
      widgetProps={widgetProps}
      dataToStore={dataToStore}
      setDataToStore={setDataToStore}
      formData={formData}
      setFormData={setFormData}
      handleSaveNewProduct={handleSaveNewProduct}
      styled={styled}
    />
  );
  const promptOnNewProduct =
    "lets talk about scrum management and user stories. Here is a layout for a digital product: <standInForProduct>. Please return the three most common user stories for such a product. Please keep in mind that I will later share my scrum team and ask you to develop sprints for these user stories. Return the three user stories I asked for as an array of json objects. The data structure of these user stories / for the json objects you shall return is as follows (find further instructions in parenthese such as 'generate uniqueUUID'):  <standInForDataScheme>   ";
  const standInForProduct =
    'product_name: Mushroom App, product_description: Users of the app can mark locations of where they found a mushroom. Users can shoot an image, upload it to gemini and ask for the according wikipedia article';
  const standDataScheme =
    "[{id: 'generate a unique UUiD', userStory_name: 'generate a meaningful name', userStory_short:'generate the story similar to: 'As a user, I … '', acceptanceCriteria: [{acceptanceCriteria_id: 'generate a Unique UUID for each criteria',acceptanceCriteria_description: 'generate meaningful criteria description',}, ],writtenByTeamMember_id: 'ignore',wireFrame_uri:'ignore', },";

  function createPrompt(
    promptOnNewProduct,
    standInForProduct,
    standDataScheme
  ) {
    const description = promptOnNewProduct
      .replace('<standInForProduct>', `**${standInForProduct}**`)
      .replace('<standInForDataScheme>', `\`${standDataScheme}\``);

    const defaultPrompt = {
      id: uuidv4(),
      title: 'develop user stories for this digital product',
      description: description,
      source_collection: 'productBackLogs',
      target_collection: 'userStories',
    };

    return defaultPrompt;
  }

  const generatedPrompt = createPrompt(
    promptOnNewProduct,
    standInForProduct,
    standDataScheme
  );

  const dialogCustomComponent = (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'row',
        // paddingRight: '1rem',
      }}
      className="widget"
    >
      <Box
        sx={{
          width: '60ch',
          height: '100%',
          display: 'flex',
          flexFlow: 'row',
          // paddingRight: '1rem',
        }}
      >
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
        <ChatInFocus startUpWidgetLayout="inputField" />
      </Box>
    </Box>
  );

  useEffect(() => {
    setDrawerMenu(<Box sx={{ width: '100%' }}>drawerMenu</Box>);
    setDrawerFloorElement(dialogCustomComponent);
    setPromptTextInFocus(generatedPrompt);
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
          {' '}
          <IconButton
            onClick={handleClickNewProduct}
            sx={{
              ...styled?.iconButton?.action,
            }}
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
