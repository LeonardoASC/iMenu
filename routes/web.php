<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\EstablishmentController;
use App\Http\Controllers\Admin\TableController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\RoleAndAbilityController;
use App\Http\Controllers\Admin\UserController;

Route::get('/', function () {
    return Inertia::render('Public/Welcome');
});

Route::get('login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/create-session', [SessionController::class, 'create'])->name('create-session');

Route::resource('/menu', MenuController::class);


Route::get('/dashboard', function () {
    return Inertia::render('Profile/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('admin')->group(function () {
        // Route::resource('/estabelecimentos', EstablishmentController::class)->names('admin.establishments')->parameters(['estabelecimentos' => 'establishment',]);
        Route::resource('/establishment', EstablishmentController::class);
        Route::delete('/establishment/{establishment}/force', [EstablishmentController::class, 'forceDelete'])->name('establishment.forceDelete');

        Route::resource('/category', CategoryController::class);
        Route::delete('/category/{category}/force', [CategoryController::class, 'forceDelete'])->name('category.forceDelete');

        Route::resource('/product', ProductController::class);
        Route::delete('/product/{product}/force', [ProductController::class, 'forceDelete'])->name('product.forceDelete');

        Route::resource('/order', OrderController::class);
        Route::delete('/order/{order}/force', [OrderController::class, 'forceDelete'])->name('order.forceDelete');

        Route::resource('/table', TableController::class);
        Route::delete('/table/{table}/force', [TableController::class, 'forceDelete'])->name('table.forceDelete');

        Route::put('cargos/{id}/permissoes', [RoleAndAbilityController::class, 'assignAbilitiesToRole'])->name('admin.roles.assignAbilitiesToRole');
        Route::resource('/cargos', RoleAndAbilityController::class)->names('admin.roles')->parameters(['cargos' => 'role',]);

        Route::post('/usuarios/{id}/restore', [UserController::class, 'restore'])->name('admin.users.restore');
        Route::post('/usuarios/{id}/force-delete', [UserController::class, 'forceDelete'])->name('admin.users.force-delete');
        Route::resource('/usuarios', UserController::class)->names('admin.users')->parameters(['usuarios' => 'user',]);
    });
});

require __DIR__.'/auth.php';
