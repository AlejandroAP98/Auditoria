<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        $roles = Role::pluck('id')->toArray();

        // Crear 10 usuarios
        foreach (range(1, 10) as $index) {
            User::create([
                'id_role' => $faker->numberBetween(1, 2),
                'name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'document_type' => $faker->numberBetween(1, 3),
                'document_number' => $faker->unique()->numerify('##########'),
                'address' => $faker->address,
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'creditLimit' => $faker->randomFloat(2, 10000, 100000),
                'remember_token' => $faker->sha256,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
