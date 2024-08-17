<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{
    // Especifica la tabla si no sigue la convención de nombres de Laravel
    protected $table = 'audits';

    // Define los atributos que son accesibles
    protected $fillable = [
        'user_id',
        'event',
        'auditable_type',
        'auditable_id',
        'old_values',
        'new_values',
        'url',
        'ip_address',
        'user_agent',
        'created_at',
        'updated_at',
    ];

    // Define los atributos que deberían ser cast a otro tipo de dato
    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
    ];
}
