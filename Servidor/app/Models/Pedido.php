<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'producto_id',
        'cantidad',
        'direccion_envio',
        'estado',
    ];

    /**
     * Relación: Un pedido pertenece a un usuario
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación: Un pedido pertenece a un producto
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

    public function scopeFilter($query, $filters) {

        if ($filters['search'] ?? false) {
            $query->where('direccion_envio', 'like', '%' . request('search') . '%');
        }

        if ($filters['estado'] ?? false) {
            $query->where('estado', request('estado'));
        }

        if ($filters['user_id'] ?? false) {
            $query->where('user_id', request('user_id'));
        }

    }

}
