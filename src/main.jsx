import React, { useEffect, useState, useRef } from 'react';

import { createRoot } from 'react-dom/client';

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

import { Play, Pause, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';

import './style.css';



const prompts = [

  { title: "Our Everyday Moments", q: "What is a simple, everyday ritual you’d love for us to share together?", options: ["Morning chai/coffee before the world wakes up", "Cooking a meal together while playing our favourite songs", "An evening walk just to talk about our day", "Cuddling up to watch a movie or read"] },

  { title: "Building Our Safe Space", q: "When you feel stressed or overwhelmed, how can I best make you feel safe and supported as your partner?", options: ["Just holding me close without saying a word", "Listening to me patiently while I vent", "Helping me out with small tasks to ease my burden", "Giving me a little quiet time, then bringing me a treat"] },

  { title: "Adventures Together", q: "When we plan our first big trip together, what kind of experience are you dreaming of?", options: ["A peaceful retreat in the mountains", "Exploring a vibrant, romantic city", "Relaxing by a quiet, beautiful beach", "A fun road trip with no strict plans"] },

  { title: "The Little Surprises", q: "What is a small gesture from a husband that would instantly make you feel incredibly loved and special?", options: ["A random sweet text message in the middle of the day", "Bringing home my favourite snack just because", "Planning a surprise date night for just the two of us", "Leaving a handwritten note for me to find"] },

  { title: "Growing Old Together", q: "When you imagine us 10 years from now, what is the one thing you hope is always present in our home?", options: ["Lots of laughter and playfulness", "Deep, unbreakable trust and open communication", "A sense of calm and a true safe haven", "A home that is always welcoming to family and friends"] },

  { title: "Our Shared Values", q: "What is the most important promise you'd want us to make to each other on our journey?", options: ["To always choose each other, even on difficult days", "To never go to sleep angry", "To keep our relationship full of respect and honesty", "To always support each other's personal dreams"] },

  { title: "Just For Fun", q: "If we were to get into a silly argument, how would we most likely resolve it?", options: ["By making a joke and bursting into laughter", "By hugging it out after a few quiet minutes", "By cooking something nice for each other", "By sitting down and calmly talking it through"] }

];



const photos = [

  'IMG-20260928-WA0006.jpg',

  'IMG-20260928-WA0016.jpg',

  'IMG-20260928-WA0017.jpg',

  'IMG-20260929-WA0019.jpg',

  'IMG-20261002-WA0004.jpg',

  'IMG-20261002-WA0005.jpg',

  'IMG-20261002-WA0018.jpg',

  'IMG-20261003-WA0034.jpg',

  'IMG-20261004-WA0003.jpg',

  'IMG-20261004-WA0005.jpg',

  'IMG-20261004-WA0007.jpg',

  'IMG-20261004-WA0010.jpg',

  'IMG-20261004-WA0011.jpg',

  'IMG-20261004-WA0012.jpg',

  'IMG-20261004-WA0018.jpg',

  'IMG-20261004-WA0019.jpg',

  'Screenshot_20261005_201739_Instagram.jpg',

  'file_00000000215481faa6e97fd66eda5a7c.png'

];



const photoQuotes = [

  'You feel like home.',

  'My favorite kind of forever.',

  'Your smile makes my day.',

  'I choose you, every day.',

  'My heart found its person.',

  'Ordinary days, brighter with you.',

  'You are my sweetest thought.',

  'A little closer, every day.',

  'My favorite hello, always.',

  'With you, life feels softer.',

  'Your laugh is my favorite song.',

  'Lucky heart. Lovely you.',

  'You make my world glow.',

  'My best days have you in them.',

  'Every moment, worth keeping.',

  'Home is wherever you are.',

  'All my tomorrows say your name.',

  'Still falling for you.'

];



const heroPhotos = [

  photos[0],

  photos[1],

  photos[4],

  photos[5],

  photos[6],

  photos[8],

  photos[11],

  photos[12],

  photos[14],

  photos[15]

];



const heartDrops = Array.from({ length: 18 }, (_, index) => ({

  id: `heart-${index}`,

  delay: Math.random() * 12,

  left: Math.random() * 100,

  duration: 11 + Math.random() * 9,

  size: 10 + Math.random() * 13

}));



const storySections = [

  {

    title: 'Maybe this is how our story begins…',

    paragraphs: [

      'One day, you’ll probably laugh at how carefully I tried to make everything perfect when we first met. And I’ll probably tell you, “I was nervous, you know,” even if I pretended I wasn’t.',

      'Behind all my confidence, there was one simple thought: What if she becomes the person I want beside me for the rest of my life?',

      'I don’t want our relationship to be just about becoming husband and wife. I want us to become best friends who happen to fall in love with each other every day.',

      'I want to know the version of you that everyone else sees—and, more importantly, the version of you that only comes out when you’re completely comfortable. Your silly side, your stubborn side, your sleepy side, your emotional side, and the side that needs reassurance or attention for absolutely no reason. I want all of it.'

    ]

  },

  {

    title: 'And lately… something has changed.',

    paragraphs: [

      'We’ve become closer—not just in conversations. There is more comfort, more affection, more emotion, and more of that feeling where sometimes we don’t even need to say much. Just being close feels enough. And honestly, I love that.',

      'I love that my attraction isn’t just about how beautiful you are—although you really are incredibly beautiful. It’s the way you look at me, the way you smile, and the little expressions you make without realizing it. Sometimes I find myself looking at you a little longer than I should.',

      'Being physically close to you makes everything around me feel quieter. I want those little moments: sitting beside you, holding your hand, pulling you a little closer, putting my arm around you while we watch something, and resting near you after a long day.',

      'Maybe one day you’ll be sitting beside me, leaning against me, completely comfortable. I’ll just smile, because the girl I once hoped might become part of my future is sitting right there beside me.'

    ]

  },

  {

    title: 'I don’t just want a marriage. I want a life.',

    paragraphs: [

      'Our life. Mornings where we’re both half asleep, arguing about who has to get up first. You stealing the blanket. Random late-night conversations that somehow last until 2 AM. Spontaneous drives, weekend breakfasts, grocery shopping together, and laughing at stupid things.',

      'I want us taking hundreds of photos and keeping only three. Celebrating birthdays, anniversaries, and the tiny achievements nobody else would understand.',

      'After a difficult day, I want home to feel like the place where both of us can finally breathe.'

    ]

  },

  {

    title: 'I want to take care of you.',

    paragraphs: [

      'Not because you can’t take care of yourself—you can. But loving someone means wanting to make their life a little easier.',

      'When you’re tired, I’ll be there. When you’re worried, I’ll listen. When you’re happy, I’ll celebrate with you. And when life becomes difficult, I don’t want us to become two people fighting against each other. I want us to become two people fighting the problem together.',

      'Your dreams will be yours. My dreams will be mine. And somehow, we’ll build a bigger dream called us.'

    ]

  },

  {

    title: 'And I want us to grow.',

    paragraphs: [

      'Maybe someday we’ll have our own home. We’ll choose things together—the furniture, the curtains, and the little decorations you insist we need. I’ll probably say, “We don’t need that.” You’ll probably buy it anyway, and six months later I’ll secretly admit you were right.',

      'We’ll have our favourite corner, our favourite restaurant, our favourite weekend place, and little traditions nobody else understands. Maybe we’ll travel, get lost somewhere, and talk about how different our lives were before we found each other.',

      'Maybe one day we’ll look back at these early days and laugh at how everything started.'

    ]

  },

  {

    title: 'And when life gets bigger…',

    paragraphs: [

      'Maybe there will be children running around our home, toys everywhere, and not enough sleep. Maybe we’ll look at each other at 3 AM and silently ask, “What have we done?” And then we’ll laugh, because somehow we’ll know we built something beautiful: a family, a home, a life.',

      'Not a perfect life. Our life.'

    ]

  },

  {

    title: 'There is something I want you to know.',

    paragraphs: [

      'I don’t want to love only the beautiful version of you. I want to love you on the days when you don’t feel beautiful, when you’re tired, frustrated, insecure, unsure what you want, or life isn’t going according to plan.',

      'Real love isn’t only about looking at someone and saying, “You’re beautiful.” It’s looking at them when life gets messy and saying, “I’m still here.”'

    ]

  },

  {

    title: 'If you ever ask, “What made you choose me?”',

    paragraphs: [

      'I don’t think I’ll have one perfect answer. Maybe it was your smile, your personality, the way you made me feel comfortable, or all those tiny things you did without realizing. Maybe it was the way our conversations slowly became something I started waiting for.',

      'Or maybe it was simply the feeling that grew between us. Sometimes the heart doesn’t give you a logical explanation. It just says, “I feel safe here.” That’s what I want us to become for each other: a safe place, a happy place, where we can be completely ourselves.'

    ]

  },

  {

    title: 'And one day…',

    paragraphs: [

      'I hope you’re sitting next to me, maybe with your head resting on my shoulder while I hold your hand, and we’re looking at the life we’ve built.',

      'I’ll remember this version of us: the beginning, the nervous conversations, the excitement, the attraction, the butterflies, and the moments when we were slowly discovering each other.',

      'And I’ll think, “I’m glad I didn’t know exactly how beautiful this story was going to become.” Because if I had known, I probably wouldn’t have believed it.'

    ]

  },

  {

    title: 'So, Neha…',

    paragraphs: [

      'I don’t want to promise you a life where nothing ever goes wrong. I can’t promise that. But I can promise something more real: I’ll keep choosing you, keep learning you, make space for your dreams, protect what we build together, find reasons to make you laugh, and hold your hand through difficult days.',

      'I want our love story to become more beautiful because we lived it. And if life gives us that chance, I want to build it with you: a home, a family, a thousand little memories, and a lifetime of ordinary days that somehow become extraordinary because we’re together.',

      'Maybe, years from now, you’ll sit beside me again. I’ll pull you a little closer and whisper, “Remember when I told you I wanted a beautiful life with you?” And you’ll smile, because we’ll already be living it.'

    ]

  }

];



function AudioPlayer({ title, src }) {

  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);



  const togglePlay = () => {

    if (audioRef.current) {

      if (isPlaying) {

        audioRef.current.pause();

      } else {

        audioRef.current.play().catch(e => console.log("Audio play failed. Ensure /song.mp3 exists."));

      }

      setIsPlaying(!isPlaying);

    }

  };



  return (

    <div className={`audio-player ${isPlaying ? 'is-playing' : ''}`}>

      <audio

        ref={audioRef}

        loop

        preload="none"

        src={src}

        onPlay={() => setIsPlaying(true)}

        onPause={() => setIsPlaying(false)}

        onEnded={() => setIsPlaying(false)}

      />

      <button onClick={togglePlay} className="play-btn">

        {isPlaying ? <Pause size={20} /> : <Play size={20} />}

        <span className="song-label"><strong>{title}</strong><small>{isPlaying ? 'Now playing' : 'Tap to play'}</small></span>

      </button>

    </div>

  );

}



const FallingHeart = ({ delay, left, duration, size }) => (

  <motion.div

    className="falling-heart"

    initial={{ y: '-10vh', x: 0, opacity: 0, rotate: -18, scale: 0.7 }}

    animate={{

      y: ['-10vh', '108vh'],

      x: [0, 18, -14, 24, 0],

      opacity: [0, 0.88, 0.72, 0.9, 0],

      rotate: [-18, 12, -9, 14, 35],

      scale: [0.7, 1, 0.86, 1.08, 0.72]

    }}

    transition={{

      duration: duration,

      repeat: Infinity,

      delay: delay,

      ease: "linear"

    }}

    style={{ left: `${left}%`, width: size, height: size }}

  >

    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path d="M12 21s-8.5-5.1-9.8-10.2C1.1 6.5 3.4 3.5 6.8 3.5c2.1 0 4 1.2 5.2 3 1.2-1.8 3.1-3 5.2-3 3.4 0 5.7 3 4.6 7.3C20.5 15.9 12 21 12 21Z" fill="#e86b7a" fillOpacity="0.72" />

    </svg>

  </motion.div>

);



function TeddyCompanion({ mood, position, carryingNo }) {
  const messages = {
    waiting: 'I’m waiting for you, Wifyyy… 🥺💗',
    walking: 'Tiny teddy steps with you ♡',
    affection: 'Come here… teddy hug + kiss! 💗',
    yes: 'YAAAAAY! My Wifyyy said YES! 💋💗'
  };

  const isSad = mood === 'waiting';
  const isHappy = mood === 'yes';
  const isHugging = mood === 'affection';

  return (
    <motion.aside
      className={`teddy-companion teddy-${mood} ${carryingNo ? 'teddy-carries-no' : ''}`}
      style={{
        left: `${position.left}%`,
        top: position.top === null ? 'auto' : `${position.top}%`,
        bottom: position.top === null ? 18 : 'auto'
      }}
      animate={
        mood === 'walking'
          ? { y: [0, -8, 0], rotate: [-2, 2, -2] }
          : mood === 'yes'
            ? { y: [0, -20, 0], rotate: [0, -5, 5, 0], scale: [1, 1.09, 1] }
            : mood === 'affection'
              ? { y: [0, -5, 0], scale: [1, 1.05, 1] }
              : { y: [0, -4, 0] }
      }
      transition={{
        duration: mood === 'walking' ? 0.42 : mood === 'yes' ? 0.8 : 1.8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      aria-label={`Teddy says: ${messages[mood] || messages.waiting}`}
      aria-live="polite"
    >
      <div className="teddy-speech">
        {carryingNo
          ? 'Hehe… Teddy stole the No button 😝💗'
          : messages[mood] || messages.waiting}
      </div>

      {carryingNo && <span className="teddy-carry-sign" aria-hidden="true">No 🙈</span>}

      <div className="cute-teddy" aria-hidden="true">
        <motion.div
          className="teddy-shadow"
          animate={{ scaleX: mood === 'walking' ? [1, .78, 1] : [1, .9, 1], opacity: [.22, .12, .22] }}
          transition={{ duration: mood === 'walking' ? .42 : 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <svg className="teddy-svg" viewBox="0 0 180 210" role="img" aria-hidden="true">
          <defs>
            <linearGradient id="pinkFur" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffc4d8" />
              <stop offset="55%" stopColor="#f59fbd" />
              <stop offset="100%" stopColor="#e979a2" />
            </linearGradient>
            <linearGradient id="whiteFur" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fff1f6" />
            </linearGradient>
            <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#d45e8f" floodOpacity=".22" />
            </filter>
          </defs>

          <motion.g
            className="teddy-ear-group teddy-ear-left-svg"
            animate={{ rotate: mood === 'walking' ? [-4, 4, -4] : [0, -2, 0] }}
            transition={{ duration: mood === 'walking' ? .42 : 2, repeat: Infinity }}
            style={{ transformOrigin: '47px 48px' }}
          >
            <circle cx="43" cy="42" r="27" fill="url(#pinkFur)" stroke="#d96994" strokeWidth="4" />
            <circle cx="43" cy="42" r="15" fill="#fff0f6" />
          </motion.g>
          <motion.g
            className="teddy-ear-group teddy-ear-right-svg"
            animate={{ rotate: mood === 'walking' ? [4, -4, 4] : [0, 2, 0] }}
            transition={{ duration: mood === 'walking' ? .42 : 2, repeat: Infinity }}
            style={{ transformOrigin: '133px 48px' }}
          >
            <circle cx="137" cy="42" r="27" fill="url(#pinkFur)" stroke="#d96994" strokeWidth="4" />
            <circle cx="137" cy="42" r="15" fill="#fff0f6" />
          </motion.g>

          <ellipse cx="90" cy="132" rx="56" ry="63" fill="url(#pinkFur)" stroke="#d96994" strokeWidth="4" filter="url(#softGlow)" />
          <ellipse cx="90" cy="142" rx="38" ry="46" fill="url(#whiteFur)" opacity=".98" />

          <motion.ellipse
            cx="39" cy="134" rx="20" ry="42" fill="url(#pinkFur)" stroke="#d96994" strokeWidth="4"
            animate={isHugging ? { rotate: [25, -18, 25], x: [0, 17, 0] } : mood === 'walking' ? { rotate: [25, 40, 25] } : { rotate: 24 }}
            transition={{ duration: isHugging ? .7 : .42, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '48px 116px' }}
          />
          <motion.ellipse
            cx="141" cy="134" rx="20" ry="42" fill="url(#pinkFur)" stroke="#d96994" strokeWidth="4"
            animate={isHugging ? { rotate: [-25, 18, -25], x: [0, -17, 0] } : mood === 'walking' ? { rotate: [-25, -40, -25] } : { rotate: -24 }}
            transition={{ duration: isHugging ? .7 : .42, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '132px 116px' }}
          />

          <ellipse cx="55" cy="188" rx="26" ry="18" fill="url(#pinkFur)" stroke="#d96994" strokeWidth="4" />
          <ellipse cx="125" cy="188" rx="26" ry="18" fill="url(#pinkFur)" stroke="#d96994" strokeWidth="4" />
          <ellipse cx="55" cy="189" rx="14" ry="9" fill="#fff0f6" />
          <ellipse cx="125" cy="189" rx="14" ry="9" fill="#fff0f6" />

          <ellipse cx="90" cy="80" rx="62" ry="58" fill="url(#pinkFur)" stroke="#d96994" strokeWidth="4" filter="url(#softGlow)" />
          <ellipse cx="90" cy="99" rx="38" ry="29" fill="url(#whiteFur)" />

          <motion.ellipse
            cx="66" cy="74" rx="5.5" ry="8" fill="#4a2b39"
            animate={{ scaleY: [1, 1, .12, 1, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, times: [0, .46, .49, .53, 1] }}
            style={{ transformOrigin: '66px 74px' }}
          />
          <motion.ellipse
            cx="114" cy="74" rx="5.5" ry="8" fill="#4a2b39"
            animate={{ scaleY: [1, 1, .12, 1, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, times: [0, .46, .49, .53, 1] }}
            style={{ transformOrigin: '114px 74px' }}
          />
          <circle cx="64" cy="71" r="1.8" fill="#fff" />
          <circle cx="112" cy="71" r="1.8" fill="#fff" />

          <ellipse cx="49" cy="91" rx="12" ry="6" fill="#ff8fb1" opacity=".5" />
          <ellipse cx="131" cy="91" rx="12" ry="6" fill="#ff8fb1" opacity=".5" />
          <path d="M84 92 Q90 86 96 92 Q90 99 84 92Z" fill="#8c4a63" />

          {isSad ? (
            <path d="M80 109 Q90 101 100 109" fill="none" stroke="#754052" strokeWidth="3.2" strokeLinecap="round" />
          ) : (
            <path d="M79 105 Q90 116 101 105" fill="none" stroke="#754052" strokeWidth="3.2" strokeLinecap="round" />
          )}

          <path d="M90 146 C72 129 57 147 65 160 C71 171 90 181 90 181 C90 181 109 171 115 160 C123 147 108 129 90 146Z" fill="#ff4f8a" />
          <text x="90" y="164" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">LOVE</text>

          {isSad && (
            <motion.path
              d="M125 83 C131 89 131 98 125 104 C119 98 119 89 125 83Z"
              fill="#8ed8ff"
              animate={{ y: [0, 8, 16], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </svg>

        {isHugging && (
          <>
            <motion.span className="teddy-float-heart heart-one" animate={{ y: [0, -42], x: [0, -12], opacity: [0, 1, 0], scale: [.7, 1.15, .8] }} transition={{ duration: 1.5, repeat: Infinity }}>💗</motion.span>
            <motion.span className="teddy-float-heart heart-two" animate={{ y: [0, -52], x: [0, 15], opacity: [0, 1, 0], scale: [.6, 1.1, .75] }} transition={{ duration: 1.8, repeat: Infinity, delay: .35 }}>💞</motion.span>
            <motion.span className="teddy-kiss-new" animate={{ x: [0, 30], y: [0, -30], opacity: [0, 1, 0], rotate: [0, 15, 25], scale: [.7, 1.2, 1] }} transition={{ duration: 1.35, repeat: Infinity }}>💋</motion.span>
          </>
        )}

        {isHappy && (
          <>
            <motion.span className="teddy-celebrate-new" animate={{ y: [0, -18, 0], scale: [.9, 1.15, .9] }} transition={{ duration: .8, repeat: Infinity }}>💗✨💋✨💗</motion.span>
            <motion.span className="teddy-kiss-new teddy-kiss-yes" animate={{ x: [0, 34], y: [0, -36], opacity: [0, 1, 0], scale: [.8, 1.3, 1] }} transition={{ duration: 1.1, repeat: Infinity }}>💋</motion.span>
          </>
        )}
      </div>
    </motion.aside>
  );
}

function App() {

  const [answers, setAnswers] = useState(Array(prompts.length).fill({ option: '', text: '' }));

  const [sending, setSending] = useState(false);

  const [sent, setSent] = useState(false);

  const [error, setError] = useState('');

  const [activePhoto, setActivePhoto] = useState(null);

  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0);

  const [scrollProgress, setScrollProgress] = useState(0);

  const [hasScrolled, setHasScrolled] = useState(false);

  const [teddyMood, setTeddyMood] = useState('waiting');

  const [proposalChoice, setProposalChoice] = useState('');

  const [proposalSending, setProposalSending] = useState(false);

  const [proposalSent, setProposalSent] = useState(false);

  const [proposalError, setProposalError] = useState('');

  const [teddyCarryingNo, setTeddyCarryingNo] = useState(false);

  const [teddyNoPosition, setTeddyNoPosition] = useState(null);

  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });

  const [noEscapeCount, setNoEscapeCount] = useState(0);

  const [proposalInView, setProposalInView] = useState(false);

  const noButtonRef = useRef(null);

  const inactivityTimer = useRef(null);

  const affectionResetTimer = useRef(null);

  const noEscapeTimer = useRef(null);

  const proposalRef = useRef(null);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });



  const updateOption = (i, v) => setAnswers(a => a.map((x, n) => n === i ? { ...x, option: v } : x));

  const updateText = (i, v) => setAnswers(a => a.map((x, n) => n === i ? { ...x, text: v } : x));



  useEffect(() => {

    const slideshow = window.setInterval(() => {

      setHeroPhotoIndex((index) => (index + 1) % heroPhotos.length);

    }, 3000);



    return () => window.clearInterval(slideshow);

  }, []);



  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0);
    };

    const startInactivityCountdown = () => {
      window.clearTimeout(inactivityTimer.current);
      window.clearTimeout(affectionResetTimer.current);

      inactivityTimer.current = window.setTimeout(() => {
        if (!proposalChoice && !proposalInView) {
          setTeddyMood('affection');
          affectionResetTimer.current = window.setTimeout(() => {
            setTeddyMood('waiting');
          }, 3200);
        }
      }, 10000);
    };

    const handleScroll = () => {
      updateProgress();
      setHasScrolled(true);

      if (!proposalChoice && !proposalInView) {
        setTeddyMood('walking');
      }

      startInactivityCountdown();
    };

    updateProgress();
    startInactivityCountdown();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
      window.clearTimeout(inactivityTimer.current);
      window.clearTimeout(affectionResetTimer.current);
    };
  }, [proposalChoice, proposalInView]);

  const atPageEnd = scrollProgress > .96;

  useEffect(() => {
    if (!proposalRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setProposalInView(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(proposalRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (proposalChoice === 'yes') {
      setTeddyMood('yes');
      return;
    }

    if (proposalInView && !proposalChoice) {
      setTeddyMood('waiting');
    }
  }, [proposalInView, proposalChoice]);

  useEffect(() => {

    if (activePhoto === null) return undefined;



    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {

      if (event.key === 'Escape') setActivePhoto(null);

      if (event.key === 'ArrowRight') setActivePhoto((index) => (index + 1) % photos.length);

      if (event.key === 'ArrowLeft') setActivePhoto((index) => (index - 1 + photos.length) % photos.length);

    };



    window.addEventListener('keydown', handleKeyDown);

    return () => {

      document.body.style.overflow = previousOverflow;

      window.removeEventListener('keydown', handleKeyDown);

    };

  }, [activePhoto]);

  async function submit(e) {

    e.preventDefault(); setSending(true); setError('');

    const data = new FormData();

    data.append('_subject', 'Neha’s answers — our future together');

    data.append('_template', 'table');

    data.append('_captcha', 'false');

    prompts.forEach((p, i) => {

      const selectedOption = answers[i].option || '(No option selected)';

      const extraThoughts = answers[i].text ? `\nThoughts: ${answers[i].text}` : '';

      data.append(p.title + ' — ' + p.q, selectedOption + extraThoughts);

    });

    if (proposalChoice) data.append('Marriage proposal answer', proposalChoice === 'yes' ? 'Yes — she said yes!' : 'No');



    try {

      const r = await fetch('https://formsubmit.co/ajax/akhilarya18@gmail.com', {

        method: 'POST',

        headers: { 'Accept': 'application/json' },

        body: data

      });

      if (!r.ok) throw new Error('Could not send right now. Please try again.');

      setSent(true);

    } catch (err) {

      setError('Your answers are still here. Please check your connection and try again, or send them to Hubby directly.');

    } finally {

      setSending(false);

    }

  }



  async function chooseProposal(choice) {
    if (choice !== 'yes') return;

    setProposalChoice('yes');
    setTeddyMood('yes');
    setProposalError('');
    setProposalSending(true);

    const data = new FormData();
    data.append('_subject', '💍 NEHA SAID YES!');
    data.append('_template', 'table');
    data.append('_captcha', 'false');
    data.append('Marriage proposal answer', 'YES 💍❤️ — Neha said yes!');
    data.append('Message', 'Wifyyy clicked YES on the proposal website 💖');

    try {
      const response = await fetch('https://formsubmit.co/ajax/akhilarya18@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      });

      if (!response.ok) throw new Error('Could not send the answer right now.');
      setProposalSent(true);
    } catch {
      setProposalError('The YES happened 💖, but the email did not send. Tap below to try again.');
    } finally {
      setProposalSending(false);
    }
  }

  async function resendProposalYes() {

    setProposalChoice('');

    await chooseProposal('yes');

  }



  function runAwayWithNo(event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (proposalChoice) return;

    const button = noButtonRef.current;
    const bounds = button?.getBoundingClientRect();

    const maxX = Math.max(90, window.innerWidth * 0.32);
    const maxY = Math.max(70, window.innerHeight * 0.2);
    const direction = noEscapeCount % 2 === 0 ? 1 : -1;

    let x = direction * (90 + Math.random() * maxX);
    let y = (Math.random() - 0.5) * maxY * 2;

    if (window.innerWidth < 700) {
      x = direction * (55 + Math.random() * 90);
      y = (Math.random() - 0.5) * 120;
    }

    setNoButtonOffset({ x, y });
    setNoEscapeCount((count) => count + 1);

    if (bounds) {
      setTeddyNoPosition({
        left: Math.max(10, Math.min(88, ((bounds.left + bounds.width / 2) / window.innerWidth) * 100)),
        top: Math.max(10, Math.min(76, ((bounds.top - 135) / window.innerHeight) * 100))
      });
    }

    setTeddyCarryingNo(true);
    window.clearTimeout(noEscapeTimer.current);
    noEscapeTimer.current = window.setTimeout(() => {
      setTeddyCarryingNo(false);
      setTeddyNoPosition(null);
    }, 1700);
  }

  const petals = heartDrops.map(({ id, delay, left, duration, size }) => (

    <FallingHeart

      key={id}

      delay={delay}

      left={left}

      duration={duration}

      size={size}

    />

  ));



  return (

    <main>
      <style>{`
        .teddy-companion{position:fixed;z-index:1200;transform:translateX(-50%);width:150px;pointer-events:none;transition:left .55s cubic-bezier(.2,.8,.2,1),top .55s cubic-bezier(.2,.8,.2,1),bottom .55s;filter:drop-shadow(0 18px 30px rgba(214,82,130,.16))}
        .teddy-speech{position:absolute;left:50%;bottom:205px;transform:translateX(-50%);width:max-content;max-width:245px;padding:10px 14px;border-radius:18px;background:rgba(255,255,255,.96);border:1px solid rgba(238,121,164,.28);font-size:12px;font-weight:800;color:#a14367;text-align:center;box-shadow:0 12px 28px rgba(166,64,103,.14);backdrop-filter:blur(8px)}
        .teddy-speech:after{content:"";position:absolute;left:50%;bottom:-7px;width:14px;height:14px;background:#fff;border-right:1px solid rgba(238,121,164,.25);border-bottom:1px solid rgba(238,121,164,.25);transform:translateX(-50%) rotate(45deg)}
        .cute-teddy{position:relative;width:150px;height:205px;margin:auto;transform-origin:center bottom}
        .teddy-svg{display:block;width:150px;height:175px;overflow:visible}
        .teddy-shadow{position:absolute;left:31px;bottom:7px;width:88px;height:18px;border-radius:50%;background:rgba(179,79,117,.24);filter:blur(4px)}
        .teddy-carry-sign{position:absolute;z-index:12;right:-26px;top:112px;background:linear-gradient(180deg,#fff,#fff1f6);border:2px solid #ef7aa6;border-radius:14px;padding:7px 12px;color:#c53f70;font-weight:950;box-shadow:0 9px 20px rgba(197,63,112,.18);transform:rotate(10deg);font-size:13px}
        .teddy-float-heart,.teddy-kiss-new,.teddy-celebrate-new{position:absolute;z-index:14;pointer-events:none;filter:drop-shadow(0 4px 7px rgba(207,70,119,.18))}
        .teddy-float-heart{font-size:25px}.heart-one{left:12px;top:62px}.heart-two{right:10px;top:75px}
        .teddy-kiss-new{right:-4px;top:62px;font-size:31px}.teddy-kiss-yes{right:-7px;top:54px;font-size:36px}
        .teddy-celebrate-new{left:50%;top:-28px;transform:translateX(-50%);font-size:22px;white-space:nowrap}
        .teddy-walking .cute-teddy{animation:teddyWalkSquish .42s ease-in-out infinite}
        .teddy-affection .cute-teddy{animation:teddyHugBounce .72s ease-in-out infinite}
        .teddy-yes .cute-teddy{animation:teddyHappySquish .8s ease-in-out infinite}
        .teddy-waiting .cute-teddy{animation:teddySadBreath 2.2s ease-in-out infinite}
        @keyframes teddyWalkSquish{0%,100%{transform:scaleX(1) scaleY(1)}50%{transform:scaleX(1.035) scaleY(.975)}}
        @keyframes teddyHugBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}
        @keyframes teddyHappySquish{0%,100%{transform:scale(1) rotate(0)}25%{transform:scale(1.045) rotate(-2deg)}75%{transform:scale(1.045) rotate(2deg)}}
        @keyframes teddySadBreath{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(3px) scale(.985)}}
        .proposal-no{transform:translate(var(--no-x),var(--no-y));transition:transform .22s cubic-bezier(.18,.89,.32,1.28)}
        @media(max-width:700px){.teddy-companion{width:124px;transform:translateX(-50%) scale(.82);transform-origin:center bottom}.teddy-speech{max-width:205px;font-size:11px;bottom:190px}.cute-teddy{width:145px}.teddy-svg{width:145px}}
      `}</style>

      <motion.div className="progress-bar" style={{ scaleX }} />

      <div className="music-players" aria-label="Love songs">

        <AudioPlayer title="Hubby song" src="/song.mp3" />

        <AudioPlayer title="Wifyyy song" src="/wifyyy-song.mp3" />

      </div>

      <div className="petals-container">

        {petals}

      </div>



      <section className="hero cinematic-bg">

        <div className="couple-signature" aria-label="Akhil loves Neha">Akhil <span>♡</span> Neha</div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="portrait-container">

          <div className="portrait">

            <AnimatePresence mode="sync" initial={false}>

              <motion.img

                key={heroPhotos[heroPhotoIndex]}

                src={`/photos/${heroPhotos[heroPhotoIndex]}`}

                alt={`Neha — photo ${heroPhotoIndex + 1} of ${heroPhotos.length}`}

                initial={{ opacity: 0, scale: 1.045 }}

                animate={{ opacity: 1, scale: 1 }}

                exit={{ opacity: 0, scale: 0.99 }}

                transition={{ opacity: { duration: 0.9, ease: 'easeInOut' }, scale: { duration: 3.2, ease: 'linear' } }}

                fetchPriority="high"

              />

            </AnimatePresence>

          </div>

          <div className="portrait-note"><span className="heart-beat">♡</span><span>My favourite person</span></div>

          <div className="portrait-stamp">for<br />Neha</div>

          <div className="portrait-caption">A new reason to smile every 3 seconds</div>

        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="hero-copy">

          <div className="eyebrow glossy-badge">A love note from your future hubby</div>

          <h1 className="romantic-title">Your Future<br /><em>Hubby</em></h1>

          <p className="hero-sub">Neha, as your future hubby, I want to be the one who keeps you laughing, listens to every little story, and makes you feel safe to be entirely yourself. You’re already woven into the future I hope to build—with patience, laughter, and a whole lot of love.</p>

          <a className="scroll" href="#first">A little love letter, from me to you <span>↓</span></a>

        </motion.div>

      </section>



      {activePhoto !== null && (

        <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePhoto(null)} role="presentation">

          <button className="lightbox-close" type="button" onClick={() => setActivePhoto(null)} aria-label="Close photo viewer"><X size={24} /></button>

          <button className="lightbox-arrow lightbox-previous" type="button" onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto - 1 + photos.length) % photos.length); }} aria-label="Previous photo"><ChevronLeft size={30} /></button>

          <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}>

            <img src={`/photos/${photos[activePhoto]}`} alt={`Neha — memory ${activePhoto + 1}`} />

            <figcaption><span>A little moment to keep</span><span>{String(activePhoto + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span></figcaption>

          </figure>

          <button className="lightbox-arrow lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto + 1) % photos.length); }} aria-label="Next photo"><ChevronRight size={30} /></button>

        </motion.div>

      )}



      <motion.section id="first" className="letter section photo-story" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>

        <div className="letter-bg"></div>

        <div className="story-intro glossy-card">

          <div className="wax-seal">

            <Heart size={20} fill="#fff" color="#fff" />

          </div>

          <div className="kicker">01 · Our story</div>

          <h2>The Life I Want<br /><i>to Build With You</i></h2>

          <div className="letter-body story-opening">

            <p>There was a time when you were just a name I was going to meet. And then somehow, you became someone I started looking forward to—someone whose messages could change my mood and whose smile could stay in my mind long after our conversation ended.</p>

            <p>I slowly started feeling closer to you, not just with my words, but with my heart. Somewhere between all those conversations, laughs, little arguments, caring moments, and endless thoughts about you, <strong>you became special to me.</strong></p>

            <p>Not suddenly. Not because I decided you should be. It happened naturally, little by little. And now, when I think about my future, I don’t just imagine a house, a career, holidays, or a successful life. I imagine <strong>you somewhere in all of it.</strong></p>

          </div>

        </div>

        <div className="story-flow">

          {storySections.map((section, index) => {

            const firstPhoto = index < 8 ? index * 2 : 16 + (index - 8);

            const secondPhoto = index < 8 ? firstPhoto + 1 : null;

            return (

              <article className={`story-spread ${index % 2 ? 'photo-left' : 'photo-right'}`} key={section.title}>

                <button className="story-photo story-photo-primary" type="button" onClick={() => setActivePhoto(firstPhoto)} aria-label={`Open photo ${firstPhoto + 1} of ${photos.length}`}>

                  <img src={`/photos/${photos[firstPhoto]}`} alt={`Neha — memory ${firstPhoto + 1}`} loading="lazy" />

                  <span className="story-photo-quote">{photoQuotes[firstPhoto]} <i>♡</i></span>

                </button>

                <div

                  className="story-chapter glossy-card"

                  style={{ '--memory-background': `url("/photos/${photos[firstPhoto]}")` }}

                >

                  <div className="chapter-number">A little memory · {String(index + 1).padStart(2, '0')}</div>

                  <h3>{section.title}</h3>

                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

                </div>

                {secondPhoto !== null ? (

                  <button className="story-photo story-photo-secondary" type="button" onClick={() => setActivePhoto(secondPhoto)} aria-label={`Open photo ${secondPhoto + 1} of ${photos.length}`}>

                    <img src={`/photos/${photos[secondPhoto]}`} alt={`Neha — memory ${secondPhoto + 1}`} loading="lazy" />

                    <span className="story-photo-quote">{photoQuotes[secondPhoto]} <i>♡</i></span>

                  </button>

                ) : <div className="story-photo-spacer" />}

              </article>

            );

          })}

        </div>

        <div className="story-signoff glossy-card">

          <div className="divider">✧   ✧   ✧</div>

          <p className="sign">With all my love,<br /><b>Your Future Hubby</b> <span className="heart-beat">♡</span></p>

        </div>

      </motion.section>



      <motion.section className="questions section" id="questions" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>

        <div className="kicker">02 · Your turn, Neha</div>

        <h2>May I get to know<br /><i>your little world?</i></h2>

        <p className="intro">These aren’t a test or a checklist. They’re gentle conversation starters. Answer only what feels comfortable.</p>

        <form onSubmit={submit} className="glossy-form">

          {prompts.map((p, i) => (

            <motion.article whileHover={{ scale: 1.01 }} className="question-card glossy-card q-card" key={p.title}>

              <div className="q-number">0{i + 1}</div>

              <div className="q-content">

                <div className="q-title">{p.title}</div>

                <h3>{p.q}</h3>

                <div className="options-grid">

                  {p.options.map(opt => (

                    <label key={opt} className={`option-btn ${answers[i].option === opt ? 'selected' : ''}`}>

                      <input

                        type="radio"

                        name={`q-${i}`}

                        value={opt}

                        checked={answers[i].option === opt}

                        onChange={(e) => updateOption(i, e.target.value)}

                      />

                      {opt}

                    </label>

                  ))}

                </div>

                <textarea

                  className="glossy-input mt-2"

                  rows="2"

                  placeholder="Any extra thoughts you'd like to share? (optional)"

                  value={answers[i].text}

                  onChange={(e) => updateText(i, e.target.value)}

                />

              </div>

            </motion.article>

          ))}

          <div className="privacy">Your answers are sent to Hubby’s email when you press send. Please don’t include anything private that you wouldn’t want to share.</div>

          {sent ? <div className="success glossy-success">Thank you for sharing a little of your world, Neha. ♡</div> : <button className="send glossy-btn" disabled={sending}>{sending ? 'Sending…' : 'Send my answers with a little ♡'}</button>}

          {error && <p className="error">{error}</p>}

        </form>

      </motion.section>



      <section ref={proposalRef} className="proposal-section" id="proposal" aria-labelledby="proposal-title">

        <div className="proposal-card glossy-card">

          <div className="proposal-kicker">One little question, with all my heart</div>

          <h2 id="proposal-title">Will You Marry Me, Wifyyy? 💍</h2>

          <p>One tiny question from my whole heart… ♡</p>

          {proposalChoice ? (

            <div className={`proposal-response proposal-${proposalChoice}`} role="status">

              {proposalChoice === 'yes'

                ? 'You just made my whole world sparkle! I love you, Wifyyy! ♡'

                : 'I understand, Wifyyy. There’s no pressure—I respect your feelings and your answer. ♡'}

            </div>

          ) : (

            <div className="proposal-actions">

              <button className="proposal-yes" type="button" onClick={() => chooseProposal('yes')} disabled={proposalSending}>

                {proposalSending ? 'Sending your yes…' : 'Yes! ♡'}

              </button>

              <button

                ref={noButtonRef}

                className="proposal-no"

                type="button"

                onPointerEnter={runAwayWithNo}
                onPointerDown={runAwayWithNo}

                onClick={runAwayWithNo}

                style={{ '--no-x': `${noButtonOffset.x}px`, '--no-y': `${noButtonOffset.y}px` }}

                aria-label="No 🙈"

              >

                No 🙈

              </button>

            </div>

          )}

          {proposalSent && <p className="proposal-mail-status">Your answer was sent to Hubby’s email. 💌</p>}

          {proposalError && <div className="proposal-mail-error"><p>{proposalError}</p><button type="button" onClick={resendProposalYes} disabled={proposalSending}>Try sending again</button></div>}

        </div>

      </section>

      <footer>

        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} className="footer-heart heart-beat">♡</motion.div>

        <div>Here’s to the life we’ll build together.</div>

        <span>Made with love by Hubby · for Neha ♡</span>

      </footer>

      <TeddyCompanion

        mood={teddyMood}

        position={teddyCarryingNo && teddyNoPosition
          ? teddyNoPosition
          : proposalInView || atPageEnd
            ? { left: 50, top: null }
            : hasScrolled
              ? {
                left: Math.max(9, Math.min(91, 50 + Math.sin(scrollProgress * Math.PI * 4) * 38)),
                top: Math.max(14, Math.min(76, 74 - scrollProgress * 47))
              }
              : { left: 50, top: null }}
        carryingNo={teddyCarryingNo}

      />

    </main>

  );

}



createRoot(document.getElementById('root')).render(<App />);
