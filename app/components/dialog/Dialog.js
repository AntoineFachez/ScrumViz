import * as React from 'react';
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

export default function SimpleDialog({ widgetProps }) {
  const {
    dialogTitle,
    dialogCustomComponent,
    openDialogueState,
    onCloseDialogue,
  } = widgetProps;
  const [renderDialogue, setRenderDialogue] = useState(null);

  useEffect(() => {
    setRenderDialogue(
      <Dialog
        open={openDialogueState}
        onClose={onCloseDialogue}
        sx={{ width: '100%', height: '100%' }}
        className="widget"
      >
        <DialogTitle>
          <Typography>{dialogTitle}</Typography>
        </DialogTitle>
        {dialogCustomComponent}
      </Dialog>
    );

    return () => {};
  }, [widgetProps]);

  return <>{renderDialogue}</>;
}

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

// export default function SimpleDialogDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(items[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1" component="div">
//         Selected: {selectedValue}
//       </Typography>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//       />
//     </div>
//   );
// }
