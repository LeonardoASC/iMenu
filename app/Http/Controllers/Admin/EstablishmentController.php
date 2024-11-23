<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Establishment;
use App\Http\Requests\StoreEstablishmentRequest;
use App\Http\Requests\UpdateEstablishmentRequest;
use App\Repositories\EstablishmentRepository;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EstablishmentController extends Controller
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('check.ability:view-establishment', only: ['index', 'show']),
            new Middleware('check.ability:create-establishment', only: ['create', 'store']),
            new Middleware('check.ability:update-establishment', only: ['edit', 'update']),
            new Middleware('check.ability:delete-establishment', only: ['destroy', 'restore', 'forceDelete']),
        ];
    }


    private $establishmentRepository;

    public function __construct(EstablishmentRepository $repository) {
        $this->establishmentRepository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $establishments = $this->establishmentRepository->getAll();
        return Inertia::render('Admin/Establishment/Index', compact('establishments'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Establishment/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEstablishmentRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('logo_path')) {
            $data['logo_path'] = $request->file('logo_path')->store('establishment', 'public');
        }

        $establishment = $this->establishmentRepository->create($data);

        return Redirect::route('establishment.index', $establishment->id)->with('message', 'Estabelecimento cadastrado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $establishment = $this->establishmentRepository->findById($id);
        return Inertia::render('Admin/Establishment/Show', compact('establishment'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $establishment = $this->establishmentRepository->findById($id);
        return Inertia::render('Admin/Establishment/Edit', compact('establishment'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEstablishmentRequest $request, Establishment $establishment)
    {
        $data = $request->validated();

        $establishment = $this->establishmentRepository->update($data, $establishment);

        return Redirect::route('establishments.show', $establishment->id)->with('message', 'Estabelecimento atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Establishment $establishment)
    {
        $this->establishmentRepository->destroy($establishment);

        return Redirect::route('establishments.index')->with('message', 'Estabelecimento desativado com sucesso.');
    }

    public function restore(Establishment $establishment)
    {
        $this->establishmentRepository->restore($establishment);
        return Redirect::route('establishments.index')->with('message', 'Estabelecimento reativado com sucesso.');
    }

    public function forceDelete(Establishment $establishment)
    {
        $this->establishmentRepository->forceDelete($establishment);
        return Redirect::route('establishments.index')->with('message', 'Estabelecimento excluído permanentemente.');
    }
}
