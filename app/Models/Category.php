<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'image',
        'name',
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

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
