import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock } from 'lucide-react';

interface IPermission {
  id: string;
  name: string;
}

interface IRole {
  id: string;
  name: string;
  permissions: IPermission[];
  created_at: string;
  updated_at?: string;
}

interface IDetailDialogType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: IRole | null;
}

const DetailDialog = ({ open, onOpenChange, role }: IDetailDialogType) => {
  if (!role) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">Role Details</DialogTitle>
          <DialogDescription>View detailed information about this role account.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Role Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Role Name</p>
                <p className="text-base text-neutral-900 dark:text-neutral-100">{role.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Role ID</p>
                <p className="text-base text-neutral-900 dark:text-neutral-100"># {role.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Role Permissions</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => {
                    return (
                      <Badge key={permission.id} variant="outline" className="px-2 py-1 text-xs">
                        {permission.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Status */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Role Status</h4>
            <div className="flex items-center gap-2">
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
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Role Created</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(role.created_at)}</p>
              </div>
            </div>

            {role.updated_at && (
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Last Updated</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(role.updated_at)}</p>
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
              window.location.href = `/roles/${role.id}/edit`;
            }}
          >
            Edit Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
