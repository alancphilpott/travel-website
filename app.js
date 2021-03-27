let controller, slideScene, pageScene

const animateSlides = () => {
  controller = new ScrollMagic.Controller()

  const slides = document.querySelectorAll('.slide')
  const nav = document.querySelector('.nav-header')

  slides.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector('.reveal-img')
    const image = slide.querySelector('img')
    const revealText = slide.querySelector('.reveal-text')

    const slideTimeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power2.inOut'
      }
    })

    slideTimeline.fromTo(revealImg, { x: '0%' }, { x: '100%' })
    slideTimeline.fromTo(image, { scale: 2 }, { scale: 1 }, '-=0.9')
    slideTimeline.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=0.7')
    slideTimeline.fromTo(nav, { y: '-100%' }, { y: '0%' }, '-=0.9')

    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false
    })
      .setTween(slideTimeline)
      .addIndicators({ colorStart: 'white', colorTrigger: 'white', name: 'slide' })
      .addTo(controller)

    const pageTimeline = gsap.timeline()
    let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1]
    pageTimeline.fromTo(nextSlide, { y: '0%' }, { y: '50%' })
    pageTimeline.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 })
    pageTimeline.fromTo(nextSlide, { y: '50%' }, { y: '0%' }, '-=0.5')

    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0,
      duration: '100%'
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTimeline)
      .addIndicators({ colorStart: 'white', colorTrigger: 'white', name: 'page', indent: 200 })
      .addTo(controller)
  })
}

animateSlides()
