<?php
            [
                'vendor'            => 'Hardel',
                'PluginName'        => 'Website',
                'position'          => 4,
                'moduleName'        => 'website.module',
                'routingPath'       => '/website',
                'icon'              => 'fa fa-html5',
                'serviceProvider'   => Plugins\Hardel\Website\Providers\HardelWebsiteServiceProvider::class,
                'subMenu'           => [
                    [
                        'subPath'       => '/website/pages',
                        'Name'          => 'Pages',
                        'permission'    => 'Hardel.Website.Pages'
                    ],
                    [
                        'subPath'       => '/website/menu',
                        'Name'          => 'Menu',
                        'permission'    => 'Hardel.Website.Menu'
                    ],
                    [
                        'subPath'       => '/website/components',
                        'Name'          => 'Component',
                        'permission'    => 'Hardel.Website.Component'
                    ]
                ],
                'migration-up'      => function(){
                    //here migration to create tables and columns
                    $Schema=  Illuminate\Support\Facades\Schema::class;

                    if(! $Schema::hasTable('lt_pages')) {
                        $Schema::create('lt_pages', function (Illuminate\Database\Schema\Blueprint $table) {
                            $table->increments('id');
                            $table->string('title');
                            $table->string('slug');
                            $table->text('content')->nullable();
                            $table->string('metaTag')->nullable();
                            $table->string('metaDesc')->nullable();
                            $table->string('fileName');
                            $table->tinyInteger('state');
                            $table->tinyInteger('type')->default(0);
                            $table->timestamps();
                        });
                    }

                    if(! $Schema::hasTable('lt_components'))
                    {
                        $Schema::create('lt_components',function(Illuminate\Database\Schema\Blueprint $table){
                            $table->increments('id');
                            $table->string('name');
                            $table->text('appearance')->nullable();
                            $table->timestamps();
                        });
                    }

                    if( $Schema::hasTable('lt_components') and $Schema::hasTable('lt_pages'))
                    {
                        if(! $Schema::hasTable('lt_page_component')) {
                            $Schema::create('lt_page_component', function (Illuminate\Database\Schema\Blueprint $table) {
                                $table->increments('id');
                                $table->integer('idPage')->unsigned();
                                $table->foreign('idPage')->references('id')->on('lt_pages')->onUpdate('cascade')->onDelete('cascade');
                                $table->integer('idComponent')->unsigned();
                                $table->foreign('idComponent')->references('id')->on('lt_components')->onUpdate('cascade')->onDelete('cascade');
                                $table->string('Object')->nullable();
                                $table->string('function')->nullable();
                            });
                        }
                    }

                    if( !$Schema::hasTable('lt_menus') and $Schema::hasTable('lt_pages')) {

                        $Schema::create('lt_menus',function(Illuminate\Database\Schema\Blueprint $table){
                            $table->increments('id');
                            $table->string('name');
                            $table->integer('idPage')->unsigned()->nullable();
                            $table->foreign('idPage')->references('id')->on('lt_pages')->onUpdate('cascade')->onDelete('cascade');
                            $table->integer('idParent')->unsigned();
                        });
                    }

                },
                'migration-down'    => function(){
                    //here migration to delete tables
                    $Schema=  Illuminate\Support\Facades\Schema::class;
                    $Schema::dropIfExists('lt_page_component');
                    $Schema::dropIfExists('lt_menus');
                    $Schema::dropIfExists('lt_components');
                    $Schema::dropIfExists('lt_pages');
                },
                'permission'        => 'Hardel.Website'
            ];