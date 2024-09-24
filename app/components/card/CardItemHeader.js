import React from 'react';

import CardHeader from '@mui/material/CardHeader';
import { IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';

export default function CardItemHeader({
  item,
  itemContext,
  alertElement,
  isSelected,
  singleItemScheme,
  CardSubHeaderElement,
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
        <IconButton aria-label="settings" sx={styled?.iconButton?.action}>
          <MoreVertIcon />
        </IconButton>
      }
      title={
        <Typography
          onClick={() => handleClick(item)}
          sx={
            isSelected
              ? styled?.textBody?.selected
              : //   : item[singleItemScheme.title]?.length > 25
                //   ? styled?.truncate
                styled?.textBody
          }
          variant={styled?.textBody?.variant}
        >
          {item[singleItemScheme.title] || 'N/A'}
        </Typography>
      }
      subheaderTypographyProps={
        isSelected ? styled?.textBody?.selected : styled?.textBody
      }
      subheader={() => <CardSubHeaderElement item={item} />}
      // sx={isSelected ? styled?.textBody?.selected : styled?.textBody}
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
      variant={styled?.textBody?.variant}
    />
  );
}
