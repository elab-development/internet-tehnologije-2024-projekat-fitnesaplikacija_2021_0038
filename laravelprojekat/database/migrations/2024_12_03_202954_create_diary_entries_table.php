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
        Schema::create('diary_entries', function (Blueprint $table) {
            $table->id(); // Primarni ključ
            $table->unsignedBigInteger('user_id'); // Strani ključ ka korisniku
            $table->date('date'); // Datum unosa u dnevnik
            $table->text('content'); // Sadržaj unosa
            $table->timestamps(); // created_at i updated_at

            // Definicija stranog ključa
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('diary_entries');
    }
};
