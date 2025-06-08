import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Mail, User as UserIcon } from 'lucide-react';

interface IUser {
  id: string;
  name: string;
  email: string;
  roles: { id: string; name: string }[];
  phone?: string;
  username?: string;
  created_at: string;
  updated_at?: string;
  email_verified_at?: string;
}

interface IDetailDialogType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser | null;
}

const DetailDialog = ({ open, onOpenChange, user }: IDetailDialogType) => {
  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{getInitials(user.name)}</span>
            </div>
            User Details
          </DialogTitle>
          <DialogDescription>View detailed information about this user account.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* User Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <UserIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Full Name</p>
                <p className="text-base text-neutral-900 dark:text-neutral-100">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email Address</p>
                <p className="text-base text-neutral-900 dark:text-neutral-100">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-4 w-4 text-neutral-500 dark:text-neutral-400">
                <span className="text-xs">#</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">User ID</p>
                <p className="text-base text-neutral-900 dark:text-neutral-100">{user.id}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Assigned Roles</p>
              <div className="flex flex-wrap gap-2">
                {user.roles.map((role) => {
                  return (
                    <Badge key={role.id} variant="outline" className="px-2 py-1 text-xs">
                      {role.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Status */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Account Status</h4>
            <div className="flex items-center gap-2">
              <Badge variant={user.email_verified_at ? 'default' : 'secondary'}>{user.email_verified_at ? 'Verified' : 'Unverified'}</Badge>
              <Badge variant="outline">Active</Badge>
            </div>
          </div>

          <Separator />

          {/* Timestamps */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Timeline</h4>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Account Created</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(user.created_at)}</p>
              </div>
            </div>

            {user.updated_at && (
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Last Updated</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(user.updated_at)}</p>
                </div>
              </div>
            )}

            {user.email_verified_at && (
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email Verified</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(user.email_verified_at)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            type="button"
            onClick={() => {
              // Handle edit action - you can navigate to edit page or open edit dialog
              window.location.href = `/users/${user.id}/edit`;
            }}
          >
            Edit User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
