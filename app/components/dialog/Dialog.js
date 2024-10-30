import * as React from 'react';
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import { Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useMode } from '@/app/theme/ThemeContext';

// export default function TemporaryDrawer({
//   drawerMenu,
//   drawerFloorElement,
//   handleToggleDrawer,
//   orientationDrawer,
//   styled,
// }) {
//   const list = (anchor) => {
//     return (
//       <Box
//         sx={{
//           width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 'auto',
//           height: '100%',
//           overflowY: 'auto',
//         }}
//         role="presentation"
//       >
//         {drawerFloorElement}
//       </Box>
//     );
//   };

//   return (
//     <>
//       {['right'].map((anchor, i) => {
//         return (
//           <Drawer
//             key={i}
//             anchor={anchor}
//             open={orientationDrawer[anchor]}
//             onClose={handleToggleDrawer(anchor, false)}
//             sx={{
//               // ...styled.widget,
//               '& .MuiDrawer-paper': {
//                 width: anchor === 'left' ? 'fit-content' : 'fit-content',
//                 height: '100%',
//                 display: 'flex',
//                 justifyContent: 'flex-start',
//                 marginTop: '3rem',
//                 paddingBottom: '3rem',
//                 // bottom: 0,
//                 overflowY: 'hidden',
//               },
//             }}
//           >
//             {drawerMenu}
//             {list(anchor)}
//           </Drawer>
//         );
//       })}
//     </>
//   );
// }

export default function SimpleDialog({ widgetProps }) {
  const [theme, colorMode, palette, styled] = useMode();
  const {
    dialogTitle,
    dialogCustomComponent,
    openDialogueState,
    onCloseDialogue,
    customMenu,
  } = widgetProps;
  const [renderDialogue, setRenderDialogue] = useState(null);

  useEffect(() => {
    // setRenderDialogue(dialogCustomComponent);
    setRenderDialogue(
      <Dialog
        open={openDialogueState}
        onClose={onCloseDialogue}
        sx={{
          // backgroundColor: 'black',
          '& .MuiDialog': {
            width: '100%',
            height: '80vh',
            maxWidth: '100%',
          },
        }}
        className="widget"
        fullScreen
        // fullWidth={true}
      >
        <IconButton sx={styled.iconButton.action} onClick={onCloseDialogue}>
          <Close />
        </IconButton>
        <DialogTitle>
          <Typography>{dialogTitle}</Typography>
        </DialogTitle>
        {dialogCustomComponent}
        {/* {customMenu} */}
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
