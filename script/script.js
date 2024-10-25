
let dropdown = document.querySelectorAll('.currency select');
let btn = document.querySelector('button');
let baseUrl = `https://v6.exchangerate-api.com/v6/b8cb08fe9d30b69a79c5a1ac/latest`;
let fromValue = document.querySelector('.from select');
let toValue = document.querySelector('.to select');
let exchangeValue = document.querySelector('h4');


for (select of dropdown) {
    for (currencyCode in countryList) {
        let option = document.createElement("option");
        option.innerText = currencyCode;
        option.value = currencyCode;
        if (select.name === 'to' && currencyCode === 'USD')
            option.selected = 'selected'
        select.appendChild(option);
        if (select.name === 'from' && currencyCode === 'INR')
            option.selected = 'selected'
        select.appendChild(option);
        select.addEventListener('change', (event) => {
            updateFlag(event);
        });
    }
}

const updateFlag = (event) => {
    let code = event.target.value;
    country = countryList[code]
    let img = event.target.parentElement.querySelector('img');
    img.src = `https://flagsapi.com/${country}/shiny/64.png`
}

const getval = () => {
    let amount = document.querySelector('input');
    let amtVal = amount.value;
    if (amtVal <= 1 || amtVal === "") {
        amtVal = 1;
        amount.value = 1;
    }
    console.log(amtVal);
    console.log(fromValue.value, toValue.value);
    axios.get(`${baseUrl}/${fromValue.value}`)
        .then((responce) => {
            console.log(responce);
            let amt = responce.data.conversion_rates[toValue.value];
            let finalValaue = amt * amtVal;
            exchangeValue.innerHTML = `${amtVal} ${fromValue.value} = ${finalValaue} ${toValue.value}`
            console.log(finalValaue)
        })
        .catch((error) => {
            console.log(error)
        })
}



btn.addEventListener('click',  (event) => {
    event.preventDefault();
    if(event.key === 'Enter')
      getval();
    else
        getval();
})
window.addEventListener('load', getval);

