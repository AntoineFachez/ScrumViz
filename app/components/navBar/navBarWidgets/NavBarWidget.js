import React, { useContext } from 'react';
import { Box } from '@mui/material';

// import AgileCodingPage from '../../../agileCoding/page';
import ScrumManagerPage from '../../../scrumManager/page';
import Profile from '../../../profile/page';

import Products from '../../../widgets/products/Products';
import UserStory from '../../../widgets/userStories/UserStories';
import ProductBackLogs from '../../../widgets/productBacklogs/ProductBackLogs';
import Persons from '../../../widgets/persons/Persons';
import ScrumTeams from '../../../widgets/scrumTeams/ScrumTeams';
import TeamMembers from '../../../widgets/teamMembers/TeamMembers';
import SprintPlannings from '../../../widgets/sprintPlannings/SprintPlannings';
import Sprint from '../../../widgets/sprints/Sprints';
import SprintBackLogs from '../../../widgets/sprintBackLogs/SprintBackLogs';
import Daily from '../../../widgets/dailies/Dailies';
import SprintReviews from '../../../widgets/sprintReviews/SprintReviews';
import SprintRetrospectives from '../../../widgets/sprintRetrospectives/SprintRetrospectives';
import ImageDropzone from '../../../widgets/imageDropZone/Index';

const Components = {
  // AgileCodingPage: AgileCodingPage,
  ScrumManagerPage: ScrumManagerPage,
  Products: Products,
  Profile: Profile,
  UserStory: UserStory,
  SprintPlannings: SprintPlannings,
  ProductBackLogs: ProductBackLogs,
  Persons: Persons,
  ScrumTeams: ScrumTeams,
  TeamMembers: TeamMembers,
  Sprint: Sprint,
  SprintBackLogs: SprintBackLogs,
  Daily: Daily,
  SprintReviews: SprintReviews,
  SprintRetrospectives: SprintRetrospectives,
  ImageDropzone: ImageDropzone,
};

const NavBarWidget = (block, { color, className, theme, colors, obj }) => {
  // const { theme } = useContext(AppContext);

  const contextToolBar = 'navBar';

  if (typeof Components[block.widget] !== 'undefined') {
    return React.createElement(
      Components[block.widget],
      { contextToolBar: contextToolBar, color: color, block: block },
      [
        {
          contextToolBar: contextToolBar,
          color: color,
          className: className,
          theme: theme,
          colors: colors,
          obj: obj,
        },
      ]
    );
  }
  return React.createElement(
    () => (
      <Box className="error-loading-component">
        To create component{' '}
        <strong className="error">
          {block.widget}
          {block.name}
        </strong>
        Reload page ||
        <br /> check if the UUID in WidgetList is unique ||
        <br /> if the component&apos;s name is the same as in the widget&apos;s
        component declaration.
      </Box>
    ),
    { key: block._uid }
  );
};
export default NavBarWidget;
