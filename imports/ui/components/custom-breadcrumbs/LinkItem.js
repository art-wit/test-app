import React from 'react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
// @mui
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

BreadcrumbsLink.propTypes = {
  activeLast: PropTypes.bool,
  disabled: PropTypes.bool,
  link: PropTypes.shape({
    route: PropTypes.string,
    icon: PropTypes.node,
    name: PropTypes.string,
  }),
};

export default function BreadcrumbsLink({ link, activeLast, disabled }) {
  const { name, route, icon } = link;

  const goTo = (route) => {
    FlowRouter.go(route);
  }

  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: 'text.primary',
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && {
      cursor: 'default',
      pointerEvents: 'none',
      color: 'text.disabled',
    }),
  };

  const renderContent = (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: 'inherit',
            '& svg': { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}

      {name}
    </>
  );

  if (route) {
    return (
      <Link href="" onClick={() => goTo(route)} sx={styles}>
        {renderContent}
      </Link>
    );
  }

  return <Box sx={styles}> {renderContent} </Box>;
}
