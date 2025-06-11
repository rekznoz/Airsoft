<?php

namespace App\Http\Requests;

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
            'descripcion' => 'required',
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
            'imagenes.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'video_demo' => 'nullable|url',
            'tiempo_envio' => 'nullable|string|max:255',
            'estado_activo' => 'boolean',
        ];
    }

    public function messages()
    {
        return [
            'nombre.required' => 'El nombre del producto es obligatorio.',
            'descripcion.required' => 'La descripción del producto es obligatoria.',
            'precio.required' => 'El precio del producto es obligatorio.',
            'precio.numeric' => 'El precio debe ser un número válido.',
            'stock.required' => 'El stock del producto es obligatorio.',
            'stock.integer' => 'El stock debe ser un número entero.',
            'categoria_id.required' => 'La categoría del producto es obligatoria.',
            'categoria_id.exists' => 'La categoría seleccionada no existe.',
            'marca.required' => 'La marca del producto es obligatoria.',
            'modelo.required' => 'El modelo del producto es obligatorio.',
            'descuento.numeric' => 'El descuento debe ser un número válido.',
            'descuento.min' => 'El descuento no puede ser negativo.',
            'imagenes.*.image' => 'Cada imagen debe ser una imagen válida.',
            'imagenes.*.mimes' => 'Las imágenes deben ser de tipo jpeg, png, jpg o webp.',
            'imagenes.*.max' => 'Cada imagen no puede exceder los 2 MB.',
            'video_demo.url' => 'El video de demostración debe ser una URL válida.',
            'tiempo_envio.string' => 'El tiempo de envío debe ser un texto.',
            'tiempo_envio.max' => 'El tiempo de envío no puede exceder los 255 caracteres.',
            'estado_activo.boolean' => 'El estado activo debe ser verdadero o falso.',
        ];
    }
}
