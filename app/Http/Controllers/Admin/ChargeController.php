<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Charge;
use App\Http\Requests\StoreChargeRequest;
use App\Http\Requests\UpdateChargeRequest;
use App\Repositories\ChargeRepository;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ChargeController extends Controller
{
    private $chargeRepository;

    public function __construct(ChargeRepository $repository) {
        $this->chargeRepository = $repository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $charges = $this->chargeRepository->getAll();
        return Inertia::render('Admin/Charge/Index', compact('charges'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Charge/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChargeRequest $request)
    {
        $data = $request->validated();
        $charge = $this->chargeRepository->create($data);
        return Redirect::route('charges.index', $charge->id)->with('message', 'Charge cadastrada com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $charge = $this->chargeRepository->findById($id);
        return Inertia::render('Admin/Charge/Show', compact('charge'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $charge = $this->chargeRepository->findById($id);
        return Inertia::render('Admin/Charge/Edit', compact('charge'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChargeRequest $request, Charge $charge)
    {
        $data = $request->validated();

        $charge = $this->chargeRepository->update($data, $charge);

        return Redirect::route('charges.index', $charge->id)->with('message', 'Charge atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Charge $charge)
    {
        //
    }
}
