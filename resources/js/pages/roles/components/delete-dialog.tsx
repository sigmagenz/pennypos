import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';

interface IRole {
  id: string;
  name: string;
}

interface IDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: IRole | null;
  onConfirm: () => void;
}

const DeleteDialog = ({ open, onOpenChange, role, onConfirm }: IDeleteDialogProps) => {
  if (!role) return null;

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
            Delete Role
          </DialogTitle>
          <DialogDescription className="text-neutral-600 dark:text-neutral-400">
            This action cannot be undone. This will permanently delete the role account and remove all associated data.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Role to be deleted:</h4>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">Name:</span> {role.name}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">ID:</span> {role.id}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
