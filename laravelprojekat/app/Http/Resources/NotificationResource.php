<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
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
            'title' => $this->title,
            'message' => $this->message,
            'read_at' => $this->read_at,
            'type' => $this->type,
            'action_url' => $this->action_url,
            'is_read' => $this->isRead(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
