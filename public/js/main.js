// require([], function () {

// 	var
// 		// square dimentions (each tile)
// 		squareWidth = 64
// 		squareHeight = 32

// 		// number of tiles
// 		widthNumber = 20
// 		heightNumber = 20

// 		// container
// 		container = document.getElementById('app')

// 	for(var i=0; i<widthNumber; i++) {
// 		for(var j=0; j<heightNumber; j++) {
// 			var oImg=document.createElement("img")
// 			oImg.setAttribute('src', '/img/1.png')
// 			oImg.setAttribute('class', 'tile')
// 			oImg.setAttribute('alt', 'na')
// 			oImg.setAttribute('height', squareHeight)
// 			oImg.setAttribute('width', squareWidth)

// 			oImg.style.left=squareWidth*i+"px"
// 			oImg.style.top=squareHeight*j+"px"
// 			container.appendChild(oImg)

// 			/*var oImg=document.createElement("img")
// 			oImg.setAttribute('src', '/img/1.png')
// 			oImg.setAttribute('class', 'tile')
// 			oImg.setAttribute('alt', 'na')
// 			oImg.setAttribute('height', squareHeight)
// 			oImg.setAttribute('width', squareWidth)			

// 			oImg.style.left=squareWidth*i + squareWidth/2 + "px"
// 			oImg.style.top=squareHeight*j + squareHeight/2 + "px"
// 			container.appendChild(oImg)*/
// 		}

// 	}


// 	// Test pared
// 	var i=0
// 	for(i; i<10; i++) {

// 		var oImg=document.createElement("img")
// 		oImg.setAttribute('src', '/img/wall.png')
// 		oImg.setAttribute('class', 'tile')
// 		oImg.setAttribute('alt', 'na')
// 		oImg.setAttribute('height', '64')
// 		oImg.setAttribute('width', '32')

// 		oImg.style.left=squareWidth*i + squareWidth/2 + "px"
// 		oImg.style.top=squareHeight*i + squareHeight/2 + "px"
// 		container.appendChild(oImg)

// 		var oImg=document.createElement("img")
// 		oImg.setAttribute('src', '/img/wall.png')
// 		oImg.setAttribute('class', 'tile')
// 		oImg.setAttribute('alt', 'na')
// 		oImg.setAttribute('height', '64')
// 		oImg.setAttribute('width', '32')

// 		oImg.style.left=squareWidth*i + "px"
// 		oImg.style.top=squareHeight*i + "px"
// 		container.appendChild(oImg)
// 	}
// 	console.log(i)
// 	for(i=10; i>=0; i--) {

// 		console.log(i)

// 		var oImg=document.createElement("img")
// 		oImg.setAttribute('src', '/img/wall2.png')
// 		oImg.setAttribute('class', 'tile')
// 		oImg.setAttribute('alt', 'na')
// 		oImg.setAttribute('height', '64')
// 		oImg.setAttribute('width', '32')

// 		oImg.style.left=squareWidth*(10-i) + "px"
// 		oImg.style.top=squareHeight*i - squareHeight/2 + "px"
// 		container.appendChild(oImg)
// 	}
// })
(function(container){
var	contWidth = container.getSize().x,
	contHeight = container.getSize().y,
	sw=64, 
	sh=32,
	bgImg = document.createElement("img");
bgImg.src = tmp.tilesets[0].image;
bgImg.onload = initilize;

function initilize(){
	for(var i=0; i<tmp.layers.length;i++){
		drawLayer(tmp.layers[i]);
	}
}

function drawLayer(layer){
  var i=0, 
	left = contWidth/2 - sw/2,
	top = 0,
	arr=layer.data,
	width=layer.width,
	row;

	for(;arr.length > i;i++){

		left += sw/2;
		top += sh/2;
		if(i%width==0){
			row=Math.floor(i/width)
			top=row*sh/2;
			left=window.innerWidth/2 - row*sw/2;
		}
		drawTile(left, top, arr[i]);
	}
}

function drawTile(left, top, pos){
	if(pos!=0){
		pos = pos-1
		var oImg = document.createElement("div"),
			width = parseInt(bgImg.width) / sw,
			bleft =  sw * (pos%width),
			btop = Math.floor(pos /width) * sh
		console.log(bleft, btop, pos);

			oImg.setStyles({'background':'url('+bgImg.src+') -'+bleft +'px -'+ btop +'px no-repeat','width':sw,'height':128})
			oImg.setAttribute('class', 'tile')
			oImg.setAttribute('alt', 'na')
		oImg.style.top = top + 'px';
		oImg.style.left = left + 'px';
		document.body.appendChild(oImg);
	}
}

})(window);