import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import { type MoveTransportRequest } from '@/04_types/move/move-transport-request';
import useMoveTransportRequestStore from '@/05_stores/move/move-transport-request-store';
import DataTable, {
  type DataTableColumn,
} from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import DataTableGridSkeleton from '@/components/skeleton/data-table-grid-skeleton';
import Tooltip from '@/components/tooltip/tooltip';
import PageHeader from '@/components/typography/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import { formatName } from '@/lib/user/format-name';
import CreateMoveTransportRequestDialog from './_dialogs/create-move-transport-request-dialog';
import DeleteMoveTransportRequestDialog from './_dialogs/delete-move-transport-request-dialog';
import UpdateMoveTransportRequestDialog from './_dialogs/update-move-transport-request-dialog';

const MoveTransportRequestsPage = () => {
  // Store
  const { setSelectedMoveTransportRequest } = useMoveTransportRequestStore();

  // Dialog states
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Tanstack query hook for pagination
  const moveTransportRequestsPagination =
    useTanstackPaginateQuery<MoveTransportRequest>({
      endpoint: '/move/transport-requests',
      defaultSort: 'id',
    });

  // Table column definitions
  const columns: DataTableColumn[] = [
    { label: 'ID', column: 'id', className: 'w-[80px]' },
    { label: 'Rider Type', column: 'rider_type' },
    { label: 'Passenger Name', column: 'passenger_name' },
    { label: 'Pickup Location', column: 'pickup_location' },
    { label: 'Dropoff Location', column: 'dropoff_location' },
    { label: 'Pickup Date Time', column: 'pickup_date_time' },
    { label: 'Dropoff Date Time', column: 'dropoff_date_time' },
    { label: 'Status', column: 'status' },
    { label: 'Driver', column: 'move_driver_id' },
    { label: 'Vehicle', column: 'move_vehicle_id' },
    { label: 'Notes', column: 'notes' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button size="sm" onClick={() => setOpenCreateDialog(true)}>
      Create
    </Button>
  );

  // List view content
  const list = (
    <>
      {moveTransportRequestsPagination.data?.records
        ? moveTransportRequestsPagination.data.records.map(
            moveTransportRequest => (
              <TableRow key={moveTransportRequest.id}>
                <TableCell>{moveTransportRequest.id}</TableCell>
                <TableCell>{moveTransportRequest.rider_type}</TableCell>
                <TableCell>{moveTransportRequest.passenger_name}</TableCell>
                <TableCell>{moveTransportRequest.pickup_location}</TableCell>
                <TableCell>{moveTransportRequest.dropoff_location}</TableCell>
                <TableCell>
                  {getDateTimezone(
                    moveTransportRequest.pickup_date_time,
                    'date_time',
                  )}
                </TableCell>
                <TableCell>
                  {getDateTimezone(
                    moveTransportRequest.dropoff_date_time,
                    'date_time',
                  )}
                </TableCell>
                <TableCell>{moveTransportRequest.status}</TableCell>
                <TableCell>
                  {formatName(moveTransportRequest.move_driver, 'semifull')}
                </TableCell>
                <TableCell>
                  {moveTransportRequest.move_vehicle?.vehicle_name}
                </TableCell>
                <TableCell>{moveTransportRequest.notes}</TableCell>
                <TableCell>
                  {getDateTimezone(
                    moveTransportRequest.created_at,
                    'date_time',
                  )}
                </TableCell>
                <TableCell>
                  <InputGroup size="sm">
                    <Tooltip content="Update">
                      <Button
                        variant="info"
                        size="icon-xs"
                        onClick={() => {
                          setSelectedMoveTransportRequest(moveTransportRequest);
                          setOpenUpdateDialog(true);
                        }}
                      >
                        <FaPenToSquare />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete">
                      <Button
                        variant="destructive"
                        size="icon-xs"
                        onClick={() => {
                          setSelectedMoveTransportRequest(moveTransportRequest);
                          setOpenDeleteDialog(true);
                        }}
                      >
                        <FaTrash />
                      </Button>
                    </Tooltip>
                  </InputGroup>
                </TableCell>
              </TableRow>
            ),
          )
        : null}
    </>
  );

  // Grid view content
  const grid = (
    <>
      {moveTransportRequestsPagination.data?.records ? (
        <div className="flex flex-col gap-2">
          {moveTransportRequestsPagination.data.records.map(
            moveTransportRequest => (
              <Card key={moveTransportRequest.id}>
                <CardBody className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">
                        {moveTransportRequest.passenger_name}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {moveTransportRequest.rider_type}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tooltip content="Update">
                        <Button
                          variant="info"
                          size="icon-xs"
                          onClick={() => {
                            setSelectedMoveTransportRequest(
                              moveTransportRequest,
                            );
                            setOpenUpdateDialog(true);
                          }}
                        >
                          <FaPenToSquare />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Delete">
                        <Button
                          variant="destructive"
                          size="icon-xs"
                          onClick={() => {
                            setSelectedMoveTransportRequest(
                              moveTransportRequest,
                            );
                            setOpenDeleteDialog(true);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground font-medium">
                        Pickup
                      </p>
                      <p className="truncate">
                        {moveTransportRequest.pickup_location}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {getDateTimezone(
                          moveTransportRequest.pickup_date_time,
                          'date_time',
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground font-medium">
                        Dropoff
                      </p>
                      <p className="truncate">
                        {moveTransportRequest.dropoff_location}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {getDateTimezone(
                          moveTransportRequest.dropoff_date_time,
                          'date_time',
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge variant="info">{moveTransportRequest.status}</Badge>
                    {moveTransportRequest.move_driver && (
                      <div className="text-muted-foreground text-xs">
                        Driver:{' '}
                        {formatName(
                          moveTransportRequest.move_driver,
                          'semifull',
                        )}
                      </div>
                    )}
                    <Separator className="h-5" orientation="vertical" />
                    {moveTransportRequest.move_vehicle?.vehicle_name && (
                      <div className="text-muted-foreground text-xs">
                        Vehicle:{' '}
                        {moveTransportRequest.move_vehicle.vehicle_name}
                      </div>
                    )}
                  </div>

                  {moveTransportRequest.notes && (
                    <div className="mt-3 border-t pt-3">
                      <p className="text-muted-foreground text-sm font-medium">
                        Notes
                      </p>
                      <p className="line-clamp-2 text-sm">
                        {moveTransportRequest.notes}
                      </p>
                    </div>
                  )}

                  <div className="mt-3 border-t pt-3">
                    <p className="text-muted-foreground text-xs">
                      Created:{' '}
                      {getDateTimezone(
                        moveTransportRequest.created_at,
                        'date_time',
                      )}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ),
          )}
        </div>
      ) : null}
    </>
  );

  return (
    <>
      <PageHeader className="mb-3">Move Transport Requests</PageHeader>

      <Card>
        <CardBody>
          <DataTable
            pagination={moveTransportRequestsPagination}
            columns={columns}
            actions={actions}
            showViewToggle
            list={list}
            grid={grid}
            gridSkeleton={<DataTableGridSkeleton />}
          ></DataTable>
        </CardBody>
      </Card>

      {/* Dialogs */}
      <CreateMoveTransportRequestDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        refetch={moveTransportRequestsPagination.refetch}
      />
      <UpdateMoveTransportRequestDialog
        open={openUpdateDialog}
        setOpen={setOpenUpdateDialog}
        refetch={moveTransportRequestsPagination.refetch}
      />
      <DeleteMoveTransportRequestDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        refetch={moveTransportRequestsPagination.refetch}
      />
    </>
  );
};

export default MoveTransportRequestsPage;
