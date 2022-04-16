'use strict'

var gElCanvas;
var gCtx;


function renderMeme(imgId) {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')

    if (!imgId) imgId = gMeme.selectedImgId
    else gMeme.selectedImgId = imgId
    const imgUrl = getImgById(imgId)
    resizeCanvas()
    drawCanvas(imgUrl)
}

function onEnterTxt(ele) {

    setMemeTxt(ele.value)
    renderMeme()
}

function drawCanvas(imgUrl) {
    var img = new Image();
    img.src = imgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawTxt()
        drawRect()
    }
}

function onAddRow() {
    addMemeLine()
}

function onSwitchRow() {
    focusNextRow()
}

function onSetLineIdx(name) {
    setSelectedLine(name)
    renderMeme()
}

function onRemoveRow() {
    removeLastRow()
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}


function onMoveTxt(diff) {
    moveTxt(diff)
    renderMeme()
}

function onChangeFont(font) {
    changeFont(font)
    renderMeme()
}

function onChangeOutlineClr(clr) {
    changeOutline(clr)
    renderMeme()
}

function onChangeFillClr(clr) {
    changeFill(clr)
    renderMeme()
}

function onDownloadMeme(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
        // elLink.download = getImgById(gMeme.selectedImgId)
}

function addEvListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}