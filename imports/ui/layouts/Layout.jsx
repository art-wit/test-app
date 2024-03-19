import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
// components
import { MotionLazyContainer } from '../components/animate';
import SnackbarProvider from '../components/snackbar';
// theme
import ThemeProvider from '../theme';
// settings
import { ThemeSettings, SettingsProvider } from '../components/settings';

export const Layout = ({ children }) => {
  return (
    <HelmetProvider>
      <SettingsProvider>
        <MotionLazyContainer>
          <ThemeProvider>
            <ThemeSettings>
              <SnackbarProvider>
                {children}
              </SnackbarProvider>
            </ThemeSettings>
          </ThemeProvider>
        </MotionLazyContainer>
      </SettingsProvider>
    </HelmetProvider>
  )
}

// export const Layout = ({ content }) => {
//   const currentUser = Meteor.user()
//   return (
//     <ThemeProvider>
//       <header>
//         <Logout />
//       </header>
//       <main>
//         {isAdmin(currentUser) &&
//           <AdminLayout
//             content={content}
//           />}
//         {isClient(currentUser) &&
//           <ClientLayout
//             content={content}
//           />}
//       </main>
//     </ThemeProvider>
//   )
// }
