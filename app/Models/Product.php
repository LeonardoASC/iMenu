<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
        'status',
        'image',
        'category_id',
    ];

    public function scopeFilter($query, $request)
    {
        if(!$request) return;
        return $query
            ->when(data_get($request, 'name'), function ($query, $name) {
                return $query->where('name', 'like', '%' . $name . '%');
            });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_product')
            ->withPivot('quantity', 'price', 'status')
            ->withTimestamps();
    }
}
