<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Table;
use App\Http\Requests\StoreTableRequest;
use App\Http\Requests\UpdateTableRequest;
use App\Repositories\TableRepository;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TableController extends Controller
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('check.ability:view-table', only: ['index', 'show']),
            new Middleware('check.ability:create-table', only: ['create', 'store']),
            new Middleware('check.ability:update-table', only: ['edit', 'update']),
            new Middleware('check.ability:delete-table', only: ['destroy', 'restore', 'forceDelete']),
        ];
    }

    private $tableRepository;

    public function __construct(TableRepository $repository) {
        $this->tableRepository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tables = $this->tableRepository->getAll();
        return Inertia::render('Admin/Table/Index', compact('tables'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Table/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTableRequest $request)
    {
        $data = $request->validated();

        $table = $this->tableRepository->create($data);

        return Redirect::route('table.index', $table->id)->with('message', 'Mesa cadastrado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $table = $this->tableRepository->findById($id);
        return Inertia::render('Admin/Table/Show', compact('table'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $table = $this->tableRepository->findById($id);
        return Inertia::render('Admin/Table/Edit', compact('table'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTableRequest $request, Table $table)
    {
        $data = $request->validated();

        $table = $this->tableRepository->update($data, $table);

        return Redirect::route('table.index', $table->id)->with('message', 'Mesa atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Table $table)
    {
        $this->tableRepository->destroy($table);

        return Redirect::route('table.index')->with('message', 'Mesa desativado com sucesso.');
    }

    public function restore(Table $table)
    {
        $this->tableRepository->restore($table);
        return Redirect::route('table.index')->with('message', 'Mesa reativado com sucesso.');
    }
}
