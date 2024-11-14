<?php

namespace App\Repositories;

use App\Models\Table;
use Illuminate\Database\Eloquent\Model;

class TableRepository extends BaseRepository
{
    protected Model $model;

    public function __construct(Table $table) {
        $this->model = $table;
    }

    public function getAll($request = null)
    {
        return $this->model
            ->withTrashed()
            ->filter($request)
            ->with(['establishment'])
            ->orderBy('id')
            ->paginate(15);
    }

    public function findById($id)
    {
        return $this->model->withTrashed()->with(['establishment'])->findOrFail($id);
    }

}
