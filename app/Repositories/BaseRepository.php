<?php

namespace App\Repositories;

use App\Interfaces\IBaseRepository;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements IBaseRepository
{
    protected Model $model;

    public function all()
    {
        return $this->model->all();
    }

    public function getAll($request = null)
    {
        return $this->model
            ->withTrashed()
            ->filter($request)
            ->orderBy('id')
            ->paginate(10);
    }

    public function findById($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create($data)
    {
        return $this->model->create($data);
    }

    public function update($data, $model)
    {

        $model->update($data);

        return $model;
    }

    public function destroy($model)
    {
        return $model->delete();
    }

    public function restore($model)
    {
        return $model->restore();
    }

    public function forceDelete($model)
    {
        return $model->forceDelete();
    }

}
