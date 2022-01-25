export const displayPersonnel = (data) => {
	$("#results").empty();
	$("#results").append(
		'<div class="d-flex justify-content-center"><h1>Personnel</h1></div>'
	);
	if (data.length === 0) {
		$("#results").append("<h3>No Results Found</h3>");
	} else {
		data.forEach((employee) => {
			$("#results").append(`
            
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${employee.lastName}, ${employee.firstName} </h5>
                <p class="card-text"><i class="fas fa-users"></i> ${employee.department}</p>
                <p class="card-text"><i class="fas fa-briefcase"></i> ${employee.jobTitle}</p>
                <p class="card-text"><i class="fas fa-globe-americas"></i> ${employee.location}</p>
                <p class="card-text"><i class="fas fa-envelope"></i> ${employee.email}</p>
                <a value="${employee.id}" class="btn btn-secondary deletePersonnel customButton" data-bs-dismiss="modal" data-bs-target="#confirmDeletePersonnelModal"><i class="fas fa-trash-alt"></i></a>
                <a value="${employee.id}" class=" btn btn-secondary editPersonnelButton customButton" data-bs-dismiss="modal" data-bs-target="#editPersonnelModal"><i class="fas fa-edit"></i></a>
                </div>
            </div>
            
            `);
		});
	}
};

export const displayDepartments = (data) => {
	$("#results").empty();
	$("#results").append(
		'<div class="d-flex justify-content-center"><h1>Departments</h1></div>'
	);
	if (data.length === 0) {
		$("#results").append("<h3>No Results Found</h3>");
	} else {
		data.forEach((department) => {
			$("#results").append(`
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${department.name}</h5>
                <p class="card-text">Location ID: ${department.locationID}</p>
                <p class="card-text">Personnel: ${department.personnel}</p>
                <a value="${department.id}" class="btn btn-secondary deleteDepartment customButton" data-bs-dismiss="modal" ><i class="fas fa-trash-alt"></i></a>
                <a value="${department.id}" class="btn btn-secondary viewDepartmentPersonnel customButton"><i class="fas fa-users"></i></a>
                <a value="${department.id}" class="btn btn-secondary editDepartmentButton customButton" data-bs-dismiss="modal" data-bs-target="#editDepartmentModal"><i class="fas fa-edit"></i></a>
                </div>
            </div>
            `);
		});
	}
};

export const displayLocations = (data) => {
	$("#results").empty();
	$("#results").append(
		'<div class="d-flex justify-content-center"><h1>Locations</h1></div>'
	);
	if (data.length === 0) {
		$("#results").append("<h3>No Results Found</h3>");
	} else {
		data.forEach((location) => {
			$("#results").append(`
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${location.name}</h5>
                <a value="${location.id}" class="btn btn-secondary deleteLocation customButton" data-bs-dismiss="modal" ><i class="fas fa-trash-alt"></i></a>
                <a value="${location.id}" class="btn btn-secondary viewLocationDepartments customButton"><i class="fas fa-sitemap"></i></a>
                <a value="${location.id}" class="btn btn-secondary editLocationButton customButton" data-bs-dismiss="modal" data-bs-target="#editLocationModal"><i class="fas fa-edit"></i></a>
                </div>
            </div>
            `);
		});
	}
};

export const populateSearchCriteria = (value) => {
	if (value === "personnel") {
		$("#searchBy").append(`
        <option value=id>ID</option>
        <option value=firstName>First Name</option>
        <option value=lastName>Last Name</option>
        <option value=jobTitle>Job Title</option>
        <option value=email>Email</option>
        <option value=departmentID>Department ID</option>
        `);
	} else if (value === "department") {
		$("#searchBy").append(`
        <option value=id>ID</option>
        <option value=name>Name</option>
        `);
	} else if (value === "location") {
		$("#searchBy").append(`
        <option value=id>ID</option>
        <option value=name>Name</option>
        `);
	}
};

export const createDepartmentDropdown = (data) => {
    if (data) {
        $("#createDepartmentName").val("");
	$("#createDepartmentOptions").empty();
	$("#editDepartmentOptions").empty();
	data.forEach((location) => {
		$("#createDepartmentOptions").append(`
    <option value=${location.id}>${location.name}</option>
    `);
	});
	data.forEach((location) => {
		$("#editDepartmentOptions").append(`
    <option value=${location.id}>${location.name}</option>
    `);
	});
    }
	
};

export const createPersonnelDropdown = (data) => {
	if (data) {
		$("#createPersonnelOptions").empty();
		$("#editPersonnelOptions").empty();
		data.forEach((department) => {
			$("#createPersonnelOptions").append(`
    <option value=${department.id}>${department.name}</option>
    `);
			$("#editPersonnelOptions").append(`
    <option value=${department.id}>${department.name}</option>
    `);
		});
	}
};

export const updateEditPersonnelFields = (id, data) => {
	$("#editPersonnelID").val(id);
	$("#editPersonnelFirstName").val(data[0].firstName);
	$("#editPersonnelLastName").val(data[0].lastName);
	$("#editPersonnelJobTitle").val(data[0].jobTitle);
	$("#editPersonnelEmail").val(data[0].email);
	$("#editPersonnelOptions").val(data[0].departmentID);
};

export const updateEditDepartmentFields = (id, data) => {
	
	$("#editDepartmentID").val(id);
	$("#editDepartmentName").val(data[0].name);
	$("#editDepartmentOptions").val(data[0].locationID);
};

export const updateEditLocationFields = (id, data) => {
	
	$("#editLocationID").val(id);
	$("#editLocationName").val(data[0].name);
};

export const deletionProhibited = (name, type) => {
    $(".deletionProhibited").empty()
    if (type === "department") {
        $(".deletionProhibited").append(`Cannot delete ${name} as this department has employees associated with it. Please remove employees before deleting department.`)
    }
    if (type === "location") {
        $(".deletionProhibited").append(`Cannot delete ${name} as this location has departments associated with it. Please remove departments before deleting department.`)
    }
    $("#deletionUnsuccessfulModal").modal("show")
    
}

export const departmentDeletionConfirmation = (name) => {
    $(".confirmDepartmentDeletionText").empty()
    $(".confirmDepartmentDeletionText").append(`Are you sure you want to delete ${name}?`)
    $("#confirmDeleteDepartmentModal").modal("show")
    $(".deletionSuccessfulText").empty()
    $(".deletionSuccessfulText").append(`Record deleted: ${name}`)
}

export const locationDeletionConfirmation = (name) => {
    $(".confirmLocationDeletionText").empty()
    $(".confirmLocationDeletionText").append(`Are you sure you want to delete ${name}?`)
    $("#confirmDeleteLocationModal").modal("show")
    $(".deletionSuccessfulText").empty()
    $(".deletionSuccessfulText").append(`Record deleted: ${name}`)
}
