<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            "users.view",
            "users.create",
            "users.edit",
            "users.delete",
            "roles.view",
            "roles.create",
            "roles.edit",
            "roles.delete",
            "permissions.view",
            "permissions.create",
            "permissions.edit",
            "permissions.delete",
        ];

        foreach ($permissions as $permission => $value) {
            Permission::create(['name' => $value]);
        }
    }
}
