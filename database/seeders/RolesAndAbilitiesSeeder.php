<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Silber\Bouncer\BouncerFacade as Bouncer;

class RolesAndAbilitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Roles
        Bouncer::role()->firstOrCreate([
            'name' => 'admin',
            'title' => 'Administrador',
        ]);
        Bouncer::role()->firstOrCreate([
            'name' => 'manager',
            'title' => 'Gerente',
        ]);

        Bouncer::role()->firstOrCreate([
            'name' => 'waiter',
            'title' => 'Garçom',
        ]);

        $everything = Bouncer::ability()->firstOrCreate([
            'name' => '*',
            'title' => 'Todas as permissões',
            'entity_type' => '*',
        ]);

        Bouncer::allow('admin')->to($everything);

        // category abilities
        $createCategory = Bouncer::ability()->firstOrCreate([
            'name' => 'create-category',
            'title' => 'Criar Categoria',
        ]);
        $updateCategory = Bouncer::ability()->firstOrCreate([
            'name' => 'update-category',
            'title' => 'Atualizar Categoria',
        ]);
        $deleteCategory = Bouncer::ability()->firstOrCreate([
            'name' => 'delete-category',
            'title' => 'Excluir Categoria',
        ]);
        $viewCategory = Bouncer::ability()->firstOrCreate([
            'name' => 'view-category',
            'title' => 'Visualizar Categoria',
        ]);

        // establishments abilities
        $createEstablishment = Bouncer::ability()->firstOrCreate([
            'name' => 'create-establishment',
            'title' => 'Criar Estabelecimento',
        ]);
        $updateEstablishment = Bouncer::ability()->firstOrCreate([
            'name' => 'update-establishment',
            'title' => 'Atualizar Estabelecimento',
        ]);
        $deleteEstablishment = Bouncer::ability()->firstOrCreate([
            'name' => 'delete-establishment',
            'title' => 'Excluir Estabelecimento',
        ]);
        $viewEstablishment = Bouncer::ability()->firstOrCreate([
            'name' => 'view-establishment',
            'title' => 'Visualizar Estabelecimento',
        ]);

        // orders abilities
        $createOrder = Bouncer::ability()->firstOrCreate([
            'name' => 'create-order',
            'title' => 'Criar Pedido',
        ]);
        $updateOrder = Bouncer::ability()->firstOrCreate([
            'name' => 'update-order',
            'title' => 'Atualizar Pedido',
        ]);
        $deleteOrder = Bouncer::ability()->firstOrCreate([
            'name' => 'delete-order',
            'title' => 'Excluir Pedido',
        ]);
        $viewOrder = Bouncer::ability()->firstOrCreate([
            'name' => 'view-order',
            'title' => 'Visualizar Pedido',
        ]);

        // products abilities
        $createProduct = Bouncer::ability()->firstOrCreate([
            'name' => 'create-product',
            'title' => 'Criar Produto',
        ]);
        $updateProduct = Bouncer::ability()->firstOrCreate([
            'name' => 'update-product',
            'title' => 'Atualizar Produto',
        ]);
        $deleteProduct = Bouncer::ability()->firstOrCreate([
            'name' => 'delete-product',
            'title' => 'Excluir Produto',
        ]);
        $viewProduct = Bouncer::ability()->firstOrCreate([
            'name' => 'view-product',
            'title' => 'Visualizar Produto',
        ]);

        // roles abilities
        $createRole = Bouncer::ability()->firstOrCreate([
            'name' => 'create-role',
            'title' => 'Criar Cargo',
        ]);
        $updateRole = Bouncer::ability()->firstOrCreate([
            'name' => 'update-role',
            'title' => 'Atualizar Cargo',
        ]);
        $deleteRole = Bouncer::ability()->firstOrCreate([
            'name' => 'delete-role',
            'title' => 'Excluir Cargo',
        ]);
        $viewRole = Bouncer::ability()->firstOrCreate([
            'name' => 'view-role',
            'title' => 'Visualizar Cargo',
        ]);

        // tables abilities
        $createTable = Bouncer::ability()->firstOrCreate([
            'name' => 'create-table',
            'title' => 'Criar Mesa',
        ]);
        $updateTable = Bouncer::ability()->firstOrCreate([
            'name' => 'update-table',
            'title' => 'Atualizar Mesa',
        ]);
        $deleteTable = Bouncer::ability()->firstOrCreate([
            'name' => 'delete-table',
            'title' => 'Excluir Mesa',
        ]);
        $viewTable = Bouncer::ability()->firstOrCreate([
            'name' => 'view-table',
            'title' => 'Visualizar Mesa',
        ]);

        // users abilities
        $createUsers = Bouncer::ability()->firstOrCreate([
            'name' => 'create-user',
            'title' => 'Criar Usuário',
        ]);
        $updateUsers = Bouncer::ability()->firstOrCreate([
            'name' => 'update-user',
            'title' => 'Atualizar Usuário',
        ]);
        $deleteUsers = Bouncer::ability()->firstOrCreate([
            'name' => 'delete-users',
            'title' => 'Excluir Usuário',
        ]);
        $viewUsers = Bouncer::ability()->firstOrCreate([
            'name' => 'view-users',
            'title' => 'Visualizar Usuário',
        ]);

        $updateAbilities = Bouncer::ability()->firstOrCreate([
            'name' => 'update-ability',
            'title' => 'Atualizar Permissão',
        ]);
    }
}
