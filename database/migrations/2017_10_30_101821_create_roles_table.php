<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lt_roles', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name');
            $table->string('site')->nullable();
            $table->timestamps();
        });

        Schema::create('lt_users_roles',function(Blueprint $table){
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('idRole')->unsigned();
            $table->foreign('idRole')->references('id')->on('lt_roles')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('idUser')->unsigned();
            $table->foreign('idUser')->references('id')->on('lt_user')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('lt_permissions',function(Blueprint $table){
           $table->engine = 'InnoDB';
           $table->increments('id');
           $table->string('name');
           $table->timestamps();
        });

        Schema::create('lt_roles_permissions',function(Blueprint $table){
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('idRole')->unsigned();
            $table->foreign('idRole')->references('id')->on('lt_roles')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('idPermission')->unsigned();
            $table->foreign('idPermission')->references('id')->on('lt_permissions')->onDelete('cascade')->onUpdate('cascade');

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lt_roles_permissions');
        Schema::dropIfExists('lt_permissions');
        Schema::dropIfExists('lt_users_roles');
        Schema::dropIfExists('lt_roles');
    }
}
