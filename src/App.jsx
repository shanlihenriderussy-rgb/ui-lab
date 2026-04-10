import { useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { X } from 'lucide-react'

// Animation JSON inline simple - Spinner bleu
const successAnimation = {
  v: '5.5.7',
  fr: 60,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: 'Loading',
  ddd: 0,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: 'Ring',
    sr: 1,
    ks: {
      o: { a: 0, k: 100, ix: 11 },
      r: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] }, { t: 60, s: [360] }], ix: 10 },
      p: { a: 0, k: [100, 100, 0], ix: 2 },
      a: { a: 0, k: [0, 0, 0], ix: 1 },
      s: { a: 0, k: [100, 100, 100], ix: 6 }
    },
    ao: 0,
    shapes: [{
      ty: 'gr',
      it: [
        {
          d: 1,
          ty: 'el',
          s: { a: 0, k: [80, 80], ix: 2 },
          p: { a: 0, k: [0, 0], ix: 3 },
          nm: 'Ellipse Path 1',
          hd: false
        },
        {
          ty: 'st',
          c: { a: 0, k: [0.1, 0.3, 0.6, 1], ix: 3 },
          o: { a: 0, k: 100, ix: 4 },
          w: { a: 0, k: 8, ix: 5 },
          lc: 2,
          lj: 2,
          ml: 4,
          d: [{
            n: 'd',
            nm: 'dash',
            v: { a: 0, k: 60, ix: 1 }
          }, {
            n: 'g',
            nm: 'gap',
            v: { a: 0, k: 140, ix: 2 }
          }],
          nm: 'Stroke 1',
          hd: false
        },
        {
          ty: 'tr',
          p: { a: 0, k: [0, 0], ix: 2 },
          a: { a: 0, k: [0, 0], ix: 1 },
          s: { a: 0, k: [100, 100], ix: 3 },
          r: { a: 0, k: 0, ix: 6 },
          o: { a: 0, k: 100, ix: 7 },
          sk: { a: 0, k: 0, ix: 4 },
          sa: { a: 0, k: 0, ix: 5 },
          nm: 'Transform'
        }
      ],
      nm: 'Group 1'
    }],
    ip: 0,
    op: 60,
    st: 0,
    bm: 0
  }]
}

const ProjectModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Fermer"
        >
          <X size={24} />
        </button>
        <div className="w-48 h-48 mx-auto">
          <Player 
            src={successAnimation}
            autoplay
            loop
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <p className="text-center text-blue-800 font-semibold mt-4">
          Projets en cours de chargement...
        </p>
      </div>
    </div>
  );
};

function App() {
  const [showAnimation, setShowAnimation] = useState(false)

  const handleButtonClick = () => {
    setShowAnimation(true)
  }

  const closeAnimation = () => {
    setShowAnimation(false)
  }

  return (
    <section className="min-h-screen bg-slate-50 flex items-center">
      <div className="container mx-auto px-6 lg:px-16 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image à gauche */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=700&fit=crop"
              alt="Designer créatif travaillant sur une interface"
              className="w-full h-[400px] lg:h-[550px] object-cover rounded-2xl shadow-2xl"
            />
          </div>

          {/* Contenu à droite */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-sm font-medium text-blue-800 uppercase tracking-wider mb-4">
              Designer Créatif
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Hello, je suis<br />
              <span className="text-blue-800">Shan li</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto lg:mx-0">
              Je crée des expériences visuelles uniques et mémorables. 
              Spécialisé en design UI/UX, branding et direction artistique.
            </p>
            <button 
              onClick={handleButtonClick}
              className="px-8 py-4 bg-blue-800 text-white font-semibold rounded-full hover:bg-blue-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Voir mes projets
            </button>
          </div>
        </div>
      </div>

      <ProjectModal 
        isOpen={showAnimation} 
        onClose={closeAnimation} 
      />
    </section>
  )
}

export default App
