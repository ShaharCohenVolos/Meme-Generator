'use strict'

const PAGE_SIZE = 5;

var gPageIdx = 0;
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['angry', 'politic'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['cute', 'dog', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cute', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'success'] },
    { id: 6, url: 'img/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy', 'baby'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy', 'politic'] },
    { id: 11, url: 'img/11.jpg', keywords: ['angry', 'love'] },
    { id: 12, url: 'img/12.jpg', keywords: ['happy', 'serious'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['serious'] },
    { id: 15, url: 'img/15.jpg', keywords: ['serious'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'img/17.jpg', keywords: ['serious', 'politic'] },
    { id: 18, url: 'img/18.jpg', keywords: ['happy', 'sad'] },
];
var gFilter = '';

function getImgsToDisplay() {
    if (!gFilter) var imgs = gImgs;
    else var imgs = gImgs.filter(img => img.keywords.includes(gFilter))

    const idxStart = gPageIdx * PAGE_SIZE;
    imgs = imgs.slice(idxStart, idxStart + PAGE_SIZE);

    if (gPageIdx < 0 || !imgs.length) return
    return imgs
}

function changePage(diff) {
    gPageIdx += diff;
    if (gPageIdx * PAGE_SIZE > gImgs.length) {
        gPageIdx = 0;
    }
    if (gPageIdx < 0) gPageIdx = gImgs.length / PAGE_SIZE - 1
}


function getTags() {
    var tags = gImgs.reduce((acc, img) => {
        acc.push(...img.keywords)
        return acc
    }, []);

    return tags.reduce((acc, tag, idx) => {
        if (!acc.includes(tags[idx])) acc.push(tag)
        return acc
    }, [])
}

function setFilter(tag) {
    gFilter = tag
}

function getImgById(imgId) {
    const img = gImgs.find(img => img.id === imgId)
    return img.url
}