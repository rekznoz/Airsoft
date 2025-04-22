<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_usuario',
        'id_producto',
        'cantidad',
        'direccion_envio',
        'estado',
    ];

    /**
     * Relación: Un pedido pertenece a un usuario
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    /**
     * Relación: Un pedido pertenece a un producto
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_producto');
    }

}
