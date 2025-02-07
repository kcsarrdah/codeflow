import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, BookOpen, Code2, ListTodo } from 'lucide-react';
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

function Landing() {
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-sky-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800">
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
              value: "#0ea5e9",
            },
            links: {
              color: "#0ea5e9",
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
              value: 100,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-96 bg-sky-500/5 dark:bg-sky-400/5 blur-3xl" />

      <div className="relative z-10 text-center px-4">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-sky-400/20 rounded-full" />
            <Code2 className="relative w-20 h-20 text-sky-500 dark:text-sky-400" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          CodeFlow
        </h1>
        <p className="text-xl text-gray-600 dark:text-sky-100/80 mb-12 max-w-2xl mx-auto">
          Your one-stop solution for mastering Data Structures and Algorithms through interactive visualization.
          Learn, debug, and understand complex code with our powerful visual tools.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/debugger')}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-sky-500 text-white hover:bg-sky-600 dark:hover:bg-sky-400 transition-all font-semibold shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Debugging
          </button>
          <button
            onClick={() => navigate('/data-structures')}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-white/80 dark:bg-gray-900/50 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-gray-900/70 transition-all font-semibold shadow-lg hover:shadow-sky-500/10 border border-sky-500/30 hover:-translate-y-0.5"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Explore Data Structures
          </button>
          <button
            onClick={() => navigate('/problems')}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-white/80 dark:bg-gray-900/50 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-gray-900/70 transition-all font-semibold shadow-lg hover:shadow-sky-500/10 border border-sky-500/30 hover:-translate-y-0.5"
          >
            <ListTodo className="w-5 h-5 mr-2" />
            Practice Problems
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl rounded-lg p-6 border border-sky-500/10">
              <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-2">
                Visual Learning
              </h3>
              <p className="text-gray-600 dark:text-sky-100/70">
                See your algorithms and data structures come to life with real-time visualization
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl rounded-lg p-6 border border-sky-500/10">
              <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-2">
                Interactive Debugging
              </h3>
              <p className="text-gray-600 dark:text-sky-100/70">
                Step through your code and watch how each operation affects your data
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl rounded-lg p-6 border border-sky-500/10">
              <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-2">
                Multiple Data Structures
              </h3>
              <p className="text-gray-600 dark:text-sky-100/70">
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