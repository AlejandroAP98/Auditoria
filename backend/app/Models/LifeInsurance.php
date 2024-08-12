<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use App\Notifications\LifeInsuranceUpdated;

class LifeInsurance extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'user_id',
        'start_date',
        'date_expire',
        'amount',
        'description',
    ];

    protected static function boot()
    {
        parent::boot();

        static::updated(function ($lifeInsurance) {
            self::changeLifeInsurance($lifeInsurance);
        });

        static::created(function ($lifeInsurance) {
            self::changeLifeInsurance($lifeInsurance);
        });


    }

    // Relación con el usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    protected static function changeLifeInsurance($lifeInsurance){
        $admins = User::where('id_role', Role::where('name', 'Admin')->first()->id)->get();
        foreach ($admins as $admin) {
            $admin->notify(new \App\Notifications\LifeInsuranceUpdatedAdmin($lifeInsurance));
        }
        if($lifeInsurance->user){
            $lifeInsurance->user->notify(new \App\Notifications\LifeInsuranceUpdated($lifeInsurance));
        }
    }
}
