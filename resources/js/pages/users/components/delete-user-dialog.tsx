import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';

interface IUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface IDeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser | null;
  onConfirm: () => void;
}

const DeleteUserDialog = ({ open, onOpenChange, user, onConfirm }: IDeleteUserDialogProps) => {
  if (!user) return null;

  const handleDelete = () => {
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-red-600 dark:text-red-400">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            Delete User
          </DialogTitle>
          <DialogDescription className="text-neutral-600 dark:text-neutral-400">
            This action cannot be undone. This will permanently delete the user account and remove all associated data.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">User to be deleted:</h4>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">ID:</span> {user.id}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
