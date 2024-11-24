<?php

namespace App\Repositories;

use App\Models\Establishment;
use Illuminate\Database\Eloquent\Model;

class EstablishmentRepository extends BaseRepository
{
    protected Model $model;

    public function __construct(Establishment $estabelishment) {
        $this->model = $estabelishment;
    }

    public function getAll($request = null)
    {
        return $this->model
            ->withTrashed()
            ->filter($request)
            ->orderBy('id')
            ->paginate(10)
            ->through(function ($establishment) {
                return [
                    'id' => $establishment->id,
                    'name' => $establishment->name,
                    'address' => $establishment->address,
                    'phone' => $establishment->phone,
                    'email' => $establishment->email,
                    'created_at' => $establishment->created_at ? $establishment->created_at->format('d-m-Y') : null,
                    'deleted_at' => $establishment->deleted_at,
                ];
            });
    }
    

    public function findById($id)
    {
        return $this->model->withTrashed()->findOrFail($id);
    }

}
