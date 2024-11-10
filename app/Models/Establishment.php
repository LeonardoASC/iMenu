<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Establishment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'logo_path',
    ];

    public function scopeFilter($query, $request)
    {
        if(!$request) return;
        return $query
            ->when(data_get($request, 'name'), function ($query, $name) {
                return $query->where('name', 'like', '%' . $name . '%');
            });
    }

    public function users() : HasMany
    {
        return $this->hasMany(User::class);
    }
}
