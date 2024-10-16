import { IconButton } from '@mui/material';
import React from 'react';

export default function EnvProductionIcon() {
  return (
    <IconButton
      sx={{
        width: '2rem',
        height: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // fontSize: '1rem',
        paddingTop: '1rem',
        backgroundColor: 'red',
      }}
    >
      <mat-icon
        _ngcontent-ng-c393271864=""
        role="img"
        class="mat-icon notranslate mat-icon-no-color"
        aria-hidden="true"
        data-mat-icon-type="svg"
        data-mat-icon-name="env_production_24dp"
        data-mat-icon-namespace="firebase"
      >
        <svg
          width="2rem"
          height="2rem"
          viewBox="0 0 24 24"
          fit=""
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
        >
          <path
            d="M19.656 4.343c-2.239-.117-8.06 1.556-13.434 9.193l4.242 4.242c7.637-5.374 9.31-11.195 9.192-13.435zM13 13a2 2 0 100-4 2 2 0 000 4zm-.646 5.254c1.862-1.415 3.363-2.862 4.562-4.276l-2.21 6.629-2.352-2.353zM3.393 9.293l2.352 2.353c1.416-1.863 2.863-3.364 4.277-4.563l-6.63 2.21z"
            fill-rule="evenodd"
            stroke="white"
            fill="red"
          ></path>
        </svg>
      </mat-icon>
    </IconButton>
  );
}
