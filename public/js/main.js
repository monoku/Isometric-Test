!function(container) {
	var
		contWidth = container.getSize().x,
		contHeight = container.getSize().y,
		sw=64, 
		sh=32,
		sh_p=128,
		bgImg = document.createElement("img")

	bgImg.src = tmp.tilesets[0].image
	bgImg.onload = initilize

	function initilize() {
		for(var i=0; i<tmp.layers.length;i++) {
			drawLayer(tmp.layers[i])	
		}
	}

	function drawLayer(layer){
		var 
			i=0, 
			left = contWidth/2 - sw/2,
			top = 0,
			arr = layer.data,
			width = layer.width,
			row

			for(;arr.length > i;i++) {

				left += sw/2
				top += sh/2

				if(i%width==0) {
					row=Math.floor(i/width)
					top=row*sh/2
					left=(container.getSize().x)/2 - row*sw/2
				}

				drawTile(left, top, arr[i])
			}
	}

function drawTile(left, top, pos) {
	if (pos!=0) {
		--pos
		var
			oImg = document.createElement("div"),
			width = parseInt(bgImg.width) / sw,
			bleft =  sw * (pos%width),
			btop = Math.floor(pos/width) * sh_p

		oImg.className = 'tile'
		oImg.style.background = 'url('+bgImg.src+') -'+bleft+'px -'+btop+'px no-repeat'
		oImg.style.width = sw+'px'
		oImg.style.height = sh_p+'px'
		oImg.style.left = left+'px'
		oImg.style.top = top+'px'
		document.body.appendChild(oImg)
	}
}

}($('app'))