sap.ui.define([
    
], function () {
    return {
        getStatus: function (status) {
            switch (status) {
                case "Available":
                    return "Success";
                  
                case "Out of Stock":
                    return "Warning";
                   
                case "Discontinued":
                    return "Error";
                   
                default:
                    break;
            }
        }
    }
});