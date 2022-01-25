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

	
	
    //$query = $conn->prepare('SELECT * from department WHERE ' . $_REQUEST['searchBy'] . ' = ?');
    $query = $conn->prepare('SELECT location.id, location.name, COUNT(department.id) as department FROM location LEFT JOIN department ON department.locationID = location.id WHERE location.id = ? GROUP BY location.id;');

    $query->bind_param("s", $_REQUEST['id']);

    $query->execute();
	
	
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

	
	$location = [];
    

		
    while ($row = mysqli_fetch_assoc($result)) {

        array_push($location, $row);

    }

    if ($location[0]["department"] === 0) {
        $query = $conn->prepare('DELETE FROM location WHERE id = ?');
	
		$query->bind_param("i", $_REQUEST['id']);

		$query->execute();

        $outcome = "location deleted";
		
		if (false === $query) {

			$output['status']['code'] = "400";
			$output['status']['name'] = "executed";
			$output['status']['description'] = "query failed";	
			$output['data'] = [];

			mysqli_close($conn);

			echo json_encode($output); 

			exit;

		}
    } else {
        $outcome = "deletion not possible";
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
	$output['data']['outcome'] = $outcome;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>