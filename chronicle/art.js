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
      inner = '<rect x="60" y="60" width="80" height="100" fill="#5a4838"/>';
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
      scroll_of_clemency: '<rect x="6" y="14" width="28" height="14" fill="#f0e3bd" stroke="#3a2010" stroke-width="1.5"/><circle cx="10" cy="21" r="3" fill="#3a2010"/><circle cx="30" cy="21" r="3" fill="#3a2010"/><text x="20" y="25" text-anchor="middle" fill="#5a1818" font-family="Cinzel" font-size="8">✗</text>'
    };
    const inner = map[itemId] || '<rect x="8" y="8" width="24" height="24" fill="#5a3818" stroke="#3a2010" stroke-width="1.5"/>';
    return '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="40" height="40" rx="4" fill="rgba(0,0,0,0.3)" stroke="' + (item.slot === 'weapon' ? '#aa2828' : item.slot === 'armor' ? '#5a3878' : item.slot === 'accessory' ? '#d4a624' : '#3a7848') + '" stroke-width="1.5"/>' +
      inner +
    '</svg>';
  }

};

if (typeof window !== 'undefined') window.Art = Art;
