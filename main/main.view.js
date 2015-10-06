sap.ui.jsview("main.main", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf mobiletest.inicio
	*/ 
	getControllerName : function() {
		return "main.main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf mobiletest.inicio
	*/ 
	createContent : function(oController) {
	    var demoTbl = new sap.ui.table.Table({
        visibleRowCount: 10,
        width : "100%",
        selectionMode: sap.ui.table.SelectionMode.Multi,
    });

    var systemColumn = new sap.ui.table.Column({
        width:"12%",
        label: new sap.ui.commons.Label({text: "System", design:sap.ui.commons.LabelDesign.Bold}),
        template: new sap.ui.commons.TextField({editable:false}).bindProperty("value", "name"),
        sortProperty: "name",  
        filterProperty: "name",
        sorted : false,
        filtered : false
    });
    demoTbl.addColumn(systemColumn);
var inputListBox = new sap.ui.commons.ListBox();
	inputListBox.bindAggregation("items","dropList",function(oId,oContext){
        return new sap.ui.core.ListItem({
            key: oContext.getProperty("id"),
            text: oContext.getProperty("name")
        });
});
    var connectorIpColumn = new sap.ui.table.Column({
        width:"12%",
        label: new sap.ui.commons.Label({text: "Dropdown Data", design:sap.ui.commons.LabelDesign.Bold}),
        template: new sap.ui.commons.DropdownBox({
            "association:listBox" : inputListBox
        })
    });
    demoTbl.addColumn(connectorIpColumn);
    
     var oData={
    "dataList": [{
             "id": 111,
             "name": "Row1 Data",
             "dropList": [
                 {"id": 1, "name": "Row1 dropDown Item1"},
                 {"id": 2, "name": "Row1 dropDown Item2"},
                 {"id": 3, "name": "Row1 dropDown Item3"},
                 {"id": 4, "name": "Row1 dropDown Item4"}
             ]
         },
         {
             "id": 222,
             "name": "Row2 Data",
             "dropList": [
                 {"id": 5, "name": "Row2 dropDown Item1"},
                 {"id": 6, "name": "Row2 dropDown Item2"},
                 {"id": 7, "name": "Row2 dropDown Item3"}
             ]
         },
         {
             "id": 333,
             "name": "Row3 Data",
             "dropList": [
                 {"id": 8, "name": "Row3 dropDown Item1"},
                 {"id": 9, "name": "Row3 dropDown Item2"},
                 {"id": 10, "name": "Row3 dropDown Item3"}
             ]
         }
     ]};
     
      var mappingModel = new sap.ui.model.json.JSONModel({listData:oData});
    sap.ui.getCore().setModel(mappingModel, "mappingModel");
    demoTbl.setModel(mappingModel);
    demoTbl.bindRows("/listData/dataList");
    
    mappingModel.refresh(true);
		
		var mainPage = new sap.m.Page("mainPage", {
			title: "SAPUI5 BIND TABLE DROPDOWNBOX",
			enableScrolling: true,
			showNavButton:true,
			showHeader: true,
			customHeader : new sap.m.Bar({
				contentLeft: [ ],	
				contentMiddle: [ new sap.m.Label("myBarLabelNave", {text: "SAPUI5 BIND TABLE DROPDOWNBOX"}) ]
			}),
			content: [
			    demoTbl
			    ]
		});

		return mainPage;
	}

});