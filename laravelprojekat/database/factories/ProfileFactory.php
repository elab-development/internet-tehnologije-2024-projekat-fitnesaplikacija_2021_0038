<?php

namespace Database\Factories;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProfileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Profile::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(), // Generiše povezani korisnik
            'age' => $this->faker->numberBetween(18, 70), // Nasumične godine između 18 i 70
            'weight' => $this->faker->numberBetween(50, 150), // Težina u kg
            'height' => $this->faker->numberBetween(150, 200), // Visina u cm
            'goal' => $this->faker->randomElement(['lose weight', 'maintain weight', 'gain weight']), // Nasumičan cilj
            'calories_per_day' => $this->faker->numberBetween(1200, 3000), // Nasumičan broj kalorija dnevno
        ];
    }
}
