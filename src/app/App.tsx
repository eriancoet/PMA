import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </DataProvider>
    </AuthProvider>
  );
}
