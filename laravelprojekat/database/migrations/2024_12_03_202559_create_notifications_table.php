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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id(); // Primarni ključ
            $table->unsignedBigInteger('user_id'); // Strani ključ ka korisniku
            $table->string('title'); // Naslov notifikacije
            $table->text('message'); // Poruka notifikacije
            $table->timestamp('read_at')->nullable(); // Vreme kada je notifikacija pročitana
            $table->string('type')->nullable(); // Tip notifikacije (npr. success, warning)
            $table->string('action')->nullable(); // Link za akciju
            $table->string('icon')->nullable(); // Ikonica notifikacije
            $table->string('priority')->default('medium'); // Prioritet notifikacije
            
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
        Schema::dropIfExists('notifications');
    }
};
