<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ComentarioRequest extends FormRequest
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
            'id_usuario' => 'required|integer|exists:user,id',
            'id_producto' => 'required|integer|exists:productos,id',
            'comentario' => 'required|string|max:255',
            'calificacion' => 'required|integer|min:1|max:10',
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
            'comentario.required' => 'El comentario es obligatorio.',
            'comentario.string' => 'El comentario debe ser una cadena de texto.',
            'comentario.max' => 'El comentario no puede superar los 255 caracteres.',
            'calificacion.required' => 'La calificación es obligatoria.',
            'calificacion.integer' => 'La calificación debe ser un número entero.',
            'calificacion.min' => 'La calificación debe ser al menos 1.',
            'calificacion.max' => 'La calificación no puede ser mayor a 5.',
        ];
    }
}
