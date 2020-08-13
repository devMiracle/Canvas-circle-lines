
document.oncontextmenu = (e) => {
    return false
}

var targetFrom = 0
var targetTo = 0

const viewState = {
    'nodes': [],
    'connections': []
}

function rand(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}





const drawCanvas = () => {
    $('canvas').drawImage({
        layer: true,
        source: 'test.png',
        x: 50,
        y: 50,
        width: 50,
        height: 50,
        click: function (layer) {
            $(this).animateLayer(layer, {
                rotate: '+=180'
            })
            viewState.nodes.push({
                'fill': `rgb(${rand(0, 256)},${rand(0, 256)},${rand(0, 256)})`,
                'x': rand(100, 900),
                'y': rand(100, 900)
            })
            
            $('canvas').removeLayers()
            drawCanvas()
           

            viewState.connections.forEach(conn => {
                $('canvas').drawLine({
                    layer: true,
                    strokeStyle: '#000',
                    strokeWidth: 3,
                    bringToFront: false,
                    x1: conn.fromNode.x, y1: conn.fromNode.y,
                    x2: conn.toNode.x, y2: conn.toNode.y
                })
            })

            viewState.nodes.forEach(node => {
                $('canvas').drawArc({
                    layer: true,
                    draggable: true,
                    bringToFront: true,
                    fillStyle: node.fill,
                    x: node.x,
                    y: node.y,
                    radius: 50,
                    mousedown: (ev) => {
                        if (ev.event.button == 2) {
                            //right click
                            let currentConnection = viewState.connections.filter(c => !c.toNode)[0]
                            if (currentConnection) {
                                if (currentConnection.fromNode !== node) {
                                    currentConnection.toNode = node
                                    $('canvas').drawLine({
                                        layer: true,
                                        bringToFront: false,
                                        strokeStyle: '#000',
                                        strokeWidth: 3,
                                        x1: currentConnection.fromNode.x, y1: currentConnection.fromNode.y,
                                        x2: currentConnection.toNode.x, y2: currentConnection.toNode.y,
                                    })


                                }
                            } else {
                                viewState.connections.push({
                                    'fromNode': node
                                })
                            }
                        }
                        if (ev.event.button == 0) {
                            for (let j = 0; j < viewState.connections.length; j++) {
                                if (node.x == viewState.connections[j].fromNode.x & node.y == viewState.connections[j].fromNode.y) {
                                    targetFrom = viewState.connections[j]
                                    console.log(node.x + ' ' + viewState.connections[j].fromNode.x + ' ' + node.y + ' ' + viewState.connections[j].fromNode.y)
                                    break
                                } else if (node.x == viewState.connections[j].toNode.x & node.y == viewState.connections[j].toNode.y) {
                                    targetTo = viewState.connections[j]
                                    console.log(node.x + ' ' + viewState.connections[j].toNode.x + ' ' + node.y + ' ' + viewState.connections[j].toNode.y)
                                    break
                                }
                                else {
                                    console.log('NO')
                                }
                            }

                        }
                    },
                    mouseup: function (ev) {
                        targetFrom = 0
                        targetTo = 0
                        
                    },
                    drag: function (layer) {
                        node.x = layer.x
                        node.y = layer.y
                        if (targetFrom != 0) {
                            
                            targetFrom.fromNode.x = node.x
                            targetFrom.fromNode.y = node.y
                            // console.log(targetFrom.fromNode)
                            
                            // viewState.connections.forEach(conn => {
                            //     $('canvas').drawLine({
                            //         layer: true,
                            //         strokeStyle: '#000',
                            //         strokeWidth: 3,
                            //         bringToFront: false,
                            //         x1: conn.fromNode.x, y1: conn.fromNode.y,
                            //         x2: conn.toNode.x, y2: conn.toNode.y
                            //     })
                            // })
                        }
                        else if (targetTo != 0) {
                            
                            targetTo.toNode.x = node.x
                            targetTo.toNode.y = node.y
                            // console.log(targetTo.toNode)

                            // viewState.connections.forEach(conn => {
                            //     $('canvas').drawLine({
                            //         layer: true,
                            //         strokeStyle: '#000',
                            //         strokeWidth: 3,
                            //         bringToFront: false,
                            //         x1: conn.fromNode.x, y1: conn.fromNode.y,
                            //         x2: conn.toNode.x, y2: conn.toNode.y
                            //     })
                            // })
                        }
                       
                        
            
                

                    },
                    dragstop: function (layer) {
                        node.x = layer.x
                        node.y = layer.y
                    }
                })
            })
        }
    })
}
drawCanvas()
