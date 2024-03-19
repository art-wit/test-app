import React from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { APP, DASHBOARD } from '/imports/routes/ui-paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../sections/user/UserNewEditForm';

// ----------------------------------------------------------------------

export const UserCreatePage = () => {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Создать нового пользователя</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'} >
        <CustomBreadcrumbs
          heading=" Новый пользователь"
          links={[
            {
              name: 'Главная',
              route: APP.root,
            },
            {
              name: 'Пользователи',
              route: DASHBOARD.user.list,
            },
            { name: 'Создать' },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </>
  );
}
