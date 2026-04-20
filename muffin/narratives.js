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
      // Problem 1: Crime scene — Powers of 10
      {
        cluePrompt: 'Muffin arrives at Professor Elixworth\'s potion laboratory. The old wizard lies unconscious on the floor, his cauldron still bubbling with a sickly green glow. A dosage logbook sits open on the counter, but the critical entry is smudged. Only part of it is legible: the poison was measured in scientific notation.',
        clueReveal: 'The dosage was exactly 450 milligrams! Muffin notes this in his detective journal. That\'s a very precise amount -- whoever did this knew exactly what they were doing. This was no accident.',
        question: 'The smudged logbook entry reads: "Administered dosage: 4.5 x 10^2 milligrams." What is 4.5 x 10^2 as a plain number?',
        answer: 450,
        hint: '4.5 x 10^2 = 4.5 x 100 = ?'
      },
      // Problem 2: Ingredient shelves — Metric conversion (mg to g)
      {
        cluePrompt: 'Muffin climbs a stepladder to examine the ingredient shelves. Hundreds of jars line the walls, each labeled in careful handwriting. One jar catches his eye: "Nightshade Extract" -- a powerful toxin in the wrong hands. The jar\'s label shows the contents in milligrams, but the professor\'s recipe cards are all written in grams.',
        clueReveal: 'The Nightshade Extract jar is missing exactly 2.5 grams -- precisely enough for the poison dosage plus the binding agent. Someone measured this with laboratory precision, not a hasty grab.',
        question: 'The Nightshade Extract jar originally held 5,000 mg. After the theft, it holds 2,500 mg. How many grams of Nightshade were taken? (Hint: 1 g = 1,000 mg)',
        answer: 2.5,
        hint: '2,500 mg / 1,000 = ? g'
      },
      // Problem 3: Delivery logbook — Metric conversion (kg to g)
      {
        cluePrompt: 'Muffin opens the delivery logbook on the professor\'s desk. The most recent entry is from Luna Starwell, the professor\'s regular courier. She delivered a shipment of Moonstone Powder yesterday. The delivery is recorded in kilograms, but the lab inventory tracks everything in grams.',
        clueReveal: 'Luna delivered 750 grams of Moonstone Powder, but the lab inventory shows only 680 grams were shelved. That means 70 grams are unaccounted for. Where did the missing powder go?',
        question: 'Luna\'s delivery receipt shows she brought 0.75 kg of Moonstone Powder. How many grams is that? (Hint: 1 kg = 1,000 g)',
        answer: 750,
        hint: '0.75 x 1,000 = ? g'
      },
      // Problem 4: Interview Vera — Metric conversion (mL to L)
      {
        cluePrompt: 'Muffin interviews Vera Vex, the professor\'s ambitious apprentice. She\'s nervous but cooperative, claiming she spent all morning measuring purified water for practice potions. Her workbench is covered in graduated cylinders and beakers, all meticulously labeled.',
        clueReveal: 'Vera used 3.2 liters of water -- that matches exactly with a standard Healing Tonic recipe. Muffin cross-checks the recipe book: she\'s telling the truth about what she was brewing. But Vera also mentions something interesting: Barnaby Thornwick visited the lab yesterday evening, "dropping off a gift for the professor."',
        question: 'Vera\'s workbench log shows she used exactly 3,200 mL of purified water. How many liters is that? (Hint: 1 L = 1,000 mL)',
        answer: 3.2,
        hint: '3,200 / 1,000 = ? L'
      },
      // Problem 5: Interview Barnaby — Powers of 10
      {
        cluePrompt: 'Muffin visits Barnaby Thornwick\'s rival potion shop across town. The shop is darker and more cluttered than the professor\'s immaculate lab. Barnaby claims he was simply restocking supplies and has receipts to prove it. But one order stands out: a suspiciously large purchase of rare ingredients.',
        clueReveal: 'Barnaby spent 350 gold coins on a massive order! That\'s far more than a small rival shop would normally need. When Muffin asks about it, Barnaby stammers: "I... was planning to expand." His eyes dart to a locked cabinet behind the counter.',
        question: 'Barnaby\'s receipt shows he ordered 10^3 empty vials at 0.35 gold coins each. How much did he spend in total? (Remember: 10^3 = 1,000)',
        answer: 350,
        hint: '1,000 x 0.35 = ?'
      },
      // Problem 6: Interview Luna — Multi-step metric conversion
      {
        cluePrompt: 'Muffin tracks down Luna Starwell at the courier depot. She\'s a cheerful, honest woman who has delivered for the professor for years. She provides her full route log from yesterday, which Muffin needs to verify her alibi. If her distances check out, she couldn\'t have been at the lab when the poisoning happened.',
        clueReveal: 'Luna\'s total route was 4.3 km, and the time stamps prove she was at the harbor during the poisoning window. Her alibi is solid -- she\'s innocent! But she reveals one crucial detail: Barnaby asked her to deliver a special "congratulatory potion" to the professor as a gift. She had no idea what was inside.',
        question: 'Luna\'s route went from the harbor to the market (2.5 km), then from the market to the professor\'s lab (1,800 meters further). What was her total route distance in kilometers? (Hint: 1 km = 1,000 m)',
        answer: 4.3,
        hint: '2.5 + (1,800 / 1,000) = ?'
      },
      // Problem 7: Professor's study — Common denominators intro
      {
        cluePrompt: 'In the professor\'s private study, Muffin discovers a hidden formula tucked inside an ancient book. It\'s the recipe for a Universal Antidote -- exactly what\'s needed to save the professor! But the recipe uses fractions with different denominators, and Muffin needs to find a common denominator to measure the ingredients properly.',
        clueReveal: 'With a common denominator of 12, Muffin can measure the fractions accurately! The recipe calls for 4/12 of a vial of Starlight Essence and 3/12 of a vial of Dragon Tear. Muffin begins preparing the antidote. Now he just needs to identify the exact poison to calibrate the cure.',
        question: 'The antidote recipe calls for 1/3 of a vial of Starlight Essence and 1/4 of a vial of Dragon Tear. To measure these accurately, Muffin needs a common denominator. What is the least common denominator of 3 and 4?',
        answer: 12,
        hint: 'Multiples of 3: 3, 6, 9, 12... Multiples of 4: 4, 8, 12...'
      },
      // Problem 8: Potion analysis — Metric conversion (g to mg)
      {
        cluePrompt: 'Muffin brings a sample of the "gift potion" from Barnaby to the analysis room. Using the professor\'s precision equipment, he measures the concentration of Nightshade Extract in the liquid. The reading comes back in grams, but he needs it in milligrams to compare with the dosage from the logbook.',
        clueReveal: 'The concentration is exactly 45 milligrams per dose -- and the "gift potion" contained exactly 10 doses. That means the total Nightshade in Barnaby\'s gift was 450 mg -- the EXACT amount from the dosage logbook! The pieces are falling into place.',
        question: 'The analysis equipment reads a Nightshade concentration of 0.045 grams per dose. How many milligrams is 0.045 grams? (Hint: 1 g = 1,000 mg)',
        answer: 45,
        hint: '0.045 x 1,000 = ? mg'
      },
      // Problem 9: The confrontation — Powers of 10 (final proof)
      {
        cluePrompt: 'Muffin returns to Barnaby\'s shop with all the evidence. He lays it out: the delivery, the dosage, the Nightshade match. Barnaby\'s face goes pale. "You can\'t prove anything!" he sputters. But Muffin has one final calculation -- the critical link between the stolen Nightshade and the exact dosage found in the professor\'s system.',
        clueReveal: 'The answer is 45 -- exactly matching the analysis! Barnaby\'s "gift potion" contained precisely 4.5 x 10^1 mg of Nightshade per dose, and the professor drank 10 doses over two days. The math is irrefutable. Barnaby slumps in his chair. "He was going to put me out of business," he whispers. "His new formula would have made my potions worthless..."',
        question: 'The critical evidence: the poison contained 4.5 x 10^1 mg of Nightshade per dose. What is 4.5 x 10^1 as a plain number?',
        answer: 45,
        hint: '4.5 x 10^1 = 4.5 x 10 = ?'
      }
    ],
    resolution: 'Barnaby Thornwick confesses to everything. Jealous of the professor\'s genius, he laced a "congratulatory gift potion" with precise doses of Nightshade Extract and had Luna deliver it unknowingly. Muffin administers the Universal Antidote, and Professor Elixworth\'s eyes flutter open. "My lab..." he croaks. "Is my lab okay?" Vera rushes to his side, tears in her eyes. The professor smiles weakly. "Vera, I think it\'s time I made you a full partner." The city guard leads Barnaby away. Luna is cleared of all suspicion. And Muffin? He tucks his magnifying glass into his detective hat, accepts a warm cup of chamomile tea, and heads home for a well-deserved nap.',
    defeatMessage: 'The antidote window is closing fast, and Muffin can\'t crack the clues in time! But Professor Elixworth is a tough old wizard -- he\'ll hold on a little longer. Muffin takes a deep breath, straightens his detective hat, and starts the investigation from the top. No potion master goes unsaved on his watch.'
  }
];
