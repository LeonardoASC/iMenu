<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Silber\Bouncer\BouncerFacade as Bouncer;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Bouncer::can('update-user');
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
            'email'     => ['required', 'max:255', 'email', Rule::unique('users')->ignore($this->user)],
            'phone'     => 'required|max:11|min:10',
            'password' => ['nullable', 'min:8', 'max:255',  'confirmed', Rules\Password::defaults()],
            'password_confirmation' => 'nullable|min:8|max:255',
            'role' => 'nullable|string|in:admin,client,operator,manager'
        ];
    }

    public function messages()
    {
        return [
            'password.confirmed' => 'O campo de confirmação de senha deve ser igual ao campo de senha',
        ];
    }

    public function attributes()
    {
        return [
            'password_confirmation' => 'confirmação de senha',
        ];
    }
}
