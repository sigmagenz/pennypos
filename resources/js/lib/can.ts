import { usePage } from '@inertiajs/react';

type AuthProps = {
  auth?: {
    permissions?: string[];
  };
};

export function useCan(permission: string): boolean {
  const { auth } = usePage().props as AuthProps;
  return !!auth?.permissions?.includes(permission);
}
