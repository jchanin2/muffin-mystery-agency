// ======================================================
// art.js — All SVG illustrations and sprite renderers
// Realms of Mathematica II — The Numerian Codex
// ======================================================

const Art = {

  // --------------------------------------------------------
  // TITLE EMBLEM — open codex with star-chart and crossed quill+sword
  // --------------------------------------------------------
  titleEmblem() {
    return '<svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
        '<radialGradient id="te-glow" cx="0.5" cy="0.5" r="0.5">' +
          '<stop offset="0" stop-color="#f0d27a" stop-opacity="0.4"/>' +
          '<stop offset="1" stop-color="#f0d27a" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<linearGradient id="te-page" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#f0e3bd"/>' +
          '<stop offset="1" stop-color="#c8b078"/>' +
        '</linearGradient>' +
        '<linearGradient id="te-bind" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#7a3818"/>' +
          '<stop offset="1" stop-color="#3a1810"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<circle cx="110" cy="110" r="100" fill="url(#te-glow)"/>' +
      // codex (open book)
      '<path d="M 30 130 Q 60 110 110 115 Q 160 110 190 130 L 190 175 Q 160 160 110 165 Q 60 160 30 175 Z" fill="url(#te-bind)" stroke="#1a1008" stroke-width="2"/>' +
      // pages left
      '<path d="M 36 132 Q 68 116 110 122 L 110 168 Q 68 162 36 173 Z" fill="url(#te-page)" stroke="#3a2010" stroke-width="0.8"/>' +
      // pages right
      '<path d="M 184 132 Q 152 116 110 122 L 110 168 Q 152 162 184 173 Z" fill="url(#te-page)" stroke="#3a2010" stroke-width="0.8"/>' +
      // central binding ribbon
      '<rect x="106" y="118" width="8" height="56" fill="#5a1818" stroke="#1a0808" stroke-width="0.5"/>' +
      // page lines (left)
      '<line x1="48" y1="138" x2="100" y2="134" stroke="#5a3818" stroke-width="0.5" opacity="0.55"/>' +
      '<line x1="48" y1="144" x2="100" y2="140" stroke="#5a3818" stroke-width="0.5" opacity="0.55"/>' +
      '<line x1="48" y1="150" x2="100" y2="146" stroke="#5a3818" stroke-width="0.5" opacity="0.55"/>' +
      '<line x1="48" y1="156" x2="100" y2="152" stroke="#5a3818" stroke-width="0.5" opacity="0.55"/>' +
      // page lines (right) — number symbols
      '<text x="125" y="142" fill="#3a2010" font-family="Cinzel" font-size="6.5" opacity="0.7">∑ π Δ √</text>' +
      '<text x="125" y="152" fill="#3a2010" font-family="Cinzel" font-size="6.5" opacity="0.7">x²·y³·z</text>' +
      '<text x="125" y="162" fill="#3a2010" font-family="Cinzel" font-size="6.5" opacity="0.7">∞ Ω ⊕</text>' +
      // star above book
      '<g transform="translate(110, 70)">' +
        '<polygon points="0,-32 8,-10 32,-10 13,4 20,28 0,14 -20,28 -13,4 -32,-10 -8,-10" fill="#d4a624" stroke="#3a2010" stroke-width="1"/>' +
        '<polygon points="0,-22 5,-6 22,-6 9,2 14,18 0,9 -14,18 -9,2 -22,-6 -5,-6" fill="#f0d27a"/>' +
        '<circle r="3" fill="#fff"/>' +
      '</g>' +
      // crossed quill and sword (behind the book)
      '<line x1="34" y1="58" x2="92" y2="130" stroke="#888" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="92" y1="130" x2="92" y2="126" stroke="#5a3818" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M 186 58 Q 178 90 132 120 Q 138 130 144 134" fill="#c47828" stroke="#3a2010" stroke-width="1.5"/>' +
      '<path d="M 180 62 Q 178 72 174 80 M 178 70 Q 174 80 168 88 M 172 80 Q 168 90 160 100 M 164 90 Q 160 100 150 108" stroke="#3a2010" stroke-width="0.5" fill="none"/>' +
      // small stars
      '<circle cx="48" cy="46" r="1.5" fill="#fff"/>' +
      '<circle cx="178" cy="40" r="1" fill="#fff"/>' +
      '<circle cx="200" cy="74" r="1.5" fill="#fff"/>' +
      '<circle cx="22" cy="92" r="1" fill="#fff"/>' +
      '<circle cx="156" cy="20" r="1.5" fill="#fff"/>' +
    '</svg>';
  },

  // --------------------------------------------------------
  // HERO PORTRAIT — composes traits from class + heritage
  // mode: 'full' | 'mini' | 'sheet' | 'combat'
  // --------------------------------------------------------
  heroPortrait(hero, mode) {
    const cls = (CLASSES && hero && CLASSES[hero.classId]) || CLASSES.warrior;
    const her = (HERITAGES && hero && HERITAGES[hero.heritageId]) || HERITAGES.human;
    const skin = her.skinTone || '#d9b48b';
    const hair = cls.portraitTraits.hairColor;
    const weapon = cls.portraitTraits.weaponColor;
    const earShape = her.id === 'elf' ? 'pointed' : (her.id === 'halfling' ? 'small' : 'round');
    const bodyHeight = her.id === 'dwarf' ? 'short' : (her.id === 'halfling' ? 'short' : 'tall');

    const isMini = mode === 'mini';
    const isCombat = mode === 'combat';
    const w = isMini ? 60 : (isCombat ? 200 : 200);
    const h = isMini ? 60 : (isCombat ? 250 : 250);
    const vb = '0 0 200 250';

    // ear path
    let earL = '', earR = '';
    if (earShape === 'pointed') {
      earL = '<path d="M 76 110 Q 68 105 70 95 L 76 105 Z" fill="' + skin + '"/>';
      earR = '<path d="M 124 110 Q 132 105 130 95 L 124 105 Z" fill="' + skin + '"/>';
    } else if (earShape === 'small') {
      earL = '<ellipse cx="74" cy="108" rx="4" ry="6" fill="' + skin + '"/>';
      earR = '<ellipse cx="126" cy="108" rx="4" ry="6" fill="' + skin + '"/>';
    } else {
      earL = '<ellipse cx="73" cy="110" rx="5" ry="7" fill="' + skin + '"/>';
      earR = '<ellipse cx="127" cy="110" rx="5" ry="7" fill="' + skin + '"/>';
    }

    // class-specific weapon/gear
    let weaponElt = '';
    if (cls.id === 'warrior') {
      weaponElt = '<line x1="40" y1="100" x2="44" y2="220" stroke="' + weapon + '" stroke-width="6" stroke-linecap="round"/>' +
                  '<rect x="34" y="92" width="16" height="6" fill="#7a5818"/>' +
                  '<rect x="38" y="86" width="8" height="10" fill="' + weapon + '"/>';
    } else if (cls.id === 'mage') {
      weaponElt = '<line x1="40" y1="100" x2="44" y2="230" stroke="' + weapon + '" stroke-width="5" stroke-linecap="round"/>' +
                  '<circle cx="42" cy="92" r="9" fill="#3a3e8a" stroke="' + weapon + '" stroke-width="2"/>' +
                  '<circle cx="42" cy="92" r="4" fill="#a0c0ff"/>';
    } else if (cls.id === 'rogue') {
      weaponElt = '<line x1="36" y1="140" x2="44" y2="180" stroke="' + weapon + '" stroke-width="3" stroke-linecap="round"/>' +
                  '<line x1="40" y1="138" x2="48" y2="178" stroke="' + weapon + '" stroke-width="3" stroke-linecap="round"/>';
    } else {
      // ranger — bow
      weaponElt = '<path d="M 40 100 Q 28 160 40 220" fill="none" stroke="' + weapon + '" stroke-width="4" stroke-linecap="round"/>' +
                  '<line x1="42" y1="100" x2="42" y2="220" stroke="#e8d5b5" stroke-width="0.6"/>';
    }

    // body + clothing (class specific)
    let clothing = '';
    if (cls.id === 'warrior') {
      // breastplate + tabard
      clothing = '<polygon points="60,160 140,160 150,250 50,250" fill="#7a4030" stroke="#3a2010" stroke-width="1.5"/>' +
                 '<polygon points="80,160 120,160 110,250 90,250" fill="' + cls.iconColor + '" stroke="#3a2010" stroke-width="1"/>' +
                 '<rect x="62" y="170" width="76" height="6" fill="#888" stroke="#3a2010" stroke-width="1"/>' +
                 '<circle cx="100" cy="173" r="3.5" fill="#d4a624" stroke="#3a2010" stroke-width="0.6"/>';
    } else if (cls.id === 'mage') {
      // long robe
      clothing = '<polygon points="56,158 144,158 158,250 42,250" fill="#2a2858" stroke="#1a1838" stroke-width="1.5"/>' +
                 '<polygon points="56,158 144,158 130,210 70,210" fill="#3a3e8a" stroke="#1a1838" stroke-width="0.8"/>' +
                 // runes hem
                 '<text x="60" y="248" fill="#d4a624" font-family="Cinzel" font-size="8" opacity="0.8">∑·π·Δ·√·∞·Ω</text>';
    } else if (cls.id === 'rogue') {
      // hood + leather
      clothing = '<polygon points="60,156 140,156 148,250 52,250" fill="#1a2818" stroke="#0a1808" stroke-width="1.5"/>' +
                 '<path d="M 60 156 Q 100 130 140 156 L 138 180 Q 100 160 62 180 Z" fill="#0a1408" opacity="0.6"/>' +
                 '<line x1="74" y1="180" x2="76" y2="240" stroke="#3a3818" stroke-width="1"/>' +
                 '<line x1="124" y1="180" x2="122" y2="240" stroke="#3a3818" stroke-width="1"/>';
    } else {
      // ranger cloak
      clothing = '<polygon points="56,156 144,156 152,250 48,250" fill="#3a4a28" stroke="#1a2818" stroke-width="1.5"/>' +
                 '<polygon points="60,158 140,158 130,220 70,220" fill="#4a5a2a" stroke="#1a2818" stroke-width="0.6"/>' +
                 '<line x1="100" y1="160" x2="100" y2="200" stroke="#3a2010" stroke-width="3"/>' +
                 '<circle cx="100" cy="168" r="3" fill="#d4a624" stroke="#3a2010" stroke-width="0.6"/>';
    }

    // face
    const headY = bodyHeight === 'short' ? 112 : 105;
    const eyeBrowMood = cls.id === 'warrior' ? 'fierce' : (cls.id === 'mage' ? 'wise' : (cls.id === 'rogue' ? 'sly' : 'calm'));
    const browL = eyeBrowMood === 'fierce' ? '<line x1="86" y1="106" x2="98" y2="110" stroke="#1a1008" stroke-width="1.6"/>' :
                  eyeBrowMood === 'wise' ?   '<line x1="86" y1="108" x2="98" y2="106" stroke="#1a1008" stroke-width="1.4"/>' :
                  eyeBrowMood === 'sly' ?    '<line x1="86" y1="108" x2="98" y2="112" stroke="#1a1008" stroke-width="1.4"/>' :
                                              '<line x1="86" y1="106" x2="98" y2="106" stroke="#1a1008" stroke-width="1.4"/>';
    const browR = eyeBrowMood === 'fierce' ? '<line x1="114" y1="110" x2="126" y2="106" stroke="#1a1008" stroke-width="1.6"/>' :
                  eyeBrowMood === 'wise' ?   '<line x1="114" y1="106" x2="126" y2="108" stroke="#1a1008" stroke-width="1.4"/>' :
                  eyeBrowMood === 'sly' ?    '<line x1="114" y1="112" x2="126" y2="108" stroke="#1a1008" stroke-width="1.4"/>' :
                                              '<line x1="114" y1="106" x2="126" y2="106" stroke="#1a1008" stroke-width="1.4"/>';

    // hair (class-tinted)
    let hairShape = '';
    if (cls.id === 'mage') {
      hairShape = '<path d="M 70 95 Q 100 65 130 95 L 132 124 Q 100 116 68 124 Z" fill="' + hair + '"/>' +
                  '<path d="M 130 95 Q 138 130 134 160 L 128 156 Q 128 130 126 110 Z" fill="' + hair + '"/>';
    } else if (cls.id === 'rogue') {
      hairShape = '<path d="M 68 100 Q 100 70 132 100 Q 134 116 132 124 Q 100 116 68 124 Q 66 110 68 100 Z" fill="' + hair + '"/>';
    } else if (cls.id === 'warrior') {
      hairShape = '<path d="M 72 100 Q 100 80 128 100 L 128 112 Q 100 108 72 112 Z" fill="' + hair + '"/>';
    } else {
      hairShape = '<path d="M 70 100 Q 100 76 130 100 L 130 130 Q 100 114 70 130 Z" fill="' + hair + '"/>' +
                  // ranger braid
                  '<line x1="132" y1="124" x2="140" y2="158" stroke="' + hair + '" stroke-width="4" stroke-linecap="round"/>';
    }

    // dwarf beard
    let beard = '';
    if (her.id === 'dwarf') {
      beard = '<path d="M 84 130 Q 100 158 116 130 L 118 152 Q 100 166 82 152 Z" fill="' + hair + '"/>';
    }

    const portraitInner =
      // bg gradient — class tinted
      '<defs>' +
        '<linearGradient id="hp-bg" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="' + cls.iconColor + '" stop-opacity="0.45"/>' +
          '<stop offset="1" stop-color="#0e0a18"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="200" height="250" fill="url(#hp-bg)"/>' +
      // distant aura / sigil
      '<circle cx="100" cy="120" r="60" fill="rgba(212,166,36,0.06)"/>' +
      // weapon (behind body)
      weaponElt +
      // body / clothing
      clothing +
      // neck
      '<rect x="92" y="138" width="16" height="20" fill="' + skin + '"/>' +
      // head
      '<ellipse cx="100" cy="' + headY + '" rx="28" ry="32" fill="' + skin + '" stroke="#3a2010" stroke-width="1.5"/>' +
      earL + earR +
      // hair
      hairShape +
      beard +
      // eyes
      '<ellipse cx="92" cy="' + (headY + 5) + '" rx="2.5" ry="3" fill="#1a1008"/>' +
      '<ellipse cx="108" cy="' + (headY + 5) + '" rx="2.5" ry="3" fill="#1a1008"/>' +
      '<circle cx="92.5" cy="' + (headY + 4) + '" r="0.6" fill="#fff"/>' +
      '<circle cx="108.5" cy="' + (headY + 4) + '" r="0.6" fill="#fff"/>' +
      // brows
      browL.replace(/y="106"/g, 'y="' + (headY + 1) + '"').replace(/y="108"/g, 'y="' + (headY + 3) + '"').replace(/y="110"/g, 'y="' + (headY + 5) + '"').replace(/y="112"/g, 'y="' + (headY + 7) + '"') +
      browR.replace(/y="106"/g, 'y="' + (headY + 1) + '"').replace(/y="108"/g, 'y="' + (headY + 3) + '"').replace(/y="110"/g, 'y="' + (headY + 5) + '"').replace(/y="112"/g, 'y="' + (headY + 7) + '"') +
      // mouth
      '<path d="M 94 ' + (headY + 14) + ' Q 100 ' + (headY + 18) + ' 106 ' + (headY + 14) + '" stroke="#3a2010" stroke-width="1.2" fill="none"/>' +
      // nose
      '<line x1="100" y1="' + (headY + 6) + '" x2="100" y2="' + (headY + 13) + '" stroke="#3a2010" stroke-width="1" opacity="0.6"/>';

    return '<svg width="' + w + '" height="' + h + '" viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg">' + portraitInner + '</svg>';
  },

  // --------------------------------------------------------
  // CLASS THUMBNAIL — icon for hero creation choice cards
  // --------------------------------------------------------
  classThumb(classId) {
    const cls = CLASSES[classId];
    if (!cls) return '';
    let inner;
    if (classId === 'warrior') {
      // sword + shield
      inner =
        '<circle cx="48" cy="48" r="44" fill="rgba(138,62,34,0.18)" stroke="#8a3e22" stroke-width="2"/>' +
        '<path d="M 28 26 Q 48 18 68 26 L 68 60 Q 48 78 28 60 Z" fill="#7a4828" stroke="#3a2010" stroke-width="2"/>' +
        '<circle cx="48" cy="44" r="6" fill="#d4a624" stroke="#3a2010" stroke-width="1"/>' +
        '<line x1="48" y1="14" x2="48" y2="82" stroke="#b8c0c8" stroke-width="4" stroke-linecap="round"/>' +
        '<rect x="42" y="76" width="12" height="4" fill="#5a3818"/>' +
        '<rect x="40" y="80" width="16" height="6" fill="#3a2010"/>';
    } else if (classId === 'mage') {
      // staff + orb + stars
      inner =
        '<circle cx="48" cy="48" r="44" fill="rgba(58,62,138,0.18)" stroke="#3a3e8a" stroke-width="2"/>' +
        '<line x1="32" y1="22" x2="56" y2="80" stroke="#7a5a28" stroke-width="3.5" stroke-linecap="round"/>' +
        '<circle cx="34" cy="20" r="10" fill="#3a3e8a" stroke="#7a5a28" stroke-width="2"/>' +
        '<circle cx="34" cy="20" r="4" fill="#a0c0ff"/>' +
        '<circle cx="34" cy="19" r="1.5" fill="#fff"/>' +
        '<text x="68" y="40" fill="#a0c0ff" font-family="Cinzel" font-size="10">∑</text>' +
        '<text x="68" y="60" fill="#a0c0ff" font-family="Cinzel" font-size="10">π</text>' +
        '<text x="68" y="78" fill="#a0c0ff" font-family="Cinzel" font-size="10">∞</text>';
    } else if (classId === 'rogue') {
      // two daggers crossed + cloak
      inner =
        '<circle cx="48" cy="48" r="44" fill="rgba(42,58,42,0.22)" stroke="#2a3a2a" stroke-width="2"/>' +
        '<path d="M 28 30 Q 48 20 68 30 L 70 80 Q 48 92 26 80 Z" fill="#1a2818" stroke="#0a1808" stroke-width="2"/>' +
        '<line x1="22" y1="22" x2="50" y2="62" stroke="#bbb" stroke-width="2.5" stroke-linecap="round"/>' +
        '<rect x="22" y="62" width="4" height="6" fill="#3a2010" transform="rotate(-35 24 64)"/>' +
        '<line x1="74" y1="22" x2="46" y2="62" stroke="#bbb" stroke-width="2.5" stroke-linecap="round"/>' +
        '<rect x="70" y="62" width="4" height="6" fill="#3a2010" transform="rotate(35 72 64)"/>';
    } else {
      // ranger — bow + arrow
      inner =
        '<circle cx="48" cy="48" r="44" fill="rgba(58,90,42,0.18)" stroke="#3a5a2a" stroke-width="2"/>' +
        '<path d="M 30 18 Q 16 48 30 78" fill="none" stroke="#6a4818" stroke-width="4" stroke-linecap="round"/>' +
        '<line x1="30" y1="18" x2="30" y2="78" stroke="#e8d5b5" stroke-width="0.7"/>' +
        '<line x1="36" y1="48" x2="80" y2="48" stroke="#5a3818" stroke-width="2"/>' +
        '<polygon points="80,42 92,48 80,54" fill="#888" stroke="#3a2010" stroke-width="1"/>' +
        '<polygon points="36,44 30,48 36,52" fill="#aab87c"/>';
    }
    return '<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  },

  // --------------------------------------------------------
  // HERITAGE THUMBNAIL
  // --------------------------------------------------------
  heritageThumb(heritageId) {
    const her = HERITAGES[heritageId];
    if (!her) return '';
    // simple silhouette tinted by skinTone
    let silhouette;
    if (heritageId === 'human') {
      silhouette = '<ellipse cx="48" cy="35" rx="14" ry="16" fill="' + her.skinTone + '"/><rect x="34" y="50" width="28" height="36" fill="' + her.skinTone + '"/>';
    } else if (heritageId === 'elf') {
      silhouette = '<ellipse cx="48" cy="32" rx="13" ry="17" fill="' + her.skinTone + '"/>' +
                   '<path d="M 36 32 L 30 22 L 38 28 Z" fill="' + her.skinTone + '"/>' +
                   '<path d="M 60 32 L 66 22 L 58 28 Z" fill="' + her.skinTone + '"/>' +
                   '<rect x="34" y="50" width="28" height="36" fill="' + her.skinTone + '"/>';
    } else if (heritageId === 'dwarf') {
      silhouette = '<ellipse cx="48" cy="38" rx="16" ry="18" fill="' + her.skinTone + '"/>' +
                   '<path d="M 36 50 Q 48 70 60 50 L 60 60 Q 48 76 36 60 Z" fill="#4a3010"/>' +
                   '<rect x="32" y="58" width="32" height="32" fill="' + her.skinTone + '"/>';
    } else { // halfling
      silhouette = '<ellipse cx="48" cy="40" rx="14" ry="15" fill="' + her.skinTone + '"/>' +
                   '<rect x="36" y="56" width="24" height="28" fill="' + her.skinTone + '"/>';
    }
    return '<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="48" cy="48" r="46" fill="rgba(212,166,36,0.12)" stroke="#8a6a14" stroke-width="1.5"/>' +
      silhouette +
    '</svg>';
  },

  // --------------------------------------------------------
  // NPC PORTRAITS
  // --------------------------------------------------------
  lysara(size) {
    const w = size || 80;
    return '<svg width="' + w + '" height="' + w + '" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><radialGradient id="lys-bg"><stop offset="0" stop-color="#3a3e8a"/><stop offset="1" stop-color="#1a1838"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="48" fill="url(#lys-bg)"/>' +
      // hair (long, silver-purple)
      '<path d="M 28 42 Q 50 18 72 42 L 76 80 Q 64 78 64 80 L 36 80 Q 24 78 28 80 Z" fill="#a890c0"/>' +
      // face
      '<ellipse cx="50" cy="50" rx="16" ry="18" fill="#e8d5b5" stroke="#3a2010" stroke-width="0.8"/>' +
      // elf ears
      '<path d="M 34 50 Q 28 46 30 38 L 36 46 Z" fill="#e8d5b5"/>' +
      '<path d="M 66 50 Q 72 46 70 38 L 64 46 Z" fill="#e8d5b5"/>' +
      // bangs
      '<path d="M 36 36 Q 50 28 64 36 L 64 44 Q 50 38 36 44 Z" fill="#a890c0"/>' +
      // eyes (sharp green)
      '<ellipse cx="44" cy="50" rx="1.8" ry="2.2" fill="#3a8a48"/>' +
      '<ellipse cx="56" cy="50" rx="1.8" ry="2.2" fill="#3a8a48"/>' +
      '<circle cx="44.5" cy="49.5" r="0.5" fill="#fff"/>' +
      '<circle cx="56.5" cy="49.5" r="0.5" fill="#fff"/>' +
      // brows
      '<line x1="40" y1="46" x2="48" y2="46" stroke="#7a5a8a" stroke-width="1"/>' +
      '<line x1="52" y1="46" x2="60" y2="46" stroke="#7a5a8a" stroke-width="1"/>' +
      // mouth
      '<path d="M 46 60 Q 50 62 54 60" stroke="#3a2010" stroke-width="0.8" fill="none"/>' +
      // circlet
      '<path d="M 36 36 Q 50 30 64 36" fill="none" stroke="#d4a624" stroke-width="1.5"/>' +
      '<circle cx="50" cy="32" r="1.6" fill="#3a8a48"/>' +
    '</svg>';
  },

  brenna(size) {
    const w = size || 80;
    return '<svg width="' + w + '" height="' + w + '" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><radialGradient id="bre-bg"><stop offset="0" stop-color="#7a4828"/><stop offset="1" stop-color="#3a1810"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="48" fill="url(#bre-bg)"/>' +
      // hair (red, bun)
      '<ellipse cx="50" cy="32" rx="20" ry="12" fill="#8a3818"/>' +
      '<circle cx="50" cy="26" r="6" fill="#8a3818"/>' +
      // face
      '<ellipse cx="50" cy="52" rx="17" ry="19" fill="#e8c4a0" stroke="#3a2010" stroke-width="0.8"/>' +
      // ears
      '<ellipse cx="32" cy="52" rx="3" ry="4" fill="#e8c4a0"/>' +
      '<ellipse cx="68" cy="52" rx="3" ry="4" fill="#e8c4a0"/>' +
      // eyes (warm brown)
      '<ellipse cx="44" cy="52" rx="1.8" ry="2.2" fill="#5a2a10"/>' +
      '<ellipse cx="56" cy="52" rx="1.8" ry="2.2" fill="#5a2a10"/>' +
      '<circle cx="44.5" cy="51.5" r="0.5" fill="#fff"/>' +
      '<circle cx="56.5" cy="51.5" r="0.5" fill="#fff"/>' +
      // brows
      '<line x1="40" y1="48" x2="48" y2="49" stroke="#3a1810" stroke-width="1.2"/>' +
      '<line x1="52" y1="49" x2="60" y2="48" stroke="#3a1810" stroke-width="1.2"/>' +
      // smile
      '<path d="M 42 62 Q 50 68 58 62" stroke="#3a2010" stroke-width="1.2" fill="none"/>' +
      // freckles
      '<circle cx="42" cy="56" r="0.8" fill="#8a4818" opacity="0.6"/>' +
      '<circle cx="58" cy="56" r="0.8" fill="#8a4818" opacity="0.6"/>' +
      '<circle cx="46" cy="58" r="0.6" fill="#8a4818" opacity="0.5"/>' +
      // apron strap
      '<rect x="36" y="74" width="28" height="8" fill="#3a2818"/>' +
      '<rect x="38" y="76" width="24" height="2" fill="#d4a624"/>' +
    '</svg>';
  },

  dorrick(size) {
    const w = size || 80;
    return '<svg width="' + w + '" height="' + w + '" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><radialGradient id="dor-bg"><stop offset="0" stop-color="#5a3818"/><stop offset="1" stop-color="#1a1008"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="48" fill="url(#dor-bg)"/>' +
      // head/face — dwarf, broad
      '<ellipse cx="50" cy="40" rx="20" ry="20" fill="#c8a878" stroke="#3a2010" stroke-width="0.8"/>' +
      // hair
      '<path d="M 30 36 Q 50 22 70 36 L 70 44 Q 50 36 30 44 Z" fill="#3a1808"/>' +
      // ears
      '<ellipse cx="30" cy="42" rx="3" ry="4" fill="#c8a878"/>' +
      '<ellipse cx="70" cy="42" rx="3" ry="4" fill="#c8a878"/>' +
      // big braided beard
      '<path d="M 32 52 Q 50 78 68 52 L 70 84 Q 50 96 30 84 Z" fill="#3a1808"/>' +
      '<line x1="44" y1="62" x2="44" y2="86" stroke="#1a0808" stroke-width="1"/>' +
      '<line x1="50" y1="64" x2="50" y2="90" stroke="#1a0808" stroke-width="1"/>' +
      '<line x1="56" y1="62" x2="56" y2="86" stroke="#1a0808" stroke-width="1"/>' +
      // beard rings
      '<circle cx="44" cy="74" r="2" fill="#d4a624" stroke="#3a2010" stroke-width="0.5"/>' +
      '<circle cx="56" cy="74" r="2" fill="#d4a624" stroke="#3a2010" stroke-width="0.5"/>' +
      // eyes
      '<ellipse cx="42" cy="42" rx="1.6" ry="2" fill="#1a1008"/>' +
      '<ellipse cx="58" cy="42" rx="1.6" ry="2" fill="#1a1008"/>' +
      '<circle cx="42.5" cy="41.5" r="0.4" fill="#fff"/>' +
      '<circle cx="58.5" cy="41.5" r="0.4" fill="#fff"/>' +
      // brows
      '<line x1="38" y1="38" x2="46" y2="38" stroke="#3a1808" stroke-width="1.6"/>' +
      '<line x1="54" y1="38" x2="62" y2="38" stroke="#3a1808" stroke-width="1.6"/>' +
      // nose (broad)
      '<path d="M 48 44 Q 50 50 52 44 Q 50 52 48 44 Z" fill="#a88858"/>' +
    '</svg>';
  },

  // --------------------------------------------------------
  // ENEMY SPRITES
  // --------------------------------------------------------
  enemySprite(spriteId, sizeOpt) {
    const size = sizeOpt || 200;
    const vb = '0 0 200 250';
    let inner = '';
    if (spriteId === 'rubble_imp') {
      inner =
        // ground shadow
        '<ellipse cx="100" cy="240" rx="50" ry="6" fill="rgba(0,0,0,0.45)"/>' +
        // body — stack of stone
        '<polygon points="70,190 130,190 140,240 60,240" fill="#6a6058" stroke="#2a2418" stroke-width="2"/>' +
        '<polygon points="80,170 120,170 130,190 70,190" fill="#7a7068" stroke="#2a2418" stroke-width="1.5"/>' +
        // head — angular rock
        '<polygon points="74,110 126,110 132,164 68,164" fill="#8a8078" stroke="#2a2418" stroke-width="2"/>' +
        // eyes (glowing yellow)
        '<rect x="84" y="128" width="10" height="6" fill="#1a1008"/>' +
        '<rect x="106" y="128" width="10" height="6" fill="#1a1008"/>' +
        '<circle cx="89" cy="131" r="2" fill="#f0d27a"/>' +
        '<circle cx="111" cy="131" r="2" fill="#f0d27a"/>' +
        // mouth
        '<polygon points="86,148 114,148 110,158 90,158" fill="#1a1008"/>' +
        '<line x1="92" y1="148" x2="92" y2="158" stroke="#5a4838" stroke-width="0.8"/>' +
        '<line x1="100" y1="148" x2="100" y2="158" stroke="#5a4838" stroke-width="0.8"/>' +
        '<line x1="108" y1="148" x2="108" y2="158" stroke="#5a4838" stroke-width="0.8"/>' +
        // arms — short rocky stubs
        '<polygon points="58,180 70,200 56,220 44,200" fill="#7a7068" stroke="#2a2418" stroke-width="1.5"/>' +
        '<polygon points="142,180 156,200 144,220 130,200" fill="#7a7068" stroke="#2a2418" stroke-width="1.5"/>' +
        // cracks
        '<line x1="82" y1="114" x2="86" y2="124" stroke="#3a3428" stroke-width="0.6"/>' +
        '<line x1="118" y1="116" x2="120" y2="138" stroke="#3a3428" stroke-width="0.6"/>';
    } else if (spriteId === 'stone_grub') {
      inner =
        '<ellipse cx="100" cy="240" rx="65" ry="8" fill="rgba(0,0,0,0.5)"/>' +
        // segmented body
        '<ellipse cx="60" cy="200" rx="22" ry="18" fill="#6a6058" stroke="#2a2418" stroke-width="2"/>' +
        '<ellipse cx="92" cy="200" rx="24" ry="20" fill="#7a7068" stroke="#2a2418" stroke-width="2"/>' +
        '<ellipse cx="128" cy="200" rx="22" ry="18" fill="#6a6058" stroke="#2a2418" stroke-width="2"/>' +
        '<ellipse cx="155" cy="202" rx="18" ry="14" fill="#5a5048" stroke="#2a2418" stroke-width="1.5"/>' +
        // head
        '<polygon points="22,196 38,178 52,184 50,210 38,218" fill="#8a8078" stroke="#2a2418" stroke-width="2"/>' +
        // eyes (red coals)
        '<circle cx="34" cy="192" r="2.5" fill="#1a1008"/>' +
        '<circle cx="34" cy="192" r="1.5" fill="#cc3030"/>' +
        // teeth/mandibles
        '<polygon points="22,200 18,204 26,206" fill="#1a1008"/>' +
        '<polygon points="22,210 18,206 26,208" fill="#1a1008"/>' +
        // back ridges
        '<polygon points="80,180 88,170 96,180" fill="#5a5048" stroke="#2a2418" stroke-width="1"/>' +
        '<polygon points="112,180 120,170 128,180" fill="#5a5048" stroke="#2a2418" stroke-width="1"/>' +
        // ground rubble
        '<ellipse cx="30" cy="232" rx="6" ry="2" fill="#4a4038"/>' +
        '<ellipse cx="170" cy="232" rx="8" ry="2" fill="#4a4038"/>';
    } else if (spriteId === 'quarry_brute') {
      inner =
        '<ellipse cx="100" cy="240" rx="70" ry="8" fill="rgba(0,0,0,0.55)"/>' +
        // legs (cube blocks)
        '<rect x="60" y="200" width="28" height="40" fill="#5a4830" stroke="#2a1810" stroke-width="2"/>' +
        '<rect x="112" y="200" width="28" height="40" fill="#5a4830" stroke="#2a1810" stroke-width="2"/>' +
        // body (massive cube)
        '<rect x="44" y="120" width="112" height="90" fill="#6a5838" stroke="#2a1810" stroke-width="2.5"/>' +
        // body highlight
        '<polygon points="44,120 156,120 144,134 56,134" fill="#7a6848" stroke="none"/>' +
        // chest carving
        '<polygon points="80,148 120,148 130,178 70,178" fill="#3a2818" stroke="#2a1810" stroke-width="1.5"/>' +
        '<text x="100" y="170" text-anchor="middle" fill="#d4a624" font-family="Cinzel" font-size="16">V</text>' +
        // arms
        '<rect x="22" y="130" width="22" height="80" fill="#6a5838" stroke="#2a1810" stroke-width="2"/>' +
        '<rect x="156" y="130" width="22" height="80" fill="#6a5838" stroke="#2a1810" stroke-width="2"/>' +
        // fists
        '<rect x="14" y="206" width="32" height="24" fill="#5a4830" stroke="#2a1810" stroke-width="2"/>' +
        '<rect x="154" y="206" width="32" height="24" fill="#5a4830" stroke="#2a1810" stroke-width="2"/>' +
        // head (small cube)
        '<rect x="78" y="62" width="44" height="50" fill="#7a6848" stroke="#2a1810" stroke-width="2"/>' +
        // eyes (slits)
        '<rect x="84" y="80" width="10" height="3" fill="#1a1008"/>' +
        '<rect x="106" y="80" width="10" height="3" fill="#1a1008"/>' +
        '<rect x="86" y="80.5" width="3" height="2" fill="#cc8030"/>' +
        '<rect x="108" y="80.5" width="3" height="2" fill="#cc8030"/>' +
        // mouth
        '<rect x="90" y="98" width="20" height="6" fill="#1a1008"/>' +
        // pickaxe
        '<line x1="174" y1="60" x2="194" y2="220" stroke="#5a3818" stroke-width="6" stroke-linecap="round"/>' +
        '<polygon points="156,52 178,40 196,64 174,76" fill="#888" stroke="#2a1810" stroke-width="1.5"/>';
    } else if (spriteId === 'quarry_foreman') {
      // mini-boss — taller brute with banner
      inner =
        '<ellipse cx="100" cy="244" rx="85" ry="10" fill="rgba(0,0,0,0.6)"/>' +
        // banner pole
        '<line x1="160" y1="10" x2="160" y2="120" stroke="#3a2010" stroke-width="3"/>' +
        '<polygon points="160,12 188,18 184,40 160,32" fill="#8a2828" stroke="#3a1010" stroke-width="1.5"/>' +
        '<text x="172" y="28" fill="#d4a624" font-family="Cinzel" font-size="12">∑</text>' +
        // legs
        '<rect x="56" y="200" width="32" height="44" fill="#5a3a18" stroke="#1a0a08" stroke-width="2.5"/>' +
        '<rect x="112" y="200" width="32" height="44" fill="#5a3a18" stroke="#1a0a08" stroke-width="2.5"/>' +
        // belt
        '<rect x="44" y="190" width="112" height="14" fill="#3a2010" stroke="#1a0a08" stroke-width="1.5"/>' +
        '<circle cx="100" cy="197" r="5" fill="#d4a624" stroke="#1a0a08" stroke-width="1"/>' +
        // torso
        '<rect x="40" y="110" width="120" height="80" fill="#6a4828" stroke="#1a0a08" stroke-width="2.5"/>' +
        // armor plates
        '<polygon points="40,110 160,110 152,124 48,124" fill="#7a5838"/>' +
        '<polygon points="60,128 140,128 144,150 56,150" fill="#3a2010" stroke="#1a0a08" stroke-width="1.5"/>' +
        '<text x="100" y="146" text-anchor="middle" fill="#d4a624" font-family="Cinzel" font-size="16">FORE</text>' +
        // arms
        '<rect x="14" y="120" width="26" height="80" fill="#6a4828" stroke="#1a0a08" stroke-width="2"/>' +
        '<rect x="160" y="120" width="26" height="80" fill="#6a4828" stroke="#1a0a08" stroke-width="2"/>' +
        // fists
        '<rect x="6" y="194" width="38" height="28" fill="#5a3a18" stroke="#1a0a08" stroke-width="2"/>' +
        '<rect x="156" y="194" width="38" height="28" fill="#5a3a18" stroke="#1a0a08" stroke-width="2"/>' +
        // head — horned helm
        '<rect x="70" y="48" width="60" height="60" fill="#7a5838" stroke="#1a0a08" stroke-width="2.5"/>' +
        // horns
        '<polygon points="70,48 56,18 76,38" fill="#3a2818" stroke="#1a0a08" stroke-width="1.5"/>' +
        '<polygon points="130,48 144,18 124,38" fill="#3a2818" stroke="#1a0a08" stroke-width="1.5"/>' +
        // visor slit
        '<rect x="76" y="74" width="48" height="6" fill="#1a0808"/>' +
        '<rect x="80" y="75" width="6" height="3" fill="#ee4040"/>' +
        '<rect x="114" y="75" width="6" height="3" fill="#ee4040"/>' +
        // jaw mark
        '<polygon points="84,90 116,90 108,108 92,108" fill="#1a0808"/>' +
        // ground crack
        '<line x1="60" y1="244" x2="80" y2="248" stroke="#1a0808" stroke-width="1"/>' +
        '<line x1="120" y1="248" x2="140" y2="244" stroke="#1a0808" stroke-width="1"/>';
    } else if (spriteId === 'hollowed_one') {
      // final boss — massive cube creature, void inside
      inner =
        '<defs>' +
          '<radialGradient id="hol-void" cx="0.5" cy="0.5" r="0.6">' +
            '<stop offset="0" stop-color="#7a3878"/>' +
            '<stop offset="0.6" stop-color="#2a0838"/>' +
            '<stop offset="1" stop-color="#0a0210"/>' +
          '</radialGradient>' +
          '<linearGradient id="hol-stone" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="#5a5048"/>' +
            '<stop offset="1" stop-color="#2a2418"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<ellipse cx="100" cy="244" rx="92" ry="12" fill="rgba(0,0,0,0.65)"/>' +
        // outer cube (massive)
        '<polygon points="20,80 100,40 180,80 180,210 100,250 20,210" fill="url(#hol-stone)" stroke="#0a0408" stroke-width="2.5"/>' +
        // top face
        '<polygon points="20,80 100,40 180,80 100,120" fill="#7a7068" stroke="#0a0408" stroke-width="1.5"/>' +
        // right face shading
        '<polygon points="180,80 180,210 100,250 100,120" fill="#3a3028" stroke="#0a0408" stroke-width="1.5"/>' +
        // glyphs on left face
        '<text x="40" y="140" fill="#7a3878" font-family="Cinzel" font-size="14" opacity="0.85">∑</text>' +
        '<text x="60" y="170" fill="#7a3878" font-family="Cinzel" font-size="14" opacity="0.85">π</text>' +
        '<text x="40" y="200" fill="#7a3878" font-family="Cinzel" font-size="14" opacity="0.85">∞</text>' +
        // central wound — the hollow
        '<polygon points="74,118 126,118 126,180 74,180" fill="url(#hol-void)" stroke="#7a3878" stroke-width="1.5"/>' +
        // void inner glow
        '<polygon points="84,128 116,128 116,170 84,170" fill="#1a0420"/>' +
        // void eye
        '<ellipse cx="100" cy="148" rx="9" ry="14" fill="#cc4878"/>' +
        '<ellipse cx="100" cy="148" rx="4" ry="9" fill="#1a0420"/>' +
        '<circle cx="100" cy="146" r="1.5" fill="#fff" opacity="0.6"/>' +
        // floating fragments around boss
        '<polygon points="10,60 22,52 30,66 18,74" fill="#5a5048" stroke="#0a0408" stroke-width="1"/>' +
        '<polygon points="170,40 182,32 190,44 178,52" fill="#5a5048" stroke="#0a0408" stroke-width="1"/>' +
        '<polygon points="186,156 198,150 200,164 186,166" fill="#5a5048" stroke="#0a0408" stroke-width="1"/>' +
        // chains
        '<line x1="12" y1="20" x2="40" y2="80" stroke="#3a2010" stroke-width="1.5" stroke-dasharray="3 2"/>' +
        '<line x1="188" y1="20" x2="160" y2="80" stroke="#3a2010" stroke-width="1.5" stroke-dasharray="3 2"/>';
    } else {
      // try Act II sprites
      const act2 = this._enemyAct2(spriteId);
      if (act2) inner = act2;
      else inner = '<rect x="60" y="60" width="80" height="100" fill="#5a4838"/>';
    }
    return '<svg width="' + size + '" height="' + size * (250/200) + '" viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  },

  // --------------------------------------------------------
  // SCENE ILLUSTRATIONS
  // --------------------------------------------------------

  // ----- Numeria, the village hub (rebuilt after old crisis) -----
  numeriaHub() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<linearGradient id="nh-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#5a4878"/>' +
          '<stop offset="0.6" stop-color="#c47828"/>' +
          '<stop offset="1" stop-color="#7a3818"/>' +
        '</linearGradient>' +
        '<linearGradient id="nh-ground" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#4a3818"/>' +
          '<stop offset="1" stop-color="#2a1810"/>' +
        '</linearGradient>' +
      '</defs>' +
      // sky
      '<rect width="800" height="240" fill="url(#nh-sky)"/>' +
      // distant mountains
      '<polygon points="0,200 80,140 160,180 240,120 320,170 400,130 480,180 560,140 640,170 720,130 800,180 800,240 0,240" fill="#3a2848" opacity="0.7"/>' +
      '<polygon points="0,220 100,170 200,200 300,160 400,210 500,170 600,200 700,160 800,210 800,240 0,240" fill="#2a1838" opacity="0.7"/>' +
      // sun setting
      '<circle cx="600" cy="160" r="40" fill="#f0d27a" opacity="0.9"/>' +
      '<circle cx="600" cy="160" r="60" fill="#f0d27a" opacity="0.2"/>' +
      // ground
      '<rect y="240" width="800" height="120" fill="url(#nh-ground)"/>' +
      // path stones
      '<ellipse cx="400" cy="320" rx="200" ry="20" fill="#5a4828" opacity="0.6"/>' +
      // tavern (left)
      '<g transform="translate(60, 100)">' +
        '<polygon points="0,130 0,60 70,20 140,60 140,130" fill="#7a4828" stroke="#3a1810" stroke-width="2.5"/>' +
        '<polygon points="-10,62 70,12 150,62 70,22" fill="#5a2818" stroke="#3a1810" stroke-width="2.5"/>' +
        // door
        '<rect x="58" y="80" width="24" height="50" fill="#3a1810" stroke="#1a0808" stroke-width="1.5"/>' +
        '<circle cx="76" cy="106" r="1.5" fill="#d4a624"/>' +
        // window
        '<rect x="20" y="74" width="22" height="22" fill="#ffaa55" stroke="#3a1810" stroke-width="1.5"/>' +
        '<line x1="31" y1="74" x2="31" y2="96" stroke="#3a1810" stroke-width="0.6"/>' +
        '<rect x="98" y="74" width="22" height="22" fill="#ffaa55" stroke="#3a1810" stroke-width="1.5"/>' +
        '<line x1="109" y1="74" x2="109" y2="96" stroke="#3a1810" stroke-width="0.6"/>' +
        // sign
        '<rect x="-8" y="48" width="40" height="14" fill="#5a3010" stroke="#3a1810" stroke-width="1"/>' +
        '<text x="12" y="58" text-anchor="middle" fill="#d4a624" font-family="IM Fell English SC" font-size="8">COMPASS</text>' +
        // chimney smoke
        '<rect x="100" y="18" width="10" height="20" fill="#3a1810"/>' +
        '<path d="M 102 18 Q 100 4 108 -8 Q 116 -4 110 12" fill="rgba(255,255,255,0.18)"/>' +
      '</g>' +
      // smithy (right) — anvil out front
      '<g transform="translate(540, 110)">' +
        '<polygon points="0,120 0,40 100,40 100,120" fill="#5a4828" stroke="#1a1008" stroke-width="2.5"/>' +
        '<polygon points="-10,42 50,4 110,42" fill="#3a2018" stroke="#1a1008" stroke-width="2.5"/>' +
        // open forge (orange glow)
        '<rect x="20" y="64" width="60" height="40" fill="#cc4818" stroke="#1a1008" stroke-width="2"/>' +
        '<rect x="24" y="68" width="52" height="32" fill="#f0d27a"/>' +
        '<rect x="28" y="78" width="44" height="14" fill="#f08838"/>' +
        // anvil
        '<polygon points="36,116 56,116 60,128 32,128" fill="#3a3838" stroke="#1a1008" stroke-width="1.5"/>' +
        '<rect x="20" y="128" width="56" height="6" fill="#5a4818"/>' +
        // sign
        '<rect x="76" y="20" width="44" height="14" fill="#5a3010" stroke="#3a1810" stroke-width="1"/>' +
        '<text x="98" y="30" text-anchor="middle" fill="#d4a624" font-family="IM Fell English SC" font-size="8">FORGE</text>' +
      '</g>' +
      // central well
      '<g transform="translate(360, 220)">' +
        '<rect x="-30" y="40" width="60" height="40" fill="#5a4838" stroke="#1a1008" stroke-width="1.5" rx="3"/>' +
        '<rect x="-26" y="42" width="52" height="36" fill="#3a2818"/>' +
        '<rect x="-32" y="38" width="64" height="6" fill="#4a3828" stroke="#1a1008" stroke-width="1"/>' +
        '<line x1="-20" y1="10" x2="-20" y2="44" stroke="#3a2010" stroke-width="3"/>' +
        '<line x1="20" y1="10" x2="20" y2="44" stroke="#3a2010" stroke-width="3"/>' +
        '<line x1="-26" y1="10" x2="26" y2="10" stroke="#3a2010" stroke-width="3"/>' +
        '<polygon points="-26,4 26,4 30,10 -30,10" fill="#5a3818" stroke="#1a1008" stroke-width="1"/>' +
        // rope + bucket
        '<line x1="0" y1="10" x2="0" y2="38" stroke="#bfa050" stroke-width="1"/>' +
      '</g>' +
      // Lysara's tower (back)
      '<g transform="translate(360, 60)">' +
        '<rect x="-22" y="60" width="44" height="120" fill="#4a3a58" stroke="#1a0a18" stroke-width="2"/>' +
        '<polygon points="-26,60 22,60 22,68 -26,68" fill="#6a4878" stroke="#1a0a18" stroke-width="1.5"/>' +
        '<polygon points="-22,60 22,60 0,20" fill="#3a1a48" stroke="#1a0a18" stroke-width="2"/>' +
        // glowing window
        '<rect x="-8" y="80" width="16" height="22" fill="#a890c0" stroke="#1a0a18" stroke-width="1.5"/>' +
        '<rect x="-7" y="81" width="14" height="20" fill="#c4a8d8"/>' +
        '<line x1="0" y1="80" x2="0" y2="102" stroke="#1a0a18" stroke-width="0.5"/>' +
        // star atop spire
        '<polygon points="0,8 3,16 11,16 5,21 7,29 0,24 -7,29 -5,21 -11,16 -3,16" fill="#d4a624"/>' +
      '</g>' +
      // foreground figures (silhouettes)
      '<g transform="translate(280, 280)" opacity="0.85">' +
        '<ellipse cx="0" cy="40" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>' +
        '<rect x="-6" y="6" width="12" height="34" fill="#2a1810"/>' +
        '<ellipse cx="0" cy="-2" rx="8" ry="10" fill="#2a1810"/>' +
      '</g>' +
      '<g transform="translate(460, 290)" opacity="0.85">' +
        '<ellipse cx="0" cy="36" rx="10" ry="3" fill="rgba(0,0,0,0.4)"/>' +
        '<rect x="-5" y="4" width="10" height="30" fill="#2a1810"/>' +
        '<ellipse cx="0" cy="-4" rx="7" ry="9" fill="#2a1810"/>' +
      '</g>' +
      // foreground torches
      '<g transform="translate(140, 290)">' +
        '<rect x="-2" y="0" width="4" height="50" fill="#3a2010"/>' +
        '<ellipse cx="0" cy="-4" rx="5" ry="9" fill="#f08838"/>' +
        '<ellipse cx="0" cy="-8" rx="3" ry="6" fill="#f0d27a"/>' +
      '</g>' +
      '<g transform="translate(620, 290)">' +
        '<rect x="-2" y="0" width="4" height="50" fill="#3a2010"/>' +
        '<ellipse cx="0" cy="-4" rx="5" ry="9" fill="#f08838"/>' +
        '<ellipse cx="0" cy="-8" rx="3" ry="6" fill="#f0d27a"/>' +
      '</g>' +
    '</svg>';
  },

  // ----- Lysara's study -----
  lysaraStudy() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<radialGradient id="ls-light" cx="0.5" cy="0.5" r="0.8">' +
          '<stop offset="0" stop-color="#a890c0" stop-opacity="0.35"/>' +
          '<stop offset="1" stop-color="#1a0a18" stop-opacity="0"/>' +
        '</radialGradient>' +
      '</defs>' +
      // wall
      '<rect width="800" height="360" fill="#2a1838"/>' +
      '<rect width="800" height="360" fill="url(#ls-light)"/>' +
      // floor
      '<polygon points="0,260 800,260 760,360 40,360" fill="#3a2848"/>' +
      // stone wall texture
      '<g opacity="0.4">' +
        '<rect x="0" y="0" width="800" height="2" fill="#1a0a18"/>' +
        '<rect x="0" y="60" width="800" height="2" fill="#1a0a18"/>' +
        '<rect x="0" y="120" width="800" height="2" fill="#1a0a18"/>' +
        '<rect x="0" y="180" width="800" height="2" fill="#1a0a18"/>' +
        '<rect x="40" y="0" width="2" height="60" fill="#1a0a18"/>' +
        '<rect x="160" y="0" width="2" height="60" fill="#1a0a18"/>' +
        '<rect x="280" y="0" width="2" height="60" fill="#1a0a18"/>' +
        '<rect x="400" y="0" width="2" height="60" fill="#1a0a18"/>' +
        '<rect x="520" y="0" width="2" height="60" fill="#1a0a18"/>' +
        '<rect x="640" y="0" width="2" height="60" fill="#1a0a18"/>' +
        '<rect x="760" y="0" width="2" height="60" fill="#1a0a18"/>' +
      '</g>' +
      // arched window (back)
      '<path d="M 350 40 Q 400 0 450 40 L 450 160 L 350 160 Z" fill="#a890c0" stroke="#5a3878" stroke-width="3"/>' +
      '<line x1="400" y1="20" x2="400" y2="160" stroke="#5a3878" stroke-width="2"/>' +
      '<line x1="350" y1="80" x2="450" y2="80" stroke="#5a3878" stroke-width="2"/>' +
      // stars through window
      '<circle cx="372" cy="50" r="1.4" fill="#fff"/>' +
      '<circle cx="424" cy="60" r="1.2" fill="#fff"/>' +
      '<circle cx="380" cy="98" r="1.6" fill="#fff"/>' +
      '<circle cx="420" cy="120" r="1.4" fill="#fff"/>' +
      // bookshelves (left)
      '<g transform="translate(40, 80)">' +
        '<rect x="0" y="0" width="200" height="180" fill="#3a1810" stroke="#1a0808" stroke-width="2"/>' +
        '<line x1="0" y1="50" x2="200" y2="50" stroke="#1a0808" stroke-width="2"/>' +
        '<line x1="0" y1="100" x2="200" y2="100" stroke="#1a0808" stroke-width="2"/>' +
        '<line x1="0" y1="150" x2="200" y2="150" stroke="#1a0808" stroke-width="2"/>' +
        // book spines row 1
        '<rect x="10" y="8" width="14" height="40" fill="#7a2828"/>' +
        '<rect x="26" y="8" width="10" height="40" fill="#3a5878"/>' +
        '<rect x="38" y="10" width="18" height="38" fill="#5a3878"/>' +
        '<rect x="58" y="6" width="12" height="42" fill="#7a5828"/>' +
        '<rect x="72" y="14" width="22" height="34" fill="#3a7858" rx="2"/>' +
        '<rect x="96" y="8" width="14" height="40" fill="#5a2828"/>' +
        '<rect x="112" y="10" width="10" height="38" fill="#7a5828"/>' +
        '<rect x="124" y="8" width="16" height="40" fill="#3a3878"/>' +
        '<rect x="142" y="12" width="14" height="36" fill="#5a3818"/>' +
        '<rect x="158" y="6" width="20" height="42" fill="#7a2858"/>' +
        '<rect x="180" y="10" width="12" height="38" fill="#3a5828"/>' +
        // row 2
        '<rect x="10" y="58" width="20" height="40" fill="#3a3848"/>' +
        '<rect x="32" y="60" width="14" height="38" fill="#7a5828"/>' +
        '<rect x="48" y="62" width="22" height="36" fill="#5a2828"/>' +
        '<rect x="72" y="58" width="12" height="40" fill="#3a7848"/>' +
        '<rect x="86" y="64" width="16" height="34" fill="#7a3878"/>' +
        '<rect x="104" y="60" width="14" height="38" fill="#5a3818"/>' +
        '<rect x="120" y="58" width="10" height="40" fill="#3a5878"/>' +
        '<rect x="132" y="62" width="20" height="36" fill="#7a5828"/>' +
        '<rect x="154" y="60" width="12" height="38" fill="#3a3838"/>' +
        '<rect x="168" y="58" width="22" height="40" fill="#5a3878"/>' +
        // row 3
        '<rect x="10" y="108" width="16" height="40" fill="#7a2828"/>' +
        '<rect x="28" y="110" width="14" height="38" fill="#3a3848"/>' +
        '<rect x="44" y="112" width="20" height="36" fill="#5a5828"/>' +
        '<rect x="66" y="106" width="12" height="42" fill="#7a3878"/>' +
        '<rect x="80" y="108" width="16" height="40" fill="#3a7848"/>' +
        '<rect x="98" y="110" width="14" height="38" fill="#5a2828"/>' +
        '<rect x="114" y="112" width="22" height="36" fill="#3a3878"/>' +
        '<rect x="138" y="108" width="10" height="40" fill="#7a5828"/>' +
        '<rect x="150" y="110" width="18" height="38" fill="#5a3818"/>' +
        '<rect x="170" y="106" width="14" height="42" fill="#3a5828"/>' +
        // row 4
        '<rect x="20" y="158" width="40" height="6" fill="#bfa050"/>' +
        '<rect x="80" y="156" width="32" height="8" fill="#7a3838"/>' +
        '<rect x="130" y="160" width="50" height="6" fill="#bfa050"/>' +
        '<text x="180" y="172" fill="#d4a624" font-family="Cinzel" font-size="6" opacity="0.7">scroll</text>' +
      '</g>' +
      // desk with open codex
      '<g transform="translate(280, 260)">' +
        '<rect x="0" y="0" width="240" height="14" fill="#5a3818" stroke="#1a0808" stroke-width="1.5"/>' +
        '<rect x="6" y="14" width="8" height="50" fill="#5a3818"/>' +
        '<rect x="226" y="14" width="8" height="50" fill="#5a3818"/>' +
        // open book
        '<path d="M 24 -28 Q 60 -36 120 -32 Q 180 -36 216 -28 L 216 -2 Q 180 -8 120 -4 Q 60 -8 24 -2 Z" fill="#7a3818" stroke="#3a1810" stroke-width="1.5"/>' +
        '<path d="M 28 -26 Q 60 -32 116 -30 L 116 -4 Q 60 -8 28 -4 Z" fill="#f0e3bd" stroke="#3a2010" stroke-width="0.6"/>' +
        '<path d="M 212 -26 Q 180 -32 124 -30 L 124 -4 Q 180 -8 212 -4 Z" fill="#f0e3bd" stroke="#3a2010" stroke-width="0.6"/>' +
        '<rect x="116" y="-30" width="8" height="28" fill="#5a1818"/>' +
        // numbers on page
        '<text x="60" y="-18" fill="#3a2010" font-family="Cinzel" font-size="6">∑ x³ = V</text>' +
        '<text x="150" y="-18" fill="#3a2010" font-family="Cinzel" font-size="6">l·w·h</text>' +
        // candle
        '<rect x="200" y="-50" width="6" height="24" fill="#f0e3bd"/>' +
        '<ellipse cx="203" cy="-54" rx="3" ry="6" fill="#ffcc55"/>' +
        '<circle cx="203" cy="-44" r="20" fill="#ffaa33" opacity="0.18"/>' +
        // inkwell + quill
        '<ellipse cx="32" cy="-30" rx="6" ry="3" fill="#1a1008"/>' +
        '<line x1="32" y1="-30" x2="50" y2="-58" stroke="#c47828" stroke-width="1.5"/>' +
      '</g>' +
      // crystal orb (right side)
      '<g transform="translate(620, 280)">' +
        '<rect x="-8" y="-2" width="16" height="6" fill="#3a1818"/>' +
        '<circle cx="0" cy="-18" r="22" fill="#a890c0" stroke="#5a3878" stroke-width="2" opacity="0.85"/>' +
        '<circle cx="-4" cy="-22" r="6" fill="#fff" opacity="0.5"/>' +
        // glow
        '<circle cx="0" cy="-18" r="42" fill="#c4a8d8" opacity="0.18"/>' +
      '</g>' +
      // floating runes
      '<text x="100" y="40" fill="#a890c0" font-family="Cinzel" font-size="14" opacity="0.4">∑</text>' +
      '<text x="700" y="60" fill="#a890c0" font-family="Cinzel" font-size="14" opacity="0.4">π</text>' +
      '<text x="560" y="50" fill="#a890c0" font-family="Cinzel" font-size="14" opacity="0.4">Δ</text>' +
      '<text x="180" y="240" fill="#a890c0" font-family="Cinzel" font-size="14" opacity="0.4">∞</text>' +
    '</svg>';
  },

  // ----- The Rusty Compass tavern interior -----
  tavernInterior() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      // wall
      '<rect width="800" height="240" fill="#5a3818"/>' +
      '<rect width="800" height="120" fill="#3a2010"/>' +
      // floor
      '<polygon points="0,240 800,240 760,360 40,360" fill="#3a2010"/>' +
      // wood planks
      '<line x1="40" y1="280" x2="760" y2="280" stroke="#1a1008" stroke-width="1"/>' +
      '<line x1="60" y1="320" x2="740" y2="320" stroke="#1a1008" stroke-width="1"/>' +
      // ceiling beams
      '<line x1="0" y1="60" x2="800" y2="60" stroke="#1a1008" stroke-width="3"/>' +
      '<line x1="160" y1="0" x2="160" y2="60" stroke="#3a2010" stroke-width="3"/>' +
      '<line x1="400" y1="0" x2="400" y2="60" stroke="#3a2010" stroke-width="3"/>' +
      '<line x1="640" y1="0" x2="640" y2="60" stroke="#3a2010" stroke-width="3"/>' +
      // hanging lanterns
      '<g transform="translate(240, 60)">' +
        '<line x1="0" y1="0" x2="0" y2="24" stroke="#1a1008" stroke-width="1"/>' +
        '<rect x="-12" y="24" width="24" height="28" fill="#5a3818" stroke="#1a1008" stroke-width="1.5"/>' +
        '<rect x="-8" y="28" width="16" height="20" fill="#ffcc55"/>' +
        '<circle cx="0" cy="38" r="40" fill="#ffaa33" opacity="0.18"/>' +
      '</g>' +
      '<g transform="translate(560, 60)">' +
        '<line x1="0" y1="0" x2="0" y2="24" stroke="#1a1008" stroke-width="1"/>' +
        '<rect x="-12" y="24" width="24" height="28" fill="#5a3818" stroke="#1a1008" stroke-width="1.5"/>' +
        '<rect x="-8" y="28" width="16" height="20" fill="#ffcc55"/>' +
        '<circle cx="0" cy="38" r="40" fill="#ffaa33" opacity="0.18"/>' +
      '</g>' +
      // hearth (back)
      '<g transform="translate(400, 80)">' +
        '<rect x="-50" y="0" width="100" height="120" fill="#3a2010" stroke="#1a1008" stroke-width="2"/>' +
        '<rect x="-46" y="20" width="92" height="80" fill="#1a1008"/>' +
        // fire
        '<polygon points="-30,100 -20,60 -10,80 0,40 10,80 20,60 30,100" fill="#f08838"/>' +
        '<polygon points="-20,100 -12,72 -4,84 4,52 12,84 20,72 28,100" fill="#f0d27a"/>' +
        // logs
        '<ellipse cx="-15" cy="100" rx="10" ry="4" fill="#3a1810"/>' +
        '<ellipse cx="10" cy="100" rx="10" ry="4" fill="#3a1810"/>' +
        // mantel
        '<rect x="-58" y="-6" width="116" height="8" fill="#5a3818" stroke="#1a1008" stroke-width="1.5"/>' +
        // compass picture above
        '<circle cx="0" cy="-30" r="14" fill="#3a2010" stroke="#d4a624" stroke-width="1.5"/>' +
        '<polygon points="0,-40 3,-30 0,-20 -3,-30" fill="#d4a624"/>' +
        '<polygon points="-10,-30 0,-32 10,-30 0,-28" fill="#d4a624"/>' +
      '</g>' +
      // bar counter (front-left)
      '<g transform="translate(40, 240)">' +
        '<rect x="0" y="0" width="280" height="20" fill="#5a3818" stroke="#1a1008" stroke-width="1.5"/>' +
        '<rect x="0" y="20" width="280" height="60" fill="#3a2010" stroke="#1a1008" stroke-width="1.5"/>' +
        // grain
        '<line x1="0" y1="40" x2="280" y2="40" stroke="#1a1008" stroke-width="0.8"/>' +
        '<line x1="0" y1="60" x2="280" y2="60" stroke="#1a1008" stroke-width="0.8"/>' +
        // mug
        '<rect x="40" y="-22" width="18" height="22" fill="#888" stroke="#3a2010" stroke-width="1.2"/>' +
        '<rect x="42" y="-22" width="14" height="6" fill="#f0e3bd"/>' +
        '<path d="M 58 -16 Q 66 -12 58 -8" fill="none" stroke="#888" stroke-width="2"/>' +
        // bowl
        '<ellipse cx="120" cy="-4" rx="20" ry="6" fill="#5a3818" stroke="#1a1008" stroke-width="1.5"/>' +
        '<ellipse cx="120" cy="-6" rx="16" ry="4" fill="#8a5818"/>' +
      '</g>' +
      // tables (right)
      '<g transform="translate(540, 280)">' +
        '<rect x="0" y="0" width="80" height="8" fill="#5a3818" stroke="#1a1008" stroke-width="1.5"/>' +
        '<rect x="6" y="8" width="6" height="40" fill="#3a2010"/>' +
        '<rect x="68" y="8" width="6" height="40" fill="#3a2010"/>' +
        // tankard
        '<rect x="34" y="-16" width="12" height="16" fill="#888" stroke="#3a2010" stroke-width="1"/>' +
      '</g>' +
      '<g transform="translate(640, 250)">' +
        '<rect x="0" y="0" width="80" height="8" fill="#5a3818" stroke="#1a1008" stroke-width="1.5"/>' +
        '<rect x="6" y="8" width="6" height="40" fill="#3a2010"/>' +
        '<rect x="68" y="8" width="6" height="40" fill="#3a2010"/>' +
      '</g>' +
      // hanging map
      '<g transform="translate(120, 80)">' +
        '<rect x="0" y="0" width="60" height="44" fill="#e8d5b5" stroke="#3a2010" stroke-width="1.5"/>' +
        '<line x1="0" y1="0" x2="60" y2="44" stroke="#3a2010" stroke-width="0.4"/>' +
        '<line x1="60" y1="0" x2="0" y2="44" stroke="#3a2010" stroke-width="0.4"/>' +
        '<circle cx="30" cy="22" r="6" fill="none" stroke="#aa2828" stroke-width="1.2"/>' +
        '<text x="30" y="42" text-anchor="middle" fill="#5a3010" font-family="Cinzel" font-size="6">NUMERIA</text>' +
      '</g>' +
      // dust motes
      '<circle cx="200" cy="150" r="1" fill="#f0d27a" opacity="0.4"/>' +
      '<circle cx="320" cy="100" r="1" fill="#f0d27a" opacity="0.4"/>' +
      '<circle cx="500" cy="130" r="1" fill="#f0d27a" opacity="0.4"/>' +
    '</svg>';
  },

  // ----- Dorrick's forge -----
  forge() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      // wall
      '<rect width="800" height="240" fill="#3a2818"/>' +
      // floor
      '<rect y="240" width="800" height="120" fill="#2a1810"/>' +
      // forge centerpiece
      '<g transform="translate(360, 100)">' +
        // stone forge
        '<rect x="0" y="40" width="200" height="120" fill="#5a4828" stroke="#1a1008" stroke-width="2.5"/>' +
        '<rect x="-10" y="30" width="220" height="14" fill="#3a2818" stroke="#1a1008" stroke-width="2"/>' +
        // chimney
        '<rect x="60" y="-100" width="80" height="140" fill="#3a2818" stroke="#1a1008" stroke-width="2"/>' +
        '<polygon points="40,-100 60,-130 140,-130 160,-100" fill="#1a1008"/>' +
        // forge opening with fire
        '<rect x="40" y="64" width="120" height="80" fill="#1a0808"/>' +
        '<rect x="48" y="72" width="104" height="68" fill="#cc4818"/>' +
        '<rect x="56" y="84" width="88" height="48" fill="#f08838"/>' +
        '<rect x="64" y="100" width="72" height="28" fill="#f0d27a"/>' +
        // flame tongues
        '<polygon points="60,72 70,40 80,72" fill="#f08838"/>' +
        '<polygon points="80,72 92,30 104,72" fill="#f0d27a"/>' +
        '<polygon points="104,72 116,40 128,72" fill="#f08838"/>' +
        '<polygon points="128,72 138,50 148,72" fill="#f0d27a"/>' +
        // smoke
        '<path d="M 100 -100 Q 92 -116 100 -130 Q 108 -120 100 -100" fill="rgba(255,255,255,0.2)"/>' +
      '</g>' +
      // anvil (front)
      '<g transform="translate(200, 280)">' +
        '<polygon points="0,0 60,0 70,20 -10,20" fill="#3a3838" stroke="#1a1008" stroke-width="2"/>' +
        '<rect x="-12" y="20" width="84" height="10" fill="#5a4818"/>' +
        '<rect x="20" y="30" width="20" height="50" fill="#3a2010"/>' +
        // hammer on top
        '<line x1="20" y1="-30" x2="38" y2="-2" stroke="#5a3818" stroke-width="3"/>' +
        '<rect x="14" y="-36" width="20" height="12" fill="#3a3838" stroke="#1a1008" stroke-width="1.5"/>' +
        // glowing sword on anvil
        '<rect x="-4" y="-2" width="40" height="4" fill="#f08838"/>' +
        '<rect x="36" y="-3" width="4" height="6" fill="#3a2010"/>' +
        '<circle cx="38" cy="0" r="14" fill="#f08838" opacity="0.3"/>' +
      '</g>' +
      // weapon rack (right wall)
      '<g transform="translate(600, 80)">' +
        '<rect x="0" y="0" width="160" height="220" fill="#4a3818" stroke="#1a1008" stroke-width="2"/>' +
        '<line x1="0" y1="60" x2="160" y2="60" stroke="#1a1008" stroke-width="1.5"/>' +
        '<line x1="0" y1="120" x2="160" y2="120" stroke="#1a1008" stroke-width="1.5"/>' +
        '<line x1="0" y1="180" x2="160" y2="180" stroke="#1a1008" stroke-width="1.5"/>' +
        // sword
        '<line x1="30" y1="8" x2="30" y2="56" stroke="#b8c0c8" stroke-width="3"/>' +
        '<rect x="26" y="46" width="8" height="3" fill="#5a3818"/>' +
        // axe
        '<line x1="80" y1="8" x2="80" y2="56" stroke="#5a3818" stroke-width="2.5"/>' +
        '<polygon points="68,16 88,8 96,24 76,32" fill="#888" stroke="#1a1008" stroke-width="1"/>' +
        // hammer
        '<line x1="130" y1="8" x2="130" y2="56" stroke="#5a3818" stroke-width="2.5"/>' +
        '<rect x="120" y="6" width="20" height="14" fill="#3a3838" stroke="#1a1008" stroke-width="1"/>' +
        // shields
        '<path d="M 24 70 Q 40 60 56 70 L 56 100 Q 40 116 24 100 Z" fill="#7a4828" stroke="#1a1008" stroke-width="1.5"/>' +
        '<circle cx="40" cy="86" r="4" fill="#d4a624"/>' +
        '<path d="M 84 70 Q 100 60 116 70 L 116 100 Q 100 116 84 100 Z" fill="#3a3a78" stroke="#1a1008" stroke-width="1.5"/>' +
        '<polygon points="100,76 104,86 100,96 96,86" fill="#d4a624"/>' +
        // armor
        '<polygon points="20,130 60,130 65,170 15,170" fill="#888" stroke="#1a1008" stroke-width="1.5"/>' +
        '<polygon points="80,130 120,130 125,170 75,170" fill="#3a3838" stroke="#1a1008" stroke-width="1.5"/>' +
        // helmets
        '<path d="M 24 192 Q 40 184 56 192 L 56 212 L 24 212 Z" fill="#888" stroke="#1a1008" stroke-width="1.5"/>' +
        '<line x1="40" y1="192" x2="40" y2="212" stroke="#1a1008" stroke-width="0.8"/>' +
        '<path d="M 84 192 Q 100 184 116 192 L 116 212 L 84 212 Z" fill="#5a4828" stroke="#1a1008" stroke-width="1.5"/>' +
      '</g>' +
      // tool barrel (left front)
      '<g transform="translate(80, 280)">' +
        '<rect x="0" y="0" width="60" height="50" fill="#5a3818" stroke="#1a1008" stroke-width="2"/>' +
        '<line x1="0" y1="14" x2="60" y2="14" stroke="#1a1008" stroke-width="1"/>' +
        '<line x1="0" y1="36" x2="60" y2="36" stroke="#1a1008" stroke-width="1"/>' +
        // tools sticking out
        '<line x1="14" y1="-30" x2="16" y2="0" stroke="#5a3818" stroke-width="2.5"/>' +
        '<polygon points="10,-32 18,-32 16,-22 12,-22" fill="#888"/>' +
        '<line x1="36" y1="-26" x2="38" y2="0" stroke="#5a3818" stroke-width="2.5"/>' +
        '<rect x="32" y="-30" width="12" height="6" fill="#3a3838"/>' +
        '<line x1="50" y1="-20" x2="48" y2="0" stroke="#5a3818" stroke-width="2"/>' +
      '</g>' +
      // hanging chains
      '<line x1="40" y1="0" x2="40" y2="100" stroke="#3a2018" stroke-width="1" stroke-dasharray="3 3"/>' +
      '<line x1="780" y1="0" x2="780" y2="80" stroke="#3a2018" stroke-width="1" stroke-dasharray="3 3"/>' +
      // ember sparks
      '<circle cx="380" cy="80" r="1.4" fill="#f0d27a"/>' +
      '<circle cx="420" cy="60" r="1" fill="#f08838"/>' +
      '<circle cx="460" cy="90" r="1.4" fill="#f0d27a"/>' +
      '<circle cx="350" cy="120" r="1" fill="#f08838"/>' +
      // ambient orange glow
      '<rect width="800" height="360" fill="rgba(204,72,24,0.06)"/>' +
    '</svg>';
  },

  // ----- The Sundered Quarry exterior -----
  quarryExterior() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<linearGradient id="qe-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#3a2848"/>' +
          '<stop offset="1" stop-color="#5a4838"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="220" fill="url(#qe-sky)"/>' +
      // distant cliffs
      '<polygon points="0,180 80,90 150,140 220,80 280,150 360,90 440,160 540,100 620,160 720,110 800,150 800,220 0,220" fill="#3a2818"/>' +
      // quarry pit walls
      '<polygon points="0,220 800,220 760,360 40,360" fill="#4a3828"/>' +
      // dramatic terrace cuts (stairs of stone blocks)
      '<g>' +
        '<rect x="40" y="220" width="160" height="40" fill="#5a4838" stroke="#1a1008" stroke-width="2"/>' +
        '<rect x="80" y="260" width="120" height="40" fill="#6a5848" stroke="#1a1008" stroke-width="2"/>' +
        '<rect x="120" y="300" width="80" height="60" fill="#5a4838" stroke="#1a1008" stroke-width="2"/>' +
      '</g>' +
      '<g>' +
        '<rect x="600" y="220" width="160" height="40" fill="#5a4838" stroke="#1a1008" stroke-width="2"/>' +
        '<rect x="600" y="260" width="120" height="40" fill="#6a5848" stroke="#1a1008" stroke-width="2"/>' +
        '<rect x="600" y="300" width="80" height="60" fill="#5a4838" stroke="#1a1008" stroke-width="2"/>' +
      '</g>' +
      // grid lines on stone (showing volume) - faint guidelines
      '<g opacity="0.3" stroke="#d4a624" stroke-width="0.6">' +
        '<line x1="40" y1="240" x2="200" y2="240"/>' +
        '<line x1="80" y1="280" x2="200" y2="280"/>' +
        '<line x1="80" y1="220" x2="80" y2="260"/>' +
        '<line x1="120" y1="220" x2="120" y2="300"/>' +
        '<line x1="160" y1="220" x2="160" y2="260"/>' +
      '</g>' +
      // mine entrance — yawning arched opening
      '<g transform="translate(400, 200)">' +
        '<path d="M -80 100 L -80 30 Q -80 -10 0 -10 Q 80 -10 80 30 L 80 100 Z" fill="#1a0808" stroke="#3a1810" stroke-width="3"/>' +
        // arch keystone
        '<polygon points="-12,-10 12,-10 14,-2 -14,-2" fill="#5a4838" stroke="#1a1008" stroke-width="1.5"/>' +
        '<text x="0" y="-2" text-anchor="middle" fill="#d4a624" font-family="Cinzel" font-size="6">V</text>' +
        // wood support beams
        '<rect x="-86" y="30" width="6" height="70" fill="#3a2010"/>' +
        '<rect x="80" y="30" width="6" height="70" fill="#3a2010"/>' +
        '<rect x="-90" y="24" width="180" height="8" fill="#3a2010"/>' +
        // glowing eyes inside (foreshadow)
        '<circle cx="-30" cy="80" r="2" fill="#cc3030" opacity="0.8"/>' +
        '<circle cx="30" cy="80" r="2" fill="#cc3030" opacity="0.8"/>' +
        // dripping moss
        '<line x1="-60" y1="-2" x2="-60" y2="14" stroke="#3a7848" stroke-width="2"/>' +
        '<line x1="60" y1="-2" x2="60" y2="12" stroke="#3a7848" stroke-width="2"/>' +
      '</g>' +
      // cart on rails (left)
      '<g transform="translate(220, 290)">' +
        '<rect x="0" y="0" width="60" height="30" fill="#5a3818" stroke="#1a1008" stroke-width="2"/>' +
        '<rect x="-4" y="0" width="4" height="30" fill="#3a2010"/>' +
        '<rect x="60" y="0" width="4" height="30" fill="#3a2010"/>' +
        '<circle cx="14" cy="34" r="6" fill="#3a3838" stroke="#1a1008" stroke-width="1"/>' +
        '<circle cx="46" cy="34" r="6" fill="#3a3838" stroke="#1a1008" stroke-width="1"/>' +
        // rocks in cart
        '<polygon points="6,-8 14,-12 20,-6 12,-2" fill="#7a7068"/>' +
        '<polygon points="26,-12 36,-14 40,-6 30,-4" fill="#5a5048"/>' +
        '<polygon points="44,-10 54,-12 56,-4 46,-2" fill="#7a7068"/>' +
      '</g>' +
      // rails
      '<line x1="40" y1="328" x2="240" y2="328" stroke="#3a2818" stroke-width="2"/>' +
      '<line x1="40" y1="334" x2="240" y2="334" stroke="#3a2818" stroke-width="2"/>' +
      // crows
      '<g transform="translate(150, 100)" opacity="0.7">' +
        '<path d="M 0 0 Q 8 -6 16 0 Q 8 -2 0 0" fill="#1a0808"/>' +
      '</g>' +
      '<g transform="translate(560, 130)" opacity="0.7">' +
        '<path d="M 0 0 Q 8 -6 16 0 Q 8 -2 0 0" fill="#1a0808"/>' +
      '</g>' +
      // foreground sign post
      '<g transform="translate(40, 290)">' +
        '<line x1="0" y1="0" x2="0" y2="60" stroke="#3a2010" stroke-width="3"/>' +
        '<rect x="-30" y="6" width="64" height="22" fill="#5a3818" stroke="#1a1008" stroke-width="1.5"/>' +
        '<text x="2" y="20" text-anchor="middle" fill="#d4a624" font-family="IM Fell English SC" font-size="9">QUARRY</text>' +
      '</g>' +
    '</svg>';
  },

  // ----- Quarry interior chamber -----
  quarryInterior() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<radialGradient id="qi-torch" cx="0.5" cy="0.5" r="0.8">' +
          '<stop offset="0" stop-color="#f0d27a" stop-opacity="0.55"/>' +
          '<stop offset="1" stop-color="#1a0808" stop-opacity="0"/>' +
        '</radialGradient>' +
      '</defs>' +
      '<rect width="800" height="360" fill="#1a0808"/>' +
      // light pool centered
      '<rect width="800" height="360" fill="url(#qi-torch)"/>' +
      // back wall (rocky)
      '<polygon points="0,80 800,80 800,260 0,260" fill="#3a2818"/>' +
      // floor
      '<polygon points="0,260 800,260 760,360 40,360" fill="#2a1810"/>' +
      // back wall texture
      '<g stroke="#1a0808" stroke-width="1" opacity="0.7">' +
        '<line x1="0" y1="100" x2="800" y2="100"/>' +
        '<line x1="100" y1="80" x2="100" y2="100"/>' +
        '<line x1="240" y1="80" x2="240" y2="100"/>' +
        '<line x1="380" y1="80" x2="380" y2="100"/>' +
        '<line x1="520" y1="80" x2="520" y2="100"/>' +
        '<line x1="660" y1="80" x2="660" y2="100"/>' +
        '<line x1="0" y1="140" x2="800" y2="140"/>' +
        '<line x1="60" y1="100" x2="60" y2="140"/>' +
        '<line x1="200" y1="100" x2="200" y2="140"/>' +
        '<line x1="340" y1="100" x2="340" y2="140"/>' +
        '<line x1="480" y1="100" x2="480" y2="140"/>' +
        '<line x1="620" y1="100" x2="620" y2="140"/>' +
        '<line x1="760" y1="100" x2="760" y2="140"/>' +
        '<line x1="0" y1="180" x2="800" y2="180"/>' +
        '<line x1="120" y1="140" x2="120" y2="180"/>' +
        '<line x1="260" y1="140" x2="260" y2="180"/>' +
        '<line x1="400" y1="140" x2="400" y2="180"/>' +
        '<line x1="540" y1="140" x2="540" y2="180"/>' +
        '<line x1="680" y1="140" x2="680" y2="180"/>' +
        '<line x1="0" y1="220" x2="800" y2="220"/>' +
      '</g>' +
      // wooden support beams
      '<g transform="translate(140, 80)">' +
        '<rect x="0" y="0" width="10" height="180" fill="#3a2010" stroke="#1a0808" stroke-width="1"/>' +
        '<rect x="-30" y="0" width="70" height="10" fill="#3a2010" stroke="#1a0808" stroke-width="1"/>' +
      '</g>' +
      '<g transform="translate(650, 80)">' +
        '<rect x="0" y="0" width="10" height="180" fill="#3a2010" stroke="#1a0808" stroke-width="1"/>' +
        '<rect x="-30" y="0" width="70" height="10" fill="#3a2010" stroke="#1a0808" stroke-width="1"/>' +
      '</g>' +
      // torches on the beams
      '<g transform="translate(110, 130)">' +
        '<line x1="0" y1="0" x2="-12" y2="-10" stroke="#3a2010" stroke-width="3"/>' +
        '<ellipse cx="-14" cy="-14" rx="5" ry="9" fill="#f08838"/>' +
        '<ellipse cx="-14" cy="-18" rx="3" ry="5" fill="#f0d27a"/>' +
        '<circle cx="-14" cy="-14" r="36" fill="#ffaa33" opacity="0.18"/>' +
      '</g>' +
      '<g transform="translate(690, 130)">' +
        '<line x1="0" y1="0" x2="12" y2="-10" stroke="#3a2010" stroke-width="3"/>' +
        '<ellipse cx="14" cy="-14" rx="5" ry="9" fill="#f08838"/>' +
        '<ellipse cx="14" cy="-18" rx="3" ry="5" fill="#f0d27a"/>' +
        '<circle cx="14" cy="-14" r="36" fill="#ffaa33" opacity="0.18"/>' +
      '</g>' +
      // stone pillars carved with cubes
      '<g transform="translate(300, 200)">' +
        '<rect x="0" y="0" width="40" height="60" fill="#5a4838" stroke="#1a1008" stroke-width="1.5"/>' +
        '<polygon points="-4,-4 44,-4 44,4 -4,4" fill="#7a6058" stroke="#1a1008" stroke-width="1.5"/>' +
        '<polygon points="-4,60 44,60 48,68 -8,68" fill="#3a2818" stroke="#1a1008" stroke-width="1.5"/>' +
        // cube carving
        '<rect x="10" y="14" width="20" height="20" fill="none" stroke="#d4a624" stroke-width="0.8"/>' +
        '<polygon points="10,14 16,8 36,8 30,14" fill="none" stroke="#d4a624" stroke-width="0.8"/>' +
        '<polygon points="30,14 36,8 36,28 30,34" fill="none" stroke="#d4a624" stroke-width="0.8"/>' +
      '</g>' +
      '<g transform="translate(460, 200)">' +
        '<rect x="0" y="0" width="40" height="60" fill="#5a4838" stroke="#1a1008" stroke-width="1.5"/>' +
        '<polygon points="-4,-4 44,-4 44,4 -4,4" fill="#7a6058" stroke="#1a1008" stroke-width="1.5"/>' +
        '<polygon points="-4,60 44,60 48,68 -8,68" fill="#3a2818" stroke="#1a1008" stroke-width="1.5"/>' +
        '<rect x="10" y="14" width="20" height="20" fill="none" stroke="#d4a624" stroke-width="0.8"/>' +
        '<polygon points="10,14 16,8 36,8 30,14" fill="none" stroke="#d4a624" stroke-width="0.8"/>' +
        '<polygon points="30,14 36,8 36,28 30,34" fill="none" stroke="#d4a624" stroke-width="0.8"/>' +
      '</g>' +
      // rubble piles (foreground)
      '<g transform="translate(40, 320)" opacity="0.9">' +
        '<polygon points="0,0 20,-10 36,4 28,18 8,16" fill="#5a5048"/>' +
        '<polygon points="36,4 50,-6 62,8 46,18" fill="#7a7068"/>' +
      '</g>' +
      '<g transform="translate(680, 320)" opacity="0.9">' +
        '<polygon points="0,0 20,-10 36,4 28,18 8,16" fill="#7a7068"/>' +
        '<polygon points="36,4 50,-6 62,8 46,18" fill="#5a5048"/>' +
      '</g>' +
      // glowing rune circle in the middle of the floor
      '<g transform="translate(400, 300)" opacity="0.7">' +
        '<circle cx="0" cy="0" r="40" fill="none" stroke="#7a3878" stroke-width="2"/>' +
        '<circle cx="0" cy="0" r="28" fill="none" stroke="#7a3878" stroke-width="1.2"/>' +
        '<polygon points="0,-32 6,0 0,32 -6,0" fill="none" stroke="#7a3878" stroke-width="1"/>' +
        '<text x="0" y="4" text-anchor="middle" fill="#7a3878" font-family="Cinzel" font-size="14">∑</text>' +
      '</g>' +
      // mist
      '<rect width="800" height="60" y="240" fill="rgba(168,144,192,0.08)"/>' +
    '</svg>';
  },

  // ----- Boss arena (Hollowed One's chamber) -----
  bossArena() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<radialGradient id="ba-void" cx="0.5" cy="0.5" r="0.7">' +
          '<stop offset="0" stop-color="#7a3878" stop-opacity="0.6"/>' +
          '<stop offset="0.5" stop-color="#2a0838" stop-opacity="0.5"/>' +
          '<stop offset="1" stop-color="#0a0210" stop-opacity="0"/>' +
        '</radialGradient>' +
      '</defs>' +
      '<rect width="800" height="360" fill="#0a0210"/>' +
      // distant void
      '<rect width="800" height="360" fill="url(#ba-void)"/>' +
      // far cathedral pillars
      '<g transform="translate(120, 80)" opacity="0.6">' +
        '<polygon points="0,0 30,0 24,200 6,200" fill="#3a1838" stroke="#1a0418" stroke-width="1.5"/>' +
        '<polygon points="-8,0 38,0 38,16 -8,16" fill="#5a2858"/>' +
      '</g>' +
      '<g transform="translate(280, 80)" opacity="0.7">' +
        '<polygon points="0,0 36,0 28,220 8,220" fill="#3a1838" stroke="#1a0418" stroke-width="1.5"/>' +
        '<polygon points="-10,0 46,0 46,16 -10,16" fill="#5a2858"/>' +
      '</g>' +
      '<g transform="translate(450, 80)" opacity="0.7">' +
        '<polygon points="0,0 36,0 28,220 8,220" fill="#3a1838" stroke="#1a0418" stroke-width="1.5"/>' +
        '<polygon points="-10,0 46,0 46,16 -10,16" fill="#5a2858"/>' +
      '</g>' +
      '<g transform="translate(620, 80)" opacity="0.6">' +
        '<polygon points="0,0 30,0 24,200 6,200" fill="#3a1838" stroke="#1a0418" stroke-width="1.5"/>' +
        '<polygon points="-8,0 38,0 38,16 -8,16" fill="#5a2858"/>' +
      '</g>' +
      // floor (cracked obsidian)
      '<polygon points="0,260 800,260 760,360 40,360" fill="#1a0420"/>' +
      // cracks in floor
      '<line x1="100" y1="280" x2="200" y2="320" stroke="#7a3878" stroke-width="1.5" opacity="0.7"/>' +
      '<line x1="200" y1="320" x2="280" y2="340" stroke="#7a3878" stroke-width="1" opacity="0.7"/>' +
      '<line x1="500" y1="280" x2="600" y2="340" stroke="#7a3878" stroke-width="1.5" opacity="0.7"/>' +
      '<line x1="350" y1="290" x2="450" y2="350" stroke="#7a3878" stroke-width="1" opacity="0.5"/>' +
      // central altar
      '<g transform="translate(400, 280)">' +
        '<polygon points="-60,0 60,0 70,40 -70,40" fill="#3a1838" stroke="#1a0418" stroke-width="2.5"/>' +
        '<polygon points="-60,-8 60,-8 60,0 -60,0" fill="#5a2858" stroke="#1a0418" stroke-width="2"/>' +
        '<polygon points="-50,-8 50,-8 50,-2 -50,-2" fill="#7a3878"/>' +
        '<polygon points="-40,-30 40,-30 30,-8 -30,-8" fill="#3a1838" stroke="#1a0418" stroke-width="1.5"/>' +
        '<text x="0" y="-14" text-anchor="middle" fill="#cc4878" font-family="Cinzel" font-size="14">l·w·h</text>' +
      '</g>' +
      // floating cube fragments
      '<g transform="translate(160, 100)" opacity="0.85">' +
        '<polygon points="0,0 24,-8 30,12 6,20" fill="#5a4838" stroke="#1a0418" stroke-width="1"/>' +
        '<polygon points="0,0 24,-8 24,4 0,12" fill="#7a6058"/>' +
      '</g>' +
      '<g transform="translate(640, 120)" opacity="0.85">' +
        '<polygon points="0,0 30,-6 36,16 6,22" fill="#5a4838" stroke="#1a0418" stroke-width="1"/>' +
        '<polygon points="0,0 30,-6 30,8 0,14" fill="#7a6058"/>' +
      '</g>' +
      '<g transform="translate(60, 200)" opacity="0.7">' +
        '<polygon points="0,0 20,-4 26,12 6,16" fill="#5a4838" stroke="#1a0418" stroke-width="1"/>' +
      '</g>' +
      '<g transform="translate(700, 220)" opacity="0.7">' +
        '<polygon points="0,0 18,-4 22,10 4,14" fill="#5a4838" stroke="#1a0418" stroke-width="1"/>' +
      '</g>' +
      // braziers
      '<g transform="translate(120, 280)">' +
        '<rect x="-8" y="0" width="16" height="40" fill="#3a1838" stroke="#1a0418" stroke-width="1.5"/>' +
        '<ellipse cx="0" cy="0" rx="14" ry="6" fill="#5a2858" stroke="#1a0418" stroke-width="1.5"/>' +
        '<ellipse cx="0" cy="-2" rx="10" ry="4" fill="#cc4878"/>' +
        '<polygon points="-8,-2 -4,-16 0,-6 4,-20 8,-6 12,-14" fill="#cc4878" opacity="0.85"/>' +
        '<circle cx="0" cy="-8" r="30" fill="#cc4878" opacity="0.15"/>' +
      '</g>' +
      '<g transform="translate(680, 280)">' +
        '<rect x="-8" y="0" width="16" height="40" fill="#3a1838" stroke="#1a0418" stroke-width="1.5"/>' +
        '<ellipse cx="0" cy="0" rx="14" ry="6" fill="#5a2858" stroke="#1a0418" stroke-width="1.5"/>' +
        '<ellipse cx="0" cy="-2" rx="10" ry="4" fill="#cc4878"/>' +
        '<polygon points="-8,-2 -4,-16 0,-6 4,-20 8,-6 12,-14" fill="#cc4878" opacity="0.85"/>' +
        '<circle cx="0" cy="-8" r="30" fill="#cc4878" opacity="0.15"/>' +
      '</g>' +
      // distant stars
      '<circle cx="100" cy="40" r="1" fill="#a890c0"/>' +
      '<circle cx="300" cy="30" r="1.2" fill="#a890c0"/>' +
      '<circle cx="500" cy="46" r="1" fill="#a890c0"/>' +
      '<circle cx="700" cy="30" r="1.2" fill="#a890c0"/>' +
    '</svg>';
  },

  // ----- Ending vista (sunrise over restored Numeria) -----
  endingVista() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<linearGradient id="ev-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#5a4878"/>' +
          '<stop offset="0.4" stop-color="#c47828"/>' +
          '<stop offset="0.7" stop-color="#f0d27a"/>' +
          '<stop offset="1" stop-color="#a890c0"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="240" fill="url(#ev-sky)"/>' +
      // sun rising large
      '<circle cx="400" cy="200" r="80" fill="#f0d27a"/>' +
      '<circle cx="400" cy="200" r="120" fill="#f0d27a" opacity="0.25"/>' +
      // light rays
      '<g stroke="#f0d27a" stroke-width="2" opacity="0.45">' +
        '<line x1="400" y1="80" x2="400" y2="40"/>' +
        '<line x1="320" y1="120" x2="280" y2="80"/>' +
        '<line x1="480" y1="120" x2="520" y2="80"/>' +
        '<line x1="280" y1="200" x2="220" y2="200"/>' +
        '<line x1="520" y1="200" x2="580" y2="200"/>' +
        '<line x1="320" y1="280" x2="280" y2="320"/>' +
        '<line x1="480" y1="280" x2="520" y2="320"/>' +
      '</g>' +
      // mountains
      '<polygon points="0,220 100,140 200,180 300,120 400,170 500,120 600,180 700,140 800,200 800,260 0,260" fill="#3a2848"/>' +
      // numeria silhouette
      '<polygon points="0,260 800,260 800,360 0,360" fill="#2a1810"/>' +
      // tavern
      '<g transform="translate(120, 220)" opacity="0.9">' +
        '<polygon points="0,40 0,0 40,-20 80,0 80,40" fill="#1a0808" stroke="#2a1810" stroke-width="1"/>' +
        '<polygon points="-6,2 40,-22 86,2" fill="#1a0808"/>' +
        '<rect x="30" y="20" width="20" height="20" fill="#f08838"/>' +
      '</g>' +
      // tower
      '<g transform="translate(380, 200)" opacity="0.9">' +
        '<rect x="-15" y="60" width="30" height="60" fill="#1a0808"/>' +
        '<polygon points="-18,60 18,60 0,30" fill="#1a0808"/>' +
        '<rect x="-6" y="74" width="12" height="14" fill="#f0d27a"/>' +
      '</g>' +
      // smithy
      '<g transform="translate(580, 220)" opacity="0.9">' +
        '<rect x="0" y="0" width="60" height="40" fill="#1a0808"/>' +
        '<polygon points="-6,2 60,-22 66,2" fill="#1a0808"/>' +
        '<rect x="14" y="14" width="32" height="20" fill="#f08838"/>' +
      '</g>' +
      // banner pole on tower
      '<line x1="380" y1="180" x2="380" y2="150" stroke="#f0d27a" stroke-width="1.5"/>' +
      '<polygon points="380,152 410,162 408,178 380,170" fill="#d4a624"/>' +
      // hero silhouette on ridge
      '<g transform="translate(680, 240)">' +
        '<rect x="-3" y="0" width="6" height="20" fill="#1a0808"/>' +
        '<ellipse cx="0" cy="-2" rx="4" ry="5" fill="#1a0808"/>' +
        // staff/sword
        '<line x1="6" y1="-8" x2="6" y2="20" stroke="#1a0808" stroke-width="1.5"/>' +
      '</g>' +
      // birds
      '<g opacity="0.7">' +
        '<path d="M 200 80 Q 208 74 216 80 Q 208 76 200 80" fill="#1a0808"/>' +
        '<path d="M 240 60 Q 248 54 256 60 Q 248 56 240 60" fill="#1a0808"/>' +
        '<path d="M 480 50 Q 488 44 496 50 Q 488 46 480 50" fill="#1a0808"/>' +
        '<path d="M 600 100 Q 608 94 616 100 Q 608 96 600 100" fill="#1a0808"/>' +
      '</g>' +
    '</svg>';
  },

  // --------------------------------------------------------
  // ACT II — NPC: MIRA
  // --------------------------------------------------------
  mira(size) {
    const w = size || 80;
    return '<svg width="' + w + '" height="' + w + '" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><radialGradient id="mir-bg"><stop offset="0" stop-color="#3a7858"/><stop offset="1" stop-color="#1a3838"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="48" fill="url(#mir-bg)"/>' +
      // hair (long, dark teal-brown)
      '<path d="M 28 38 Q 50 16 72 38 L 76 86 Q 64 82 64 86 L 36 86 Q 24 82 28 86 Z" fill="#3a2818"/>' +
      // bandana
      '<rect x="28" y="34" width="44" height="6" fill="#cc4848" stroke="#3a1010" stroke-width="0.6"/>' +
      '<polygon points="68,34 78,28 76,40 70,40" fill="#cc4848" stroke="#3a1010" stroke-width="0.6"/>' +
      // face
      '<ellipse cx="50" cy="52" rx="17" ry="19" fill="#d8b888" stroke="#3a2010" stroke-width="0.8"/>' +
      // partial elf ears
      '<path d="M 32 52 Q 26 48 28 40 L 34 48 Z" fill="#d8b888"/>' +
      '<path d="M 68 52 Q 74 48 72 40 L 66 48 Z" fill="#d8b888"/>' +
      // eyes (sea green)
      '<ellipse cx="44" cy="52" rx="1.8" ry="2.2" fill="#3a7858"/>' +
      '<ellipse cx="56" cy="52" rx="1.8" ry="2.2" fill="#3a7858"/>' +
      '<circle cx="44.5" cy="51.5" r="0.5" fill="#fff"/>' +
      '<circle cx="56.5" cy="51.5" r="0.5" fill="#fff"/>' +
      // brows
      '<line x1="40" y1="48" x2="48" y2="48" stroke="#2a1808" stroke-width="1.2"/>' +
      '<line x1="52" y1="48" x2="60" y2="48" stroke="#2a1808" stroke-width="1.2"/>' +
      // determined mouth
      '<path d="M 44 62 Q 50 64 56 62" stroke="#3a2010" stroke-width="1.2" fill="none"/>' +
      // small earring
      '<circle cx="33" cy="56" r="1" fill="#d4a624"/>' +
      // collar of leather jacket
      '<path d="M 30 80 Q 50 90 70 80 L 74 96 L 26 96 Z" fill="#3a2010" stroke="#1a0808" stroke-width="1"/>' +
      '<line x1="50" y1="86" x2="50" y2="96" stroke="#1a0808" stroke-width="0.6"/>' +
    '</svg>';
  },

  goren(size) {
    const w = size || 80;
    return '<svg width="' + w + '" height="' + w + '" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><radialGradient id="gor-bg"><stop offset="0" stop-color="#3a5878"/><stop offset="1" stop-color="#1a2838"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="48" fill="url(#gor-bg)"/>' +
      // weathered cap
      '<path d="M 28 38 Q 50 22 72 38 L 76 50 Q 50 42 24 50 Z" fill="#1a2838" stroke="#0a1818" stroke-width="1.2"/>' +
      '<path d="M 22 46 L 78 46 L 78 50 L 22 50 Z" fill="#0a1818"/>' +
      // face
      '<ellipse cx="50" cy="58" rx="17" ry="17" fill="#d0a878" stroke="#3a2010" stroke-width="0.8"/>' +
      // ears
      '<ellipse cx="32" cy="58" rx="3" ry="4" fill="#d0a878"/>' +
      '<ellipse cx="68" cy="58" rx="3" ry="4" fill="#d0a878"/>' +
      // weathered eyes
      '<ellipse cx="44" cy="56" rx="1.6" ry="2" fill="#1a1008"/>' +
      '<ellipse cx="56" cy="56" rx="1.6" ry="2" fill="#1a1008"/>' +
      // crow\'s feet
      '<line x1="36" y1="55" x2="40" y2="55" stroke="#3a2010" stroke-width="0.6"/>' +
      '<line x1="60" y1="55" x2="64" y2="55" stroke="#3a2010" stroke-width="0.6"/>' +
      '<line x1="36" y1="58" x2="40" y2="58" stroke="#3a2010" stroke-width="0.6"/>' +
      '<line x1="60" y1="58" x2="64" y2="58" stroke="#3a2010" stroke-width="0.6"/>' +
      // big bushy salt-and-pepper beard
      '<path d="M 30 66 Q 50 94 70 66 L 72 88 Q 50 100 28 88 Z" fill="#c8c0b0"/>' +
      '<path d="M 36 76 Q 50 92 64 76" fill="#a89888"/>' +
      // pipe
      '<rect x="56" y="74" width="14" height="3" fill="#3a2010" stroke="#1a0808" stroke-width="0.4"/>' +
      '<rect x="68" y="71" width="6" height="6" fill="#5a3818" stroke="#1a0808" stroke-width="0.6"/>' +
      '<circle cx="71" cy="71" r="1.6" fill="#cc4818"/>' +
      // smoke
      '<path d="M 72 70 Q 80 60 76 50" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" fill="none"/>' +
    '</svg>';
  },

  gull(size) {
    const w = size || 80;
    return '<svg width="' + w + '" height="' + w + '" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><radialGradient id="gul-bg"><stop offset="0" stop-color="#5a4878"/><stop offset="1" stop-color="#1a1838"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="48" fill="url(#gul-bg)"/>' +
      // wispy white hair
      '<path d="M 26 36 Q 50 18 74 36 L 78 60 Q 64 52 64 58 L 36 58 Q 22 52 22 60 Z" fill="#e8e0d0"/>' +
      // tied scarf in hair
      '<path d="M 28 32 Q 38 26 50 30 Q 62 26 72 32" fill="none" stroke="#aa3838" stroke-width="2"/>' +
      // face (older, lined)
      '<ellipse cx="50" cy="56" rx="16" ry="18" fill="#e8c4a8" stroke="#3a2010" stroke-width="0.8"/>' +
      // ears
      '<ellipse cx="34" cy="56" rx="2.5" ry="4" fill="#e8c4a8"/>' +
      '<ellipse cx="66" cy="56" rx="2.5" ry="4" fill="#e8c4a8"/>' +
      // glasses
      '<circle cx="44" cy="54" r="5" fill="none" stroke="#5a4828" stroke-width="1"/>' +
      '<circle cx="56" cy="54" r="5" fill="none" stroke="#5a4828" stroke-width="1"/>' +
      '<line x1="49" y1="54" x2="51" y2="54" stroke="#5a4828" stroke-width="1"/>' +
      // eyes
      '<circle cx="44" cy="54" r="1.4" fill="#1a1008"/>' +
      '<circle cx="56" cy="54" r="1.4" fill="#1a1008"/>' +
      // wrinkles
      '<path d="M 38 62 Q 40 64 42 62" stroke="#5a3818" stroke-width="0.4" fill="none"/>' +
      '<path d="M 58 62 Q 60 64 62 62" stroke="#5a3818" stroke-width="0.4" fill="none"/>' +
      // kind smile
      '<path d="M 42 68 Q 50 72 58 68" stroke="#3a2010" stroke-width="1" fill="none"/>' +
      // shawl
      '<path d="M 28 78 Q 50 90 72 78 L 76 96 L 24 96 Z" fill="#5a3878" stroke="#3a1858" stroke-width="0.8"/>' +
      '<path d="M 32 82 L 68 82" stroke="#a890c0" stroke-width="0.6"/>' +
    '</svg>';
  },

  // --------------------------------------------------------
  // ACT II — SCENE ILLUSTRATIONS
  // --------------------------------------------------------

  // ----- Port of Whitehaven -----
  portWhitehaven() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<linearGradient id="pw-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#a8c4d8"/>' +
          '<stop offset="0.6" stop-color="#e0d8c0"/>' +
          '<stop offset="1" stop-color="#c4a888"/>' +
        '</linearGradient>' +
        '<linearGradient id="pw-sea" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#3a6878"/>' +
          '<stop offset="1" stop-color="#1a3848"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="220" fill="url(#pw-sky)"/>' +
      // distant lighthouse on cliff
      '<polygon points="0,200 80,140 160,180 220,150 280,180 0,180" fill="#7a8898" opacity="0.7"/>' +
      '<g transform="translate(120, 140)">' +
        '<rect x="-6" y="0" width="12" height="36" fill="#e8e0d0" stroke="#1a1008" stroke-width="1"/>' +
        '<rect x="-8" y="-4" width="16" height="6" fill="#cc4818" stroke="#1a1008" stroke-width="1"/>' +
        '<rect x="-4" y="0" width="8" height="12" fill="#3a2010"/>' +
        '<circle cx="0" cy="-8" r="3" fill="#ffcc55"/>' +
        '<circle cx="0" cy="-8" r="20" fill="#ffaa33" opacity="0.18"/>' +
      '</g>' +
      // sea + waves
      '<rect y="220" width="800" height="60" fill="url(#pw-sea)"/>' +
      '<path d="M 0 232 Q 80 226 160 232 T 320 232 T 480 232 T 640 232 T 800 232" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>' +
      '<path d="M 0 244 Q 80 238 160 244 T 320 244 T 480 244 T 640 244 T 800 244" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>' +
      // pier/dock with planks
      '<rect y="270" width="800" height="20" fill="#5a3818"/>' +
      '<g stroke="#1a0808" stroke-width="0.6">' +
        '<line x1="60" y1="270" x2="60" y2="290"/>' +
        '<line x1="140" y1="270" x2="140" y2="290"/>' +
        '<line x1="220" y1="270" x2="220" y2="290"/>' +
        '<line x1="300" y1="270" x2="300" y2="290"/>' +
        '<line x1="380" y1="270" x2="380" y2="290"/>' +
        '<line x1="460" y1="270" x2="460" y2="290"/>' +
        '<line x1="540" y1="270" x2="540" y2="290"/>' +
        '<line x1="620" y1="270" x2="620" y2="290"/>' +
        '<line x1="700" y1="270" x2="700" y2="290"/>' +
      '</g>' +
      // ground beach
      '<rect y="290" width="800" height="70" fill="#c4a878"/>' +
      // tavern (left)
      '<g transform="translate(80, 160)">' +
        '<polygon points="0,110 0,50 60,20 120,50 120,110" fill="#7a3818" stroke="#3a1810" stroke-width="2"/>' +
        '<polygon points="-10,52 60,12 130,52" fill="#5a2818" stroke="#3a1810" stroke-width="2"/>' +
        '<rect x="50" y="70" width="20" height="40" fill="#3a1810"/>' +
        '<circle cx="66" cy="92" r="1.5" fill="#d4a624"/>' +
        '<rect x="14" y="62" width="22" height="22" fill="#ffaa55" stroke="#3a1810" stroke-width="1"/>' +
        '<line x1="25" y1="62" x2="25" y2="84" stroke="#3a1810" stroke-width="0.6"/>' +
        '<rect x="84" y="62" width="22" height="22" fill="#ffaa55" stroke="#3a1810" stroke-width="1"/>' +
        '<line x1="95" y1="62" x2="95" y2="84" stroke="#3a1810" stroke-width="0.6"/>' +
        // sign
        '<rect x="-12" y="34" width="40" height="14" fill="#5a3010" stroke="#3a1810" stroke-width="1"/>' +
        '<text x="8" y="44" text-anchor="middle" fill="#d4a624" font-family="IM Fell English SC" font-size="7">SALT-WORN</text>' +
        // hanging anchor
        '<line x1="100" y1="36" x2="100" y2="46" stroke="#3a2010" stroke-width="1"/>' +
        '<g transform="translate(100, 50)" fill="#888" stroke="#3a2010" stroke-width="0.6">' +
          '<line x1="0" y1="-4" x2="0" y2="8"/>' +
          '<path d="M -5 6 Q 0 12 5 6"/>' +
          '<line x1="-5" y1="-3" x2="5" y2="-3"/>' +
        '</g>' +
      '</g>' +
      // net-mender shed (right)
      '<g transform="translate(540, 180)">' +
        '<rect x="0" y="0" width="100" height="90" fill="#5a4828" stroke="#1a0808" stroke-width="2"/>' +
        '<polygon points="-10,2 50,-28 110,2" fill="#3a2818" stroke="#1a0808" stroke-width="2"/>' +
        '<rect x="40" y="50" width="20" height="40" fill="#3a2010"/>' +
        // net hanging
        '<g transform="translate(0, 30)" stroke="#8a6a14" stroke-width="0.6" fill="none">' +
          '<line x1="0" y1="0" x2="100" y2="0"/>' +
          '<line x1="0" y1="0" x2="20" y2="20"/>' +
          '<line x1="20" y1="0" x2="40" y2="20"/>' +
          '<line x1="40" y1="0" x2="60" y2="20"/>' +
          '<line x1="60" y1="0" x2="80" y2="20"/>' +
          '<line x1="80" y1="0" x2="100" y2="20"/>' +
          '<line x1="20" y1="0" x2="0" y2="20"/>' +
          '<line x1="40" y1="0" x2="20" y2="20"/>' +
          '<line x1="60" y1="0" x2="40" y2="20"/>' +
          '<line x1="80" y1="0" x2="60" y2="20"/>' +
          '<line x1="100" y1="0" x2="80" y2="20"/>' +
        '</g>' +
      '</g>' +
      // moored boat at the pier
      '<g transform="translate(330, 240)">' +
        // hull
        '<path d="M -50 10 Q -40 28 0 30 Q 40 28 50 10 Q 30 12 0 12 Q -30 12 -50 10 Z" fill="#5a3818" stroke="#1a0808" stroke-width="1.5"/>' +
        '<rect x="-44" y="6" width="88" height="4" fill="#3a2010"/>' +
        // mast
        '<line x1="0" y1="6" x2="0" y2="-46" stroke="#3a2010" stroke-width="3"/>' +
        // sail (white with red stripe)
        '<polygon points="0,-46 0,-4 32,-4 28,-46" fill="#f0e3bd" stroke="#3a2010" stroke-width="1.2"/>' +
        '<rect x="0" y="-26" width="30" height="4" fill="#cc4818"/>' +
        // rope from mast to bow
        '<line x1="0" y1="-44" x2="-48" y2="14" stroke="#3a2010" stroke-width="0.6"/>' +
        '<line x1="0" y1="-44" x2="48" y2="14" stroke="#3a2010" stroke-width="0.6"/>' +
        // tiny figure (Mira)
        '<g transform="translate(-12, 0)">' +
          '<ellipse cx="0" cy="0" rx="3" ry="4" fill="#3a2818"/>' +
          '<rect x="-2" y="3" width="4" height="6" fill="#1a2838"/>' +
        '</g>' +
      '</g>' +
      // seagull
      '<path d="M 220 100 Q 230 92 240 100 Q 230 96 220 100" fill="#fff" stroke="#3a2010" stroke-width="0.4"/>' +
      '<path d="M 600 80 Q 610 72 620 80 Q 610 76 600 80" fill="#fff" stroke="#3a2010" stroke-width="0.4"/>' +
      // crates
      '<rect x="280" y="296" width="24" height="24" fill="#5a3818" stroke="#1a0808" stroke-width="1"/>' +
      '<rect x="308" y="304" width="20" height="16" fill="#5a3818" stroke="#1a0808" stroke-width="1"/>' +
      // barrels
      '<rect x="430" y="296" width="22" height="28" fill="#7a5828" stroke="#1a0808" stroke-width="1" rx="2"/>' +
      '<line x1="430" y1="306" x2="452" y2="306" stroke="#1a0808" stroke-width="0.6"/>' +
      '<line x1="430" y1="316" x2="452" y2="316" stroke="#1a0808" stroke-width="0.6"/>' +
    '</svg>';
  },

  // ----- The Salt-Worn Sign tavern interior -----
  saltWornInterior() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<rect width="800" height="360" fill="#3a2818"/>' +
      '<rect width="800" height="80" fill="#1a0808"/>' +
      // wall planks (vertical)
      '<g stroke="#1a0808" stroke-width="0.6">' +
        '<line x1="80" y1="80" x2="80" y2="280"/>' +
        '<line x1="160" y1="80" x2="160" y2="280"/>' +
        '<line x1="240" y1="80" x2="240" y2="280"/>' +
        '<line x1="320" y1="80" x2="320" y2="280"/>' +
        '<line x1="400" y1="80" x2="400" y2="280"/>' +
        '<line x1="480" y1="80" x2="480" y2="280"/>' +
        '<line x1="560" y1="80" x2="560" y2="280"/>' +
        '<line x1="640" y1="80" x2="640" y2="280"/>' +
        '<line x1="720" y1="80" x2="720" y2="280"/>' +
      '</g>' +
      // floor
      '<polygon points="0,280 800,280 760,360 40,360" fill="#5a3818"/>' +
      // hanging ship\'s wheel
      '<g transform="translate(400, 110)">' +
        '<line x1="0" y1="-40" x2="0" y2="-10" stroke="#1a0808" stroke-width="1"/>' +
        '<circle cx="0" cy="20" r="32" fill="none" stroke="#5a3818" stroke-width="6"/>' +
        '<circle cx="0" cy="20" r="6" fill="#3a2010"/>' +
        '<line x1="0" y1="-12" x2="0" y2="52" stroke="#5a3818" stroke-width="4"/>' +
        '<line x1="-32" y1="20" x2="32" y2="20" stroke="#5a3818" stroke-width="4"/>' +
        '<line x1="-22" y1="-2" x2="22" y2="42" stroke="#5a3818" stroke-width="4"/>' +
        '<line x1="-22" y1="42" x2="22" y2="-2" stroke="#5a3818" stroke-width="4"/>' +
      '</g>' +
      // bar (front)
      '<g transform="translate(40, 240)">' +
        '<rect x="0" y="0" width="320" height="20" fill="#5a3818" stroke="#1a1008" stroke-width="1.5"/>' +
        '<rect x="0" y="20" width="320" height="60" fill="#3a2010" stroke="#1a1008" stroke-width="1.5"/>' +
        // beer taps
        '<g transform="translate(120, -10)">' +
          '<rect x="0" y="0" width="8" height="20" fill="#3a3838"/>' +
          '<rect x="-4" y="-6" width="16" height="8" fill="#5a3818"/>' +
        '</g>' +
        '<g transform="translate(160, -10)">' +
          '<rect x="0" y="0" width="8" height="20" fill="#3a3838"/>' +
          '<rect x="-4" y="-6" width="16" height="8" fill="#7a3818"/>' +
        '</g>' +
        '<g transform="translate(200, -10)">' +
          '<rect x="0" y="0" width="8" height="20" fill="#3a3838"/>' +
          '<rect x="-4" y="-6" width="16" height="8" fill="#3a5828"/>' +
        '</g>' +
        // mug on bar
        '<rect x="20" y="-22" width="18" height="22" fill="#888" stroke="#3a2010" stroke-width="1.2"/>' +
        '<rect x="22" y="-22" width="14" height="6" fill="#f0e3bd"/>' +
        // smoked fish
        '<g transform="translate(260, -8)">' +
          '<ellipse cx="0" cy="0" rx="14" ry="4" fill="#7a5828" stroke="#3a1808" stroke-width="0.8"/>' +
          '<polygon points="14,-2 22,0 14,2" fill="#7a5828" stroke="#3a1808" stroke-width="0.8"/>' +
          '<circle cx="-10" cy="-1" r="1" fill="#fff"/>' +
          '<circle cx="-10" cy="-1" r="0.5" fill="#1a1008"/>' +
        '</g>' +
      '</g>' +
      // table (right)
      '<g transform="translate(520, 270)">' +
        '<rect x="0" y="0" width="100" height="10" fill="#5a3818" stroke="#1a1008" stroke-width="1.5"/>' +
        '<rect x="6" y="10" width="8" height="50" fill="#3a2010"/>' +
        '<rect x="86" y="10" width="8" height="50" fill="#3a2010"/>' +
        '<rect x="40" y="-18" width="14" height="18" fill="#888" stroke="#3a2010" stroke-width="1"/>' +
      '</g>' +
      // map on wall (right back)
      '<g transform="translate(640, 100)">' +
        '<rect x="0" y="0" width="80" height="56" fill="#e8d5b5" stroke="#3a2010" stroke-width="1.5"/>' +
        '<polygon points="10,30 30,20 50,32 70,18 76,40 60,46 30,50 14,42" fill="none" stroke="#3a2010" stroke-width="0.7"/>' +
        '<circle cx="40" cy="34" r="2" fill="#aa2828"/>' +
        '<line x1="40" y1="34" x2="44" y2="38" stroke="#aa2828" stroke-width="0.6"/>' +
      '</g>' +
      // candle on bar
      '<g transform="translate(100, 230)">' +
        '<rect x="-2" y="0" width="4" height="14" fill="#f0e3bd"/>' +
        '<ellipse cx="0" cy="-4" rx="2" ry="5" fill="#ffcc55"/>' +
        '<circle cx="0" cy="-2" r="14" fill="#ffaa33" opacity="0.18"/>' +
      '</g>' +
      // lantern hanging
      '<g transform="translate(640, 80)">' +
        '<line x1="0" y1="0" x2="0" y2="20" stroke="#1a0808" stroke-width="1"/>' +
        '<rect x="-8" y="20" width="16" height="20" fill="#5a3818" stroke="#1a0808" stroke-width="1"/>' +
        '<rect x="-6" y="22" width="12" height="14" fill="#ffcc55"/>' +
        '<circle cx="0" cy="32" r="36" fill="#ffaa33" opacity="0.18"/>' +
      '</g>' +
    '</svg>';
  },

  // ----- Mira\'s boat the Codex-Wake at sea -----
  codexWake() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<linearGradient id="cw-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#5a78a8"/>' +
          '<stop offset="1" stop-color="#a8c4d8"/>' +
        '</linearGradient>' +
        '<linearGradient id="cw-sea" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#3a6878"/>' +
          '<stop offset="1" stop-color="#0a3848"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="180" fill="url(#cw-sky)"/>' +
      // distant island
      '<polygon points="80,170 130,140 180,170" fill="#3a4858" opacity="0.7"/>' +
      '<polygon points="600,170 660,130 720,170" fill="#3a4858" opacity="0.7"/>' +
      // sun behind clouds
      '<circle cx="650" cy="90" r="36" fill="#f0d27a" opacity="0.7"/>' +
      '<ellipse cx="640" cy="100" rx="50" ry="10" fill="#e0d8c0" opacity="0.8"/>' +
      '<ellipse cx="660" cy="80" rx="60" ry="8" fill="#e0d8c0" opacity="0.6"/>' +
      // sea
      '<rect y="180" width="800" height="180" fill="url(#cw-sea)"/>' +
      // big waves
      '<path d="M 0 200 Q 60 184 120 200 T 240 200 T 360 200 T 480 200 T 600 200 T 720 200 T 800 200" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2"/>' +
      '<path d="M 0 220 Q 80 200 160 220 T 320 220 T 480 220 T 640 220 T 800 220" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>' +
      '<path d="M 0 248 Q 100 224 200 248 T 400 248 T 600 248 T 800 248" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>' +
      '<path d="M 0 280 Q 120 252 240 280 T 480 280 T 720 280 T 800 280" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.2"/>' +
      // the Codex-Wake ship centered
      '<g transform="translate(400, 220)">' +
        // hull
        '<path d="M -120 20 Q -100 56 0 60 Q 100 56 120 20 Q 80 24 0 24 Q -80 24 -120 20 Z" fill="#5a3818" stroke="#1a0808" stroke-width="2"/>' +
        '<rect x="-110" y="14" width="220" height="8" fill="#3a2010"/>' +
        '<rect x="-100" y="22" width="200" height="3" fill="#bfa050"/>' +
        // portholes
        '<circle cx="-60" cy="38" r="4" fill="#ffcc55" stroke="#1a0808" stroke-width="0.8"/>' +
        '<circle cx="-20" cy="38" r="4" fill="#ffcc55" stroke="#1a0808" stroke-width="0.8"/>' +
        '<circle cx="20" cy="38" r="4" fill="#ffcc55" stroke="#1a0808" stroke-width="0.8"/>' +
        '<circle cx="60" cy="38" r="4" fill="#ffcc55" stroke="#1a0808" stroke-width="0.8"/>' +
        // main mast
        '<line x1="0" y1="14" x2="0" y2="-130" stroke="#3a2010" stroke-width="4"/>' +
        // big sail (white with red codex sigil)
        '<polygon points="0,-130 0,0 80,0 70,-130" fill="#f0e3bd" stroke="#3a2010" stroke-width="1.5"/>' +
        '<text x="36" y="-60" text-anchor="middle" fill="#cc4818" font-family="Cinzel" font-size="24">∞</text>' +
        // secondary sail
        '<polygon points="0,-130 0,-20 -60,-20 -54,-110" fill="#f0e3bd" stroke="#3a2010" stroke-width="1.5"/>' +
        // rigging
        '<line x1="0" y1="-120" x2="-110" y2="14" stroke="#3a2010" stroke-width="0.6"/>' +
        '<line x1="0" y1="-120" x2="110" y2="14" stroke="#3a2010" stroke-width="0.6"/>' +
        // flag at top
        '<polygon points="0,-130 24,-126 22,-118 0,-122" fill="#cc4818" stroke="#3a1010" stroke-width="0.6"/>' +
        // bow figurehead
        '<polygon points="-120,20 -132,16 -130,28 -120,30" fill="#bfa050" stroke="#1a0808" stroke-width="1"/>' +
        // person at the wheel
        '<g transform="translate(-40, -10)">' +
          '<ellipse cx="0" cy="0" rx="4" ry="6" fill="#3a2818"/>' +
          '<rect x="-3" y="6" width="6" height="14" fill="#1a2838"/>' +
        '</g>' +
        '<g transform="translate(40, -10)">' +
          '<ellipse cx="0" cy="0" rx="4" ry="6" fill="#2a1810"/>' +
          '<rect x="-3" y="6" width="6" height="14" fill="#5a3818"/>' +
        '</g>' +
      '</g>' +
      // foam at bow
      '<path d="M 280 240 Q 290 244 300 240 Q 310 244 320 240" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>' +
      // dolphins jumping
      '<path d="M 160 246 Q 168 234 180 240" fill="none" stroke="#3a4858" stroke-width="2"/>' +
      '<path d="M 580 252 Q 588 240 600 246" fill="none" stroke="#3a4858" stroke-width="2"/>' +
      // sea birds
      '<path d="M 100 100 Q 108 92 116 100 Q 108 96 100 100" fill="#fff" stroke="#3a2010" stroke-width="0.4"/>' +
      '<path d="M 720 110 Q 728 102 736 110 Q 728 106 720 110" fill="#fff" stroke="#3a2010" stroke-width="0.4"/>' +
      '<path d="M 240 130 Q 248 122 256 130 Q 248 126 240 130" fill="#fff" stroke="#3a2010" stroke-width="0.4"/>' +
    '</svg>';
  },

  // ----- Isle of Halves -----
  isleHalves() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<linearGradient id="ih-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#5a4878"/>' +
          '<stop offset="1" stop-color="#a8a4c8"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="200" fill="url(#ih-sky)"/>' +
      // sea
      '<rect y="200" width="800" height="60" fill="#3a5878"/>' +
      // The island, literally cut in half
      '<g>' +
        // left half
        '<polygon points="50,260 220,260 240,200 200,160 100,170 60,210" fill="#5a4828" stroke="#1a0808" stroke-width="2"/>' +
        '<polygon points="100,170 200,160 240,200 220,260 230,260 250,200 200,150 90,160 50,210 60,210" fill="#7a6038" opacity="0.5"/>' +
        // grass on top
        '<path d="M 100 170 Q 150 162 200 160" stroke="#3a7858" stroke-width="3" fill="none"/>' +
        // right half — visibly separated
        '<polygon points="320,260 490,260 510,200 470,160 370,170 330,210" fill="#5a4828" stroke="#1a0808" stroke-width="2"/>' +
        '<path d="M 370 170 Q 420 162 470 160" stroke="#3a7858" stroke-width="3" fill="none"/>' +
        // void/sea between
        '<rect x="240" y="160" width="80" height="100" fill="#3a5878"/>' +
        // moonlit ripple between
        '<path d="M 240 220 Q 260 216 280 220 T 320 220" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="1"/>' +
        // small tree on each half
        '<g transform="translate(150, 168)">' +
          '<rect x="-2" y="-22" width="4" height="22" fill="#3a2010"/>' +
          '<ellipse cx="0" cy="-26" rx="14" ry="12" fill="#3a5828"/>' +
        '</g>' +
        '<g transform="translate(420, 168)">' +
          '<rect x="-2" y="-22" width="4" height="22" fill="#3a2010"/>' +
          '<ellipse cx="0" cy="-26" rx="14" ry="12" fill="#3a5828"/>' +
        '</g>' +
        // a half-house on each
        '<g transform="translate(180, 220)">' +
          '<rect x="0" y="0" width="20" height="20" fill="#7a5828" stroke="#1a0808" stroke-width="1"/>' +
          '<polygon points="-2,2 10,-10 20,2" fill="#5a3818"/>' +
        '</g>' +
        '<g transform="translate(380, 220)">' +
          '<rect x="0" y="0" width="20" height="20" fill="#7a5828" stroke="#1a0808" stroke-width="1"/>' +
          '<polygon points="-2,2 10,-10 20,2" fill="#5a3818"/>' +
        '</g>' +
      '</g>' +
      // distant: the right side of the island floats slightly
      '<g transform="translate(540, 80)">' +
        '<polygon points="0,180 200,180 220,120 180,80 80,90 10,130" fill="#5a4828" stroke="#1a0808" stroke-width="2"/>' +
        '<text x="120" y="170" text-anchor="middle" fill="#d4a624" font-family="Cinzel" font-size="20" opacity="0.4">1/2</text>' +
      '</g>' +
      // half-moon
      '<g transform="translate(140, 70)">' +
        '<circle r="22" fill="#f0d27a"/>' +
        '<path d="M 0 -22 A 22 22 0 0 0 0 22 Z" fill="#5a4878"/>' +
      '</g>' +
      // a giant "1/2" graffiti carved on the cliff face
      '<text x="700" y="170" fill="#d4a624" font-family="Cinzel" font-size="38" opacity="0.5">1/2</text>' +
      // foreground: cracked stone path
      '<rect y="260" width="800" height="100" fill="#3a2818"/>' +
      '<line x1="40" y1="300" x2="760" y2="300" stroke="#5a4828" stroke-width="2" stroke-dasharray="20 10"/>' +
    '</svg>';
  },

  // ----- Isle of Thirds -----
  isleThirds() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<linearGradient id="it-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#3a5878"/>' +
          '<stop offset="0.6" stop-color="#7a8898"/>' +
          '<stop offset="1" stop-color="#cca878"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="220" fill="url(#it-sky)"/>' +
      '<rect y="220" width="800" height="40" fill="#3a5878"/>' +
      // three-faceted island (a sphere split into thirds rotating slightly different shades)
      '<g transform="translate(400, 200)">' +
        // back third
        '<path d="M -120 0 Q -120 -120 -40 -120 L -40 60 Q -120 60 -120 0 Z" fill="#5a4878" stroke="#1a0838" stroke-width="2"/>' +
        // middle third
        '<path d="M -40 -120 L 40 -120 Q 40 60 -40 60 Z" fill="#7a6878" stroke="#1a0838" stroke-width="2"/>' +
        // front third (slightly forward)
        '<path d="M 40 -120 L 120 -120 Q 120 60 40 60 Z" fill="#5a4878" stroke="#1a0838" stroke-width="2"/>' +
        // glowing seams
        '<line x1="-40" y1="-120" x2="-40" y2="60" stroke="#d4a624" stroke-width="1.5" opacity="0.7"/>' +
        '<line x1="40" y1="-120" x2="40" y2="60" stroke="#d4a624" stroke-width="1.5" opacity="0.7"/>' +
        // floating cube glyphs
        '<text x="-80" y="-30" text-anchor="middle" fill="#d4a624" font-family="Cinzel" font-size="20">1/3</text>' +
        '<text x="0" y="-30" text-anchor="middle" fill="#d4a624" font-family="Cinzel" font-size="20">1/3</text>' +
        '<text x="80" y="-30" text-anchor="middle" fill="#d4a624" font-family="Cinzel" font-size="20">1/3</text>' +
        // mini towers, one per third
        '<g transform="translate(-80, -80)">' +
          '<rect x="-4" y="0" width="8" height="20" fill="#3a2010"/>' +
          '<polygon points="-6,0 8,0 0,-12" fill="#5a3818"/>' +
        '</g>' +
        '<g transform="translate(0, -80)">' +
          '<rect x="-4" y="0" width="8" height="20" fill="#3a2010"/>' +
          '<polygon points="-6,0 8,0 0,-12" fill="#5a3818"/>' +
        '</g>' +
        '<g transform="translate(80, -80)">' +
          '<rect x="-4" y="0" width="8" height="20" fill="#3a2010"/>' +
          '<polygon points="-6,0 8,0 0,-12" fill="#5a3818"/>' +
        '</g>' +
      '</g>' +
      // floating fractured pieces overhead
      '<polygon points="80,80 110,70 124,90 96,98" fill="#7a6878" stroke="#1a0838" stroke-width="1"/>' +
      '<polygon points="650,60 680,52 694,70 666,76" fill="#7a6878" stroke="#1a0838" stroke-width="1"/>' +
      '<polygon points="50,140 78,134 88,150 60,156" fill="#5a4878" stroke="#1a0838" stroke-width="1"/>' +
      '<polygon points="700,150 730,144 740,160 712,166" fill="#5a4878" stroke="#1a0838" stroke-width="1"/>' +
      // beach
      '<rect y="260" width="800" height="100" fill="#cca878"/>' +
      // distant boat
      '<g transform="translate(700, 245)" opacity="0.7">' +
        '<polygon points="-12,0 12,0 16,5 -16,5" fill="#3a2010"/>' +
        '<line x1="0" y1="0" x2="0" y2="-14" stroke="#3a2010" stroke-width="1.2"/>' +
        '<polygon points="0,-14 0,-2 10,-2 8,-12" fill="#f0e3bd"/>' +
      '</g>' +
    '</svg>';
  },

  // ----- Isle of Pieces -----
  islePieces() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<linearGradient id="ip-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#1a3848"/>' +
          '<stop offset="1" stop-color="#5a6878"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="240" fill="url(#ip-sky)"/>' +
      // stormy sea
      '<rect y="240" width="800" height="120" fill="#1a3848"/>' +
      '<path d="M 0 252 Q 80 240 160 252 T 320 252 T 480 252 T 640 252 T 800 252" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none"/>' +
      '<path d="M 0 274 Q 100 260 200 274 T 400 274 T 600 274 T 800 274" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" fill="none"/>' +
      // the shattered island — many pieces floating in mid-air
      '<g>' +
        // large central platform
        '<polygon points="320,220 480,220 500,260 300,260" fill="#5a4828" stroke="#1a0808" stroke-width="2"/>' +
        '<polygon points="320,220 480,220 470,230 330,230" fill="#7a6038" opacity="0.7"/>' +
        // tower stump on central platform
        '<rect x="380" y="180" width="40" height="40" fill="#3a2010" stroke="#1a0808" stroke-width="1.5"/>' +
        '<polygon points="372,180 428,180 400,150" fill="#5a3018" stroke="#1a0808" stroke-width="1.5"/>' +
        // floating chunks around it
        '<polygon points="160,200 220,194 246,222 218,238 174,232" fill="#5a4828" stroke="#1a0808" stroke-width="1.5"/>' +
        '<polygon points="556,194 612,200 626,224 590,236 550,224" fill="#5a4828" stroke="#1a0808" stroke-width="1.5"/>' +
        '<polygon points="100,150 144,144 158,166 130,176" fill="#5a4828" stroke="#1a0808" stroke-width="1.2"/>' +
        '<polygon points="640,130 680,124 694,148 668,158" fill="#5a4828" stroke="#1a0808" stroke-width="1.2"/>' +
        '<polygon points="280,140 320,134 336,156 304,164" fill="#5a4828" stroke="#1a0808" stroke-width="1.2"/>' +
        '<polygon points="460,128 504,122 522,144 484,156" fill="#5a4828" stroke="#1a0808" stroke-width="1.2"/>' +
        '<polygon points="60,250 92,246 102,266 76,272" fill="#5a4828" stroke="#1a0808" stroke-width="1"/>' +
        '<polygon points="700,255 730,250 738,268 716,272" fill="#5a4828" stroke="#1a0808" stroke-width="1"/>' +
        // glow lines between pieces (a torn chain)
        '<line x1="246" y1="216" x2="320" y2="220" stroke="#cc4878" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.7"/>' +
        '<line x1="480" y1="220" x2="556" y2="216" stroke="#cc4878" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.7"/>' +
        '<line x1="158" y1="160" x2="280" y2="148" stroke="#cc4878" stroke-width="1" stroke-dasharray="3 2" opacity="0.6"/>' +
        '<line x1="520" y1="140" x2="640" y2="138" stroke="#cc4878" stroke-width="1" stroke-dasharray="3 2" opacity="0.6"/>' +
      '</g>' +
      // floating fragments tiny
      '<polygon points="38,60 50,56 56,68 42,72" fill="#5a4828" opacity="0.6"/>' +
      '<polygon points="740,80 752,76 758,88 744,92" fill="#5a4828" opacity="0.6"/>' +
      '<polygon points="200,40 210,38 215,46 204,48" fill="#5a4828" opacity="0.5"/>' +
      // distant lightning
      '<polyline points="600,40 612,72 600,72 614,100" stroke="#f0d27a" stroke-width="1.5" fill="none" opacity="0.7"/>' +
      // glowing rune on central tower
      '<text x="400" y="208" text-anchor="middle" fill="#cc4878" font-family="Cinzel" font-size="16">∞</text>' +
    '</svg>';
  },

  // ----- Sunken Reef boss arena -----
  sunkenReef() {
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<radialGradient id="sr-light" cx="0.5" cy="0.4" r="0.7">' +
          '<stop offset="0" stop-color="#a8d8e0" stop-opacity="0.45"/>' +
          '<stop offset="1" stop-color="#1a3848" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<linearGradient id="sr-water" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#2a5878"/>' +
          '<stop offset="1" stop-color="#0a2838"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="360" fill="url(#sr-water)"/>' +
      // sun rays from above
      '<rect width="800" height="360" fill="url(#sr-light)"/>' +
      '<g opacity="0.45">' +
        '<polygon points="100,0 140,360 80,360" fill="rgba(255,255,255,0.18)"/>' +
        '<polygon points="280,0 320,360 260,360" fill="rgba(255,255,255,0.18)"/>' +
        '<polygon points="500,0 540,360 480,360" fill="rgba(255,255,255,0.18)"/>' +
        '<polygon points="680,0 720,360 660,360" fill="rgba(255,255,255,0.18)"/>' +
      '</g>' +
      // reef floor with crannies
      '<polygon points="0,260 800,260 760,360 40,360" fill="#1a2838"/>' +
      // coral pillars
      '<g transform="translate(120, 200)">' +
        '<polygon points="0,60 -8,40 -4,20 -10,0 -4,-20 0,-30 4,-20 -2,0 4,20 8,40 0,60" fill="#cc4878" stroke="#5a1838" stroke-width="1.5"/>' +
        '<circle cx="-4" cy="-10" r="3" fill="#f08888"/>' +
        '<circle cx="4" cy="10" r="3" fill="#f08888"/>' +
      '</g>' +
      '<g transform="translate(680, 200)">' +
        '<polygon points="0,60 -8,40 -4,20 -10,0 -4,-20 0,-30 4,-20 -2,0 4,20 8,40 0,60" fill="#cc4878" stroke="#5a1838" stroke-width="1.5"/>' +
        '<circle cx="-4" cy="-10" r="3" fill="#f08888"/>' +
        '<circle cx="4" cy="10" r="3" fill="#f08888"/>' +
      '</g>' +
      '<g transform="translate(220, 230)">' +
        '<polygon points="0,40 -6,20 -2,0 -8,-10 0,-22 6,-10 0,0 6,20 0,40" fill="#a8c47a" stroke="#3a5818" stroke-width="1"/>' +
      '</g>' +
      '<g transform="translate(580, 230)">' +
        '<polygon points="0,40 -6,20 -2,0 -8,-10 0,-22 6,-10 0,0 6,20 0,40" fill="#a8c47a" stroke="#3a5818" stroke-width="1"/>' +
      '</g>' +
      // sunken ruined arch (back center)
      '<g transform="translate(400, 200)">' +
        '<path d="M -100 60 L -100 -20 Q -100 -60 0 -60 Q 100 -60 100 -20 L 100 60 Z" fill="#3a4858" stroke="#1a2838" stroke-width="2"/>' +
        '<path d="M -90 60 L -90 -20 Q -90 -54 0 -54 Q 90 -54 90 -20 L 90 60 Z" fill="#1a2838"/>' +
        // throne for the Half-King
        '<rect x="-30" y="20" width="60" height="40" fill="#5a4878" stroke="#1a0838" stroke-width="2"/>' +
        '<polygon points="-30,20 30,20 24,8 -24,8" fill="#7a5878"/>' +
        '<rect x="-32" y="60" width="64" height="6" fill="#3a1838"/>' +
        // glowing seams on throne
        '<line x1="0" y1="20" x2="0" y2="58" stroke="#cc4878" stroke-width="1.2" opacity="0.7"/>' +
      '</g>' +
      // skeleton of a ship sunk in foreground
      '<g transform="translate(420, 310)">' +
        '<path d="M -80 0 Q -60 16 0 18 Q 60 16 80 0 Q 50 4 0 4 Q -50 4 -80 0 Z" fill="#3a2010" stroke="#1a0808" stroke-width="1.5"/>' +
        '<line x1="0" y1="4" x2="0" y2="-30" stroke="#3a2010" stroke-width="2.5"/>' +
        // bone-like ribs
        '<g stroke="#5a4838" stroke-width="1" fill="none">' +
          '<path d="M -50 4 Q -40 -12 -36 4"/>' +
          '<path d="M -20 4 Q -10 -16 -6 4"/>' +
          '<path d="M 14 4 Q 24 -16 28 4"/>' +
          '<path d="M 44 4 Q 54 -12 58 4"/>' +
        '</g>' +
      '</g>' +
      // bubbles
      '<circle cx="100" cy="100" r="2" fill="rgba(255,255,255,0.5)"/>' +
      '<circle cx="180" cy="60" r="3" fill="rgba(255,255,255,0.5)"/>' +
      '<circle cx="240" cy="120" r="2" fill="rgba(255,255,255,0.4)"/>' +
      '<circle cx="560" cy="80" r="3" fill="rgba(255,255,255,0.5)"/>' +
      '<circle cx="620" cy="140" r="2" fill="rgba(255,255,255,0.4)"/>' +
      '<circle cx="700" cy="50" r="2.5" fill="rgba(255,255,255,0.5)"/>' +
      // fish silhouettes
      '<path d="M 80 200 Q 100 196 120 200 Q 100 204 80 200 M 120 200 L 130 196 L 130 204 Z" fill="#3a4858" opacity="0.7"/>' +
      '<path d="M 660 240 Q 680 236 700 240 Q 680 244 660 240 M 700 240 L 710 236 L 710 244 Z" fill="#3a4858" opacity="0.7"/>' +
    '</svg>';
  },

  // --------------------------------------------------------
  // ACT II — ENEMY SPRITE additions (extend enemySprite logic)
  // --------------------------------------------------------
  _enemyAct2(spriteId) {
    if (spriteId === 'brine_sprite') {
      return (
        '<ellipse cx="100" cy="240" rx="40" ry="6" fill="rgba(0,0,0,0.5)"/>' +
        // body — translucent jellyfish-like
        '<ellipse cx="100" cy="120" rx="60" ry="50" fill="#88c4d8" opacity="0.85" stroke="#3a6878" stroke-width="2"/>' +
        '<ellipse cx="100" cy="100" rx="40" ry="20" fill="#a8d8e0" opacity="0.7"/>' +
        // inner glow
        '<circle cx="90" cy="100" r="6" fill="#fff" opacity="0.5"/>' +
        // eyes
        '<ellipse cx="84" cy="124" rx="3" ry="4" fill="#1a3848"/>' +
        '<ellipse cx="116" cy="124" rx="3" ry="4" fill="#1a3848"/>' +
        '<circle cx="84.5" cy="123" r="0.7" fill="#fff"/>' +
        '<circle cx="116.5" cy="123" r="0.7" fill="#fff"/>' +
        // tentacles
        '<g stroke="#3a6878" stroke-width="2.5" fill="none">' +
          '<path d="M 60 168 Q 50 200 58 230"/>' +
          '<path d="M 80 174 Q 70 210 80 240"/>' +
          '<path d="M 100 178 Q 100 220 100 240"/>' +
          '<path d="M 120 174 Q 130 210 120 240"/>' +
          '<path d="M 140 168 Q 150 200 142 230"/>' +
        '</g>' +
        // 1/2 mark on the bell
        '<text x="100" y="118" text-anchor="middle" fill="#3a6878" font-family="Cinzel" font-size="16">1/2</text>'
      );
    }
    if (spriteId === 'splitwhelk') {
      return (
        '<ellipse cx="100" cy="240" rx="55" ry="8" fill="rgba(0,0,0,0.5)"/>' +
        // shell — visible split down the middle
        '<g transform="translate(100, 150)">' +
          // left half
          '<path d="M 0 90 L 0 -30 Q -10 -70 -50 -50 Q -70 -10 -60 40 Q -50 80 0 90 Z" fill="#cc8848" stroke="#3a1810" stroke-width="2"/>' +
          // right half
          '<path d="M 0 90 L 0 -30 Q 10 -70 50 -50 Q 70 -10 60 40 Q 50 80 0 90 Z" fill="#cc8848" stroke="#3a1810" stroke-width="2"/>' +
          // spiral
          '<path d="M -50 -30 Q -30 -20 -20 -40 Q -10 -50 -20 -10" fill="none" stroke="#3a1810" stroke-width="1.5"/>' +
          '<path d="M 50 -30 Q 30 -20 20 -40 Q 10 -50 20 -10" fill="none" stroke="#3a1810" stroke-width="1.5"/>' +
          // central glow (the split)
          '<line x1="0" y1="-30" x2="0" y2="90" stroke="#f0d27a" stroke-width="2"/>' +
          // tiny body inside
          '<ellipse cx="0" cy="50" rx="14" ry="8" fill="#7a5828"/>' +
          '<ellipse cx="-4" cy="44" rx="1.5" ry="2" fill="#1a1008"/>' +
          '<ellipse cx="4" cy="44" rx="1.5" ry="2" fill="#1a1008"/>' +
          // mouth/tongue
          '<path d="M -8 56 Q 0 62 8 56" stroke="#3a2010" stroke-width="0.8" fill="none"/>' +
        '</g>'
      );
    }
    if (spriteId === 'tide_imp') {
      return (
        '<ellipse cx="100" cy="240" rx="40" ry="6" fill="rgba(0,0,0,0.55)"/>' +
        // body (small, eel-like)
        '<path d="M 60 220 Q 80 180 100 200 Q 120 220 140 180 Q 150 140 130 110 Q 100 80 80 100 Q 60 130 70 160" fill="#3a6878" stroke="#1a2838" stroke-width="2"/>' +
        // belly
        '<path d="M 80 100 Q 100 130 90 160 Q 80 190 100 200" fill="#88c4d8" opacity="0.7"/>' +
        // fins
        '<polygon points="62,160 50,156 56,176" fill="#88c4d8" stroke="#1a2838" stroke-width="1"/>' +
        '<polygon points="148,180 162,186 156,166" fill="#88c4d8" stroke="#1a2838" stroke-width="1"/>' +
        // head
        '<ellipse cx="80" cy="100" rx="18" ry="14" fill="#3a6878" stroke="#1a2838" stroke-width="2"/>' +
        // big eye
        '<ellipse cx="72" cy="98" rx="3" ry="4" fill="#f0d27a"/>' +
        '<ellipse cx="72" cy="98" rx="1.5" ry="2.5" fill="#1a2838"/>' +
        // sharp teeth
        '<polygon points="62,108 64,116 68,108" fill="#fff"/>' +
        '<polygon points="68,110 70,118 74,110" fill="#fff"/>' +
        '<polygon points="78,108 80,116 84,108" fill="#fff"/>' +
        // bubbles
        '<circle cx="50" cy="80" r="2" fill="rgba(255,255,255,0.5)"/>' +
        '<circle cx="160" cy="100" r="2.5" fill="rgba(255,255,255,0.5)"/>'
      );
    }
    if (spriteId === 'coral_golem') {
      return (
        '<ellipse cx="100" cy="240" rx="65" ry="8" fill="rgba(0,0,0,0.6)"/>' +
        // legs (coral pillars)
        '<polygon points="56,200 84,200 88,240 52,240" fill="#cc4878" stroke="#5a1838" stroke-width="2"/>' +
        '<polygon points="116,200 144,200 148,240 112,240" fill="#cc4878" stroke="#5a1838" stroke-width="2"/>' +
        // body
        '<polygon points="44,120 156,120 168,200 32,200" fill="#cc4878" stroke="#5a1838" stroke-width="2"/>' +
        '<polygon points="60,140 140,140 148,180 52,180" fill="#7a1838" opacity="0.5"/>' +
        // sea growth
        '<circle cx="60" cy="160" r="4" fill="#a8c47a"/>' +
        '<circle cx="140" cy="160" r="4" fill="#a8c47a"/>' +
        // arms
        '<polygon points="22,140 44,150 50,210 28,200" fill="#cc4878" stroke="#5a1838" stroke-width="2"/>' +
        '<polygon points="178,140 156,150 150,210 172,200" fill="#cc4878" stroke="#5a1838" stroke-width="2"/>' +
        // fists (heavy)
        '<rect x="14" y="200" width="34" height="22" fill="#a83878" stroke="#5a1838" stroke-width="2"/>' +
        '<rect x="152" y="200" width="34" height="22" fill="#a83878" stroke="#5a1838" stroke-width="2"/>' +
        // head (cube-coral)
        '<polygon points="74,68 126,68 134,116 66,116" fill="#cc4878" stroke="#5a1838" stroke-width="2"/>' +
        '<polygon points="74,68 126,68 122,76 78,76" fill="#a83878"/>' +
        // glowing eyes
        '<circle cx="86" cy="92" r="4" fill="#1a0808"/>' +
        '<circle cx="86" cy="92" r="2" fill="#f0d27a"/>' +
        '<circle cx="114" cy="92" r="4" fill="#1a0808"/>' +
        '<circle cx="114" cy="92" r="2" fill="#f0d27a"/>' +
        // jaw / fraction grin
        '<rect x="80" y="104" width="40" height="6" fill="#1a0808"/>' +
        '<line x1="92" y1="104" x2="92" y2="110" stroke="#5a4838" stroke-width="0.8"/>' +
        '<line x1="100" y1="104" x2="100" y2="110" stroke="#5a4838" stroke-width="0.8"/>' +
        '<line x1="108" y1="104" x2="108" y2="110" stroke="#5a4838" stroke-width="0.8"/>' +
        // glyph on chest
        '<text x="100" y="170" text-anchor="middle" fill="#f0d27a" font-family="Cinzel" font-size="16">⅔</text>' +
        // small bubbles
        '<circle cx="20" cy="80" r="2" fill="rgba(255,255,255,0.4)"/>' +
        '<circle cx="180" cy="70" r="2" fill="rgba(255,255,255,0.4)"/>'
      );
    }
    if (spriteId === 'halves_warden') {
      return (
        '<ellipse cx="100" cy="244" rx="80" ry="10" fill="rgba(0,0,0,0.6)"/>' +
        // body — half-stone, half-water
        '<g transform="translate(100, 130)">' +
          // left half (stone)
          '<path d="M 0 110 L -60 110 L -70 0 Q -70 -80 0 -80 Z" fill="#5a4828" stroke="#1a0808" stroke-width="2"/>' +
          // right half (water)
          '<path d="M 0 110 L 60 110 L 70 0 Q 70 -80 0 -80 Z" fill="#3a6878" stroke="#1a2838" stroke-width="2"/>' +
          // dividing seam
          '<line x1="0" y1="-80" x2="0" y2="110" stroke="#f0d27a" stroke-width="2"/>' +
          // chest mark
          '<text x="-20" y="20" text-anchor="middle" fill="#d4a624" font-family="Cinzel" font-size="20">1</text>' +
          '<line x1="-30" y1="28" x2="-12" y2="28" stroke="#d4a624" stroke-width="2"/>' +
          '<text x="-20" y="46" text-anchor="middle" fill="#d4a624" font-family="Cinzel" font-size="20">2</text>' +
          // crown on head — half iron, half coral
          '<polygon points="-30,-80 -30,-100 -20,-90 -10,-100 0,-90" fill="#888" stroke="#1a0808" stroke-width="1.5"/>' +
          '<polygon points="0,-90 10,-100 20,-90 30,-100 30,-80" fill="#cc4878" stroke="#5a1838" stroke-width="1.5"/>' +
        '</g>' +
        // big halberd (split haft)
        '<line x1="14" y1="50" x2="20" y2="220" stroke="#3a2010" stroke-width="5"/>' +
        '<polygon points="-10,50 24,40 36,80 6,90" fill="#888" stroke="#1a0808" stroke-width="1.5"/>' +
        '<polygon points="-10,50 24,40 14,30 -2,42" fill="#3a6878"/>'
      );
    }
    if (spriteId === 'thirds_seer') {
      return (
        '<ellipse cx="100" cy="244" rx="80" ry="10" fill="rgba(0,0,0,0.6)"/>' +
        // floating robed body
        '<g transform="translate(100, 130)">' +
          // robe with three folds
          '<path d="M -60 100 L -70 0 Q -70 -80 0 -80 Q 70 -80 70 0 L 60 100 Z" fill="#5a4878" stroke="#1a0838" stroke-width="2"/>' +
          '<path d="M -50 100 L -40 -20 L -20 100 Z" fill="#7a6898" opacity="0.6"/>' +
          '<path d="M -10 100 L 0 -30 L 10 100 Z" fill="#7a6898" opacity="0.6"/>' +
          '<path d="M 30 100 L 40 -20 L 50 100 Z" fill="#7a6898" opacity="0.6"/>' +
          // hood
          '<path d="M -40 -80 Q 0 -114 40 -80 L 40 -40 Q 0 -52 -40 -40 Z" fill="#3a1838" stroke="#1a0838" stroke-width="2"/>' +
          // three eyes glow inside hood
          '<circle cx="-14" cy="-58" r="2" fill="#cc4878"/>' +
          '<circle cx="0" cy="-62" r="2" fill="#cc4878"/>' +
          '<circle cx="14" cy="-58" r="2" fill="#cc4878"/>' +
          // hands holding a triangular sigil
          '<polygon points="-12,-10 12,-10 0,16" fill="none" stroke="#d4a624" stroke-width="2"/>' +
          '<text x="0" y="6" text-anchor="middle" fill="#d4a624" font-family="Cinzel" font-size="10">⅓</text>' +
        '</g>'
      );
    }
    if (spriteId === 'pieces_collector') {
      return (
        '<ellipse cx="100" cy="244" rx="85" ry="11" fill="rgba(0,0,0,0.6)"/>' +
        // body composed of mismatched pieces
        '<g transform="translate(100, 130)">' +
          '<polygon points="-40,80 -60,40 -50,0 -30,-30 0,-50 30,-30 50,-10 60,30 50,80" fill="#5a4828" stroke="#1a0808" stroke-width="2"/>' +
          // patchwork seams
          '<line x1="-30" y1="-30" x2="0" y2="-50" stroke="#f0d27a" stroke-width="1.5"/>' +
          '<line x1="0" y1="-50" x2="30" y2="-30" stroke="#f0d27a" stroke-width="1.5"/>' +
          '<line x1="-50" y1="0" x2="-30" y2="-30" stroke="#f0d27a" stroke-width="1.5"/>' +
          '<line x1="30" y1="-30" x2="50" y2="-10" stroke="#f0d27a" stroke-width="1.5"/>' +
          '<line x1="-40" y1="80" x2="-60" y2="40" stroke="#f0d27a" stroke-width="1"/>' +
          '<line x1="50" y1="80" x2="60" y2="30" stroke="#f0d27a" stroke-width="1"/>' +
          // glowing center
          '<circle cx="0" cy="0" r="14" fill="#cc4878" opacity="0.7"/>' +
          '<circle cx="0" cy="0" r="6" fill="#fff" opacity="0.8"/>' +
          // gathered fragments orbiting
          '<polygon points="-90,-20 -78,-26 -70,-12 -84,-6" fill="#5a4828" stroke="#1a0808" stroke-width="1"/>' +
          '<polygon points="80,-30 92,-36 98,-22 84,-14" fill="#5a4828" stroke="#1a0808" stroke-width="1"/>' +
          '<polygon points="100,40 112,34 118,48 104,56" fill="#5a4828" stroke="#1a0808" stroke-width="1"/>' +
          '<polygon points="-100,40 -88,34 -82,48 -96,56" fill="#5a4828" stroke="#1a0808" stroke-width="1"/>' +
        '</g>'
      );
    }
    if (spriteId === 'half_king') {
      return (
        '<defs>' +
          '<radialGradient id="hk-void" cx="0.5" cy="0.5" r="0.8">' +
            '<stop offset="0" stop-color="#cc4878"/>' +
            '<stop offset="0.5" stop-color="#5a1838"/>' +
            '<stop offset="1" stop-color="#0a0210"/>' +
          '</radialGradient>' +
          '<linearGradient id="hk-water" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="#3a6878"/>' +
            '<stop offset="1" stop-color="#1a3848"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<ellipse cx="100" cy="244" rx="95" ry="14" fill="rgba(0,0,0,0.7)"/>' +
        // throne behind
        '<rect x="40" y="50" width="120" height="80" fill="#3a1838" stroke="#1a0828" stroke-width="2"/>' +
        '<polygon points="20,46 180,46 174,50 26,50" fill="#5a2858"/>' +
        // King — torso emerging from water
        '<g transform="translate(100, 130)">' +
          // crown (jagged, multiple peaks)
          '<polygon points="-50,-30 -40,-66 -28,-44 -18,-72 -10,-44 0,-78 10,-44 18,-72 28,-44 40,-66 50,-30" fill="#d4a624" stroke="#3a2010" stroke-width="1.5"/>' +
          '<polygon points="-40,-50 -28,-50 -34,-58" fill="#cc4818"/>' +
          '<polygon points="-10,-58 10,-58 0,-66" fill="#cc4818"/>' +
          '<polygon points="28,-50 40,-50 34,-58" fill="#cc4818"/>' +
          // head (cracked stone left, water-flow right)
          '<path d="M 0 0 L -50 0 L -50 -34 Q -40 -50 0 -50 Z" fill="url(#hk-void)" stroke="#1a0808" stroke-width="2"/>' +
          '<path d="M 0 0 L 50 0 L 50 -34 Q 40 -50 0 -50 Z" fill="url(#hk-water)" stroke="#1a2838" stroke-width="2"/>' +
          '<line x1="0" y1="-50" x2="0" y2="0" stroke="#f0d27a" stroke-width="2"/>' +
          // eyes (left burning red, right deep blue)
          '<circle cx="-24" cy="-22" r="4" fill="#1a0808"/>' +
          '<circle cx="-24" cy="-22" r="2" fill="#cc4818"/>' +
          '<circle cx="24" cy="-22" r="4" fill="#1a2838"/>' +
          '<circle cx="24" cy="-22" r="2" fill="#a8d8e0"/>' +
          // mouth — a yawning slash
          '<path d="M -20 -8 L 20 -8 L 16 -2 L -16 -2 Z" fill="#1a0808"/>' +
          '<line x1="-12" y1="-8" x2="-12" y2="-2" stroke="#5a4838" stroke-width="0.6"/>' +
          '<line x1="0" y1="-8" x2="0" y2="-2" stroke="#5a4838" stroke-width="0.6"/>' +
          '<line x1="12" y1="-8" x2="12" y2="-2" stroke="#5a4838" stroke-width="0.6"/>' +
          // shoulders / robes flowing into water
          '<path d="M -50 0 Q -70 50 -60 100 L 60 100 Q 70 50 50 0 Z" fill="#5a2858" stroke="#1a0838" stroke-width="2"/>' +
          '<path d="M -50 0 Q -40 30 -20 40 L 20 40 Q 40 30 50 0" fill="#3a1838"/>' +
          // chest — fraction sigil
          '<polygon points="-16,30 16,30 12,38 -12,38" fill="#cc4878" stroke="#5a1838" stroke-width="1.5"/>' +
          '<text x="0" y="36" text-anchor="middle" fill="#fff" font-family="Cinzel" font-size="10">½</text>' +
        '</g>' +
        // tentacle/wave arm rising
        '<path d="M 20 230 Q 0 200 20 180 Q 50 200 40 240" fill="#3a6878" opacity="0.85" stroke="#1a2838" stroke-width="1.5"/>' +
        '<path d="M 180 230 Q 200 200 180 180 Q 150 200 160 240" fill="#5a2858" opacity="0.85" stroke="#1a0838" stroke-width="1.5"/>' +
        // water at base
        '<rect x="0" y="222" width="200" height="14" fill="url(#hk-water)" opacity="0.7"/>' +
        '<path d="M 0 224 Q 50 220 100 224 T 200 224" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" fill="none"/>'
      );
    }
    return null;
  },

  // --------------------------------------------------------
  // ITEM ICONS — small 40x40 svgs
  // --------------------------------------------------------
  itemIcon(itemId) {
    const item = ITEMS[itemId];
    if (!item) return '';
    const map = {
      iron_longsword:  '<line x1="20" y1="6" x2="20" y2="32" stroke="#b8c0c8" stroke-width="3.5" stroke-linecap="round"/><rect x="15" y="30" width="10" height="3" fill="#5a3818"/><rect x="17" y="33" width="6" height="5" fill="#5a3818"/>',
      oak_staff:       '<line x1="20" y1="8" x2="20" y2="36" stroke="#7a5a28" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="8" r="6" fill="#3a3e8a" stroke="#7a5a28" stroke-width="1.5"/><circle cx="20" cy="8" r="2.5" fill="#a0c0ff"/>',
      pair_of_daggers: '<line x1="13" y1="8" x2="17" y2="34" stroke="#bbb" stroke-width="2.5" stroke-linecap="round"/><line x1="23" y1="8" x2="27" y2="34" stroke="#bbb" stroke-width="2.5" stroke-linecap="round"/>',
      yew_shortbow:    '<path d="M 14 8 Q 6 20 14 32" fill="none" stroke="#6a4818" stroke-width="3"/><line x1="14" y1="8" x2="14" y2="32" stroke="#e8d5b5" stroke-width="0.6"/>',
      leather_hauberk: '<polygon points="10,10 30,10 32,32 8,32" fill="#7a4830" stroke="#3a1810" stroke-width="1.5"/><circle cx="20" cy="20" r="3" fill="#d4a624"/>',
      scholars_robe:   '<polygon points="10,8 30,8 33,34 7,34" fill="#3a3e8a" stroke="#1a1838" stroke-width="1.5"/><text x="20" y="24" text-anchor="middle" fill="#d4a624" font-family="Cinzel" font-size="9">∑</text>',
      shadowed_jerkin: '<polygon points="10,8 30,8 32,34 8,34" fill="#1a2818" stroke="#0a1808" stroke-width="1.5"/><line x1="20" y1="10" x2="20" y2="32" stroke="#3a3818" stroke-width="1"/>',
      ranger_cloak:    '<polygon points="8,8 32,8 34,34 6,34" fill="#3a4a28" stroke="#1a2818" stroke-width="1.5"/><polygon points="10,10 30,10 26,24 14,24" fill="#4a5a2a"/>',
      measuring_chain: '<g stroke="#d4a624" stroke-width="1.5" fill="none"><circle cx="10" cy="14" r="3"/><circle cx="16" cy="20" r="3"/><circle cx="22" cy="14" r="3"/><circle cx="28" cy="20" r="3"/></g>',
      cubits_amulet:   '<polygon points="20,8 28,18 26,32 14,32 12,18" fill="#5a3878" stroke="#d4a624" stroke-width="1.5"/><text x="20" y="26" text-anchor="middle" fill="#d4a624" font-family="Cinzel" font-size="9">V</text>',
      quarrymans_belt: '<rect x="6" y="16" width="28" height="8" fill="#5a3818" stroke="#1a0808" stroke-width="1.5"/><rect x="16" y="14" width="8" height="12" fill="#d4a624" stroke="#1a0808" stroke-width="1"/>',
      hourglass_charm: '<polygon points="10,8 30,8 22,20 30,32 10,32 18,20" fill="#d4a624" stroke="#3a2010" stroke-width="1.2"/><polygon points="12,10 28,10 22,18 18,18" fill="#cc3030" opacity="0.7"/>',
      hollowed_blade:  '<line x1="20" y1="6" x2="20" y2="32" stroke="#7a3878" stroke-width="4" stroke-linecap="round"/><line x1="20" y1="6" x2="20" y2="32" stroke="#cc4878" stroke-width="1.5" stroke-linecap="round"/><rect x="14" y="30" width="12" height="3" fill="#3a1838"/>',
      apprentices_grimoire: '<rect x="8" y="8" width="24" height="26" fill="#5a3818" stroke="#1a0808" stroke-width="1.5"/><rect x="10" y="10" width="20" height="22" fill="#f0e3bd"/><text x="20" y="24" text-anchor="middle" fill="#3a2010" font-family="Cinzel" font-size="10">A</text>',
      ironwood_circlet:'<path d="M 8 20 Q 20 14 32 20" fill="none" stroke="#3a2010" stroke-width="2"/><circle cx="20" cy="17" r="3" fill="#d4a624"/>',
      golems_core:     '<rect x="10" y="10" width="20" height="20" fill="#7a3878" stroke="#1a0418" stroke-width="1.5"/><rect x="14" y="14" width="12" height="12" fill="#cc4878"/><circle cx="20" cy="20" r="3" fill="#fff" opacity="0.65"/>',
      minor_potion:    '<rect x="16" y="6" width="8" height="6" fill="#5a3818"/><path d="M 14 12 L 14 30 Q 14 34 20 34 Q 26 34 26 30 L 26 12 Z" fill="#cc3060" stroke="#3a1810" stroke-width="1.5"/><ellipse cx="18" cy="18" rx="2" ry="3" fill="#ee6088"/>',
      greater_potion:  '<rect x="16" y="6" width="8" height="6" fill="#3a2010"/><path d="M 14 12 L 14 32 Q 14 34 20 34 Q 26 34 26 32 L 26 12 Z" fill="#7a3030" stroke="#1a0808" stroke-width="1.5"/><ellipse cx="18" cy="18" rx="2" ry="3" fill="#cc3060"/><text x="20" y="28" text-anchor="middle" fill="#f0d27a" font-family="Cinzel" font-size="8">+</text>',
      mana_phial:      '<rect x="16" y="6" width="8" height="6" fill="#5a3818"/><path d="M 14 12 L 14 30 Q 14 34 20 34 Q 26 34 26 30 L 26 12 Z" fill="#3060cc" stroke="#1a1838" stroke-width="1.5"/><ellipse cx="18" cy="18" rx="2" ry="3" fill="#6090ee"/>',
      scroll_of_sight: '<rect x="6" y="14" width="28" height="14" fill="#f0e3bd" stroke="#3a2010" stroke-width="1.5"/><circle cx="10" cy="21" r="3" fill="#3a2010"/><circle cx="30" cy="21" r="3" fill="#3a2010"/><text x="20" y="25" text-anchor="middle" fill="#3a2010" font-family="Cinzel" font-size="8">✦</text>',
      scroll_of_clemency: '<rect x="6" y="14" width="28" height="14" fill="#f0e3bd" stroke="#3a2010" stroke-width="1.5"/><circle cx="10" cy="21" r="3" fill="#3a2010"/><circle cx="30" cy="21" r="3" fill="#3a2010"/><text x="20" y="25" text-anchor="middle" fill="#5a1818" font-family="Cinzel" font-size="8">✗</text>',
      // Act II
      brass_sextant:    '<circle cx="20" cy="22" r="12" fill="none" stroke="#bfa050" stroke-width="2"/><line x1="20" y1="10" x2="20" y2="34" stroke="#bfa050" stroke-width="1.5"/><line x1="8" y1="22" x2="32" y2="22" stroke="#bfa050" stroke-width="1.5"/><circle cx="20" cy="22" r="2" fill="#d4a624"/>',
      pearled_circlet:  '<path d="M 6 22 Q 20 12 34 22" fill="none" stroke="#5a3818" stroke-width="2"/><circle cx="14" cy="18" r="2" fill="#f0e3bd"/><circle cx="20" cy="15" r="2.5" fill="#f0e3bd"/><circle cx="26" cy="18" r="2" fill="#f0e3bd"/>',
      kelp_charm:       '<g stroke="#3a7848" stroke-width="2" fill="none"><path d="M 20 6 Q 16 12 20 16 Q 24 20 20 24 Q 16 28 20 34"/></g><circle cx="20" cy="11" r="2" fill="#aab87c"/><circle cx="20" cy="20" r="2" fill="#aab87c"/><circle cx="20" cy="29" r="2" fill="#aab87c"/>',
      saltskin_jerkin:  '<polygon points="10,8 30,8 32,32 8,32" fill="#3a6878" stroke="#1a2838" stroke-width="1.5"/><polygon points="12,10 28,10 18,18 22,18" fill="#a8d8e0" opacity="0.5"/><circle cx="20" cy="22" r="2" fill="#d4a624"/>',
      netcaster_cloak:  '<polygon points="8,8 32,8 34,34 6,34" fill="#3a5878" stroke="#1a2838" stroke-width="1.5"/><g stroke="#8a6a14" stroke-width="0.6" fill="none"><line x1="12" y1="14" x2="28" y2="30"/><line x1="20" y1="14" x2="12" y2="22"/><line x1="28" y1="14" x2="20" y2="22"/></g>',
      tide_blade:       '<line x1="20" y1="6" x2="20" y2="32" stroke="#3a6878" stroke-width="4" stroke-linecap="round"/><line x1="20" y1="6" x2="20" y2="32" stroke="#88c4d8" stroke-width="1.5" stroke-linecap="round"/><rect x="14" y="30" width="12" height="3" fill="#3a1818"/>',
      coral_staff:      '<line x1="20" y1="8" x2="20" y2="36" stroke="#cc4878" stroke-width="3.5" stroke-linecap="round"/><polygon points="14,8 26,8 20,2" fill="#f08888"/><circle cx="20" cy="8" r="3" fill="#f0d27a"/>',
      half_kings_horn:  '<path d="M 8 26 Q 16 8 30 12 Q 26 22 16 30 Q 12 28 8 26 Z" fill="#cccccc" stroke="#3a2010" stroke-width="1.5"/><line x1="16" y1="20" x2="22" y2="16" stroke="#3a2010" stroke-width="0.6"/>',
      sextant_of_wholeness: '<circle cx="20" cy="22" r="12" fill="rgba(212,166,36,0.18)" stroke="#d4a624" stroke-width="2"/><polygon points="20,10 24,22 20,34 16,22" fill="#d4a624"/><polygon points="8,22 20,18 32,22 20,26" fill="#d4a624"/><circle cx="20" cy="22" r="2" fill="#fff"/>',
      navigators_locket: '<ellipse cx="20" cy="22" rx="8" ry="10" fill="#bfa050" stroke="#3a2010" stroke-width="1.5"/><line x1="12" y1="10" x2="28" y2="10" stroke="#bfa050" stroke-width="0.8"/><text x="20" y="25" text-anchor="middle" fill="#1a1008" font-family="Cinzel" font-size="8">∞</text>',
      smoked_kipper:    '<ellipse cx="20" cy="22" rx="14" ry="6" fill="#7a5828" stroke="#3a1808" stroke-width="1"/><polygon points="34,20 38,22 34,24" fill="#7a5828" stroke="#3a1808" stroke-width="1"/><circle cx="10" cy="21" r="1" fill="#fff"/><circle cx="10" cy="21" r="0.5" fill="#1a1008"/>',
      brine_phial:      '<rect x="16" y="6" width="8" height="6" fill="#5a3818"/><path d="M 14 12 L 14 30 Q 14 34 20 34 Q 26 34 26 30 L 26 12 Z" fill="#3a7898" stroke="#1a2838" stroke-width="1.5"/><ellipse cx="18" cy="18" rx="2" ry="3" fill="#88c4d8"/>'
    };
    const inner = map[itemId] || '<rect x="8" y="8" width="24" height="24" fill="#5a3818" stroke="#3a2010" stroke-width="1.5"/>';
    return '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="40" height="40" rx="4" fill="rgba(0,0,0,0.3)" stroke="' + (item.slot === 'weapon' ? '#aa2828' : item.slot === 'armor' ? '#5a3878' : item.slot === 'accessory' ? '#d4a624' : '#3a7848') + '" stroke-width="1.5"/>' +
      inner +
    '</svg>';
  }

};

if (typeof window !== 'undefined') window.Art = Art;
