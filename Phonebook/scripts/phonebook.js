window.onload = function(){
	// Buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	// Form Fields
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	//var address = document.getElementById('address');
	//var city = document.getElementById('city');
	//var email = document.getElementById('email');
	// Divs etc.
	var addBookDiv = document.querySelector('.addbook');

	quickAddBtn.addEventListener("click", function(){
		// display the form div
		quickAddFormDiv.style.display = "block";
		quickAddBtn.style.display = "none";
		addBookDiv.style.display = "none";

	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
		quickAddBtn.style.display = "block";
			addBookDiv.style.display = "block";
	});

	AddBtn.addEventListener("click", addToBook);


	addBookDiv.addEventListener("click", removeEntry);

	// Storage Array
	var addressBook = [];
	{var objj = new jsonStructure("name","phone");
	addressBook.push(objj);
			localStorage['addbook'] = JSON.stringify(addressBook);
	addBookDiv.style.display = "none";}
	//addressBook[1].fullname="Name";
	//addressBook[1].phone = "Phone";

	//localStorage['addbook'] = '[{"fullname":"Name","phone":"Phone"}]';

	function jsonStructure(fullname,phone,address,city,email){
		this.fullname = fullname;
		this.phone = phone;
	//	this.address = address;
	//	this.city = city;
	//	this.email = email;
	}
	
function annotate(){
  var typed= document.getElementById("fullname").value;
  document.getElementById("printchatbox").innerHTML= typed;
}
//function printnamee(){
//	var inputname = document.getElementById('fullname').value;
  // document.getElementById('tname').innerHTML = inputname;
//}
//var inputphone = document.getElementById('phone');

//inputphone.onkeyup = function(){
 //   document.getElementById('printphone').innerHTML = inputBox.value;
//}
    
	function addToBook(){

		var isNull = fullname.value!='' && phone.value!='' ;
		if(isNull){
			// format the input into a valid JSON structure
			var obj = new jsonStructure(fullname.value,phone.value);
			addressBook.push(obj);

			localStorage['addbook'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";
			clearForm();
			showAddressBook();
			quickAddBtn.style.display = "block";
			addBookDiv.style.display = "block";
		}
	}

	function removeEntry(e){
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			//if (addressBook.length==0){
			//	addBookDiv.style.display = "none";
			//}else{
				showAddressBook();
			//}

		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
		document.getElementById('printname').innerHTML = "";
		document.getElementById('printphone').innerHTML ="";
	}

	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBook = JSON.parse(localStorage['addbook']);
			// Loop over the array addressBook and insert into the page
			addBookDiv.innerHTML = '';
			//var q = '<div class="entry">';
			//q += '<div class="name"><p>' + Namee + '</p></div>';
			//q += '<div class="phone"><p>' + Phonee + '</p></div>';
			//q += '</div>';
			//addBookDiv.innerHTML += q;
			for(var n =0 ; n <1 ; n++){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
			//		str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
			//		str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
			//		str += '<div class="city"><p>' + addressBook[n].city + '</p></div>';
					//str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
			for(var n =1 ; n <addressBook.length ; n++){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
			//		str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
			//		str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
			//		str += '<div class="city"><p>' + addressBook[n].city + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();

}