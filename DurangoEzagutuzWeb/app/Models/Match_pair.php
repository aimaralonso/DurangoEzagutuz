<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Match_pair extends Model
{
    /** @use HasFactory<\Database\Factories\MatchPairFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'img',
    ];
}
