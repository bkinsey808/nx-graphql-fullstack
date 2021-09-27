import {
  DeepMap,
  DeepPartial,
  UnionLike,
  FormState,
} from 'react-hook-form/dist/types';

import { getHelperText } from './getHelperText';

export const getHasError = <FormFieldTypes>(
  fieldName: string,
  formState: FormState<FormFieldTypes>
) => {
  const hasHelperText = !!getHelperText(fieldName, formState);
  const isSubmitted = formState.isSubmitted;
  const isDirty =
    !!formState.dirtyFields[
      fieldName as unknown as keyof DeepMap<
        DeepPartial<UnionLike<FormFieldTypes>>,
        true
      >
    ];

  if (isSubmitted && !isDirty && hasHelperText) {
    return true;
  }
  return isDirty && hasHelperText;
};
