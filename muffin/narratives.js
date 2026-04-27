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
        answer: 2.5,
        hint: '2,500 ÷ 1,000'
      },
      // Problem 4 — Storage closet: Metric conversion (g → mg, reverse direction)
      {
        cluePrompt: 'Behind the lab Muffin finds a storage closet with a freshly-picked lock. Inside, a small container of Starfire Crystal has been tipped over — crystals scattered across the shelf. Starfire Crystal is a rare binding agent with one documented use: making Nightshade Extract harder to detect. The label shows the amount in grams, but Muffin needs milligrams for the toxicology report.',
        clueReveal: '85 milligrams of Starfire Crystal were taken — just enough to mask the Nightshade in a drink. This rules out Vera, who is a beginning apprentice and wouldn\'t know about Starfire Crystal. Someone with serious potion knowledge did this.',
        question: 'The tipped container was labeled "0.085 g of Starfire Crystal." How many <em>milligrams</em> is 0.085 g? (1 g = 1,000 mg)',
        answer: 85,
        hint: '0.085 × 1,000'
      },
      // Problem 5 — Delivery logbook: Metric conversion (kg → g)
      {
        cluePrompt: 'Muffin opens the delivery logbook on the professor\'s desk. The most recent entry is from Luna Starwell, the professor\'s regular courier. She delivered Moonstone Powder yesterday — an ingredient with no harmful properties, but her delivery record reveals something important about timing. The receipt uses kilograms; the lab inventory uses grams.',
        clueReveal: 'Luna delivered 750 grams of Moonstone Powder, but only 680 grams were entered into inventory. Seventy grams unaccounted for — and Moonstone Powder is harmless on its own, but it\'s also an excellent disguise for suspicious-colored liquids. Someone used it as camouflage.',
        question: 'Luna\'s delivery receipt shows she brought 0.75 kg of Moonstone Powder. How many <em>grams</em> is 0.75 kg? (1 kg = 1,000 g)',
        answer: 750,
        hint: '0.75 × 1,000'
      },
      // Problem 6 — Interview Vera: Metric conversion (mL → L)
      {
        cluePrompt: 'Muffin interviews Vera Vex, the professor\'s apprentice. She\'s nervous but answers every question. She claims she spent the whole morning at her bench, measuring purified water for practice potions. Her workbench is indeed covered in labeled cylinders and beakers. Muffin checks her water log against the recipe she claims to have followed.',
        clueReveal: 'Vera used exactly 3.2 liters of water — a perfect match for the standard Healing Tonic recipe. Her alibi checks out. But as she talks, she mentions something useful: Barnaby Thornwick, the professor\'s rival, visited the lab the previous evening to drop off "a congratulatory gift."',
        question: 'Vera\'s workbench log shows she used 3,200 mL of purified water. How many <em>liters</em> is 3,200 mL? (1 L = 1,000 mL)',
        answer: 3.2,
        hint: '3,200 ÷ 1,000'
      },
      // Problem 7 — Interview Barnaby: Powers of 10 (multiply, 10³)
      {
        cluePrompt: 'Muffin visits Barnaby Thornwick\'s rival potion shop across town. The shop is darker and more cluttered than the professor\'s lab. Barnaby presents receipts to prove he was busy restocking — but when Muffin examines them closely, one order is staggering: a purchase of empty vials far beyond what any small shop would ever need.',
        clueReveal: 'Barnaby spent 350 gold coins on supplies — enough to stock a factory, not a one-room shop! When Muffin presses him on it, Barnaby stammers and his eyes flick to a locked cabinet behind the counter. "I was... planning to expand," he mutters unconvincingly.',
        question: 'Barnaby\'s receipt shows he ordered 10<sup>3</sup> empty vials at 0.35 gold coins each. What was his total cost?',
        answer: 350,
        hint: '10<sup>3</sup> × 0.35'
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
        answer: 4.3,
        hint: '2.5 + (1,800 ÷ 1,000)'
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
        answer: 45,
        hint: '0.045 × 1,000'
      },
      // Problem 13 — The confrontation: Decimal division reveals the full scale
      {
        cluePrompt: 'Muffin confronts Barnaby with everything: the Nightshade order, the Starfire Crystal, the Shadowmoss, Luna\'s testimony, and the gift potion analysis. Barnaby\'s face drains of color. "You can\'t prove my plan was bigger than one potion!" he snarls. But Muffin has one final calculation — the number that reveals just how much poison Barnaby had truly been stockpiling.',
        clueReveal: 'One hundred and seventy doses! Barnaby wasn\'t just after the professor — he was stockpiling enough Shadowmoss to poison every rival alchemist in the realm. The math doesn\'t just convict him of attempted murder; it exposes a conspiracy. Barnaby slumps into his chair. "He was going to publish a formula that would make my potions obsolete," he whispers. "I panicked. I never meant for it to go this far..."',
        question: 'Barnaby hoarded <em>85</em> grams of Shadowmoss Tincture (Clue 8), and each dose of his poison requires <em>0.5</em> grams of it. How many <em>total doses</em> could Barnaby have made if he had not been stopped?',
        answer: 170,
        hint: '85 ÷ 0.5'
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
            '<p>Muffin reads the letter twice. He folds it carefully, snuffs his candle, and tucks his magnifying glass into the band of his deerstalker hat.</p>' +
            '<p>"Saddle the post-coach, Constable. We ride at first light."</p>' +
            '<p>By dusk the next day Muffin steps off the coach at the inn at Hollowmere, fog already rolling thick from the trees. Old <em>Howell Greaves</em>, the village elder, is waiting at the door, his face like cracked stone.</p>' +
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
        cluePrompt: 'Muffin steps off the post-coach into Hollowmere as fog rolls in from the wood. Lanterns burn early; doors are bolted at sundown. Old Howell Greaves, the village elder, meets him at the inn with a face like cracked stone. "The Beast comes within an hour and a half of moonrise, every time," he growls. "If you\'re going to walk that wood, Detective, I\'d like to know the precise window."',
        clueReveal: 'Ninety minutes — an hour and a half — between moonrise and the first kill, every single attack night. That\'s a precise pattern. Whoever or whatever is doing this is timing it. Muffin scribbles "1:30 from moonrise" in his notebook and underlines it.',
        question: 'The Beast strikes within <em>1½ hours</em> of moonrise. How many <em>minutes</em> is 1½ hours?',
        answer: 90,
        hint: '1½ × 60'
      },

      // Problem 2 — Fraction +/− with like denominators
      {
        cluePrompt: 'Howell pulls a tally sheet from his coat. "Two farms hit so far. The Tannings lost <em>3/8</em> of their flock on Monday. The Pell farm lost <em>2/8</em> on Tuesday." He looks at Muffin. "How much of one full flock is gone, total?"',
        clueReveal: '5/8 of a flock dead in two nights. Sheep don\'t panic that hard for an ordinary wolf — and ordinary wolves don\'t kill in such tidy fractions. Muffin notes that this looks more like a <em>scheduled</em> raid than a hunt. The pattern is deliberate.',
        question: 'The Tannings lost <em>3/8</em> of a flock and the Pells lost <em>2/8</em>. What is <em>3/8 + 2/8</em>? Give your answer as a fraction.',
        answer: '5/8',
        hint: '3/8 + 2/8'
      },

      // Problem 3 — Common denominator (LCD)
      {
        cluePrompt: 'Mira Vell, the village healer and mother of the missing girl Petra, opens the door of her herb-cottage with red eyes. She presses a recipe into Muffin\'s paws — a calming tincture that might steady the survivor\'s nerves. "It calls for <em>1/3 cup</em> of chamomile and <em>1/4 cup</em> of valerian. To add them properly, I need a common denominator. My hands shake too badly to think tonight, Detective. Help me."',
        clueReveal: '12 — the smallest number both 3 and 4 divide into. With that, Mira can rewrite 1/3 as 4/12 and 1/4 as 3/12, and add them precisely. She presses Muffin\'s paw in thanks. As Muffin leaves, he glances at the recipe shelf and notices a jar of "phosphor moss" — an ingredient he\'s never heard of in healing work.',
        question: 'Mira needs to add <em>1/3</em> and <em>1/4</em>. What is the <em>least common denominator</em> of 3 and 4?',
        answer: 12,
        hint: 'LCD of 3 and 4'
      },

      // Problem 4 — Three-fraction addition with like denominators
      {
        cluePrompt: 'Constable Gareth Stone shares his ledger of nightly losses across the whole village. "Night one we lost <em>1/6</em> of all livestock, night two <em>2/6</em>, night three another <em>2/6</em>. Add it up, Detective. The mayor wants the total before the next moon."',
        clueReveal: '5/6 of every animal in Hollowmere — gone in three nights. At this rate the village won\'t survive the season. Muffin sees real fear in the Constable\'s eyes. This isn\'t just a mystery anymore; it\'s a crisis. He has four nights to stop it before the full moon.',
        question: 'Add the three nightly losses: <em>1/6 + 2/6 + 2/6</em>. Give your answer as a fraction.',
        answer: '5/6',
        hint: '1/6 + 2/6 + 2/6'
      },

      // Problem 5 — Time conversion: days → hours
      {
        cluePrompt: 'In Mira\'s cottage, Muffin notices a clock-counter on the wall, the kind a worried mother keeps. "Petra has been missing for <em>2½ days</em>," Mira whispers. "I need to know the hours, Detective. I need to know exactly how long she has been out there in that wood."',
        clueReveal: '60 hours. Two and a half days — sixty cold, dark hours — and Petra has been alone in that wood. Whatever or whoever has her, she has been with them too long. Muffin\'s grip tightens on his magnifying glass. Time is no longer abstract.',
        question: 'Petra has been missing for <em>2½ days</em>. How many <em>hours</em> is 2½ days? (1 day = 24 hours)',
        answer: 60,
        hint: '2½ × 24'
      },

      // Problem 6 — Fraction × whole
      {
        cluePrompt: 'Outside the inn, Muffin counts the closed shutters. The innkeeper tells him the village has 24 households, and <em>5/8</em> of them have refused to leave their homes after sundown. Muffin needs the count for his report.',
        clueReveal: 'Fifteen households shuttered in fear. More than half the village. Whoever orchestrated this terror is succeeding at one thing already — keeping witnesses indoors. That suits a criminal far better than it suits a beast. Muffin closes Night One with that thought ringing.',
        question: 'Of <em>24</em> households, <em>5/8</em> refuse to leave their homes after dark. How many households is that?',
        answer: 15,
        hint: '5/8 × 24'
      },

      // ============================================================
      // NIGHT TWO — THE INVESTIGATION
      // ============================================================

      // Problem 7 — Fraction +/− with unlike denominators
      {
        cluePrompt: 'At dawn, Muffin walks the perimeter of the wood with Constable Stone. The first attack site is <em>1/3 mile</em> due north of the village square; the second is <em>1/4 mile</em> due east. Muffin needs the combined straight-line distance — call it the "Beast\'s walking range" — for his map.',
        clueReveal: '7/12 of a mile in total Beast-range. That\'s a tight working radius — small enough for a single creature on foot, but also small enough for a single human, hiding nearby. Muffin draws a circle on his map. The truth lies inside it.',
        question: 'Add the distances to the two attack sites: <em>1/3 + 1/4</em>. Give your answer as a fraction.',
        answer: '7/12',
        hint: '1/3 + 1/4'
      },

      // Problem 8 — Mixed-number subtraction with regrouping
      {
        cluePrompt: 'A shepherd\'s account places the most recent kill <em>3¼ miles</em> deep into the wood, along the old logging trail. Muffin and Stone have already covered <em>1⅔ miles</em> by midmorning. They need the distance left.',
        clueReveal: '1 and 7/12 miles still to go — over half the journey ahead, and the trail will only grow narrower. Muffin tightens his cloak. Whatever they find, they\'ll find it deep in the trees.',
        question: 'The kill is <em>3¼</em> miles in; they have walked <em>1⅔</em>. How far remains? (Give your answer as a mixed number, e.g. <em>1 5/12</em>.)',
        answer: '19/12',
        hint: '3¼ − 1⅔'
      },

      // Problem 9 — Solve for missing fraction
      {
        cluePrompt: 'Inside the maimed survivor\'s cabin, the Marrowed Man — silent, scarred — sketches his flight on a slate. He fled <em>5/6 mile</em> total before collapsing. <em>1/3 mile</em> of that was BEFORE the Beast struck. Muffin needs to know the rest — the distance the woodsman ran <em>after</em> the attack.',
        clueReveal: '1/2 mile after the attack — wounded, terrified, in the dark. That\'s how desperate the encounter was. The Marrowed Man scrawls one more word: "PAINT." Muffin writes it down without yet understanding.',
        question: 'The Marrowed Man ran <em>5/6 mile</em> total. <em>1/3 mile</em> was before the attack. How far did he run <em>after</em>? Solve <em>1/3 + ? = 5/6</em>.',
        answer: '1/2',
        hint: '5/6 − 1/3'
      },

      // Problem 10 — Metric conversion: kg → g
      {
        cluePrompt: 'At the second attack site, Muffin presses his paw into a perfect claw imprint pressed deep in the mud. He weighs the soil load: the imprint took <em>0.6 kg</em> of pressure to form. Constable Stone says the largest forest wolf ever recorded leaves an imprint of about <em>350 g</em>. Muffin needs the same units to compare.',
        clueReveal: '600 grams of pressure — almost <em>twice</em> what the largest forest wolf can produce. Whatever made this print is much heavier than any natural wolf. Or — and Muffin\'s eyes narrow — whatever made it was DRAGGED, weighted, by a person trying to fake the print.',
        question: 'The Beast\'s claw imprint took <em>0.6 kg</em> of pressure. How many <em>grams</em> is 0.6 kg? (1 kg = 1,000 g)',
        answer: 600,
        hint: '0.6 × 1,000'
      },

      // Problem 11 — Three-fraction addition (unlike denominators, sums to 1)
      {
        cluePrompt: 'Through the inn window, Muffin watches the visiting "naturalist," Salvian Crooke, settle his bill. Crooke says he\'s here studying wolf populations. His expense ledger is open on the table, and Muffin gets a glimpse: <em>1/2</em> for "lamp oil," <em>1/3</em> for "ink," <em>1/6</em> for "powder." Muffin needs the total to see whether anything is missing or hidden.',
        clueReveal: 'Exactly 1 — the entire budget accounted for, tidily and suspiciously. No room for room and board, no horse fodder, no food. Either Crooke isn\'t paying for those things… or he is paying with money he didn\'t list. Muffin underlines "powder."',
        question: 'Crooke\'s expenses: <em>1/2 + 1/3 + 1/6</em>. Give your total as a fraction (or whole number if it simplifies).',
        answer: 1,
        hint: '1/2 + 1/3 + 1/6'
      },

      // Problem 12 — Mixed-number subtraction (time math)
      {
        cluePrompt: 'Howell tells Muffin the village watch starts at <em>6¼</em> hours past noon (sundown) and ends at <em>10¾</em> hours past noon (the deepest dark before dawn-watch begins). Muffin needs to know exactly how many hours of darkness the watch is on duty — that is the window in which the Beast hunts.',
        clueReveal: '4½ hours of darkness — that is the killing window. Muffin checks his map. Crooke\'s lodging at the inn looks out directly onto the wood path that all three attack sites bend toward. From his window, in those four and a half hours, Crooke could see anyone going in or out.',
        question: 'The night watch runs from <em>6¼</em> hours past noon to <em>10¾</em> hours past noon. How many <em>hours</em> is that? (Give as a mixed number or fraction.)',
        answer: '9/2',
        hint: '10¾ − 6¼'
      },

      // Problem 13 — Solve for missing fraction (gamekeeper alibi)
      {
        cluePrompt: 'Wendell Skye, the gentle giant of a gamekeeper, hands Muffin his patrol log without being asked. Total patrolled: <em>5/6 mile</em>. Accounted for in his log: <em>2/3 mile</em>. Muffin spots the gap immediately and asks about it. Wendell looks ashamed. "I sat by the brook a while, sir. I wasn\'t looking for a wolf. I was just… tired."',
        clueReveal: '1/6 mile unaccounted for — exactly as Wendell admits. His confession matches his math, and the brook is in the wrong direction from the attack sites. Wendell isn\'t the killer. He\'s just a tired man. Cross him off the list.',
        question: 'Wendell patrolled <em>5/6 mile</em>; <em>2/3 mile</em> is logged. Solve <em>2/3 + ? = 5/6</em>. (Give your answer as a fraction.)',
        answer: '1/6',
        hint: '5/6 − 2/3'
      },

      // ============================================================
      // NIGHT THREE — THE VANISHING
      // ============================================================

      // Problem 14 — Fraction × whole (time pressure)
      {
        cluePrompt: 'Tonight the moon is hidden behind cloud — a 30-minute "moonless gap" in which Muffin can creep into the wood without being seen by whatever stalks it. Howell says he can run safely for only <em>4/5</em> of that gap before the cloud breaks. Muffin needs the safe minutes.',
        clueReveal: '24 minutes — and they\'ll have to count. Muffin lights a shielded lantern, ties his bootlaces tight, and slips into the trees. Behind him, Stone closes the inn door and snuffs every village lamp.',
        question: 'Of the 30-minute moonless gap, <em>4/5</em> is safe to move in. How many minutes?',
        answer: 24,
        hint: '4/5 × 30'
      },

      // Problem 15 — Fraction +/− unlike denominators (paw-print fork)
      {
        cluePrompt: 'Deep in the wood Muffin finds a fork in the trail. Paw prints lead off both ways. The west branch runs <em>1/4 mile</em>; the southwest branch runs <em>5/12 mile</em>. He needs the combined branched length to know how much he might have to track.',
        clueReveal: '8/12, or 2/3 of a mile in branched trail. The Beast — or its handler — has been deliberately splitting trails to confuse pursuers. Muffin chooses the southwest path on a hunch. Twigs snap behind him. He doesn\'t turn around.',
        question: 'Two trail branches: <em>1/4 mile</em> and <em>5/12 mile</em>. Add them: <em>1/4 + 5/12</em>. (Give as a simplified fraction.)',
        answer: '2/3',
        hint: '1/4 + 5/12'
      },

      // Problem 16 — Three-fraction subtraction
      {
        cluePrompt: 'On the southwest branch Muffin discovers a hollow stump containing a leather notebook, locked with a brass clasp. He pries it open. A page of accounts: total budget <em>7/8</em> of "the inheritance share," minus <em>1/4</em> for "supplies," minus <em>1/3</em> for "bribes." Muffin needs to know what remains — what the schemer plans to keep.',
        clueReveal: '7/24 of the inheritance share — kept for the schemer alone. The phrase "the inheritance share" turns Muffin\'s blood cold. This isn\'t a Beast at all. This is about money. About someone\'s family. Muffin pockets the notebook and presses on.',
        question: 'From <em>7/8</em>, subtract <em>1/4</em> and <em>1/3</em>. What is <em>7/8 − 1/4 − 1/3</em>? (Give as a simplified fraction.)',
        answer: '7/24',
        hint: '7/8 − 1/4 − 1/3'
      },

      // Problem 17 — Fraction × fraction
      {
        cluePrompt: 'In the bottom of the notebook Muffin finds a stained recipe: "<em>Take 1/3 of a vial of phosphor-moss dust. Mix with 1/4 oil. The active glow is the product.</em>" Muffin needs to know what fraction of a vial actually glows when smeared on fur.',
        clueReveal: '1/12 of a vial — enough to paint a single dog\'s flanks. <em>That</em> is how the Beast\'s eyes burn in the dark; <em>that</em> is how its hide glows white at the moment villagers see it. Phosphor moss. Mira had a jar of it on her shelf. Someone has been buying it from her — or stealing it.',
        question: 'The recipe says: <em>1/3 of a vial × 1/4 oil = active glow</em>. What is <em>1/3 × 1/4</em>? (Give as a fraction.)',
        answer: '1/12',
        hint: '1/3 × 1/4'
      },

      // Problem 18 — Metric conversion: m → km
      {
        cluePrompt: 'A cave-mouth map is sketched in the back of the notebook. From Hollowmere village square to a hidden entrance: <em>1,750 m</em> through the wood. The Constable\'s only map of the wood is in <em>kilometers</em>. Muffin needs the conversion to find the cave on it.',
        clueReveal: '1.75 kilometers from the square — well past every search the Constable\'s men have run. They\'ve been looking too close. Muffin folds the map. "Wherever Petra is," he murmurs, "she is THERE."',
        question: 'The cave is <em>1,750 m</em> from the village square. How many <em>kilometers</em> is that? (1 km = 1,000 m)',
        answer: 1.75,
        hint: '1,750 ÷ 1,000'
      },

      // Problem 19 — Mixed-number subtraction (alibi)
      {
        cluePrompt: 'Back at the inn before dawn, Muffin checks Crooke\'s alibi. Crooke claims he was at the inn from <em>7¾</em> hours past noon to <em>9⅙</em> hours past noon — but the second attack happened at exactly <em>9</em> hours past noon. Muffin needs the duration of Crooke\'s claimed alibi window.',
        clueReveal: '17/12 hours — about 1 hour and 25 minutes. But the attack happened at hour 9, which is INSIDE that window. The witnesses who supposedly saw Crooke at the inn must be wrong, or paid off, or fabricated. Crooke\'s alibi is a lie.',
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
        cluePrompt: 'At the cave mouth Muffin sees two glowing eyes — and behind them, the SHAPE of a massive hound, its hide painted with phosphor moss. It charges. Muffin must outpace it back to a hollow he passed earlier. The hound covers <em>5/6 mile</em> every <em>1/4 hour</em>. Muffin needs its speed in <em>miles per hour</em> to know whether he can outpace it.',
        clueReveal: 'About 10/3, or 3⅓ miles per hour — fast for a dog, but barely faster than Muffin can run for short bursts. Muffin times his sprint, dives into the hollow, and lets the hound thunder past. From the brush he hears a HUMAN VOICE call the dog back. Crooke. The "Beast" is just a dog.',
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
        answer: 48,
        hint: '11:43 − 10:55'
      },

      // Problem 25 — Multi-step climax (fraction of remainder)
      {
        cluePrompt: 'At the cave mouth, lantern in paw, Muffin confronts Salvian Crooke. The notebook is open between them. "The aunt\'s fortune is <em>3,600 gold</em>," Muffin says. "<em>1/3</em> already promised to your smuggling captain. <em>1/4</em> to a forger. The rest you keep. Show me the math, Crooke." The naturalist\'s face drains of color as Muffin reads the totals aloud.',
        clueReveal: 'Exactly 1,500 gold pieces — Crooke\'s share of a child\'s death. Constable Stone steps from the trees behind him with shackles. Crooke\'s wolfhound, suddenly without its master\'s whistle, simply sits down and licks Muffin\'s paw. The Beast was always just a very loyal dog. Petra runs to Wendell. Mira\'s tincture stays uncorked. The full moon rises on a closed case.',
        question: 'From <em>3,600 gold</em>, subtract <em>1/3</em> (smuggler) and <em>1/4</em> (forger). How many gold pieces does Crooke keep? Calculate <em>3,600 × (1 − 1/3 − 1/4)</em>.',
        answer: 1500,
        hint: '3,600 × 5/12'
      }
    ],
    resolution: 'Salvian Crooke is hauled away in irons before dawn. The wolfhound — gentle without its handler — is taken in by Wendell, who renames her "Moss" and feeds her properly for the first time in months. Petra is wrapped in three blankets and carried home; Mira holds her so tightly she leaves bruises, and is forgiven on the spot. The Marrowed Man hears the news and speaks his first words in weeks: "Told you. Paint." Howell Greaves admits he doubted Muffin and apologizes with a bottle of his finest cider. The villagers unbolt their shutters one by one as the sun rises over Hollowmere Wood, and for the first time in a month, no one is afraid. Muffin tucks his magnifying glass into his hat and tips it to the morning. "There\'s never been a beast in this wood," he says quietly. "Only a man who wanted there to be."',
    defeatMessage: 'The fog thickens, the trail grows cold, and the next full moon rises with Petra still unfound. But Muffin is no quitter. He returns to the inn, lights a fresh candle, smooths out his case notes, and re-reads every clue from the beginning. Hollowmere is still standing. Petra is still alive. And the math, when read carefully, has only ever pointed in one direction.'
  }
];
