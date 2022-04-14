'use strict'

var gElCanvas;
var gCtx;


function renderMeme(imgId) {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
    gMeme.selectedImgId = imgId
    const imgUrl = getImgById(imgId)
    drawCanvas(imgUrl)
}

function onEnterTxt(ele) {

    setMemeTxt(ele.value)
    renderMeme(gMeme.selectedImgId)
}

function drawCanvas(imgUrl) {
    var img = new Image();
    img.src = imgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawTxt()
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
    renderMeme(gMeme.selectedImgId)
}

function onRemoveRow() {
    removeLastRow()
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme(gMeme.selectedImgId)
}


function onMoveTxt(diff) {
    moveTxt(diff)
    renderMeme(gMeme.selectedImgId)
}

function onChangeFont(font) {
    changeFont(font)
    renderMeme(gMeme.selectedImgId)
}

function onChangeOutlineClr(clr) {
    changeOutline(clr)
    renderMeme(gMeme.selectedImgId)
}

function onChangeFillClr(clr) {
    changeFill(clr)
    renderMeme(gMeme.selectedImgId)
}

function onDownloadMeme(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
        // elLink.download = getImgById(gMeme.selectedImgId)
}