/**
 * Created by hernan on 21/11/2017.
 */


import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LortomComponent}  from '@Lortom/plugins/Hardel/Website/Services/website.interfaces';
import {WebsiteService} from '@Lortom/plugins/Hardel/Website/Services/website.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'codemirror/mode/htmlmixed/htmlmixed';

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
    notFound: boolean;
    config: any;
    self = this;
    size: {w: string|number, h: string|number}

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

        this.size = {
            w: '100%',
            h: 477
        };

        this.component = {
            id : -2,
            name : '',
            check : false,
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
                this.cloneComponent();
            }
        );
    }

    ngOnInit(){
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

        if (!this.isEqual(this.component, this.copyComponent)) {
            if (this.component.name.length == 0) {
                alert('You must write a name of Component, please!');
                this.cloneCopyComponent();
                return;
            }

           this.ecService.saveComponent(this.component).subscribe(
                (component : LortomComponent) => {
                    this.component = component;
                    this.ecService.updateComponentInList(this.component);
                    this.editMode();
                }
            );
        }
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
            this.copyComponent = Object.assign({}, this.component);
        }
    }

    /**
     * This function clone the CopyRole
     */
    cloneCopyComponent() {
        this.component = Object.assign({}, this.copyComponent);
    }
}
