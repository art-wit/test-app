import React from 'react';
// @mui
import { Alert, Stack, Typography } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Логин</Typography>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Обратитесь к вашему <strong>Администратору</strong> для получения учетных данных
      </Alert>

      <AuthLoginForm />

    </LoginLayout>
  );
}
