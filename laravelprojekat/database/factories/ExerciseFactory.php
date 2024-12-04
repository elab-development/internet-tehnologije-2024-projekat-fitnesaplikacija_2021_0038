<?php

namespace Database\Factories;

use App\Models\Exercise;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExerciseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Exercise::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'training_id' => $this->faker->numberBetween(1, 10), // Nasumičan ID treninga između 1 i 10
            'name' => $this->faker->word(), // Naziv vežbe
            'repetitions' => $this->faker->numberBetween(8, 15), // Broj ponavljanja
            'sets' => $this->faker->numberBetween(3, 5), // Broj serija
            'duration' => $this->faker->numberBetween(30, 120), // Trajanje vežbe u sekundama
            'equipment_needed' => $this->faker->randomElement(['none', 'dumbbells', 'barbell', 'machine']), // Potrebna oprema
            'muscle_group' => $this->faker->randomElement(['chest', 'back', 'legs', 'shoulders', 'arms', 'core']), // Mišićna grupa
        ];
    }
}
