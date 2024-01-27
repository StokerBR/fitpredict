import './globals.css';
import AuthGuard from '@/components/Auth/Guard';
import {AuthProvider} from '@/context/AuthContext';
import ThemeComponent from '@/theme/ThemeComponent';
import AxiosInterceptor from '@/services/api/interceptor';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Fitpredict</title>
        <meta name="description" content="Fitpredict web dashboard" />
        <link rel="icon" href="/logo_icon.png" />
      </head>
      <body>
        <AppRouterCacheProvider options={{enableCssLayer: true}}>
          <AuthProvider>
            <AxiosInterceptor>
              <ThemeComponent>
                <AuthGuard>{children}</AuthGuard>
              </ThemeComponent>
            </AxiosInterceptor>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
