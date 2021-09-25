import type { ThemeOptions } from '@mui/material/styles';

export const defaultThemeOptions: ThemeOptions = {
  components: {
    MuiFormControl: {
      defaultProps: {
        variant: 'outlined',
        sx: { mt: 1 },
        style: {
          width: '100%',
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        autoWidth: true,
        style: {
          width: '100%',
        },
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
        sx: { mt: 2 },
        style: {
          width: 'default',
        },
      },
    },
  },
};
