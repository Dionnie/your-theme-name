import.meta.glob(['../images/**', '../fonts/**']);
import 'bootstrap';
import jQuery from 'jquery';
Object.assign(window, { $: jQuery, jQuery });
// or if you don't want to pollute the entire window scope you can use the following to set $ as a global variable in your script
globalThis.$ = jQuery;
