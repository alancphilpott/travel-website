let controller, slideScene, pageScene, detailScene
const mouse = document.querySelector('.cursor')
const burger = document.querySelector('.burger')
const logo = document.querySelector('#logo')

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

    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false
    })
      .setTween(slideTimeline)
      // .addIndicators({ colorStart: 'white', colorTrigger: 'white', name: 'slide' })
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
      // .addIndicators({ colorStart: 'white', colorTrigger: 'white', name: 'page', indent: 200 })
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

const detailAnimation = () => {
  controller = new ScrollMagic.Controller()
  const slides = document.querySelectorAll('.detail-slide')

  slides.forEach((slide, index, slides) => {
    const slideTimeline = gsap.timeline({ defaults: { duration: 1 } })

    let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1]
    const nextImg = nextSlide.querySelector('img')

    slideTimeline.fromTo(slide, { opacity: 1 }, { opacity: 0 })
    slideTimeline.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, '-=0.5')
    slideTimeline.fromTo(nextImg, { y: '1%' }, { y: '0%' }, '-=0.5')

    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: '100%',
      triggerHook: 0
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTimeline)
      .addTo(controller)
  })
}

barba.init({
  views: [
    {
      namespace: 'home',
      beforeEnter() {
        animateSlides()
        logo.href = './index.html'
      },
      beforeLeave() {
        slideScene.destroy()
        pageScene.destroy()
        controller.destroy()
      }
    },
    {
      namespace: 'fashion',
      beforeEnter() {
        logo.href = '../index.html'
        detailAnimation()
      },
      beforeLeave() {
        controller.destroy()
        detailScene.destroy()
      }
    }
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async()

        window.scrollTo(0, 0)

        const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
        timeline.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 })
        timeline.fromTo('.swipe', 0.75, { x: '-100%' }, { x: '0%', onComplete: done }, '-=0.5')
        timeline.fromTo('.nav-header', 1, { y: '0%' }, { y: '-100%', ease: 'power2.inOut' }, '-=1')
      },
      enter({ current, next }) {
        let done = this.async()

        const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
        timeline.fromTo('.swipe', 0.4, { x: '0%' }, { x: '100%', stagger: 0.25 })
        timeline.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 })
        timeline.fromTo(
          '.nav-header',
          1,
          { y: '-100%' },
          { y: '0%', ease: 'power2.inOut', onComplete: done },
          '-=1'
        )
      }
    }
  ]
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 1300) {
    window.addEventListener('mousemove', cursor)
    window.addEventListener('mouseover', activeCursor)
    document.querySelector('.cursor').style.transform = 'translate(-50%, -50%)'
  } else {
    window.removeEventListener('mousemove', cursor)
    window.removeEventListener('mouseover', activeCursor)
    document.querySelector('.cursor').style.transform = 'translate(-150%, -150%)'
  }
})

window.onload = () => {
  if (window.innerWidth > 1300) {
    window.addEventListener('mousemove', cursor)
    window.addEventListener('mouseover', activeCursor)
    document.querySelector('.cursor').style.transform = 'translate(-50%, -50%)'
  }
}

burger.addEventListener('click', navToggle)
