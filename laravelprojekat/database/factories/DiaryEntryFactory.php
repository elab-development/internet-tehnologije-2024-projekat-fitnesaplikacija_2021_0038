<?php

namespace Database\Factories;

use App\Models\DiaryEntry;
use Illuminate\Database\Eloquent\Factories\Factory;

class DiaryEntryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = DiaryEntry::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 10), // Nasumičan ID korisnika između 1 i 10
            'date' => $this->faker->dateTimeBetween('-1 year', 'now'), // Nasumičan datum u poslednjih godinu dana
            'content' => $this->faker->paragraph(5, true), // Nasumičan sadržaj sa 5 rečenica
        ];
    }
}
