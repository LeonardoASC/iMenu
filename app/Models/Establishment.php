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
            ->when($request['search'] ?? false, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                    $q->orWhere('email', 'like', '%' . $search . '%');
                });
            })
            ->when(data_get($request, 'email'), function ($query, $email) {
                return $query->where('email', $email);
            });
    }

    public function users() : HasMany
    {
        return $this->hasMany(User::class);
    }

    public function tables() : HasMany
    {
        return $this->hasMany(Table::class);
    }
}
