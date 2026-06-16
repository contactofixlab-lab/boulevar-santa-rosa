import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default function HomePage() {
  const user = getCurrentUser();

  if (user) {
    const defaultRoutes: Record<string, string> = {
      finanzas: '/dashboard/finanzas',
      comercial: '/dashboard/comercial',
      marketing: '/dashboard/marketing',
      administrador: '/dashboard/finanzas',
    };
    redirect(defaultRoutes[user.role] || '/dashboard/finanzas');
  } else {
    redirect('/login');
  }
}
