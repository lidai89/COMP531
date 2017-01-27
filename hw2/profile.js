//property class, updated after each valid input
function Property(name, value){
	var PropertyName = name;
	var PropertyValue = value;
	
	//Check if input values are valid
	this.validateNewInputValue = function(newValue){
		if(newValue === PropertyValue){
			window.alert('New value is the same as the old value! ('+PropertyName+')');
			return false;
		}
		if(PropertyName === 'displayName'){
			return true;
		}else if(PropertyName === 'emailAddress'){
			if(/^\S+@\S+\.\S+$/.test(newValue)){
				return true;
			}else{
				window.alert('Invalid Email Address!')
			}
		}else if(PropertyName === 'phoneNumber'){
			if(/^\d{3}[\-]?\d{3}[\-]?\d{4}$/.test(newValue)){
				return true;
			}else{
				window.alert('Invalid Phone Number!')
			}
		}else if(PropertyName === 'zipcode'){
			if(/^\d{5}(?:[-\s]\d{4})?$/.test(newValue)){
				return true;
			}else{
				window.alert('Invalid Zipcode!')
			}
		}else if(PropertyName === 'password'){
			var confirm_password = document.getElementById('passwordConfirm');
			var confrimValue = confirm_password.value;
			confirm_password.value = '';
			if(newValue === confrimValue){
				return true;
			}else{
				window.alert('Confirm Passoword Not Match!');
			}
		}
		return false;
	}
	
	this.setValue = function(newValue){	
		PropertyValue = newValue;
	}

	this.getValue = function(){
		return PropertyValue;
	}
}

//Global variable to manage all the properties.
var propertyTable = {};

//Click handler for update button.
function updateSubmit(){
	var changedProperties = [];//track all valid changed properties.
	var properties = document.getElementsByClassName('property');
	var validFlag = true;//All changed properties are valid: true, otherwise: false.
	
	function findValidChangedProperties(item){
		var newValue = item.children[1].children[0].value;
		if(newValue!==''){
			if(propertyTable[item.id].validateNewInputValue(newValue)){
				changedProperties.push(item);
			}else{
				item.children[1].children[0].value = '';
				if(item.id==='password'){
					var confirm_password = document.getElementById('passwordConfirm');
					confirm_password.value = '';
				}
				validFlag = false;
			}		
		}
	}
	Array.from(properties).forEach(findValidChangedProperties);
	//Only perform updation when all changed properties are valid.
	if(validFlag && changedProperties.length!==0){
		var info = 'Updated Fields:\n';
		
		function updateProperties(item){
			oldValue = propertyTable[item.id].getValue();
			newValue = item.children[1].children[0].value;
			item.children[1].children[0].value = '';
			propertyTable[item.id].setValue(newValue);
			item.children[2].innerHTML = (item.id==='password'?'Password Changed!':newValue);
			propertyField = item.children[0].innerHTML;
			if(item.id === 'password'){
				info = info+propertyField+' from '+Array(oldValue.length+1).join('*')+' to '+Array(newValue.length+1).join('*')+'.\n';
			}else{
				info = info+propertyField+' from '+oldValue+' to '+newValue +'.\n';
			}
		}
		changedProperties.forEach(updateProperties);
		window.alert(info);
	}	
}

//Initialize the property fields when the page is loaded.
window.onload = function(){
	var properties = document.getElementsByClassName('property');
	for(var i = 0; i < properties.length; i++){
		(function(item){
			propertyTable[item.id] = new Property(item.id, item.children[2].innerHTML);
		})(properties[i])
	}
}
