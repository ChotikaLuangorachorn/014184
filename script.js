$(document).ready(function() {
	$("#bmi-form").hide();
	$("#bmi-result").hide();

	$("#bmr-form").hide();
	$("#bmr-result").hide();

	$("#cholesterol-form").hide();
	$("#cholesterol-result").hide();

	$("#menu").change(function(event){
		if (this.value == "bmi") {
			$("#bmi-form").show();
			$("#bmi-result").hide();

			$("#bmr-form").hide();
			$("#bmr-result").hide();

			$("#cholesterol-form").hide();
			$("#cholesterol-result").hide();
		} else if (this.value == "bmr"){
			$("#bmi-form").hide();
			$("#bmi-result").hide();

			$("#bmr-form").show();
			$("#bmr-result").hide();

			$("#cholesterol-form").hide();
			$("#cholesterol-result").hide();
		} else if (this.value == "cholesterol"){
			$("#bmi-form").hide();
			$("#bmi-result").hide();

			$("#bmr-form").hide();
			$("#bmr-result").hide();

			$("#cholesterol-form").show();
			$("#cholesterol-result").hide();
		} else {
			$("#bmi-form").hide();
			$("#bmi-result").hide();

			$("#bmr-form").hide();
			$("#bmr-result").hide();

			$("#cholesterol-form").hide();
			$("#cholesterol-result").hide();
		}
	});

	$("#btn-cal-bmi").click(function() {
		let height = $("#bmi-height").val();
		let weight = $("#bmi-weight").val();
		let data = {
			height : height,
			weight : weight
		};
		console.log(data);
		$.ajax({
			url: "bmi.php",
			dataType: "json",
			type : "GET",
			data: data,
			success : function(response){
				$("#bmi-result").show();
				$("#bmi").text(response.bmi.toFixed(2));

				if (response.result == "underweight") {
					$("#level-bmi").text("น้ำหนักน้อยเกินไป");
					$("#description").text("ซึ่งอาจจะเกิดจากนักกีฬาที่ออกกำลังกายมาก และได้รับสารอาหารไม่เพียงพอ วิธีแก้ไขต้องรับประทานอาหารที่มีคุณภาพ และมีปริมาณพลังงานเพียงพอ และออกกำลังกายอย่างเหมาะสม");
				} else if (response.result == "normalweight") {
					$("#level-bmi").text("น้ำหนักปกติ");
					$("#description").text("และมีปริมาณไขมันอยู่ในเกณฑ์ปกติ มักจะไม่ค่อยมีโรคร้าย อุบัติการณ์ของโรคเบาหวาน ความดันโลหิตสูงต่ำกว่าผู้ที่อ้วนกว่านี้");
				} else if (response.result == "overweight") {
					$("#level-bmi").text("น้ำหนักเกิน");
					$("#description").text("หากคุณมีกรรมพันธ์เป็นโรคเบาหวานหรือไขมันในเลือดสูงต้องพยายามลดน้ำหนักให้ดัชนีมวลกายต่ำกว่า 23");
				} else if (response.result == "obesity level1") {
					$("#level-bmi").text("โรคอ้วนระดับ1");
					$("#description").text("และหากคุณมีเส้นรอบเอวมากกว่า 90 ซม.(ชาย) 80 ซม.(หญิง) คุณจะมีโอกาสเกิดโรคความดัน เบาหวานสูง จำเป็นต้องควบคุมอาหาร และออกกำลังกาย");
				} else if (response.result == "obesity level2") {
					$("#level-bmi").text("โรคอ้วนระดับ2");
					$("#description").text("คุณเสี่ยงต่อการเกิดโรคที่มากับความอ้วน หากคุณมีเส้นรอบเอวมากกว่าเกณฑ์ปกติคุณจะเสี่ยงต่อการเกิดโรคสูง คุณต้องควบคุมอาหาร และออกกำลังกายอย่างจริงจัง");
				} else if (response.result == "obesity level3"){
					$("#level-bmi").text("โรคอ้วนขั้นสูงสุด");
					$("#description").text("");
				} else{
					$("#level-bmi").text("");
					$("#description").text("");
				} 
			}
		});
		
	});

	$("#btn-cal-bmr").click(function() {
		let gender;
		let height = $("#bmr-height").val();
		let weight = $("#bmr-weight").val();
		let age = $("#bmr-age").val();
		let activity = $("#activity").val();

		if ($("#radio-male:checked").val()) {
			gender = "male";
		} else {
			gender = "female";
		}
		let data = {
			gender : gender,
			height : height,
			weight : weight,
			age : age,
			activity : activity,
		};
		console.log(data);
		$("#bmr-result").show();
		$.ajax({
			url: "bmr.php",
			dataType: "json",
			type : "GET",
			data: data,
			success : function(response){
				console.log(response.bmr, response.tdee);
				$("#bmr").text(response.bmr.toFixed(2));
				$("#tdee").text(response.tdee.toFixed(2));
			}
		});
		
	});

	$("#btn-cal-cholesterol").click(function() {
		let ldl = $("#ldl").val();
		let hdl = $("#hdl").val();
		let triglycerides = $("#triglycerides").val();

		let data = {
			ldl : ldl,
			hdl : hdl,
			triglycerides : triglycerides,
		};
		console.log(data);

		
		$.ajax({
			url: "cholesterol.php",
			dataType: "json",
			type : "GET",
			data: data,
			success : function(response){
				$("#cholesterol-result").show();
				console.log(response.total, response.ldl, response.hdl, response.triglycerides);
				// LDL
				if (response.ldl == "ideal") {
					$("#level-ldl").text("ดีมาก (ไขมันแอลดีแอลต่ำ)");
				} else if (response.ldl == "near optimal") {
					$("#level-ldl").text("ดี (ไขมันแอลดีแอลสูงเล็กน้อย)");
				} else if (response.ldl == "borderline") {
					$("#level-ldl").text("พอใช้ (ไขมันแอลดีแอลค่อนข้างสูง)");
				} else if (response.ldl == "high") {
					$("#level-ldl").text("ไม่ดี (ไขมันแอลดีแอลสูง)");
				} else {
					$("#level-ldl").text("ไม่ดีมาก (ไขมันแอลดีแอลสูงมาก)");
				}
				// HDL
				if (response.hdl == "good") {
					$("#level-hdl").text("ดีมาก");
				} else if (response.hdl == "borderline") {
					$("#level-hdl").text("ค่อนข้างเสี่ยงที่จะเป็นโรคหัวใจ");
				} else {
					$("#level-hdl").text("มีความเสี่ยงสูงที่จะเป็นโรคหัวใจ");
				}
				//Triglycerides
				if (response.triglycerides == "ideal") {
					$("#level-triglycerides").text("ดีมาก");
				} else if (response.triglycerides ="elevated") {
					$("#level-triglycerides").text("สูงเล็กน้อย");
				} else if (response.triglycerides == "high") {
					$("#level-triglycerides").text("สูง");
				} else {
					$("#level-triglycerides").text("สูงมาก");
				}
				//Total Cholesterol
				if (response.total == "ideal") {
					$("#level-cholesterol").text("ดีมาก");
				} else if (response.total == "elevated") {
					$("#level-cholesterol").text("ค่อนข้างสูง");
				} else {
					$("#level-cholesterol").text("สูง");
				}
			}
		});
		
	});
});