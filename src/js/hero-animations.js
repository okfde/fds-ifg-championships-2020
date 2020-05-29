(function(){

  function init () {
    const pathHelperImage = document.getElementById('path-helper')
    const imagePath = pathHelperImage.src.replace('1x1.png', '')
    console.warn('imagePath', imagePath)
  }

  init()

}())