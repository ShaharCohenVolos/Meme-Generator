'use strict'


function onInit() {
    // renderFilterByQueryStringParams()


    renderTags()
    renderTagsSelect()
    resizeGallery()
    addGalleryListener()
    renderGallery()
}

function mainPage() {
    const elMainPage = document.querySelector('.main-container')
    elMainPage.style.display = 'flex';

    const elEditPage = document.querySelector('.meme-gen-container')
    elEditPage.style.display = 'none';

    resetMeme()
}