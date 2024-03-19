import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { APP } from '/imports/routes/ui-paths';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

export default function AuthLoginForm() {

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    login: Yup.string().required('Пользователь обязателен')/*.email('Email должен быть корректным')*/,
    password: Yup.string().required('Пароль обязателен'),
  });

  const defaultValues = {
    login: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    Meteor.loginWithPassword(
      data.get('login'),
      data.get('password'),
      error => {
        if (error) {
          reset();
          if (error.error === 403) {
            setError('afterSubmit', {
              ...error,
              message: 'Неправильный логин или пароль, попробуйте еще раз',
            });
          } else {
            setError('afterSubmit', {
              ...error,
              message: error.message || error,
            });
          }
        } else {
          // Successful user login, no redirect
          FlowRouter.go(APP.root);
        }
      })
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="login" label="Логин" />

        <RHFTextField
          name="password"
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
      </Stack>

      <LoadingButton
        autoFocus={true}
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Войти
      </LoadingButton>
    </FormProvider>
  );
}
