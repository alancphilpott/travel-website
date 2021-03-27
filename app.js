let controller, slideScene

const animateSlides = () => {
  controller = new ScrollMagic.Controller()

  const slides = document.querySelectorAll('.slide')
  const nav = document.querySelector('.nav-header')

  slides.forEach((slide) => {
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
  })
}

animateSlides()
