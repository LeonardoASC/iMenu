<?php

namespace App\Http\Requests;

use App\Models\Establishment;
use Illuminate\Foundation\Http\FormRequest;

class StoreEstablishmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|min:3|unique:'.Establishment::class.',name',
            'address' => 'nullable|string|max:255|min:3',
            'phone' => 'nullable|string|max:11|min:10',
            'email' => 'nullable|string|email|max:255',
            'logo_path' => 'nullable|string|max:255',
        ];
    }
}
