<?php
	$gender = $_GET["gender"];
	$height = $_GET["height"];
	$weight = $_GET["weight"];
	$age = $_GET["age"];
	$activity = $_GET["activity"];

	$bmr = 0;
	if ($gender == "female") {
		$bmr =  665 + (9.6 * $weight) + (1.8 * $height) - (4.7 * $age);
	} else{
		$bmr =  66 + (13.7 * $weight) + (5 * $height) - (6.8 * $age);
	}

	$tdee = 0; //Total Daily Energy Expenditure
	if ($activity == 1) { //ไม่ได้ออกกำลังกายเลย
		$tdee = $bmr * 1.2;
	} elseif ($activity == 2) { // 1-3
		$tdee = $bmr * 1.375;
	} elseif ($activity == 3) { // 3-5
		$tdee = $bmr * 1.55;
	} elseif ($activity == 4) { // 6-7
		$tdee = $bmr * 1.725;
	} else { // everyday
		$tdee = $bmr * 1.9;
	}

	$data = array('bmr' => $bmr, 'tdee' => $tdee);
	echo json_encode($data);
?>