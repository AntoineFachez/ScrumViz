import { Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';

export default function BreadCrumbs() {
  return (
    <>
      {' '}
      <Breadcrumbs
        maxItems={2}
        aria-label="breadcrumb"
        sx={
          {
            //   width: '100%',
            //   display: 'flex',
            //   flexFlow: 'row nowrap',
          }
        }
      >
        <Link
          underline="hover"
          color="inherit"
          href="#"
          sx={{ color: 'white' }}
        >
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="#"
          sx={{ color: 'white' }}
        >
          Catalog
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="#"
          sx={{ color: 'white' }}
        >
          Accessories
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="#"
          sx={{ color: 'white' }}
        >
          New Collection
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Belts</Typography>
      </Breadcrumbs>
    </>
  );
}
