import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import useMoveVehicleStore from '@/05_stores/move/move-vehicle-store';
import { mainInstance } from '@/07_instances/main-instance';
import SystemDropdownSelect from '@/components/react-select/system-dropdown-select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createReactSelectSchema } from '@/lib/zod/zod-helpers';

// Form validation schema
const FormSchema = z.object({
  vehicle_name: z.string().min(1, { message: 'Required' }),
  capacity: z.string().min(1, { message: 'Required' }),
  status: createReactSelectSchema(),
});

// Props
type UpdateMoveVehicleDialogProps = {
  open: boolean; // Dialog open state
  setOpen: (value: boolean) => void; // Function to open/close dialog
  refetch: () => void; // Function to refetch the table data after update
};

const UpdateMoveVehicleDialog = ({
  open,
  setOpen,
  refetch,
}: UpdateMoveVehicleDialogProps) => {
  // Zustand store
  const { selectedMoveVehicle } = useMoveVehicleStore();

  // Initialize react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      vehicle_name: '',
      capacity: '',
      status: undefined,
    },
  });

  // Populate form with selected item's data
  useEffect(() => {
    if (selectedMoveVehicle) {
      form.reset({
        vehicle_name: selectedMoveVehicle.vehicle_name || '',
        capacity: String(selectedMoveVehicle.capacity) || '',
        status: selectedMoveVehicle.status
          ? {
              value: selectedMoveVehicle.status,
              label: selectedMoveVehicle.status,
            }
          : undefined,
      });
    }
  }, [selectedMoveVehicle, form]);

  // Loading state for submit button
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoadingUpdate(true);

    const newData = {
      ...data,
      status: data.status?.value,
    };

    toast.promise(
      mainInstance.patch(`/move/vehicles/${selectedMoveVehicle?.id}`, newData),
      {
        loading: 'Loading...',
        success: () => {
          refetch();
          setOpen(false);
          return 'Success!';
        },
        error: error =>
          error.response?.newData?.message ||
          error.message ||
          'An error occurred',
        finally: () => setIsLoadingUpdate(false), // Reset loading state
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <DialogHeader>
              <DialogTitle>Update Move Vehicle</DialogTitle>
            </DialogHeader>

            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                {/* Vehicle Name Field */}
                <FormField
                  control={form.control}
                  name="vehicle_name"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Vehicle Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Capacity Field */}
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Status Field */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field, fieldState }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <SystemDropdownSelect
                          className={`${fieldState.invalid ? 'invalid' : ''}`}
                          module="Move"
                          type="Vehicle Status"
                          placeholder="Select status"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogBody>

            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoadingUpdate}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMoveVehicleDialog;
