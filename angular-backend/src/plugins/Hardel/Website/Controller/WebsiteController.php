<?php

namespace Plugins\Hardel\Website\Controller;

use App\Http\Controllers\LortomController as Controller;
use Illuminate\Http\Request;
use Plugins\Hardel\Website\Model\LortomComponent;
use Plugins\Hardel\Website\Model\LortomElement;
use Plugins\Hardel\Website\Model\LortomPages;
use DB;

class WebsiteController extends Controller
{


    public function __construct()
    {
        $this->functionName = 'wbservice';
    }

    /**
     * Api Request for get All Pages
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPages(Request $request)
    {
        $responseKey = 'pages';
        $Class = LortomPages::class;
        $name = 'Page';
        return response()->json($this->getList(compact('responseKey','Class','name')));
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
     * This Create or Update a LortomPage
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storePage(Request $request)
    {
        $input = $request->all();
        $ToSave = ['title','slug','content','metaDesc','metaTag','state','fileName'];
        $Class = LortomPages::class;
        $type = ($request->method() == 'POST') ? 'Save' : 'Edit';
        $responseKey = 'page';
        $name = 'Page';
        $subTables = [];

        return response()->json($this->storeObj(compact('Class','type','input','ToSave','responseKey','name','subTables')));
    }

    /**
     * Api Request to Delete a List of Pages
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deletePages(Request $request)
    {
        $input = $request->all();
        $tableCol = ['lt_pages' => 'id'];
        $Class = LortomPages::class;
        $name = 'Page';
        $responseKey = 'pages';

        return response()->json($this->deleteObj(compact('input','tableCol','Class','name','responseKey')));
    }

    /**
     *This function get all list of LortomElement
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getElements(Request $request)
    {
        $responseKey = 'elements';
        $Class = LortomElement::class;
        $name = 'Element';
        return response()->json($this->getList(compact('responseKey','Class','name')));
    }

    /**
     * This function delete LortomElement
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteElements(Request $request)
    {
        $input = $request->all();
        $tableCol = ['lt_elements' => 'id'];
        $Class = LortomElement::class;
        $name = 'Element';
        $responseKey = 'elements';

        return response()->json($this->deleteObj(compact('input','tableCol','Class','name','responseKey')));
    }

    /**
     * This function Create or Update a LortomElement
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeElement(Request $request)
    {
        $input = $request->all();
        $ToSave = ['name', 'Object', 'functions', 'appearance'];
        $Class = LortomElement::class;
        $type =  ($request->method() == 'POST') ? 'Save' : 'Edit';
        $responseKey = 'element';
        $name = 'Element';
        $subTables = [];

        return response()->json($this->storeObj(compact('Class','type','input','ToSave','responseKey','name','subTables')));
    }

    /**
     * This function
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getComponents(Request $request)
    {
        $responseKey = 'components';
        $Class = LortomComponent::class;
        $name = 'Component';
        return response()->json($this->getList(compact('responseKey','Class','name')));
    }

    /**
     * This function Create or Update LortomComponent
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeComponent(Request $request)
    {
        $input = $request->all();
        $Class = LortomComponent::class;
        $type = ($request->method() == 'POST') ? 'Save' : 'Edit';
        $ToSave = ['name','appearance'];
        $responseKey = 'component';
        $name = 'Component';
        $subTables = [
            'lt_component_element' => [

                'lista' => $input['elements'],

                'subTableKey' => [
                    'idElement'     => true,
                    'idComponent'   => false
                ]
            ],
        ];

        return response()->json($this->storeObj(compact('input','Class','type','ToSave','subTables','responseKey','name')));
    }

    /**
     * This function delete LortomComponent
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteComponents(Request $request)
    {
        $input = $request->all();
        $tableCol = [
            'lt_page_component' => 'idComponent',
            'lt_component_element' => 'idComponent',
            'lt_elements' => 'id'
        ];
        $Class = LortomComponent::class;
        $name = 'Component';
        $responseKey = 'components';

        return response()->json($this->deleteObj(compact('input','tableCol','Class','name','responseKey')));

    }
}