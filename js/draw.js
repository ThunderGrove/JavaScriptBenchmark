var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
var animator;
var frame=0;
var boxAlw=160;var boxArw=320;
var boxAth=160;var boxAbh=320;

function circleEle(rgb,x,y,r){
	ctx.fillStyle=rgb;
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
}

function circleElePlus(rgb,x,y,r,rotate,rotateX,rotateY){
	ctx.fillStyle=rgb;
	ctx.beginPath();
	//ctx.setTransform(1,0,0,1,rotateX,rotateY);
	//ctx.translate(rotateX,rotateY);
	ctx.rotate(rotate);
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
	ctx.setTransform(1,0,0,1,0,0); // reset to default transform
}

function rectEle(rgb,xStart,yStart,xEnd,yEnd){
	ctx.beginPath();
	ctx.fillStyle=rgb;
	ctx.rect(xStart,yStart,xEnd,yEnd);
	ctx.fill();
	ctx.closePath();
}

function initDraw(){
	//The canvas size also has to be defined i JavaScript.
	canvas.width=640;
	canvas.height=640;

	ctx.translate(320,320);

	rectEle('rgb(200,0,0)',boxAlw,boxAth,boxArw,boxAbh);
	circleEle('rgb(0,200,0)',0,0,120);
	circleElePlus('rgb(0,0,200)',0,0,40,0,0,-80);
}

function reDraw(){
	var rot=0;
	var green=200;
	var redblue=0;
	ctx.setTransform(1,0,0,1,0,0); // reset to default transform
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.translate(320,320);

	if(frame%60==0){
		rot=0
	}else{
		rot=(frame%60)*Math.PI/30;
	}

	if(frame%40==0){
		green=200;
		redblue=0;
	}else if(frame%40<21){
		green=green-(4*(frame%40));
		redblue=redblue+(4*(frame%40));
	}else{
		green=green+(4*(frame%40-20));
		redblue=redblue+(4*(frame%40-20));
	}

	if(frame%80==0){
		boxAlw=160;boxArw=320;
		boxAth=160;boxAbh=320;
	}else if(frame%80<6){
		boxAlw=boxAlw-48;
	}else if(frame%80<11){
		boxArw=boxArw-32;
	}else if(frame%80<16){
		boxAlw=boxAlw-48;
		boxArw=boxArw+48;
	}else if(frame%80<21){
		boxArw=boxArw-48;
	}else if(frame%80<26){
		boxAth=boxAth-48;
	}else if(frame%80<31){
		boxAbh=boxAbh-32;
	}else if(frame%80<36){
		boxAth=boxAth-48;
		boxAbh=boxAbh+48;
	}else if(frame%80<41){
		boxAbh=boxAbh-48;
	}else if(frame%80<46){
		boxAlw=boxAlw+48;
	}else if(frame%80<51){
		boxArw=boxArw+32;
	}else if(frame%80<56){
		boxAlw=boxAlw+48;
		boxArw=boxArw-48;
	}else if(frame%80<61){
		boxArw=boxArw+48;
	}else if(frame%80<66){
		boxAth=boxAth+48;
	}else if(frame%80<71){
		boxAbh=boxAbh+32;
	}else if(frame%80<86){
		boxAth=boxAth+48;
		boxAbh=boxAbh-48;
	}else if(frame%80<80){
		boxAbh=boxAbh+48;
	}

	rectEle('rgb(200,0,0)',boxAlw,boxAth,boxArw,boxAbh);
	circleEle('rgb('+redblue+','+green+','+redblue+')',0,0,160);
	circleElePlus('rgb(0,0,200)',0,120,40,rot,0,-80);
	//console.log(frame%80);
}

function drawLoop(){
	reDraw();
	frame=frame+1;
	if(frame>2880){
		clearTimeout(animator);
	}
}

function startLoop(){
	animator=setInterval(drawLoop,5);
}

function startATestRun(){
	frame=0;
	var dStart=new Date();
	var testStart=dStart.getTime();
	while(frame<288000){
		drawLoop();
	}
	var dEnd=new Date();
	var testEnd=dEnd.getTime();
	var result=288000/((testEnd-testStart)/1000);
	document.getElementById("result").innerHTML=result;
}
