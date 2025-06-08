<?php

namespace App\Http\Controllers\RoleManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::where('name', '!=', 'SUPER_ADMIN')->latest();
        
        return Inertia::render('roles/index', [
            'roles' => $roles->with('permissions')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('roles/create', [
            'permissions' => Permission::all(['id', 'name',]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|unique:roles',
            'permissions' => 'required|array',
        ], [
            'name.required' => 'Role name is required.',
            'name.unique' => 'Role name has already been taken.',
            'permissions.array' => 'Permissions must be an array.',
        ]);

        // Create the role and assign permissions
        $role = Role::create(['name' => $validatedData['name']]);
        if (isset($validatedData['permissions'])) {
            $role->syncPermissions($validatedData['permissions']);
        }

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        return Inertia::render('roles/detail', [
            'roles' => $role->with('permissions')->latest()->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $role = Role::findOrFail($id);
        $permissions = Permission::all(['id', 'name']);

        return Inertia::render('roles/edit', [
            'role' => $role,
            'role_permissions' => $role->permissions->pluck('name')->toArray(),
            'permissions' => $permissions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|unique:roles,name,' . $id,
            'permissions' => 'required|array',
        ], [
            'name.required' => 'Role name is required.',
            'name.unique' => 'Role name has already been taken.',
            'permissions.array' => 'Permissions must be an array.',
        ]);

        // Find the role and update it
        $role = Role::findOrFail($id);
        $role->name = $validatedData['name'];
        $role->save();

        // Sync permissions
        if (isset($validatedData['permissions'])) {
            $role->syncPermissions($validatedData['permissions']);
        }

        return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        // Check if the role is not the default role
        if ($role->name === 'SUPER_ADMIN') {
            return redirect()->route('roles.index')->with('error', 'Cannot delete the admin role.');
        }

        // Delete the role
        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
    }
}
