<?php

namespace App\Repositories;

use Silber\Bouncer\BouncerFacade as Bouncer;

class RoleAndAbilityRepository
{
    public function __construct() {}

    public function getAllRoles()
    {
        return Bouncer::role()->all();
    }

    public function getAllAbilities()
    {
        $abilities = Bouncer::ability()->all();
        return $abilities;
    }

    public function getRoleByName($name)
    {
        $role = Bouncer::role()->where('name', $name)->first();
        $abilities = $role->abilities()->get()->toArray();
        $role['abilities'] = $abilities;
        return $role;
    }

    public function getRoleById($id)
    {
        $role = Bouncer::role()->where('id', $id)->first();
        $abilities = $role->abilities()->get()->toArray();
        $role['abilities'] = $abilities;
        return $role;
    }

    public function getAbilityByName($roleName)
    {
        return Bouncer::ability()->where('name', $roleName)->first();
    }

    public function createRole($data)
    {
        $role = Bouncer::role()->create($data);

        return $role;
    }

    public function updateRole($id, $data)
    {
        $role = Bouncer::role()->where('id', $id)->first();

        if (!$role) {
            throw new \Exception('Cargo não existe', 404);
        }

        return $role->update($data);
    }

    // public function createAbility($data)
    // {
    //     $ability = Bouncer::ability()->create($data);

    //     $ability->entity()->attach($data['entity_id']);
    //     return $ability;
    // }

    public function assignAbilitiesToRole($id, $abilities)
    {
        $role = Bouncer::role()->where('id', $id)->first();

        if (!$role) {
            throw new \Exception('Cargo não existe', 404);
        }

        $role->abilities()->sync($abilities);

        $roleAndAbilities = $this->getRoleById($id);

        return $roleAndAbilities;
    }

    public function deleteRole($id)
    {
        $role = Bouncer::role()->where('id', $id)->first();
        if (!$role) {
            throw new \Exception('Cargo não existe', 404);
        }
        $role->delete();
        return true;
    }
}
