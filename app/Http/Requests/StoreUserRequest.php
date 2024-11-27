<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rules;
use Illuminate\Foundation\Http\FormRequest;
use Silber\Bouncer\BouncerFacade as Bouncer;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Bouncer::can('create-user');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'      => 'required|max:255|min:3',
            'last_name' => 'required|string|max:255',
            'email'     => 'required|string|email|max:255|unique:'.User::class,
            'phone'     => 'required|max:11|min:10',
            'password' => ['required', 'min:8', 'max:255',  'confirmed', Rules\Password::defaults()],
            'password_confirmation' => 'required|min:8|max:255',
            'role' => 'nullable|string|in:admin,client,operator,manager'
        ];
    }
}
