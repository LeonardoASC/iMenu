<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\MenuController;

Route::get('/', function () {
    return Inertia::render('Public/Welcome');
});

Route::get('login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/create-session', [SessionController::class, 'create'])->name('create-session');

// Route::resource('menu', 'MenuController');
Route::resource('/menu', MenuController::class);


Route::get('/dashboard', function () {
    return Inertia::render('Profile/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';