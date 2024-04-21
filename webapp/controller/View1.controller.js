sap.ui.define([
    'com/soyuz/team/it/controller/BaseController',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(BaseController,Filter,FilterOperator) {
    return BaseController.extend("com.soyuz.team.it.controller.View1",{
        onInit: function(){
         this.oRouter=this.getOwnerComponent().getRouter();
         this.oRouter.getRoute("superman").attachMatched(this.hericulus,this)
        },
        hericulus:function(oEvent){
            var fruitId=oEvent.getParameter("arguments").fruitId;
            var sPath='/fruits/'+fruitId;
            var oList=this.getView().byId("myList");
            var aItems=oList.getItems();
            for(var i=0;i<aItems.length;i++){
                var item=aItems[i];
                if(item.getBindingContextPath()===sPath){
                    var itemObject=item;
                    break;
                }
            }
            oList.setSelectedItem(itemObject)
            
        },
        onNavigate:function (myFruitId) {
            // //get the current object
            // var oCurrView=this.getView();
            // // get the parent
            // var oAppCon=oCurrView.getParent();
            // // navigate to the other page
            // oAppCon.to("idView2");
           this.oRouter.navTo("superman",{
            fruitId:myFruitId
           })
        },
        onItemsDelete:function(){
            var oList=this.getView().byId("myList");
             var aSelectedItems=oList.getSelectedItems();
             aSelectedItems.forEach(element => {
                oList.removeItem(element)
             });
        },
        onItemSelect:function(oEvent){
            // debugger
            //get the selected item
         var sPath=  oEvent.getParameter("listItem").getBindingContextPath();
        //get the target object here view2 for that get parent object oappcon
    //     var oAppCon=this.getView().getParent();
    //         //get the view2 object
    //   var oV2=  oAppCon.getPages()[1]
//    var oV2= this.getView().getParent().getParent().getDetailPage("idView2");
      //element binding with whole v2
    //    oV2.bindElement(sPath);
            var Id=sPath.split("/")[sPath.split("/").length-1];
      this.onNavigate(Id)
        },
        onItemDelete:function(oEvent){
      var oItemToBeDeleted= oEvent.getParameter("listItem");
    //   var oList=this.getView().byId("myList");
    var oList=oEvent.getSource();
      console.log(oItemToBeDeleted.getTitle()+" will be deleted")
       oList.removeItem(oItemToBeDeleted);
        },
        onSearch:function(oEvent){
            var oSearch=oEvent.getParameter("query")
            if(!oSearch){
                oSearch=oEvent.getParameter("newValue");
            }
             var oFilter1=new Filter("name",FilterOperator.Contains,oSearch)
            var oFilter2=new Filter("{=${price}==='true'?true:false}",FilterOperator.Contains,oSearch)
            var aFilter=[oFilter1,oFilter2];
        var oFilter=    new Filter({
                filters:aFilter,
                and:false
            })
            this.getView().byId("myList").getBinding("items").filter(oFilter)
        }
    });
});