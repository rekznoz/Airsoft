<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PedidoRequest extends FormRequest
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
            'producto_id' => 'required|integer|exists:producto,id',
            'cantidad' => 'required|integer|min:1',
            'estado' => 'required|string|max:255',
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
            'cantidad.required' => 'La cantidad es obligatoria.',
            'cantidad.integer' => 'La cantidad debe ser un número entero.',
            'cantidad.min' => 'La cantidad debe ser al menos 1.',
            'estado.required' => 'El estado es obligatorio.',
            'estado.string' => 'El estado debe ser una cadena de texto.',
            'estado.max' => 'El estado no puede superar los 255 caracteres.',
        ];
    }
}
