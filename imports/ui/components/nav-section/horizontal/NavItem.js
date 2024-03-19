import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
// @mui
import { Box, Tooltip, ListItemText, Link } from '@mui/material';
// routes
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
//
import Iconify from '../../iconify';
import { StyledItem, StyledIcon } from './styles';

// ----------------------------------------------------------------------

const NavItem = forwardRef(({ item, depth, open, active, isExternalLink, ...other }, ref) => {

  const { title, path, icon, info, children, disabled, caption, roles } = item;

  const goTo = () => FlowRouter.go(path);

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem ref={ref} open={open} depth={depth} active={active} disabled={disabled} {...other}>
      {icon && <StyledIcon>{icon}</StyledIcon>}

      <ListItemText
        primary={title}
        primaryTypographyProps={{
          noWrap: true,
          component: 'span',
          variant: active ? 'subtitle2' : 'body2',
        }}
      />

      {info && (
        <Box component="span" sx={{ ml: 1, lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {caption && (
        <Tooltip title={caption} arrow>
          <Box component="span" sx={{ ml: 0.5, lineHeight: 0 }}>
            <Iconify icon="eva:info-outline" width={16} />
          </Box>
        </Tooltip>
      )}

      {!!children && (
        <Iconify
          icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'}
          width={16}
          sx={{ ml: 0.5, flexShrink: 0 }}
        />
      )}
    </StyledItem>
  );

  const renderItem = () => {
    // ExternalLink
    if (isExternalLink)
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );

    // Default
    return (
      <Link onClick={goTo} underline="none">
        {renderContent}
      </Link>
    );
  };

  return <> {renderItem()} </>;
});

NavItem.propTypes = {
  open: PropTypes.bool,
  active: PropTypes.bool,
  item: PropTypes.object,
  depth: PropTypes.number,
  isExternalLink: PropTypes.bool,
};

export default NavItem;
