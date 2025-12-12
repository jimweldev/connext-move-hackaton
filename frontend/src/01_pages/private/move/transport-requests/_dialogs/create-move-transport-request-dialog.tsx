import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDownIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { toast } from 'sonner';
import { z } from 'zod';
import { mainInstance } from '@/07_instances/main-instance';
import MoveVehicleSelect from '@/components/react-select/move-vehicle-select';
import SystemDropdownSelect from '@/components/react-select/system-dropdown-select';
import UserSelect from '@/components/react-select/user-select';
import { Button } from '@/components/ui/button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/ui/button-group';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { createReactSelectSchema } from '@/lib/zod/zod-helpers';

// Form validation schema
const FormSchema = z.object({
  rider_type: createReactSelectSchema(true),
  passenger_name: z.string().min(1, { message: 'Required' }),
  passenger_department: z.string().min(1, { message: 'Required' }),
  passenger_email: z.string().min(1, { message: 'Required' }),
  pickup_location: z.string().min(1, { message: 'Required' }),
  dropoff_location: z.string().min(1, { message: 'Required' }),
  pickup_date_time: z.string().min(1, { message: 'Required' }),
  dropoff_date_time: z.string().min(1, { message: 'Required' }),
  purpose: z.string().min(1, { message: 'Required' }),
  status: createReactSelectSchema(true),
  move_driver_id: createReactSelectSchema(true),
  move_vehicle_id: createReactSelectSchema(true),
  external_service_flag: createReactSelectSchema(true),
  external_service_provider: z.string().min(1, { message: 'Required' }),
  notes: z.string().min(1, { message: 'Required' }),
});

// Props
type CreateMoveTransportRequestDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
};

const CreateMoveTransportRequestDialog = ({
  open,
  setOpen,
  refetch,
}: CreateMoveTransportRequestDialogProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rider_type: undefined,
      passenger_name: '',
      passenger_department: '',
      passenger_email: '',
      pickup_location: '',
      dropoff_location: '',
      pickup_date_time: '',
      dropoff_date_time: '',
      purpose: '',
      status: undefined,
      move_driver_id: undefined,
      move_vehicle_id: undefined,
      external_service_flag: undefined,
      external_service_provider: '',
      notes: '',
    },
  });

  const [isLoadingCreateItem, setIsLoadingCreateItem] = useState(false);

  const onSubmit = (data: z.infer<typeof FormSchema>, keepOpen = false) => {
    setIsLoadingCreateItem(true);

    const newData = {
      ...data,
      rider_type: data.rider_type?.value,
      status: data.status?.value,
      move_driver_id: data.move_driver_id?.value,
      move_vehicle_id: data.move_vehicle_id?.value,
      external_service_flag: data.external_service_flag?.value,
    };

    toast.promise(mainInstance.post(`/move/transport-requests`, newData), {
      loading: 'Loading...',
      success: () => {
        refetch();
        if (!keepOpen) {
          form.reset();
          setOpen(false);
        }
        return 'Success!';
      },
      error: error =>
        error.response?.data?.message || error.message || 'An error occurred',
      finally: () => setIsLoadingCreateItem(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent size="2xl" autoFocus>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(d => onSubmit(d))}
            autoComplete="off"
          >
            <DialogHeader>
              <DialogTitle>Create Move Transport Request</DialogTitle>
            </DialogHeader>

            <DialogBody>
              <div className="grid grid-cols-12 items-start gap-3">
                <div className="col-span-12 grid grid-cols-12 gap-3 lg:col-span-6">
                  {/* Rider Type Field */}
                  <FormField
                    control={form.control}
                    name="rider_type"
                    render={({ field, fieldState }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Rider Type</FormLabel>
                        <FormControl>
                          <SystemDropdownSelect
                            className={`${fieldState.invalid ? 'invalid' : ''}`}
                            module="Move"
                            type="Rider Type"
                            placeholder="Select rider type"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Passenger Name Field */}
                  <FormField
                    control={form.control}
                    name="passenger_name"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Passenger Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Passenger Department Field */}
                  <FormField
                    control={form.control}
                    name="passenger_department"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Passenger Department</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Passenger Email Field */}
                  <FormField
                    control={form.control}
                    name="passenger_email"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Passenger Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Pickup Location Field */}
                  <FormField
                    control={form.control}
                    name="pickup_location"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Pickup Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Dropoff Location Field */}
                  <FormField
                    control={form.control}
                    name="dropoff_location"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Dropoff Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Pickup Date Time Field */}
                  <FormField
                    control={form.control}
                    name="pickup_date_time"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Pickup Date Time</FormLabel>
                        <FormControl>
                          <Input {...field} type="datetime-local" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Dropoff Date Time Field */}
                  <FormField
                    control={form.control}
                    name="dropoff_date_time"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Dropoff Date Time</FormLabel>
                        <FormControl>
                          <Input {...field} type="datetime-local" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-12 grid grid-cols-12 gap-3 lg:col-span-6">
                  {/* Purpose Field */}
                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Purpose</FormLabel>
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
                            type="Transport Request Status"
                            placeholder="Select status"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Move Driver Id Field */}
                  <FormField
                    control={form.control}
                    name="move_driver_id"
                    render={({ field, fieldState }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Driver</FormLabel>
                        <FormControl>
                          <UserSelect
                            className={`${fieldState.invalid ? 'invalid' : ''}`}
                            placeholder="Select driver"
                            value={field.value}
                            onChange={field.onChange}
                            params="account_type=driver"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Move Vehicle Id Field */}
                  <FormField
                    control={form.control}
                    name="move_vehicle_id"
                    render={({ field, fieldState }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Vehicle</FormLabel>
                        <FormControl>
                          <MoveVehicleSelect
                            className={`${fieldState.invalid ? 'invalid' : ''}`}
                            placeholder="Select vehicle"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* External Service Flag Field */}
                  <FormField
                    control={form.control}
                    name="external_service_flag"
                    render={({ field, fieldState }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>External Service Flag</FormLabel>
                        <FormControl>
                          <ReactSelect
                            className={cn(
                              'react-select-container',
                              fieldState.invalid ? 'invalid' : '',
                            )}
                            classNamePrefix="react-select"
                            options={[
                              { value: '1', label: 'Yes' },
                              { value: '2', label: 'No' },
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* External Service Provider Field */}
                  <FormField
                    control={form.control}
                    name="external_service_provider"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>External Service Provider</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Notes Field */}
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </DialogBody>

            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <ButtonGroup>
                <Button type="submit" disabled={isLoadingCreateItem}>
                  Submit
                </Button>
                <ButtonGroupSeparator />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button disabled={isLoadingCreateItem}>
                      <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() =>
                          form.handleSubmit(data => onSubmit(data, false))()
                        }
                      >
                        Submit & Close
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          form.handleSubmit(data => onSubmit(data, true))()
                        }
                      >
                        Submit & Keep Open
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ButtonGroup>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMoveTransportRequestDialog;
