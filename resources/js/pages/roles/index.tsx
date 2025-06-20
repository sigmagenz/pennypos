import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import DeleteDialog from './components/delete-dialog';
import DetailDialog from './components/detail-dialog';

interface IPermissionType {
  id: string;
  name: string;
}

interface IRoleTypes {
  id: string;
  name: string;
  permissions: IPermissionType[];
  created_at: string;
  updated_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles',
    href: '/roles',
  },
];

export default function Index({ roles }: { roles: IRoleTypes[] }) {
  const [showRoleDetailDialog, setShowRoleDetailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<IRoleTypes | null>(null);

  const openRoleDetailDialog = (role: IRoleTypes) => {
    setSelectedRole(role);
    setShowRoleDetailDialog(true);
  };

  const openDeleteDialog = (role: IRoleTypes) => {
    setSelectedRole(role);
    setShowDeleteDialog(true);
  };

  const handleDeleteRole = () => {
    if (selectedRole) {
      router.delete(route('roles.destroy', selectedRole.id), {
        onSuccess: () => {
          setShowDeleteDialog(false);
          setSelectedRole(null);
        },
        onError: (errors) => {
          console.error('Delete failed:', errors);
        },
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />

      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-neutral-900/5 dark:bg-neutral-900 dark:ring-neutral-100/10">
            {/* Table Header */}
            <div className="flex justify-between px-4 py-5 sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-semibold text-neutral-900 dark:text-neutral-100">Roles</h3>
                <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">A list of all roles in the system.</p>
              </div>
              <div className="flex px-4 py-5 sm:px-6">
                <Button
                  onClick={() => {
                    router.visit('roles/create', {
                      preserveState: true,
                      preserveScroll: true,
                    });
                  }}
                >
                  Create Role
                </Button>
              </div>
            </div>

            {/* desktop */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                <thead className="bg-neutral-50 dark:bg-neutral-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
                    >
                      Updated
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
                  {roles.map((role) => (
                    <tr key={role.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-900 dark:text-neutral-100">{role.id}.</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{role.name}</div>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                        {new Date(role.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                        {new Date(role.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openRoleDetailDialog(role)}
                            className="text-blue-600 transition-colors hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            View
                          </button>
                          <button
                            onClick={() => openDeleteDialog(role)}
                            className="text-red-600 transition-colors hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* mobile */}
            <div className="block lg:hidden">
              <div className="space-y-4 p-4">
                {roles.map((role) => (
                  <div key={role.id} className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{role.name}</h4>
                        <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                          Created: {new Date(role.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => openRoleDetailDialog(role)}
                          className="text-xs text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openDeleteDialog(role)}
                          className="text-xs text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <DetailDialog open={showRoleDetailDialog} onOpenChange={setShowRoleDetailDialog} role={selectedRole} />

      <DeleteDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} role={selectedRole} onConfirm={handleDeleteRole} />
    </AppLayout>
  );
}
