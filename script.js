const baseurl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
let s=document.querySelectorAll(".selectcurrency select");

let btn=document.querySelector(".getrate");
let amountentered=document.querySelector("#amount");
let message=document.querySelector(".msg");



for(select of s){
    for(let codes in countryList){

    let newoption=document.createElement("option");

    newoption.innerHTML=codes;
   

    select.append(newoption);

    if(select.name==="from" && codes==="USD"){
        newoption.selected=true;
    }
    else if(select.name==="to" && codes==="INR"){
        newoption.selected=true;
    }
}
select.addEventListener("change",(evt)=>{
updateFlag(evt.target);
});
}



function updateFlag(element){
    let code=element.value;//code=usd
    let countrycode=countryList[code];//countrycode=us
    let newsrc=`https://flagsapi.com/${countrycode}/shiny/64.png`;
    let image=element.parentElement.querySelector("img");
    image.src=newsrc;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=amountentered.value;
    if(amount==="" || amount<=0){
        amount=1;
        amountentered.value=1;
    }
    let from=document.querySelector(".from select");
    let fromcurrency=from.value.toLowerCase();
    let to=document.querySelector(".to select");
    let tocurrency=to.value.toLowerCase();
    
    let response=await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurrency}.json`);
    let data=await response.json();
    let rate=data[fromcurrency][tocurrency]
    
    let finalamount=amount*rate;
    message.innerText=`${amount} ${fromcurrency} = ${finalamount} ${tocurrency}`    
})




