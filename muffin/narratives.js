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
        answer: 12
      },
      // Problem 11 — Mixing the antidote: Apply LCD to add fractions
      {
        cluePrompt: 'With the common denominator found, Muffin converts both fractions: 1/3 becomes 4/12, and 1/4 becomes 3/12. Now he can add them to find the exact total amount of liquid the antidote requires. He must get this right — too little won\'t work, and too much could cause new problems.',
        clueReveal: 'The antidote requires 7/12 of a vial total — Muffin measures it out with surgical precision. The liquid shimmers gold as the two ingredients combine. He holds it up to the candlelight: it\'s perfect. Now he just needs to confirm the exact poison to finish the calibration.',
        question: 'Muffin converts the fractions: 1/3 = 4/12, and 1/4 = 3/12. When he adds 4/12 + 3/12, the answer is ?/12. What is the numerator (the top number)?',
        answer: 7,
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
      // Problem 13 — The confrontation: Powers of 10 (final proof, 10¹)
      {
        cluePrompt: 'Muffin confronts Barnaby with everything: the Nightshade order, the Starfire Crystal, the Shadowmoss, Luna\'s testimony, and the gift potion analysis. Barnaby\'s face drains of color. "You can\'t prove it was me!" he snarls. But Muffin has one final calculation — the number that seals the case and matches the dosage log perfectly.',
        clueReveal: '45 milligrams per dose — identical to 4.5 × 10¹. The numbers match perfectly, down to the milligram. Barnaby\'s chair scrapes as he slumps back. "He was going to publish a formula that would make my potions obsolete," he whispers. "I panicked. I never meant for it to go this far..."',
        question: 'Final proof: the gift potion contained 4.5 × 10<sup>1</sup> mg of Nightshade per dose. What is 4.5 × 10<sup>1</sup> as a plain number?',
        answer: 45,
        hint: '4.5 × 10<sup>1</sup>'
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

      // Problem 3 — Fraction → decimal (3/4)
      {
        cluePrompt: 'Tucked inside the day\'s receipts, Muffin finds a handwritten slip in unfamiliar script: <em>"paid 3/4 ounce of gold dust."</em> The Mint\'s official ledger records everything in decimals only — no fractions. To find the matching entry, Muffin must convert.',
        clueReveal: 'Exactly 0.75 ounces — and the decimal ledger shows a 0.75-ounce payment logged to a name Muffin doesn\'t recognize. The receipt and the ledger line up only if you can switch between fractions and decimals. The forger was counting on someone missing that bridge.',
        question: 'Convert <em>3/4</em> to a decimal.',
        answer: 0.75,
        hint: '3/4'
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

      // Problem 6 — Decimal → fraction (0.25)
      {
        cluePrompt: 'Muffin interviews Master Scribe Cora, who swears the ledger was locked and spotless when she left last night. She produces a private memo signed by the Appraiser: <em>"0.25 ounces diverted per batch for purity testing."</em> Twelve batches passed through the Mint this week. But official purity tests are supposed to be logged as <em>fractions</em>, not decimals.',
        clueReveal: '1/4 ounce — and the fraction-only purity log shows zero entries of 1/4 ounce this week. The Appraiser wrote in decimals because he knew the purity log would never catch a decimal. Cora is cleared. She just never knew the cipher existed.',
        question: 'Convert <em>0.25</em> to a fraction in simplest form.',
        answer: '1/4',
        hint: '0.25'
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

      // Problem 11 — Final proof: 0.375 × 1200
      {
        cluePrompt: 'The Mint has received 1,200 ounces of gold over the past month. If Ambrose siphoned exactly 0.375 of every shipment, Muffin can calculate the weight of his secret stash <em>exactly</em>. Whatever number he gets should match the weight of the mystery crate locked in Ambrose\'s east-cellar workshop.',
        clueReveal: 'Exactly 450 ounces. Muffin and the royal guards force open the east cellar — and there, neatly stacked and labeled "Personal — Do Not Open," sits a crate. On the Mint\'s own scales it weighs <em>precisely 450 ounces</em>. The math is airtight. Place value, estimation, fractions and decimals, all pointing to the same pile of stolen gold. Appraiser Ambrose is arrested on the spot.',
        question: 'Calculate <em>0.375 × 1,200</em>.',
        answer: 450,
        hint: '0.375 × 1,200'
      }
    ],
    resolution: 'Appraiser Ambrose confesses with a long sigh. For months he\'d shifted decimal points on the Royal Scales, hidden diversions inside fraction/decimal cipher switches, and padded the ledger with expanded-form codes only a Mint worker could read. The crown clears the Mint Master of all wrongdoing and reinstates Master Scribe Cora with a formal apology. Apprentice Pip is promoted to Junior Appraiser for his sharp eye. Muffin politely declines the gold reward but does accept a single warm honey-cake from the Mint\'s kitchen. As he ambles home, magnifying glass tucked into his detective hat, he mutters to himself, "You can shift a decimal point, but the math always tells the truth."',
    defeatMessage: 'The ledger\'s tricks are slippery tonight, and Muffin can\'t pin down the forger in time! But the crooked coin is still sitting in Ambrose\'s east cellar, and the numbers haven\'t changed. Muffin straightens his hat, polishes his magnifying glass, and reopens the case file. A good detective never lets a decimal point fool him twice.'
  }
];
