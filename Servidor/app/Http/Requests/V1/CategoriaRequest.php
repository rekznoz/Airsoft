<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class CategoriaRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'nombre' => 'required|max:255',
            'descripcion' => 'required|max:255',
            'slug' => 'required|max:255|unique:categorias,slug,' . $this->route('categoria'),
        ];
    }

    public function messages()
    {
        return [
            'nombre.required' => 'El nombre es obligatorio.',
            'nombre.max' => 'El nombre no puede tener más de 255 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'descripcion.max' => 'La descripción no puede tener más de 255 caracteres.',
            'slug.required' => 'El slug es obligatorio.',
            'slug.max' => 'El slug no puede tener más de 255 caracteres.',
            'slug.unique' => 'El slug ya existe.',
        ];
    }

}
