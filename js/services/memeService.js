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
            x: 250,
            y: 100
        }
    }]
}

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
            x: 250,
            y: y
        }
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
        y = 400
        return { y: y, size: size }
    } else if (gMeme.lines.length === 2) {
        y = 250;
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