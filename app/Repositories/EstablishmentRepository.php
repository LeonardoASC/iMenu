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
            ->with(['users'])
            ->orderBy('id')
            ->paginate(15);
    }

    public function findById($id)
    {
        return $this->model->withTrashed()->with(['users'])->findOrFail($id);
    }

}
