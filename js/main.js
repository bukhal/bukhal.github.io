window.onload = () => {
    document.getElementById('body').classList.add('loaded')
}

$( document ).ready(function() {
    const $body = $('body')
    const $logo = $('.logo')
    const $about = $('.about')
    const $aboutClose = $('.about_close')
    const $soundsBlock = $('.sounds-block')
    const $tagMenuButton = $('.tags-menu_button')
    const $worksHolder = $('.works-holder')
    const $colorOverlay = $('.color-overlay')
    const app = {
        activeTag: 'interfaces',
        colorOverlayDuration: 800,
        sounds: 13,
        works: {
            interfaces: 4,
            illustrations: 2,
            print: 3,
            branding: 2,
        },
        lastActive: 0,
    }

    $tagMenuButton.click(function() {
        $tagMenuButton.removeClass('active')
        $(this).addClass('active')
        app.activeTag = $(this).attr('data-tag')
    })   


    const showColorOverlay = () => {
        $colorOverlay.addClass('active')
        setTimeout(() => {
            $colorOverlay.removeClass('active')
        }, app.colorOverlayDuration)
    }

    const chooseWork = () => {
        let num
        do {
            num = Math.floor(Math.random() * app.works[app.activeTag]) + 1
        } while(num === app.lastActive)

        console.log(num)

        $('.works-holder img').removeClass('active')
        $(`.works-holder.${app.activeTag} img:nth-child(${num})`).addClass('active')
        app.lastActive = num
    }

    const playSound = () => {
        const num = Math.floor(Math.random() * (app.sounds - 1)) + 1
        
        $('.my_audio')[num].play()
    }

    const showWork = () => {
        playSound()
        showColorOverlay()
        chooseWork()
    }

    const $worksContainer = $('.works-container')
    const soundsCount = 13
    
    $worksContainer.click(showWork)

    const showAbout = () => $('body').addClass('about-active')
    const hideAbout = () => $('body').removeClass('about-active')

    $('.logo').click(showAbout)
    $('.about_close').click(hideAbout)
});
 