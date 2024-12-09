<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExerciseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'training_id' => $this->training_id,
            'name' => $this->name,
            'repetitions' => $this->repetitions,
            'sets' => $this->sets,
            'duration' => $this->duration,
            'equipment_needed' => $this->equipment_needed,
            'muscle_group' => $this->muscle_group,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
