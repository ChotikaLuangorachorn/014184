<?php 
	$height = $_GET["height"];
	$weight = $_GET["weight"];
	$bmi = 0;
	$result = "";
	if ($height != 0) {
		$bmi = $weight / (($height/100) ** 2);
		if ($bmi < 18.5) {
			$result = "underweight";
		} elseif ($bmi >= 18.5 && $bmi <= 23.4) {
			$result = "normalweight";
		} elseif ($bmi >= 23.5 && $bmi <= 28.4) {
			$result = "overweight";
		} elseif ($bmi >= 28.5 && $bmi <= 34.9) {
			$result = "obesity level1";
		} elseif ($bmi >= 35.0 && $bmi <= 39.9) {
			$result = "obesity level2";
		} else {
			$result = "obesity level3";
		}
	}

	$data = array('bmi' => $bmi, 'result' => $result);
	echo json_encode($data);
?>