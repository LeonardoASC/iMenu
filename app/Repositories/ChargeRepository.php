<?php

namespace App\Repositories;

use App\Models\Charge;
use Illuminate\Database\Eloquent\Model;

class ChargeRepository extends BaseRepository
{
    protected Model $model;

    public function __construct(Charge $charge) {
        $this->model = $charge;
    }

    public function getAll($request = null)
    {
        return $this->model
            ->withTrashed()
            ->filter($request)
            ->orderBy('id')
            ->paginate(10)
            ->withQueryString()
            ->through(function ($charge) {
                return [
                    'id' => $charge->id,
                    'name' => $charge->name,
                    'value' => $charge->value,
                    'description' => $charge->description,
                    'type' => $charge->type,
                    'is_optional' => $charge->is_optional,
                    'status' => $charge->status,
                    'created_at' => $charge->created_at ? $charge->created_at->format('d-m-Y') : null,
                    'deleted_at' => $charge->deleted_at,
                ];
            });
    }


    public function findById($id)
    {
        return $this->model->withTrashed()->findOrFail($id);
    }

}
