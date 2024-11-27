<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{

    private $userRepository;

    public function __construct(UserRepository $repository) {
        $this->userRepository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = $this->userRepository->getAll($request);
        $roles = $this->userRepository->getRoles();
        $roles->prepend(['name' => '', 'title' => 'Todos']);

        return Inertia::render('Admin/Users/Index', compact('users', 'roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = $this->userRepository->getRoles();
        return Inertia::render('Admin/Users/Create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $this->userRepository->create($data);

        return Redirect::route('admin.users.index')->with('message', 'Usuário cadastrado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load(['roles']);
        return Inertia::render('Admin/Users/Show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load(['roles']);
        $roles = $this->userRepository->getRoles();
        return Inertia::render('Admin/Users/Edit', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $this->userRepository->update($data, $user);

        return Redirect::route('admin.users.index')->with('message', 'Usuário atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $this->userRepository->destroy($user);
        return Redirect::route('admin.users.index')->with('message', 'Usuário excluído com sucesso.');
    }

    public function restore(User $user)
    {
        $this->userRepository->restore($user);
        return Redirect::route('admin.users.index')->with('message', 'Usuário recuperado com sucesso.');
    }

    public function forceDelete(User $user)
    {
        $this->userRepository->forceDelete($user);
        return Redirect::route('admin.users.index')->with('message', 'Usuário excluído permanentemente.');
    }

}
