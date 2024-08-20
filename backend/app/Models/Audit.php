<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{

    protected $table = 'audits';


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


    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
    ];
}
