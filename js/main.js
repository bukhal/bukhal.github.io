window.onload = () => {
    document.getElementById('body').classList.add('loaded')
}

$( document ).ready(function() {
    const $tagMenuButton = $('.tags-menu_button')
    const $colorOverlay = $('.color-overlay')
    const $worksContainer = $('.works-container')
    const $audio = $('.my_audio')
    const $worksHolder = $('.works-holder')
    const $body = $('body')
    const app = {
        activeTag: 'interfaces',
        colorOverlayDuration: 1000,
        sounds: 7,
        works: {},
        lastSoundActive: 0,
        bg: '',
        randoms: [],
    }

    const showMenu = () => $('body').addClass('menu-active')
    const hideMenu = () => $('body').removeClass('menu-active')

    $('.mobile-menu_button').click(showMenu)
    $('.tags-menu_close').click(hideMenu)

    $worksHolder.each(function(index) {
        const holderName = $(this).data('holder')
        const length = $(this).children().length
        
        app.works[holderName] = length
    })

    const showColorOverlay = () => {
        $body.addClass('overlay-active')
        setTimeout(() => {
            $body.removeClass('overlay-active')
        }, app.colorOverlayDuration)
    }

    const chooseWork = () => {
        if (app.randoms.length === app.works[app.activeTag]) {
            app.randoms = []
        }

        let num
        do {
            num = Math.floor(Math.random() * app.works[app.activeTag]) + 1
        } while (app.randoms.includes(num))

        app.randoms.push(num)
        
        const activeWorkImg = $(`.works-holder.${app.activeTag} img:nth-child(${num})`)

        $('.works-holder img').removeClass('active')
        activeWorkImg.addClass('active')
        $('body').css({backgroundColor: activeWorkImg.data('color')})
        hideMenu()

        window.scrollTo(0, 0)
    }

    const playSound = () => {

        let num
        do {
            num = Math.floor(Math.random() * (app.sounds - 1)) + 1
        } while (num === app.lastSoundActive)

        app.lastSoundActive = num
        
        $audio[num].play()
    }

    const showWork = () => {
        playSound()
        showColorOverlay()
        chooseWork()
    }

    $worksContainer.click(showWork)

    const showAbout = () => $('body').addClass('about-active')
    const hideAbout = () => $('body').removeClass('about-active')

    $('.logo').click(showAbout)
    $('.about_close').click(hideAbout)

    $tagMenuButton.click(function() {
        app.randoms = []
        $tagMenuButton.removeClass('active')
        $(this).addClass('active')
        app.activeTag = $(this).attr('data-tag')
        showWork()
    }) 
});
 