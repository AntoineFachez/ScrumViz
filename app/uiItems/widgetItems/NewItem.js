import {
  Box,
  Button,
  Fade,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Popper from '@mui/material/Popper';
import { Autorenew, Save } from '@mui/icons-material';

export default function NewItem({
  widgetProps,
  handleOnChangeAdoptPrompt,
  handleSaveNewProduct,
  styled,
}) {
  const { itemInFocus, scheme } = widgetProps;
  const [formData, setFormData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const previousAnchorElPosition = useRef(null);

  useEffect(() => {
    const initialFormData = {};
    for (const key in scheme) {
      initialFormData[key] = itemInFocus?.[key] || '';
    }
    setFormData(initialFormData);
  }, [itemInFocus, scheme]);

  const handleSubmit = () => {
    console.log(formData);
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
    handleOnChangeAdoptPrompt(formData);

    return () => {};
  }, [formData]);

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
    console.log('handleGenerateUUID');
  };
  const idPoper = open ? 'virtual-element-popper' : undefined;
  const inputRefs = useRef([]);
  return (
    <Box
      onMouseLeave={handleClose}
      component="form"
      onSubmit={handleSubmit}
      className="widget"
      sx={
        {
          // ...styled.widget,
          // width: '100%',
          // display: 'flex',
          // flexFlow: 'column nowrap',
          // justifyContent: 'space-between',
          // // gap: 1,
          // p: 1,
          // '& > :not(style)': { m: 0, width: '100%' },
          // backgroundColor: '#eee',
          // '& .MuiDialog-root': { width: '100%' },
          // '& .MuiTextField-root': { width: '100%' },
          // '& .MuiInputBase-root': { width: '100%' },
          // '& .MuiInputBase-input': { width: '100%' },
        }
      }
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
          // backgroundColor: '#333',
          // '& .MuiInputLabel-sizeSmall': {
          //   width: 'fit-content',
          //   color: '#c2c2c2',
          //   // backgroundColor: 'white',
          // },
        }}
      >
        {Object.keys(scheme).map((key, index) => (
          <Box
            key={key}
            sx={{
              width: '100%',
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {' '}
            {/* Wrap the TextField and Popper in a div */}
            <TextField
              inputRef={inputRefs.current[index]}
              onMouseUp={handleMouseUp}
              // key={key}
              sx={styled.textFieldLarge}
              size={styled.textFieldLarge.size}
              variant={styled.textFieldLarge.variant}
              id={key}
              label={key}
              multiline={key}
              rows={(() => {
                switch (key) {
                  case 'description':
                    return 8;
                  case 'productBackLog_items':
                    return 5;
                  default:
                    return 1;
                }
              })()}
              value={formData[key]}
              onChange={(event) => handleChange(event, key)}
              required={'true'}
            />
            {key === 'id' && (
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
        ))}{' '}
      </Box>
      <Box sx={styled.signUpLogInCard.footer}>
        {' '}
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
