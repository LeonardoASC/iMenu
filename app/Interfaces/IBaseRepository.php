<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

interface IBaseRepository
{
    public function all();

    public function getAll(?Request $request = null);

    public function findById($id);

    public function create(array $data);

    public function update(array $data, $model);

    public function destroy($model);

    public function restore($model);

    public function forceDelete($model);

}
