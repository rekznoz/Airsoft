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
            'user_id' => 'required|integer|exists:users,id',
            'producto_id' => 'required|integer|exists:productos,id',
            'comentario' => 'required|string|max:255',
            'calificacion' => 'required|integer|min:1|max:10',
            'verificado' => 'boolean',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'El user_id es obligatorio.',
            'user_id.integer' => 'El user_id debe ser un número entero.',
            'user_id.exists' => 'El user_id no existe en la base de datos.',
            'producto_id.required' => 'El producto_id es obligatorio.',
            'producto_id.integer' => 'El producto_id debe ser un número entero.',
            'producto_id.exists' => 'El producto_id no existe en la base de datos.',
            'comentario.required' => 'El comentario es obligatorio.',
            'comentario.string' => 'El comentario debe ser una cadena de texto.',
            'comentario.max' => 'El comentario no puede superar los 255 caracteres.',
            'calificacion.required' => 'La calificación es obligatoria.',
            'calificacion.integer' => 'La calificación debe ser un número entero.',
            'calificacion.min' => 'La calificación debe ser al menos 1.',
            'calificacion.max' => 'La calificación no puede ser mayor a 5.',
            'verificado.boolean' => 'El campo verificado debe ser verdadero o falso.',
        ];
    }
}
