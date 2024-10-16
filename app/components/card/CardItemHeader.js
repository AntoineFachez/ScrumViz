import React from 'react';

import CardHeader from '@mui/material/CardHeader';
import { Box, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import DropDownComponent from '../dropDown/DropDown';
import EnvProductionIcon from '../icons/EnvProductionIcon';

export default function CardItemHeader({
  widgetProps,
  item,
  itemContext,
  alertElement,
  isSelected,
  singleItemScheme,
  stringAvatar,
  handleClick,
  styled,
}) {
  return (
    <CardHeader
      avatar={
        alertElement ? (
          <>{alertElement(item)}</>
        ) : (
          <Avatar
            onClick={() => handleClick(item)}
            sx={styled?.avatar}
            aria-label={itemContext}
            // src={item?.basics?.[`${itemContext}ImageUrl`]}
            {...stringAvatar(item[singleItemScheme.title] || 'N/A')}
          />
        )
      }
      action={
        <>
          <DropDownComponent options={widgetProps.optionsVertMenu} />
        </>
      }
      title={
        <Typography
          onClick={() => handleClick(item)}
          sx={
            isSelected
              ? styled?.textBody?.selected
              : //   : item[singleItemScheme.title]?.length > 25
                //   ? styled?.truncate
                styled?.textBody.contrast
          }
          variant={styled?.textBody?.variant}
        >
          {item[singleItemScheme.title] || 'N/A'}
        </Typography>
      }
      subheaderTypographyProps={
        isSelected ? styled?.textBody?.selected : styled?.textBody
      }
      // subheader={() => <CardSubHeaderElement item={item} />}
      subheader={
        <Box sx={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
          <Typography
            onClick={() => handleClick(item)}
            sx={
              isSelected
                ? { ...styled?.textBody?.selected, fontSize: '0.7rem' }
                : //   : item[singleItemScheme.title]?.length > 25
                  //   ? styled?.truncate
                  { ...styled?.textBody.contrast, fontSize: '0.7rem' }
            }
            variant={styled?.textBody?.variant}
          >
            {item[singleItemScheme.subTitle] || 'N/A'}
          </Typography>
          {item.customSubTitleItem}{' '}
        </Box>
      }
      // sx={isSelected ? styled?.textBody?.selected : styled?.textBody}
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        '& .MuiCardHeader-action': { marginRight: 0 },
      }}
      variant={styled?.textBody?.variant}
    />
  );
}
