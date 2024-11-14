<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\EstablishmentController;
use App\Http\Controllers\TableController;

Route::get('/', function () {
    return Inertia::render('Public/Welcome');
});

Route::get('login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/create-session', [SessionController::class, 'create'])->name('create-session');

Route::resource('/menu', MenuController::class);
Route::resource('/category', CategoryController::class);
// Route::get('/category', [CategoryController::class, 'index'])->name('category.index');

Route::get('/dashboard', function () {
    return Inertia::render('Profile/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/estabelecimentos', EstablishmentController::class)->names('establishments')->parameters(['estabelecimentos' => 'establishment',]);

    Route::resource('/tables', TableController::class)->names('tables')->parameters(['mesas' => 'table',]);
});

require __DIR__.'/auth.php';
