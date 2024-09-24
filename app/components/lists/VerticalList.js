import { Box, Typography } from '@mui/material';
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Draggable from '../dragDrop/Index';

export default function VerticalList({
  elements,
  keys,
  searchString,
  styled,
  setItemInFocus,
  handleSetInFocus,
  imagesLoaded,
}) {
  return (
    <>
      {/* <Box sx={styled?.widget}> */}
      <List sx={styled?.list}>
        {elements
          ?.sort((a, b) => a[keys['title']].localeCompare(b[keys['title']]))
          .filter(
            (item) =>
              !searchString ||
              item[keys['snippet']]
                .toLowerCase()
                .includes(searchString.toLowerCase())
          )
          .map((element, i) => (
            <Draggable
              key={i}
              item={element}
              context="draggable"
              htmlItem={
                <>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ display: 'flex', flexWrap: 'wrap' }}
                  >
                    <ListItemAvatar>
                      {imagesLoaded && (
                        <Avatar
                          alt="Remy Sharp"
                          src={element[keys['thumbnail']]?.source || ''}
                        />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      onClick={() => {
                        handleSetInFocus(element);
                      }}
                      primary={
                        // element[keys["title"]]
                        <Typography
                          sx={styled?.subTitle}
                          variant={styled?.subTitle.variant}
                          dangerouslySetInnerHTML={{
                            __html: element[keys['title']]
                              .replace(/<p>/g, '<div>')
                              .replace(/<\/p>/g, '</div>'), // Replace <p> with <div>
                          }}
                        />
                      }
                      secondary={
                        <React.Fragment>
                          <Box
                            sx={styled?.textBody}
                            dangerouslySetInnerHTML={{
                              __html: element[keys['snippet']]
                                .replace(/<p>/g, '<div>')
                                .replace(/<\/p>/g, '</div>'), // Replace <p> with <div>
                              // .replace(/<span>/g, "<div>")
                              // .replace(/<\/span>/g, "</div>"),
                            }}
                          />
                          {/* {
                            " TODO:  wie kann man noch dynamischer dieses wordcount machen?"
                          } */}
                          <Box
                            sx={styled?.textBody}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            length: {element[keys['wordcount']]}
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              }
            />
          ))}
      </List>
      {/* </Box> */}
    </>
  );
}
