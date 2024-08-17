<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LifeInsurance;
use Faker\Factory as Faker;

class LifeInsurancesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Crear 10 registros de seguros de vida falsos
        for ($i = 0; $i < 100; $i++) {
            LifeInsurance::create([
                'user_id' => $faker->numberBetween(1, 100), // Asegúrate de tener usuarios con estos IDs
                'start_date' => $faker->date(), // Fecha de inicio
                'date_expire' => $faker->dateTimeBetween('now', '+10 years')->format('Y-m-d'), // Fecha de expiración en el futuro
                'amount' => $faker->randomFloat(2, 100000, 500000), // Monto entre 1000 y 50000
                'description' => $faker->sentence(), // Descripción
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
