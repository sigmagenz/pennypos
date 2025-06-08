<?php

use App\Http\Controllers\RoleManagement\RoleController;
use App\Http\Controllers\UserManagement\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // ----- Dashboard Route
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    

    // ----- User Management Routes
    Route::resource('users', UserController::class)->only(['create', 'store'])->middleware('permission:users.create');

    Route::resource('users', UserController::class)->only(['edit', 'update'])->middleware('permission:users.edit');

    Route::resource('users', UserController::class)->only(['destory'])->middleware('permission:users.delete');

    Route::resource('users', UserController::class)->only(['index', 'show'])->middleware('permission:users.view|users.create|users.edit|users.delete');


    // ----- Role Management Routes (SUPER_ADMIN ONLY)
    Route::resource('roles', RoleController::class)->middleware('role:SUPER_ADMIN');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
