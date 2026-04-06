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
  }
];
