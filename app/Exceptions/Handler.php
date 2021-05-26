<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Plugins\Hardel\File\Model\LortomFile;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use File;
use Response;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
     public function register()
     {
         $this->reportable(function (Throwable $e) {
             //
         }); 
     }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response
     * 
     * @throws \Throwable
     */
    public function render ($request, Throwable $exception)
    { 
        if($exception instanceof NotFoundHttpException) {
            if($request instanceof Request) {
                $url = $request->url();
                $url = str_replace($_ENV['APP_URL'].'/','',$url);
                $data = extractDataFromUrl($url);
                
                if(empty($data)) {
                    return parent::render($request, $exception);
                }
                extract($data,EXTR_SKIP);
                $where = [
                    ['fileName',$fileName],
                    ['extension',$extension],
                    ['path', $path]
                ];
                $file = LortomFile::where($where)->first();
                
                if($file) {
                    if(! File::exists($file->getRealPath())) {
                        return parent::render($request, $exception);
                    } else {
                        if($file->getTypeByExtension() != 'document') {
                            
                            mkThumb([
                                'i' => $file->id,
                                'w' => $w,
                                'h' => $h
                            ]);
                           $fileName = $fileName.'.'.$extension;
                        }
                        $f = File::get(public_path().$path.$fileName);
                        $type = File::mimeType(public_path().'/'.$url);
                        $response = Response::make($f,200);
                        $response->header("Content-Type", $type);
    
                        return $response;
                    }
                }
               
            }
        }
        return parent::render($request, $exception);
    }
}
