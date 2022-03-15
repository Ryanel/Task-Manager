<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;

class Task extends Model
{
    use HasFactory;

    // Get the user associated with this task.
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
