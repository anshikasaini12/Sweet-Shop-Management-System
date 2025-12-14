'use client';

import type { Sweet } from '@/lib/types';
import { useAuth } from '@/contexts/auth-context';
import PurchaseDialog from './purchase-dialog';
import AdminControls from './admin-controls';

type SweetCardActionsProps = {
  sweet: Sweet & { imageUrl: string };
};

export default function SweetCardActions({ sweet }: SweetCardActionsProps) {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <AdminControls sweet={sweet} />;
  }
  
  return <PurchaseDialog sweet={sweet} />;
}
