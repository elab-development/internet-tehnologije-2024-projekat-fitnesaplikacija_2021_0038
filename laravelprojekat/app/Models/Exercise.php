<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = ['training_id', 'name', 'repetitions', 'sets', 'duration', 'equipment_needed', 'muscle_group'];

    public function training()
    {
        return $this->belongsTo(Training::class);
    }
}
