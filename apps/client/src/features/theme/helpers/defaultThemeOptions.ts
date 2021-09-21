import { ThemeOptions } from '@mui/material';

export const defaultThemeOptions: ThemeOptions = {
  components: {
    MuiFormControl: {
      defaultProps: {
        variant: 'outlined',
        style: {
          width: '100%',
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        autoWidth: true,
        // position the menu below the select
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
};
