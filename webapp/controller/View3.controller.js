sap.ui.define([
    'com/soyuz/team/it/controller/BaseController',
    'sap/ui/core/routing/History'
], function(BaseController,History) {
    
    return BaseController.extend("com.soyuz.team.it.controller.View3",{
        onInit: function(){
            var oRouter=this.getOwnerComponent().getRouter();
            oRouter.getRoute("ironman").attachMatched(this.herculis,this)
        },
    herculis:function(oEvent){
        var suppId=oEvent.getParameter("arguments").suppId;
        var sPath='/suppliers/'+suppId;
        this.getView().bindElement(sPath);
    },
    onBack:function(){
        var oHistory, sPreviousHash;

        oHistory = History.getInstance();
        sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            this.getOwnerComponent().getRouter().navTo("spiderman", {}, true /*no history*/);
        }  
    }

 })
})