import localFont from 'next/font/local';

import NavBar from './components/navBar/Index';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from './widgets/auth/AuthContext';
import { UIProvider } from '@/context/UIContext';
import { SearchProvider } from '@/context/SearchContext';
import { UserStoriesProvider } from './widgets/userStories/UserStoriesContext';
import { SprintsProvider } from './widgets/sprints/SprintsContext';
import { ScrumTeamsProvider } from './widgets/scrumTeams/ScrumTeamsContext';
import { TimeStampsProvider } from './widgets/timeStamps/TimeStampsContext';
import { BackLogsProvider } from './widgets/productBacklogs/ProductBackLogsContext';
import { DailiesProvider } from './widgets/dailies/DailiesContext';
import { SprintPlanningsProvider } from './widgets/sprintPlannings/SprintPlanningsContext';
import { SprintBackLogsProvider } from './widgets/sprintBackLogs/SprintBackLogsContext';
import { SprintReviewProvider } from './widgets/sprintReviews/SprintReviewsContext';
import { TeamMembersProvider } from './widgets/teamMembers/TeamMembersContext';
import { SprintRetrospectivesProvider } from './widgets/sprintRetrospectives/SprintRetrospectivesContext';
import { ScrumManagerProvider } from './scrumManager/ScrumManagerContext';
import { ChatsProvider } from './widgets/chats/ChatsContext';
import { UserProvider } from '@/context/UserContext';
import { NavBarProvider } from './widgets/navBar/NavBarContext';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const andaleMono = localFont({
  src: './fonts/AndaleMono.ttf',
  variable: '--font-andale-mono',
  weight: '100 900',
});
const robotoLight = localFont({
  src: './fonts/Roboto-Light.ttf',
  variable: '--font-Roboto-Light',
  weight: '100 900',
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
        ${andaleMono.variable} 
        ${robotoLight.variable} 
       `}
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          // maxHeight: '100vh',
          // maxWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <AppProvider>
          <AuthProvider>
            <UserProvider>
              <UIProvider>
                <SearchProvider>
                  <NavBarProvider>
                    <TeamMembersProvider>
                      <UserStoriesProvider>
                        <SprintsProvider>
                          <TimeStampsProvider>
                            <ScrumTeamsProvider>
                              <BackLogsProvider>
                                <DailiesProvider>
                                  <SprintBackLogsProvider>
                                    <SprintReviewProvider>
                                      <SprintPlanningsProvider>
                                        <SprintRetrospectivesProvider>
                                          <ScrumManagerProvider>
                                            <ChatsProvider>
                                              {children}
                                            </ChatsProvider>
                                          </ScrumManagerProvider>
                                        </SprintRetrospectivesProvider>
                                      </SprintPlanningsProvider>
                                    </SprintReviewProvider>
                                  </SprintBackLogsProvider>
                                </DailiesProvider>
                              </BackLogsProvider>
                            </ScrumTeamsProvider>
                          </TimeStampsProvider>
                        </SprintsProvider>
                      </UserStoriesProvider>
                    </TeamMembersProvider>
                  </NavBarProvider>
                </SearchProvider>
              </UIProvider>
            </UserProvider>
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
