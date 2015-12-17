window.onload=window.onscroll=window.onresize=function(){
	var oBox=document.querySelector('.box');
	var aCon=document.querySelectorAll('.box_z');
	var oRet=document.querySelector('.return');
	var aBtn=document.querySelectorAll('.nav li');
	var aBtn_bg=document.querySelector('.nav .active');
	var oV=document.querySelector('.video');
	var bFlag=false;
	var iNow=0;
	var atimer=null;
	//导航动画
	var oNav=document.querySelector('header');
	oNav.style.top=0;
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

		//导航栏变化
		if(iNow!=0)
		{
			oNav.style.paddingTop='10px';
			oNav.style.boxShadow='0 5px 5px #000';
		}
		else
		{
			oNav.style.paddingTop='20px';
			oNav.style.boxShadow='';
		}
		if(iNow==2)
		{
			//我的技能
			var oRound=document.querySelector('.round');
			oRound.style.transition='0.2s all linear';
			atimer=setInterval(function(){
				if(oRound.style.transform=='scale(1)')
				{
					oRound.style.transform='scale(1.1)';
				}
				else
				{
					oRound.style.transform='scale(1)';
				}
			},200);
		}
		else
		{
			clearInterval(atimer);
		}
		move(oBox,{top:-iNow*document.documentElement.clientHeight},
			{'complete':function(){
				bFlag=false;
		}});
		btn();
	});

	//nav按钮
	function btn(){
		if(iNow==0)
		{	
			oNav.style.paddingTop='20px';
			oNav.style.boxShadow='';
		}
		else
		{
			oNav.style.paddingTop='10px';
			oNav.style.boxShadow='0 5px 5px #000';
		}
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
				if(iNow==0)
				{	
					oNav.style.paddingTop='20px';
					oNav.style.boxShadow='';
				}
				else
				{
					oNav.style.paddingTop='10px';
					oNav.style.boxShadow='0 5px 5px #000';
				}
			};
		}
		
	}
	//弧线进度条时钟
	function d2a(n){
		return n*Math.PI/180;
	}
	function rnd(n,m){
		return parseInt(Math.random()*(m-n)+n);
	}
	var oC=document.getElementById('c1');	
	var gd=oC.getContext('2d');
	oC.width=600;
	oC.height=600;
	var cx=300,
		cy=300,
		r=150;
	function drawArc(start,end,color,r){
		color=color || '#000';
		r=r || 100;
		start-=90;
		end-=90;
		
		gd.beginPath();
		gd.strokeStyle=color;
		gd.lineWidth=10;
		gd.arc(cx,cy,r,d2a(start),d2a(end),false);
		gd.stroke();	
	}
	
	setInterval(function(){
		gd.clearRect(0,0,oC.width,oC.height);
		
		var oDate=new Date();
		var h=oDate.getHours();
		var m=oDate.getMinutes();
		var s=oDate.getSeconds();
		var ms=oDate.getMilliseconds();
		
		drawArc(0,s*6+ms/1000*6,'#807d84',r);
		drawArc(0,m*6+s/60*6,'#a0b4b2',r-10);
		drawArc(0,(h%12)*30+m/60*30,'#9c6f69',r-20);
	},16);
	//首屏文字
	var loog=document.querySelector('.the');
	var conBox=document.querySelector('.can_box');
	loog.style.marginTop=document.documentElement.clientHeight/4+'px';
	loog.style.left=0;
	loog.style.opacity=1;
	conBox.style.right=0;
	conBox.style.opacity=1;
	var ten1Img=document.querySelector('.img');
	ten1Img.style.bottom=0;

	//点击效果
	var oT3Btn1=document.querySelector('.btn1');
	var oT3Btn2=document.querySelector('.btn2');
	var oT3BallL=document.querySelector('.ball_l');
	var oT3BallR=document.querySelector('.ball_r');
	var oT3BallUl=document.querySelector('.ball_l ul');
	var oT3BallImg=document.querySelector('.ball_img');
	oT3Btn1.onclick=function(){
		oT3Btn1.style.display='none';
		oT3Btn2.style.display='block';
		oT3BallL.style.left=-400+'px';
		oT3BallL.style.opacity=1;
		oT3BallR.style.right=-400+'px';
		oT3BallR.style.opacity=1;
		oT3BallUl.style.display='block';
		oT3BallImg.style.display='block';
		setTimeout(function(){
			oT3BallL.style.top=-100+'px';
			oT3BallR.style.top=-100+'px';
		},1000);
		setTimeout(function(){
			oT3BallUl.style.opacity=1;
			oT3BallImg.style.opacity=1;
		},2000);
	};
	oT3Btn2.onclick=function(){
		setTimeout(function(){
			oT3Btn1.style.display='block';
			oT3Btn2.style.display='none';
			oT3BallL.style.left=0;
			oT3BallL.style.opacity=0;
			oT3BallR.style.right=0;
			oT3BallR.style.opacity=0;
			oT3BallUl.style.display='none';
			oT3BallImg.style.display='none';
		},2000);
		setTimeout(function(){
			oT3BallL.style.top=85+'px';
			oT3BallR.style.top=85+'px';
		},1000);
		oT3BallUl.style.opacity=0;
		oT3BallImg.style.opacity=0;
	};
	
	//我的作品
	var aLi=document.querySelectorAll('.con li');
	for (var i=0; i<aLi.length; i++)
	{
		enter(aLi[i]);
		leave(aLi[i]);
	}
	
	
	function enter(obj){
		var oSpan=obj.getElementsByTagName('span')[0];
		obj.onmouseenter=function (ev){
			var oEvent=ev || Event;
			var n=getN(obj, oEvent);
			switch (n)
			{
				case 0:
					oSpan.style.left='250px';
					oSpan.style.top=0;
					break;
					
				case 1:
					oSpan.style.left=0;
					oSpan.style.top='250px';
					break;
				
				case 2:
					oSpan.style.left='-250px';
					oSpan.style.top='0';
					break;
					
				case 3:
					oSpan.style.left='0';
					oSpan.style.top='-250px';
					break;
			}
			
			move(oSpan, {top:0, left:0});
		};
	};
	
	function leave(obj){
		var oSpan=obj.getElementsByTagName('span')[0];
		obj.onmouseleave=function (ev){
			var oEvent=ev || event;
			var n=getN(obj, oEvent);
			switch (n)
			{
				case 0:
					var left=250;
					var top=0;
					break;
					
				case 1:
					var left=0;
					var top=250;
					break;
				
				case 2:
					var left=-250;
					var top=0;
					break;
					
				case 3:
					var left=0;
					var top=-250;
					break;
			}
			
			move(oSpan, {top:top, left:left});
		};
	};
	
	function getN(obj, ev)
	{
		var x=obj.offsetLeft+obj.offsetWidth/2-ev.clientX;
		var y=obj.offsetTop+obj.offsetHeight/2-ev.clientY;
		
		return Math.round((dtoa(Math.atan2(y, x))+180)/90)%4;
	}

	function dtoa(d)
	{
		return d*180/Math.PI;
	}
	//我的作品
	var aUl=document.querySelectorAll('.con');
	var oTabBtnLeft=document.querySelector('.btn_left');
	var oTabBtnRight=document.querySelector('.btn_right');
	var a=0;
	oTabBtnLeft.onclick=function(){
		a--;
		if(a<0)
		{
			a=aUl.length-1;
		};
		for(var i=0;i<aUl.length;i++){
			aUl[i].style.display='none';
		}
		aUl[a].style.display='block';
	};
	oTabBtnRight.onclick=function(){
		a++;
		if(a>=aUl.length)
		{
			a=0;
		};
		for(var i=0;i<aUl.length;i++){
			aUl[i].style.display='none';
		}
		aUl[a].style.display='block';
	};
};
