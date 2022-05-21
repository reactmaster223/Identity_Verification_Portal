<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Avatars extends Model
{
    protected $fillable = [
        'user_id', 'name', 'path'
    ];
}
