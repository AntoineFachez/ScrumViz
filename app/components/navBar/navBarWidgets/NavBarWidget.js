import React, { useContext } from 'react';
import { Box } from '@mui/material';

import ScrumManagerPage from '../../../scrumManager/page';

import UserStory from '../../../widgets/userStories/UserStories';
import ProductBackLogs from '../../../widgets/productBacklogs/ProductBackLogs';
import Persons from '../../../widgets/persons/Persons';
import TeamMembers from '../../../widgets/teamMembers/TeamMembers';
import SprintPlannings from '../../../widgets/sprintPlannings/SprintPlannings';
import Sprint from '../../../widgets/sprints/Sprints';
import Daily from '../../../widgets/daily/Daily';
import SprintReviews from '../../../widgets/sprintReviews/SprintReviews';
import SprintRetrospectives from '../../../widgets/sprintRetrospectives/SprintRetrospectives';
import ImageDropzone from '../../../widgets/imageDropZone/Index';

const Components = {
  ScrumManagerPage: ScrumManagerPage,
  UserStory: UserStory,
  SprintPlannings: SprintPlannings,
  ProductBackLogs: ProductBackLogs,
  Persons: Persons,
  TeamMembers: TeamMembers,
  Sprint: Sprint,
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
