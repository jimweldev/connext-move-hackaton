import { useState } from 'react';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import useMoveTransportRequestStore from '@/05_stores/move/move-transport-request-store';
import { mainInstance } from '@/07_instances/main-instance';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';

// Props
type DeleteMoveTransportRequestDialogProps = {
  open: boolean; // Dialog open state
  setOpen: (value: boolean) => void; // Function to open/close dialog
  refetch: () => void; // Function to refetch the table data after deletion
};

const DeleteMoveTransportRequestDialog = ({
  open,
  setOpen,
  refetch,
}: DeleteMoveTransportRequestDialogProps) => {
  // Zustand store
  const { selectedMoveTransportRequest } = useMoveTransportRequestStore();

  // Loading state for delete button
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  // Handle form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingDelete(true);

    toast.promise(
      mainInstance.delete(
        `/move/transport-requests/${selectedMoveTransportRequest?.id}`,
      ),
      {
        loading: 'Loading...',
        success: () => {
          refetch();
          setOpen(false);
          return 'Success!';
        },
        error: error =>
          error.response?.data?.message || error.message || 'An error occurred',
        finally: () => setIsLoadingDelete(false),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogBody>
            {/* Warning icon */}
            <CircleAlert className="text-destructive mx-auto mb-4" size={64} />

            {/* Modal title */}
            <h3 className="text-center text-xl">
              Delete Move Transport Request
            </h3>
            <p className="text-muted-foreground mb-2 text-center">
              Are you sure you want to delete this record?
            </p>

            {/* Display item name */}
            <h2 className="text-center text-2xl font-semibold">
              {selectedMoveTransportRequest?.passenger_name}
            </h2>
            <p className="text-muted-foreground mb-2 text-center">
              {selectedMoveTransportRequest?.pickup_location} to{' '}
              {selectedMoveTransportRequest?.dropoff_location}
            </p>
          </DialogBody>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              type="submit"
              disabled={isLoadingDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMoveTransportRequestDialog;
