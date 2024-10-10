import { Avatar, Chip } from '@mui/material';
import React from 'react';

import { stringAvatar } from '@/utils/colorHelpers';

export default function ChipComponent({ widgetProps, item, styled }) {
  const { itemContext, itemInFocus, singleItemScheme, handleSetItemInFocus } =
    widgetProps;

  return (
    <Chip
      data-slug={item.id}
      onClick={() => handleSetItemInFocus(item)}
      multilines="true"
      avatar={
        <Avatar
          // onClick={() => handleClick(item)}
          sx={styled?.avatar}
          aria-label={itemContext}
          // src={item?.basics?.[`${itemContext}ImageUrl`]}
          {...stringAvatar(item[singleItemScheme.title] || 'N/A')}
        />
      }
      sx={
        itemInFocus?.id === item.id
          ? styled?.chip?.multilines?.selected
          : styled?.chip?.multilines?.unselected
      }
      size={styled?.chip?.size}
      variant={styled?.chip?.variant}
      //   color={
      //     itemInFocus?.id === item.id
      //       ? styled?.chip?.multilines?.selected.color
      //       : ''
      //   }
      label={item[singleItemScheme.title] || 'N/A'}
    />
  );
}
