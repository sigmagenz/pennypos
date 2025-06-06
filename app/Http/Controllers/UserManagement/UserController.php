<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch users from the model except the authenticated user
        $users = User::where('id', '!=', Auth::id())
            ->latest()
            ->get(['id', 'name', 'username', 'phone', 'email', 'created_at', 'updated_at']);

        // Return a view or Inertia response with the users
        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('users/create-user');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:60',
            'username' => 'required|string|max:60|unique:users',
            'phone' => 'nullable|string|max:20|unique:users',
            'email' => 'required|string|email|max:60|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ], [
            'name.required' => 'Name is required.',
            'username.required' => 'Username is required.',
            'username.unique' => 'Username has already been taken.',
            'phone.unique' => 'Phone number has already been taken.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email must be a valid email address.',
            'email.unique' => 'Email has already been taken.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 6 characters.',
            'password.confirmed' => 'Password confirmation does not match.',
        ]);

        // Create a new user
        User::create([
            'name' => $validatedData['name'],
            'username' => $validatedData['username'],
            'phone' => $validatedData['phone'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        // Redirect or return a response
        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('users/show', [
            'user' => $user->only(['id', 'name', 'username', 'phone', 'email', 'created_at', 'updated_at']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('users/edit-user', [
            'user' => $user->only(['id', 'name', 'username', 'phone', 'email', 'created_at', 'updated_at']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:users,username,' . $user->id],
            'phone' => ['nullable', 'string', 'max:20', 'unique:users,phone,' . $user->id],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
        ], [
            'name.required' => 'Name is required.',
            'username.required' => 'Username is required.',
            'username.unique' => 'Username has already been taken.',
            'phone.unique' => 'Phone number has already been taken.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email must be a valid email address.',
            'email.unique' => 'Email has already been taken.',
        ]);

        try {
            $user->update($validatedData);

            return redirect()
                ->route('users.index')
                ->with('success', 'User updated successfully.');
        } catch (\Exception $e) {
            Log::error('User update failed', [
                'error' => $e->getMessage(),
                'user_id' => $user->id,
            ]);

            return back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update user. Please try again.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            // Get the authenticated user ID safely
            $authenticatedUser = Auth::user();
            $deletedBy = $authenticatedUser ? $authenticatedUser->id : 'system';

            // Log the deletion for audit purposes
            Log::info('User deleted', [
                'user_id' => $user->id,
                'user_name' => $user->name,
                'user_email' => $user->email,
                'deleted_by' => $deletedBy,
                'deleted_at' => now(),
            ]);

            $user->delete();

            return redirect()
                ->route('users.index')
                ->with('success', 'User deleted successfully.');
        } catch (\Exception $e) {
            Log::error('User deletion failed', [
                'error' => $e->getMessage(),
                'user_id' => $user->id,
                'stack_trace' => $e->getTraceAsString(),
            ]);

            return back()
                ->withErrors(['error' => 'Failed to delete user. Please try again.']);
        }
    }
}
