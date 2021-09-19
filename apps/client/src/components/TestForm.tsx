import { Grid } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types'; // see https://github.com/react-hook-form/react-hook-form/issues/2073

import { THEME_CHOICES } from '../features/theme/helpers/themeConsts';
import { ThemeChoiceValue } from '../features/theme/helpers/themeTypes';

import { AppSelect } from './AppSelect';

const showThemeChoiceValue = (themeChoiceValue: ThemeChoiceValue) => {
  console.log(`themeChoiceValue: ${themeChoiceValue}`);
};
interface TestFormFieldTypes {
  firstName: string;
  lastName: string;
  themeChoiceValue: ThemeChoiceValue;
}

export const TestForm: FC = () => {
  const { control, handleSubmit, watch } = useForm<TestFormFieldTypes>();

  const onSubmit: SubmitHandler<TestFormFieldTypes> = (data) => {
    console.log(data);
  };

  showThemeChoiceValue(watch('themeChoiceValue'));

  return (
    <div style={{ margin: 30 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} direction="row">
          <Grid xs={2} item>
            <AppSelect<TestFormFieldTypes, typeof THEME_CHOICES>
              name="themeChoiceValue"
              label="Theme Choice"
              control={control}
              options={THEME_CHOICES}
              defaultValue={'system'}
            />
          </Grid>
          <Grid xs={2} item>
            <input type="submit" />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
