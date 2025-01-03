<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Charge extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'value',
        'description',
        'type',
        'is_optional',
        'status'
    ];

    public function scopeFilter($query, $request)
    {
        if(!$request) return;
        return $query
            ->when(data_get($request, 'name'), function ($query, $name) {
                return $query->where('name', 'like', '%' . $name . '%');
            });
    }
}
