window.onload=window.onscroll=window.onresize=function(){
	var oBox=document.querySelector('.box');
	var aCon=document.querySelectorAll('.box_z');
	var oRet=document.querySelector('.return');
	var aBtn=document.querySelectorAll('.nav li');
	var aBtn_bg=document.querySelector('.nav .active');
	var oV=document.querySelector('.video');
	var bFlag=false;
	var iNow=0;
	btn();
	//翻页效果
	addWheel(document,function(down){
		if(bFlag)return;
		bFlag=true;
		if(down)
		{
			iNow++;
		}
		else
		{
			iNow--;
		}
		if(iNow<0)iNow=0;
		if(iNow>aCon.length-1)iNow=aCon.length-1;

		move(oBox,{top:-iNow*document.documentElement.clientHeight},
			{'complete':function(){
				bFlag=false;
		}});
		btn();
	});
	//返回顶部
	oRet.onclick=function(){
		iNow=0;
		move(oBox,{top:-iNow*document.documentElement.clientHeight});
		btn();
	};
	//nav按钮
	function btn(){
		startMove(aBtn_bg,aBtn[iNow].offsetLeft);
		for(var i=0;i<aBtn.length-1;i++)
		{	aBtn[i].dateIndex=i;
			aBtn[i].onmousemove=function(){
				startMove(aBtn_bg,this.offsetLeft);
			};
			aBtn[i].onmouseout=function(){
				startMove(aBtn_bg,iNow*aBtn[0].offsetWidth);
			};
			aBtn[i].onclick=function(){
				iNow=this.dateIndex;
				move(oBox,{top:-iNow*document.documentElement.clientHeight},
					{'complete':function(){
						bFlag=false;
				}});
			};
		}
		
	}


	//首屏背景
	var oC=document.querySelector('#c1');
	var gd=oC.getContext('2d');
	var winW=document.documentElement.clientWidth;
	var winH=document.documentElement.clientHeight-60;
	oC.width=winW;
	oC.height=winH;

	var N=10;
	var aPoint=[];

	var len=5;
	var oldArr=[];
	for(var i=0; i<N; i++)
	{
		aPoint[i]={
			x:rnd(0,winW),
			y:rnd(0,winH),
			speedX:rnd(-10,10),
			speedY:rnd(-10,10)
		}
	}
	//花点
	setInterval(function(){
		gd.clearRect(0,0,oC.width,oC.height);
		for(var i=0;i<aPoint.length;i++){
			drawPoint(aPoint[i]);
		}
		for(var i=0;i<aPoint.length;i++){
			if(aPoint[i].x<=0){
				aPoint[i].x=0;
				aPoint[i].speedX*=-1;
			}
			if(aPoint[i].x>=winW){
				aPoint[i].x=winW;
				aPoint[i].speedX*=-1;
			}
			if(aPoint[i].y>=winH){
				aPoint[i].y=winH;
				aPoint[i].speedY*=-1;
			}
			if(aPoint[i].y<=0){
				aPoint[i].y=0;
				aPoint[i].speedY*=-1;
			}
			aPoint[i].x+=aPoint[i].speedX;
			aPoint[i].y+=aPoint[i].speedY;
		}
		gd.beginPath();
		gd.strokeStyle='rgba(51,204,204,1)';
		gd.moveTo(aPoint[0].x,aPoint[0].y);
		for(var i=1; i<aPoint.length; i++){
			gd.lineTo(aPoint[i].x, aPoint[i].y);
		}
		gd.closePath();
		gd.stroke();
		//画尾巴
		var arr=[];
		for(var i=0;i<aPoint.length;i++)
		{
			arr[i]={
				x:aPoint[i].x,
				y:aPoint[i].y
			}
		}
		oldArr.push(arr);
		while(oldArr.length>len)
		{
			oldArr.shift();
		}
		gd.beginPath();
		for(var i=0;i<oldArr.length;i++){
			var opacity=1-i/oldArr.length;
			
			gd.moveTo(oldArr[i][0].x, oldArr[i][0].y);
			
			gd.strokeStyle='rgba(51,204,204,'+opacity+')';
			for(var j=0; j<oldArr[i].length; j++){
				gd.lineTo(oldArr[i][j].x,oldArr[i][j].y);
			}
			gd.closePath();
			gd.stroke();
		}
	},16);
	function drawPoint(p){
		var pW=1;
		var pH=1;
		gd.fillStyle='#fff';
		gd.fillRect(p.x-pW/2,p.y-pH/2,pW,pH);
	}



};
