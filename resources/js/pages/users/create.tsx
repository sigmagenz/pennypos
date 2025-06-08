import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface IRole {
  id: string;
  name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/users',
  },
  {
    title: 'Create',
    href: '/users/create',
  },
];

const Create = ({ roles }: { roles: IRole[] }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    username: '',
    phone: '',
    email: '',
    roles: [],
    password: '',
    password_confirmation: '',
  } as {
    name: string;
    username: string;
    phone?: string;
    email: string;
    roles: string[];
    password: string;
    password_confirmation: string;
  });

  const handleCheckboxChange = (role: IRole, checked: boolean) => {
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

    post(route('users.store'), {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create User" />

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
              <CardTitle className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Create New User</CardTitle>
              <CardDescription className="text-neutral-500 dark:text-neutral-400">
                Add a new user to the system by filling out the form below.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className={`w-full ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter a secure password"
                    required
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Password should be at least 6 characters long</p>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password_confirmation" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Confirm Password *
                  </Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    className={`w-full ${errors.password_confirmation ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Confirm the password"
                    required
                  />
                  {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col justify-end gap-3 pt-4 sm:flex-row">
                  <Link href="/users" className="w-full sm:w-auto">
                    <Button type="button" variant="ghost" disabled={processing} className="w-full">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={processing} className="order-first w-full sm:w-auto lg:order-last">
                    {processing ? 'Creating User...' : 'Create User'}
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
