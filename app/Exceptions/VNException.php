<?php
/**
 * User: hernan
 * Date: 18/04/2018
 * Time: 14:26
 */

namespace App\Exceptions;


use Throwable;

class VNException extends \Exception
{
    //This function is constructor of VNException
    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}