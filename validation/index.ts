import * as yup from 'yup';

/**
 * Schema for updating user details in the Admin Dashboard.
 * Used by: EditUserForm.tsx
 */
export const updateUserSchema = yup.object().shape({
  name: yup
    .string()
    .required('admin.users.edit.validation.nameRequired')
    .min(3, 'admin.users.edit.validation.nameMin'),
  email: yup
    .string()
    .email('admin.users.edit.validation.emailInvalid')
    .required('admin.users.edit.validation.emailRequired'),
  phone: yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .matches(/^[0-9]+$/, {
      message: 'admin.users.edit.validation.phoneNumeric',
      excludeEmptyString: true,
    }),
  location: yup.string().nullable(),
  role: yup
    .string()
    .oneOf(['student', 'instructor'])
    .required('admin.users.edit.validation.roleRequired'),
  status: yup
    .string()
    .oneOf(['active', 'inactive', 'pending', 'under_review'])
    .required('admin.users.edit.validation.statusRequired'),
  bio: yup.string().nullable(),
});
