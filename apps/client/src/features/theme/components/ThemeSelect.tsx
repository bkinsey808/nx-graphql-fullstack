import { FC, memo, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { AppSelect } from '../../../components/AppSelect';
import { THEME_CHOICES } from '../helpers/themeConsts';
import { ThemeChoiceValue } from '../helpers/themeTypes';

import { ThemeContext } from './ThemeContext';

interface ThemeChoiceFieldValues {
  themeChoiceValue: ThemeChoiceValue;
}

export const ThemeSelect: FC = memo(() => {
  const { control, watch } = useForm<ThemeChoiceFieldValues>();
  const { themeChoiceValue, setThemeChoiceValue } = useContext(ThemeContext);

  useEffect(() => {
    setThemeChoiceValue(watch('themeChoiceValue'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('themeChoiceValue')]);

  return (
    <form>
      <AppSelect<ThemeChoiceFieldValues, typeof THEME_CHOICES>
        name="themeChoiceValue"
        label="Theme Choice"
        control={control}
        options={THEME_CHOICES}
        defaultValue={themeChoiceValue}
      />
    </form>
  );
});
ThemeSelect.displayName = 'ThemeSelect';
