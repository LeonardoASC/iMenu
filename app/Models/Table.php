<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Table extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'number',
        'establishment_id',
        'type',
        'status',
        'qrcode'
    ];

    public function scopeFilter($query, $request)
    {
        if(!$request) return;
        return $query
            ->when($request['search'] ?? false, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('type', 'like', '%' . $search . '%');
                    $q->orWhereRelation('establishment', 'name', 'like', '%' . $search . '%');
                    $q->orWhere('status', 'like', '%' . $search . '%');
                });
            })
            ->when(data_get($request, 'establishment_id'), function ($query, $establishment_id) {
                return $query->where('establishment_id', $establishment_id);
            })
            ->when(data_get($request, 'type'), function ($query, $type) {
                return $query->where('type', $type);
            })
            ->when(data_get($request, 'status'), function ($query, $status) {
                return $query->where('status', $status);
            })
            ->when(data_get($request, 'number'), function ($query, $number) {
                return $query->where('number', $number );
            });
    }

    public function establishment(): BelongsTo
    {
        return $this->belongsTo(Establishment::class);
    }


}
