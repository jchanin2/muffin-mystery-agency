// narratives.js — Mystery case data for Muffin's Mystery Agency
// Each problem has a story-relevant question with numbers tied to the narrative.

const CASES = [
  // ============================================================
  // CASE 1: The Case of the Vanishing Cupcakes (Easy, 5 problems)
  // Mostly 1-decimal-place numbers, small divisors, clean answers
  // ============================================================
  {
    id: 'vanishing_cupcakes',
    title: 'The Case of the Vanishing Cupcakes',
    difficulty: 'easy',
    description: 'Cupcakes are vanishing from Rosie\'s Bakery every night. No doors broken, no windows smashed. Who — or what — is stealing the sweets?',
    backdrop: 'bakery',
    problems: [
      {
        cluePrompt: 'Muffin examines the bakery counter. Rosie says she weighed her remaining cupcakes and divided them equally onto display trays. Solve this to read the inventory log.',
        clueReveal: 'The inventory log shows 12 cupcakes vanished between midnight and 5 AM — but the front door was locked the whole time!',
        question: 'Rosie had 4.8 kg of cupcakes divided equally onto 2 display trays. How many kg were on each tray?',
        answer: 2.4,
        hint: '4.8 ÷ 2',
      },
      {
        cluePrompt: 'Muffin notices flour footprints on the floor — tiny ones. He follows them to the back wall. There\'s a receipt stuck to the baseboard. Solve this to decode the smudged numbers.',
        clueReveal: 'The flour footprints are small — too small for a human. They lead to an air vent near the floor. Something has been coming through there...',
        question: 'The smudged receipt shows $7.50 was spent on 3 bags of baking flour. How much did each bag cost?',
        answer: 2.5,
        hint: '7.5 ÷ 3',
      },
      {
        cluePrompt: 'Muffin inspects the air vent. There are scratch marks around the edges and bits of frosting smeared inside. He measures the vent opening to figure out what could fit through.',
        clueReveal: 'The vent opening is only 0.3 meters per section — no human could fit through! But a small animal could. Muffin also finds tiny claw marks on the metal.',
        question: 'The air vent is 1.5 meters long, divided into 5 equal sections by metal slats. How wide is each section in meters?',
        answer: 0.3,
        hint: '1.5 ÷ 5',
      },
      {
        cluePrompt: 'Muffin checks the security camera footage. The camera records in short clips, and he needs to figure out how many clips to review to find the moment the shadows appear.',
        clueReveal: 'In clip 6, at 2:30 AM, shadowy figures — no, THREE shadowy figures — scurry across the floor! They have round bodies and bushy tails!',
        question: 'The security camera records in 0.5-hour clips. The suspicious window is 3 hours long. How many clips does Muffin need to review?',
        answer: 6,
        hint: '3 ÷ 0.5',
      },
      {
        cluePrompt: 'Muffin sets a trap: cupcakes on pressure plates near the vent. He needs to divide the bait cupcakes evenly so each plate has enough weight to trigger the camera. Solve this to spring the trap!',
        clueReveal: 'SNAP! The trap captures photographic evidence — three raccoons in tiny bandit masks, frosting all over their paws! Case closed!',
        question: 'Muffin places 3.6 kg of cupcakes equally across 4 pressure plates. How many kg go on each plate?',
        answer: 0.9,
        hint: '3.6 ÷ 4',
      }
    ],
    resolution: 'Muffin presents his findings to Rosie: a family of three raccoons had been sneaking through the air vent every night, drawn by the scent of fresh cupcakes. Rosie installs a vent cover and — because she has a soft heart — leaves a small plate of day-old cupcakes outside the back door. The raccoons are happy, the bakery is safe, and Muffin earns a free cupcake for his brilliant detective work!',
    defeatMessage: 'The raccoons escaped with the evidence! But every great detective learns from setbacks. Muffin adjusts his magnifying glass and prepares to try again...'
  },

  // ============================================================
  // CASE 2: The Phantom of the School Library (Medium, 6 problems)
  // Mix of types, slightly larger numbers, some 2-decimal answers
  // ============================================================
  {
    id: 'phantom_library',
    title: 'The Phantom of the School Library',
    difficulty: 'medium',
    description: 'Books are being rearranged at Oakwood Elementary overnight. Strange bookmarks appear in random books. The librarian is spooked. Is the library haunted?',
    backdrop: 'library',
    problems: [
      {
        cluePrompt: 'Muffin arrives at the library. Mrs. Chen, the librarian, shows him the catalog records. Books have been moved to different shelves — but in a pattern. Solve this to decode the shelf numbering system.',
        clueReveal: 'The books aren\'t randomly moved — they\'ve been reorganized by page count! Someone is re-sorting the entire library using their own system.',
        question: 'Mrs. Chen found 8.4 meters of shelf space reorganized, spread equally across 4 shelves. How many meters were reorganized per shelf?',
        answer: 2.1,
        hint: '8.4 ÷ 4',
      },
      {
        cluePrompt: 'Muffin finds handmade bookmarks tucked into several books. Each one has a Dewey Decimal number written on it, and they\'re evenly spaced. He needs to figure out how many were made.',
        clueReveal: 'The bookmarks contain Dewey Decimal numbers — but slightly modified. Whoever is doing this really knows the library system and has improved it!',
        question: 'The handmade bookmarks are spaced 0.3 numbers apart in the catalog. They span a range of 6 Dewey numbers. How many bookmarks were made?',
        answer: 20,
        hint: '6 ÷ 0.3',
      },
      {
        cluePrompt: 'Muffin checks the library sign-in sheet. One student has been checking out an unusual number of books about library science. Solve this to find how many books they borrowed.',
        clueReveal: 'A student named Sam has checked out 14 books about library organization in the past month — more than any other student in the school\'s history!',
        question: 'Sam\'s borrowed books weigh 8.4 kg total. Each library science book weighs 0.6 kg. How many books did Sam check out?',
        answer: 14,
        hint: '8.4 ÷ 0.6',
      },
      {
        cluePrompt: 'Muffin discovers that someone has been buying bookmarks and label stickers from the school store. The store keeps purchase records. Solve this to trace the purchases.',
        clueReveal: 'The purchases were all made with coins — exactly the kind a student would pay with. And they were all bought during Tuesday lunch periods.',
        question: 'Sam spent $4.50 at the school store on bookmarks and labels over 3 Tuesday lunch periods. How much did Sam spend each Tuesday?',
        answer: 1.50,
        hint: '$4.50 ÷ 3',
      },
      {
        cluePrompt: 'Muffin reviews the school\'s after-hours security log. Someone has been entering the library through a side door using a code. The entries follow a regular pattern.',
        clueReveal: 'The door was accessed 8 times — every Tuesday and Thursday at 4:15 PM, right when the chess club meets across the hall. Someone is sneaking in while the hallway monitor is distracted!',
        question: 'The security log spans 4 weeks. The side door was accessed every 0.5 weeks. How many times was it accessed?',
        answer: 8,
        hint: '4 ÷ 0.5',
      },
      {
        cluePrompt: 'Muffin hides behind the reference section on a Thursday afternoon and waits. At 4:15, the side door opens quietly. He times how fast the phantom works. Solve this to identify the phantom!',
        clueReveal: 'It\'s Sam — a quiet 4th grader with round glasses and a backpack full of bookmarks! Sam freezes when they see Muffin, bookmark in hand.',
        question: 'The phantom reorganized 4.5 meters of shelf in just 0.3 hours. How many meters of shelf does the phantom organize per hour?',
        answer: 15,
        hint: '4.5 ÷ 0.3',
      }
    ],
    resolution: 'Sam bursts into tears and explains: "I just wanted to make the library better! The books were so hard to find, and I figured out a way to organize them so everyone could find what they need faster." Muffin gently explains that Sam isn\'t in trouble — in fact, Mrs. Chen is impressed! She invites Sam to become the school\'s first-ever Student Library Assistant. Sam beams with pride, and the "phantom" becomes the library\'s greatest hero. Muffin accepts a library card as his reward.',
    defeatMessage: 'The phantom vanished into the stacks before Muffin could identify them! But the clues are still there. Muffin takes a deep breath, sharpens his pencil, and opens the case file again...'
  },

  // ============================================================
  // CASE 3: The Golden Acorn Heist (Hard, 6 problems)
  // Decimal ÷ decimal, 2-decimal-place numbers, word problems
  // ============================================================
  {
    id: 'golden_acorn',
    title: 'The Golden Acorn Heist',
    difficulty: 'hard',
    description: 'The legendary Golden Acorn — the most valuable artifact in the Woodland Museum — has been stolen and replaced with a fake! Security cameras went dark for exactly 7 minutes. This is Muffin\'s biggest case yet.',
    backdrop: 'museum',
    problems: [
      {
        cluePrompt: 'Muffin arrives at the Woodland Museum, where the legendary Golden Acorn has been stolen overnight! The display case holds a fake — but it looks almost perfect. The museum\'s precision scale shows the fake weighs far less than the real gold artifact. Solve this to figure out what the fake is made of.',
        clueReveal: 'The fake is made of exactly 5 painted wood blocks — not solid gold. But it\'s an incredible replica. Whoever made this is a skilled artisan who had access to the original for measurements.',
        question: 'The fake acorn weighs 1.25 kg. It\'s made of identical painted wood blocks, each weighing 0.25 kg. How many blocks make up the fake?',
        answer: 5,
        hint: '1.25 ÷ 0.25',
      },
      {
        cluePrompt: 'Muffin reviews the visitor log. On the day of the heist, the museum had an unusual number of visitors. He needs to figure out how many security zone checks were missed during the 7-minute blackout.',
        clueReveal: 'Only three people were in the museum during the blackout: the security guard (Frank), a visiting art professor (Dr. Elm), and the museum\'s own art restorer (Hazel).',
        question: 'Each security zone takes 0.5 minutes to check. During the 7-minute blackout, how many zone checks were missed?',
        answer: 14,
        hint: '7 ÷ 0.5',
      },
      {
        cluePrompt: 'Muffin checks the security system. The cameras run on a backup battery that should have kept them running. He calculates how long the battery should have lasted to figure out if it was tampered with.',
        clueReveal: 'The backup battery was drained ON PURPOSE — it should have lasted 6 hours, but someone drained it beforehand. Only someone with access to the security room could do this.',
        question: 'The backup battery has a capacity of 4.8 kilowatt-hours and drains at 0.8 kilowatt-hours per hour. How many hours should the battery have lasted?',
        answer: 6,
        hint: '4.8 ÷ 0.8',
      },
      {
        cluePrompt: 'Muffin investigates the museum\'s recent expense reports. There are purchases of unusual art supplies — gold paint, wood carving tools, and precision measuring instruments.',
        clueReveal: 'The supplies were ordered by Hazel, the art restorer — and they perfectly match what you\'d need to create a replica Golden Acorn! But why would she do it?',
        question: 'Someone at the museum made 6 supply purchases totaling $13.50. How much was each purchase on average?',
        answer: 2.25,
        hint: '$13.50 ÷ 6',
      },
      {
        cluePrompt: 'Muffin discovers a hidden logbook in Hazel\'s workshop. It contains humidity readings for the Golden Acorn\'s display case over several months. Solve this to decode her notes.',
        clueReveal: 'Hazel\'s notes reveal the humidity has been rising 3 percentage points per month — dangerously fast! She filed reports begging the museum director to fix it, but was ignored. The Golden Acorn was being slowly damaged!',
        question: 'The humidity rose 7.5 percentage points over 2.5 months. How many percentage points did it rise per month?',
        answer: 3,
        hint: '7.5 ÷ 2.5',
      },
      {
        cluePrompt: 'Muffin confronts Hazel in her workshop. She leads him to a climate-controlled safe in the basement. The safe\'s combination is based on a temperature calculation. Solve this to crack the safe!',
        clueReveal: 'The safe opens to reveal... the REAL Golden Acorn, perfectly preserved in a temperature-controlled case that Hazel built herself!',
        question: 'The safe divides a 6-degree temperature range into zones of 0.75 degrees each. How many zones is the range divided into?',
        answer: 8,
        hint: '6 ÷ 0.75',
      }
    ],
    resolution: 'Hazel breaks down and confesses: "I wasn\'t stealing it — I was SAVING it! The humidity in that display case was destroying a 200-year-old artifact, and nobody would listen to me!" Muffin presents his full report to the museum director, who is shocked. The director immediately orders a new climate-controlled display case. Hazel is not fired — instead, she\'s promoted to Head of Conservation. The Golden Acorn is returned to its display, now properly protected. Muffin receives the museum\'s Medal of Honor — shaped like a tiny golden acorn.',
    defeatMessage: 'The trail went cold and the evidence was moved before Muffin could crack the case. But a great detective never gives up. Muffin polishes his magnifying glass and reopens the file...'
  },

  // ============================================================
  // CASE 4: The Poisoned Potion Master
  // Math focus: Powers of 10, metric conversions, intro to common denominators
  // ============================================================
  {
    id: 'poisoned_potion',
    title: 'The Case of the Poisoned Potion Master',
    difficulty: 'hard',
    description: 'Professor Elixworth, the realm\'s greatest potion maker, has been found unconscious in his lab. Three suspects, a locked lab, and magical measurements hold the key to saving him before the antidote window closes...',
    backdrop: 'potionlab',
    problems: [
      // Problem 1 — Crime scene: Powers of 10 (multiply, 10³)
      {
        cluePrompt: 'Muffin arrives at Professor Elixworth\'s potion laboratory. The old wizard lies on the stone floor, his robes splayed out behind him. The cauldron bubbles with a sickly green glow. A dosage logbook sits open on the counter — most of it is smudged, but Muffin can make out the original order quantity written in scientific notation.',
        clueReveal: 'The Nightshade Extract order was 6,300 milligrams — a dangerously large supply. Checking the current inventory: nearly all of it has been used. This was deliberate, and someone placed that order recently. Muffin underlines the number twice.',
        question: 'The logbook shows a recent order: "Nightshade Extract — 6.3 × 10<sup>3</sup> milligrams." What is 6.3 × 10<sup>3</sup> as a plain number?',
        answer: 6300,
        hint: '6.3 × 10<sup>3</sup>'
      },
      // Problem 2 — Professor's notes: Powers of 10 (divide, 10²)
      {
        cluePrompt: 'On the professor\'s desk Muffin finds a safety protocol pinned beside the workspace: maximum safe doses, lethal thresholds, and emergency antidote procedures. One line catches his eye — the lethal threshold for Nightshade Extract, expressed as a large number divided by a power of 10. Someone ignored this warning entirely.',
        clueReveal: 'The lethal threshold is just 63 milligrams per hour. The professor received far more than that. The poisoning was deliberate and precisely calculated — not a lab accident. Muffin writes "INTENTIONAL" in his notebook and adds three exclamation marks.',
        question: 'The safety note reads: "Lethal threshold = 6,300 ÷ 10<sup>2</sup> mg per hour." What is 6,300 ÷ 10<sup>2</sup>?',
        answer: 63,
        hint: '6,300 ÷ 10<sup>2</sup>'
      },
      // Problem 3 — Ingredient shelves: Metric conversion (mg → g)
      {
        cluePrompt: 'Muffin climbs a stepladder to inspect the ingredient shelves. Hundreds of jars line the walls in careful handwriting. One jar jumps out: "Nightshade Extract — HANDLE WITH EXTREME CARE." The label shows contents in milligrams, but the crime report tracks stolen amounts in grams. Muffin needs to convert to make the comparison.',
        clueReveal: 'Exactly 2.5 grams of Nightshade Extract are missing. That\'s a precise, calculated amount — not a clumsy spill. Whoever took this used a calibrated scale. This rules out a smash-and-grab. The thief had chemistry knowledge.',
        question: 'The Nightshade jar originally held 3,750 mg. It now holds 1,250 mg, so 2,500 mg were taken. How many <em>grams</em> is 2,500 mg? (1 g = 1,000 mg)',
        answer: 2.5
      },
      // Problem 4 — Storage closet: Metric conversion (g → mg, reverse direction)
      {
        cluePrompt: 'Behind the lab Muffin finds a storage closet with a freshly-picked lock. Inside, a small container of Starfire Crystal has been tipped over — crystals scattered across the shelf. Starfire Crystal is a rare binding agent with one documented use: making Nightshade Extract harder to detect. The label shows the amount in grams, but Muffin needs milligrams for the toxicology report.',
        clueReveal: '85 milligrams of Starfire Crystal were taken — just enough to mask the Nightshade in a drink. This rules out Vera, who is a beginning apprentice and wouldn\'t know about Starfire Crystal. Someone with serious potion knowledge did this.',
        question: 'The tipped container was labeled "0.085 g of Starfire Crystal." How many <em>milligrams</em> is 0.085 g? (1 g = 1,000 mg)',
        answer: 85
      },
      // Problem 5 — Delivery logbook: Metric conversion (kg → g)
      {
        cluePrompt: 'Muffin opens the delivery logbook on the professor\'s desk. The most recent entry is from Luna Starwell, the professor\'s regular courier. She delivered Moonstone Powder yesterday — an ingredient with no harmful properties, but her delivery record reveals something important about timing. The receipt uses kilograms; the lab inventory uses grams.',
        clueReveal: 'Luna delivered 750 grams of Moonstone Powder, but only 680 grams were entered into inventory. Seventy grams unaccounted for — and Moonstone Powder is harmless on its own, but it\'s also an excellent disguise for suspicious-colored liquids. Someone used it as camouflage.',
        question: 'Luna\'s delivery receipt shows she brought 0.75 kg of Moonstone Powder. How many <em>grams</em> is 0.75 kg? (1 kg = 1,000 g)',
        answer: 750
      },
      // Problem 6 — Interview Vera: Metric conversion (mL → L)
      {
        cluePrompt: 'Muffin interviews Vera Vex, the professor\'s apprentice. She\'s nervous but answers every question. She claims she spent the whole morning at her bench, measuring purified water for practice potions. Her workbench is indeed covered in labeled cylinders and beakers. Muffin checks her water log against the recipe she claims to have followed.',
        clueReveal: 'Vera used exactly 3.2 liters of water — a perfect match for the standard Healing Tonic recipe. Her alibi checks out. But as she talks, she mentions something useful: Barnaby Thornwick, the professor\'s rival, visited the lab the previous evening to drop off "a congratulatory gift."',
        question: 'Vera\'s workbench log shows she used 3,200 mL of purified water. How many <em>liters</em> is 3,200 mL? (1 L = 1,000 mL)',
        answer: 3.2
      },
      // Problem 7 — Interview Barnaby: Powers of 10 (multiply, 10³)
      {
        cluePrompt: 'Muffin visits Barnaby Thornwick\'s rival potion shop across town. The shop is darker and more cluttered than the professor\'s lab. Barnaby presents receipts to prove he was busy restocking — but when Muffin examines them closely, one order is staggering: a purchase of empty vials far beyond what any small shop would ever need.',
        clueReveal: 'Barnaby spent 350 gold coins on supplies — enough to stock a factory, not a one-room shop! When Muffin presses him on it, Barnaby stammers and his eyes flick to a locked cabinet behind the counter. "I was... planning to expand," he mutters unconvincingly.',
        question: 'Barnaby\'s receipt shows he ordered 10<sup>3</sup> empty vials at 0.35 gold coins each. What was his total cost?',
        answer: 350
      },
      // Problem 8 — Barnaby's back room: Powers of 10 (multiply, 10²)
      {
        cluePrompt: 'While Barnaby is distracted, Muffin spots a ledger on the back room shelf that isn\'t listed in any public record. It\'s a hidden inventory — stock that Barnaby never registered. The amounts are written in powers-of-10 shorthand, and one entry stands out immediately.',
        clueReveal: 'Barnaby is secretly hoarding 85 grams of Shadowmoss Tincture — a rare substance with exactly one documented use: as a carrier agent in Nightshade Extract poisonings, making the poison absorb faster. Combined with Starfire Crystal to mask it. This is no coincidence. Muffin photographs the ledger.',
        question: 'Barnaby\'s hidden ledger lists "10<sup>2</sup> bottles × 0.85 g each" of Shadowmoss Tincture. How many total grams does he have?',
        answer: 85,
        hint: '10<sup>2</sup> × 0.85'
      },
      // Problem 9 — Interview Luna: Multi-step metric (km + m → km)
      {
        cluePrompt: 'Muffin tracks down Luna Starwell at the courier depot. She\'s forthcoming and honest — no signs of deception. She hands over her complete route log from the day of the poisoning. Muffin needs to verify the total distance to confirm whether she had time to detour to the lab during the critical window.',
        clueReveal: 'Luna\'s route was exactly 4.3 km, and the GPS timestamps prove she was at the harbor warehouse during the entire poisoning window. Her alibi is airtight. But she adds one crucial detail: Barnaby specifically asked her to deliver a "congratulatory gift potion" to the professor. She had absolutely no idea what was inside.',
        question: 'Luna\'s route: harbor to market (2.5 km), then market to the lab (1,800 m further). What was her total route in <em>kilometers</em>? (1 km = 1,000 m)',
        answer: 4.3
      },
      // Problem 10 — Professor's study: Common denominators (find LCD)
      {
        cluePrompt: 'In the professor\'s private study, Muffin discovers an ancient grimoire hidden behind a false panel in the bookcase. Inside: the recipe for a Universal Antidote. Exactly what\'s needed! But the recipe uses fractions with different denominators — 1/3 of one ingredient and 1/4 of another. To measure them precisely, Muffin first needs to find a common denominator.',
        clueReveal: 'The least common denominator of 3 and 4 is 12! With that, Muffin can convert both fractions to twelfths and measure precisely. He starts laying out the ingredients. The antidote is almost ready — he just needs to do the final measurements.',
        question: 'The antidote calls for 1/3 vial of Starlight Essence and 1/4 vial of Dragon Tear. To add these fractions, Muffin needs a common denominator. What is the <em>least common denominator</em> of 3 and 4?',
        answer: 12,
        hint: 'LCD of 3 and 4'
      },
      // Problem 11 — Mixing the antidote: Apply LCD to add fractions
      {
        cluePrompt: 'With the common denominator found, Muffin converts both fractions: 1/3 becomes 4/12, and 1/4 becomes 3/12. Now he can add them to find the exact total amount of liquid the antidote requires. He must get this right — too little won\'t work, and too much could cause new problems.',
        clueReveal: 'Exactly 7/12 of a vial — Muffin measures it out with surgical precision. The liquid shimmers gold as the two ingredients combine. He holds it up to the candlelight: it\'s perfect. Now he just needs to confirm the exact poison to finish the calibration.',
        question: 'Muffin converts the fractions: 1/3 = 4/12, and 1/4 = 3/12. What is <em>4/12 + 3/12</em>? Write your answer as a fraction.',
        answer: '7/12',
        hint: '4/12 + 3/12'
      },
      // Problem 12 — Potion analysis: Metric conversion (g → mg)
      {
        cluePrompt: 'Muffin brings a sample from Barnaby\'s "gift potion" to the analysis room. The professor\'s precision equipment measures Nightshade concentration in grams per dose. But the dosage logbook records everything in milligrams. Muffin must convert to make the final comparison.',
        clueReveal: 'The gift potion contains exactly 45 milligrams of Nightshade per dose, and there were 10 doses in the bottle. Total: 450 mg — the exact amount the professor received. And where did 450 mg of Nightshade come from? The jar on the shelf that was missing 2,500 mg, combined with multiple doses. The math is airtight.',
        question: 'The analysis reads: "Nightshade concentration: 0.045 g per dose." How many <em>milligrams</em> is 0.045 g? (1 g = 1,000 mg)',
        answer: 45
      },
      // Problem 13 — The confrontation: Decimal division reveals the full scale
      {
        cluePrompt: 'Muffin confronts Barnaby with everything: the Nightshade order, the Starfire Crystal, the Shadowmoss, Luna\'s testimony, and the gift potion analysis. Barnaby\'s face drains of color. "You can\'t prove my plan was bigger than one potion!" he snarls. But Muffin has one final calculation — the number that reveals just how much poison Barnaby had truly been stockpiling.',
        clueReveal: 'One hundred and seventy doses! Barnaby wasn\'t just after the professor — he was stockpiling enough Shadowmoss to poison every rival alchemist in the realm. The math doesn\'t just convict him of attempted murder; it exposes a conspiracy. Barnaby slumps into his chair. "He was going to publish a formula that would make my potions obsolete," he whispers. "I panicked. I never meant for it to go this far..."',
        question: 'Barnaby hoarded <em>85</em> grams of Shadowmoss Tincture (Clue 8), and each dose of his poison requires <em>0.5</em> grams of it. How many <em>total doses</em> could Barnaby have made if he had not been stopped?',
        answer: 170
      }
    ],
    resolution: 'Barnaby Thornwick confesses. Jealous of the professor\'s genius, he secretly laced a "congratulatory gift potion" with precise doses of Nightshade Extract — masked by Starfire Crystal and carried by Shadowmoss Tincture — and had Luna deliver it unknowingly. Muffin administers the Universal Antidote, and Professor Elixworth\'s eyes flutter open. "My lab..." he croaks. "Is my cauldron still running?" Vera rushes to his side, laughing through her tears. The professor squeezes her hand. "You kept everything together, Vera. Full partnership, starting today." The city guard leads Barnaby away. Luna is cleared of all charges. And Muffin? He tucks his magnifying glass into his detective hat, accepts a warm cup of chamomile tea from Vera, and heads home for a very well-deserved nap.',
    defeatMessage: 'The antidote window is closing fast, and Muffin can\'t crack the clues in time! But Professor Elixworth is a tough old wizard — he\'ll hold on a little longer. Muffin takes a deep breath, straightens his detective hat, and starts the investigation from the top. No potion master goes unsaved on his watch.'
  },

  // ============================================================
  // CASE 5: The Case of the Crooked Coin (Hard, 11 problems)
  // Focus: place value, estimation, fraction↔decimal conversion,
  //        decimal expanded form, regrouping decimals,
  //        whole÷whole with decimal quotients, decimal × whole
  // ============================================================
  {
    id: 'crooked_coin',
    title: 'The Case of the Crooked Coin',
    difficulty: 'hard',
    description: 'The Royal Mint of Goldhaven is short hundreds of gold coins — yet the ledger balances perfectly. Someone has been skimming gold by shifting decimal points and hiding entries in ciphers. Muffin must trace the forger before the crown holds the Mint Master accountable.',
    backdrop: 'mint',
    problems: [
      // Problem 1 — Place value: value of 4 in 45.72 (tens place)
      {
        cluePrompt: 'Muffin arrives at the Royal Mint of Goldhaven. The Mint Master paces the vault floor, gold coins scattered across a stone counter. "The casting mold is set for 45.72-gram coins, but yesterday\'s batch weighed in at only 4.572 grams each — and the ledger still shows them as full weight! Somebody shifted the decimal point, Detective." Muffin picks up a coin, studies the stamp, and looks hard at the 4 — the digit that moved the farthest.',
        clueReveal: 'In the original 45.72-gram weight, the 4 stood for a full 40 grams. In the altered 4.572 weight, that same 4 stands for just 4 grams — a tenfold drop, carried out with a single decimal point. No clumsy thief would know to shift it so precisely. The forger understands place value.',
        question: 'The casting mold was set for <em>45.72</em>-gram coins. What is the <em>value</em> of the <em>4</em> in <em>45.72</em>?',
        answer: 40,
        hint: 'Value of the 4 in 45.72'
      },

      // Problem 2 — Estimate multiply
      {
        cluePrompt: 'The Mint Master hands Muffin a payment receipt. "The Appraiser logged 3.8 pounds of gold at 4.9 ducats per pound. He wrote the total as 186.2 ducats." Muffin doesn\'t need exact math — a quick estimate should tell him whether that number is anywhere close to honest.',
        clueReveal: 'A fair total should land near 20 ducats — not 186.2! The recorded payment is inflated nearly tenfold. Someone pocketed the difference, and they did it counting on nobody bothering to estimate. Muffin circles the entry in red ink.',
        question: 'Estimate <em>3.8 × 4.9</em> by rounding each factor to the nearest whole number. What is your estimate?',
        answer: 20,
        hint: '3.8 × 4.9 (round each factor)'
      },

      // Problem 3 — Fraction addition (1/2 + 1/4)
      {
        cluePrompt: 'Tucked inside the day\'s receipts, Muffin finds a handwritten slip in unfamiliar script itemizing two separate payments: <em>1/2 ounce of gold dust to the courier</em>, plus <em>1/4 ounce to the guard captain</em>. The Mint\'s official ledger records only a single <em>combined</em> entry, in decimals. To find the matching entry, Muffin must add the two fractions.',
        clueReveal: 'Three-quarters of an ounce total — and as a decimal, 3/4 = 0.75, which matches a 0.75-ounce payment logged to a name Muffin doesn\'t recognize. The receipt and the ledger line up only if you can add unlike fractions and switch between fractions and decimals. The forger was counting on someone missing that bridge.',
        question: 'Add <em>1/2 + 1/4</em>. Give your answer as a fraction in simplest form.',
        answer: '3/4',
        hint: '1/2 + 1/4'
      },

      // Problem 4 — Decimal expanded form
      {
        cluePrompt: 'Hidden inside the ledger\'s binding Muffin finds a folded slip of paper — a cipher note, written only in place-value pieces. The Mint\'s trained workers use expanded form for private memos. To read the amount, Muffin has to rebuild the decimal.',
        clueReveal: '3.257 ounces — and that\'s the exact weight of a small crystal vial the vault guard saw in the Appraiser\'s coat pocket yesterday. Either he dropped this note himself, or somebody is trying very hard to frame him.',
        question: 'Rewrite <em>3 + 2/10 + 5/100 + 7/1000</em> as a single decimal number.',
        answer: 3.257,
        hint: '3 + 2/10 + 5/100 + 7/1000'
      },

      // Problem 5 — Regrouping decimals (11 tenths)
      {
        cluePrompt: 'The courier\'s original receipt shows yesterday\'s intake as 2.13 pounds — but the receipt doesn\'t write the "2" as two wholes. The Mint\'s couriers always regroup a whole into tenths so their bookkeeping is harder to fake. The form reads "1 + ___ tenths + 3 hundredths" — and the tampered ledger got this regrouping wrong, which is how Muffin spots the forgery.',
        clueReveal: 'Eleven tenths! Trading one whole for ten tenths gives 10 tenths, plus the 1 tenth already there, makes 11. The courier\'s form was correct. But the tampered ledger wrote "3 tenths" instead of 11 — a huge number difference only a forger rushing to cover their tracks would make. Muffin scrawls "TAMPERED" in the margin.',
        question: 'The courier\'s form reads <em>2.13 pounds = 1 + ___ tenths + 3 hundredths</em>. How many <em>tenths</em> go in the blank?',
        answer: 11,
        hint: '2.13 = 1 + ? tenths + 3 hundredths'
      },

      // Problem 6 — Fraction subtraction (3/4 − 1/2)
      {
        cluePrompt: 'Muffin interviews Master Scribe Cora, who swears the ledger was locked and spotless when she left last night. She unlocks the official purity log and shows him today\'s entry: the daily reserve starts at <em>3/4</em> ounce of Nightshade for official tests, and the Appraiser signed out <em>1/2</em> ounce earlier today. The vial cabinet should still have the remainder — but Cora\'s hand shakes as she reaches for the key.',
        clueReveal: 'One-quarter ounce should be left in the vial cabinet. But when Cora unlocks it, the cabinet is <em>empty</em>. That missing 1/4 ounce was siphoned directly by the Appraiser, who counted on no one doing the subtraction. Cora is cleared — she never knew there was anything to check.',
        question: 'The purity reserve starts at <em>3/4</em> ounce. The Appraiser signed out <em>1/2</em> ounce. How much <em>should</em> remain? Calculate <em>3/4 − 1/2</em> and give your answer as a fraction in simplest form.',
        answer: '1/4',
        hint: '3/4 − 1/2'
      },

      // Problem 7 — Whole ÷ whole with decimal quotient
      {
        cluePrompt: 'Muffin counts the diversions from the memo: 78 gold coins siphoned off, split evenly across 12 "test batches." He needs to know exactly how much gold was lifted per batch — and he has a hunch the answer won\'t be a whole number of coins.',
        clueReveal: 'Exactly 6.5 coins per batch — a decimal, not a whole. That means the thief melted down coins into precise half-coin pieces. This was methodical, patient work. Only someone trained with precision scales could do it — and the Mint has only one such worker.',
        question: 'A stash of <em>78</em> gold coins is divided equally across <em>12</em> test batches. How many coins per batch? (Give your answer as a decimal.)',
        answer: 6.5,
        hint: '78 ÷ 12'
      },

      // Problem 8 — Estimate divide
      {
        cluePrompt: 'The courier\'s delivery log claims 148.6 sacks of gold were brought to the Mint over 28.9 weeks. Before Muffin checks the exact rate, he wants a quick sanity check against the Mint\'s own weekly intake books.',
        clueReveal: 'About 5 sacks per week on the courier\'s log — but the Mint\'s intake book shows 12 sacks arriving! Seven extra sacks a week are slipping into the Mint off-book. Muffin cross-references the intake slips: every one of those extra deliveries was signed in by the Appraiser personally. Ambrose isn\'t just skimming — he\'s been padding the intake to grow his stash in plain sight.',
        question: 'Estimate <em>148.6 ÷ 28.9</em> by rounding each number to a friendly value. What is your estimate?',
        answer: 5,
        hint: '148.6 ÷ 28.9 (round each number)'
      },

      // Problem 9 — Place value (value of 7 in a large number)
      {
        cluePrompt: 'Muffin finds the young apprentice, Pip, hiding behind the vault door, pale as a ghost. Pip whispers: "The year-end ledger says 63,472.85 ounces on the books, Inspector. But when I weighed the vault this morning, we\'re short exactly what the <em>7</em> stands for!" Muffin nods slowly. Pip is no forger — he\'s the one who noticed.',
        clueReveal: 'The 7 represents 70 ounces — and yes, the vault is missing <em>exactly</em> 70 ounces. The ledger still "balances" because the 70 was never erased on paper. It was stolen in physical gold while the numbers stayed in place. A place-value trick nobody thought to check.',
        question: 'In the year-end total <em>63,472.85</em> ounces, what is the <em>value</em> of the <em>7</em>?',
        answer: 70,
        hint: 'Value of the 7 in 63,472.85'
      },

      // Problem 10 — Fraction → decimal (3/8)
      {
        cluePrompt: 'Pip reaches into his apron and unfolds a torn scrap of parchment. "I pulled this from the Appraiser\'s coat yesterday, Inspector. I\'ve been too scared to say anything." The note reads: <em>"Divert 3/8 of daily intake to east cellar."</em> Muffin needs the decimal to compare it against the Mint\'s decimal-only intake book.',
        clueReveal: '0.375 — and the Mint\'s daily intake log shows a mysterious recurring deduction of exactly 0.375 siphoned off every single day for the past month. Ambrose has been skimming three-eighths of every shipment, hidden in plain sight by a fraction-to-decimal switch. One calculation to go, and the case is airtight.',
        question: 'Convert <em>3/8</em> to a decimal.',
        answer: 0.375,
        hint: '3/8'
      },

      // Problem 11 — Final proof: 3/8 × 1,200 (fraction × whole)
      {
        cluePrompt: 'The Mint has received <em>1,200</em> ounces of gold over the past month. From Clue 10, Muffin knows Ambrose siphoned exactly <em>3/8</em> of every shipment. With the fraction from the torn note, he can calculate the weight of the secret stash <em>exactly</em>. Whatever number he gets should match the weight of the mystery crate locked in Ambrose\'s east-cellar workshop.',
        clueReveal: 'Exactly 450 ounces. Muffin and the royal guards force open the east cellar — and there, neatly stacked and labeled "Personal — Do Not Open," sits a crate. On the Mint\'s own scales it weighs <em>precisely 450 ounces</em>. The math is airtight. Place value, estimation, fraction operations, all pointing to the same pile of stolen gold. Appraiser Ambrose is arrested on the spot.',
        question: 'Calculate <em>3/8 × 1,200</em>.',
        answer: 450,
        hint: '3/8 × 1,200'
      }
    ],
    resolution: 'Appraiser Ambrose confesses with a long sigh. For months he\'d shifted decimal points on the Royal Scales, hidden diversions inside fraction/decimal cipher switches, and padded the ledger with expanded-form codes only a Mint worker could read. The crown clears the Mint Master of all wrongdoing and reinstates Master Scribe Cora with a formal apology. Apprentice Pip is promoted to Junior Appraiser for his sharp eye. Muffin politely declines the gold reward but does accept a single warm honey-cake from the Mint\'s kitchen. As he ambles home, magnifying glass tucked into his detective hat, he mutters to himself, "You can shift a decimal point, but the math always tells the truth."',
    defeatMessage: 'The ledger\'s tricks are slippery tonight, and Muffin can\'t pin down the forger in time! But the crooked coin is still sitting in Ambrose\'s east cellar, and the numbers haven\'t changed. Muffin straightens his hat, polishes his magnifying glass, and reopens the case file. A good detective never lets a decimal point fool him twice.'
  },

  // ============================================================
  // CASE 6: The Beast of Hollowmere Wood (Hard, 25 problems, 4 chapters)
  // Focus: Fraction operations (+, -, ×, ÷), missing fractions, mixed
  //        numbers with regrouping, common denominators, three-fraction
  //        addition/subtraction, work problems, time + metric conversion.
  //        Omits decimal↔fraction conversion entirely.
  // Style: Late-1880s coastal-village atmosphere. Hound-of-Baskervilles
  //        homage — a "werewolf" stalking a remote village turns out
  //        to be a fortune-driven killer using a trained wolfhound.
  // ============================================================
  {
    id: 'beast_hollowmere',
    title: 'The Beast of Hollowmere Wood',
    difficulty: 'hard',
    description: 'A werewolf is said to stalk the ancient forest at Hollowmere — sheep killed by the dozen, woodsmen mauled, a young girl missing in the trees. The next full moon is four nights away. Muffin must find the truth, and the missing child, before whatever\'s out there strikes again.',
    backdrop: 'forest',
    intro: {
      title: 'A Letter from the Coast',
      illustration: 'beast_intro',
      text: '<p>It is late October at Muffin\'s Mystery Agency in the city — rain on the windows, a candle burning low. Muffin has just finished filing his last case report when a hard knock rattles the front door.</p>' +
            '<p>The man on the step is soaked to the bone. He says his name is <em>Constable Gareth Stone</em>, and he has ridden through the rain from a coastal village called <em>Hollowmere</em>, a half-day up the post-road. He hands Muffin a sodden letter. His hand is shaking.</p>' +
            '<p class="intro-letter">"Detective — my daughter Petra has been missing in the wood for <em>two days</em>. Two woodsmen have been mauled, one of them killed. Our villagers say a <em>werewolf</em> has woken in the old forest. The next full moon is <em>four nights</em> away. If Petra is not found before then, I do not believe she will be found at all. Please.<br><span class="intro-letter-sig">— Mira Vell, healer of Hollowmere</span>"</p>' +
            '<p>Muffin reads the letter twice. He has heard the old stories of the Hollowmere wood — every detective has. The villagers there have told them for two centuries, and Muffin has always thought them tavern-tales. But Mira Vell\'s hand is steady, and her words are not the words of a woman repeating gossip.</p>' +
            '<p>He folds the letter, snuffs his candle, and tucks his magnifying glass into the band of his deerstalker hat.</p>' +
            '<p>"Saddle the post-coach, Constable. We ride at first light."</p>' +
            '<p>By dusk the next day Muffin steps off the coach at Hollowmere. The fog is already thick from the trees, and the lanterns at the inn door burn lower than he expected.</p>' +
            '<p class="intro-tagline">The case begins now.</p>',
      buttonLabel: 'Travel to Hollowmere →'
    },
    chapters: [
      { title: 'Night One — Arrival in Hollowmere', length: 6 },
      { title: 'Night Two — The Investigation', length: 7 },
      { title: 'Night Three — The Vanishing', length: 6 },
      { title: 'Night Four — The Revelation', length: 6 }
    ],
    problems: [
      // ============================================================
      // NIGHT ONE — ARRIVAL IN HOLLOWMERE
      // ============================================================

      // Problem 1 — Time conversion: hours → minutes
      {
        cluePrompt: 'Inside the inn, an old grey-bearded fox is waiting by the fire — <em>Howell Greaves</em>, the village elder, with a face like cracked stone and the look of a man who has not slept in a week. "Detective. They say a werewolf has woken in our old forest, and I will tell you plainly: I have sat watch every night for a fortnight, and the Beast comes within an hour and a half of moonrise, every single time. Not once early. Not once late. Whatever you are about to face, Detective — please — I need to know the precise window in minutes."',
        clueReveal: 'Ninety minutes — an hour and a half — between moonrise and the first kill, every single attack night. Whatever this thing is, it follows the moon as faithfully as the old stories say a werewolf must. Muffin scribbles "1:30 from moonrise" in his notebook and underlines it. The wood itself seems to lean closer to the village in the silence afterward.',
        question: 'The Beast strikes within <em>1½ hours</em> of moonrise. How many <em>minutes</em> is 1½ hours?',
        answer: 90
      },

      // Problem 2 — Fraction +/− with like denominators
      {
        cluePrompt: 'Howell pulls a tally sheet from his coat. "Two farms hit so far. The Tannings lost <em>3/8</em> of their flock on Monday. The Pell farm lost <em>2/8</em> on Tuesday. And both nights, Detective, a shepherd swears he saw eyes burning like coals through the trees — yellow-gold, the size of a man\'s fists. No wolf alive has eyes like that."',
        clueReveal: '5/8 of one whole flock lost in two nights — to a creature with eyes as big as a man\'s fists. Muffin has seen wolves at distance, and they do not have such eyes. Sheep do not stampede in straight lines toward fences from an ordinary wolf, either. Whatever broke the Tanning flock\'s line is something the sheep had never seen before. Muffin underlines "yellow-gold eyes" in his notebook.',
        question: 'The Tannings lost <em>3/8</em> of a flock and the Pells lost <em>2/8</em>. What is <em>3/8 + 2/8</em>? Give your answer as a fraction.',
        answer: '5/8',
        hint: '3/8 + 2/8'
      },

      // Problem 3 — Common denominator (LCD)
      {
        cluePrompt: 'Mira Vell, the village healer and mother of the missing girl Petra, opens the door of her herb-cottage with red eyes. Her hands shake too badly to mix herbs tonight. "I cannot sleep, Detective. I cannot eat. But the rest of the village comes to me with cuts and broken bones and they need their medicines. For my own calming tincture, the recipe asks for <em>1/3 cup</em> of chamomile and <em>1/4 cup</em> of valerian. Just give me the common denominator. After that I can manage."',
        clueReveal: '12 — the smallest number both 3 and 4 divide into. Mira whispers her thanks and presses Muffin\'s paw. As he turns to leave, his eye runs across her shelf of carefully labelled jars — chamomile, valerian, foxglove, comfrey — and one labelled in handwriting that does not match the others: "phosphor moss." He has never heard of it in any healing book. He files the detail away without asking.',
        question: 'Mira needs to add <em>1/3</em> and <em>1/4</em>. What is the <em>least common denominator</em> of 3 and 4?',
        answer: 12,
        hint: 'LCD of 3 and 4'
      },

      // Problem 4 — Three-fraction addition with like denominators
      {
        cluePrompt: 'Constable Gareth Stone shares his ledger of livestock losses across the whole village. "Night one we lost <em>1/6</em> of all livestock, night two <em>2/6</em>, night three another <em>2/6</em>. And — Detective, listen to this — at the third site one of my men SAW it. Came from behind a thorn-tree, on its <em>hind legs</em>. Hide silver-white in the moonlight. He fired his musket and missed. He has not slept since."',
        clueReveal: '5/6 of every animal in Hollowmere — gone in three nights. And one of Stone\'s own men, sober and trained, swears he watched the thing walk like a man, hide glowing white. Muffin has read of European werewolf accounts that fit this exact description. He does not yet know what to believe. He only knows whatever lurks in that wood is real enough to the people who live with it.',
        question: 'Add the three nightly losses: <em>1/6 + 2/6 + 2/6</em>. Give your answer as a fraction.',
        answer: '5/6',
        hint: '1/6 + 2/6 + 2/6'
      },

      // Problem 5 — Time conversion: days → hours
      {
        cluePrompt: 'In Mira\'s cottage, Muffin notices a tally-counter on the wall — the kind a worried mother keeps. "Petra has been missing for <em>2½ days</em>," Mira whispers. "The last anyone saw her, she was at the well by the wood-edge, talking to Tom Reedy — the Marrowed Man, the survivor of the second attack. He was attacked the very next dusk. He has not spoken a word since. Detective, I need to know the exact hours my Petra has been out there."',
        clueReveal: '60 hours. Two and a half days — sixty cold, dark hours — and Petra has been alone in that wood. Muffin\'s grip tightens on his magnifying glass. Time is no longer abstract. He also notes: Petra spoke with Tom Reedy moments before Tom himself was attacked. Did Tom warn her of something? Did she warn HIM? Or was she silenced for what they both knew?',
        question: 'Petra has been missing for <em>2½ days</em>. How many <em>hours</em> is 2½ days? (1 day = 24 hours)',
        answer: 60
      },

      // Problem 6 — Fraction × whole
      {
        cluePrompt: 'Outside the inn, Muffin counts the closed shutters. "Of the 24 households in Hollowmere," Howell says quietly, "5/8 refuse to leave their homes after sundown. And the rest — Detective, you should hear what they whisper. They blame <em>Goody Nye</em>, the hermit at the wood\'s edge. \'Wolf-talker,\' they call her. Some say she is the witch who woke the Beast from the old forest. The whole village is one bad night from going up there with torches."',
        clueReveal: 'Fifteen households shuttered in fear, and the remaining nine all pointing at one woman. Goody Nye — the eccentric hermit who has lived alone for thirty years, who collects strange forest plants, who is said to whisper to wolves on bright nights. Muffin makes a note: visit Goody Nye. He cannot yet tell whether she is a victim of village paranoia, or something far darker.',
        question: 'Of <em>24</em> households, <em>5/8</em> refuse to leave their homes after dark. How many households is that?',
        answer: 15
      },

      // ============================================================
      // NIGHT TWO — THE INVESTIGATION
      // ============================================================

      // Problem 7 — Fraction +/− with unlike denominators
      {
        cluePrompt: 'At dawn Muffin walks the perimeter of the wood with Constable Stone. The first attack site is <em>1/3 mile</em> due north of the village square; the second is <em>1/4 mile</em> due east. Stone marks them on a folded map. "Most peculiar of all, Detective — the wood-tract just south, closest to <em>Wendell Skye\'s</em> gamekeeper hut, has not had a single attack. Yet Wendell patrols the whole forest at night. Why is HIS quarter spared?"',
        clueReveal: '7/12 of a mile of Beast-range to the north and east — but conspicuously NONE near the gamekeeper\'s hut to the south. That tight pattern fits a creature on foot. It also fits a person who knows where to AVOID. Wendell Skye knows the wood better than anyone. Muffin\'s pencil hovers over Wendell\'s name on the suspect list.',
        question: 'Add the distances to the two attack sites: <em>1/3 + 1/4</em>. Give your answer as a fraction.',
        answer: '7/12',
        hint: '1/3 + 1/4'
      },

      // Problem 8 — Mixed-number subtraction with regrouping
      {
        cluePrompt: 'A shepherd places the most recent kill <em>3¼ miles</em> deep into the wood, along the old logging trail. Muffin and Stone have already covered <em>1⅔ miles</em> by midmorning. As they walk, Stone rolls up his sleeve. Three pale scars run from elbow to wrist. "I was clawed when I was sixteen, Detective. By a forest wolf, in this same wood. Some of the lads say a wolf\'s bite leaves a mark on your blood for life. I don\'t believe it. But on bad nights I wonder."',
        clueReveal: '1 and 7/12 miles to go through the trees — and the man Muffin has been walking beside, the man he has been TRUSTING, is himself a wolf-survivor twenty years gone. The villagers\' old stories say a wolf-bite "marks" a person. If there is even a grain of truth to it — and Muffin is in no hurry to dismiss old stories tonight — then Stone, too, must go on the suspect list. Muffin walks a little further behind him.',
        question: 'The kill is <em>3¼</em> miles in; they have walked <em>1⅔</em>. How far remains? (Give your answer as a mixed number, e.g. <em>1 5/12</em>.)',
        answer: '19/12'
      },

      // Problem 9 — Solve for missing fraction
      {
        cluePrompt: 'Inside the cabin of <em>Tom Reedy, the Marrowed Man</em> — the silent, scarred survivor of the second attack — Tom sketches his flight on a slate. He fled <em>5/6 mile</em> total before collapsing. <em>1/3 mile</em> of that was BEFORE the Beast struck. Muffin needs to know how far Tom ran AFTER. Tom\'s hand is steady. He underlines a single word at the bottom of the slate: "PAINT."',
        clueReveal: '1/2 mile after the attack — wounded, in the dark, terrified. That is the desperation of a man who saw something he could not believe. As for "PAINT"? Muffin has no idea what Tom means. He suspects Tom himself does not. Or — Muffin\'s eyes narrow — Tom knows EXACTLY what it means and is too afraid of the wood to write any more. Tom is now on Muffin\'s suspect list, alongside Goody Nye, Stone, and Wendell.',
        question: 'The Marrowed Man ran <em>5/6 mile</em> total. <em>1/3 mile</em> was before the attack. How far did he run <em>after</em>? Solve <em>1/3 + ? = 5/6</em>.',
        answer: '1/2',
        hint: '5/6 − 1/3'
      },

      // Problem 10 — Metric conversion: kg → g
      {
        cluePrompt: 'At the second attack site, Muffin presses his paw into a perfect claw imprint sunk deep in the mud. He weighs the soil load: the print took <em>0.6 kg</em> of pressure to form. Stone says the largest forest wolf he has ever caught left an imprint of only <em>350 g</em>. Muffin needs both numbers in the same units before he can draw any conclusion.',
        clueReveal: '600 grams of pressure — nearly <em>twice</em> the largest forest wolf on record. Two possibilities present themselves to Muffin\'s mind, and at this moment he cannot tell them apart. EITHER something walks this wood that is not of nature… OR something natural has been DRAGGED, weighted by human hands, to leave a deceptive print. The mud holds its silence either way.',
        question: 'The Beast\'s claw imprint took <em>0.6 kg</em> of pressure. How many <em>grams</em> is 0.6 kg? (1 kg = 1,000 g)',
        answer: 600
      },

      // Problem 11 — Three-fraction addition (unlike denominators, sums to 1)
      {
        cluePrompt: 'Back at the inn that evening, Muffin spreads three ledgers on his table — one for each adult Howell has reluctantly named for him. Wendell Skye\'s gamekeeper expenses. Goody Nye\'s hermit register, in spidery hand. And the visitors\' page, with one tidy entry from a man passing through: <em>Salvian Crooke</em>, "naturalist," who arrived a week before the first attack. Crooke\'s line reads: <em>1/2</em> for lamp oil, <em>1/3</em> for ink, <em>1/6</em> for "powder." Muffin needs the total before the math will mean anything.',
        clueReveal: 'Exactly 1 — Crooke\'s entire visit accounted for, tidily and suspiciously. No room and board, no horse fodder, no food. Wendell\'s and Goody\'s ledgers both have plenty of all three. Crooke is the odd one out — but odd is not yet guilty. He may simply be paying for those things off-book. Muffin circles "powder" and adds Crooke\'s name to the list. Five suspects now: Wendell, Goody, Tom, Stone, Crooke.',
        question: 'Crooke\'s ledger entry: <em>1/2 + 1/3 + 1/6</em>. Give your total as a fraction (or whole number if it simplifies).',
        answer: 1,
        hint: '1/2 + 1/3 + 1/6'
      },

      // Problem 12 — Mixed-number subtraction (time math)
      {
        cluePrompt: 'Howell tells Muffin the village watch begins at <em>6¼</em> hours past noon (sundown) and ends at <em>10¾</em> hours past noon (the deepest dark before dawn-watch). The Beast hunts only inside that window. Muffin needs the duration. Howell adds, low: "On every attack night, your suspects each say they were home alone. Wendell in his hut. Goody in her clearing. Tom in his cabin. Stone in his quarters. Crooke in his room at the inn — lamp lit, but no one heard him moving. Any of them could have slipped out a back stair."',
        clueReveal: '4½ hours of darkness — the killing window. Five suspects, five uncorroborated alibis, all of them inside that window. The math has narrowed nothing. The wood has narrowed nothing. Muffin folds the watch sheet into his notebook and stares at the five names. Tonight one of them is the Beast.',
        question: 'The night watch runs from <em>6¼</em> hours past noon to <em>10¾</em> hours past noon. How many <em>hours</em> is that? (Give as a mixed number or fraction.)',
        answer: '9/2'
      },

      // Problem 13 — Solve for missing fraction (gamekeeper alibi)
      {
        cluePrompt: 'In the morning Muffin finds Wendell Skye himself waiting at the inn — the gentle giant of a gamekeeper, hands clasped, head bowed. He hands over his patrol log without being asked. Total patrolled: <em>5/6 mile</em>. Accounted for: <em>2/3 mile</em>. The gap is plain. Wendell looks at the floor. "I sat by the brook a while, sir. I wasn\'t looking for a wolf. I was just… tired."',
        clueReveal: '1/6 mile unaccounted for — exactly as Wendell admits, and the brook lies in the SOUTHERN tract of the wood, the opposite direction from any attack site. There is no path from Wendell\'s brook to any kill site that fits 4½ hours of darkness AND a six-foot-long claw print. The math clears him. Muffin gently crosses Wendell off the list. Four suspects remain.',
        question: 'Wendell patrolled <em>5/6 mile</em>; <em>2/3 mile</em> is logged. Solve <em>2/3 + ? = 5/6</em>. (Give your answer as a fraction.)',
        answer: '1/6',
        hint: '5/6 − 2/3'
      },

      // ============================================================
      // NIGHT THREE — THE VANISHING
      // ============================================================

      // Problem 14 — Fraction × whole (time pressure)
      {
        cluePrompt: 'Tonight the moon is hidden behind cloud — a 30-minute "moonless gap" in which Muffin can creep into the wood without being seen by whatever stalks it. Howell says the cloud will hold for only <em>4/5</em> of that window before it breaks. Muffin needs the safe minutes. He goes in alone — Stone is too injured an old hand to risk the dark, and any of the four suspects could be following.',
        clueReveal: '24 minutes — and they\'ll have to count. Muffin lights a shielded lantern, ties his bootlaces tight, and slips into the trees. Behind him, Stone closes the inn door and snuffs every village lamp. Whatever lurks in this wood, Muffin will face it without backup tonight.',
        question: 'Of the 30-minute moonless gap, <em>4/5</em> is safe to move in. How many minutes?',
        answer: 24
      },

      // Problem 15 — Fraction +/− unlike denominators (paw-print fork)
      {
        cluePrompt: 'Deep in the wood, Muffin finds a fork in the trail. Paw prints lead off both ways. The west branch runs <em>1/4 mile</em> — straight toward Goody Nye\'s clearing. The southwest branch runs <em>5/12 mile</em> in a direction Muffin doesn\'t recognize, away from any home he knows of. He needs the combined branched length.',
        clueReveal: '8/12, or 2/3 of a mile of branched trail. The Beast has been splitting its tracks — perhaps to confuse pursuit, perhaps for reasons no man can fathom. The west branch leads straight to the witch\'s clearing. Muffin chooses the southwest branch instead, on a hunch. A branch creaks behind him. He does not turn around.',
        question: 'Two trail branches: <em>1/4 mile</em> and <em>5/12 mile</em>. Add them: <em>1/4 + 5/12</em>. (Give as a simplified fraction.)',
        answer: '2/3',
        hint: '1/4 + 5/12'
      },

      // Problem 16 — Three-fraction subtraction (THE PIVOT)
      {
        cluePrompt: 'On the southwest branch Muffin discovers a hollow stump containing a leather notebook locked with a brass clasp. He pries it open. A page of accounts: total budget <em>7/8</em> of "the inheritance share," minus <em>1/4</em> for "supplies," minus <em>1/3</em> for "bribes." Muffin needs to know what remains — what the schemer plans to keep.',
        clueReveal: '7/24 of the inheritance share — kept for the schemer alone. The phrase "the inheritance share" turns Muffin\'s blood cold. There is no inheritance in any village legend of a werewolf. There is no estate, no will, no fortune in any old story. Whoever wrote this notebook is human, knows about an inheritance, and has been planning theft long before any moon rose. The Beast is starting to look like something else entirely. Muffin pockets the notebook and presses on.',
        question: 'From <em>7/8</em>, subtract <em>1/4</em> and <em>1/3</em>. What is <em>7/8 − 1/4 − 1/3</em>? (Give as a simplified fraction.)',
        answer: '7/24',
        hint: '7/8 − 1/4 − 1/3'
      },

      // Problem 17 — Fraction × fraction (HOAX CONFIRMED)
      {
        cluePrompt: 'In the bottom of the notebook Muffin finds a stained recipe: "<em>Take 1/3 of a vial of phosphor-moss dust. Mix with 1/4 oil. Apply to fur. The active glow is the product.</em>" Muffin needs to know what fraction of a vial actually glows when smeared on a coat.',
        clueReveal: '1/12 of a vial — enough to paint a single hound\'s flanks. <em>THAT</em> is how the Beast\'s eyes burn yellow-gold; <em>THAT</em> is how its hide glows silver-white the moment a villager sees it; <em>THAT</em> is what Tom Reedy meant by "PAINT" on his slate. The unfamiliar jar on Mira\'s shelf was phosphor moss. Someone has been buying it from her — or stealing it. There is no werewolf in Hollowmere. There is a person, with a dog, and a jar of glowing paste. The only question left is which of three suspects: Goody, Tom, or Crooke.',
        question: 'The recipe says: <em>1/3 of a vial × 1/4 oil = active glow</em>. What is <em>1/3 × 1/4</em>? (Give as a fraction.)',
        answer: '1/12',
        hint: '1/3 × 1/4'
      },

      // Problem 18 — Metric conversion: m → km
      {
        cluePrompt: 'A cave-mouth map is sketched in the back of the notebook, in the same hand as the inheritance ledger. From Hollowmere village square to a hidden entrance: <em>1,750 m</em> through the wood. The Constable\'s only map of the wood is in <em>kilometers</em>. Muffin needs the conversion to place the cave on it.',
        clueReveal: '1.75 kilometers from the square — well past any search Stone\'s men have run. They\'ve been looking too close. Muffin folds the map. "Wherever Petra is," he murmurs, "she is THERE." And whoever drew this map and wrote the inheritance ledger is the same person — and that person is the Beast.',
        question: 'The cave is <em>1,750 m</em> from the village square. How many <em>kilometers</em> is that? (1 km = 1,000 m)',
        answer: 1.75
      },

      // Problem 19 — Mixed-number subtraction (alibi)
      {
        cluePrompt: 'Back at the inn before dawn, Muffin checks alibis one by one. Goody Nye was witnessed in her clearing during the second attack by two woodsmen gathering kindling — a lock-tight alibi. Tom Reedy is too maimed to walk, let alone run a hound. Stone is cleared by his patrol record. Only one suspect remains: Salvian Crooke, who claimed he was at the inn from <em>7¾</em> to <em>9⅙</em> hours past noon. The second attack happened at exactly <em>9</em> hours past noon. Muffin needs the duration of Crooke\'s claimed alibi window.',
        clueReveal: '17/12 hours — about 1 hour and 25 minutes. But the attack happened at hour 9, INSIDE that window. The witnesses who supposedly saw Crooke at the inn must be wrong, or paid off, or fabricated. The inheritance ledger, the cave map, the recipe, the alibi — every thread points to the same man. <em>Salvian Crooke is the Beast.</em> Muffin must reach the cave before he does.',
        question: 'Crooke claims he was at the inn from <em>7¾</em> to <em>9⅙</em> hours past noon. How long is that? Solve <em>9⅙ − 7¾</em>. (Give as a fraction.)',
        answer: '17/12',
        hint: '9⅙ − 7¾'
      },

      // ============================================================
      // NIGHT FOUR — THE REVELATION
      // ============================================================

      // Problem 20 — Fraction ÷ whole
      {
        cluePrompt: 'Constable Stone gathers <em>6</em> search teams at the village edge. He hands Muffin a satchel of evidence — fur tufts, ink samples, the brass-clasp notebook — totaling <em>3/4 pound</em>. To distribute clues to each team for parallel investigation, the satchel must be split equally.',
        clueReveal: '1/8 pound per team — a careful share. The teams disperse into the wood. Stone stays with Muffin: "If you find Petra, you signal with the lantern. Two flashes for trouble, three for found."',
        question: '<em>3/4 pound</em> of evidence is split equally among <em>6</em> teams. How much per team? Calculate <em>3/4 ÷ 6</em>. (Give as a fraction.)',
        answer: '1/8',
        hint: '3/4 ÷ 6'
      },

      // Problem 21 — Whole ÷ fraction (antidote doses)
      {
        cluePrompt: 'Mira presses a tinctures-flask into Muffin\'s paw. "If you find Petra and she\'s been drugged with anything from the forest, this is the antidote. I have <em>6 cups</em> total. Each dose is <em>2/3 cup</em>. How many doses, Detective?"',
        clueReveal: '9 doses. Plenty for Petra, plenty in case Muffin is drugged too, plenty in case anyone else has been hurt out there. Mira nods grimly: "Bring her home." Muffin sets out for the cave.',
        question: 'Mira has <em>6 cups</em> of antidote. Each dose is <em>2/3 cup</em>. How many doses? Calculate <em>6 ÷ 2/3</em>.',
        answer: 9,
        hint: '6 ÷ 2/3'
      },

      // Problem 22 — Fraction ÷ fraction (the chase)
      {
        cluePrompt: 'At the cave mouth Muffin sees two glowing eyes — and behind them, the SHAPE of a massive hound, its hide painted with phosphor moss exactly as the recipe described. It charges. Muffin must outpace it back to a hollow he passed earlier. The hound covers <em>5/6 mile</em> every <em>1/4 hour</em>. He needs its speed in <em>miles per hour</em> to know whether he can stay ahead of it.',
        clueReveal: 'About 10/3, or 3⅓ miles per hour — fast for a dog, but barely faster than Muffin can run for short bursts. Muffin times his sprint, dives into the hollow, and lets the hound thunder past. From the brush he hears a HUMAN VOICE call the dog back. Crooke\'s voice. The "Beast" is exactly what Muffin now believes: a trained dog and a man with a paint-pot.',
        question: 'The hound covers <em>5/6 mile</em> in <em>1/4 hour</em>. What is its speed in miles per hour? Calculate <em>5/6 ÷ 1/4</em>. (Give as a fraction.)',
        answer: '10/3',
        hint: '5/6 ÷ 1/4'
      },

      // Problem 23 — Work problem (combined rate, fraction addition)
      {
        cluePrompt: 'Inside the cave, Muffin finds Petra alive but tied beside an iron grate that blocks the inner chamber. Wendell, who\'s been tracking Muffin since dusk, arrives with shovels. They\'ll dig the grate-frame loose. Wendell can clear <em>1/4</em> of the frame per hour; Muffin, smaller and quicker, <em>1/6</em> per hour. Together — how much can they clear in <em>one hour</em>?',
        clueReveal: '5/12 of the frame per hour together. At that rate the full job is under two and a half hours — fast enough, if Crooke doesn\'t return first. Petra whispers her thanks. Muffin hands her Mira\'s tincture, just in case. The shovels start working.',
        question: 'Wendell clears <em>1/4</em> per hour, Muffin <em>1/6</em> per hour. Together, how much is cleared in <em>one hour</em>? <em>1/4 + 1/6</em>. (Give as a fraction.)',
        answer: '5/12',
        hint: '1/4 + 1/6'
      },

      // Problem 24 — Time conversion (minutes between two clock times)
      {
        cluePrompt: 'Halfway through the dig, lantern light approaches the cave mouth. Crooke is returning. The wall-clock in the cave reads <em>10:55 PM</em>; the full moon peaks tonight at <em>11:43 PM</em>, when Crooke planned to "stage" Petra\'s death. Muffin needs to know exactly how many minutes he has.',
        clueReveal: '48 minutes. Less than an hour to free Petra, escape the cave, and confront Crooke before the staged moment. Muffin signals Wendell. They dig harder. Outside, the wolfhound starts barking — Crooke has reached the mouth.',
        question: 'It\'s now <em>10:55 PM</em>. The full moon peaks at <em>11:43 PM</em>. How many <em>minutes</em> until peak?',
        answer: 48
      },

      // Problem 25 — Multi-step climax (fraction of remainder)
      {
        cluePrompt: 'At the cave mouth, lantern in paw, Muffin confronts Salvian Crooke. The notebook is open between them. "Your aunt is Petra Vell\'s great-aunt," Muffin says quietly. "Her will leaves her fortune to Petra unless Petra dies before her. <em>3,600 gold</em>, in total. From your own ledger: <em>1/3</em> already promised to your smuggling captain. <em>1/4</em> to a forger. The rest you keep. Show me the math, Crooke." The naturalist\'s face drains of color as Muffin reads the totals aloud.',
        clueReveal: 'Exactly 1,500 gold pieces — Crooke\'s share of a child\'s death. Constable Stone steps from the trees behind him with shackles. Crooke\'s wolfhound, suddenly without its master\'s whistle, simply sits down and licks Muffin\'s paw. The Beast was always just a very loyal dog. Petra runs to Wendell. Mira\'s tincture stays uncorked. The full moon rises on a closed case.',
        question: 'From <em>3,600 gold</em>, subtract <em>1/3</em> (smuggler) and <em>1/4</em> (forger). How many gold pieces does Crooke keep? Calculate <em>3,600 × (1 − 1/3 − 1/4)</em>.',
        answer: 1500
      }
    ],
    resolution: 'Salvian Crooke is hauled away in irons before dawn, and at the inn that morning, with Petra warm in her mother\'s arms and the village shutters unbolting one by one, Muffin lays the case out from the beginning so that everyone — including Howell Greaves, who never quite believed him — can see how every clue was the same clue, read sideways. Crooke\'s aunt, in the next county, is Petra\'s great-aunt; her will leaves her estate to Petra unless Petra dies before her. The "powder" line in Crooke\'s tidy ledger was phosphor-moss dust, stolen from Mira\'s shelf with the unfamiliar handwriting on the jar. The wolfhound\'s painted hide produced the silver-white glow in moonlight; the same paint produced the yellow-gold eyes; "PAINT" on Tom Reedy\'s slate was Tom telling them so as best a frightened man could. The claw imprint of 600 grams was made by a real wolf paw, dragged and weighted by Crooke himself. The wood-tract south of Wendell\'s hut was spared because Crooke\'s cave hideout lay to the northwest and he had no reason to draw attention there. The 1.5-hour-from-moonrise schedule was a man\'s schedule, not a beast\'s — moonrise was simply Crooke\'s start time. Goody Nye sold him moss without knowing what he meant by it; she is innocent of everything except living strangely. Wendell was tired. Stone was old-scarred. Tom was terrified. Petra was unlucky enough to be loved by an aunt with a fortune. Muffin tucks his magnifying glass into his hat and tips it to the morning. "There was never a beast in this wood," he says quietly. "There was only a man who wanted there to be one."',
    defeatMessage: 'The fog thickens, the trail grows cold, and the next full moon rises with Petra still unfound. But Muffin is no quitter. He returns to the inn, lights a fresh candle, smooths out his case notes, and re-reads every clue from the beginning. Hollowmere is still standing. Petra is still alive. And the math, when read carefully, has only ever pointed in one direction.'
  },

  // ============================================================
  // CASE 7: The Ghost of Ravenhollow Manor (Hard, 25 problems, 4 chapters)
  // Focus: All advanced fraction operations — unlike denominators,
  //        adding/subtracting 3 fractions, mixed-number addition AND
  //        subtraction with regrouping AND unlike denominators, missing
  //        fraction. Plus: line plots with fractional data, multiplication
  //        as scaling (compare to 1, compare without multiplying), powers
  //        of 10 (mul/div whole numbers and decimals by 10/100/1000), and
  //        unit conversion (US customary + time + metric place-value).
  // Style: Late-1880s gothic-haunted-manor on a windswept moor. Hound-
  //        of-Baskervilles homage, indoor and claustrophobic. Eccentric
  //        late lord, frightened young heiress, four red-herring suspects,
  //        and a doctor with a sealed secondary will.
  // ============================================================
  {
    id: 'ghost_ravenhollow',
    title: 'The Ghost of Ravenhollow Manor',
    difficulty: 'hard',
    description: 'A young heiress is being terrorised by what the staff swears is the vengeful ghost of her late great-uncle. She has five nights until the inheritance transfers — and a sealed secondary will lies in the gallery clock. Muffin must find out who, or what, is behind the haunting before the deadline runs out.',
    backdrop: 'manor',
    intro: {
      title: 'A Letter from the Moor',
      illustration: 'manor_intro',
      text: '<p>It is mid-November in the city. Sleet on the roof of the Mystery Agency, a candle burning low. Muffin has just finished filing the last of his case reports when a frantic letter is slid under the door by a soaked messenger boy.</p>' +
            '<p>The letter is signed by <em>Reverend Thomas Holloway</em>, parson of the village of Ravenhollow on the moor, a full day\'s ride from the city. His charge — a sixteen-year-old heiress named <em>Lady Arabella Wren</em> — has just inherited <em>Ravenhollow Manor</em> from her late great-uncle Lord Cassius Wren. The staff and the villagers swear the manor is haunted. Cold spots in the gallery. Doors slamming. A vase shattered above Arabella\'s bed. And last night her dead mother\'s locket nailed to her bedroom door with a note in the late Cassius\'s own handwriting that read simply: <em>"LEAVE."</em></p>' +
            '<p class="intro-letter">"Detective — there is more, and I dare not put the worst of it on paper. Arabella has <em>five nights</em> before the inheritance is legally transferred. If she dies, flees, or is declared incompetent before then, the estate passes to a beneficiary named in a sealed <em>secondary will</em> Cassius lodged with his solicitor. We have not been permitted to read it. The girl is brave, Detective, but she is breaking. Please come.<br><span class="intro-letter-sig">— Reverend Thomas Holloway, Ravenhollow</span>"</p>' +
            '<p>Muffin reads the letter twice. He has heard of Cassius Wren. The Spiritualist Society in the city used to whisper about the eccentric old lord — the cipher-collector, the trick-room builder, the man who spent his last decade obsessed with secret passages and locked-room puzzles. Muffin does not believe in ghosts. But he does believe in young heiresses dying suspiciously close to legal deadlines.</p>' +
            '<p>He folds the letter, snuffs his candle, and tucks his magnifying glass into the band of his deerstalker.</p>' +
            '<p>"Saddle the post-coach. We ride for the moor at dawn."</p>' +
            '<p>By dusk the next day Muffin steps off the coach at the iron gates of Ravenhollow Manor. The moor is silent. Fog comes up off the heather like breath. The lanterns at the manor door burn far lower than he expects.</p>' +
            '<p class="intro-tagline">The case begins now.</p>',
      buttonLabel: 'Approach the Manor →'
    },
    chapters: [
      { title: 'Night One — Arrival at Ravenhollow', length: 6 },
      { title: 'Night Two — The Investigation', length: 7 },
      { title: 'Night Three — The Hauntings Escalate', length: 6 },
      { title: 'Night Four — The Reveal', length: 6 }
    ],
    problems: [
      // ============================================================
      // NIGHT ONE — ARRIVAL AT RAVENHOLLOW
      // ============================================================

      // Problem 1 — Time conversion: hours+minutes → minutes total
      {
        cluePrompt: 'At the gate Muffin is met by <em>Reverend Holloway</em>, a thin man with kind eyes and a wet collar. "Detective. Thank God you came. The post-coach took <em>4 hours and 15 minutes</em> from town — I dared not ride out to fetch you sooner, the staff watch every door. Tell me, Detective, in your trade you must measure everything: how many <em>minutes</em> total is that ride?"',
        clueReveal: 'Two hundred and fifty-five minutes — over four hours of road through the fog, with no telegraph, no help, no return until tomorrow. Muffin makes a note: if Arabella needs out tonight, there is no out tonight. Whatever begins this evening, it will play out in this house. The gate clangs shut behind them.',
        question: 'The post-coach takes <em>4 hours and 15 minutes</em>. How many <em>minutes</em> total? (1 hour = 60 minutes)',
        answer: 255
      },

      // Problem 2 — Powers of 10: whole × 100
      {
        cluePrompt: 'Inside the great hall, an elderly butler — <em>Hawkins</em>, 50 years at Ravenhollow — meets them. He is stern, very tall, very quiet. "The manor has 47 chambers above ground, sir, and exactly <em>10² portraits</em> on its walls. The late Lord Cassius collected them himself." Muffin glances at the dim corridor of frames vanishing into shadow. He needs the count in plain numerals.',
        clueReveal: 'One hundred portraits — and every one of them, Hawkins says, painted from life by the late Lord Cassius\'s own hand. A man with that obsession knew his house better than anyone. A man with that obsession also kept secrets. Muffin makes a note: <em>Hawkins. 50 years. Knows every wall.</em> The butler does not blink as he turns away.',
        question: 'Hawkins says the manor has <em>10²</em> portraits hung in its corridors. How many portraits is <em>10²</em>?',
        answer: 100
      },

      // Problem 3 — Mixed-number addition (same denominator)
      {
        cluePrompt: '<em>Mrs. Pennyfall</em>, the head housekeeper, brings Muffin a cup of tea and her staff-time ledger. "Forty years I\'ve served this family, Detective. I keep every hour. This morning I logged <em>2 1/8 hours</em> polishing the silver, and another <em>1 5/8 hours</em> on the gallery brass after lunch. Add them, would you? My hands are not what they were."',
        clueReveal: 'Three and three-quarter hours of polishing — Mrs. Pennyfall\'s hands have indeed slowed, but her count is precise. Muffin notes: she had work in the GALLERY this afternoon, the same gallery the maids report cold spots in. Loyal, methodical, present at the scene. Muffin adds her name to his list.',
        question: 'Add Mrs. Pennyfall\'s morning and afternoon hours: <em>2 1/8 + 1 5/8</em>. Give as a mixed number or fraction.',
        answer: '15/4',
        hint: '2 1/8 + 1 5/8'
      },

      // Problem 4 — US customary volume (pints → cups)
      {
        cluePrompt: 'In the late lord\'s study, Muffin opens a heavy crystal decanter — Cassius\'s favourite brandy, Hawkins says, refilled weekly. The butler tells him the decanter holds <em>3 pints</em> when full. Muffin needs the count in cups for the kitchen ledger he means to cross-check. <em>(1 pint = 2 cups)</em>',
        clueReveal: 'Six cups — a heavy night\'s drink. The kitchen ledger, when Muffin checks it, shows the decanter being refilled <em>twice</em> a week recently — twelve cups\' worth — far more than even an old man with a fondness for brandy could drain. Someone has been pouring it out. The why, Muffin doesn\'t yet know.',
        question: 'The decanter holds <em>3 pints</em>. How many <em>cups</em> is that? (1 pint = 2 cups)',
        answer: 6
      },

      // Problem 5 — Adding fractions with unlike denominators
      {
        cluePrompt: 'A young maid named <em>Tilly</em>, eyes very wide, is brought to Muffin in the kitchen. "I heard footsteps in the gallery, sir. Twice. The first set was <em>1/3 hour</em> ago. The second was <em>1/4 hour</em> after that." Muffin needs the total time elapsed since she first heard them, to mark on his timeline.',
        clueReveal: '7/12 of an hour — about 35 minutes ago. That places the first sound while Mrs. Pennyfall was still polishing the gallery brass. Either Mrs. Pennyfall heard nothing strange, or she was the source. Or — Muffin\'s pencil lifts — someone passed THROUGH the gallery without her seeing them. The math suggests a path, and a path suggests a passage.',
        question: 'Add <em>1/3 + 1/4</em>. Give your answer as a fraction.',
        answer: '7/12',
        hint: '1/3 + 1/4'
      },

      // Problem 6 — Reading a line plot (fractional data)
      {
        cluePrompt: 'In Arabella\'s sitting-room, <em>Dr. Edmund Cray</em> — Cassius\'s longtime physician, charming and immaculate — shows Muffin the dosage chart he has been keeping for Arabella\'s "calming tonic." It is plotted as a line plot of doses over the past week: <em>3 doses of 1/4 tsp, 4 doses of 1/2 tsp, 2 doses of 3/4 tsp, 1 dose of 1 tsp.</em> Muffin needs the most frequent dose value before he can judge the chart.',
        clueReveal: '1/2 teaspoon — Cray\'s "usual" dose. He prescribes it himself, prepares it himself, administers it himself, and counts the empty vials himself. No one else in the house touches the tonic. Cray\'s smile is warm and untroubled. Muffin makes a note in tiny script: <em>Cray. Privileged access to her cup.</em>',
        question: 'On Cray\'s line plot of weekly doses, which dose is the <em>MOST FREQUENT</em>? Give your answer as a fraction. (Doses: 1/4 ×3, 1/2 ×4, 3/4 ×2, 1 ×1.)',
        answer: '1/2'
      },

      // ============================================================
      // NIGHT TWO — THE INVESTIGATION
      // ============================================================

      // Problem 7 — Mixed-number addition with unlike denominators (no regrouping)
      {
        cluePrompt: 'At dawn Muffin walks the manor with Hawkins. "East wing is <em>2 1/4 furlongs</em> end-to-end, sir. West wing is <em>3 1/3 furlongs</em>. The late lord measured them himself the year he built the gallery." Muffin needs the total length for his floor-plan.',
        clueReveal: '5 and 7/12 furlongs of corridor — over half a mile, end to end. A man could move quietly through this much house all night and never be seen if he knew the rhythm of the watch. And Hawkins, who has paced these halls for fifty years, knows that rhythm better than any living soul. Muffin\'s pencil hovers over Hawkins\' name on the suspect list.',
        question: 'East wing <em>2 1/4</em> furlongs + west wing <em>3 1/3</em> furlongs. Give the total as a mixed number or fraction.',
        answer: '67/12',
        hint: '2 1/4 + 3 1/3'
      },

      // Problem 8 — Subtracting fractions with unlike denominators
      {
        cluePrompt: 'In the gallery, Muffin examines the bell-pull cord that is supposed to summon staff to Arabella\'s room. It is now hanging in a strange short loop. Mrs. Pennyfall says it was originally <em>5/6 yard</em>, but she measured it this morning and only <em>1/2 yard</em> remains. Muffin needs to know how much was cut off.',
        clueReveal: '1/3 yard — about a foot — of bell-cord, severed neatly. Whoever cut it knew exactly which cord controls Arabella\'s summons. That is not a ghost\'s knowledge; that is a houseguest\'s. Muffin pockets the severed end as evidence.',
        question: '<em>5/6 − 1/2</em>. Give your answer as a simplified fraction.',
        answer: '1/3',
        hint: '5/6 − 1/2'
      },

      // Problem 9 — Solve for missing fraction
      {
        cluePrompt: 'In the kitchen, Cook\'s recipe for Arabella\'s evening calming tea calls for exactly <em>7/8 cup</em> of fresh well-water, never measured by anyone but Cook. This morning Cook poured <em>1/4 cup</em> before being interrupted by a "ghostly" crash from the gallery. Muffin needs to know how much was added LATER, by someone else, to fill the recipe — solve <em>1/4 + ? = 7/8</em>.',
        clueReveal: '5/8 cup — added by an unknown hand while Cook was distracted by the gallery noise. The crash, then, was a deliberate distraction so that whoever added the rest of the water — and very likely something else with it — could do so unseen. The pattern is precise. Whoever did this knew Cook\'s recipe by heart.',
        question: 'Cook poured <em>1/4 cup</em>; the recipe calls for <em>7/8 cup</em>. How much was added by the unknown hand? Solve <em>1/4 + ? = 7/8</em>.',
        answer: '5/8',
        hint: '7/8 − 1/4'
      },

      // Problem 10 — Multiplying decimals by 100
      {
        cluePrompt: 'Dr. Cray hands Muffin his monthly bill at breakfast — neatly itemised, charming as ever. The line for "calming tonic" reads: <em>0.07 pounds per dose, 100 doses prescribed</em>. Muffin needs the total billed amount.',
        clueReveal: 'Seven pounds — a tidy sum for a single month, but trifling compared to what is at stake in this house. Cray bills as a doctor would bill. The math itself is innocent. What is NOT innocent is the chain of access it implies: he prescribes, he prepares, he administers, and he invoices. Every step touches the tonic. Every dose passes through one set of hands.',
        question: 'Cray bills <em>0.07 pounds</em> per dose, for <em>100 doses</em>. What is the total in pounds?',
        answer: 7
      },

      // Problem 11 — Reading line plot with fractions (interpretation)
      {
        cluePrompt: 'Muffin compiles the gallery\'s cold-spot reports onto a line plot of times-since-sunset: <em>3 reports at 1/8 hour</em>, <em>2 reports at 3/8 hour</em>, <em>1 report at 5/8 hour</em>. He needs to know how many TOTAL reports came in WITHIN <em>1/2 hour</em> of sunset — the early window where staff were still in the corridors.',
        clueReveal: '5 reports — both 1/8 and 3/8 are less than 1/2, so 3 + 2. The remaining lone report at 5/8 came AFTER staff had retired for the night, which means whoever caused it could move freely. The reports cluster early — when staff are still in the halls — to plant witnesses, then trail off to one private incident later. That is not a ghost\'s schedule. That is a stage manager\'s.',
        question: 'Cold-spot reports: <em>3 at 1/8 hr, 2 at 3/8 hr, 1 at 5/8 hr</em>. How many came in <em>WITHIN 1/2 hour</em> of sunset?',
        answer: 5
      },

      // Problem 12 — Mixed-number subtraction (unlike, no regrouping)
      {
        cluePrompt: 'In the library, a rare incunabulum is missing from the third shelf. The shelf measures <em>5 7/8 yards</em> end to end. The remaining books fill exactly <em>2 3/4 yards</em>. Muffin needs the empty space — the volume the missing book OCCUPIED, plus the gap left.',
        clueReveal: '3 1/8 yards of empty shelf — far more than a single book\'s width. Whatever was taken was either many volumes, or covered up to LOOK like a single missing book. Muffin notes: a man pretending to remove only one item, when he removed several, would do so to mask which one was important. <em>Cassius\'s diary, perhaps.</em>',
        question: 'Shelf is <em>5 7/8 yards</em> long. Books fill <em>2 3/4 yards</em>. How much is empty?',
        answer: '25/8'
      },

      // Problem 13 — Multiplication as scaling
      {
        cluePrompt: 'In Cassius\'s study, Muffin finds an old ledger noting the value of his estate: <em>12 thousand pounds</em>. Beside it, in the same hand, a curious scribble: "<em>secondary share = 4/5 × 12</em>." Muffin needs the value of <em>4/5 × 12</em> — and then a moment to think about what it means that the answer is LESS than the original 12.',
        clueReveal: '48/5, or 9 and 3/5 — that is the secondary share in thousands of pounds. <em>Less than 12, because 4/5 is less than 1: multiplying by a fraction less than 1 SHRINKS the number.</em> But 9,600 pounds is a vast sum — the size of inheritance worth committing crimes for. Whoever inherits the secondary share has a powerful motive.',
        question: 'Calculate <em>4/5 × 12</em>. Give as a mixed number or fraction.',
        answer: '48/5',
        hint: '4/5 × 12'
      },

      // ============================================================
      // NIGHT THREE — THE HAUNTINGS ESCALATE
      // ============================================================

      // Problem 14 — Mixed-number subtraction with regrouping AND unlike denominators
      {
        cluePrompt: 'In Arabella\'s sitting-room Muffin checks his watch against the haunting log. Tonight\'s "haunting" — a clattering chain on the floor above her bed — lasted <em>7 1/3 hours</em> from first sound to silence. The previous night\'s lasted only <em>3 4/5 hours</em>. Muffin needs the difference.',
        clueReveal: '3 and 8/15 hours longer tonight — almost three and a half hours more terror. The hauntings are escalating, intensifying, deliberately wearing Arabella down. That is not the pattern of a wandering spirit. That is the pattern of a mortal ENEMY trying to break a sixteen-year-old before the legal deadline. Muffin\'s grip on his pencil tightens.',
        question: 'Subtract: <em>7 1/3 − 3 4/5</em>. Give as a mixed number or fraction.',
        answer: '53/15',
        hint: '7 1/3 − 3 4/5'
      },

      // Problem 15 — Word problem: subtracting mixed numbers (with regrouping)
      {
        cluePrompt: 'Down in the wine cellar, Muffin checks the brandy cask. Three months ago, just before Cassius died, the cellar log shows it held <em>5 1/2 gallons</em>. Today it holds only <em>1 7/8 gallons</em>. No one but Hawkins has the key. Muffin needs to know how much brandy has gone missing.',
        clueReveal: '3 and 5/8 gallons of brandy — more than a man could drink in three months, and Hawkins drinks none. The brandy was being POURED somewhere, regularly. Muffin recalls Cassius\'s decanter being refilled twice a week. The math says the missing brandy was leaving the cellar through Hawkins\' key — but it was being USED by someone else with access to the decanter. The doctor pours for his patient nightly. Hawkins is innocent of the brandy theft. The doctor is not.',
        question: 'Cellar held <em>5 1/2 gallons</em>. Now holds <em>1 7/8 gallons</em>. How much is missing?',
        answer: '29/8'
      },

      // Problem 16 — Three-fraction addition (unlike denominators)
      {
        cluePrompt: 'On Arabella\'s bedside table, Muffin finds Dr. Cray\'s personal dose record for the past three days: <em>Monday 1/2 cup, Tuesday 1/3 cup, Wednesday 1/4 cup</em>. He needs the total tonic given over those three days.',
        clueReveal: '13/12, or 1 and 1/12 cups in three days — over a CUP of tonic in seventy-two hours. Cray\'s public records show only "low calming dose." His private record, here, shows over a cup. He is dosing her higher than he is ADMITTING. With what? Muffin retrieves a sealed sample of the tonic and pockets it for Mira Vell\'s analysis later.',
        question: 'Total of three days\' tonic: <em>1/2 + 1/3 + 1/4</em>. Give as a mixed number or fraction.',
        answer: '13/12',
        hint: '1/2 + 1/3 + 1/4'
      },

      // Problem 17 — Reading a line plot / data analysis (mode)
      {
        cluePrompt: 'Muffin records the intervals between every reported "haunting" since he arrived. The intervals, in hours: <em>1/4, 1/2, 1/4, 1/8, 1/2, 1/4, 1/8</em>. He plots them on a line plot and looks for the most frequent interval — the rhythm of the schemer.',
        clueReveal: '1/4 hour — fifteen-minute intervals appear THREE times, more than any other gap. Hauntings on a fifteen-minute clock are not the work of a restless dead man. They are the work of a man with a pocket-watch and a route. Muffin underlines "1/4 hr" in his notebook and steps quietly into the long gallery.',
        question: 'Of the intervals <em>1/4, 1/2, 1/4, 1/8, 1/2, 1/4, 1/8</em>, which value is <em>MOST FREQUENT</em>?',
        answer: '1/4'
      },

      // Problem 18 — Multiplication as scaling (compare to 1)
      {
        cluePrompt: 'Pinned inside the cover of Cassius\'s old diary Muffin finds a strange equation in the late lord\'s spidery hand: "<em>secondary cut = 7/8 × 11 acres of the south meadow</em>." Muffin needs the answer — and a moment to feel what it means that <em>7/8</em> is less than 1.',
        clueReveal: '77/8, or 9 and 5/8 acres — less than the full 11 acres, because multiplying by 7/8 (a fraction less than 1) SHRINKS the original. The "secondary cut" is not the whole estate, but it is enormous. Whoever the secondary beneficiary is, they have been planning to inherit nearly nine and two-thirds acres of the prime south meadow. Muffin slips the diary into his coat.',
        question: 'Calculate <em>7/8 × 11</em>. Give as a mixed number or fraction.',
        answer: '77/8',
        hint: '7/8 × 11'
      },

      // Problem 19 — Dividing decimals by 1,000
      {
        cluePrompt: 'Muffin\'s sealed sample of Arabella\'s tonic, sent down by carrier-pigeon to be analysed at first light, comes back with a single line in Mira Vell\'s handwriting from Hollowmere: <em>"laudanum content this month: 8,400 milligrams."</em> Muffin needs the dose in <em>grams</em> to compare it against medical safety guides. <em>(1 g = 1,000 mg)</em>',
        clueReveal: '8.4 grams of laudanum in one month — more than four times the safe monthly limit for an adult, prescribed to a sixteen-year-old girl. This is not "calming." This is poisoning at slow tempo. Muffin\'s blood goes cold. He folds the analysis and steps quickly back toward the gallery. The hauntings, the dosage, the "nerves" — none of it is supernatural. All of it is Cray.',
        question: 'Convert <em>8,400 mg</em> to <em>grams</em>. (1 g = 1,000 mg)',
        answer: 8.4
      },

      // ============================================================
      // NIGHT FOUR — THE REVEAL
      // ============================================================

      // Problem 20 — Adding mixed numbers with regrouping (unlike denominators)
      {
        cluePrompt: 'Behind the gallery clock — exactly where the Reverend\'s letter said the secondary will lay — Muffin finds it. But the will is not what he came for. Tucked alongside it is Cassius\'s own hand-drawn map of the manor\'s hidden passages. The corridor from the doctor\'s guest room to Arabella\'s bedroom is marked: <em>4 5/6 yards</em> through one wall, <em>2 1/2 yards</em> through the next. Muffin needs the total passage length.',
        clueReveal: '7 and 1/3 yards — a passage barely twenty-two feet long, hidden in the walls between the doctor\'s guest room and Arabella\'s sleeping chamber. Cray could enter Arabella\'s room WITHOUT EVER OPENING A DOOR, leave a "nailed" locket, smash a vase from inside the wall, and be back in his room in under thirty seconds. The "ghost" had a route. The route had a builder. The builder is dead. The user is not.',
        question: 'Hidden passage: <em>4 5/6 + 2 1/2</em> yards. Give the total as a mixed number or fraction.',
        answer: '22/3',
        hint: '4 5/6 + 2 1/2'
      },

      // Problem 21 — Word problem: subtracting mixed numbers (with regrouping)
      {
        cluePrompt: 'Muffin breaks the seal on the secondary will. The estate is recorded as <em>12 1/2 acres</em> in total. Of these, <em>5 3/4 acres</em> are bequeathed to Arabella outright (the manor proper, the gardens, the stable yard). The remainder — every acre of farmland, woodland, mineral right and tenant cottage — passes to a single named "beneficiary of last resort." Muffin needs that remainder.',
        clueReveal: '6 and 3/4 acres — over half the estate, all of it the income-generating land — to a single secondary beneficiary. Muffin\'s eye drops to the name written on the next line, in Cassius\'s own handwriting. He reads it twice. Then he closes the will, tucks it inside his coat, and walks straight toward the long gallery, where Cray is at this moment pouring Arabella her evening tonic.',
        question: 'Estate is <em>12 1/2 acres</em>. Arabella inherits <em>5 3/4</em>. How many acres go to the secondary beneficiary?',
        answer: '27/4'
      },

      // Problem 22 — Line plot interpretation: total count
      {
        cluePrompt: 'Cassius\'s passage-map shows where every secret door opens into the manor. Muffin overlays the staff\'s cold-spot reports on it as a line plot, by yards from the gallery clock: <em>2 reports at 0 yards, 1 at 1/8 yard, 3 at 1/2 yard, 2 at 7/8 yard, 1 at 1 yard</em>. He needs the TOTAL count of cold-spot reports.',
        clueReveal: '9 cold-spot reports total — and ALL of them within one yard of a hidden passage door. Not one report comes from anywhere ELSE in the manor. The pattern is mathematical, not spectral. Cold air leaks where doors open; doors are opening because someone is using the passages. Cray\'s guest-room door — at 0 yards — is the source of TWO reports alone. The line plot has just convicted him.',
        question: 'Cold-spot reports: <em>2 at 0 yds, 1 at 1/8 yd, 3 at 1/2 yd, 2 at 7/8 yd, 1 at 1 yd</em>. What is the <em>TOTAL</em> count?',
        answer: 9
      },

      // Problem 23 — Multiplication as scaling (the inheritance number)
      {
        cluePrompt: 'In the long gallery, Muffin confronts Dr. Cray as the doctor stands beside Arabella\'s tea tray. The will lies open between them. "The estate," Muffin says quietly, "is worth 16,000 pounds. Your secondary share is exactly <em>7/8</em> of it." Cray\'s teacup pauses halfway to his lip. Muffin needs the amount, in pounds, that Cray would inherit if Arabella died before the deadline.',
        clueReveal: '14,000 pounds — a fortune, by any reckoning, paid out of a child\'s death. Cray sets the teacup down very carefully. Muffin sees the man\'s charm flicker and fail. Constable\'s men, summoned by Holloway in the hour Muffin spent reading the will, are climbing the front steps. There is one calculation left.',
        question: 'Calculate <em>7/8 × 16,000</em> pounds.',
        answer: 14000,
        hint: '7/8 × 16,000'
      },

      // Problem 24 — Time conversion (deadline subtraction)
      {
        cluePrompt: 'The grandfather clock in the gallery reads <em>11:18 PM</em>. The legal inheritance transfer happens at <em>12:00 midnight</em>, when Arabella formally takes the estate and the secondary will is voided forever. Muffin needs to know exactly how many <em>minutes</em> remain.',
        clueReveal: '42 minutes — less than three quarters of an hour. Cray needed Arabella to be declared incompetent or worse before midnight. He has run out of time. The grandfather clock\'s pendulum keeps swinging, slow and indifferent. Behind him, Cray finally moves — not toward the door, but toward the teacup. Muffin steps between them.',
        question: 'It is <em>11:18 PM</em>. The deadline is <em>12:00 midnight</em>. How many <em>minutes</em> remain?',
        answer: 42
      },

      // Problem 25 — Multi-step climax (scaling × scaling)
      {
        cluePrompt: 'Cray\'s notebook, dropped in the scuffle, falls open on the gallery floor. A page of accounts: of his planned <em>14,000-pound haul</em>, exactly <em>5/8</em> would have been kept; the remainder he had promised to two accomplices. And of that 5/8 share, Cray had pre-pledged <em>3/4</em> to a forger in the city to launder the inheritance through false land-deeds. Muffin needs the final figure: how much would Cray <em>actually have kept</em> after the forger was paid?',
        clueReveal: 'Six thousand five hundred and sixty-two pounds and ten shillings — Cray\'s personal cut of a child\'s death. Muffin reads the figure aloud. Cray sinks against the wall. The constables take him at the door. Arabella, pale but standing, reaches out and steadies the grandfather clock\'s ticking pendulum with one hand. The legal transfer happens nine minutes later, at exactly midnight. The estate is hers. The case is closed.',
        question: 'Cray\'s gross haul: <em>14,000 pounds</em>. He keeps <em>5/8</em> after one accomplice; of THAT, he pays out <em>3/4</em> to a forger. How much does he end up keeping? Calculate <em>14,000 × 5/8 × (1 − 3/4)</em>.',
        answer: 2187.5,
        hint: '14,000 × 5/8 × 1/4'
      }
    ],
    resolution: 'Dr. Edmund Cray is led away in irons under a cold midnight moon. His confession comes within the hour — he was Cassius\'s personal physician for twelve years, copied his handwriting for hundreds of medical notes (which is how he forged the LEAVE warning), and slipped Cassius the laudanum prescription that named "my dear physician" as secondary beneficiary while Cassius was already too weak to read the fine print. Cassius died three months ago; Cray has been preparing his haunting since the burial. Muffin lays it out at the breakfast table the next morning so that Arabella, the Reverend, the staff, and even Hawkins can see: the powder was laudanum in her tonic; the "ghost" was Cray slipping through Cassius\'s own hidden passages; the bell-cord severance, the smashed vase, the locket on the door — all came from inside the wall between the doctor\'s guest room and Arabella\'s sleeping chamber. The cold spots clustered at the passage doors because the passages leaked draft. The escalating haunting hours weren\'t spectral fury but a mortal\'s schedule, growing desperate as the inheritance deadline closed in. Mrs. Pennyfall was just polishing brass; Hawkins was just guarding the family he\'d served fifty years; Eliza Marsh was, as Arabella whispered with a small smile, "the only person in the house who genuinely believed me." The Reverend Holloway weeps quietly into his tea. Arabella offers Muffin a brass key to the manor for whenever he should need shelter on the moor again. He bows, tucks his magnifying glass into his hat, and steps out into a morning that is, for the first time in many days, entirely silent. The ghost was always just a man with a route and a watch.',
    defeatMessage: 'The hauntings escalate, the doctor is too quick, and Muffin runs out of time before the inheritance window closes. But Arabella is still alive in the gallery. The will is still in the clock. The hidden passages still run between the walls. Muffin returns to the front steps, lights a fresh lantern, smooths out his case file, and re-reads every clue from the beginning. The math, when read carefully, has only ever pointed to one set of hands.'
  }
];
