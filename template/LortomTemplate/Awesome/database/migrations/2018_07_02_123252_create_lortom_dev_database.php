<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLortom_DevDatabase extends Migration {

        /**
         * Run the migrations.
         *
         * @return void
         */
         public function up()
         {
            
	    /**
	     * Table: lt_components
	     */
	    Schema::create('lt_components', function($table) {
                $table->increments('id')->unsigned();
                $table->string('name', 191);
                $table->text('appearance')->nullable();
                $table->timestamp('created_at')->nullable();
                $table->timestamp('updated_at')->nullable();
            });


	    /**
	     * Table: lt_page_component
	     */
	    Schema::create('lt_page_component', function($table) {
                $table->increments('id')->unsigned();
                $table->integer('idPage')->unsigned();
                $table->integer('idComponent')->unsigned();
                $table->string('Object', 191)->nullable();
                $table->string('function', 191)->nullable();
                $table->index('lt_page_component_idpage_foreign');
                $table->index('lt_page_component_idcomponent_foreign');
            });


	    /**
	     * Table: lt_pages
	     */
	    Schema::create('lt_pages', function($table) {
                $table->increments('id')->unsigned();
                $table->string('title', 191);
                $table->string('slug', 191);
                $table->text('content')->nullable();
                $table->string('metaTag', 191)->nullable();
                $table->string('metaDesc', 191)->nullable();
                $table->string('fileName', 191);
                $table->boolean('state');
                $table->boolean('type');
                $table->timestamp('created_at')->nullable();
                $table->timestamp('updated_at')->nullable();
            });


         }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
         public function down()
         {
            
	            Schema::drop('lt_components');
	            Schema::drop('lt_page_component');
	            Schema::drop('lt_pages');
         }

}