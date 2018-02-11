<?php
	$ldl = $_GET["ldl"];
	$hdl = $_GET["hdl"];
	$triglycerides = $_GET["triglycerides"];

	//Total Cholesterol
	$total = $ldl + $hdl ($triglycerides / 5); 
	$result_total = "";
	if ($total < 200) {
		$result_total = "ideal";
	} elseif ($total <= 239) {
		$result_total = "elevated";
	} else {
		$result_total = "high";
	}

	//LDL
	$result_ldl = "";
	if ($ldl < 100) {
		$result_ldl = "ideal";
	} elseif ($ldl <= 129) {
		$result_ldl = "near optimal";
	} elseif ($ldl <= 159) {
		$result_ldl = "borderline";
	} elseif ($ldl <= 189) {
		$result_ldl = "high";
	} else {
		$result_ldl = "severely high";
	}

	//HDL
	$result_hdl = "";
	if ($hdl >= 60) {
		$result_hdl = "good";
	} elseif ($hdl > 40) {
		$result_hdl = "borderline";
	} else {
		$result_hdl = "high";
	}

	//Triglycerides
	$result_triglycerides = "";
	if ($triglycerides < 150) {
		$result_triglycerides = "ideal";
	} elseif ($triglycerides <= 199) {
		$result_triglycerides = "elevated";
	} elseif ($triglycerides < 499) {
		$result_triglycerides = "high";
	} else {
		$result_triglycerides = "extremely high";
	}

	$data = array('total' => $total,
		'ldl' => $result_ldl,
		'hdl' => $result_hdl,
		'triglycerides' => $result_triglycerides);
	echo json_encode($data);

?>