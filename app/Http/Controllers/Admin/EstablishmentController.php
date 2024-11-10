<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Establishment;
use App\Http\Requests\StoreEstablishmentRequest;
use App\Http\Requests\UpdateEstablishmentRequest;
use App\Repositories\EstablishmentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EstablishmentController extends Controller
{
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

        return Inertia::render('Admin/Establishments/Index', compact('establishments'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Establishments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEstablishmentRequest $request)
    {
        $data = $request->validated();

        $establishment = $this->establishmentRepository->create($data);

        return Redirect::route('establishments.show', $establishment->id)->with('message', 'Estabelecimento cadastrado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Establishment $establishment)
    {
        return Inertia::render('Admin/Establishments/Show', compact('establishment'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Establishment $establishment)
    {
        return Inertia::render('Admin/Establishments/Edit', compact('establishment'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEstablishmentRequest $request, Establishment $establishment)
    {
        $data = $request->validated();

        $catregory = $this->establishmentRepository->update($data, $establishment);

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
