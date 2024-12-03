<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trainings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Referenca na korisnika
            $table->string('title'); // Naziv treninga
            $table->date('date'); // Datum treninga
            $table->integer('duration')->nullable(); // Trajanje u minutima
            $table->integer('calories_burned')->nullable(); // Potrošene kalorije
            $table->string('difficulty')->nullable(); // Težina treninga (easy, medium, hard)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trainings');
    }
};
