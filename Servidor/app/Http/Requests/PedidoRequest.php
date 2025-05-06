<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PedidoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    /*
     * [
        'id_usuario',
        'id_producto',
        'cantidad',
        'estado',
    ];
     */
    public function rules(): array
    {
        return [
            'id_usuario' => 'required|integer|exists:users,id',
            'id_producto' => 'required|integer|exists:productos,id',
            'cantidad' => 'required|integer|min:1',
            'estado' => 'required|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'id_usuario.required' => 'El id_usuario es obligatorio.',
            'id_usuario.integer' => 'El id_usuario debe ser un número entero.',
            'id_usuario.exists' => 'El id_usuario no existe en la base de datos.',
            'id_producto.required' => 'El id_producto es obligatorio.',
            'id_producto.integer' => 'El id_producto debe ser un número entero.',
            'id_producto.exists' => 'El id_producto no existe en la base de datos.',
            'cantidad.required' => 'La cantidad es obligatoria.',
            'cantidad.integer' => 'La cantidad debe ser un número entero.',
            'cantidad.min' => 'La cantidad debe ser al menos 1.',
            'estado.required' => 'El estado es obligatorio.',
            'estado.string' => 'El estado debe ser una cadena de texto.',
            'estado.max' => 'El estado no puede superar los 255 caracteres.',
        ];
    }
}
