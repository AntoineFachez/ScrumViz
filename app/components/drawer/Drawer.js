import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function TemporaryDrawer({
  handleToggleDrawer,
  orientationDrawer,
  drawerMenu,
  drawerFloorElement,
  styled,
}) {
  const list = (anchor) => {
    return (
      <Box
        sx={{
          width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 'auto',
          height: '100%',
          overflowY: 'auto',
        }}
        role="presentation"
      >
        {drawerFloorElement}
      </Box>
    );
  };

  return (
    <>
      {['right'].map((anchor, i) => {
        return (
          <Drawer
            key={i}
            anchor={anchor}
            open={orientationDrawer[anchor]}
            onClose={handleToggleDrawer(anchor, false)}
            sx={{
              // ...styled.widget,
              '& .MuiDrawer-paper': {
                width: anchor === 'left' ? 'fit-content' : 'fit-content',
                height: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                marginTop: '3rem',
                paddingBottom: '3rem',
                // bottom: 0,
                overflowY: 'hidden',
              },
            }}
          >
            {drawerMenu}
            {list(anchor)}
          </Drawer>
        );
      })}
    </>
  );
}
