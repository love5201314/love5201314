function addWheel(obj,fn){
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		obj.addEventListent('DOMMouseScroll',function(ev){
				var oEvent=ev||event;
				var down=oEvent.detail>0?true:false;
				fn(down);
		},false)
	}
	else
	{
		obj.onmousewheel=function(ev){
			var oEvent=ev||event;
			var down=oEvent.wheelDelta>0? false:true;
			fn(down); 
		};
	}
};
function ready(fn){
	if(document.addEventListener)
	{
		document.addEventListener('DOMContentLoaded',fn,false);
	}
	else
	{
		document.attrEvent('onreadystatechange',function(){
			if(document.readyState == 'complete'){
				fn();
			}
		});
	}
}
function rnd(a,b){
	return parseInt(Math.random()*(a-b)+b);
}
(function(global){
	var left=0;
	var iSpeed=0;
	var timer=null;
	global.startMove=function(obj,iTarget){
		clearInterval(timer);
		timer=setInterval(function(){
			iSpeed+=(iTarget-left)/5;	
			iSpeed*=0.7;
			
			left+=iSpeed;
			obj.style.left=Math.round(left)+'px';
			
			if(Math.round(iSpeed)==0 && Math.round(left)==iTarget){
				clearInterval(timer);
			}
			
		},30);	
	}
})(window);



