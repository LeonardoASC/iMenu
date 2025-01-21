<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Repositories\RoleAndAbilityRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class RoleAndAbilityController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('check.ability:view-roles', only: ['index']),
            new Middleware('check.ability:create-roles', only: ['create', 'store']),
            new Middleware('check.ability:update-roles', only: ['edit', 'update', 'show', 'assignAbilitiesToRole']),
            new Middleware('check.ability:delete-roles', only: ['destroy']),

            // new Middleware('check.ability:update-roles', only: ['show', 'assignAbilitiesToRole']),
        ];
    }

    private $roleAndAbilityRepository;

    public function __construct(RoleAndAbilityRepository $repository)
    {
        $this->roleAndAbilityRepository = $repository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $roles = $this->roleAndAbilityRepository->getAllRoles();

        return Inertia::render('Admin/Role/Index', compact('roles'));
    }

    public function create()
    {
        $abilities = $this->roleAndAbilityRepository->getAllAbilities();
        return Inertia::render('Admin/Role/Create', compact('abilities'));
    }

    public function store(StoreRoleRequest $request)
    {
        $data = $request->all();
        $role = $this->roleAndAbilityRepository->createRole($data);
        return Redirect::route('admin.roles.editAbilities', $role->id)->with('message', 'Cargo adicionado com sucesso.');
    }

    // public function abilities(Request $request)
    // {
    //     $abilities = $this->roleAndAbilityRepository->getAllAbilities();

    //     return response()->json($abilities);
    // }

    public function show($role)
    {
        $roleResult = $this->roleAndAbilityRepository->getRoleById($role);
        $abilities = $this->roleAndAbilityRepository->getAllAbilities();

        if ($roleResult->name == 'admin') {
            abort(403, 'Você não tem permissão para acessar essa página.');
        }

        return Inertia::render('Admin/Role/Show', ['role' => $roleResult, 'abilities' => $abilities]);
    }

    public function edit($role)
    {
        $roleResult = $this->roleAndAbilityRepository->getRoleById($role);

        if ($roleResult->name == 'admin') {
            abort(403, 'Você não tem permissão para acessar essa página.');
        }

        return Inertia::render('Admin/Role/Edit', ['role' => $roleResult]);
    }

    public function editAbilities($role)
    {
        $roleResult = $this->roleAndAbilityRepository->getRoleById($role);
        $abilities = $this->roleAndAbilityRepository->getAllAbilities();

        if ($roleResult->name == 'admin') {
            abort(403, 'Você não tem permissão para acessar essa página.');
        }

        return Inertia::render('Admin/Role/EditAbilities', ['role' => $roleResult, 'abilities' => $abilities]);
    }

    public function update(StoreRoleRequest $request, $role)
    {
        $data = $request->all();
        $this->roleAndAbilityRepository->updateRole($role, $data);

        return Redirect::route('admin.roles.index')->with('message', 'Cargo atualizado com sucesso.');
    }

    // public function createAbility(Request $request)
    // {
    //     $data = $request->all();
    //     return response()->json($this->roleAndAbilityRepository->createAbility($data));
    // }

    public function assignAbilitiesToRole(Request $request, $id)
    {
        $request->validate([
            'abilities' => 'required|array',
            'abilities.*' => 'required|integer|exists:abilities,id',
        ], [
            'abilities.required' => 'O campos permissões é obrigatório.',
            'abilities.*.required' => 'O campo permissão é obrigatório.',
            'abilities.*.exists' => 'A permissão não existe.',
        ]);

        $abilities = $request->get('abilities');
        $this->roleAndAbilityRepository->assignAbilitiesToRole($id, $abilities);

        return Redirect::route('admin.roles.index')->with('message', 'Permissão atualizada com sucesso.');
    }

    public function destroy($role)
    {
        if ($role === '1') {
            return Redirect::route('admin.roles.index')->with('message', 'Não é possível excluir o cargo de administrador.');
        }

        $this->roleAndAbilityRepository->deleteRole($role);
        return Redirect::route('admin.roles.index',)->with('message', 'Cargo excluído com sucesso.');
    }
}
