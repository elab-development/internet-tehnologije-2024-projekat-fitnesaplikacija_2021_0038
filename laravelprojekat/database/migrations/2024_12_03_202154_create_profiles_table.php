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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->integer('age')->nullable(); // Starost korisnika
            $table->float('weight')->nullable(); // Težina u kilogramima
            $table->float('height')->nullable(); // Visina u centimetrima
            $table->string('goal')->nullable(); // Cilj (npr. "smršati", "dobiti mišićnu masu")
            $table->integer('calories_per_day')->nullable(); // Dnevni unos kalorija
            $table->timestamps();

            // Strani ključ za povezivanje sa users tabelom
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
        Schema::dropIfExists('profiles');
    }
};
