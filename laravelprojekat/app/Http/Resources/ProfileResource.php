<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
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
            'user_id' => $this->user_id,
            'age' => $this->age,
            'weight' => $this->weight,
            'height' => $this->height,
            'goal' => $this->goal,
            'calories_per_day' => $this->calories_per_day,
            'profile_picture' => $this->profile_picture,
        ];
    }
}
