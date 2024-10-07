import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
// import { makeStyles } from "@mui/styles";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardItemHeader from './CardItemHeader';
import { stringAvatar } from '@/utils/colorHelpers';
// import { getContrastColor } from "../../utils/colorFunctions";
// import moment from 'moment';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardItem({
  listItemRef,
  dataSlug,
  context,
  item,
  singleItemScheme,
  handleClick,
  itemContext,
  itemInFocus,
  customElement,
  cardSubHeaderElement,
  alertElement,
  styled,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const CardSubHeaderElement = cardSubHeaderElement;
  const isSelected = itemInFocus?.id === item?.id;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (isSelected) {
      handleExpandClick();
    }
    //  else {
    //   handleExpandClick();
    // }
    return () => {
      // handleExpandClick();
    };
  }, [itemInFocus]);

  return (
    <Card
      sx={isSelected ? styled.card.selected : styled?.card}
      ref={listItemRef}
      data-slug={dataSlug}
    >
      <CardItemHeader
        item={item}
        itemContext={itemContext}
        isSelected={isSelected}
        singleItemScheme={singleItemScheme}
        CardSubHeaderElement={CardSubHeaderElement}
        alertElement={alertElement}
        stringAvatar={stringAvatar}
        handleClick={handleClick}
        styled={styled}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {item[singleItemScheme.url] && (
          <CardMedia
            component="img"
            image={item[singleItemScheme.url]}
            alt={`image of ${item[singleItemScheme.title] || 'N/A'}`}
            sx={{
              width: '100%',
              maxHeight: '10rem',
              color: 'white',
              fontSize: '0.6rem',
              objectFit: 'contain',
            }}
            onClick={() => handleClick(item)}
          />
        )}
        <CardContent
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            // padding: '0 2rem',
          }}
        >
          {item[singleItemScheme.description] && (
            <Typography
              sx={
                isSelected
                  ? {
                      ...styled?.textBody?.selected,
                      textAlign: 'justify',
                    }
                  : styled?.textBody
              }
              variant={styled?.textBody?.variant}
            >
              {item[singleItemScheme.description]}
            </Typography>
          )}
          {customElement && customElement}
        </CardContent>
      </Collapse>{' '}
      <CardActions disableSpacing sx={{ margin: 0, padding: 0 }}>
        {' '}
        <IconButton
          aria-label="add to favorites"
          sx={styled?.iconButton?.action}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" sx={styled?.iconButton?.action}>
          <ShareIcon />
        </IconButton>{' '}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={styled?.iconButton?.action}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
