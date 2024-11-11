<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTableRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'number' => [
                'required',
                'integer',
                Rule::unique('tables') // Especifica a tabela onde a regra será aplicada
                    ->where('establishment_id', $this->establishment_id) // Limita a unicidade para o mesmo establishment_id
            ],
            'establishment_id' => 'required|integer|exists:establishments,id',
        ];
    }
}
