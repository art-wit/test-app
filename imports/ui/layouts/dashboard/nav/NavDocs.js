import React from 'react';
// @mui
import { Stack, Button, Typography, Box } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

export default function NavDocs() {

  const { user } = useAuthContext();

  return (
    <Stack
      spacing={3}
      sx={{
        px: 5,
        pb: 5,
        mt: 10,
        width: 1,
        display: 'block',
        textAlign: 'center',
      }}
    >
      <Box component="img" src="/assets/illustrations/illustration_docs.svg" />

      <div>
        <Typography gutterBottom variant="subtitle1">
          {`Привет, ${user?.displayName}`}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
          {'Нужна помощь? Можно глянуть тут:'}
        </Typography>
      </div>

      <Button href={'PATH_DOCS.root'} target="_blank" rel="noopener" variant="contained">
        {'Посмотреть'}
      </Button>
    </Stack>
  );
}
