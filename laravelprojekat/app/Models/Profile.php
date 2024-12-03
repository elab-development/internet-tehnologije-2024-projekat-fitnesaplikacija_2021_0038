<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'age', 'weight', 'height', 'goal', 'calories_per_day'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bmi()
    {
        if ($this->height > 0) {
            return $this->weight / (($this->height / 100) ** 2);
        }

        return null;
    }
}
