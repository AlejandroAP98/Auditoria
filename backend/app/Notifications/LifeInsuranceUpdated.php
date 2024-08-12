<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\LifeInsurance;

class LifeInsuranceUpdated extends Notification
{
    use Queueable;

    protected $lifeInsurance;

    public function __construct(LifeInsurance $lifeInsurance)
    {
        $this->lifeInsurance = $lifeInsurance;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Actualización en Seguro de Vida')
            ->line('Se ha actualizado la información del seguro de vida.')
            ->line('Usuario: ' . $this->lifeInsurance->user->name ." ". $this->lifeInsurance->user->last_name)
            ->line('Monto: ' . $this->lifeInsurance->amount)
            ->line('Fecha de Expiración: ' . $this->lifeInsurance->date_expire)
            ->line('Descripción: ' . $this->lifeInsurance->description)
            ->action('Ver Detalles', url('/api/life-insurance/' . $this->lifeInsurance->id))
            ->line('Gracias por utilizar nuestra aplicación!');
    }
}
