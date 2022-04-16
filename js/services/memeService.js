'use strict'


var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Enter Text Here',
        size: 50,
        align: 'center',
        outline: 'black',
        fill: 'transparent',
        font: 'impact',
        pos: {
            x: 200,
            y: 50
        }
    }]
}
var gStartPos;

function setMemeTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function drawTxt() {


    gMeme.lines.forEach(line => {
        gCtx.textBaseLine = 'middle'
        gCtx.textAlign = line.align
        gCtx.fillStyle = line.fill
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.strokeStyle = line.outline;
        gCtx.lineWidth = 2
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    })
}

function _createLine(y, size = 50) {
    return {
        txt: 'Enter Text Here',
        size: size,
        align: 'center',
        outline: 'black',
        fill: 'transparent',
        font: 'impact',
        pos: {
            x: gElCanvas.width / 2,
            y: y
        },
    }
}

function addMemeLine() {
    const posAndSize = _setMemePosAndSize()
    gMeme.lines.push(_createLine(posAndSize.y, posAndSize.size))

    const elTxtInputs = document.querySelector('.inputs')
    const strHtml = `<input type="text" name="prnt-txt-${gMeme.lines.length-1}" 
    onfocus="onSetLineIdx(this.name)"
    oninput="onEnterTxt(this)" placeholder="Enter Txt Here">`
    elTxtInputs.innerHTML += strHtml
}

function _setMemePosAndSize() {
    var y = 0;
    var size = 50;
    if (gMeme.lines.length === 1) {
        y = 350
        return { y: y, size: size }
    } else if (gMeme.lines.length === 2) {
        y = 200;
        return { y: y, size: size }
    } else {
        gMeme.lines.forEach(line => {
            line.size -= 10
        })
        gMeme.lines[2].pos.y -= gMeme.lines[2].size
        y = gMeme.lines[2].pos.y + gMeme.lines[2].size
        size = gMeme.lines[2].size
        return { y: y, size: size }
    }
}

function setSelectedLine(lineName) {
    const lineIdx = +lineName.charAt(lineName.length - 1)
    if (!lineIdx) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx = lineIdx
}

function focusNextRow() {
    if (gMeme.lines.length - 1 > gMeme.selectedLineIdx) {
        gMeme.selectedLineIdx++;
        const elRowInp = document.querySelector(`input[name=prnt-txt-${gMeme.selectedLineIdx}]`)
        elRowInp.focus()
    } else if (gMeme.lines.length - 1 === gMeme.selectedLineIdx) {
        gMeme.selectedLineIdx = 0
        const elRowInp = document.querySelector(`input[name=prnt-txt]`)
        elRowInp.focus()
    }
}

function removeLastRow() {
    const elRow = document.querySelector(`input[name=prnt-txt-${gMeme.lines.length -1}]`)
    elRow.remove()
    gMeme.lines.pop()
}

function changeFontSize(diff) {
    gMeme.lines.forEach(line => line.size += diff)
}

function moveTxt(diff) {
    var align = ''
    var hrzntlPos = 0
    switch (diff) {
        case -1:
            align = 'left'
            hrzntlPos = 0
            break;
        case 0:
            align = 'center'
            hrzntlPos = gElCanvas.width / 2
            break;
        case 1:
            align = 'right'
            hrzntlPos = gElCanvas.width
            break;
    }

    gMeme.lines.forEach(line => {
        line.align = align
        line.pos.x = hrzntlPos
    })
}

function changeFont(font) {
    gMeme.lines.forEach(line => line.font = font)
}

function changeOutline(clr) {
    gMeme.lines.forEach(line => line.outline = clr)
}

function changeFill(clr) {
    gMeme.lines.forEach(line => line.fill = clr)
}

function drawRect() {
    setRectPos()
    const line = gMeme.lines[gMeme.selectedLineIdx]
    gCtx.beginPath()
    gCtx.rect(line.rectPos.x, line.rectPos.y, line.rectPos.width, line.rectPos.height)
    gCtx.lineWidth = 1
    gCtx.stroke()
}

function setRectPos() {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    const txtWidth = gCtx.measureText(line.txt).width
    const txtHeight = line.size
    const rectPos = {
        width: Math.floor(txtWidth + 20),
        height: Math.floor(txtHeight + (txtHeight / 4)),
        x: Math.floor(line.pos.x - txtWidth / 2 - 10),
        y: line.pos.y - txtHeight,
    }
    if (line.pos.x === 0) rectPos.x = line.pos.x
    else if (line.pos.x === gElCanvas.width) rectPos.x = line.pos.x - txtWidth
    line.rectPos = rectPos
}

function onMove(ev) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (!line.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLinePos(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onDown(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    renderMeme()
    setLineDrag(true)
    gStartPos = pos
    gElCanvas.style.cursor = 'grabbing'
}

function onUp(ev) {
    setLineDrag(false)
    gElCanvas.style.cursor = 'default'
}


function setLineDrag(val) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = val
}

function isLineClicked(pos) {
    return gMeme.lines.find((line, idx) => {
        const rect = line.rectPos
        if (pos.x > rect.x &&
            pos.x < rect.x + rect.width &&
            pos.y > rect.y &&
            pos.y < rect.y + rect.height) {
            // gMeme.selectedLine = idx
            const lineName = findLineNameByIdx(idx)
            setSelectedLine(lineName)
            return true
        }
    });
}

function moveLinePos(dx, dy) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.pos.x += dx
    line.pos.y += dy
}

function findLineNameByIdx(idx) {
    var nameStr = 'prnt-txt'
    if (!idx) return nameStr
    else return nameStr + '-' + idx
}

function resizeCanvas() {
    const elCnvsCntnr = document.querySelector('.canvas-container')
    if (elCnvsCntnr.offsetWidth < 400) {
        gElCanvas.width = 350;
        gElCanvas.height = 350;
        reSizeTxt(35, gElCanvas.width / 2)
    } else {
        gElCanvas.width = 400;
        gElCanvas.height = 400;
        reSizeTxt(50, gElCanvas.width / 2)
    }
}

function reSizeTxt(size, xPos) {
    gMeme.lines.forEach(line => {
        line.size = size;
        line.pos.x = xPos;
    })
}