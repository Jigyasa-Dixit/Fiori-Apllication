sap.ui.define([
    'sap/ui/core/mvc/Controller',
    "com/soyuz/team/it/util/lifeSaver"
], function(Controller,lifeSaver) {
    
    return Controller.extend("com.soyuz.team.it.controller.BaseController",{
        formatter:lifeSaver
    });
});