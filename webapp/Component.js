sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("com.soyuz.team.it.Component",{
        metadata: {
            manifest: "json"
        },
        init : function(){
            //UIComponent is the base class, here we will call base class constructor
           
            UIComponent.prototype.init.apply(this);
            //get the router object
            var oRouter=this.getRouter();
            oRouter.initialize();
           
        },
        // createContent: function(){
            
        //  var oView=  new sap.ui.view("idRootView",{
        //         viewName:"com.soyuz.team.it.view.App",
        //         type:"XML"
              
        //     });
           
        //     var oView1=new sap.ui.view("idView1",{
        //         viewName:"com.soyuz.team.it.view.View1",
        //         type:"XML"
        //     });
        //     var oView2=new sap.ui.view("idView2",{
        //         viewName:"com.soyuz.team.it.view.View2",
        //         type:"XML"
        //     });
        //     // get the app con object
        //     var oAppCon=oView.byId("idAppCon");
        //     // add the pages 
        //     // oAppCon.addPage(oView1).addPage(oView2);
        //     //  for SplitApp container to add page use 
        //     oAppCon.addMasterPage(oView1).addDetailPage(oView2);
        //      return oView;

        // },
        destroy: function(){

        }
    });
});