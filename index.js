const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const select = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromcur = document.querySelector(".from1");
const tocur = document.querySelector(".to1");



window.addEventListener("load" , ()=>
{
    change();
})

for(let s1 of select)
{
    for(opt in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = opt;
        newOption.value = opt;
        if(s1.name === "from" && opt === "USD")
        {
            newOption.selected = "selected";
        }
        else if(s1.name === "to" && opt ==="INR"){
            newOption.selected = "selected";
        }
        s1.append(newOption);

    }
    s1.addEventListener("change" , (e)=>
    {
        updateflag(e.target);
    } )
}

const updateflag = (element)=>
{
      let curcode = element.value;
      let countrycode = countryList[curcode];
      let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
      let img = element.parentElement.querySelector(".img1 img");
      img.src = newsrc; 
}

btn.addEventListener("click" , async (e)=>
{
    e.preventDefault();
    change();
    
})

const change = async() =>
{
    let amount = document.querySelector("input");
    let amtval = amount.value
    console.log(amtval);
    if(amtval === "" || amtval < 1)
    {
        amtval = 1;
        amount.value = "1";
    }
     console.log(fromcur.value,tocur.value);
    const URL = `${BASE_URL}/${fromcur.value.toLowerCase()}/${tocur.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate  = data[tocur.value.toLowerCase()];
    console.log(data);
    let para = document.querySelector('p');
    para.innerHTML = `${amount.value} ${fromcur.value} = ${amount.value * rate} ${tocur.value} `;
}

