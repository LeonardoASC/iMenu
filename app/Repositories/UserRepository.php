<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Silber\Bouncer\BouncerFacade as Bouncer;

class UserRepository extends BaseRepository
{
    protected Model $model;

    public function __construct(User $user) {
        $this->model = $user;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function getAll($request = null)
    {
        return $this->model
            ->withTrashed()
            ->with(['roles',])
            ->filter($request ? $request->only(['search', 'role']) : null)
            ->orderBy('name')
            ->paginate(15);
    }

    public function findById($id)
    {
        return $this->model->withTrashed()->with(['roles.abilities',])->findOrFail($id);
    }

    public function create($data)
    {
        DB::beginTransaction(); // Init transaction

        if (data_get($data, 'password')) {
            $data['password'] = Hash::make($data['password']);
        };

        if (!data_get($data, 'role')) {
            $data['role'] = 'client';
        } else if($data['role'] === 'admin' && Bouncer::is(auth()->user())->notAn('admin')) {
            DB::rollBack();
            throw new \Exception("Apenas administradores podem criar administradores.");
        }

        $model = $this->model->create($data);
        $model->assign($data['role']);

        DB::commit();

        return $model;
    }

    public function update($data, $model)
    {
        DB::beginTransaction(); // Init transaction

        // handle password
        if (data_get($data, 'password')) {
            $data['password'] = Hash::make($data['password']);
        } else {
            $data['password'] = $model['password'];
        }

        // isDirtyEmail
        if ($data['email'] !== $model['email']) {
            $data['email_verified_at'] = null;
        }

        // isDirtyPhone
        if (data_get($data, 'phone') &&
            $data['phone'] !== $model['phone']) {
                $data['phone_verified_at'] = null;
        }

        if (data_get($data, 'role') && $data['role'] !== $model['role']) {
            foreach ($model->roles as $role) {
                $model->retract($role->name);
            }
            $model->assign($data['role']);
        }

        $model->update($data);

        DB::commit();

        return $model;
    }

    public function getRoles()
    {
        $roles = Bouncer::role()->all();

        return $roles;
    }

}
