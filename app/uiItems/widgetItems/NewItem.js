import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Fade,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Popper from '@mui/material/Popper';

import { Autorenew, Save } from '@mui/icons-material';
import DropzoneTextField from '@/app/components/dragDrop/Index';
import { useDropzone } from 'react-dropzone';

export default function NewItem({
  widgetProps,
  handleOnChangeAdoptPrompt,
  handleSaveNewProduct,
  styled,
}) {
  const inputRefs = useRef([]);
  // const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const { itemInFocus, scheme } = widgetProps;
  const [formData, setFormData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const previousAnchorElPosition = useRef(null);
  const idPoper = open ? 'virtual-element-popper' : undefined;

  const handleSubmit = () => {
    // console.log(formData);
    handleSaveNewProduct(formData);
  };
  const handleChange = (event, fieldId) => {
    setFormData({
      ...formData,
      [fieldId]: event.target.value,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseUp = (event) => {
    const selection = window.getSelection();

    // Resets when the selection has a length of 0
    if (!selection || selection.anchorOffset === selection.focusOffset) {
      handleClose();
      return;
    }

    const getBoundingClientRect = () => {
      if (selection.rangeCount === 0 && previousAnchorElPosition.current) {
        setOpen(false);
        return previousAnchorElPosition.current;
      }
      return selection.getRangeAt(0).getBoundingClientRect();
    };

    setOpen(true);
    setAnchorEl({ getBoundingClientRect });
  };
  const handleGenerateUUID = () => {
    // console.log('handleGenerateUUID');
  };
  const handleClearFields = () => {
    // console.log('handleClearFields');
    setFormData({});
  };
  // useEffect(() => {
  //   const initialFormData = {};
  //   for (const key in scheme) {
  //     initialFormData[key] = itemInFocus?.[key] || '';
  //   }
  //   setFormData(initialFormData);
  // }, [itemInFocus, scheme]);
  useEffect(() => {
    const initialFormData = {};
    scheme.forEach((field) => {
      initialFormData[field.key] = itemInFocus?.[field.key] || field.content;
    });
    setFormData(initialFormData);
  }, [itemInFocus, scheme]);

  // console.log(itemInFocus, formData);

  useEffect(() => {
    if (anchorEl) {
      if (typeof anchorEl === 'object') {
        previousAnchorElPosition.current = anchorEl.getBoundingClientRect();
      } else {
        previousAnchorElPosition.current = anchorEl().getBoundingClientRect();
      }
    }
  }, [anchorEl]);

  useEffect(() => {
    if (handleOnChangeAdoptPrompt) handleOnChangeAdoptPrompt(formData);

    return () => {};
  }, [formData]);
  const [productBacklogItems, setProductBacklogItems] = useState([]);

  const handleItemsUpdated = (newItems) => {
    setProductBacklogItems(newItems);
  };
  return (
    <Box
      className="widget"
      onMouseLeave={handleClose}
      component="form"
      onSubmit={handleSubmit}
      // sx={{ ...styled.widget }}
      noValidate
      autoComplete="off"
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'space-between',
          gap: 1,
          p: 1,
        }}
      >
        {scheme.map((field, i) => (
          <Box
            key={i}
            sx={{
              width: '100%',
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {field.type === 'objects' ? (
              <>
                <DropzoneTextField
                  onItemsUpdated={handleItemsUpdated}
                  zoneType="textField"
                  // getRootProps={getRootProps}
                  // getInputProps={getInputProps}
                  styled={styled}
                />
              </>
            ) : (
              <TextField
                inputRef={inputRefs.current[i]}
                required={field.required}
                id={field.key}
                label={field.key}
                value={formData[field.key]}
                defaultValue={field.content}
                sx={styled.textFieldLarge}
                size={styled.textFieldLarge.size}
                variant={styled.textFieldLarge.variant}
                multiline={field.key}
                rows={(() => {
                  switch (field.key) {
                    case 'description':
                      return 8;
                    case 'productBackLog_items':
                      return 5;
                    default:
                      return 1;
                  }
                })()}
                onMouseUp={handleMouseUp}
                onChange={(event) => handleChange(event, field.key)}
              />
            )}{' '}
            {field.key === 'id' && (
              <IconButton
                key="button1"
                onClick={handleGenerateUUID}
                sx={{ ...styled.iconButton.action }}
              >
                <Autorenew />
              </IconButton>
            )}
            <Popper
              id={idPoper}
              open={open}
              anchorEl={anchorEl}
              transition
              placement="bottom-start"
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <Typography sx={{ p: 2 }}>
                      The content of the Popper.
                    </Typography>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Box>
        ))}
      </Box>
      <Box sx={styled.signUpLogInCard.footer}>
        {' '}
        <Button
          key="button0"
          onClick={widgetProps.handleSetExample}
          startIcon={<Save sx={{ ...styled.menuButtonText.action }} />}
          sx={{ ...styled.menuButtonText.action, color: 'white' }}
        >
          load Example
        </Button>
        <Button
          key="button1"
          onClick={() => handleSaveNewProduct(formData)}
          startIcon={<Save sx={{ ...styled.menuButtonText.action }} />}
          sx={{ ...styled.menuButtonText.action, color: 'white' }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
//
