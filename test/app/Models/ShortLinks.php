<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static where(string $string, string $rand_code)
 * @method static create(array $array)
 * @method static find(int $int)
 */
class ShortLinks extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'commercial', 'link', 'lifetime'];
    public $timestamps = false;
    public $incrementing = false;
    protected $keyType = 'string';
    public $primaryKey = "code";
}
