import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import CreateFormDialog from './components/create-form-dialog';

interface IUserTypes {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({ users }: { users: IUserTypes[] }) {
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    const openCreateFormDialog = () => {
        setShowCreateDialog(true);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-neutral-900/5 dark:bg-neutral-900 dark:ring-neutral-100/10">
                        {/* Table Header */}
                        <div className="flex justify-between px-4 py-5 sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-semibold text-neutral-900 dark:text-neutral-100">Users</h3>
                                <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">A list of all users in the system.</p>
                            </div>
                            <div className="flex px-4 py-5 sm:px-6">
                                <Button onClick={openCreateFormDialog}>Create User</Button>
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
                                            Email
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
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
                                    {users.map((user) => (
                                        <tr key={user.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800">
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-900 dark:text-neutral-100">{user.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{user.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-neutral-900 dark:text-neutral-100">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                <div className="flex space-x-2">
                                                    <button className="text-indigo-600 transition-colors hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                                        Edit
                                                    </button>
                                                    <button className="text-red-600 transition-colors hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
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
                                {users.map((user) => (
                                    <div key={user.id} className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{user.name}</h4>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{user.email}</p>
                                                <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                                                    Created: {new Date(user.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex flex-col space-y-1">
                                                <button className="text-xs text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                                    Edit
                                                </button>
                                                <button className="text-xs text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
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
            <CreateFormDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
        </AppLayout>
    );
}
