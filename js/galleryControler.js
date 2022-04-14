'use strict'

function renderGallery() {
    const elGlryCntnr = document.querySelector('.img-gallery')
    const imgs = getImgsToDisplay()
    const strHtml = imgs.map(function(img) {
        return `<img src="${img.url}"
         id="${img.keywords.join('')}" 
        onclick="onImgSelect(${img.id})">`
    })

    elGlryCntnr.innerHTML = strHtml.join('')
}

function onPageChange(diff) {
    changePage(diff)
    renderGallery()
}

function renderTags() {
    const elTagsNav = document.querySelector('.tags-nav')
    const tags = getTags()
    const strHTML = tags.map(function(tag) {
        return `<span id="${tag}" 
        onclick="onSetFilter('${tag}')">${tag}</span>`
    })
    elTagsNav.innerHTML = strHTML.join('')
}

function onSetFilter(tag) {

    // const queryStringParams = `?tag=${tag}`
    // const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams;
    // window.history.pushState({ path: newUrl }, '', newUrl)

    setFilter(tag)
    renderGallery()
}

// function renderFilterByQueryStringParams() {
//     const queryStringParams = new URLSearchParams(window.location.search)
//     const filterTag = {
//         tag: queryStringParams.get('tag') || ''
//     }
//     setFilter(filterTag.tag)
// }



function onSearchTag(ev) {
    ev.preventDefault()
    const elTag = document.querySelector('input[name=search-tag]')

    setFilter(elTag.value)
    renderGallery()
}

function onImgSelect(imgId) {
    document.querySelector('main.main-container').style.display = 'none'
    document.querySelector('main.meme-gen-container').style.display = 'grid'

    renderMeme(imgId)
}