import React from 'react';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
// routes
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { APP } from '/imports/routes/ui-paths';
// @mui
import { Button, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { PageNotFoundIllustration } from '../assets/illustrations';
// layouts
import CompactLayout from '../layouts/compact';
// ----------------------------------------------------------------------

export const NotFound = () => {

  const goHome = () => {
    FlowRouter.go(APP.root);
  }

  return (
    <CompactLayout>
      <Helmet>
        <title> 404 Страница не найдена</title>
      </Helmet>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Извините, такой страницы у нас не нашлось!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Извините, мы не можем найти такую страницу. Возможно, вы опечатались в URL?
            Проверьте пожалуйста правильность адреса.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button onClick={goHome} size="large" variant="contained">
          Пойдем домой
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
