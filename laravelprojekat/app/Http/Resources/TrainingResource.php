<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => User::find($this->user_id),
            'title' => $this->title,
            'date' => $this->date,
            'duration' => $this->duration,
            'calories_burned' => $this->calories_burned,
            'difficulty' => $this->difficulty,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
