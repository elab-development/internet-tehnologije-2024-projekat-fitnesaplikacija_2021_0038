<?php

namespace Database\Factories;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'), // Podrazumevana lozinka
            'avatar' => $this->faker->imageUrl(200, 200, 'people', true, 'Avatar'), // Slika za avatar
            'level' => $this->faker->numberBetween(1, 100), // Generiše nasumičan nivo
            'points' => $this->faker->numberBetween(0, 10000), // Generiše nasumičan broj poena
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Configure the factory to create a profile for each user.
     *
     * @return $this
     */
    public function configure()
    {
        /**
         * Metoda `configure` omogućava prilagođavanje ponašanja factory-ja
         * nakon kreiranja modela. Ovde koristimo `afterCreating` callback
         * kako bismo kreirali povezani profil za svakog korisnika.
         *
         * - `afterCreating`: Laravel metoda koja se pokreće nakon što je model uspešno kreiran.
         * - `$user`: Model `User` koji je upravo kreiran.
         * - `$user->profile()->create()`: Koristi relaciju `profile` iz `User` modela
         *   da kreira povezani zapis u tabeli `profiles`.
         * - `Profile::factory()->make()`: Kreira novu instancu profila (bez čuvanja u bazi).
         * - `toArray()`: Pretvara profil u niz koji se koristi za kreiranje zapisa u bazi.
         *
         * Za svakog korisnika automatski se generiše povezani profil, a konfiguracija
         * omogućava dodavanje ove logike unutar factory-ja na praktičan i čitljiv način.
         */
        return $this->afterCreating(function (User $user) {
            $user->profile()->create(Profile::factory()->make()->toArray());
        });
    }

    /**
     * Indicate that the user's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        /**
         * Ovo je dodatna state metoda koja omogućava prilagođavanje
         * stanja factory-ja. U ovom slučaju, podešavamo da `email_verified_at`
         * bude `null`, što označava da korisnik nije verifikovao email.
         */
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
