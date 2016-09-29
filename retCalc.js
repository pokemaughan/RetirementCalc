function Start(){
	console.log("here");

			window.location.href = "form.html";
}


$(document).ready(function(){
	$("button").click(function(){
		// get the years. 
		var years = $("#years").val(); 
		console.log ("years = "+years); 
		$("[id=years2retire").text(years); 
		// get the roi 
		var roi = $("#return").val(); 
		// get the inflation rate. 
		var inflation = $("#inflation").val(); 
		// calculate effective rate. 
		var rate = roi-inflation; 
		console.log ("effective growth rate = "+rate); 
		$("[id=growthrate]").text(rate+"%"); 
		// future value of one dollar. 
		var futureOneDollar = 1 * Math.pow(1+(rate/100),years); 
		$("[id=savedgrowthrate]").text("$"+futureOneDollar.toFixed(2)); 
		// future value of saving one dollar every month. 
		var cashFlow = 1; 
		var interestRate = (rate/100)/12; 
		var numPayments = years*12; 
		// see http://www.investopedia.com/articles/03/101503.asp
		var futureSavingADollar = 
				cashFlow * 
				((Math.pow(1+interestRate,numPayments)-1)/interestRate)
		$("[id=monthlySavingGrowthRate]").text("$"+futureSavingADollar.toFixed(2)); 
		
		// future values. 
		var currentsavings = $("#savedNow").val(); 
		var fvCurrentSavings = currentsavings * futureOneDollar; 
		$("[id=futureValueSaved").text("$"+fvCurrentSavings.toFixed(2)); 
		var monthlyDeposit = $("#monthlySavings").val();
		var fvMonthlyDeposit = monthlyDeposit * futureSavingADollar; 
		$("[id=futureValueMonthlyContribs]").text("$"+fvMonthlyDeposit.toFixed(2)); 
		var totalSaved = fvMonthlyDeposit + fvCurrentSavings; 
		$("[id=futureValueEverything").text("$"+totalSaved.toFixed(2)); 
		
		// monthly values. 
		var monthlyWithdraw = totalSaved / 300; 
		$("[id=monthlyFromSavings").text("$"+monthlyWithdraw.toFixed(2)); 
		var socialsecurity = Number($("#socialsec").val()); 
		var monthlytotal = monthlyWithdraw + socialsecurity;
		console.log ("social sec "+socialsecurity.toFixed(2)); 
		console.log ("monthly total: "+monthlytotal); 				
		$("[id=monthlyTotal").text("$"+monthlytotal.toFixed(2)); 
		
		//reality check. 
		var grossIncome = $("#monthlyIncome").val(); 
		var monthlyExpensesRetirement = grossIncome - monthlyDeposit; 
		$("[id=monthlyExpenses]").text ("$"+monthlyExpensesRetirement.toFixed(2)); 
		var difference = monthlytotal - monthlyExpensesRetirement; 
		$("[id=differenceField]").text("$"+difference.toFixed(2)); 
		
	});
});