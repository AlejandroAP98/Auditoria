<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CreditLimitExceeded extends Notification
{
    use Queueable;

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
            ->subject('Credito Límite Excedido')
            ->line('Un usuario ha excedido su límite de crédito.')
            ->line('Nombre de usuario: ' . $this->credit->user->name ." ". $this->credit->user->last_name )
            ->line('Límite de crédito: ' . $this->credit->user->creditLimit)
            ->line('Estado: ' . $this->credit->status)
            ->line("Valor de crédito acumulado: " . $this->credit->user->totalCredits())
            ->action('Más información', url('/api/credits/' . $this->credit->id_user))
            ->line('Thank you for using our application!');
    }

    public function toArray($notifiable)
    {
        return [
            'credit_id' => $this->credit->id,
            'user_id' => $this->credit->user_id,
            'amount' => $this->credit->amount,
            'status' => $this->credit->status,
        ];
    }
}
