/**
 * Created by hernan on 21/11/2017.
 */


import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
    LortomComponent, LortomElement,
    LtElementComp, convertToLtElementComp, convertToNodeList, convertToNodeArray, convertFromNodeToLtElementComp, convLtElementCompToNode
} from '@Lortom/plugins/Hardel/Website/Services/website.interfaces';
import {WebsiteService} from '@Lortom/plugins/Hardel/Website/Services/website.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'codemirror/mode/htmlmixed/htmlmixed';
import { Node } from 'lt-treeview';
import {hasOwnProperty} from 'tslint/lib/utils';

@Component({
    selector : 'wb-component',
    templateUrl : './component.component.html',
    styles : ['']
})

export class ComponentComponent implements OnInit, OnDestroy {
    @Input() component: LortomComponent;
    copyComponent: LortomComponent;
    id: number;
    private sub: any;
    isEdit: boolean;
    listElements = [];
    notFound: boolean;
    config: any;
    listOfNode: Node[];
    listOfDataNode: Node[];
    self = this;

    constructor(private ecService: WebsiteService, private router: ActivatedRoute, private nav: Router) {
        this.isEdit = false;
        this.notFound = false;
        this.config = {
            lineNumbers: true,
            mode : 'htmlmixed',
            styleActiveLine: true,
            matchBrackets: true,
            theme: 'dracula',
        };

        this.component = {
            id : -2,
            name : '',
            check : false,
            elements : [],
            appearance : ''
        };
        this.sub = this.router.params.subscribe(
            (params) => {
                this.id = +params['id'];
                this.component = this.ecService.getComponentByProperty('id', this.id);
                if (this.component != null) {
                    this.notFound = true;
                } else {
                    this.nav.navigate(['/backend/not-found']);
                }
                this.listOfDataNode = convertToNodeArray(this.component.elements);
                this.cloneComponent();
            }
        );
    }

    ngOnInit(){
        this.retriveElements();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /**
     * This function pass into edit Mode
     */
    editMode() {
        // passa in modalità edit
        this.isEdit = !this.isEdit;
    }

    /**
     * This function go to save Mode
     */
    saveMode() {
        // salva i cambiamenti

        const elements = convertFromNodeToLtElementComp(this.listOfDataNode);

        this.component.elements = elements;
        if (!this.isEqual(this.component, this.copyComponent)) {
            if (this.component.name.length == 0) {
                alert('You must write a name of Component, please!');
                this.cloneCopyComponent();
                return;
            }

           /* this.ecService.saveComponent(this.component).subscribe(
                (component : LortomComponent) => {
                    this.component = component;
                    this.retriveElements();
                    this.ecService.updateComponentInList(this.component);
                    this.editMode();
                }
            );
            */
           this.ecService.saveComponent(this.component).subscribe(
               (data: any) => {

                   console.log(data);
               });
        }
    }

    /**
     *
     * @param arrayList
     * @param data
     * @returns {Promise<Node>}
     */
    updateNode(data: any): Promise<Node> {
        let obj = {
            idComponent : this.component.id,
            object: data.node.obj,
        };

        if (hasOwnProperty(data, 'parent')) {
            obj['parent'] = data.parent.obj;
        }

        return this.ecService.updateElementComponent(obj).then(
            (item: LtElementComp) => {
                return convLtElementCompToNode(item) as Node;
            }
        );
    }

    deleteNode(data: any) {
        console.log(data);

        if (data.node.obj.el.id > -1) {
            let obj = {
                idComponentElement: data.node.obj.el.id,
                idComponent: this.component.id,
            };

            this.ecService.deleteElementComponent(obj).subscribe(
                (elements: LtElementComp[]) => {
                     this.component.elements = elements;
                     this.ecService.updateComponentInList(this.component);
                     this.listOfDataNode = convertToNodeArray(this.component.elements);
                     this.cloneComponent();
                }
            );
        }
    }

    /**
     * This function is to get Permission from API
     */
    private retriveElements() {
        this.ecService.getElementsFrom().subscribe(
            (elements: LortomElement []) => {
                elements.forEach(
                    (item: LortomElement) => {
                        this.listElements.push(convertToLtElementComp(item));
                    }
                );

                this.listOfNode = convertToNodeList(this.listElements);
            }
        );
        this.cloneComponent();
    }

    /**
     * This function reset the Information of Role
     */
    resetMode() {

        if (!this.isEqual(this.component, this.copyComponent)) {
            if (confirm('Are you sure you don\'t want to save this changement and restore it?')) {
                this.cloneCopyComponent();
            }
        }
    }

    isEqual(v, v2): boolean {
        return (v.name == v2.name) && (v.elements.length == v2.elements.length);
    }


    /**
     * This function clone the Role
     */
    cloneComponent() {
        if (this.component != null) {
            const elements: LtElementComp[] = [];

            for (const perm of this.component.elements)
            {
                elements.push(perm);
            }

            this.copyComponent = Object.assign({}, this.component);
            this.copyComponent.elements = elements;
        }
    }

    /**
     * This function clone the CopyRole
     */
    cloneCopyComponent() {
        const elements: LtElementComp[] = [];

        for (const perm of this.copyComponent.elements)
        {
            elements.push(perm);
        }

        this.component = Object.assign({}, this.copyComponent);
        this.component.elements = elements;
    }
}
