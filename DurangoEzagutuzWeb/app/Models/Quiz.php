<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $table = 'Quiz'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        'sentence',
        'img',
        'answer',
    ];
}
