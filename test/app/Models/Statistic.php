<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static where(string $string)
 * @method static create(array $array)
 * @method static select()
 */
class Statistic extends Model
{
    use HasFactory;
    protected $fillable = ['code', 'key', 'agent'];
}
