<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/getPersonnelByID.php?id=<id>

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	


	// first query - SQL statement accepts parameters and so is prepared to avoid SQL injection.
	// $_REQUEST used for development / debugging. Remember to change to $_POST for production

	if ($_REQUEST['searchFor'] == "personnel") {
		//$query = $conn->prepare('SELECT * from personnel WHERE ' . $_REQUEST['searchBy'] . ' = ?');
		$query = $conn->prepare('SELECT personnel.id, personnel.lastName, personnel.firstName, personnel.jobTitle, personnel.email, department.name as department, location.name as location from personnel  LEFT JOIN department ON personnel.departmentID = department.id LEFT JOIN location ON department.locationID = location.id WHERE personnel.' . $_REQUEST['searchBy'] . '= ?');


		$query->bind_param("s", $_REQUEST['term']);

		$query->execute();
	}
	
	if ($_REQUEST['searchFor'] == "department") {
		//$query = $conn->prepare('SELECT * from department WHERE ' . $_REQUEST['searchBy'] . ' = ?');
		//$query = $conn->prepare('SELECT department.id, department.name, department.locationID, COUNT(personnel.id) as personnel FROM department LEFT JOIN personnel ON personnel.departmentID = department.id WHERE department.' . $_REQUEST['searchBy'] . ' = ? GROUP BY department.id;');

		$query = $conn->prepare('SELECT department.id, department.name, department.locationID, COUNT(personnel.id) as personnel, location.name as location FROM department LEFT JOIN personnel ON personnel.departmentID = department.id LEFT JOIN location on department.locationID = location.id WHERE department.' . $_REQUEST['searchBy'] . ' = ?;');

		$query->bind_param("s", $_REQUEST['term']);

		$query->execute();
	} 

	if ($_REQUEST['searchFor'] == "location") {
		$query = $conn->prepare('SELECT location.id AS id, location.name AS name, COUNT(department.id) as department FROM location LEFT JOIN department ON department.locationID = location.id WHERE location.' . $_REQUEST['searchBy'] . ' = ?');

		$query->bind_param("s", $_REQUEST['term']);

		$query->execute();
	} 

	
	
	if (false === $query) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
    
	$result = $query->get_result();

	$personnel = [];
	
	$department = [];

	$location = [];

	if ($_REQUEST['searchFor'] == "personnel") {
		
		while ($row = mysqli_fetch_assoc($result)) {

			array_push($personnel, $row);
	
		}
	}

	if ($_REQUEST['searchFor'] == "department") {
		
		while ($row = mysqli_fetch_assoc($result)) {

			array_push($department, $row);
	
		}
	}

	if ($_REQUEST['searchFor'] == "location") {
		
		while ($row = mysqli_fetch_assoc($result)) {

			array_push($location, $row);
	
		}
	}

   	

	

	// second query - does not accept parameters and so is not prepared

	/*$query = 'SELECT id, name from department ORDER BY name';

	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
   	$department = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($department, $row);

	} */

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['personnel'] = $personnel;
	$output['data']['department'] = $department;
	$output['data']['location'] = $location;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>