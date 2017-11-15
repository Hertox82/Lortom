<?php

namespace Plugins\Hardel\Website\Controller;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Plugins\Hardel\Website\Model\LortomPages;
use DB;

class WebsiteController extends Controller
{

    /**
     * Api Request for get All Pages
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPages(Request $request)
    {
        $sanitizedList = $this->sanitizePages();

        return response()->json(['pages' => $sanitizedList]);
    }

    /**
     * Api Request to get the Attribute List
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPageAttributeList(Request $request)
    {
        return response()->json(['states' => LortomPages::gVal('state')]);
    }

    /**
     * Api Request to create Page
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function savePage(Request $request)
    {
        $input = $request->all();

        $Page = new LortomPages();

        $keys = array_keys($input);

        $toSave = ['title','slug','content','metaDesc','metaTag','state','fileName'];

        foreach ($keys as $key)
        {

            if(in_array($key,$toSave))
            {
                if($key === 'state')
                {
                    $Page->state = $input[$key]['id'];
                }
                else {
                    $Page->$key = $input[$key];
                }
            }
        }

        $Page->save();

        return response()->json(['page' => $this->getPageSerialized($Page)]);
    }

    /**
     * Api Request to Delete a List of Pages
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deletePages(Request $request)
    {
        $input = $request->all();

        foreach ($input as $page)
        {
            $idPage = $page['id'];
            //delete page
            DB::table('lt_pages')->where('id',$idPage)->delete();
        }

        $sanitizedList = $this->sanitizePages();

        return response()->json(['pages' => $sanitizedList]);
    }

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function editPage(Request $request)
    {
        $input = $request->all();

        $idPage = $input['id'];

        $Page = LortomPages::find($idPage);

        $keys = array_keys($input);

        $toSave = ['title','slug','content','metaDesc','metaTag','state','fileName'];

        foreach ($keys as $k)
        {
            if(in_array($k,$toSave))
            {
                if($k === 'state')
                {
                    if($Page->state !== $input[$k]['id'])
                        $Page->state = $input[$k]['id'];
                }
                else {
                    if($Page->$k != $input[$k])
                        $Page->$k = $input[$k];
                }
            }
        }

        $Page->save();

        return response()->json(['page' => $this->getPageSerialized($Page)]);

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
            'id'            => $page->id,
            'title'         => $page->title,
            'slug'          => $page->slug,
            'content'       => $page->content,
            'metaTag'       => $page->metaTag,
            'metaDesc'      => $page->metaDesc,
            'fileName'      => $page->fileName,
            'state'         => LortomPages::gValBack($page->state,'state')
        ];
    }
}