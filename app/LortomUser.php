<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 23/10/2017
 * Time: 15:28
 */

namespace App;


use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\Collection;

class LortomUser extends Model
{
    protected $table = 'lt_user';


    protected $roles = [];

    /**
     * @var array
     */
    protected $permissions;

    public function hasRole($role)
    {
        foreach ($this->roles as $r)
        {
            if($r instanceof LortomRole)
            {
                if($r->name == $role)
                {
                    return true;
                }
            }
        }

        return false;
    }

    public function hasRoles()
    {
        return !empty($this->roles);
    }


    public function hasPermission($permission)
    {
        if(empty ($this->permissions))
        {
            $this->permissions();
        }

        foreach ($this->permissions as $p)
        {

            if($p instanceof LortomPermission)
            {
                if($p->name == $permission)
                {
                    return true;
                }
            }
        }

        return false;
    }


    public function permissions()
    {
        $this->permissions = [];

        if(empty($this->roles))
        {
            $this->roles();
        }

        foreach ($this->roles as $role)
        {
            if($role instanceof LortomRole)
            {
                $this->permissions = array_merge($this->permissions, $role->permissions()->toArray());
            }
        }

        return $this->permissions;
    }

    public function getRoles()
    {
        $this->roles();

        return $this->roles;
    }

    public function roles()
    {
        $this->roles =  $this->belongsToMany('App\LortomRole','lt_users_roles','idUser','idRole')->get();

        return $this;
    }

    public function RoletoArray()
    {
        $return = [];

        foreach ($this->roles as $role)
        {
            $return[] = $role;
        }

        return $return;
    }

}



