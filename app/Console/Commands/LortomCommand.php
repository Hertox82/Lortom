<?php
/**
 * User: hernan
 * Date: 18/04/2018
 * Time: 14:50
 */

namespace App\Console\Commands;

use App\Exceptions\VNException;
use Illuminate\Console\Command;
use File;

abstract class LortomCommand extends Command
{


    protected function extrapolateVendorName($VendorName,$silent,$type= "Template") {

        $vendorName = [];

        // if developer not assign the Vendor and Name
        if(strlen($VendorName) == 0) {

            // if silent is not called
            if(!$silent) {
                $vendorName[0] = $this->ask('Name of Vendor?');
                $vendorName[1] = $this->ask("Name of {$type}?");
            }
            else {
                //throw an Exception
                throw new VNException('{"error":100, "message": "vendorName not assigned and call silent"}');
            }

        } else {
            //the right format to vendor-name is "Vendor,Name"
            $vendorName = explode(',',$VendorName);

            // Check the correct format of Vendor-Name
            if(count($vendorName) != 2)
            {
                if(!$silent) {
                    $vendorName[0] = $this->ask('Name of Vendor?');
                    $vendorName[1] = $this->ask("Name of {$type}?");
                }
                else {
                    throw new VNException('{"error":100, "message": "vendorName format erorr and call silent"}');
                }
            }
        }

        return $vendorName;
    }


    /**
     * this function extrapolate Name
     * @param $name
     * @return mixed|string
     */
    protected function extrapolateName($name) {
        $name = str_replace('-',' ',$name);
        $name = ucwords($name);
        $name = str_replace(' ','',$name);

        return $name;
    }

    /**
     * this function
     * @return string
     */
    protected function getPathTemplate() {
        return app_path().'/../template/';
    }

    protected function getPathPlugin() {
        return app_path().'/../angular-backend/src/plugins/';
    }


    protected function checkIfPathNotExists($name,$vendor,$type) {
        //check the right format of Type
        $this->checkTypo($type);

        //get the path of all $type
        $path = call_user_func_array([$this,"getPath{$type}"],[]);

        if(get_called_class() == "App\\Console\\Commands\\DeleteTemplate") {

            if(!$this->checkIfExist($path.$vendor,$path.$vendor.'/'.$name)) {
                $this->info("This {$type}: {$name} in this Vendor: {$vendor} will be deleted!");
                return;
            }
        }
        else {
            if($this->checkIfExist($path.$vendor,$path.$vendor.'/'.$name))
            {
                $this->info("This {$type}: {$name} in this Vendor: {$vendor} already exist! Please select other Name for your {$type}");
                return;
            }
        }
    }

    /**
     * This function check if path of vendor and path of name exists
     * @param $pathVendor
     * @param $pathVendorName
     * @return bool
     */
    protected function checkIfExist($pathVendor,$pathVendorName) {
        if(File::exists($pathVendor)) {
            return File::exists($pathVendorName);
        } else {
            return false;
        }
    }

    /**
     * This function check if developer put
     * @param $type
     */
    protected function checkTypo($type) {
        if(strlen($type) == 0) {
            $this->error("The Type is Empty");
            return;
        } else {
            $typo = ["Template", "Plugin"];
            if(!in_array($type,$typo)) {
                $this->error("The Type is not Template or Plugin");
                return;
            }
        }
    }

}