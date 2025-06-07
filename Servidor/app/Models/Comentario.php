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
        'verificado',
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

    public function scopeFilter($query, $filters)
    {

        if ($filters['search'] ?? false) {
            $query->where('comentario', 'like', '%' . request('search') . '%');
        }

        if ($filters['calificacion'] ?? false) {
            $query->where('calificacion', request('calificacion'));
        }

        if ($filters['user_id'] ?? false) {
            $query->where('user_id', request('user_id'));
        }

    }


}
