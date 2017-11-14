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
                ],
                'migration-up'      => function(){
                    //here migration to create tables and columns
                    $Schema=  Illuminate\Support\Facades\Schema::class;

                    if(! $Schema::hasTable('lt_pages')) {
                        $Schema::create('lt_pages', function (Illuminate\Database\Schema\Blueprint $table) {
                            $table->increments('id');
                            $table->string('title');
                            $table->string('slug');
                            $table->text('content');
                            $table->string('meta_tag');
                            $table->string('meta_desc');
                        });
                    }
                },
                'migration-down'    => function(){
                    //here migration to delete tables
                    $Schema=  Illuminate\Support\Facades\Schema::class;

                    $Schema::dropIfExists('lt_pages');
                },
                'permission'        => 'Hardel.Website'
            ];