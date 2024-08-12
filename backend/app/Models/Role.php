<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = [
        'name',
        'label',
    ];

    // Si no deseas usar la marca de tiempo en la base de datos, puedes deshabilitarlo
    // public $timestamps = false;
}
