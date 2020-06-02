(function(){

  function init () {
    const pathHelperImage = document.getElementById('path-helper')
    const imgDirPath = pathHelperImage.src.replace('1x1.png', '')
    renderAnimations(imgDirPath)
  }

  function renderAnimations (imgDirPath) {
    const container = document.querySelector('.hero')
    const containerSize = { w: container.clientWidth, h: container.clientHeight }
    const teamsArr = Object.values(teams)

    // create, insert and animate images
    const allImgs = []
    for (let i = 0, l = teamsArr.length; i < l; i++) {
      const imgPath = imgDirPath + teamsArr[i].img
      animateImage(imgPath, container, containerSize)
    }
  }

  function renderImage (imgPath) {
    const el = document.createElement('img')
    el.classList.add('floating-head')
    el.setAttribute('src', imgPath)
    return el
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getAnimationTime () {
    const miliseconds = 20000
    return miliseconds
  }

  function createDelayTimes () {
    const result = []
    let i = 16
    let last = 0
    while (i--) {
      last = last + getRandomArbitrary(2000, 2500)
      result.push(last)
    }
    return result
  }

  const deslayTimes = createDelayTimes()
  function getDelayTime () {
    const randomTime = deslayTimes[Math.floor(Math.random() * deslayTimes.length)];
    return randomTime
  }
  
  function animateImage (imgPath, container, containerSize) {
    const randomDelay = getDelayTime()

    setTimeout(() => {
      const imgEl = renderImage(imgPath)
      container.appendChild(imgEl)
      
      const miliseconds = getAnimationTime()
      const imgHeight = imgEl.clientHeight
      const imgWidth = imgEl.clientWidth
      const minY = imgHeight / 2
      const maxY = containerSize.h - Math.round(imgHeight * 1.5)
      const randomY = getRandomArbitrary(minY, maxY)
      const targetXPos = containerSize.w + imgWidth
  
      imgEl.style.top = randomY + 'px'
      imgEl.style.left = -(imgWidth) + 'px'
      imgEl.style.transform = `translate(${targetXPos}px, 0)`;
      imgEl.style.transition = `all ${miliseconds}ms linear`;
      setTimeout(() => {
        container.removeChild(imgEl)
        animateImage(imgPath, container, containerSize)
      }, miliseconds);      
    }, randomDelay)
  }

  init()

}())