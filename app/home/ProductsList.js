import React from 'react';
import { Box } from '@mui/material';
import EnvProductionIcon from '../components/icons/EnvProductionIcon';
import CardItem from '../components/card/CardItem';
export default function ProductsList({
  widgetProps,
  displayProductBackLogs,
  styled,
}) {
  return (
    <>
      {' '}
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
                    handleClick={widgetProps.handleSetItemInFocus}
                    styled={{ ...styled }}
                  />
                </Box>
              )}
            </>
          );
        })}
    </>
  );
}
