<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'title', 'message', 'read_at','type','action_url'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function isRead()
    {
        return !is_null($this->read_at);
    }
}
