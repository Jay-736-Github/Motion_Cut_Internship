const prices = {
    USD: { 
        monthly: [10, 20, 50], 
        quarterly: [27, 54, 135], 
        halfYearly: [51, 102, 255], 
        yearly: [96, 192, 480]
    },
    EUR: { 
        monthly: [9, 18, 45], 
        quarterly: [24.3, 48.6, 121.5], 
        halfYearly: [45.9, 91.8, 229.5], 
        yearly: [86.4, 172.8, 432]
    },
    GBP: { 
        monthly: [8, 16, 40], 
        quarterly: [21.6, 43.2, 108], 
        halfYearly: [40.8, 81.6, 204], 
        yearly: [76.8, 153.6, 384]
    },
    INR: { 
        monthly: [750, 1500, 3750], 
        quarterly: [2025, 4050, 10125], 
        halfYearly: [3825, 7650, 19125], 
        yearly: [7200, 14400, 36000]
    }
};

const savings = {
    quarterly: [10, 10, 10],
    halfYearly: [15, 15, 15],
    yearly: [20, 20, 20]
};

const basicPriceElement = document.getElementById('basic-price');
const proPriceElement = document.getElementById('pro-price');
const enterprisePriceElement = document.getElementById('enterprise-price');

const basicSavingsElement = document.getElementById('basic-savings');
const proSavingsElement = document.getElementById('pro-savings');
const enterpriseSavingsElement = document.getElementById('enterprise-savings');

function updatePrices(currency, period) {
    const price = prices[currency][period];
    let periodText = period === 'monthly' ? 'month' : period === 'quarterly' ? '3 months' : period === 'halfYearly' ? '6 months' : 'year';
    let periodName = period === 'halfYearly' ? 'Half-Yearly' : period.charAt(0).toUpperCase() + period.slice(1);

    basicPriceElement.innerHTML = `${getCurrencySymbol(currency)}${price[0]}<span>/${periodText}</span>`;
    proPriceElement.innerHTML = `${getCurrencySymbol(currency)}${price[1]}<span>/${periodText}</span>`;
    enterprisePriceElement.innerHTML = `${getCurrencySymbol(currency)}${price[2]}<span>/${periodText}</span>`;

    if (period !== 'monthly') {
        basicSavingsElement.innerHTML = `Save ${savings[period][0]}% with ${periodName} plan!`;
        proSavingsElement.innerHTML = `Save ${savings[period][1]}% with ${periodName} plan!`;
        enterpriseSavingsElement.innerHTML = `Save ${savings[period][2]}% with ${periodName} plan!`;
    } else {
        basicSavingsElement.innerHTML = '';
        proSavingsElement.innerHTML = '';
        enterpriseSavingsElement.innerHTML = '';
    }
}

function getCurrencySymbol(currency) {
    switch (currency) {
        case 'USD': return '$';
        case 'EUR': return '€';
        case 'GBP': return '£';
        case 'INR': return '₹';
    }
}

function changeCurrency() {
    const currency = document.getElementById('currency').value;
    const period = document.querySelector('input[name="billing"]:checked').value;
    updatePrices(currency, period);
}

function changeBillingPeriod() {
    const period = document.querySelector('input[name="billing"]:checked').value;
    const currency = document.getElementById('currency').value;
    updatePrices(currency, period);
}

function selectPlan(plan) {
    const selectedPlan = document.querySelector('.pricing-card.selected');
    if (selectedPlan) {
        selectedPlan.classList.remove('selected');
    }
    const newSelectedPlan = document.querySelector(`.pricing-card.${plan}`);
    newSelectedPlan.classList.add('selected');
}

document.addEventListener('DOMContentLoaded', () => {
    changeCurrency();
});
