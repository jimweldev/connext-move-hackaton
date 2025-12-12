<?php

namespace Database\Seeders;

use App\Helpers\DynamicLogger;
use App\Models\Rbac\RbacPermission;
use App\Models\Rbac\RbacRole;
use App\Models\Rbac\RbacRolePermission;
use Illuminate\Database\Seeder;

class RbacSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $logger = DynamicLogger::create('laravel.log', 'local');

        try {
            // create `Create User` permission
            $permission = RbacPermission::create([
                'label' => 'Create User',
                'value' => 'create-user',
            ]);

            // update `Update User` permission
            $permission = RbacPermission::create([
                'label' => 'Update User',
                'value' => 'update-user',
            ]);

            // delete `Delete User` permission
            $permission = RbacPermission::create([
                'label' => 'Delete User',
                'value' => 'delete-user',
            ]);

            // create `View Connext Move Admin` permission
            $permission = RbacPermission::create([
                'label' => 'View Connext Move Admin',
                'value' => 'view-connext-move-admin',
            ]);

            // create `Connext Move Admin` role
            $role = RbacRole::create([
                'label' => 'Connext Move Admin',
                'value' => 'connext-move-admin',
            ]);

            // assign `View Connext Move Admin` permission to `Connext Move Admin` role
            RbacRolePermission::create([
                'rbac_role_id' => $role->id,
                'rbac_permission_id' => $permission->id,
            ]);

            // create `Connext Move Admin` role
            $role = RbacRole::create([
                'label' => 'Connext Move Assistant',
                'value' => 'connext-move-assistant',
            ]);

            // assign `View Connext Move Admin` permission to `Connext Move Assistant` role
            RbacRolePermission::create([
                'rbac_role_id' => $role->id,
                'rbac_permission_id' => $permission->id,
            ]);
        } catch (\Throwable $th) {
            // throw $th;
            $logger->error($th->getMessage());
        }
    }
}
