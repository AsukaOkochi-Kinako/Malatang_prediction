// =============================================================
// 具材データベース
// =============================================================
const PRICE_PER_GRAM = 4; // 400円 / 100g
const NOODLE_THRESHOLD = 1000;

const ingredients = [
  // ─── 野菜 ─── tags: healthy=低カロリー系, hearty=ボリューム系, any=どれでも合う
  { id:'lettuce',    name:'レタス',      weight:25, cat:'veggie', color:'#52B788', texture:'シャキシャキ🥬', popular:false, tags:['healthy','any'] },
  { id:'spinach',    name:'ほうれん草',  weight:30, cat:'veggie', color:'#2D8653', texture:'やわらか🌿',    popular:false, tags:['healthy','any'] },
  { id:'enoki',      name:'えのき',      weight:30, cat:'veggie', color:'#E9C46A', texture:'つるつる🍄',    popular:true,  tags:['healthy','any'] },
  { id:'kikurage',   name:'きくらげ',    weight:25, cat:'veggie', color:'#6D4C41', texture:'こりこり🍄',    popular:true,  tags:['healthy','any'] },
  { id:'moyashi',    name:'もやし',      weight:35, cat:'veggie', color:'#A8D5A2', texture:'シャキシャキ🌱', popular:false, tags:['healthy','any'] },
  { id:'hakusai',    name:'白菜',        weight:35, cat:'veggie', color:'#81C784', texture:'やわらかほっこり🥬', popular:false, tags:['healthy','any'] },
  { id:'konjac',     name:'こんにゃく',  weight:45, cat:'veggie', color:'#9575CD', texture:'ぷるぷる🟣',    popular:false, tags:['healthy','hearty'] },
  { id:'potato',     name:'じゃがいも',  weight:40, cat:'veggie', color:'#D4A259', texture:'ほくほく🥔',    popular:true,  tags:['hearty','any'] },
  { id:'renkon',     name:'れんこん',    weight:35, cat:'veggie', color:'#EF9A9A', texture:'シャキシャキ🪷', popular:true,  tags:['healthy','any'] },
  { id:'bokchoy',    name:'チンゲン菜',  weight:30, cat:'veggie', color:'#43A047', texture:'シャキッ！🥦',  popular:false, tags:['healthy','any'] },
  { id:'yuba',       name:'ゆば',        weight:25, cat:'veggie', color:'#FFF176', texture:'とろとろ🌟',    popular:true,  tags:['healthy','any'] },
  // ─── 肉・海鮮 ───
  { id:'beef',       name:'牛肉',        weight:45, cat:'meat',   color:'#EF5350', texture:'やわらかうまみ🥩', popular:true,  tags:['protein','hearty'] },
  { id:'pork',       name:'豚肉',        weight:45, cat:'meat',   color:'#FF8A65', texture:'ジューシー🥩',  popular:false, tags:['protein','hearty'] },
  { id:'lamb',       name:'ラム肉',      weight:40, cat:'meat',   color:'#CE93D8', texture:'風味豊か🐑',    popular:false, tags:['protein'] },
  { id:'chicken',    name:'鶏もも肉',    weight:50, cat:'meat',   color:'#FFD54F', texture:'あっさり美味🍗', popular:false, tags:['protein'] },
  { id:'gyusuji',    name:'牛スジ',      weight:55, cat:'meat',   color:'#A1887F', texture:'とろとろコラーゲン✨', popular:true,  tags:['protein','hearty'] },
  // ─── 団子・練り物 ───
  { id:'crab',       name:'蟹団子',      weight:30, cat:'dango',  color:'#FF7043', texture:'濃厚カニ風味🦀', popular:true,  tags:['protein','hearty'] },
  { id:'fish',       name:'魚団子',      weight:25, cat:'dango',  color:'#64B5F6', texture:'ぷりぷり🐟',    popular:false, tags:['protein','any'] },
  { id:'lobster',    name:'ロブスター団子', weight:35, cat:'dango', color:'#FF5252', texture:'高級感たっぷり🦞', popular:true,  tags:['protein','hearty'] },
  { id:'chikuwa',    name:'ちくわ',      weight:30, cat:'dango',  color:'#FFB74D', texture:'もちもちほくほく🟡', popular:false, tags:['hearty','any'] },
  { id:'gyoza',      name:'水餃子',      weight:40, cat:'dango',  color:'#AED581', texture:'もちっ！🥟',    popular:true,  tags:['hearty'] },
  // ─── 豆腐・卵 ───
  { id:'aburaage',   name:'厚揚げ',      weight:45, cat:'tofu',   color:'#FFA726', texture:'じゅわっとスープ吸い込む', popular:true,  tags:['hearty','any'] },
  { id:'frozentofu', name:'冷凍豆腐',    weight:40, cat:'tofu',   color:'#90A4AE', texture:'スポンジ食感⬜', popular:false, tags:['healthy','any'] },
  { id:'uzura',      name:'うずらの卵',  weight:20, cat:'tofu',   color:'#FFF176', texture:'つるんまろやか🥚', popular:true,  tags:['protein','any'] },
  { id:'mochi',      name:'もち',        weight:35, cat:'tofu',   color:'#F48FB1', texture:'のびのびやわやわ🍡', popular:true,  tags:['hearty'] },
];

// =============================================================
// SVG キャラクター
// =============================================================
function svgVeggie(body='#A8D5A2', leaf='#52B788') {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="37" cy="23" rx="12" ry="17" fill="${leaf}" opacity="0.9" transform="rotate(-22 37 23)"/>
    <ellipse cx="63" cy="21" rx="10" ry="15" fill="${body}" opacity="0.85" transform="rotate(18 63 21)"/>
    <path d="M37 32 L50 56" stroke="${leaf}" stroke-width="2" opacity="0.5"/>
    <path d="M60 29 L50 56" stroke="${body}" stroke-width="2" opacity="0.5"/>
    <circle cx="50" cy="63" r="26" fill="${body}" stroke="${leaf}" stroke-width="2.5"/>
    <ellipse cx="39" cy="53" rx="9" ry="6" fill="white" opacity="0.18" transform="rotate(-20 39 53)"/>
    <circle cx="42" cy="61" r="4.2" fill="#1A1A2E"/>
    <circle cx="58" cy="61" r="4.2" fill="#1A1A2E"/>
    <circle cx="43.5" cy="59.5" r="1.6" fill="white"/>
    <circle cx="59.5" cy="59.5" r="1.6" fill="white"/>
    <path d="M42 71 Q50 78 58 71" stroke="#1A1A2E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="66" rx="6" ry="3.5" fill="#FFB3BA" opacity="0.6"/>
    <ellipse cx="65" cy="66" rx="6" ry="3.5" fill="#FFB3BA" opacity="0.6"/>
  </svg>`;
}

function svgMeat(body='#FFAB91', stripe='#EF9A9A') {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="58" rx="35" ry="24" fill="${body}" stroke="${stripe}" stroke-width="2.5"/>
    <path d="M22 50 Q35 46 48 52 Q61 58 78 50" stroke="white" stroke-width="2" fill="none" opacity="0.38"/>
    <path d="M24 62 Q38 58 52 64 Q66 68 78 62" stroke="white" stroke-width="1.5" fill="none" opacity="0.28"/>
    <ellipse cx="34" cy="47" rx="10" ry="7" fill="white" opacity="0.18" transform="rotate(-15 34 47)"/>
    <circle cx="42" cy="55" r="4.5" fill="#1A1A2E"/>
    <circle cx="58" cy="55" r="4.5" fill="#1A1A2E"/>
    <circle cx="43.5" cy="53.5" r="1.7" fill="white"/>
    <circle cx="59.5" cy="53.5" r="1.7" fill="white"/>
    <path d="M42 66 Q50 73 58 66" stroke="#1A1A2E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="61" rx="6" ry="3.5" fill="#FF8A80" opacity="0.5"/>
    <ellipse cx="66" cy="61" rx="6" ry="3.5" fill="#FF8A80" opacity="0.5"/>
  </svg>`;
}

function svgDango(body='#FF8C42', glow='#E67E22') {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="26" font-size="13" fill="#FFD60A" opacity="0.9">✦</text>
    <text x="76" y="22" font-size="10" fill="#FFD60A" opacity="0.8">✦</text>
    <text x="80" y="76" font-size="9"  fill="#F4A261" opacity="0.7">✦</text>
    <circle cx="50" cy="58" r="30" fill="${body}" stroke="${glow}" stroke-width="2.5"/>
    <ellipse cx="36" cy="44" rx="11" ry="9" fill="white" opacity="0.28" transform="rotate(-20 36 44)"/>
    <circle cx="42" cy="56" r="4.5" fill="#1A1A2E"/>
    <circle cx="58" cy="56" r="4.5" fill="#1A1A2E"/>
    <circle cx="43.5" cy="54.5" r="1.7" fill="white"/>
    <circle cx="59.5" cy="54.5" r="1.7" fill="white"/>
    <path d="M40 67 Q50 76 60 67" stroke="#1A1A2E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="61" rx="6.5" ry="3.8" fill="#FF6B6B" opacity="0.42"/>
    <ellipse cx="66" cy="61" rx="6.5" ry="3.8" fill="#FF6B6B" opacity="0.42"/>
  </svg>`;
}

function svgTofu(body='#F5F5F5', edge='#BDBDBD', top='#D4A574') {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M36 22 Q33 14 36 8"  stroke="#BDBDBD" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.65"/>
    <path d="M50 19 Q47 11 50 5"  stroke="#BDBDBD" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.65"/>
    <path d="M64 22 Q61 14 64 8"  stroke="#BDBDBD" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.65"/>
    <rect x="17" y="30" width="66" height="55" rx="11" fill="${body}" stroke="${edge}" stroke-width="2.5"/>
    <rect x="17" y="30" width="66" height="13" rx="9" fill="${top}"/>
    <circle cx="42" cy="63" r="4.5" fill="#1A1A2E"/>
    <circle cx="58" cy="63" r="4.5" fill="#1A1A2E"/>
    <circle cx="43.5" cy="61.5" r="1.7" fill="white"/>
    <circle cx="59.5" cy="61.5" r="1.7" fill="white"/>
    <path d="M42 73 Q50 80 58 73" stroke="#1A1A2E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="68" rx="6" ry="3.5" fill="#FFB3BA" opacity="0.58"/>
    <ellipse cx="66" cy="68" rx="6" ry="3.5" fill="#FFB3BA" opacity="0.58"/>
  </svg>`;
}

// 特別なSVG
const specialSVG = {
  enoki: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="26" y="44" width="9"  height="42" rx="4.5" fill="#F5F5DC" stroke="#D4C5A9" stroke-width="1.5"/>
    <rect x="38" y="38" width="9"  height="48" rx="4.5" fill="#FFFDE7" stroke="#D4C5A9" stroke-width="1.5"/>
    <rect x="50" y="41" width="9"  height="45" rx="4.5" fill="#F5F5DC" stroke="#D4C5A9" stroke-width="1.5"/>
    <rect x="62" y="46" width="9"  height="40" rx="4.5" fill="#FFFDE7" stroke="#D4C5A9" stroke-width="1.5"/>
    <circle cx="30"  cy="39" r="10" fill="#E9C46A" stroke="#D4A017" stroke-width="2"/>
    <circle cx="42"  cy="32" r="12" fill="#FFD60A" stroke="#D4A017" stroke-width="2"/>
    <circle cx="54"  cy="35" r="10" fill="#E9C46A" stroke="#D4A017" stroke-width="2"/>
    <circle cx="66"  cy="40" r="9"  fill="#FFD60A" stroke="#D4A017" stroke-width="2"/>
    <circle cx="39" cy="30" r="3.2" fill="#1A1A2E"/>
    <circle cx="47" cy="30" r="3.2" fill="#1A1A2E"/>
    <circle cx="40" cy="28.8" r="1.2" fill="white"/>
    <circle cx="48" cy="28.8" r="1.2" fill="white"/>
    <path d="M39 37 Q43 41 47 37" stroke="#1A1A2E" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  kikurage: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 58 Q18 32 35 28 Q50 24 58 36 Q72 22 82 38 Q90 55 78 66 Q65 78 50 70 Q38 80 25 72 Q8 64 15 58 Z" fill="#6D4C41" stroke="#4E342E" stroke-width="2.5"/>
    <path d="M20 55 Q30 45 45 50 Q60 55 70 45 Q78 38 82 50" stroke="#A1887F" stroke-width="2" fill="none" opacity="0.5"/>
    <ellipse cx="36" cy="42" rx="9" ry="6" fill="#8D6E63" opacity="0.35" transform="rotate(-20 36 42)"/>
    <circle cx="42" cy="57" r="4.2" fill="#FFF8F5"/>
    <circle cx="58" cy="57" r="4.2" fill="#FFF8F5"/>
    <circle cx="42" cy="57" r="2.5" fill="#1A1A2E"/>
    <circle cx="58" cy="57" r="2.5" fill="#1A1A2E"/>
    <circle cx="42.8" cy="56.2" r="1" fill="white"/>
    <circle cx="58.8" cy="56.2" r="1" fill="white"/>
    <path d="M42 66 Q50 72 58 66" stroke="#FFF8F5" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  </svg>`,

  renkon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="56" rx="35" ry="30" fill="#FFCDD2" stroke="#EF9A9A" stroke-width="2.5"/>
    <circle cx="50" cy="46" r="7.5" fill="#FFF5F0" stroke="#EF9A9A" stroke-width="1.5"/>
    <circle cx="33" cy="51" r="6"   fill="#FFF5F0" stroke="#EF9A9A" stroke-width="1.5"/>
    <circle cx="67" cy="51" r="6"   fill="#FFF5F0" stroke="#EF9A9A" stroke-width="1.5"/>
    <circle cx="38" cy="65" r="5.5" fill="#FFF5F0" stroke="#EF9A9A" stroke-width="1.5"/>
    <circle cx="62" cy="65" r="5.5" fill="#FFF5F0" stroke="#EF9A9A" stroke-width="1.5"/>
    <circle cx="50" cy="70" r="4.5" fill="#FFF5F0" stroke="#EF9A9A" stroke-width="1.5"/>
    <circle cx="41" cy="55" r="4.2" fill="#1A1A2E"/>
    <circle cx="59" cy="55" r="4.2" fill="#1A1A2E"/>
    <circle cx="42.5" cy="53.5" r="1.6" fill="white"/>
    <circle cx="60.5" cy="53.5" r="1.6" fill="white"/>
    <path d="M41 65 Q50 71 59 65" stroke="#1A1A2E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="60" rx="5.5" ry="3" fill="#FFB3BA" opacity="0.6"/>
    <ellipse cx="66" cy="60" rx="5.5" ry="3" fill="#FFB3BA" opacity="0.6"/>
  </svg>`,

  konjac: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="28" width="64" height="58" rx="13" fill="#CE93D8" stroke="#AB47BC" stroke-width="2.5"/>
    <line x1="18" y1="44" x2="82" y2="44" stroke="#BA68C8" stroke-width="1.2" opacity="0.45"/>
    <line x1="18" y1="57" x2="82" y2="57" stroke="#BA68C8" stroke-width="1.2" opacity="0.45"/>
    <line x1="18" y1="70" x2="82" y2="70" stroke="#BA68C8" stroke-width="1.2" opacity="0.45"/>
    <ellipse cx="33" cy="37" rx="10" ry="6" fill="white" opacity="0.18" transform="rotate(-15 33 37)"/>
    <circle cx="42" cy="54" r="4.5" fill="#1A1A2E"/>
    <circle cx="58" cy="54" r="4.5" fill="#1A1A2E"/>
    <circle cx="43.5" cy="52.5" r="1.7" fill="white"/>
    <circle cx="59.5" cy="52.5" r="1.7" fill="white"/>
    <path d="M42 65 Q50 72 58 65" stroke="#1A1A2E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="59" rx="6" ry="3.5" fill="#FFB3BA" opacity="0.6"/>
    <ellipse cx="66" cy="59" rx="6" ry="3.5" fill="#FFB3BA" opacity="0.6"/>
  </svg>`,

  gyoza: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 63 Q50 16 86 63 Q86 84 50 84 Q14 84 14 63 Z" fill="#C5E899" stroke="#7CB342" stroke-width="2.5"/>
    <path d="M14 63 Q50 18 86 63" stroke="#7CB342" stroke-width="2.5" fill="none"/>
    <path d="M24 73 Q27 62 32 73" stroke="#7CB342" stroke-width="2" fill="none"/>
    <path d="M35 77 Q38 65 43 77" stroke="#7CB342" stroke-width="2" fill="none"/>
    <path d="M46 79 Q50 67 54 79" stroke="#7CB342" stroke-width="2" fill="none"/>
    <path d="M57 77 Q62 65 67 77" stroke="#7CB342" stroke-width="2" fill="none"/>
    <path d="M68 73 Q72 62 76 73" stroke="#7CB342" stroke-width="2" fill="none"/>
    <circle cx="42" cy="61" r="4.2" fill="#1A1A2E"/>
    <circle cx="58" cy="61" r="4.2" fill="#1A1A2E"/>
    <circle cx="43.5" cy="59.5" r="1.6" fill="white"/>
    <circle cx="59.5" cy="59.5" r="1.6" fill="white"/>
    <path d="M42 71 Q50 77 58 71" stroke="#1A1A2E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="66" rx="5.5" ry="3" fill="#FFB3BA" opacity="0.6"/>
    <ellipse cx="66" cy="66" rx="5.5" ry="3" fill="#FFB3BA" opacity="0.6"/>
  </svg>`,

  uzura: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="56" rx="24" ry="30" fill="#FFFDE7" stroke="#F9A825" stroke-width="2.5"/>
    <ellipse cx="40" cy="42" rx="5.5" ry="3.5" fill="#8D6E63" opacity="0.32" transform="rotate(-15 40 42)"/>
    <ellipse cx="61" cy="47" rx="4.5" ry="2.8" fill="#8D6E63" opacity="0.32" transform="rotate(10 61 47)"/>
    <ellipse cx="43" cy="69" rx="4"   ry="2.5" fill="#8D6E63" opacity="0.3"  transform="rotate(-5 43 69)"/>
    <ellipse cx="57" cy="64" rx="3.5" ry="2.2" fill="#8D6E63" opacity="0.28"/>
    <ellipse cx="36" cy="58" rx="3"   ry="2"   fill="#8D6E63" opacity="0.25"/>
    <ellipse cx="37" cy="43" rx="8" ry="5" fill="white" opacity="0.28" transform="rotate(-20 37 43)"/>
    <circle cx="44" cy="53" r="4.2" fill="#1A1A2E"/>
    <circle cx="56" cy="53" r="4.2" fill="#1A1A2E"/>
    <circle cx="45.5" cy="51.5" r="1.6" fill="white"/>
    <circle cx="57.5" cy="51.5" r="1.6" fill="white"/>
    <path d="M44 63 Q50 69 56 63" stroke="#1A1A2E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="57" rx="5.5" ry="3" fill="#FFB3BA" opacity="0.6"/>
    <ellipse cx="64" cy="57" rx="5.5" ry="3" fill="#FFB3BA" opacity="0.6"/>
  </svg>`,

  mochi: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <text x="9"  y="27" font-size="12" fill="#FFD60A" opacity="0.9">✦</text>
    <text x="77" y="24" font-size="10" fill="#FFD60A" opacity="0.8">✦</text>
    <circle cx="50" cy="58" r="32" fill="#FFDDE1" stroke="#F48FB1" stroke-width="2.5"/>
    <circle cx="29" cy="48" r="9" fill="#FFB3C1" opacity="0.45"/>
    <circle cx="71" cy="48" r="9" fill="#FFB3C1" opacity="0.45"/>
    <circle cx="50" cy="34" r="8" fill="#FFB3C1" opacity="0.38"/>
    <ellipse cx="35" cy="44" rx="11" ry="8" fill="white" opacity="0.22" transform="rotate(-15 35 44)"/>
    <path d="M39 56 Q44 52 49 56" stroke="#1A1A2E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M51 56 Q56 52 61 56" stroke="#1A1A2E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="50" cy="63" r="2.2" fill="#F48FB1"/>
    <path d="M44 70 Q50 75 56 70" stroke="#1A1A2E" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="64" rx="7" ry="4" fill="#FF80AB" opacity="0.42"/>
    <ellipse cx="66" cy="64" rx="7" ry="4" fill="#FF80AB" opacity="0.42"/>
  </svg>`,

  chikuwa: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="58" rx="38" ry="25" fill="#FFB74D" stroke="#FB8C00" stroke-width="2.5"/>
    <ellipse cx="50" cy="58" rx="16" ry="11" fill="#FFF3E0" stroke="#FFB74D" stroke-width="1.5"/>
    <ellipse cx="50" cy="59" rx="13" ry="8" fill="#FFE0B2"/>
    <path d="M14 48 Q50 36 86 48" stroke="#E65100" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.35"/>
    <circle cx="30" cy="50" r="4" fill="#1A1A2E"/>
    <circle cx="40" cy="47" r="4" fill="#1A1A2E"/>
    <circle cx="31.5" cy="48.5" r="1.5" fill="white"/>
    <circle cx="41.5" cy="45.5" r="1.5" fill="white"/>
    <path d="M28 59 Q35 65 42 59" stroke="#1A1A2E" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="22" cy="55" rx="5" ry="3" fill="#FFB3BA" opacity="0.55"/>
  </svg>`,

  frozentofu: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M36 20 Q33 13 36 7"  stroke="#90A4AE" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>
    <path d="M50 17 Q47 10 50 4"  stroke="#90A4AE" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>
    <path d="M64 20 Q61 13 64 7"  stroke="#90A4AE" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>
    <rect x="17" y="28" width="66" height="60" rx="11" fill="#ECEFF1" stroke="#90A4AE" stroke-width="2.5"/>
    <circle cx="33" cy="44" r="4.5" fill="#90A4AE" opacity="0.38"/>
    <circle cx="50" cy="40" r="4"   fill="#90A4AE" opacity="0.38"/>
    <circle cx="67" cy="44" r="4.5" fill="#90A4AE" opacity="0.38"/>
    <circle cx="29" cy="58" r="3.5" fill="#90A4AE" opacity="0.32"/>
    <circle cx="44" cy="55" r="4"   fill="#90A4AE" opacity="0.32"/>
    <circle cx="58" cy="58" r="4.5" fill="#90A4AE" opacity="0.32"/>
    <circle cx="71" cy="54" r="3.5" fill="#90A4AE" opacity="0.28"/>
    <circle cx="42" cy="74" r="4.2" fill="#1A1A2E"/>
    <circle cx="58" cy="74" r="4.2" fill="#1A1A2E"/>
    <circle cx="43.5" cy="72.5" r="1.6" fill="white"/>
    <circle cx="59.5" cy="72.5" r="1.6" fill="white"/>
    <path d="M42 83 Q50 89 58 83" stroke="#1A1A2E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="78" rx="6" ry="3.5" fill="#FFB3BA" opacity="0.58"/>
    <ellipse cx="66" cy="78" rx="6" ry="3.5" fill="#FFB3BA" opacity="0.58"/>
  </svg>`,
};

// SVG取得
const svgConfigs = {
  lettuce:    () => svgVeggie('#A8D5A2','#52B788'),
  spinach:    () => svgVeggie('#52B788','#2D6A4F'),
  moyashi:    () => svgVeggie('#C8E6C9','#81C784'),
  hakusai:    () => svgVeggie('#D8EDD4','#66BB6A'),
  potato:     () => svgVeggie('#D4A259','#9C6D00'),
  bokchoy:    () => svgVeggie('#69B578','#2E7D32'),
  yuba:       () => svgVeggie('#FFF9C4','#F9A825'),
  beef:       () => svgMeat('#EF9A9A','#E53935'),
  pork:       () => svgMeat('#FFAB91','#FF5722'),
  lamb:       () => svgMeat('#CE93D8','#8E24AA'),
  chicken:    () => svgMeat('#FFE082','#FF8F00'),
  gyusuji:    () => svgMeat('#BCAAA4','#6D4C41'),
  crab:       () => svgDango('#FF7043','#BF360C'),
  fish:       () => svgDango('#90CAF9','#1565C0'),
  lobster:    () => svgDango('#FF5252','#B71C1C'),
  aburaage:   () => svgTofu('#FFE0B2','#E65100','#FFA726'),
};

function getIngredientSVG(ingredient) {
  if (specialSVG[ingredient.id]) return specialSVG[ingredient.id];
  const fn = svgConfigs[ingredient.id];
  if (fn) return fn();
  // category fallback
  switch(ingredient.cat) {
    case 'veggie': return svgVeggie();
    case 'meat':   return svgMeat();
    case 'dango':  return svgDango();
    default:       return svgTofu();
  }
}

// =============================================================
// 嗜好状態
// =============================================================
let currentPref = 'any';

function selectPref(btn) {
  document.querySelectorAll('.pref-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentPref = btn.dataset.pref;
}

// =============================================================
// おすすめアルゴリズム
// =============================================================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 嗜好 × 予算 → カテゴリ目標数
function getPrefTargets(budget, pref) {
  switch (pref) {
    case 'healthy':
      // 野菜・豆腐中心、肉なし、団子なし
      if (budget < 1300) return { veggie:5, meat:0, dango:0, tofu:2 };
      if (budget < 1700) return { veggie:7, meat:0, dango:0, tofu:3 };
      return                    { veggie:9, meat:0, dango:0, tofu:3 };

    case 'protein':
      // 肉・海鮮・卵を最大化
      if (budget < 1300) return { veggie:1, meat:2, dango:2, tofu:2 };
      if (budget < 1700) return { veggie:2, meat:3, dango:2, tofu:2 };
      return                    { veggie:2, meat:3, dango:3, tofu:3 };

    case 'hearty':
      // ボリューム系をガッツリ
      if (budget < 1300) return { veggie:2, meat:2, dango:2, tofu:1 };
      if (budget < 1700) return { veggie:2, meat:3, dango:3, tofu:1 };
      return                    { veggie:3, meat:3, dango:3, tofu:2 };

    default: // any
      if (budget < 1200) return { veggie:3, meat:1, dango:1, tofu:1 };
      if (budget < 1500) return { veggie:4, meat:1, dango:2, tofu:1 };
      if (budget < 2000) return { veggie:5, meat:2, dango:2, tofu:2 };
      return                    { veggie:5, meat:2, dango:3, tofu:2 };
  }
}

// Phase2で追加できるカテゴリを嗜好で制限
function phase2Allowed(item, pref) {
  switch (pref) {
    case 'healthy':  return item.cat === 'veggie' || (item.cat === 'tofu' && item.id === 'frozentofu');
    case 'protein':  return item.cat === 'meat' || item.cat === 'dango' || item.cat === 'tofu';
    case 'hearty':   return true; // 制限なし、重めのものが先に来る
    default:         return true;
  }
}

function recommend(budget) {
  const pref = currentPref;
  const maxGrams = budget / PRICE_PER_GRAM;
  const targets = getPrefTargets(budget, pref);

  // カテゴリ別プール：嗜好タグ優先 → popular優先 → それ以外
  const pool = {};
  ['veggie','meat','dango','tofu'].forEach(cat => {
    const items = ingredients.filter(i => i.cat === cat);
    const prefMatch = shuffle(items.filter(i => i.tags.includes(pref) || i.tags.includes('any')));
    const others    = shuffle(items.filter(i => !i.tags.includes(pref) && !i.tags.includes('any')));
    // popular を各グループの先頭に
    const sortByPopular = arr => [
      ...arr.filter(i => i.popular),
      ...arr.filter(i => !i.popular),
    ];
    pool[cat] = [...sortByPopular(prefMatch), ...sortByPopular(others)];
  });

  const selected = [];
  let usedGrams = 0;

  // Phase1: カテゴリ目標を満たす
  for (const [cat, count] of Object.entries(targets)) {
    let added = 0;
    for (const item of pool[cat]) {
      if (added >= count) break;
      if (!selected.includes(item) && usedGrams + item.weight <= maxGrams) {
        selected.push(item);
        usedGrams += item.weight;
        added++;
      }
    }
  }

  // Phase2: 残り予算を嗜好に沿って埋める
  const phase2Pool = ingredients
    .filter(i => !selected.includes(i) && phase2Allowed(i, pref))
    .sort((a, b) => {
      // がっつりは重いもの優先、それ以外は軽いもの優先
      return pref === 'hearty'
        ? b.weight - a.weight
        : a.weight - b.weight;
    });
  for (const item of phase2Pool) {
    if (usedGrams >= maxGrams * 0.88) break;
    if (usedGrams + item.weight <= maxGrams * 0.95) {
      selected.push(item);
      usedGrams += item.weight;
    }
  }

  const totalPrice = Math.round(usedGrams * PRICE_PER_GRAM);
  return {
    items: selected,
    totalGrams: Math.round(usedGrams),
    totalPrice,
    hasNoodleService: true,
    remaining: budget - totalPrice,
    pref,
  };
}

// =============================================================
// UI
// =============================================================
const slider   = document.getElementById('budgetSlider');
const numEl    = document.getElementById('budgetNum');
const hintEl   = document.getElementById('noodleHint');

const catLabel = {
  veggie: '🥬 野菜',
  meat:   '🥩 お肉・海鮮',
  dango:  '🔮 団子・練り物',
  tofu:   '⬜ 豆腐・卵',
};

// 500円刻みのスナップポイント
const SNAP_POINTS   = [1000, 1500, 2000, 2500, 3000];
const SNAP_THRESHOLD = 80; // この範囲内に入ったら吸い付く（円）

function applySnap(raw) {
  for (const point of SNAP_POINTS) {
    if (Math.abs(raw - point) <= SNAP_THRESHOLD) return point;
  }
  return raw;
}

slider.addEventListener('input', () => {
  const raw     = parseInt(slider.value);
  const snapped = applySnap(raw);

  if (snapped !== raw) {
    slider.value = snapped; // スライダー位置を補正
  }

  numEl.textContent = snapped.toLocaleString();
  hintEl.textContent = '🍜 麺80g 無料サービス対象！';
});

function showRecommendation() {
  const budget = applySnap(parseInt(slider.value));
  const result = recommend(budget);

  const grouped = {};
  ['veggie','meat','dango','tofu'].forEach(cat => {
    grouped[cat] = result.items.filter(i => i.cat === cat);
  });

  let html = '';

  // ─── サマリーバナー ───
  html += `<div class="summary-banner">`;
  if (result.hasNoodleService) {
    html += `<div class="noodle-badge">🍜 麺80g 無料サービス！</div><br>`;
  } else {
    const diff = NOODLE_THRESHOLD - budget;
    html += `<div class="no-noodle-hint">あと<strong>${diff.toLocaleString()}円</strong>分追加すると麺80gが無料になるよ！</div>`;
  }
  html += `<div class="summary-stats">
    <div class="stat-item"><div class="stat-num">${result.totalGrams}g</div><div class="stat-label">合計重量</div></div>
    <div class="stat-item"><div class="stat-num">¥${result.totalPrice.toLocaleString()}</div><div class="stat-label">お会計目安</div></div>
    <div class="stat-item"><div class="stat-num">${result.items.length}種</div><div class="stat-label">具材の数</div></div>
  </div></div>`;

  // ─── カテゴリ別カード ───
  ['veggie','meat','dango','tofu'].forEach(cat => {
    const items = grouped[cat];
    if (!items.length) return;

    html += `<div class="category-section">
      <div class="category-title">${catLabel[cat]}</div>
      <div class="ingredient-grid">`;

    items.forEach((item, idx) => {
      const price = Math.round(item.weight * PRICE_PER_GRAM);
      const delay = (idx * 80) + 'ms';
      html += `
        <div class="ingredient-card" style="--card-color:${item.color}; animation-delay:${delay}">
          ${item.popular ? '<span class="popular-badge">⭐</span>' : ''}
          <div class="ingredient-svg-wrap">${getIngredientSVG(item)}</div>
          <div class="ingredient-name">${item.name}</div>
          <div class="ingredient-texture">${item.texture}</div>
          <div class="ingredient-info">
            <span class="ingredient-weight">約${item.weight}g</span>
            <span class="ingredient-price">¥${price}</span>
          </div>
        </div>`;
    });

    html += `</div></div>`;
  });

  // ─── Tips ───
  const tips = buildTips(budget, result);
  html += `<div class="tips-card">
    <div class="tips-title">✦ もっと美味しくするコツ ✦</div>
    ${tips.map(t => `<div class="tip-item"><span>🌶️</span><span>${t}</span></div>`).join('')}
  </div>`;

  const resultsEl = document.getElementById('results');
  resultsEl.innerHTML = html;
  resultsEl.classList.add('show');
  setTimeout(() => resultsEl.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
}

function buildTips(budget, result) {
  const tips = [];
  const { pref, items } = result;

  // 嗜好別の冒頭ティップ
  if (pref === 'healthy') {
    tips.push('野菜たっぷり＆低カロリー構成！スープは牛骨かトマトをチョイスするとよりさっぱり食べられるよ🥬');
  } else if (pref === 'protein') {
    tips.push('タンパク質満載な組み合わせ！スープは麻辣か牛骨がうまみと相性バッチリ。辛さ3から試してみて💪');
  } else if (pref === 'hearty') {
    tips.push('ボリューム全開の構成！辛さは4〜5まで上げてガッツリ食べるのが最高。花椒強めもおすすめ🌶️');
  } else {
    tips.push('スープは麻辣・牛骨・トマト・激香赤ラー油湯から選べる！辛さ5段階・花椒3段階でカスタムしよう✨');
  }

  // 具材別ティップ
  if (items.some(i => i.id === 'gyusuji'))    tips.push('牛スジはとろっとろでコラーゲンたっぷり。スープの旨味もアップして一石二鳥✨');
  if (items.some(i => i.cat === 'dango'))      tips.push('団子・練り物はスープの麻辣をしっかり吸い込むから、食べ終わりまでおいしい🔮');
  if (items.some(i => i.id === 'frozentofu')) tips.push('冷凍豆腐はスープをぎゅっと閉じ込めた旨味爆弾！ぜひかじってみて⬜');
  if (items.some(i => i.id === 'renkon'))     tips.push('れんこんはシャキシャキ食感が麻辣スープとベストマッチ。見た目も可愛い🪷');
  if (items.some(i => i.id === 'mochi'))      tips.push('もちはスープでじんわりとろけてのびのびになるのが最高😋🍡');
  if (items.some(i => i.id === 'konjac'))     tips.push('こんにゃくはほぼカロリーゼロでボリューム出せる！ヘルシーの強い味方🟣');

  tips.push('辛さはまず3からチャレンジ！慣れてきたら5に上げるとクセになる辛さになるよ😄');
  return tips.slice(0, 3);
}

// 初期化
slider.dispatchEvent(new Event('input'));
