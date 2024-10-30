import { v4 as uuidv4 } from 'uuid';
// import NavBar from '@/app/components/navBar/Index';
// import Persons from '@/app/widgets/persons/Persons';
import Products from '@/app/widgets/products/Products';
import ScrumTeams from '@/app/widgets/scrumTeams/ScrumTeams';
import TeamMembers from '@/app/widgets/teamMembers/TeamMembers';
import UserStories from '@/app/widgets/userStories/UserStories';
import ImageDropZone from '@/app/widgets/imageDropZone/Index';
import ProductBackLogs from '@/app/widgets/productBacklogs/ProductBackLogs';
import SprintPlannings from '@/app/widgets/sprintPlannings/SprintPlannings';
import SprintBackLogs from '@/app/widgets/sprintBackLogs/SprintBackLogs';
import TimeStamps from '@/app/widgets/timeStamps/TimeStamps';
import Sprints from '@/app/widgets/sprints/Sprints';
import Daily from '@/app/widgets/dailies/Dailies';
import SprintReviews from '@/app/widgets/sprintReviews/SprintReviews';
import SprintRetrospectives from '@/app/widgets/sprintRetrospectives/SprintRetrospectives';
// import AgileItem from '@/app/widgets/agileItem/AgileItem';
import Chats from '@/app/widgets/chats/Index';
import Prompts from '@/app/widgets/prompts/Prompts';

export const scrumManagerMap = [
  // {
  //   widget: NavBar,
  //   widgetName: 'NavBar',
  //   id: uuidv4(),
  //   collection: '',
  //   active: true,
  //   uiContext: '',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 36,
  //   h: 1,
  //   x: 0,
  //   y: 0,
  // },

  {
    widget: ProductBackLogs,
    widgetName: 'ProductBackLogs',
    id: uuidv4(),
    collection: 'productBackLogs',
    active: true,
    uiContext: 'productBackLogsSelector',
    startUpWidgetLayout: 'chip',
    w: 8,
    h: 8,
    x: 0,
    y: 0,
  },
  {
    widget: UserStories,
    widgetName: 'UserStories',
    id: uuidv4(),
    collection: 'userStories',
    active: true,
    uiContext: 'userStoriesSelector',
    startUpWidgetLayout: 'chip',
    w: 6,
    h: 14,
    x: 0,
    y: 0,
  },

  {
    // index: 0,
    widget: SprintPlannings,
    widgetName: 'SprintPlannings',
    id: uuidv4(),
    collection: 'sprintPlannings',
    active: true,
    uiContext: 'sprintPlanningsSelector',
    startUpWidgetLayout: 'card',
    w: 10,
    h: 14,
    x: 6,
    y: 8,
  },
  {
    // index: 0,
    widget: SprintBackLogs,
    widgetName: 'SprintBackLogs',
    id: uuidv4(),
    collection: 'sprintBackLogs',
    active: true,
    uiContext: 'sprintBackLogsSelector',
    startUpWidgetLayout: 'chip',
    w: 4,
    h: 14,
    x: 16,
    y: 0,
  },
  {
    widget: ScrumTeams,
    widgetName: 'ScrumTeams',
    id: uuidv4(),
    collection: 'scrumTeams',
    active: true,
    uiContext: 'scrumTeamSelector',
    startUpWidgetLayout: 'card',
    w: 20,
    h: 8,
    x: 8,
    y: 0,
  },
  {
    // index: 0,
    widget: Sprints,
    widgetName: 'Sprints',
    id: uuidv4(),
    collection: 'sprints',
    active: true,
    uiContext: 'sprintSelector',
    startUpWidgetLayout: 'chip',
    w: 8,
    h: 14,
    x: 20,
    y: 8,
  },
  {
    // index: 0,
    widget: Daily,
    widgetName: 'Daily',
    id: uuidv4(),
    collection: 'dailies',
    active: true,
    uiContext: 'dailiesSelector',
    startUpWidgetLayout: 'chip',
    w: 8,
    h: 8,
    x: 33,
    y: 0,
  },
  {
    // index: 0,
    widget: SprintRetrospectives,
    widgetName: 'SprintRetrospectives',
    id: uuidv4(),
    collection: 'sprintRetrospectives',
    active: true,
    uiContext: 'selector',
    startUpWidgetLayout: 'soloWidget',

    w: 8,
    h: 4,
    x: 33,
    y: 9,
  },
  {
    // index: 0,
    widget: SprintReviews,
    widgetName: 'SprintReviews',
    id: uuidv4(),
    collection: 'sprintReviews',
    active: true,
    uiContext: 'sprintReviewSelector',
    startUpWidgetLayout: 'chip',

    w: 8,
    h: 10,
    x: 33,
    y: 13,
  },

  // {
  //   // index: 0,
  //   widget: ImageDropZone,
  //   widgetName: 'ImageDropZone',
  //   id: uuidv4(),
  //     collection: "",
  //   active: true,
  //   uiContext: 'dropZone',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 8,
  //   h: 20,
  //   x: 33,
  //   y: 0,
  // },
];
export const productsMap = [
  // {
  //   widget: Products,
  //   widgetName: 'Products',
  //   id: uuidv4(),
  //   collection: 'products',
  //   active: true,
  //   uiContext: 'productsSelector',
  //   startUpWidgetLayout: 'card',
  //   w: 8,
  //   h: 22,
  //   x: 0,
  //   y: 0,
  // },
  {
    widget: ProductBackLogs,
    widgetName: 'ProductBackLogs',
    id: uuidv4(),
    collection: 'productBackLogs',
    active: true,
    uiContext: 'productBackLogsSelector',
    startUpWidgetLayout: 'card',
    w: 8,
    h: 22,
    x: 0,
    y: 0,
  },
  {
    widget: ScrumTeams,
    widgetName: 'ScrumTeams',
    id: uuidv4(),
    collection: 'scrumTeams',
    active: true,
    uiContext: 'scrumTeamSelector',
    startUpWidgetLayout: 'chip',
    w: 12,
    h: 4,
    x: 8,
    y: 0,
  },
  {
    widget: ProductBackLogs,
    widgetName: 'ProductBackLogs',
    id: uuidv4(),
    collection: 'productBackLogs',
    active: true,
    uiContext: 'productsSelector',
    startUpWidgetLayout: 'singleItem',
    w: 12,
    h: 18,
    x: 8,
    y: 4,
  },

  {
    widget: UserStories,
    widgetName: 'UserStories',
    id: uuidv4(),
    collection: 'userStories',
    active: true,
    uiContext: 'userStoriesSelector',
    startUpWidgetLayout: 'chip',
    w: 6,
    h: 22,
    x: 20,
    y: 0,
  },
  {
    // index: 0,
    widget: SprintPlannings,
    widgetName: 'SprintPlannings',
    id: uuidv4(),
    collection: 'sprintPlannings',
    active: true,
    uiContext: 'sprintPlanningsSelector',
    startUpWidgetLayout: 'card',
    w: 10,
    h: 10,
    x: 26,
    y: 0,
  },
  {
    // index: 0,
    widget: Sprints,
    widgetName: 'Sprints',
    id: uuidv4(),
    collection: 'sprints',
    active: true,
    uiContext: 'sprintSelector',
    startUpWidgetLayout: 'chip',
    w: 10,
    h: 12,
    x: 26,
    y: 10,
  },
];
export const userStoriesMap = [
  // {
  //   // index: 0,
  //   widget: ProductBackLogs,
  //   widgetName: 'ProductBackLogs',
  //   id: uuidv4(),
  //   collection: 'productBackLogs',
  //   active: true,
  //   uiContext: 'productBackLogsSelector',
  //   startUpWidgetLayout: 'chip',
  //   w: 8,
  //   h: 22,
  //   x: 0,
  //   y: 0,
  // },
  // {
  //   widget: NavBar,
  //   widgetName: 'NavBar',
  //   id: uuidv4(),
  //   collection: '',
  //   active: true,
  //   uiContext: '',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 36,
  //   h: 1,
  //   x: 0,
  //   y: 0,
  // },
  {
    widget: UserStories,
    widgetName: 'UserStories',
    id: uuidv4(),
    collection: 'userStories',
    active: true,
    uiContext: 'userStoriesSelector',
    startUpWidgetLayout: 'card',
    w: 8,
    h: 22,
    x: 0,
    y: 0,
  },
  {
    widget: ScrumTeams,
    widgetName: 'ScrumTeams',
    id: uuidv4(),
    collection: 'scrumTeams',
    active: true,
    uiContext: 'scrumTeamSelector',
    startUpWidgetLayout: 'chip',
    w: 12,
    h: 4,
    x: 8,
    y: 0,
  },
  {
    widget: UserStories,
    widgetName: 'UserStories',
    id: uuidv4(),
    collection: 'userStories',
    active: true,
    uiContext: 'userStoriesSelector',
    startUpWidgetLayout: 'singleItem',
    w: 12,
    h: 18,
    x: 8,
    y: 4,
  },

  {
    // index: 0,
    widget: SprintBackLogs,
    widgetName: 'SprintBackLogs',
    id: uuidv4(),
    collection: 'sprintBackLogs',
    active: true,
    uiContext: 'sprintBackLogsSelector',
    startUpWidgetLayout: 'chip',
    w: 6,
    h: 22,
    x: 20,
    y: 0,
  },
  {
    // index: 0,
    widget: SprintPlannings,
    widgetName: 'SprintPlannings',
    id: uuidv4(),
    collection: 'sprintPlannings',
    active: true,
    uiContext: 'sprintPlanningsSelector',
    startUpWidgetLayout: 'card',
    w: 10,
    h: 10,
    x: 26,
    y: 0,
  },
  {
    // index: 0,
    widget: Sprints,
    widgetName: 'Sprints',
    id: uuidv4(),
    collection: 'sprints',
    active: true,
    uiContext: 'sprintSelector',
    startUpWidgetLayout: 'chip',
    w: 10,
    h: 12,
    x: 26,
    y: 10,
  },
];
export const productBackLogsMap = [
  // {
  //   widget: Products,
  //   widgetName: 'Products',
  //   id: uuidv4(),
  //   collection: 'products',
  //   active: true,
  //   uiContext: 'productsSelector',
  //   startUpWidgetLayout: 'card',
  //   w: 8,
  //   h: 22,
  //   x: 0,
  //   y: 0,
  // },
  {
    widget: ProductBackLogs,
    widgetName: 'ProductBackLogs',
    id: uuidv4(),
    collection: 'productBackLogs',
    active: true,
    uiContext: 'productBackLogsSelector',
    startUpWidgetLayout: 'card',
    w: 8,
    h: 22,
    x: 0,
    y: 0,
  },
  {
    widget: ScrumTeams,
    widgetName: 'ScrumTeams',
    id: uuidv4(),
    collection: 'scrumTeams',
    active: true,
    uiContext: 'scrumTeamSelector',
    startUpWidgetLayout: 'chip',
    w: 12,
    h: 4,
    x: 8,
    y: 0,
  },
  {
    widget: ProductBackLogs,
    widgetName: 'ProductBackLogs',
    id: uuidv4(),
    collection: 'productBackLogs',
    active: true,
    uiContext: 'productsSelector',
    startUpWidgetLayout: 'singleItem',
    w: 12,
    h: 18,
    x: 8,
    y: 4,
  },

  {
    widget: UserStories,
    widgetName: 'UserStories',
    id: uuidv4(),
    collection: 'userStories',
    active: true,
    uiContext: 'userStoriesSelector',
    startUpWidgetLayout: 'chip',
    w: 6,
    h: 22,
    x: 20,
    y: 0,
  },
  {
    // index: 0,
    widget: SprintPlannings,
    widgetName: 'SprintPlannings',
    id: uuidv4(),
    collection: 'sprintPlannings',
    active: true,
    uiContext: 'sprintPlanningsSelector',
    startUpWidgetLayout: 'card',
    w: 10,
    h: 10,
    x: 26,
    y: 0,
  },
  {
    // index: 0,
    widget: Sprints,
    widgetName: 'Sprints',
    id: uuidv4(),
    collection: 'sprints',
    active: true,
    uiContext: 'sprintSelector',
    startUpWidgetLayout: 'chip',
    w: 10,
    h: 12,
    x: 26,
    y: 10,
  },
];
export const scrumTeamsMap = [
  // {
  //   widget: NavBar,
  //   widgetName: 'NavBar',
  //   id: uuidv4(),
  //   collection: '',
  //   active: true,
  //   uiContext: '',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 36,
  //   h: 1,
  //   x: 0,
  //   y: 0,
  // },
  {
    widget: ScrumTeams,
    widgetName: 'ScrumTeams',
    id: uuidv4(),
    collection: 'scrumTeams',
    active: true,
    uiContext: 'scrumTeamSelector',
    startUpWidgetLayout: 'card',
    w: 8,
    h: 22,
    x: 0,
    y: 0,
  },
  {
    // index: 0,
    widget: TeamMembers,
    widgetName: 'TeamMembers',
    id: uuidv4(),
    collection: 'teamMembers',
    active: true,
    uiContext: 'teamMembersSelector',
    startUpWidgetLayout: 'card',
    w: 8,
    h: 22,
    x: 8,
    y: 0,
  },
  {
    // index: 0,
    widget: Sprints,
    widgetName: 'Sprints',
    id: uuidv4(),
    collection: 'sprints',
    active: true,
    uiContext: 'selector',
    startUpWidgetLayout: 'flexList',
    w: 20,
    h: 20,
    x: 16,
    y: 3,
  },

  // {
  //   // index: 0,
  //   widget: ImageDropZone,
  //   widgetName: 'ImageDropZone',
  //   id: uuidv4(),
  //   collection: '',
  //   active: true,
  //   uiContext: 'dropZone',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 8,
  //   h: 20,
  //   x: 33,
  //   y: 0,
  // },
];
export const sprintPlanningsMap = [
  // {
  //   widget: NavBar,
  //   widgetName: 'NavBar',
  //   id: uuidv4(),
  //   collection: '',
  //   active: true,
  //   uiContext: '',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 36,
  //   h: 1,
  //   x: 0,
  //   y: 0,
  // },
  {
    // index: 0,
    widget: ProductBackLogs,
    widgetName: 'ProductBackLogs',
    id: uuidv4(),
    collection: 'productBackLogs',
    active: true,
    uiContext: 'productBackLogsSelector',
    startUpWidgetLayout: 'card',
    w: 8,
    h: 22,
    x: 0,
    y: 0,
  },
  {
    widget: UserStories,
    widgetName: 'UserStories',
    id: uuidv4(),
    collection: 'userStories',
    active: true,
    uiContext: 'userStoriesSelector',
    startUpWidgetLayout: 'singleItem',
    w: 10,
    h: 22,
    x: 8,
    y: 4,
  },
  {
    widget: ScrumTeams,
    widgetName: 'ScrumTeams',
    id: uuidv4(),
    collection: 'scrumTeams',
    active: true,
    uiContext: 'scrumTeamSelector',
    startUpWidgetLayout: 'card',
    w: 18,
    h: 8,
    x: 22,
    y: 0,
  },
  {
    // index: 0,
    widget: SprintPlannings,
    widgetName: 'SprintPlannings',
    id: uuidv4(),
    collection: 'sprintPlannings',
    active: true,
    uiContext: 'sprintPlanningsSelector',
    startUpWidgetLayout: 'singleItem',
    w: 12,
    h: 14,
    x: 18,
    y: 8,
  },
  // {
  //   // index: 0,
  //   widget: ProductBackLogs,
  //   widgetName: 'ProductBackLogs',
  //   id: uuidv4(),
  //   collection: 'productBackLogs',
  //   active: true,
  //   uiContext: 'productBackLogsSelector',
  //   startUpWidgetLayout: 'chip',
  //   w: 4,
  //   h: 14,
  //   x: 16,
  //   y: 0,
  // },

  {
    // index: 0,
    widget: SprintBackLogs,
    widgetName: 'SprintBackLogs',
    id: uuidv4(),
    collection: 'sprintBackLogs',
    active: true,
    uiContext: 'sprintBackLogsSelector',
    startUpWidgetLayout: 'chip',
    w: 6,
    h: 14,
    x: 30,
    y: 0,
  },
];
export const teamMembersMap = [
  // {
  //   widget: NavBar,
  //   widgetName: 'NavBar',
  //   id: uuidv4(),
  //   collection: '',
  //   active: true,
  //   uiContext: '',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 36,
  //   h: 1,
  //   x: 0,
  //   y: 0,
  // },
  {
    // index: 0,
    widget: TeamMembers,
    widgetName: 'TeamMembers',
    id: uuidv4(),
    collection: 'teamMembers',
    active: true,
    uiContext: 'teamMembersSelector',
    startUpWidgetLayout: 'card',
    w: 8,
    h: 22,
    x: 0,
    y: 0,
  },
  {
    // index: 0,
    widget: TeamMembers,
    widgetName: 'TeamMembers',
    id: uuidv4(),
    collection: 'teamMembers',
    active: true,
    uiContext: 'teamMembersSelector',
    startUpWidgetLayout: 'singleItem',
    w: 8,
    h: 22,
    x: 8,
    y: 0,
  },
  {
    // index: 0,
    widget: TimeStamps,
    widgetName: 'TimeStamps',
    id: uuidv4(),
    collection: 'timeStamps',
    active: true,
    uiContext: 'timeStampSelector',
    startUpWidgetLayout: 'card',
    w: 8,
    h: 10,
    x: 16,
    y: 0,
  },
  {
    widget: ScrumTeams,
    widgetName: 'ScrumTeams',
    id: uuidv4(),
    collection: 'scrumTeams',
    active: true,
    uiContext: 'scrumTeamSelector',
    startUpWidgetLayout: 'card',
    w: 8,
    h: 12,
    x: 16,
    y: 8,
  },
  {
    // index: 0,
    widget: Sprints,
    widgetName: 'Sprints',
    id: uuidv4(),
    collection: 'sprints',
    active: true,
    uiContext: 'selector',
    startUpWidgetLayout: 'chip',
    w: 12,
    h: 22,
    x: 24,
    y: 0,
  },
];
export const timeStampsMap = [
  // {
  //   widget: NavBar,
  //   widgetName: 'NavBar',
  //   id: uuidv4(),
  //   collection: '',
  //   active: true,
  //   uiContext: '',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 36,
  //   h: 1,
  //   x: 0,
  //   y: 0,
  // },
  {
    // index: 0,
    widget: TimeStamps,
    widgetName: 'TimeStamps',
    id: uuidv4(),
    collection: 'timeStamps',
    active: true,
    uiContext: 'timeStampSelector',
    startUpWidgetLayout: 'card',
    w: 8,
    h: 10,
    x: 8,
    y: 0,
  },
];
export const sprintsMap = [
  // {
  //   widget: NavBar,
  //   widgetName: 'NavBar',
  //   id: uuidv4(),
  //   collection: '',
  //   active: true,
  //   uiContext: '',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 36,
  //   h: 1,
  //   x: 0,
  //   y: 0,
  // },
  {
    // index: 0,
    widget: TimeStamps,
    widgetName: 'TimeStamps',
    id: uuidv4(),
    collection: 'timeStamps',
    active: true,
    uiContext: 'timeStampSelector',
    startUpWidgetLayout: 'card',
    w: 10,
    h: 12,
    x: 0,
    y: 0,
  },
  {
    widget: ScrumTeams,
    widgetName: 'ScrumTeams',
    id: uuidv4(),
    collection: 'scrumTeams',
    active: true,
    uiContext: 'scrumTeamSelector',
    startUpWidgetLayout: 'chip',
    w: 10,
    h: 10,
    x: 0,
    y: 8,
  },
  {
    // index: 0,
    widget: Sprints,
    widgetName: 'Sprints',
    id: uuidv4(),
    collection: 'sprints',
    active: true,
    uiContext: 'sprintSelector',
    startUpWidgetLayout: 'card',
    w: 8,
    h: 22,
    x: 10,
    y: 0,
  },
  {
    // index: 0,
    widget: Sprints,
    widgetName: 'Sprints',
    id: uuidv4(),
    collection: 'sprints',
    active: true,
    uiContext: 'sprintSelector',
    startUpWidgetLayout: 'singleItem',
    w: 10,
    h: 22,
    x: 18,
    y: 0,
  },
  {
    // index: 0,
    widget: Daily,
    widgetName: 'Daily',
    id: uuidv4(),
    collection: 'dailies',
    active: true,
    uiContext: 'dailiesSelector',
    startUpWidgetLayout: 'chip',
    w: 8,
    h: 22,
    x: 28,
    y: 0,
  },
];
export const dailiesMap = [
  // {
  //   widget: NavBar,
  //   widgetName: 'NavBar',
  //   id: uuidv4(),
  //   collection: '',
  //   active: true,
  //   uiContext: '',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 36,
  //   h: 1,
  //   x: 0,
  //   y: 0,
  // },
  {
    // index: 0,
    widget: TimeStamps,
    widgetName: 'TimeStamps',
    id: uuidv4(),
    collection: 'timeStamps',
    active: true,
    uiContext: 'timeStampSelector',
    startUpWidgetLayout: 'card',
    w: 10,
    h: 12,
    x: 0,
    y: 0,
  },
  {
    widget: ScrumTeams,
    widgetName: 'ScrumTeams',
    id: uuidv4(),
    collection: 'scrumTeams',
    active: true,
    uiContext: 'scrumTeamSelector',
    startUpWidgetLayout: 'card',
    w: 10,
    h: 10,
    x: 0,
    y: 8,
  },
  {
    // index: 0,
    widget: Sprints,
    widgetName: 'Sprints',
    id: uuidv4(),
    collection: 'sprints',
    active: true,
    uiContext: 'sprintSelector',
    startUpWidgetLayout: 'card',
    w: 12,
    h: 22,
    x: 10,
    y: 0,
  },
  {
    // index: 0,
    widget: Daily,
    widgetName: 'Daily',
    id: uuidv4(),
    collection: 'dailies',
    active: true,
    uiContext: 'dailiesSelector',
    startUpWidgetLayout: 'chip',
    w: 14,
    h: 22,
    x: 22,
    y: 0,
  },
];
export const sprintReviewsMap = [
  // {
  //   widget: NavBar,
  //   widgetName: 'NavBar',
  //   id: uuidv4(),
  //   collection: '',
  //   active: true,
  //   uiContext: '',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 36,
  //   h: 1,
  //   x: 0,
  //   y: 0,
  // },
  {
    widget: ProductBackLogs,
    widgetName: 'ProductBackLogs',
    id: uuidv4(),
    collection: 'productBackLogs',
    active: true,
    uiContext: 'productBackLogsSelector',
    startUpWidgetLayout: 'chip',
    w: 6,
    h: 10,
    x: 0,
    y: 0,
  },

  {
    widget: UserStories,
    widgetName: 'UserStories',
    id: uuidv4(),
    collection: 'userStories',
    active: true,
    uiContext: 'userStoriesSelector',
    startUpWidgetLayout: 'chip',
    w: 6,
    h: 22,
    x: 6,
    y: 0,
  },
  {
    widget: UserStories,
    widgetName: 'UserStories',
    id: uuidv4(),
    collection: 'userStories',
    active: true,
    uiContext: 'userStoriesSelector',
    startUpWidgetLayout: 'soloWidget',
    w: 12,
    h: 22,
    x: 12,
    y: 0,
  },
  {
    widget: SprintPlannings,
    widgetName: 'SprintPlannings',
    id: uuidv4(),
    collection: 'sprintPlannings',
    active: true,
    uiContext: 'sprintPlanningsSelector',
    startUpWidgetLayout: 'chip',
    w: 12,
    h: 8,
    x: 24,
    y: 0,
  },
  {
    widget: ProductBackLogs,
    widgetName: 'ProductBackLogs',
    id: uuidv4(),
    collection: 'productIncrements',
    active: true,
    uiContext: 'productBackLogsSelector',
    startUpWidgetLayout: 'chip',
    w: 12,
    h: 14,
    x: 24,
    y: 0,
  },
];
export const sprintRetrospectivesMap = [
  // {
  //   widget: NavBar,
  //   widgetName: 'NavBar',
  //   id: uuidv4(),
  //   collection: '',
  //   active: true,
  //   uiContext: '',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 36,
  //   h: 1,
  //   x: 0,
  //   y: 0,
  // },
  {
    widget: SprintRetrospectives,
    widgetName: 'SprintRetrospectives',
    id: uuidv4(),
    collection: 'sprintRetrospectives',
    active: true,
    uiContext: 'sprintRetrospectivesSelector',
    startUpWidgetLayout: 'chip',
    w: 6,
    h: 10,
    x: 0,
    y: 0,
  },

  {
    widget: UserStories,
    widgetName: 'UserStories',
    id: uuidv4(),
    collection: 'userStories',
    active: true,
    uiContext: 'userStoriesSelector',
    startUpWidgetLayout: 'chip',
    w: 6,
    h: 22,
    x: 6,
    y: 0,
  },
  {
    widget: UserStories,
    widgetName: 'UserStories',
    id: uuidv4(),
    collection: 'userStories',
    active: true,
    uiContext: 'userStoriesSelector',
    startUpWidgetLayout: 'soloWidget',
    w: 12,
    h: 22,
    x: 12,
    y: 0,
  },
  {
    widget: SprintPlannings,
    widgetName: 'SprintPlannings',
    id: uuidv4(),
    collection: 'sprintPlannings',
    active: true,
    uiContext: 'sprintPlanningsSelector',
    startUpWidgetLayout: 'chip',
    w: 12,
    h: 8,
    x: 24,
    y: 0,
  },
  {
    widget: ProductBackLogs,
    widgetName: 'ProductBackLogs',
    id: uuidv4(),
    collection: 'productIncrements',
    active: true,
    uiContext: 'productBackLogsSelector',
    startUpWidgetLayout: 'chip',
    w: 12,
    h: 14,
    x: 24,
    y: 0,
  },
];
export const chatsMap = [
  // {
  //   widget: NavBar,
  //   widgetName: 'NavBar',
  //   id: uuidv4(),
  //   collection: '',
  //   active: true,
  //   uiContext: '',
  //   startUpWidgetLayout: 'soloWidget',
  //   w: 36,
  //   h: 1,
  //   x: 0,
  //   y: 0,
  // },
  {
    widget: Chats,
    widgetName: 'Chats',
    id: uuidv4(),
    collection: 'chats',
    active: true,
    uiContext: 'menu',
    startUpWidgetLayout: 'horizontal',
    w: 16,
    h: 2,
    x: 6,
    y: 0,
  },
  {
    widget: Chats,
    widgetName: 'Chats',
    id: uuidv4(),
    collection: 'chats',
    active: true,
    uiContext: 'chatsSelector',
    startUpWidgetLayout: 'flexList',
    w: 6,
    h: 14,
    x: 0,
    y: 4,
  },
  {
    widget: Prompts,
    widgetName: 'Prompts',
    id: uuidv4(),
    collection: 'Prompts',
    active: true,
    uiContext: 'promptsSelector',
    startUpWidgetLayout: 'flexList',
    w: 6,
    h: 10,
    x: 0,
    y: 4,
  },

  // {
  //   widget: Chats,
  //   widgetName: 'Chats',
  //   id: uuidv4(),
  //   collection: 'chats',
  //   active: true,
  //   uiContext: 'vertical',
  //   startUpWidgetLayout: 'vertical',
  //   w: 36,
  //   h: 10,
  //   x: 0,
  //   y: 30,
  // },

  {
    widget: Chats,
    widgetName: 'Chats',
    id: uuidv4(),
    collection: 'chats',
    active: true,
    uiContext: 'vertical',
    startUpWidgetLayout: 'vertical',
    w: 16,
    h: 16,
    x: 6,
    y: 0,
  },
  {
    widget: Chats,
    widgetName: 'Chats',
    id: uuidv4(),
    collection: 'chats',
    active: true,
    uiContext: 'inputField',
    startUpWidgetLayout: 'inputField',
    w: 16,
    h: 6,
    x: 6,
    y: 0,
  },
  {
    widget: Chats,
    widgetName: 'Chats',
    id: uuidv4(),
    collection: 'chats',
    active: true,
    uiContext: 'singleItem',
    startUpWidgetLayout: 'soloWidget',
    w: 14,
    h: 16,
    x: 22,
    y: 0,
  },
];
// export const agileCodingMap = [
//   // {
//   //   widget: NavBar,
//   //   widgetName: 'NavBar',
//   //   id: uuidv4(),
//   //   collection: '',
//   //   active: true,
//   //   uiContext: '',
//   //   startUpWidgetLayout: 'soloWidget',
//   //   w: 36,
//   //   h: 1,
//   //   x: 0,
//   //   y: 0,
//   // },
//   {
//     widget: AgileItem,
//     widgetName: 'AgileItem',
//     id: uuidv4(),
//     collection: '',
//     active: true,
//     uiContext: '',
//     startUpWidgetLayout: 'soloWidget',
//     w: 8,
//     h: 8,
//     x: 0,
//     y: 0,
//   },
//   {
//     widget: AgileItem,
//     widgetName: 'AgileItem',
//     id: uuidv4(),
//     collection: '',
//     active: true,
//     uiContext: '',
//     startUpWidgetLayout: 'soloWidget',
//     w: 6,
//     h: 12,
//     x: 0,
//     y: 0,
//   },

//   {
//     widget: AgileItem,
//     widgetName: 'AgileItem',
//     id: uuidv4(),
//     collection: '',
//     active: true,
//     uiContext: '',
//     startUpWidgetLayout: 'soloWidget',
//     w: 10,
//     h: 12,
//     x: 6,
//     y: 8,
//   },
//   {
//     widget: AgileItem,
//     widgetName: 'AgileItem',
//     id: uuidv4(),
//     collection: '',
//     active: true,
//     uiContext: '',
//     startUpWidgetLayout: 'soloWidget',
//     w: 4,
//     h: 14,
//     x: 16,
//     y: 0,
//   },
//   {
//     widget: AgileItem,
//     widgetName: 'AgileItem',
//     id: uuidv4(),
//     collection: '',
//     active: true,
//     uiContext: '',
//     startUpWidgetLayout: 'soloWidget',
//     w: 20,
//     h: 8,
//     x: 8,
//     y: 0,
//   },
//   {
//     widget: AgileItem,
//     widgetName: 'AgileItem',
//     id: uuidv4(),
//     collection: '',
//     active: true,
//     uiContext: '',
//     startUpWidgetLayout: 'soloWidget',
//     w: 8,
//     h: 14,
//     x: 20,
//     y: 8,
//   },
//   {
//     widget: AgileItem,
//     widgetName: 'AgileItem',
//     id: uuidv4(),
//     collection: '',
//     active: true,
//     uiContext: '',
//     startUpWidgetLayout: 'soloWidget',
//     w: 8,
//     h: 8,
//     x: 33,
//     y: 0,
//   },
//   {
//     widget: AgileItem,
//     widgetName: 'AgileItem',
//     id: uuidv4(),
//     collection: '',
//     active: true,
//     uiContext: '',
//     startUpWidgetLayout: 'soloWidget',

//     w: 8,
//     h: 4,
//     x: 33,
//     y: 9,
//   },
//   {
//     widget: AgileItem,
//     widgetName: 'AgileItem',
//     id: uuidv4(),
//     collection: '',
//     active: true,
//     uiContext: '',
//     startUpWidgetLayout: 'soloWidget',
//     w: 8,
//     h: 10,
//     x: 33,
//     y: 13,
//   },
// ];
