import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface IPermissionType {
  id: string;
  name: string;
}

interface IRoleType {
  id: string;
  name: string;
}

interface EditRoleProps {
  role: IRoleType;
  role_permissions: string[];
  permissions: IPermissionType[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles',
    href: '/roles',
  },
  {
    title: 'Edit',
    href: '#',
  },
];

const Edit = ({ role, role_permissions, permissions }: EditRoleProps) => {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: role.name || '',
    permissions: role_permissions || [],
  });

  const handleCheckboxChange = (permission: IPermissionType, checked: boolean) => {
    if (checked) {
      setData('permissions', [...data.permissions, permission.name]);
    } else {
      setData(
        'permissions',
        data.permissions.filter((name: string) => name !== permission.name),
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    put(route('roles.update', role.id), {
      onSuccess: () => {
        // Will redirect to roles.index via controller
      },
      onError: (errors) => {
        console.error('Update failed:', errors);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Role - ${role.name}`} />

      <div className="py-6">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/roles"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to roles
            </Link>
          </div>

          <Card className="border-neutral-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Edit Role</CardTitle>
              <CardDescription className="text-neutral-500 dark:text-neutral-400">Update role information and permissions below.</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role ID Display */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Role ID</Label>
                  <div className="rounded-md bg-neutral-50 px-3 py-2 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                    {role.id}
                  </div>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Role Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className={`w-full ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter the role name"
                    required
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Permissions Field */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Permissions *</Label>
                  <div className="max-h-64 overflow-y-auto rounded-md border border-neutral-200 p-4 dark:border-neutral-700">
                    <div className="grid gap-3">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={`permission-${permission.id}`}
                            value={permission.name}
                            checked={data.permissions.includes(permission.name)}
                            onChange={(e) => handleCheckboxChange(permission, e.target.checked)}
                            className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:focus:ring-blue-500"
                          />
                          <Label htmlFor={`permission-${permission.id}`} className="cursor-pointer text-sm text-neutral-700 dark:text-neutral-300">
                            {permission.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {errors.permissions && <p className="text-sm text-red-500">{errors.permissions}</p>}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Selected permissions: {data.permissions.length} of {permissions.length}
                  </p>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col justify-end gap-3 pt-4 sm:flex-row">
                  <Link href="/roles" className="w-full sm:w-auto">
                    <Button type="button" variant="ghost" disabled={processing} className="w-full">
                      Cancel
                    </Button>
                  </Link>

                  <Button type="button" variant="outline" onClick={() => reset()} disabled={processing} className="w-full sm:w-auto">
                    Reset Changes
                  </Button>

                  <Button type="submit" disabled={processing} className="order-first w-full sm:w-auto lg:order-last">
                    {processing ? 'Updating Role...' : 'Update Role'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Edit;
