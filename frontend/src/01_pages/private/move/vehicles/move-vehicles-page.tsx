import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import { type MoveVehicle } from '@/04_types/move/move-vehicle';
import useMoveVehicleStore from '@/05_stores/move/move-vehicle-store';
import DataTable, {
  type DataTableColumn,
} from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import PageHeader from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateMoveVehicleDialog from './_dialogs/create-move-vehicle-dialog';
import DeleteMoveVehicleDialog from './_dialogs/delete-move-vehicle-dialog';
import UpdateMoveVehicleDialog from './_dialogs/update-move-vehicle-dialog';

const MoveVehiclesPage = () => {
  // Store
  const { setSelectedMoveVehicle } = useMoveVehicleStore();

  // Dialog states
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Tanstack query hook for pagination
  const moveVehiclesPagination = useTanstackPaginateQuery<MoveVehicle>({
    endpoint: '/move/vehicles',
    defaultSort: '-id',
  });

  // Table column definitions
  const columns: DataTableColumn[] = [
    { label: 'ID', column: 'id', className: 'w-[80px]' },
    { label: 'Vehicle Name', column: 'vehicle_name' },
    { label: 'Capacity', column: 'capacity' },
    { label: 'Status', column: 'status' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button size="sm" onClick={() => setOpenCreateDialog(true)}>
      Create
    </Button>
  );

  return (
    <>
      <PageHeader className="mb-3">Move Vehicles</PageHeader>

      <Card>
        <CardBody>
          <DataTable
            pagination={moveVehiclesPagination}
            columns={columns}
            actions={actions}
          >
            {moveVehiclesPagination.data?.records
              ? moveVehiclesPagination.data.records.map(moveVehicle => (
                  <TableRow key={moveVehicle.id}>
                    <TableCell>{moveVehicle.id}</TableCell>
                    <TableCell>{moveVehicle.vehicle_name}</TableCell>
                    <TableCell>{moveVehicle.capacity}</TableCell>
                    <TableCell>{moveVehicle.status}</TableCell>
                    <TableCell>
                      {getDateTimezone(moveVehicle.created_at, 'date_time')}
                    </TableCell>
                    <TableCell>
                      <InputGroup size="sm">
                        <Tooltip content="Update">
                          <Button
                            variant="info"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedMoveVehicle(moveVehicle);
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
                              setSelectedMoveVehicle(moveVehicle);
                              setOpenDeleteDialog(true);
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </Tooltip>
                      </InputGroup>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </DataTable>
        </CardBody>
      </Card>

      {/* Dialogs */}
      <CreateMoveVehicleDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        refetch={moveVehiclesPagination.refetch}
      />
      <UpdateMoveVehicleDialog
        open={openUpdateDialog}
        setOpen={setOpenUpdateDialog}
        refetch={moveVehiclesPagination.refetch}
      />
      <DeleteMoveVehicleDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        refetch={moveVehiclesPagination.refetch}
      />
    </>
  );
};

export default MoveVehiclesPage;
