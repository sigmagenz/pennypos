<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class FirstHuman extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::firstOrCreate (['name' => 'SUPER_ADMIN']);
        $allPermissions = Permission::all();
        $role->syncPermissions($allPermissions);

        $user = User::firstOrCreate(
            ['email' => 'esterus@esterus.id'],
            [
                'name' => 'Esterus',
                'username' => 'esterus',
                'password' => bcrypt('Passw0rdPassw0rd123!'),
            ]);

        $user->assignRole($role);
    }
}
