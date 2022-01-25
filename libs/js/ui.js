export const displayPersonnel = (data) => {
    
    $('#results').empty()
    $("#results").append("<div class=\"d-flex justify-content-center\"><h1>Personnel</h1></div>")
    if (data.length === 0) {
        $('#results').append("<h3>No Results Found</h3>")
    } else {
        data.forEach((employee) => {
            $('#results').append(`
            
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${employee.firstName} ${employee.lastName}</h5>
                <p class="card-text"><i class="fas fa-users"></i> ${employee.department}</p>
                <p class="card-text"><i class="fas fa-briefcase"></i> ${employee.jobTitle}</p>
                <p class="card-text"><i class="fas fa-globe-americas"></i> ${employee.location}</p>
                <p class="card-text"><i class="fas fa-envelope"></i> ${employee.email}</p>
                <a value="${employee.id}" class="btn btn-danger deletePersonnel" data-bs-toggle="modal" data-bs-target="#confirmDeletePersonnelModal">Delete</a>
                <a value="${employee.id}" class="editPersonnelButton btn btn-primary" data-bs-toggle="modal" data-bs-target="#editPersonnelModal">Edit</a>
                </div>
            </div>
            
            `)
        })
    }
} 

export const displayDepartments = (data) => {
    
    $('#results').empty()
    $("#results").append("<div class=\"d-flex justify-content-center\"><h1>Departments</h1></div>")
    if (data.length === 0) {
        $('#results').append("<h3>No Results Found</h3>")
    } else {
        data.forEach((department) => {
            $('#results').append(`
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${department.name}</h5>
                <p class="card-text">Location ID: ${department.locationID}</p>
                <p class="card-text">Personnel: ${department.personnel}</p>
                <a value="${department.id}" class="btn btn-danger deleteDepartment" data-bs-toggle="modal" data-bs-target="#confirmDeleteDepartmentModal">Delete</a>
                <a value="${department.id}" class="viewDepartmentPersonnel btn btn-warning">View personnel</a>
                </div>
            </div>
            `)
        })
    }
} 

export const displayLocations = (data) => {
    
    $('#results').empty()
    $("#results").append("<div class=\"d-flex justify-content-center\"><h1>Locations</h1></div>")
    if (data.length === 0) {
        $('#results').append("<h3>No Results Found</h3>")
    } else {
        data.forEach((location) => {
            $('#results').append(`
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${location.name}</h5>
                <a value="${location.id}" class="btn btn-danger deleteLocation" data-bs-toggle="modal" data-bs-target="#confirmDeleteLocationModal">Delete</a>
                <a value="${location.id}" class="viewLocationDepartments btn btn-warning">View Departments</a>
                </div>
            </div>
            `)
        })
    }
    
} 

export const populateSearchCriteria = (value) => {
    if (value === "personnel") {
        $("#searchBy").append(`
        <option value=id>ID</option>
        <option value=firstName>First Name</option>
        <option value=lastName>Last Name</option>
        <option value=jobTitle>Job Title</option>
        <option value=email>Email</option>
        <option value=departmentID>Department ID</option>
        `)
    } else if (value === "department") {
        $("#searchBy").append(`
        <option value=id>ID</option>
        <option value=name>Name</option>
        `)
    } else if (value ==="location") {
        $("#searchBy").append(`
        <option value=id>ID</option>
        <option value=name>Name</option>
        `)
    }
}

export const createDepartmentDropdown = (data) => {
    $("#createDepartmentOptions").empty()
    data.forEach((location) => {
        $("#createDepartmentOptions").append(`
    <option value=${location.id}>${location.name}</option>
    `)
    })
}

export const createPersonnelDropdown = (data) => {
   
    $("#createPersonnelOptions").empty()
    $("#editPersonnelOptions").empty()
    data.forEach((department) => {
        $("#createPersonnelOptions").append(`
    <option value=${department.id}>${department.name}</option>
    `)
        $("#editPersonnelOptions").append(`
    <option value=${department.id}>${department.name}</option>
    `)
    })
   
}



export const updateEditPersonnelFields = (id, data) => {
    console.log(data)
    $("#editPersonnelID").val(id)
    $("#editPersonnelFirstName").val(data[0].firstName)
    $("#editPersonnelLastName").val(data[0].lastName)
    $("#editPersonnelJobTitle").val(data[0].jobTitle)
    $("#editPersonnelEmail").val(data[0].email)
    $("#editPersonnelOptions").append(`
    <option value=${data[0].departmentID}>${data[0].department}</option>
    `)
    $("#editPersonnelOptions").val(data[0].departmentID)
}