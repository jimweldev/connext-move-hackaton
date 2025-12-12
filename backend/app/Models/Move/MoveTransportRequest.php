<?php

namespace App\Models\Move;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

class MoveTransportRequest extends Model {
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function move_driver() {
        return $this->belongsTo(User::class);
    }

    public function move_vehicle() {
        return $this->belongsTo(MoveVehicle::class);
    }
}
