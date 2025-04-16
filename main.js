const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const currentAge = parseInt(document.getElementById("number1").value);
    const retirementAge = parseInt(document.getElementById("number2").value);
    const monthlyIncome = parseFloat(document.getElementById("number3").value);
    const monthlyContribution = parseFloat(document.getElementById("number4").value);
    const savingsComponentValue = parseFloat(document.getElementById("number5").value);
    const withdrawalAmount = parseFloat(document.getElementById("number6").value);

    if (
        isNaN(currentAge) || isNaN(retirementAge) || isNaN(monthlyIncome) ||
        isNaN(monthlyContribution) || isNaN(savingsComponentValue) || isNaN(withdrawalAmount) ||
        currentAge >= retirementAge || withdrawalAmount < 2500 || withdrawalAmount > savingsComponentValue
    ) {
        alert("Please check your input values.");
        return;
    }

    const yearsToRetirement = retirementAge - currentAge;
    const inflationRate = 0.06;
    const returnRate = 0.08;
    const estimatedTaxRate = (monthlyIncome > 25000 || withdrawalAmount > 10000) ? 0.35 : 0.26;

    const estimatedTax = withdrawalAmount * estimatedTaxRate;
    const netWithdrawal = withdrawalAmount - estimatedTax;

    // Future value before withdrawal
    let futureBefore = savingsComponentValue;
    for (let i = 0; i < yearsToRetirement; i++) {
        futureBefore = (futureBefore + (monthlyContribution * (1 / 3) * 12)) * (1 + returnRate);
    }

    // Future value after withdrawal
    let adjustedSavings = savingsComponentValue - withdrawalAmount;
    let futureAfter = adjustedSavings;
    for (let i = 0; i < yearsToRetirement; i++) {
        futureAfter = (futureAfter + (monthlyContribution * (1 / 3) * 12)) * (1 + inflationRate);
    }

    // Percentages
    const savingsAfterPercent = (adjustedSavings / savingsComponentValue) * 100;
    const futureAfterPercent = (futureAfter / futureBefore) * 100;

    // Results Display
    document.getElementById("resultsContainer").classList.remove("d-none");

    document.querySelector("#previewSection .col-md-6:nth-child(1) h2").textContent = `R ${estimatedTax.toFixed(2)}`;
    document.querySelector("#previewSection .col-md-6:nth-child(2) h2").textContent = `R ${netWithdrawal.toFixed(2)}`;

    // Before & After current savings
    document.querySelector("#previewSection .text1").innerHTML =  `Before withdrawal:`;
    document.querySelector("#previewSection .before-withdraw").textContent = `R ${savingsComponentValue.toFixed(2)}`;
    document.querySelector("#previewSection .text2").innerHTML = `After withdrawal:`;
    document.querySelector("#previewSection .after-withdraw").textContent = `R ${adjustedSavings.toFixed(2)}`;

    const savingsBars = document.querySelectorAll(".progress-bar");
    savingsBars[0].style.width = "100%";
    savingsBars[0].className = "progress-bar bg-success";
    savingsBars[1].style.width = `${Math.max(0, Math.min(savingsAfterPercent, 100))}%`;
    savingsBars[1].className = `progress-bar ${getProgressColor(savingsAfterPercent)}`;

    // Before & After future value
    document.querySelector("#previewSection .text3").innerHTML = `Before withdrawal:`;
    document.querySelector("#previewSection .before-future").textContent = `R ${futureBefore.toFixed(2)}`;
    document.querySelector("#previewSection .text4").innerHTML = `After withdrawal:`;
    document.querySelector("#previewSection .after-future").textContent = `R ${futureAfter.toFixed(2)}`;

    savingsBars[2].style.width = "100%";
    savingsBars[2].className = "progress-bar bg-success";
    savingsBars[3].style.width = `${Math.max(0, Math.min(futureAfterPercent, 100))}%`;
    savingsBars[3].className = `progress-bar ${getProgressColor(futureAfterPercent)}`;
});

function getProgressColor(percent) {
    if (percent >= 70) return "bg-success";
    if (percent >= 40) return "bg-warning";
    return "bg-danger";
}
