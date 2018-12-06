<?php

namespace Plugins\Hardel\Website\Controller;

use LTFramework\Controllers\LortomController as Controller;
use Illuminate\Http\Request;
use Plugins\Hardel\Website\Model\LortomComponent;
use Plugins\Hardel\Website\Model\LortomMenu;
use Plugins\Hardel\Website\Model\LortomPages;
use DB;

class WebsiteController extends Controller
{


    public function __construct()
    {
        $this->functionName = 'wbservice';
    }

    /**
     * @Api({
            "description" : "This method rebuild the Page, with Page ID"
     * })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function rebuildPage(Request $request) {

        $input = $request->all();

        $Page = LortomPages::find($input['id']);

        $message = 'I Cannot find this Page';

        if($Page) {
            if($Page instanceof LortomPages) {

                $Page->rebuildPage();
                $message = 'Ok, the Page is rebuilt';
            }
        }

        return response()->json(['message' => $message]);
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
        return response()->json(['states' => LortomPages::getFieldValue('state')]);

    }


    public function getModelsFromActiveTemplate(Request $request) {

        return response()->json(['models' => ltpm()->getModelsFromActiveTemplate()]);
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
        $components = isset($input['components']) ? $input['components'] : [];
        $subTables = [
            'lt_page_component' => [

                'lista' => $components,

                'subTableKey' => [
                    'idComponent'     => true,
                    'idPage'   => false,
                    'functions' => ['alias' => 'function'],
                    'Object'    => true,
                ],
            ],
        ];

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

        // here go the check if it can delete a file
        foreach($input as $page) {
            deleteRefObjFile($input['id'], $Class);
        }

        return response()->json($this->deleteObj(compact('input','tableCol','Class','name','responseKey')));
    }

    /**
     * API Request to get the List of Menus
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
   public function getMenus(Request $request)
   {
       $responseKey = 'menus';
       $Class = LortomMenu::class;
       $name = 'Menu';
       return response()->json($this->getList(compact('responseKey','Class','name')));

   }

    /**
     * API Request to Delete a List of Menus
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
   public function deleteMenus(Request $request)
   {
       $input = $request->all();

       $idToProbablyDelete = [];

       //put inside a variable
       foreach ($input as $it) {
           $idToProbablyDelete[] = $it['id'];
       }

       $listToDelete = [];
       //filtering deleting ID
       foreach ($idToProbablyDelete as $id)
       {
            $Menu = LortomMenu::find($id);

            if( $Menu ){
                if(!in_array($id,$listToDelete)){
                    $listToDelete[] = $id;
                    $listToDelete = array_merge($listToDelete,$Menu->getMyChildren($Menu->id));
                }
            }
       }

       foreach ($listToDelete as $item) {
           DB::table('lt_menus')->where('id',$item)->delete();
       }

       $responseKey = 'menus';
       $Class = LortomMenu::class;
       $name = 'Menu';
       return response()->json($this->getList(compact('responseKey','Class','name')));

   }

   public function getMenuAttributeList(Request $request)
   {
       return response()->json([
           'data' => [
               'parentList' => LortomMenu::getFieldValue('idParent'),
               'pageList'   => LortomMenu::getFieldValue('idPage')
           ]
       ]);
   }

   public function storeMenu(Request $request)
   {
       $input = $request->all();
       $type = ($request->method() == 'POST') ? 'Save' : 'Edit';
       $ToSave = ['name','idPage','idParent'];
       $responseKey = 'menu';
       $name = 'Menu';
       $Class = LortomMenu::class;
       $subTables = [];

       return response()->json($this->storeObj(compact('input','Class','type','ToSave','subTables','responseKey','name')));
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

        //pr($input,1);
        $Class = LortomComponent::class;
        $type = ($request->method() == 'POST') ? 'Save' : 'Edit';
        $ToSave = ['name','appearance'];
        $responseKey = 'component';
        $name = 'Component';
        $subTables = [];

        return response()->json($this->storeObj(compact('input','Class','type','ToSave','subTables','responseKey','name')));
    }

    /**
     * This function is to store the Subtable of lt_component_element
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateComponentElement( Request $request)
    {
        $input = $request->all();
        $idComponent = $input['idComponent'];
        $idElement = $input['object']['el']['idElement'];
        $idPadre = 0;

        if(isset($input['parent']))
        {
            if(isset($input['parent']['el'])) {
                $idPadre = $input['parent']['el']['id'];
            }
            else if(isset($input['parent']['item']))
            {
                $idPadre = $input['parent']['item']['id'];
            }
        }

        $data = [
            'idComponent' => $idComponent,
            'idElement'   => $idElement,
            'idPadre'     => $idPadre
        ];

        $id = DB::table('lt_component_element')->insertGetId($data);

        $elementStd = $this->getComponentElement($id);

        $Component = LortomComponent::find($idComponent);

        return response()->json(['elementComponent' => $Component->serializeSubElements($elementStd,$Component)]);
    }

    public function deleteComponentElement( Request $request)
    {
        $input = $request->all();

        $idComponentElement = $input['idComponentElement'];

        $Component = LortomComponent::find($input['idComponent']);

        $arrayOfIdToDelete = [];

        $listOfChild = $this->getCompElByIdFather($idComponentElement);

        $itself = $this;


        $arrayOfIdToDelete = array_reduce(array_filter(
            array_map_collection(function($child)use($itself){

                $idArray[] = $child->id;

                $listOfIdChild = $itself->loopOverFather($child->id);

                return array_merge($idArray,$listOfIdChild);
            },$listOfChild)),function($carry,$item){
            if(!empty($carry))
                $carry = array_merge($carry,$item);
            else
                $carry = $item;
            return $carry;
        });

        $arrayOfIdToDelete[] = $idComponentElement;

        foreach ($arrayOfIdToDelete as $id) {
            DB::table('lt_component_element')->where('id',$id)->delete();
        }

        // now is time to resend all component elements

        return response()->json(['elements' => $Component->getElements()]);
    }

    private function loopOverFather($idFather)
    {
        $listOfChild = $this->getCompElByIdFather($idFather);

        $listOfId = [];

        foreach ($listOfChild as $child) {
            $listOfId[] = $child->id;

            $listOfIdChild = $this->loopOverFather($child->id);

            $listOfId = array_merge($listOfId,$listOfIdChild);
        }

        return $listOfId;
    }

    private function getComponentElement($id) {
       return  DB::table('lt_component_element')
            ->where('lt_component_element.id',$id)
            ->join('lt_elements','lt_elements.id','=','lt_component_element.idElement')
            ->select([
                'lt_component_element.id AS id',
                'lt_elements.id AS idElement',
                'lt_elements.name AS name',
                'lt_elements.Object AS Object',
                'lt_elements.function AS function',
                'lt_elements.appearance AS appearance',
            ])->get()[0];
    }

    private function getCompElByIdFather($idFather) {
        return DB::table('lt_component_element')
            ->where('lt_component_element.idPadre',$idFather)
            ->join('lt_elements','lt_elements.id','=','lt_component_element.idElement')
            ->select([
                'lt_component_element.id AS id',
            ])->get();
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


    public function getVariable(Request $request, $id)
    {
        $LComponent = LortomComponent::find($id);

        $reduced = [];
        if($LComponent)
        {
           $reduced = $LComponent->getVariableFromAppearance();
        }

        return response()->json(['variable' => $reduced]);
    }
}