<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\DiaryEntry;
use App\Models\Exercise;
use App\Models\Notification;
use App\Models\Profile;
use App\Models\Training;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Kreiraj 10 korisnika sa profilima
        User::factory(10)->create()->each(function ($user) {
            // Svakom korisniku kreiraj profil
            $user->profile()->create(Profile::factory()->make()->toArray());

            // Svakom korisniku dodaj 3 treninga
            Training::factory(3)->create(['user_id' => $user->id])->each(function ($training) {
                // Svakom treningu dodaj 5 vežbi
                Exercise::factory(5)->create(['training_id' => $training->id]);
            });

            // Svakom korisniku dodaj 5 dnevničkih unosa
            DiaryEntry::factory(5)->create(['user_id' => $user->id]);

            // Svakom korisniku dodaj 3 obaveštenja
            Notification::factory(3)->create(['user_id' => $user->id]);
        });
    }
}
