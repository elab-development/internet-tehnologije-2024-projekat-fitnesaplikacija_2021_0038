<?php

namespace Database\Factories;

use App\Models\Training;
use Illuminate\Database\Eloquent\Factories\Factory;

class TrainingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Training::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 10), // Nasumičan ID korisnika između 1 i 10
            'title' => $this->faker->sentence(3, true), // Naslov treninga (3 reči)
            'date' => $this->faker->dateTimeBetween('-1 year', 'now'), // Datum u poslednjih godinu dana
            'duration' => $this->faker->numberBetween(30, 120), // Trajanje treninga u minutima
            'calories_burned' => $this->faker->numberBetween(100, 1000), // Sagorele kalorije
            'difficulty' => $this->faker->randomElement(['easy', 'medium', 'hard']), // Težina treninga
        ];
    }
}
