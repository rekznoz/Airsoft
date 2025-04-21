<?php

namespace App\Http\Requests\V1;

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
            'comentario' => 'required|string',
            'tarea_id' => 'required|exists:tareas,id',
            'user_id' => 'required|exists:users,id',
        ];
    }

    public function messages()
    {
        return [
            'comentario.required' => 'El comentario es requerido',
            'comentario.string' => 'El comentario debe ser un texto',
            'tarea_id.required' => 'La tarea es requerida',
            'tarea_id.exists' => 'La tarea no existe',
            'user_id.required' => 'El usuario es requerido',
            'user_id.exists' => 'El usuario no existe',
        ];
    }
}
