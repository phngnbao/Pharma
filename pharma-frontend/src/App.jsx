import { RouterProvider } from 'react-router'
import router from './routes/router'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReTitleProvider } from 're-title'
import { useEffect } from 'react'
import Aos from 'aos'

const queryClient = new QueryClient()

function App() {

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <ReTitleProvider defaultTitle="PharmaCare - Cung Cấp Thuốc Miễn Phí">
      <ThemeProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </ReTitleProvider>
  )
} export default App
