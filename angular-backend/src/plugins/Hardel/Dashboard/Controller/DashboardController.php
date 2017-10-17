<?php
/**
 * User: hernan
 * Date: 17/10/2017
 * Time: 10:53
 */

namespace Plugins\Hardel\Dashboard\Controller;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getDashboard(Request $request)
    {
        $listOfThings = [
          'content' => 'questo è il contenuto della Dashboard, vediamo cosa ci possiamo mettere'
        ];

        return response()->json($listOfThings);
    }
}