import { memo, useContext, useRef } from 'react';
import { Box } from '@mui/material';

import AppContext from '@/context/AppContext';

import Grid from '../components/grid/Index';
import { useMode } from '../theme/ThemeContext';

const GridComponent = ({}) => {
  // const { styled } = useMode();
  const gridRef = useRef(null);
  const { appContext, uiGridMapContext } = useContext(AppContext);

  const componentMap = {
    create: Grid,
    read: Grid,
    scrumManager: Grid,
    productBackLogs: Grid,
    sprintPlannings: Grid,
    scrumTeams: Grid,
    teamMembers: Grid,
    userStories: Grid,
    sprints: Grid,
    dailies: Grid,
    sprint: Grid,
    sprintReviews: Grid,
    sprintRetrospectives: Grid,
    prompts: Grid,
    dropZone: Grid,
  };
  const SelectedWidget = componentMap[uiGridMapContext];

  return (
    <Box
      id="index-main"
      sx={{
        // ...styled?.centerFullAvailableSpace,
        backgroundColor: 'transparent',
      }}
    >
      {/* hello from {appContext} */}
      <Box
        // ref={gridRef}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          // margin: '2rem 0 0rem 0',
          overflowX: 'hidden',
          overflowY: 'scroll',
          // overflow: 'scroll',
          backgroundColor: 'transparent',
        }}
      >
        {SelectedWidget && (
          <SelectedWidget uiContext={null} gridRef={gridRef} />
        )}
      </Box>{' '}
    </Box>
  );
};
export default GridComponent;
