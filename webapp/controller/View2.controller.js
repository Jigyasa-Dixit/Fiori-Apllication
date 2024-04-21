sap.ui.define([
    'com/soyuz/team/it/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
   
], function(BaseController,MessageBox,MessageToast,Fragment,Filter,FilterOperator) {
    return BaseController.extend("com.soyuz.team.it.controller.View2",{
        onInit: function(){
          var oRouter=this.getOwnerComponent().getRouter();
           oRouter.getRoute("superman").attachMatched(this.herculis,this)
        },
        herculis:function(oEvent){
            var fruiId=oEvent.getParameter("arguments").fruitId;
            var sPath='/fruits/'+fruiId;
            this.getView().bindElement(sPath);
        },
        onSearch:function(oEvent){
            var oSearchItem=oEvent.getParameter("value");
            var oFilter=new Filter("name",FilterOperator.Contains,oSearchItem);
       
            var oSelectDialog=oEvent.getSource();
            oSelectDialog.getBinding("items").filter(oFilter)
        },
        
        onBack:function(){
            this.getView().getParent().to("idView1")
        },
        oPopupSupplier:null,
        oCityPopUp:null,
        oField:null,
        onFilter:function(){
            var that=this;
            if(!this.oPopupSupplier){
                Fragment.load({
                    name:'com.soyuz.team.it.fragment.popup',
                    id:"supplier",
                    controller:this
                   }).then(function(oFragment){
                 that.oPopupSupplier=oFragment;
                
                 that.oPopupSupplier.setTitle("Supplier")
                 //agrregation binding
                 that.getView().addDependent(that.oPopupSupplier)
                 that.oPopupSupplier.bindAggregation("items",{
                    path:"/suppliers",
                    template:new sap.m.ObjectListItem({
                        title:"{name}",
                        intro:"{sinceWhen}",
                        number:"{contactNo}"
                    })
                   
                 })
                 that.oPopupSupplier.open();
                   })
                  
            }
           
               else{
               this.oPopupSupplier.open();
               }
            // MessageBox.alert("Under work!")
        },
        onF4Help:function(oEvent){
            this.oField=oEvent.getSource();
            var that=this;
            if(!this.oCityPopUp){
                Fragment.load({
                    name:'com.soyuz.team.it.fragment.popup',
                    id:"city",
                    controller:this
                   }).then(function(oFragment){
                 that.oCityPopUp=oFragment;
                
                 that.oCityPopUp.setMultiSelect(false);
                 that.oCityPopUp.setTitle("Supplier")
                 //agrregation binding
                 that.getView().addDependent(that.oCityPopUp)
                 that.oCityPopUp.bindAggregation("items",{
                    path:"/cities",
                    template:new sap.m.ObjectListItem({
                        title:"{name}",
                        intro:"{famousFor}",
                        number:"{otherName}"
                    })
                   
                 })
                 that.oCityPopUp.open();
                   })
                  
            }
           
               else{
               this.oCityPopUp.open();
               }
        },
        onConfirmPopUp:function(oEvent){
           
           var sId=oEvent.getSource().getId();
           if(sId.indexOf("city")!=-1){
            var selectedItems=oEvent.getParameter("selectedItem");
            var sText=selectedItems.getTitle();
            this.oField.setValue(sText)
            
            }else{
                var aFilter=[]
                var aItems=oEvent.getParameter("selectedItems");
                for( var i=0;i<aItems.length;i++){
                        var element=aItems[i];
                        var sTitle=element.getTitle();
                        var oFilter=new Filter("name",FilterOperator.EQ,sTitle);
                       
                            aFilter.push(oFilter)
                        var oFinalFilter=new Filter({
                            filters:aFilter,
                            and:false
                        })
                        this.getView().byId("idTable").getBinding("items").filter(oFinalFilter)
                }
            }
            
           
        },
        onSave:function(){
            var oResourceModel=this.getView().getModel("i18n");
            var oBundle=oResourceModel.getResourceBundle();
           var msgSuccess= oBundle.getText('msgSuccess',["86848"]);
           var msgError=oBundle.getText('msgError');
            MessageBox.confirm("Do you want to save?",{
                title:'Confirmation',
                onClose:function(status){
                    if(status==='OK'){
                        MessageToast.show(msgSuccess);
                    }else{
                        MessageBox.error(msgError);
                    }
                }
            })
        },
        onItemPressSupp:function(oEvent){
            // this.oRouter.getOwnerComponent().getRouter();
            var oSearch=oEvent.getParameter("listItem").getBindingContextPath();
            var sId=oSearch.split("/")[oSearch.split("/").length-1];
            this.getOwnerComponent().getRouter().navTo("ironman",{
        suppId:sId
       })
        }
    });
});