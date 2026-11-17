const glyphs: Record<string, string> = {
  A: 'M5 95 L45 5 Q50 -4 55 5 L95 95 M24 61 H76',
  D: 'M9 5 H45 C112 5 112 95 45 95 H9 M9 25 V75',
  I: 'M50 5 V95',
  T: 'M5 5 H95 M50 25 V95',
  Y: 'M5 5 L50 52 L95 5 M50 52 V95',
  S: 'M91 15 C67 -5 10 0 10 28 C10 57 90 43 90 73 C90 102 29 106 7 85',
  N: 'M8 95 V8 Q8 0 14 8 L86 92 Q92 100 92 92 V5',
  G: 'M91 20 C62 -12 6 2 6 50 C6 98 61 111 93 83 V57 H61',
  H: 'M8 5 V95 M92 5 V95 M28 50 H72',
};
export default function DuneName() {
  return <h1 className="dune-name" aria-label="Aditya Singh">
    <svg viewBox="0 0 910 245" fill="none" aria-hidden="true" className="name-lettering">
      <defs><linearGradient id="name-metal" x1="0" y1="0" x2="0" y2="245" gradientUnits="userSpaceOnUse"><stop stopColor="#fff1ce"/><stop offset=".45" stopColor="#dfb777"/><stop offset="1" stopColor="#f6dfad"/></linearGradient></defs>
      <g stroke="url(#name-metal)" strokeWidth="5.5" strokeLinecap="square" strokeLinejoin="round">
        {'ADITYA'.split('').map((letter,i)=><path key={i} d={glyphs[letter]} transform={`translate(${i*150+30} 4)`}/>)}
        {'SINGH'.split('').map((letter,i)=><path key={i} d={glyphs[letter]} transform={`translate(${i*150+105} 140)`}/>)}
      </g>
      <circle cx="230" cy="54" r="3" fill="#eac17e"/><path d="M2 122 H910" stroke="#d4aa65" opacity=".22"/>
    </svg>
  </h1>;
}
