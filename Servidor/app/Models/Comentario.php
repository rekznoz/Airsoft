<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'producto_id',
        'comentario',
        'calificacion',
    ];

    /**
     * Relación: Un comentario pertenece a un usuario
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación: Un comentario pertenece a un producto
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

}
