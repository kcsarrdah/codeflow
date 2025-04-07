import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, BookOpen, Code2, ListTodo } from 'lucide-react';
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { colors } from '../theme/colors';

function Landing() {
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background-light-primary via-background-light-secondary to-background-light-tertiary dark:from-background-dark-primary dark:via-background-dark-secondary dark:to-background-dark-tertiary">
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              grab: {
                distance: 140,
                links: {
                  opacity: 0.5
                }
              },
            },
          },
          particles: {
            color: {
              value: colors.primary.light,
            },
            links: {
              color: colors.primary.light,
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 15,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          detectRetina: true,
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-96 bg-primary-light/5 dark:bg-primary-dark/5 blur-3xl" />

      <div className="relative z-10 text-center px-4">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-primary-light/20 rounded-full" />
            <Code2 className="relative w-20 h-20 text-primary-light dark:text-primary-dark" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6">
          CodeFlow
        </h1>
        <p className="text-xl text-text-light-secondary dark:text-text-dark-secondary mb-12 max-w-2xl mx-auto">
          Your one-stop solution for mastering Data Structures and Algorithms through interactive visualization.
          Learn, debug, and understand complex code with our powerful visual tools.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/debugger')}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-light text-text-dark-primary hover:bg-primary-dark dark:hover:bg-primary-light transition-all font-semibold shadow-lg hover:shadow-primary-light/25 hover:-translate-y-0.5"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Debugging
          </button>
          <button
            onClick={() => navigate('/data-structures')}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-background-light-primary/80 dark:bg-background-dark-primary/50 text-text-light-primary dark:text-text-dark-primary hover:bg-background-light-primary dark:hover:bg-background-dark-primary/70 transition-all font-semibold shadow-lg hover:shadow-primary-light/10 border border-primary-light/30 hover:-translate-y-0.5"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Explore Concepts
          </button>
          <button
            onClick={() => navigate('/problems')}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-background-light-primary/80 dark:bg-background-dark-primary/50 text-text-light-primary dark:text-text-dark-primary hover:bg-background-light-primary dark:hover:bg-background-dark-primary/70 transition-all font-semibold shadow-lg hover:shadow-primary-light/10 border border-primary-light/30 hover:-translate-y-0.5"
          >
            <ListTodo className="w-5 h-5 mr-2" />
            Practice
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-light to-primary-dark rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-background-light-primary/80 dark:bg-background-dark-primary/60 backdrop-blur-xl rounded-lg p-6 border border-primary-light/10">
              <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">
                Visual Learning
              </h3>
              <p className="text-text-light-secondary dark:text-text-dark-secondary">
                See your algorithms and data structures come to life with real-time visualization
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-light to-primary-dark rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-background-light-primary/80 dark:bg-background-dark-primary/60 backdrop-blur-xl rounded-lg p-6 border border-primary-light/10">
              <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">
                Interactive Debugging
              </h3>
              <p className="text-text-light-secondary dark:text-text-dark-secondary">
                Step through your code and watch how each operation affects your data
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-light to-primary-dark rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-background-light-primary/80 dark:bg-background-dark-primary/60 backdrop-blur-xl rounded-lg p-6 border border-primary-light/10">
              <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">
                Multiple Data Structures
              </h3>
              <p className="text-text-light-secondary dark:text-text-dark-secondary">
                Support for arrays, trees, graphs, linked lists, and more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;