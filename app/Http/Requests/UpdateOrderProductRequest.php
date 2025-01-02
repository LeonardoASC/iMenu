<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderProductRequest extends FormRequest
{
    /**
     * Determina se o usuário está autorizado a fazer esta requisição.
     */
    public function authorize(): bool
    {
        // Novamente, aqui você pode implementar regras de permissão se necessário.
        return true;
    }

    /**
     * Retorna as regras de validação para esta request.
     */
    public function rules(): array
    {
        return [
            'product_id' => 'sometimes|exists:products,id',
            'quantity'   => 'sometimes|integer|min:1',
            'price'      => 'sometimes|numeric|min:0',
            'status'     => 'sometimes|string',
        ];
    }
}
