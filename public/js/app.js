//console.log("Client side JavaScript file is loaded")


const weatherForm = document.getElementById("myform")
const searchElem = document.getElementById("address")
const message1 = document.getElementById("message1")
const message2 = document.getElementById("message2")
weatherForm.addEventListener('submit' , (event) =>{
    event.preventDefault()
    const location = searchElem.value;
    message1.innerHTML="Loading...";
    message2.textContent='';
    fetch('/weather?address=' + encodeURIComponent(location)).then((response) =>{
    response.json().then((data)=>{
            if(data.error){
                message1.innerHTML=data.error;

            } else{
                message1.innerHTML = data.place_name;
            message2.textContent=data.weather;           }
    })
})

} )