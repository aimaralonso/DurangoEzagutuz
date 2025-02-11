<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Match_img extends Model
{
    use HasFactory;

    protected $table = 'Match_img'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        'img_before',
        'img_after',
    ];
}
