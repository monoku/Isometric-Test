/* NEW 

//GAME TEST


!function (container, map) {
	var
		contWidth = container.getSize().x
		, contHeight = container.getSize().y
		, sw=64
		, sh=32
		, sh_p=128
		, floor_y=85
		, bgImg = document.createElement("img")

	bgImg.src = map.tilesets[0].image
	bgImg.onload = initilize

	function initilize () {
		for(var i=0; i<map.layers.length; i++) {
			if(map.layers[i].data) {
				drawLayer(map.layers[i])
			}
		}
	}


	// Función para dibujar objetos estáticos
	function drawLayer (layer) {
		var 
			i=0
			, left = contWidth/2 - sw/2
			, top = 0
			, arr = layer.data
			, width = layer.width
			, floor = 0
			, row
			, clss = 'tile'

		layerContainer = document.createElement("div")

		layerContainer.className = layer.name

		if(layer.properties) {
			if(layer.properties.floor) {
				console.log(layer)
				floor = floor_y * (parseInt(layer.properties.floor) - 1)
				//floor = floor_y
			} else {
				layerContainer.className += ' '+layer.properties.type
			}
		}


		if(!layer.visible)
			layerContainer.className += ' opaque'


		for(;arr.length > i;i++) {

			left += sw/2
			top += sh/2

			if(i%width==0) {
				row=Math.floor(i/width)
				top=row*sh/2
				left=(container.getSize().x)/2 - row*sw/2
			}



			if(arr[i] != 0) layerContainer.appendChild((layer.properties && layer.properties.type == 'sprite') ? drawSprite(left, top, arr[i]-1, clss): drawTile(left, top - floor, arr[i]-1, clss))
		}
		container.appendChild(layerContainer)
	}


	// Ejemplo de función para dibujar objetos animados
	function drawSprite(left, top, pos, clss) {

		var 
			oImg = new Element('div', {
				'class': 'sprite_element',
				styles: {
					left: left,
					top: top,
					backgroundPosition: '-87px 0px' //ie fix. IE7 no puede obtener las propiedades si estas se ponen a través de la clase
				}
			})
			, width = parseInt(bgImg.width) / sw
			, bleft =  sw * (pos%width)
			, btop = Math.floor(pos/width) * sh_p

			, animation = setInterval(function() {
				var
					pos = oImg.getStyle('background-position').replace(/px/g, '').split(' ')
					, tx = parseInt(pos[0])
					, ty = parseInt(pos[1]) - 80
				oImg.setStyle('background-position', tx + 'px '+ ty +'px')
			}, 50)

		oImg.store('animation', animation)

		oImg.addEvent('click', function() {
			var
				pos = this.getStyle('background-position').replace(/px/g, '').split(' ')
			this.setStyle('background-position', '100px '+pos[1]+'px')
		})

		return oImg
	}

	function drawTile (left, top, pos, clss) {
		var
			oImg = document.createElement("div")
			, width = parseInt(bgImg.width) / sw
			, bleft =  sw * (pos%width)
			, btop = Math.floor(pos/width) * sh_p

		oImg.className = clss
		oImg.style.background = 'url('+bgImg.src+') -'+bleft+'px -'+btop+'px no-repeat'
		oImg.style.width = sw+'px'
		oImg.style.height = sh_p+'px'
		oImg.style.left = left+'px'
		oImg.style.top = top+'px'
		return oImg
	}

}($('app'), map_points)













// TEST
$('test_out').addEvent('click', function () {
	$$('#app .to_change').addClass('opaque')
})

$('test_in').addEvent('click', function () {
	$$('#app .to_change').removeClass('opaque')
})


var zoom = 1
var	vendors = ['ms', 'moz', 'webkit', 'o', 'Ms', 'Moz', 'Webkit', 'O']

$('zoom_out').addEvent('click', function () {
	var x = 0


    if(zoom>0.8)
	    zoom -= 0.2

    for(; x < vendors.length; x++) {
        document.getElementById('app').style[vendors[x]+'Transform'] = "scale("+zoom+")"
    }
})

$('zoom_in').addEvent('click', function () {
	var	x = 0

    if(zoom < 1.4)
    	zoom += 0.2

    for(; x < vendors.length; x++) {
        document.getElementById('app').style[vendors[x]+'Transform'] = "scale("+zoom+")"
    }
})

// var scroll = new Fx.Scroll('app-container', {
// 	wait: false,
// 	duration: 2500,
// 	transition: Fx.Transitions.Quad.easeInOut
// })

var
	x1 = 0,
	y1 = 0

document.addEvent('mousemove', function (event) {

	if($('app').retrieve('move')) {
		var
			x = x1 - event.page.x
			y = y1 - event.page.y

		//console.log(x,y)

		$('app').setStyles({
			top: -y,
			left: -x
		})
	}
})

$('app').addEvent('mousedown', function (event) {
	x1 = event.page.x - parseInt(document.getElementById('app').style.left || 0),
	y1 = event.page.y - parseInt(document.getElementById('app').style.top || 0)
	$('app').store('move', true)
})

$('app').addEvent('mouseup', function(event) {
	$('app').store('move', false)
})

*/

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