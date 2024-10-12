import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';

import LogInProviders from './signUplogInElements/LogInProviders';
import CustomSignUp from './signUplogInElements/CustomSignUp';
import Header from './signUplogInElements/Header';
import Footer from './signUplogInElements/Footer';

export default function CardCompiler({ widgetProps }) {
  const { showSignUp, handleSubmit, onSubmit, switchToSignUp, error, styled } =
    widgetProps;

  const cards = [
    {
      component: <LogInProviders widgetProps={widgetProps} />,
      showHeader: false,
      showFooter: false,
    },
    {
      component: <CustomSignUp widgetProps={widgetProps} />,
      showHeader: true,
      showFooter: true,
    },
  ];

  return (
    <>
      {cards.map((card, i) => (
        <React.Fragment key={i}>
          <Box sx={styled.signUpLogInCard}>
            <Header widgetProps={widgetProps} show={card.showHeader} />
            {card.component}
            <Footer widgetProps={widgetProps} show={card.showFooter} />
          </Box>
          {i < cards.length - 1 && (
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                color: 'white',
                backgroundColor: 'white',
                margin: '2rem 2rem',
              }}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
}
