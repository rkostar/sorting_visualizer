
var inp_as=document.getElementById('a_size'),array_size=inp_as.value;
var inp_gen=document.getElementById("a_generate");
var inp_aspeed=document.getElementById("a_speed");
//var array_speed=document.getElementById('a_speed').value;
var a= document.getElementById('myfrm');
var butts_algos=document.querySelectorAll(".dropdown-menu button");

var div_sizes=[];
var divs=[];
var margin_size;
var cont=document.getElementById("array_container");
cont.style="flex-direction:row";

//Array generation and updation.
a.addEventListener('submit', function(event){
    event.preventDefault();
    var values= document.getElementById('me').value;
    values+=' ';
    len=values.length;
    count=1;
    var str='';
    counter=0;
    const arr=[];
    for(var i=0;i<len;i++){
        if(values[i]!=' '){
            str+=values[i];
            counter=1;
        }
        else{
            if(counter==1){
                var val=parseInt(str);
                arr.push(val);
            }
            str='';
            counter++;
        }
    }
    // console.log(arr.length);
    
    window.onload=generete_given_array(arr);

    
})

inp_gen.addEventListener("click",generate_array);
inp_as.addEventListener("input",update_array_size);

function generete_given_array(arr){
    div_sizes=[];
    divs=[];
    margin_size=0;
    array_size=arr.length;
    cont.innerHTML="";
    for(var i=0;i<arr.length;i++)
    {
        div_sizes[i]=Math.floor(arr[i]) + 10;
        divs[i]=document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color:pink; width:" + (100/array_size-(2*margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }
}

function generate_array()
{
    cont.innerHTML="";

    for(var i=0;i<array_size;i++)
    {
        div_sizes[i]=Math.floor(Math.random() * 0.5*(inp_as.max - inp_as.min) ) + 10;
        divs[i]=document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color:pink; width:" + (100/array_size-(2*margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }
}

function update_array_size()
{   
    // console.log(array_size);
    array_size=inp_as.value;
    generate_array();
}

window.onload=update_array_size();

//Running the appropriate algorithm.
for(var i=0;i<butts_algos.length;i++)
{
    butts_algos[i].addEventListener("click",runalgo);
}

function disable_buttons()
{
    for(var i=0;i<butts_algos.length;i++)
    {
        butts_algos[i].classList=[];
        butts_algos[i].classList.add("butt_locked");

        butts_algos[i].disabled=true;
        inp_as.disabled=true;
        inp_gen.disabled=true;
        inp_aspeed.disabled=true;
    }
}

function runalgo()
{
    // disable_buttons();

    this.classList.add("butt_selected");
    switch(this.innerHTML)
    {
        case "Bubble":Bubble();
                        break;
        case "Selection":Selection_sort();
                        break;
        case "Insertion":Insertion();
                        break;
        case "Merge":Merge();
                        break;
        case "Quick":Quick();
                        break;
        case "Heap":Heap();
                        break;
    }
}
