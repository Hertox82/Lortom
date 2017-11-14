<?php

namespace Plugins\Hardel\Website\Controller;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Plugins\Hardel\Website\Model\LortomPages;

class WebsiteController extends Controller
{
    public function getPages(Request $request)
    {
        $sanitizedList = $this->sanitizePages();

        return response()->json(['pages' => $sanitizedList]);
    }

    private function sanitizePages()
    {
        $listaPages = LortomPages::all();

        $sanitizedList = array_filter(array_map_collection(function($page){
            if($page instanceof LortomPages)
            {
                return $this->getPageSerialized($page);
            }
        },$listaPages));

        return $sanitizedList;
    }

    private function getPageSerialized(LortomPages $page)
    {
        return [
            'id'        => $page->id,
            'title'     => $page->title,
            'content'   => $page->content,
            'meta_tag'  => $page->meta_tag,
            'meta_desc' => $page->meta_desc
        ];
    }
}