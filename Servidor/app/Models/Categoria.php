<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'array_productos',
    ];

    /**
     * Relación: Una categoría tiene muchos productos
     */
    public function productos()
    {
        return $this->hasMany(Producto::class);
    }

    public function scopeFilter($query, $filters) {

        if ($filters['search'] ?? false) {
            $query->where('nombre', 'like', '%' . request('search') . '%');
        }

        if ($filters['descripcion'] ?? false) {
            $query->where('descripcion', request('descripcion'));
        }

    }

}
