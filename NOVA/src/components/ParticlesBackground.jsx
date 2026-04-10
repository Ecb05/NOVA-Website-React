import React, { useEffect } from 'react';

const ParticlesBackground = ({
  id = 'particles-js',
  particleColors = ['#00A8A8', '#00C896', '#1DE9B6'],
  lineColor = '#00C896',
  opacity = 0.5,
  particleCount = 80,
  interactive = true
}) => {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS(id, {
        particles: {
          number: {
            value: particleCount,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: particleColors
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            }
          },
          opacity: {
            value: opacity,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: lineColor,
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: interactive,
              mode: 'grab'
            },
            onclick: {
              enable: interactive,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      });
    }

    return () => {
      // Corrected cleanup for multi-instance particles.js
      if (window.pJSDom) {
        const index = window.pJSDom.findIndex(p => p.canvas && p.canvas.el && p.canvas.el.parentElement && p.canvas.el.parentElement.id === id);
        if (index > -1) {
          window.pJSDom[index].pJS.fn.vendors.destroypJS();
          window.pJSDom.splice(index, 1);
        }
      }
    };
  }, [id, particleColors, lineColor, particleCount, opacity, interactive]);

  return (
    <div
      id={id}
      className="particles-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    />
  );
};

export default ParticlesBackground;