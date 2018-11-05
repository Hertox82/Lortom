<?php
            [
                'vendor'            => 'Hardel',
                'PluginName'        => 'File',
                'version'           => '1.0.0',
                'position'          => 5,
                'moduleName'        => 'file.module',
                'routingPath'       => '/file',
                'icon'              => 'fa fa-file-o',
                'serviceProvider'   => Plugins\Hardel\File\Providers\HardelFileServiceProvider::class,
                'subMenu'           => [],
                'migration-up'      => function(){
                    //here migration for plugin
                    $Schema=  Illuminate\Support\Facades\Schema::class;

                    $Schema::create('lt_file',function(Illuminate\Database\Schema\Blueprint $table){
                        $table->increments('id');
                        $table->string('fileName');
                        $table->string('extension');
                        $table->string('type');
                        $table->string('path');
                        $table->timestamps();
                    });

                    if($Schema::hasTable('lt_file')) {
                        $Schema::create('lt_file_object', function(Illuminate\Database\Schema\Blueprint $table){
                            $table->increments('id');
                            $table->integer('idFile')->unsigned();
                            $table->foreign('idFile')->references('id')->on('lt_file')->onUpdate('cascade')->onDelete('cascade');
                            $table->integer('idObj')->unsigned();
                            $table->string('typeObj');
                            $table->text('description')->nullable();
                            $table->tinyInteger('position')->default(0);
                            $table->timestamps();

                        });
                    }
                },
                'migration-down'    => function(){
                    //here migration to delete tables
                    $Schema=  Illuminate\Support\Facades\Schema::class;
                    $Schema::dropIfExists('lt_file_object');
                    $Schema::dropIfExists('lt_file');


                },
                'permission'        => 'Hardel.File'
            ];