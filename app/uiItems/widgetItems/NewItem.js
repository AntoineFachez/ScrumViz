import { Box, Button, Fade, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Popper from '@mui/material/Popper';

export default function NewItem({
  widgetProps,
  // dataToStore,
  // setDataToStore,
  // formData,
  // setFormData,
  handleSaveNewProduct,
  styled,
  // component,
  // sxStyle,
  // autoComplete,
  // size,
  // id,
  // label,
  // rows,
  // data,
  // scheme,
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
    // setDataToStore(formData);
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
    // setDataToStore(formData);
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

  const idPoper = open ? 'virtual-element-popper' : undefined;
  const inputRefs = useRef([]);
  return (
    <Box
      onMouseLeave={handleClose}
      component="form"
      onSubmit={handleSubmit}
      className="widget"
      sx={{
        ...styled.widget,
        width: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
        gap: 1,
        p: 1,
        '& > :not(style)': { m: 0, width: '100%' },
        backgroundColor: '#eee',
        '& .MuiDialog-root': { width: '100%' },
        '& .MuiTextField-root': { width: '100%' },
        '& .MuiInputBase-root': { width: '100%' },
        '& .MuiInputBase-input': { width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      {Object.keys(scheme).map((key, index) => (
        <div key={key}>
          {' '}
          {/* Wrap the TextField and Popper in a div */}
          <TextField
            inputRef={inputRefs.current[index]}
            onMouseUp={handleMouseUp}
            // key={key}
            sx={{ width: '100%' }}
            size={'small'}
            id={key}
            label={key}
            multiline={key}
            rows={
              key === 'description' || key === 'productBackLog_items' ? 3 : 1
            }
            value={formData[key]}
            onChange={(event) => handleChange(event, key)}
          />
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
        </div>
      ))}{' '}
      <Button
        key="button1"
        onClick={() => handleSaveNewProduct(formData)}
        sx={{ display: 'flex' }}
      >
        Save
      </Button>
      ,
    </Box>
  );
}
