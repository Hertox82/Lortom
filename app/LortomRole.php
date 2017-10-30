<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 30/10/2017
 * Time: 15:42
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class LortomRole extends Model
{
    protected $table = 'lt_roles';

    protected $permissions = [];

    public function permissions()
    {
        $this->permissions = $this->belongsToMany('App\LortomPermission','lt_roles_permissions','idRole','idPermission')->get();

        return $this;
    }

    public function toArray()
    {
        $return = [];

        foreach ($this->permissions as $permission)
        {
            $return[] = $permission;
        }

        return $return;
    }

}