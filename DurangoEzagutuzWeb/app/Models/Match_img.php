<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Match_img extends Model
{
    /** @use HasFactory<\Database\Factories\MatchImgFactory> */
    use HasFactory;

    protected $fillable = [
        'img_before',
        'img_after',
    ];
}
