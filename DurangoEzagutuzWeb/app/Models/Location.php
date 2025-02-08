<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $table = 'Locations'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        'position',
        'name',
        'description',
        'explanation',
        'lat',
        'lon', // Cambiado de 'long' a 'lon' para coincidir con la base de datos
        'img',
        'audio',
        'video',
        'time',
        'activity',
    ];
}
