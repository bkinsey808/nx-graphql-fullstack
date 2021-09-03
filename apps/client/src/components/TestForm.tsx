import { Input } from '@material-ui/core';
import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types'; // see https://github.com/react-hook-form/react-hook-form/issues/2073

import { THEME_CHOICES } from '../features/theme/helpers/themeConsts';
import { ThemeChoice } from '../features/theme/helpers/themeTypes';

import { AppSelect } from './AppSelect';

interface IFormInput {
  firstName: string;
  lastName: string;
  themeChoice: ThemeChoice;
}

export const TestForm: FC = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        // eslint-disable-next-line react/jsx-props-no-spreading
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="themeChoice"
        control={control}
        render={({ field }) => (
          <AppSelect<ThemeChoice>
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...field}
            id="theme"
            label="Theme"
            value={'system'}
            options={THEME_CHOICES}
          />
        )}
      />
      <input type="submit" />
    </form>
  );
};
