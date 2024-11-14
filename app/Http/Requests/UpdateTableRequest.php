<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTableRequest extends FormRequest
{
    public function authorize(): bool
    {
        return false;
    }
    public function rules(): array
    {
        return [
            'number' => [
                'required',
                'integer',
                Rule::unique('tables') // Especifica a tabela
                    ->ignore($this->table) // Ignora o registro atual baseado no ID do Table injetado no Request
                    ->where('establishment_id', $this->establishment_id) // Limita a unicidade para o mesmo establishment_id
            ],
            'establishment_id' => 'required|integer|exists:establishments,id',
            'establishment_id' => 'required|integer|exists:establishments,id',
            'type' => 'required|string',
            'status' => 'required|string',
            'qrcode' => 'required|string',
        ];
    }

    public function attributes()
    {
        return [
            'establishment_id' => 'estabelecimento',
            'qrcode' => 'código'
        ];
    }
}
