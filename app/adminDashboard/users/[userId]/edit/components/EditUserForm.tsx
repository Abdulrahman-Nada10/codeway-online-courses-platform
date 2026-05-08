"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import { User, UpdateUserFormValues } from '@/types';
import { updateUserSchema } from '@/validation';
import DashboardInput from '@/app/components/ui/DashboardInput';
import CustomDropdown from '@/app/components/ui/CustomDropdown';
import Button from '@/app/components/ui/Button';

interface EditUserFormProps {
  user: User;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserFormValues>({
    resolver: yupResolver(updateUserSchema) as any,
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
      role: user.role,
      status: user.status,
      bio: user.bio || '',
    },
  });

  const onSubmit = async (data: UpdateUserFormValues) => {
    console.log('Form Data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push(`/adminDashboard/users/${user.id}`);
  };

  const roleOptions = [
    { value: 'student', label: t('admin.users.table.roles.student') },
    { value: 'instructor', label: t('admin.users.table.roles.instructor') },
  ];

  const statusOptions = [
    { value: 'active', label: t('admin.users.table.statuses.active') },
    { value: 'inactive', label: t('admin.users.table.statuses.inactive') },
    { value: 'pending', label: t('admin.users.table.statuses.pending') },
    { value: 'under_review', label: t('admin.users.table.statuses.under_review') },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 bg-white dark:bg-[#1E293B] rounded-2xl p-6 md:p-8 border border-orange-50 dark:border-gray-800 shadow-sm">
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
        {t('admin.users.edit.basicInfo')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Full Name */}
        <DashboardInput
          label={t('admin.users.edit.labels.fullName')}
          placeholder={t('admin.users.edit.labels.fullName')}
          {...register('name')}
          error={errors.name?.message ? t(errors.name.message) : undefined}
        />

        {/* Email */}
        <DashboardInput
          label={t('admin.users.edit.labels.email')}
          placeholder="example@gmail.com"
          {...register('email')}
          error={errors.email?.message ? t(errors.email.message) : undefined}
        />

        {/* Phone */}
        <DashboardInput
          label={t('admin.users.edit.labels.phone')}
          placeholder="01012345678"
          {...register('phone')}
          error={errors.phone?.message ? t(errors.phone.message) : undefined}
        />

        {/* Location */}
        <DashboardInput
          label={t('admin.users.edit.labels.location')}
          placeholder={t('admin.users.edit.labels.location')}
          {...register('location')}
          error={errors.location?.message ? t(errors.location.message) : undefined}
        />

        {/* Role */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <CustomDropdown
              variant="input"
              label={t('admin.users.edit.labels.role')}
              options={roleOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.role?.message ? t(errors.role.message) : undefined}
            />
          )}
        />

        {/* Status */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <CustomDropdown
              variant="input"
              label={t('admin.users.edit.labels.status')}
              options={statusOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.status?.message ? t(errors.status.message) : undefined}
            />
          )}
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2">
        <label className="block font-cairo font-medium text-sm text-[#113555] dark:text-gray-300">
          {t('admin.users.edit.labels.bio')}
        </label>
        <textarea
          className="w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] dark:bg-[#0F172A] input-shadow border border-transparent focus:border-[#FF6400] outline-none transition-colors duration-200 min-h-[150px] text-[#113555] dark:text-white placeholder:text-gray-400"
          placeholder={t('admin.users.edit.labels.bio')}
          {...register('bio')}
        />
        {errors.bio && <p className="text-red-500 text-xs mt-1">{t(errors.bio.message || '')}</p>}
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-4 mt-8">
        <Button 
          type="button" 
          variant="cancel" 

          onClick={() => router.push(`/adminDashboard/users/${user.id}`)}
          className="px-10"
        >
          {t('admin.users.edit.buttons.cancel')}
        </Button>
        <Button 
          type="submit" 
          variant="save" 
          
          isLoading={isSubmitting}
          className="flex items-center gap-3 px-8"
        >
          <Save size={18} />
          {t('admin.users.edit.buttons.save')}
         
        </Button>
      </div>
    </form>
  );
};

export default EditUserForm;
