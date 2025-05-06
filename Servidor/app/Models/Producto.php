<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'categoria_id',
        'marca',
        'modelo',
        'descuento',
        'fps',
        'calibre', // Calibre del producto (ejemplo “6 mm”).
        'capacidad_cargador',
        'peso',
        'imagenes', // también JSON si quieres múltiples imágenes
        'video_demo', // URL del video de demostración
        'tiempo_envio',
        'estado_activo',
    ];

    protected $casts = [
        'precio' => 'decimal:2',
        'descuento' => 'decimal:2',
        'peso' => 'float',
        'imagenes' => 'array',
        'estado_activo' => 'boolean',
    ];

    // Relación con la categoría
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    // Relación con opiniones
    public function opiniones()
    {
        return $this->hasMany(Review::class);
    }

    // Precio final calculado
    public function getPrecioFinalAttribute()
    {
        return $this->precio - $this->descuento;
    }

    public function scopeFilter($query, $filters) {

        if ($filters['search'] ?? false) {
            $query->where('nombre', 'like', '%' . request('search') . '%')
                ->orWhere('descripcion', 'like', '%' . request('search') . '%');
        }

        if ($filters['categoria_id'] ?? false) {
            $query->where('categoria_id', request('categoria_id'));
        }

        if ($filters['marca'] ?? false) {
            $query->where('marca', request('marca'));
        }

        if ($filters['modelo'] ?? false) {
            $query->where('modelo', request('modelo'));
        }

        if ($filters['fps'] ?? false) {
            $query->where('fps', request('fps'));
        }

        if ($filters['calibre'] ?? false) {
            $query->where('calibre', request('calibre'));
        }

        if ($filters['capacidad_cargador'] ?? false) {
            $query->where('capacidad_cargador', request('capacidad_cargador'));
        }

        if ($filters['peso'] ?? false) {
            $query->where('peso', request('peso'));
        }

        if ($filters['estado_activo'] ?? false) {
            $query->where('estado_activo', request('estado_activo'));
        }

        if ($filters['descuento'] ?? false) {
            $query->where('descuento', request('descuento'));
        }

        if ($filters['precio_min'] ?? false) {
            $query->where('precio', '>=', request('precio_min'));
        }

        if ($filters['precio_max'] ?? false) {
            $query->where('precio', '<=', request('precio_max'));
        }

        if ($filters['stock'] ?? false) {
            $query->where('stock', request('stock'));
        }

    }

}
