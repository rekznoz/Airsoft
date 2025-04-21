<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ProductoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => 'required|max:255',
            'descripcion' => 'required|max:255',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoria_id' => 'required|exists:categorias,id',
            'marca' => 'required|max:255',
            'modelo' => 'required|max:255',
            'descuento' => [
                'nullable',
                'numeric',
                'min:0',
                function ($attribute, $value, $fail) {
                    $precio = $this->input('precio');
                    if (is_numeric($precio) && $value > $precio) {
                        $fail('El descuento no puede ser mayor que el precio.');
                    }
                },
            ],
            'fps' => 'nullable|integer|min:0',
            'calibre' => 'nullable|max:50',
            'capacidad_cargador' => 'nullable|integer|min:0',
            'peso' => 'nullable|numeric|min:0',
            'imagenes' => 'nullable|array',
            'imagenes.*' => 'url',
            'video_demo' => 'nullable|url',
            'tiempo_envio' => 'nullable|string|max:255',
            'estado_activo' => 'boolean',
        ];
    }

    public function messages()
    {
        return [
            'nombre.required' => 'El nombre es obligatorio.',
            'nombre.max' => 'El nombre no puede superar los 255 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'descripcion.max' => 'La descripción no puede superar los 255 caracteres.',
            'precio.required' => 'El precio es obligatorio.',
            'precio.numeric' => 'El precio debe ser un número.',
            'precio.min' => 'El precio no puede ser menor que 0.',
            'stock.required' => 'El stock es obligatorio.',
            'stock.integer' => 'El stock debe ser un número entero.',
            'stock.min' => 'El stock no puede ser menor que 0.',
            'categoria_id.required' => 'La categoría es obligatoria.',
            'categoria_id.exists' => 'La categoría seleccionada no existe.',
            'marca.required' => 'La marca es obligatoria.',
            'marca.max' => 'La marca no puede superar los 255 caracteres.',
            'modelo.required' => 'El modelo es obligatorio.',
            'modelo.max' => 'El modelo no puede superar los 255 caracteres.',
            'sku.required' => 'El SKU es obligatorio.',
            'sku.max' => 'El SKU no puede superar los 255 caracteres.',
            // $this->route('producto') ? $this->route('producto')->id : null,
            //   $this->route('producto') ? $this->route('producto')->id : null,
        ];
    }
}
