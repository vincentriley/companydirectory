import {
	displayPersonnel,
	displayDepartments,
	displayLocations,
	populateSearchCriteria,
	createDepartmentDropdown,
	createPersonnelDropdown,
	updateEditPersonnelFields,
	updateEditDepartmentFields,
	updateEditLocationFields,
} from "./ui.js";

/////////////////////////// READ ////////////////////////////////////////

//GET ALL PERSONNEL
const getPersonnel = () => {
	$.ajax({
		url: "libs/php/getAll.php",
		type: "GET",
		dataType: "json",
		success: function (result) {
			displayPersonnel(result.data);
			createPersonnelDropdown(result.departmentList);
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

//GET ALL DEPARTMENTS
const getDepartments = () => {
	$.ajax({
		url: "libs/php/getAllDepartments.php",
		type: "GET",
		dataType: "json",
		success: function (result) {
			console.log(result)
			displayDepartments(result.data);
			createDepartmentDropdown(result.locationList);
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

//gets locations for the purpose of populating the dropdown menu in create personnel
const getDepartmentsPopulateDropdown = () => {
	$.ajax({
		url: "libs/php/getAllDepartments.php",
		type: "GET",
		dataType: "json",
		success: function (result) {
			createDepartmentDropdown(result.locationList)
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

//GET ALL LOCATIONS
const getLocations = () => {
	$.ajax({
		url: "libs/php/getAllLocations.php",
		type: "GET",
		dataType: "json",
		success: function (result) {
			displayLocations(result.data);
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

//gets locations for the purpose of populating the dropdown menu in create department
const getLocationsPopulateDropdown = () => {
	$.ajax({
		url: "libs/php/getAllDepartments.php",
		type: "GET",
		dataType: "json",
		success: function (result) {
			console.log(result)
			createDepartmentDropdown(result.locationList);
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

//GET PERSONNEL BY ID
const getPersonnelByID = (id) => {
	$.ajax({
		url: "libs/php/getPersonnelByID.php",
		type: "POST",
		dataType: "json",
		data: {
			id: id,
		},
		success: function (result) {
			console.log(result)
			displayPersonnel(result.data.personnel);
			createPersonnelDropdown(result.data.departmentList)
			updateEditPersonnelFields(id, result.data.personnel);
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

//ADVANCED FIND
const getPersonnelAdvancedFind = (searchFor, searchBy, term) => {
	$.ajax({
		url: "libs/php/getAdvancedFind.php",
		type: "POST",
		dataType: "json",
		data: {
			searchFor: searchFor,
			searchBy: searchBy,
			term: term,
		},
		success: function (result) {
			if (searchFor === "department") {
				displayDepartments(result.data.department);
				updateEditDepartmentFields(term, result.data.department);
			}
			if (searchFor === "personnel") {
				displayPersonnel(result.data.personnel);
				createPersonnelDropdown(result.data.departmentList);
			}
			if (searchFor === "location") {
				console.log(result)
				displayLocations(result.data.location);
				updateEditLocationFields(term, result.data.location);
			}
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

/////////////////////////// CREATE ////////////////////////////////////////

const insertPersonnel = (
	firstName,
	lastName,
	jobTitle,
	email,
	departmentID
) => {
	$.ajax({
		url: "libs/php/insertPersonnel.php",
		type: "POST",
		dataType: "json",
		data: {
			firstName: firstName,
			lastName: lastName,
			jobTitle: jobTitle,
			email: email,
			departmentID: departmentID,
		},
		success: function (result) {
			$("#creationSuccessfulModal").modal("show");
			getPersonnelAdvancedFind("personnel", "firstName", firstName);
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

const insertLocation = (name) => {
	$.ajax({
		url: "libs/php/insertLocation.php",
		type: "POST",
		dataType: "json",
		data: {
			name: name,
		},
		success: function (result) {
			
			$("#creationSuccessfulModal").modal("show");
			getPersonnelAdvancedFind("location", "name", name);
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

const insertDepartment = (name, locationID) => {
	$.ajax({
		url: "libs/php/insertDepartment.php",
		type: "POST",
		dataType: "json",
		data: {
			locationID: locationID,
			name: name,
		},
		success: function (result) {
			$("#creationSuccessfulModal").modal("show");
			getPersonnelAdvancedFind("department", "name", name);
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

/////////////////////////////////////// DELETE //////////////////////////////////////////

const checkDepartmentDeletion = (id) => {
	$.ajax({
		url: "libs/php/checkDeletion.php",
		type: "POST",
		dataType: "json",
		data: {
			id: id
		},
		success: function (result) {
			if (result.data != 0) {
				$("#deletionUnsuccessfulModal").modal("show")
			} else {
				$("#confirmDeleteDepartmentModal").modal("show")
			}
			
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
}

/*const deleteDepartment = (id) => {
	$.ajax({
		url: "libs/php/deleteDepartment.php",
		type: "POST",
		dataType: "json",
		data: {
			id: id,
		},
		success: function (result) {
			if (result.data.outcome === "department deleted") {
				$("#deletionSuccessfulModal").modal("show");
				getDepartments();
			} else {
				$("#deletionUnsuccessfulModal").modal("show");
			}
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};*/

const deleteLocation = (id) => {
	$.ajax({
		url: "libs/php/deleteLocation.php",
		type: "POST",
		dataType: "json",
		data: {
			id: id,
		},
		success: function (result) {
			if (result.data.outcome === "location deleted") {
				$("#deletionSuccessfulModal").modal("show");
				getLocations();
			} else {
				$("#deletionUnsuccessfulModal").modal("show");
			}
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

const deletePersonnel = (id) => {
	$.ajax({
		url: "libs/php/deletePersonnel.php",
		type: "POST",
		dataType: "json",
		data: {
			id: id,
		},
		success: function (result) {
			$("#deletionSuccessfulModal").modal("show");
			getPersonnel();
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

///////////////////////////// UPDATE ////////////////////////////////////////////

const updatePersonnel = (
	firstName,
	lastName,
	jobTitle,
	email,
	departmentID,
	id
) => {
	$.ajax({
		url: "libs/php/updatePersonnel.php",
		type: "POST",
		dataType: "json",
		data: {
			firstName: firstName,
			lastName: lastName,
			jobTitle: jobTitle,
			email: email,
			departmentID: departmentID,
			id: id,
		},
		success: function (result) {
			getPersonnelAdvancedFind("personnel", "id", id);
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

const updateDepartment = (name, locationID, id) => {
	$.ajax({
		url: "libs/php/updateDepartment.php",
		type: "POST",
		dataType: "json",
		data: {
			name: name,
			locationID: locationID,
			id: id,
		},
		success: function (result) {
			getPersonnelAdvancedFind("department", "id", id);
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

const updateLocation = (name, id) => {
	$.ajax({
		url: "libs/php/updateLocation.php",
		type: "POST",
		dataType: "json",
		data: {
			name: name,
			id: id,
		},
		success: function (result) {
			getPersonnelAdvancedFind("location", "id", id);
		},
		error: function (jqXHR, exception) {
			console.log(jqXHR);
		},
	});
};

/////////////////////////// UPDATE EVENTS ////////////////////////////////////////

/*$(document).on('click', ".editPersonnelButton",(e) => {
	getDepartmentsPopulateDropdown()
})*/

//fills in the fields in edit personnel modal
$(document).on("click", ".editPersonnelButton", (e) => {
	getPersonnelByID(parseInt(e.currentTarget.getAttribute("value")));
	//getPersonnel(parseInt(e.target.id))
});

$(document).on("click", ".editDepartmentButton", (e) => {
	getPersonnelAdvancedFind(
		"department",
		"id",
		parseInt(e.currentTarget.getAttribute("value"))
	);
});

$(document).on("click", ".editLocationButton", (e) => {
	getPersonnelAdvancedFind(
		"location",
		"id",
		parseInt(e.currentTarget.getAttribute("value"))
	);
});

$("#editPersonnel").submit((e) => {
	var firstName = $("#editPersonnelFirstName").val();
	var lastName = $("#editPersonnelLastName").val();
	var jobTitle = $("#editPersonnelJobTitle").val();
	var email = $("#editPersonnelEmail").val();
	var departmentID = parseInt($("#editPersonnelOptions").val());
	var id = parseInt($("#editPersonnelID").val());
	updatePersonnel(firstName, lastName, jobTitle, email, departmentID, id);
	e.preventDefault();
});

$("#editDepartment").submit((e) => {
	var name = $("#editDepartmentName").val();
	var locationID = parseInt($("#editDepartmentOptions").val());
	var id = parseInt($("#editDepartmentID").val());
	updateDepartment(name, locationID, id);
	e.preventDefault();
});

$("#editLocation").submit((e) => {
	var name = $("#editLocationName").val();
	var id = parseInt($("#editLocationID").val());
	updateLocation(name, id);
	e.preventDefault();
});

/////////////////////////// DELETE EVENTS ///////////////////////////////////////

//these work by passing the value attribute from the delete buttons to the confirm delete buttons

//delete department event
$(document).on("click", ".deleteDepartment", (e) => {
	checkDepartmentDeletion(parseInt(e.currentTarget.getAttribute("value")))
	$(".confirmDepartmentDeletionDelete").attr(
		"value",
		e.currentTarget.getAttribute("value")
	);
	$(document).on("click", ".confirmDepartmentDeletionDelete", (event) => {
		deleteDepartment(parseInt(event.currentTarget.getAttribute("value")));
	});
});

//delete personnel event
$(document).on("click", ".deletePersonnel", (e) => {
	$(".confirmPersonnelDeletionDelete").attr(
		"value",
		e.currentTarget.getAttribute("value")
	);
	$(document).on("click", ".confirmPersonnelDeletionDelete", (event) => {
		deletePersonnel(parseInt(event.currentTarget.getAttribute("value")));
	});
});

//delete location event
$(document).on("click", ".deleteLocation", (e) => {
	$(".confirmLocationDeletionDelete").attr(
		"value",
		e.currentTarget.getAttribute("value")
	);
	$(document).on("click", ".confirmLocationDeletionDelete", (event) => {
		deleteLocation(parseInt(event.currentTarget.getAttribute("value")));
	});
});

/////////////////////////// CREATE PERSONNEL EVENT ////////////////////////////////////////

//Populates departments dropdown when create personnel modal button is clicked
/*$(document).on("click", "#createPersonnelModalButton", (e) => {
	getDepartmentsPopulateDropdown();
});*/

//getDepartmentsPopulateDropdown();

//ajax call event listener when create department form is submitted
$("#createPersonnel").submit((e) => {
	var firstName = $("#createPersonnelFirstName").val();
	var lastName = $("#createPersonnelLastName").val();
	var jobTitle = $("#createPersonnelJobTitle").val();
	var email = $("#createPersonnelEmail").val();
	var departmentID = parseInt($("#createPersonnelOptions").val());
	insertPersonnel(firstName, lastName, jobTitle, email, departmentID);
	e.preventDefault();
});

///////////////////////////CREATE DEPARTMENT EVENT////////////////////////////////////////

//Populates locations dropdown when create department modal button is clicked
$(document).on("click", "#createDepartmentModalButton", (e) => {
	getLocationsPopulateDropdown();
});

//ajax call event listener when create department form is submitted
$("#createDepartment").submit((e) => {
	insertDepartment(
		$("#createDepartmentName").val(),
		parseInt($("#createDepartmentOptions").val())
	);
	e.preventDefault();
});

///////////////////////////CREATE LOCATION EVENT////////////////////////////////////////

//ajax call event listener when create Location form is submitted
$("#createLocation").submit((e) => {
	insertLocation($("#createLocationName").val());
	e.preventDefault();
});

///////////////////////// READ EVENTS /////////////////////////////////////

//Get personnel by id event listener
$("#getPersonnelByID").submit((e) => {
	getPersonnelByID($("#personnelIDValue").val());
	e.preventDefault();
});

//Get All Departments event listeners
$("#getPersonnel").click(getPersonnel);
$("#getDepartments").click(getDepartments);
$("#getLocations").click(getLocations);

//Get personnel in each department when department "View Personnel" button is clicked
$(document).on("click", ".viewDepartmentPersonnel", (e) => {
	getPersonnelAdvancedFind(
		"personnel",
		"departmentID",
		parseInt(e.currentTarget.getAttribute("value"))
	);
});

//Get departments in each location when department "View Departments" button is clicked
$(document).on("click", ".viewLocationDepartments", (e) => {
	getPersonnelAdvancedFind(
		"department",
		"locationID",
		parseInt(e.currentTarget.getAttribute("value"))
	);
});

//populates searchby field in advanced find
$("#searchPDL").change((e) => {
	$("#searchBy").empty();
	populateSearchCriteria($("#searchPDL").val());
	e.preventDefault();
});

//ajax call event listener when advanced find form is submitted
$("#advancedFind").submit((e) => {
	getPersonnelAdvancedFind(
		$("#searchPDL").val(),
		$("#searchBy").val(),
		$("#searchInput").val()
	);
	e.preventDefault();
});

///////////////////////////////////// GENERAL ///////////////////////////////////////////////

$(".advancedFindButton").click(() => {
	$("#searchPDL").val("default");
	$("#searchBy").val("default");
	$("#searchInput").val("");
});

$(".navbar-toggler").click(() => {
	$("#getAllCollapse").collapse("hide");
	$("#searchCollapse").collapse("hide");
	$("#createCollapse").collapse("hide");
	$("#searchBy").empty();
	$("#searchBy").append(
		'<option value="default" selected disabled>Search By</option>'
	);
	$("#searchPDL").val("default");
	$("#searchBy").val("default");
	$("#searchInput").val("");
});

window.onscroll = () => {
	scrollFunction();
};

const scrollFunction = () => {
	if ($(window).scrollTop() < 300) {
		$("#backToTopButton").hide();
	} else {
		$("#backToTopButton").show();
	}
};

$("#backToTopButton").click(() => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
});

$(document).ready(() => {
	$(".spinner-border").hide();
	getPersonnel();
});
