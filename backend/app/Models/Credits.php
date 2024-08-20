<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;

class Credits extends Model implements AuditableContract
{
    use Auditable; // Implementa el trait para habilitar la auditoría

    // Define los atributos que pueden ser asignados masivamente
    protected $fillable = [
        'user_id',
        'interest_rate',
        'amount',
        'start_date',
        'end_date',
        'status'
    ];

    // Opcional: Puedes especificar los eventos que deseas auditar
    protected static $auditEvents = ['created', 'updated', 'deleted'];

    // Define las relaciones si es necesario
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    protected static function boot()
    {
        parent::boot();


            static::created(function ($credit) {
                self::checkCreditLimitAndNotify($credit);
            });


            static::updated(function ($credit) {
                self::checkCreditLimitAndNotify($credit);
                if ($credit -> user) {
                    $credit->user->notify(new \App\Notifications\CreditLimitChanged($credit));
                    $admins = User::where('id_role', Role::where('name', 'Admin')->first()->id)->get();
                    foreach ($admins as $admin) {
                        $admin->notify(new \App\Notifications\CreditLimitChangedAdmin($credit));
                    }
                }
            });

    }
    protected static function checkCreditLimitAndNotify($credit)
        {
            if ($credit->user && $credit->user->exceedsCreditLimit()) {
                $admins = User::where('id_role', Role::where('name', 'Admin')->first()->id)->get();
                foreach ($admins as $admin) {
                    $admin->notify(new \App\Notifications\CreditLimitExceeded($credit));
                }
            }

        }

}
