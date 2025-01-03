<?php


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\{
    ProfileController,
    SessionController,
    MenuController,
    Admin\CategoryController,
    Admin\EstablishmentController,
    Admin\TableController,
    Admin\ProductController,
    Admin\OrderController,
    Admin\RoleAndAbilityController,
    Admin\UserController,
    Admin\OrderProductController,
    Admin\ChargeController,
};

Route::get('/', fn() => Inertia::render('Public/Welcome'));
Route::post('/create-session', [SessionController::class, 'create'])->name('create-session');
Route::get('/login', fn() => Inertia::render('Auth/Login'))->name('login');

Route::middleware(['check.session'])->group(function () {
    Route::get('/menu', [MenuController::class, 'index'])->name('menu.index');
    Route::get('/menu/{product}', [MenuController::class, 'showProduct'])->name('menu.showProduct');
    Route::get('/order/userorder', [OrderController::class, 'userOrder'])->name('order.userOrder');
    Route::post('/user/orderProduct', [OrderProductController::class, 'createUserOrder'])->name('user.orderProduct.create');
    Route::get('/command', [OrderController::Class, 'command'])->name('menu.command');
    Route::put('/finishcomand/{id}', [OrderController::class, 'finishcomand'])->name('order.finishcomand');
    Route::get('/chat', [OrderController::Class, 'chat'])->name('chat');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Profile/Dashboard'))->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('admin')->group(function () {
        Route::resource('/establishment', EstablishmentController::class);
        Route::delete('/establishment/{establishment}/force', [EstablishmentController::class, 'forceDelete'])->name('establishment.forceDelete');

        Route::resource('/category', CategoryController::class);
        Route::delete('/category/{category}/force', [CategoryController::class, 'forceDelete'])->name('category.forceDelete');

        Route::resource('/product', ProductController::class);
        Route::delete('/product/{product}/force', [ProductController::class, 'forceDelete'])->name('product.forceDelete');

        Route::resource('/order', OrderController::class);
        Route::delete('/order/{order}/force', [OrderController::class, 'forceDelete'])->name('order.forceDelete');

        Route::resource('orderProduct', OrderProductController::class);
        Route::get('/orderProduct/{id}/products', [OrderProductController::class, 'orderProducts'])->name('orderProduct.orderProducts');

        Route::resource('/table', TableController::class);
        Route::delete('/table/{table}/force', [TableController::class, 'forceDelete'])->name('table.forceDelete');

        Route::put('cargos/{id}/permissoes', [RoleAndAbilityController::class, 'assignAbilitiesToRole'])->name('admin.roles.assignAbilitiesToRole');
        Route::resource('/cargos', RoleAndAbilityController::class)->names('admin.roles')->parameters(['cargos' => 'role',]);

        Route::post('/usuarios/{id}/restore', [UserController::class, 'restore'])->name('admin.users.restore');
        Route::delete('/usuarios/{id}/force', [UserController::class, 'forceDelete'])->name('admin.users.forceDelete');
        Route::resource('/usuarios', UserController::class)->names('admin.users')->parameters(['usuarios' => 'user',]);

        Route::resource('/charges', ChargeController::class);
        Route::delete('/charges/{id}/force', [ChargeController::class, 'forceDelete'])->name('charge.forceDelete');
    });
});

require __DIR__.'/auth.php';
