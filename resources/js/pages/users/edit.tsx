import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface IUser {
  id: string;
  name: string;
  username: string;
  phone?: string;
  email: string;
  roles: { id: string; name: string }[];
  created_at: string;
  updated_at: string;
}

interface EditUserProps {
  user: IUser;
  user_roles: string[];
  roles: { id: string; name: string }[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/users',
  },
  {
    title: 'Edit',
    href: '#',
  },
];

const Edit = ({ user, user_roles, roles }: EditUserProps) => {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: user.name || '',
    username: user.username || '',
    phone: user.phone || '',
    email: user.email || '',
    roles: user_roles || [],
  });

  const handleCheckboxChange = (role: { id: string; name: string }, checked: boolean) => {
    if (checked) {
      setData('roles', [...data.roles, role.name]);
    } else {
      setData(
        'roles',
        data.roles.filter((name: string) => name !== role.name),
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    put(route('users.update', user.id), {
      onSuccess: () => {
        // User will be redirected to users.index by the controller
      },
      onError: (errors) => {
        console.error('Update failed:', errors);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit User - ${user.name}`} />

      <div className="py-6">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/users"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Users
            </Link>
          </div>

          <Card className="border-neutral-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Edit User</CardTitle>
              <CardDescription className="text-neutral-500 dark:text-neutral-400">
                Update user information below. Changes will be saved immediately.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User ID Display */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">User ID</Label>
                  <div className="rounded-md bg-neutral-50 px-3 py-2 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                    {user.id}
                  </div>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className={`w-full ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter the user's full name"
                    required
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Username *
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={data.username}
                    onChange={(e) => setData('username', e.target.value)}
                    className={`w-full ${errors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter a unique username"
                    required
                  />
                  {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    className={`w-full ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter phone number (optional)"
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className={`w-full ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter the user's email address"
                    required
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Roles Field */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Assign Roles</Label>
                  <div className="max-h-40 overflow-y-auto rounded-md border border-neutral-200 p-4 dark:border-neutral-700">
                    <div className="grid gap-3">
                      {roles.map((role) => (
                        <div key={role.id} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={`role-${role.id}`}
                            value={role.name}
                            checked={data.roles.includes(role.name)}
                            onChange={(e) => handleCheckboxChange(role, e.target.checked)}
                            className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:focus:ring-blue-500"
                          />
                          <Label htmlFor={`role-${role.id}`} className="cursor-pointer text-sm text-neutral-700 dark:text-neutral-300">
                            {role.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {errors.roles && <p className="text-sm text-red-500">{errors.roles}</p>}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Selected roles: {data.roles.length} of {roles.length}
                  </p>
                </div>

                {/* Created At Display */}
                <div className="flex justify-between space-x-4">
                  <div className="w-full space-y-2">
                    <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Account Created</Label>
                    <div className="rounded-md bg-neutral-50 px-3 py-2 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <div className="w-full space-y-2">
                    <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Latest Update</Label>
                    <div className="rounded-md bg-neutral-50 px-3 py-2 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                      {new Date(user.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
                  <Link href="/users" className="w-full sm:w-auto">
                    <Button type="button" variant="ghost" disabled={processing} className="w-full">
                      Cancel
                    </Button>
                  </Link>

                  <Button type="button" variant="outline" onClick={() => reset()} disabled={processing} className="w-full sm:w-auto">
                    Reset Changes
                  </Button>

                  <Button type="submit" disabled={processing} className="order-first w-full sm:order-last sm:w-auto">
                    {processing ? 'Updating User...' : 'Update User'}
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
