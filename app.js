let controller, slideScene, pageScene
const mouse = document.querySelector('.cursor')
const burger = document.querySelector('.burger')

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

const cursor = (e) => {
  mouse.style.top = e.pageY + 'px'
  mouse.style.left = e.pageX + 'px'
}

const activeCursor = (e) => {
  const item = e.target

  if (item.id === 'logo' || item.classList.contains('burger')) {
    mouse.classList.add('nav-active')
  } else if (item.classList.contains('explore')) {
    mouse.classList.add('explore-active')
    mouse.querySelector('span').innerText = 'Tap'
    gsap.to('.title-swipe', 1, { y: '0%' })
  } else {
    mouse.classList.remove('nav-active')
    mouse.classList.remove('explore-active')
    mouse.querySelector('span').innerText = ''
    gsap.to('.title-swipe', 1, { y: '100%' })
  }
}

const navToggle = (e) => {
  if (!e.target.classList.contains('active')) {
    e.target.classList.add('active')
    gsap.to('.line1', 0.5, { rotate: '45', y: 5, background: 'black' })
    gsap.to('.line2', 0.5, { rotate: '-45', y: -5, background: 'black' })
    gsap.to('#logo', 1, { color: 'black' })
    gsap.to('.nav-bar', 1, { clipPath: 'circle(2500px at 100% -10%)' })
    document.body.classList.add('hide')
  } else {
    e.target.classList.remove('active')
    gsap.to('.line1', 0.5, { rotate: '0', y: 0, background: 'white' })
    gsap.to('.line2', 0.5, { rotate: '0', y: 0, background: 'white' })
    gsap.to('#logo', 1, { color: 'white' })
    gsap.to('.nav-bar', 1, { clipPath: 'circle(50px at 100% -10%)' })
    document.body.classList.remove('hide')
  }
}

window.addEventListener('mousemove', cursor)
window.addEventListener('mouseover', activeCursor)
burger.addEventListener('click', navToggle)

animateSlides()
