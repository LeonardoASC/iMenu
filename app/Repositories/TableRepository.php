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
            ->paginate(10)
            ->through(function ($table) {
                return [
                    'id' => $table->id,
                    'number' => $table->number,
                    'establishment' => [
                        'id' => $table->establishment->id,
                        'name' => $table->establishment->name,
                    ],
                    'type' => $table->type,
                    'status' => $table->status,
                    'qrcode' => $table->qrcode,
                    'created_at' => $table->created_at ? $table->created_at->format('d-m-Y') : null,
                    'deleted_at' => $table->deleted_at,
                ];
            });
    }

    public function findById($id)
    {
        return $this->model->withTrashed()->with(['establishment'])->findOrFail($id);
    }

}
