<?php

namespace Plugins\Hardel\Website\Controller;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Plugins\Hardel\Website\Model\LortomComponent;
use Plugins\Hardel\Website\Model\LortomElement;
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
        return response()->json(['pages' => wbservice()->sanitizeItem(LortomPages::class,'Page')]);
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

        $Page = wbservice()->saveObject(LortomPages::class,'Save',$input,['title','slug','content','metaDesc','metaTag','state','fileName']);

        return response()->json(['page' => wbservice()->getItemSerialized('Page',$Page)]);
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

        return response()->json(['pages' => wbservice()->sanitizeItem(LortomPages::class,'Page')]);
    }

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function editPage(Request $request)
    {
        $input = $request->all();

        $Page = wbservice()->saveObject(LortomPages::class,'Edit',$input,['title','slug','content','metaDesc','metaTag','state','fileName']);

        return response()->json(['page' => wbservice()->getItemSerialized('Page',$Page)]);
    }

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getElements(Request $request)
    {
        return response()->json(['elements' => wbservice()->sanitizeItem(LortomElement::class,'Element')]);
    }

    public function deleteElements(Request $request)
    {
        $input = $request->all();
        foreach ($input as $el)
        {
            $idElement = $el['id'];
            //delete page
            DB::table('lt_elements')->where('id',$idElement)->delete();
        }

        return response()->json(['elements' => wbservice()->sanitizeItem(LortomElement::class,'Element')]);
    }

    /**
     * This function create a new LortomElement
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveElement(Request $request)
    {
        //get all input from body
        $input = $request->all();

        //create a new LortomElement with WebsiteService
        $Element = wbservice()->saveObject(LortomElement::class,'Save',$input,['name', 'Object', 'functions', 'appearance']);

        //return a response in JSON to backend
        return response()->json(['element' => wbservice()->getItemSerialized('Element',$Element)]);
    }

    /**
     * This function Edit a LortomElement
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function editElement(Request $request)
    {
        $input = $request->all();

        $Element = wbservice()->saveObject(LortomElement::class,'Edit',$input,['name', 'Object', 'functions', 'appearance']);

        return response()->json(['element' => wbservice()->getItemSerialized('Element',$Element)]);
    }

    /**
     * This function
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getComponents(Request $request)
    {
        return response()->json(['components' => wbservice()->sanitizeItem(LortomComponent::class,'Component')]);
    }

    public function saveComponent(Request $request)
    {
        $input = $request->all();

        $Component = wbservice()->saveObject(LortomComponent::class,'Save',$input,['name','appearance']);

        $listOfElement = $input['elements'];

        foreach ($listOfElement as $el)
        {
            DB::table('lt_component_element')->insert(['idElement' => $el['id'],'idComponent' => $Component->id]);
        }

        return response()->json(['component' => wbservice()->getItemSerialized('Component',$Component)]);
    }

    public function editComponent(Request $request)
    {
        $input = $request->all();

        $Component = wbservice()->saveObject(LortomComponent::class,'Edit',$input,['name','appearance']);

        $listOfElement = $input['elements'];

        //Before save listOfElements, i want to delete them

        DB::table('lt_component_element')->where('idComponent',$Component->id)->delete();

        foreach ($listOfElement as $el)
        {
            DB::table('lt_component_element')->insert(['idElement' => $el['id'],'idComponent' => $Component->id]);
        }

        return response()->json(['component' => wbservice()->getItemSerialized('Component',$Component)]);
    }

}