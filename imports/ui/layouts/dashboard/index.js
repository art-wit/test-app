import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Layout as CommonLayout } from '../Layout';

export default function Layout({ children }) {
  return (
    <CommonLayout>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </CommonLayout>
  )
}