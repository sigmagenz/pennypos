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

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles',
    href: '/roles',
  },
  {
    title: 'Create',
    href: '/roles/create',
  },
];

const Create = ({ permissions }: { permissions: IPermissionType[] }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    permissions: [],
  } as {
    name: string;
    permissions: string[];
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

    post(route('roles.store'), {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create role" />

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
              <CardTitle className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Create New Role</CardTitle>
              <CardDescription className="text-neutral-500 dark:text-neutral-400">
                Add a new Role to the system by filling out the form below.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter the role's full name"
                    required
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Permissions
                  </Label>
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`permission-${permission.id}`}
                        value={permission.name}
                        onChange={(e) => handleCheckboxChange(permission, e.target.checked)}
                        className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:focus:ring-blue-500"
                      />
                      <Label htmlFor={`permission-${permission.id}`} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {permission.name}
                      </Label>
                    </div>
                  ))}
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                {/* Form Actions */}
                <div className="flex flex-col justify-end gap-3 pt-4 sm:flex-row">
                  <Link href="/roles" className="w-full sm:w-auto">
                    <Button type="button" variant="ghost" disabled={processing} className="w-full">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={processing} className="order-first w-full sm:w-auto lg:order-last">
                    {processing ? 'Creating role...' : 'Create role'}
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

export default Create;
