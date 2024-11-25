<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Establishment;
use Silber\Bouncer\BouncerFacade as Bouncer;

class UpdateEstablishmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Bouncer::can('update-establishment');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|min:3|unique:establishments,name,' . $this->route('establishment')->id,
            'address' => 'nullable|string|max:255|min:3',
            'phone' => 'nullable|string|max:11|min:10',
            'email' => 'nullable|string|email|max:255',
            'logo_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

}
