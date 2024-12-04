<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class NotificationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Notification::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 5), // Nasumičan broj između 1 i 5
            'title' => $this->faker->sentence(6, true), // Nasumičan naslov (6 reči)
            'message' => $this->faker->paragraph(3, true), // Nasumična poruka (3 rečenice)
            'read_at' => $this->faker->optional(0.5)->dateTime(), // 50% šanse da je pročitano
            'type' => $this->faker->randomElement(['info', 'warning', 'success', 'error']), // Smislen tip obaveštenja
            'action_url' => $this->faker->optional()->url(), // Nasumičan URL sa mogućnošću da bude null
        ];
    }
}
