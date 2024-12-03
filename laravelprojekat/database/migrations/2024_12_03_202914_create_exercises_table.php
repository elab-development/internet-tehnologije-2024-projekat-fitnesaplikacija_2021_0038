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
        Schema::create('exercises', function (Blueprint $table) {
            $table->id(); // Primarni ključ
            $table->unsignedBigInteger('training_id'); // Strani ključ ka treningu
            $table->string('name'); // Naziv vežbe
            $table->integer('repetitions')->nullable(); // Broj ponavljanja
            $table->integer('sets')->nullable(); // Broj serija
            $table->integer('duration')->nullable(); // Trajanje vežbe u minutima
            $table->string('equipment_needed')->nullable(); // Potrebna oprema za vežbu
            $table->string('muscle_group')->nullable(); // Ciljana mišićna grupa
            $table->timestamps(); // created_at i updated_at

            // Definicija stranog ključa
            $table->foreign('training_id')->references('id')->on('trainings')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exercises');
    }
};
