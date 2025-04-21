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

}
