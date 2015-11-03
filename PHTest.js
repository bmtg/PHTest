// ==UserScript==
// @name         PHTest
// @namespace    http://your.homepage/
// @version      0.8
// @description  Ph test script.  
// @author       bmtg, vtpearce
// @include      https://www.waze.com/editor/*
// @grant        none
// ==/UserScript==

function runPH() {

	console.log("start PHTest");
	
	
	setTimeout(setupKBShort, 500);
    
   console.log("post KB PHTest");
	
   function registerKeyShortcut(action_name, annotation, callback, key_map) {
		Waze.accelerators.addAction(action_name, {group: 'default'});
		Waze.accelerators.events.register(action_name, null, callback);
		Waze.accelerators.registerShortcuts(key_map);
	}
	
	function setupKBShort() {
		registerKeyShortcut("harmonizePlace", "Harmonize Place", harmonizePlace, {"A+a": "harmonizePlace"});
	}
		
	function harmonizePlace() {
		console.log("start PH func");
	
		var thisUser = W.loginManager.user;
		if (thisUser === null)
			return;
		
		jQuery("#sidebar").focus();
		
		var UpdateObject;
		if (typeof (require) !== "undefined") {
			UpdateObject = require("Waze/Action/UpdateObject");
		}
		else {
			UpdateObject = W.Action.UpdateObject;
		}
	
		var item = W.selectionManager.selectedItems[0].model;
		var tempServ = item.attributes.services.slice(0);
		if (item.type == "venue") {
			desServ = ["PARKING_FOR_CUSTOMERS"];
			for (var ixServ=0; ixServ<desServ.length;ixServ++) {
				if ( tempServ.indexOf(desServ[ixServ]) == -1 ) {
					tempServ.push(desServ[ixServ]);
				}
			}
			W.model.actionManager.add(new UpdateObject(item, { services: tempServ }));
		}
		
	}
	
	
}


var DLscript = document.createElement("script");
DLscript.textContent = runPH.toString() + ' \n' + 'runPH();';
DLscript.setAttribute("type", "application/javascript");
document.body.appendChild(DLscript);
