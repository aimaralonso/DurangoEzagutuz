<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Match_pair extends Model
{
    use HasFactory;

    protected $table = 'Match_pair'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        'name',
        'img',
    ];
}
