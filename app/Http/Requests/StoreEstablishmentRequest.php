<?php

namespace App\Http\Requests;

use App\Models\Establishment;
use Illuminate\Foundation\Http\FormRequest;
use Silber\Bouncer\BouncerFacade as Bouncer;

class StoreEstablishmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Bouncer::can('create-establishment');
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
            'email' => 'required|string|email|max:255',
            'logo_path' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
