// ? Local repository
import { loadImages } from "./gallery.js";

/**
 * * View controls the view.
 * @export
 * @class View
 */
export class View{
    /**
     * * Creates an instance of View.
     * @param {Object} [properties] View properties:
     * @param {String} [properties.name] View name.
     * @param {String} [properties.type] View type.
     * @memberof View
     */
    constructor(properties = {
        name: 'categorias',
        type: 'table',
    }){
        this.setProperties(properties);
        this.setHTML();
    }

    /**
     * * Set the View properties.
     * @param {Object} [properties] View properties:
     * @param {String} [properties.name] View name.
     * @param {String} [properties.type] View type.
     * @memberof View
     */
    setProperties(properties = {
        name: 'categorias',
        type: 'table',
    }){
        this.properties = {};
        this.setNameProperty(properties);
        this.setTypeProperty(properties);
    }

    /**
     * * Returns the Link properties or an specific property.
     * @param {String} [name] View name.
     * @returns {Object|*}
     * @memberof Link
     */
    getProperties(name = ''){
        if (name && name != '') {
            return this.properties[name];
        } else {
            return this.properties;
        }
    }

    /**
     * * Check if there is a property.
     * @param {String} name View name.
     * @returns {Boolean}
     * @memberof Link
     */
    hasProperty(name = ''){
        if (this.properties.hasOwnProperty(name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a property value.
     * @param {String} name View name.
     * @param {*} value View value.
     * @memberof Link
     */
    changeProperty(name = '', value = ''){
        if (this.hasProperty(name)) {
            this.properties[name] = value;
        }
        switch (name) {
            default:
                break;
        }
    }

    /**
     * * Set the View name.
     * @param {Object} [properties] View properties:
     * @param {String} [properties.name] View name.
     * @memberof View
     */
    setNameProperty(properties = {
        name: 'categorias',
    }){
        this.properties.name = ((properties.hasOwnProperty('name')) ? properties.name : 'categorias');
    }

    /**
     * * Set the View type.
     * @param {Object} [properties] View properties:
     * @param {String} [properties.type] View type.
     * @memberof View
     */
    setTypeProperty(properties = {
        type: 'table',
    }){
        this.properties.type = ((properties.hasOwnProperty('type')) ? properties.type : 'table');
    }

    /**
     * * Set the View HTML Element.
     * @memberof View
     */
    setHTML(){
        let views = document.querySelector(`#${ this.properties.name }`).children;
        this.html = views[0];
        for (const html of views) {
            html.classList.add('hidden');
            if (html.classList.contains(`${ this.properties.type }-data`)) {
                this.html = html;
            }
        }
        this.html.classList.remove('hidden');
    }

    /**
     * * Change the View properties.
     * @param {Object} [properties] View properties:
     * @param {String} [properties.name] View name.
     * @param {String} [properties.type] View type.
     */
    change(properties = {
        name: 'categorias',
        type: 'table',
    }){
        this.changeProperty('name', properties.name);
        this.changeProperty('type', properties.type);
        this.setHTML();
    }

    /**
     * * Change the data from the details view.
     * @param {*} properties
     * @param {Boolean} [property=false]
     * @memberof View
     */
    setDetailsData(properties, property = false){
        let inputs = [], mode = 'edit', files = true;
        if (!property) {
            files = false;
            property = properties[0];
            mode = 'add';
        } else {
            document.querySelector('.details-data .edit-data').href = `#propiedades?name=${ property.slug }&updating`;
        }
        for (const index in property) {
            let value = property[index];
            if (mode == 'add') {
                value = '';
            }
            let input;
            if (input = document.querySelector(`#propiedades .details-data [name=${ index }]`)) {
                switch (input.nodeName) {
                    case 'TEXTAREA':
                        if (index == input.name) {
                            if (typeof value == 'object') {
                                input.innerHTML = value.text;
                                input.value = value.text;
                            } else {
                                input.innerHTML = value;
                                input.value = value;
                            }
                            input.dataset.defaultValue = input.innerHTML;
                        }
                        autosize(input);
                        break;
                    case 'SELECT':
                        if (index == input.name) {
                            for (const option of input.options) {
                                if (option.value == value) {
                                    option.selected = true;
                                }
                            }
                            input.dataset.defaultValue = input.selectedIndex;
                        }
                        break;
                    default:
                        if (index == input.name) {
                            if (typeof value == 'object') {
                                input.value = value.text;
                            } else {
                                input.value = value;
                            }
                            input.dataset.defaultValue = input.value;
                        }
                        break;
                }
                inputs.push(input);
            }
        }
        loadImages(((files) ? property.files : []));
    }
}