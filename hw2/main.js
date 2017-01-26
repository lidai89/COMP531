var slideIndex = 0;
var timeout=new Array(1,2,3,4,5);
carousel("1","mySlides1");
// t=setInterval(carousel, Math.floor((Math.random() * 5000) + 1));
function carousel(part,name) {
    var i;
    var element1=document.getElementById(part);
    //var num=element1.id;
    var x = element1.getElementsByClassName(name);
    //var x = document.getElementsById("img1");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1} 
    x[slideIndex-1].style.display = "block"; 
    var time_out="timeout"+part;
     timeout[part]=setTimeout(carousel, Math.floor((Math.random() * 5000) + 1000),part,"mySlides1"); // Change image every random seconds
    }

    function process_btn(btn){
        var part=btn.name;
        if(btn.value=='stop')
        {btn.value='resume';

        clearTimeout(timeout[part]);
       
        }
        else{
            btn.value='stop';
            timeout[part]=setTimeout(carousel, Math.floor((Math.random() * 5000) + 1),part,"mySlides1" );
        }
    }