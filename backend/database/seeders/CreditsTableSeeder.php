<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Credits; // Asegúrate de importar el modelo
use Faker\Factory as Faker;

class CreditsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Crear 10 registros de créditos falsos
        for ($i = 0; $i < 100; $i++) {
            Credits::create([
                'user_id' => $faker->numberBetween(1, 100),
                'interest_rate' => $faker->randomFloat(2, 1, 10), 
                'amount' => $faker->randomFloat(2, 10000, 500000),
                'start_date' => $faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
                'end_date' => $faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
                'status' => $faker->randomElement(['active', 'inactive', 'closed']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
