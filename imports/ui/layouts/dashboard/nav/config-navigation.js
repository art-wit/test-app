import React from 'react';
// paths
import { DASHBOARD } from '/imports/routes/ui-paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // ОСНОВНОЕ
  // ----------------------------------------------------------------------
  {
    subheader: 'Основное',
    items: [
      { title: 'Главная', path: DASHBOARD.root, icon: ICONS.dashboard },
      { title: 'Статистика', path: DASHBOARD.analytics, icon: ICONS.analytics },
    ],
  },

  // МЕНЕДЖМЕНТ
  // ----------------------------------------------------------------------
  {
    subheader: 'Менеджмент',
    items: [
      // ПОЛЬЗОВАТЕЛЬ
      {
        title: 'Пользователь',
        path: DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Создать', path: DASHBOARD.user.create },
          { title: 'Редактировать', path: DASHBOARD.user.edit },
          { title: 'Пользователи', path: DASHBOARD.user.list },
        ],
      },

      // ОРГАНИЗАЦИЯ
      {
        title: 'Организация',
        path: DASHBOARD.organization.root,
        icon: ICONS.banking,
        children: [
          { title: 'Создать', path: DASHBOARD.organization.create },
          { title: 'Редактировать', path: DASHBOARD.organization.edit },
          { title: 'Организации', path: DASHBOARD.organization.list },
        ],
      }
    ],
  },

];

export default navConfig;
