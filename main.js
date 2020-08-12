function rand(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}


$('canvas').drawImage({
    layer: true,
    source: 'test.png',
    x: 50, 
    y: 50,
    width: 50,
    height: 50,
    click: function(layer) {
        $(this).animateLayer(layer, {
            rotate: '+=180'
        })
        $('canvas').drawArc({
            layer: false,
            draggable: true,
            bringToFront: true,
            fillStyle: `rgb(${rand(0, 256)},${rand(0, 256)},${rand(0, 256)})`,
            x: rand(100, 900),
            y: rand(100, 900),
            radius: 50
        })
    }
})