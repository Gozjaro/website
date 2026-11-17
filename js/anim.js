(() => {
  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const { gsap, ScrollTrigger } = window;
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', (context) => {
    const intro = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } });
    intro.from('.hero .eyebrow, .hero h1, .hero-description, .hero .button-row', {
      y: 24, opacity: 0, stagger: 0.08
    }).from('.hero-logo', { scale: 0.85, rotation: -6 }, 0.16)
      .from('.hero-footnote span', { opacity: 0, stagger: 0.08, duration: 0.6 })
      .to('.hero-logo', { y: -8, yoyo: true, repeat: -1, duration: 3, ease: 'sine.inOut' });

    if (!ScrollTrigger) return;
    gsap.utils.toArray('.section-heading').forEach((heading) => {
      gsap.from(heading, {
        y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: heading, start: 'top 85%', once: true }
      });
    });

    ScrollTrigger.batch('.feature-card, .code-card, .project-card', {
      start: 'top 85%', once: true,
      onEnter: (batch) => context.add(() => {
        gsap.fromTo(batch, { y: 32, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08
        });
      })
    });

    // Keep the overlay gradients fixed; shift only the background image.
    gsap.fromTo('.hero', { backgroundPositionY: '50%, 50%, 50%' }, {
      backgroundPositionY: '50%, 50%, 58%', ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  });
})();
