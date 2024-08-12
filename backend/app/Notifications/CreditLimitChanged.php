<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CreditLimitChanged extends Notification
{
    protected $credit;

    public function __construct($credit)
    {
        $this->credit = $credit;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Cambio Valor Préstamo')
            ->line('El valor de tú préstamo ha cambiado.')
            ->line('Nuevo valor: ' . $this->credit->amount)
            ->action('Ver detalle', url('/api/credits/' . $this->credit->id))
            ->line('Gracias por confiar en nosotros!');
    }
    public function toArray($notifiable)
    {
        return [
            'credit_id' => $this->credit->id,
            'amount' => $this->credit->amount,
            'status' => $this->credit->status,
        ];
    }
}
