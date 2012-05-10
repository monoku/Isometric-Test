!function(container, map) {
	var
		contWidth = container.getSize().x,
		contHeight = container.getSize().y,
		sw=64, 
		sh=32,
		sh_p=128,
		bgImg = document.createElement("img")

	bgImg.src = map.tilesets[0].image
	bgImg.onload = initilize

	function initilize() {
		for(var i=0; i<map.layers.length;i++) {
			if(map.layers[i].data)
				drawLayer(map.layers[i])
			else if(map.layers[i].objects)
				drawObjects(map.layers[i])
		}
	}

	function drawLayer(layer){
		var 
			i=0, 
			left = contWidth/2 - sw/2,
			top = 0,
			arr = layer.data,
			width = layer.width,
			row,
			clss = 'tile'

			if(layer.properties && layer.properties.type == 'objects')
				clss += ' opaque object'

			if(!layer.visible)
				clss += ' opaque'

			for(;arr.length > i;i++) {

				left += sw/2
				top += sh/2

				if(i%width==0) {
					row=Math.floor(i/width)
					top=row*sh/2
					left=(container.getSize().x)/2 - row*sw/2
					//left=(1200)/2 - row*sw/2
				}

				drawTile(left, top, arr[i], clss)
			}
	}

	function drawObjects(layer) {
		console.log('DIBUJIN')
	}

function drawTile(left, top, pos, clss) {
	if (pos!=0) {
		--pos
		var
			oImg = document.createElement("div"),
			width = parseInt(bgImg.width) / sw,
			bleft =  sw * (pos%width),
			btop = Math.floor(pos/width) * sh_p

		oImg.className = clss
		oImg.style.background = 'url('+bgImg.src+') -'+bleft+'px -'+btop+'px no-repeat'
		oImg.style.width = sw+'px'
		oImg.style.height = sh_p+'px'
		oImg.style.left = left+'px'
		oImg.style.top = top+'px'
		document.body.appendChild(oImg)
	}
}

}($('app'), tmp)



// TEST

$('btn-test').addEvent('mouseover', function () {
	$$('.object').removeClass('opaque')
})

$('btn-test').addEvent('mouseout', function () {
	$$('.object').addClass('opaque')
})

$('btn-test2').addEvent('mouseover', function () {
	$$('.object').removeClass('opaque')
})

$('btn-test2').addEvent('mouseout', function () {
	$$('.object').addClass('opaque')
})