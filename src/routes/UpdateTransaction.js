import * as Yup from 'yup';

export const UpdateTransaction = Yup.object().shape({
  amount: Yup.number().required(),
  description: Yup.string().required(),
 
});
