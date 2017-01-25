    //var pos=document.getElementById("btn").style.top;
    var btn_status=0;
    var shift_hold=0;
    var btn=document.getElementById("btn");
    var text_area=document.getElementById("con");
    document.getElementById("con").style.display="none";
    btn.addEventListener("mouseover",flip);
    btn.addEventListener("click",wait_confirm);
    document.addEventListener("keydown",shift_key);
    document.addEventListener("keyup",shift_key_up);
    function flip(){
      
       //alert("hello world");
       var btn=document.getElementById("btn");
       var pos_top=parseInt(window.getComputedStyle(btn,null).top);
       var pos_right=parseInt(window.getComputedStyle(btn,null).right);
       pos_top+=Math.random()*200-100;
       pos_right+=Math.random()*200-100;
       if(shift_hold==0&&btn_status==0){
       document.getElementById("btn").style.top=pos_top+"px";
       document.getElementById("btn").style.right=pos_right+"px";
			 }
    };
		
		function wait_confirm(){
			if(btn_status==0){
				btn_status=1;
				document.getElementById("btn").value="Play Again";
				
				document.getElementById("con").style.display="block";
			}
			else{
				btn_status=0;
				document.getElementById("btn").value="click me!";
				document.getElementById("con").style.display="none";
			}
		};
		function shift_key(e){
			if(e.shiftKey)shift_hold=1;
			//alert("key down!")
		};
		function shift_key_up(e){
			if(!e.shiftKey)shift_hold=0;
		};