// ? External repositories
import Class from '../../submodules/JuanCruzAGB/js/Class.js';

/**
 * * Executes a function when a key is press.
 * @export
 * @class Key
 * @extends {Class}
 */
export default class Key extends Class {
    /**
     * * Creates an instance of Key.
     * @param {object} [data]
     * @param {object} [data.props]
     * @param {boolean} [data.props.ctrlKey=false]
     * @param {number} [data.props.keyCode=107]
     * @param {boolean} [data.props.shiftKey=false]
     * @param {object} [data.callbacks]
     * @param {object} [data.callbacks.press]
     * @param {function} [data.callbacks.press.function]
     * @param {object} [data.callbacks.press.params]
     * @memberof Key
     */
    constructor (data = {
        props: {
            ctrlKey: false,
            keyCode: 107,
            shiftKey: false,
        }, callbacks: {
            press: {
                function: (params) => { console.log(params); },
                params: {
                    // ?
                },
            },
        },
    }) {
        super({
            props: {
                ...Key.props,
                ...(data && data.hasOwnProperty('props')) ? data.props : {},
            },
        });

        this.setCallbacks({
            press: {
                ...Key.callbacks,
                ...(data && data.hasOwnProperty('callbacks')) ? data.callbacks : {},
            },
        });
        
        this.addEvent();
    }

    /**
     * * Add the 'keypress' event.
     * @memberof Key
    */
    addEvent () {
        document.addEventListener('keypress', event => {
            let executes = false;

            if (event.keyCode == this.props.keyCode) {
                executes = true;
            } else {
                executes = false;
            }

            if (this.props.shiftKey) {
                if (event.shiftKey) {
                    executes = true;
                } else {
                    executes = false;
                }
            }
            
            if (this.props.ctrlKey) {
                if (event.shiftKey) {
                    executes = true;
                } else {
                    executes = false;
                }
            }

            if (executes) {
                this.press({
                    ...event,
                });
            }
        });
    }

    /**
     * * Executes the key press.
     * @param {object} [params]
     * @memberof Key
     */
    press (params = {}) {
        this.execute('press', {
            ...params,
        });
    }

    /**
     * * Default properties.
     * @static
     * @var {object} props
     */
    static props = {
        ctrlKey: false,
        keyCode: 107,
        shiftKey: false,
    }
    
    /**
     * * Default callbacks.
     * @static
     * @var {object} callbacks
     */
    static callbacks = {
        press: {
            function: (params) => { console.log(params); },
            params: {
                // ?
            },
        },
    }
}