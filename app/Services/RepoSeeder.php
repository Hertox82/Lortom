<?php
/**
 * User: hernan
 * Date: 28/06/2018
 * Time: 11:26
 */


namespace App\Services;


class RepoSeeder {

    /**
     * @var array
     */
    protected $data = [];


    public function __construct()
    {

        $this->register(config_path().'/seeder.php');
    }

    /**
     * This function add element into array
     * @param $class
     */
    public function add($class) {

        array_push($this->data,$class);
    }

    /**
     * This function return all data
     * @return array
     */
    public function all() {
        return $this->data;
    }

    /**
     * This function remove item from data
     * @param $class
     */
    public function remove($class) {
        if (($key = array_search($class, $this->data)) !== false) {
            unset($this->data[$key]);
        }
    }

    protected function register($path) {
        $data = require $path;

        foreach ($data as $class) {
            $obj = new $class($this);
        }
    }
}