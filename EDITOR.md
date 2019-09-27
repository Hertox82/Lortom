# Editor Manager

The Editor Manager is a new concept to build the Backend, in a few second you can transform an "Object" in a full REST webpage.

Let's go in deep to the topic.

How can i do this?

*N.B: Lortom is built over Laravel and Angular, please read both documentation before starting to use Lortom CMS.*

#### Example

##### Writing route.php

While you are building a Plugin, first of all use the `Route::resource()`in your `route.php`file in order to allow you to use the full REST API  *(index, create, store, edit, update, delete)*.

#### Example

```php
<?php

// file into your Plugin, route.php

// ...

Route::resource('products', 'ProductsController');

// ....

```

##### Controller

Now, to build a list of objects (such as a product list), we need to do some things:

First of all we have to use the `BuildEditTrait`.

This Trait takes care of writing for you the functions required by the `Route::resource()` which are: create, edit, index, store, show, destroy, update and delete.

The functions described above take charge of Laravel's HTTP Request, and depending on the type they pass it to three distinct functions that you will have to implement within your Controller which are: `buildViewList()`, `buildViewEdit()` and the `storeAndUpdate()` function ;

```php

<?php

namespace Plugins\Vendor\Bundle\Controller;

use Illuminate\Http\Request;
use LTFramework\Controllers\LortomController as Controller;
use LTFramework\Traits\BuildEditTrait;

class ProductsController extends Controller {
    use BuildEditTrait;

     public function buildViewList(Request $request) {
         // TODO
         // ...
     }

     public function buildViewEdit(Request $request, $id = 0) {
         // TODO
         // ....
     }

     public function storeAndUpdate(Request $request, $id = 0) {
         // TODO
         // ...
     }

}

```

Let's go into detail:

### **buildViewList**

This function will create a list of your object.

in Lortom there is a `tbl()` function which combined with Angular components will automatically create a table in the backend

`tbl()` returns a Table object to which you can add the columns of the Actions and Tabs buttons.

- `addColumns()`
- `addAction()`
- `addTab()`

#### AddColumns

this function accept an array with this key:

- field
- label
- type

Field is the column of the table in database you want to show.

Label is the Name of the table you want to display.

Type is the type of data you want to represent. (text, id, checkbox, date, preset).

#### AddAction

There are two types of actions: Routing or Event.

Routing is a link

Event is a button action.

This function accept an array with this key:

- data *(array)*
- type  *(routing, event)*

`data` accept this key:

- routing
- styleIcon   *(ex. 'fa fa-file')*
- styleButton  *(ex. btn btn-primary)*
- label        *(ex. New)*

#### AddTab

this function accept an array with this key:

- label
- active
- routing

```php
<?php

namespace Plugins\Vendor\Bundle\Controller;

use Illuminate\Http\Request;
use LTFramework\Controllers\LortomController as Controller;
use LTFramework\Traits\BuildEditTrait;
use Plugins\Vendor\Bundle\Model\Products;

class ProductsController extends Controller {
    use BuildEditTrait;

     public function buildViewList(Request $request) {
         $tab = tbl(['class' => Products::class]);

         $tab->addColumns([
            'field' => 'name',
            'label' => 'Name',
            'type'  => 'text'
         ])->addColumns([
            'field' => 'state',
            'label' => 'State',
            'type' => 'preset'
         ])->addAction([
            'data'  => [
                'routing'       => '/backend/shop/products/new',
                'styleIcon'     => 'fa fa-file',
                'styleButton'   => 'btn btn-primary',
                'label'         => 'New',
            ],
            'type'  => 'routing'  
         ])->addAction([
            'data'  => [
                'styleIcon'     => 'fa fa-times',
                'styleButton'   => 'btn btn-danger',
                'label'         => 'Delete',
            ],
            'type'  => 'event'
        ])->addTab([
            'label'     => 'Products',
            'active'    => true,
        ])->addTab([
            'label'     => 'Categories',
            'active'    => false,
            'routing'   => '/backend/shop/categories-products'
        ]);

        return $tab;
     }

     public function buildViewEdit(Request $request, $id = 0) {}

     public function storeAndUpdate(Request $request, $id = 0) {}
}
```

## Angular ListEditComponent

Now it's time to go and create the angular component that will be responsible for creating the List of the object in question.

```typescript

import {Component, OnInit} from '@angular/core';
import { ListEditComponent} from '@Lortom/model/list-edit.component';
import { ShopServices } from '../Services/shop.services';
import { Router } from '@angular/router';

@Component({
    selector: 'shop-products',
    template: `
        <div >
            <tablist
            [listOfTabLink]="listOfLink"
            [listOfAction]="listOfActions"
            [header]="listTh"
            [listOfData]="listOfResource"
            [basePath]="myRoot"
            *ngIf="isRoot === true">
            </tablist>
            <router-outlet></router-outlet>
        </div>
    `
})
export class ProductsComponent extends ListEditComponent implements OnInit {
    constructor(srShop: ShopServices, prdRouter: Router) {
        super(srShop, prdRouter, '/backend/shop/products', 'Products');
    }

    ngOnInit() {}
}
```

Then `ProductsComponent` will extend `ListEditComponent`.

When the `ListEditComponent` constructor is created, a series of automatic mechanisms are activated that will be used to visually create the table.

In practice, through the Service (in this case the *ShopServices*) a request is sent to the url `'/backend/shop/products'`,
at that point the *ProductController* seen before will send as a response a JSON in which it will tell how this table should be made.

Once these data are read, the `ListEditComponent` will be able to build the table.

## **buildViewEdit**

```php
<?php

$edit = edit([
    'class' => Products::class,
    'objId' => $id,
    'input' => $request->all();
]);

```

This function allows you to create your own EditView with which you can use both for the creation of your object and for the update.

In Lortom there is the function `edit()` which together with the Angular Components will automate the creation of the Form for the creation/updating of the object.

`edit()` returns an Editor object, you can add components that are of two types: Block or Field, and accepts an array with the following keys:

- *class*
- *objId*
- *input*

In class we will have to pass the name of the object class.  
In objId the id of the object, this may be 0 being created and greater than zero when an update is to be done.  
In input instead will go the data of the request.

### AddCp

```php

public function addCp($type, $abstract, array $data);

```

This function allows you to add components to the Editor object.  
the components are of two types: Block and Field.  
Multiple fields can correspond to each block.


As you can see there are three parameters to pass to the function:

- type
- abstract
- data

**type** you have to pass o bl or fl.

**abstract** you must pass the name of the object Block or Abstract Field;
at present there are the following names:

For the Block we have:

- block
- cbList (checkbox list)
- table
- modal
- file

for the Fields we have:

- text
- email
- hidden
- select
- tinymce
- chbxList *(checkbox field list)*
- number
- textarea
- search
- tblfield  *(table field)*
- date
- filefld *(file field)*
- uplfile

each of these objects accepts different types of **data**.

**data** is passed as an *array*.

#### Blocks

Every Blocks has the same data:

- label
- icons

For the Fields this change.

#### Fields

these are the keys in common with all fields.

- label
- name
- isEdit
- formatting
- data
- placeholder
- db_table
- db_callable

**label** is what you will see on the form.  
**name** is the column name of the database table.  
**isEdit** is a boolean that serves to see if the inputs are readonly or not.  
**formatting** is a Closure for data formatting.  
**data** is the passed data  
**placeholder** is the placeholder of the input  
**db_table** should be populated when you want to join with another table  
**db_callable** is a Closure and is used to sanitize the Name of the table column.

```php
<?php

namespace Plugins\Vendor\Bundle\Controller;

use Illuminate\Http\Request;
use LTFramework\Controllers\LortomController as Controller;
use LTFramework\Traits\BuildEditTrait;
use Plugins\Vendor\Bundle\Model\Products;

class ProductsController extends Controller {
    use BuildEditTrait;

     public function buildViewList(Request $request) {}

     public function buildViewEdit(Request $request, $id = 0) {

         $isEdit = true;

        if($id > 0) {
            $isEdit = false;
        }

        $edit =  edit([
             'class'   => Products::class,
             'objId' => $id,
             'input' => $request->all()
         ])
         ->addCp('bl','block',[
             'label' => 'Generale',
             'icons' => 'fa fa-database',
         ])->addCp('fl','text',[
             'label' => 'Name', // label near the input
             'placeholder' => 'Name',
             'name'  => 'name',
             'data'  => '',
             'isEdit'    => $isEdit
         ])->addCp('fl','text',[
             'label' => 'Product Number',
             'placeholder'   => 'Product Number',
             'name'  => 'productCode',
             'data'  => '',
             'isEdit' => $isEdit
         ])->addCp('fl','select', [
            'label' => 'State',
            'name'  => 'state',
            'data'  => '',
            'isEdit'    => $isEdit,
            'options'   => Products::gValS('state')
        ])->addCp('fl','select', [
            'label' => 'Package',
            'name'  => 'package',
            'data'  => '',
            'isEdit'    => $isEdit,
            'options'   => Products::gValS('package')
        ])->addCp('fl','number', [
            'label' => 'Quantity',
            'name'  => 'quantity',
            'data'  => '',
            'isEdit'    => $isEdit
        ]);

        return $edit;
     }

     public function storeAndUpdate(Request $request, $id = 0) {}
}
```

##### Select

for select field we have also another key to pass:

- options

Options is a list that populate the option in a select.

##### chbxList

for checkbox list field we have also another key to pass:

- items

items accept an array with this keys:

- id
- name
- check

check is a boolean and serves to know if the object has been checked or not.  
id is the id of the object (take from the table into the database).  
name is the "label" of the object.

##### number

for number we have also another key to pass:

- step

##### search

for search we have also another key to pass:

- route

route is a web url where send a search.

##### tblField

- table
- name
- uniqueKeys
- keyParams

`table` accept an array with this keys:

- theader (array of table header)
- tbody   (array with rows of table)
- rulesPrint

`rulesPrint` is an array where the keys are the object to print and the values are what you want to print.  

If you wanted to print more than one attribute of the object just separate the values ​​from a `|`.  for example:

```php
...
    'rulesPrint' => [
        'product'   => 'productCode|name',
        'VAT'       => 'name'
    ]
...
```

`uniqueKeys` is an array and is used to not duplicate lines making certain values ​​unique.

`keyParams` is an array and is used to exclude a list of attributes from the table so as not to display them.

##### filefld

- idObj
- obj

##### uplfile

- saveButton
- urlToSave
