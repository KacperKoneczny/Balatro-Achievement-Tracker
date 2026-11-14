// The information shown in the popup for each achievement.
// The order matches the order of the buttons in index.html:
// the first entry belongs to the first button, the second to the second, and so on.
// Descriptions and rewards come from https://balatrowiki.org/w/Achievements
// ("Shared Unlock" on the wiki is what we call the reward).
// "reward: null" means nothing else unlocks with this achievement.
// Tips were written from community guides on Steam, TrueAchievements, PSNProfiles
// and Answers for Gamers, plus general Balatro knowledge.
var achievements = [
    { name: "Ante Up!", description: "Reach Ante 4.", tip: "This comes with normal play. Beat the Boss Blind of Ante 3 and you're there.", reward: "Showman (Joker)" },
    { name: "Ante Upper!", description: "Reach Ante 8.", tip: "Pick one poker hand, level it up with Planet cards and add Jokers that boost Mult.", reward: "Flower Pot (Joker)" },
    { name: "Heads Up", description: "Win a run.", tip: "Beat the Ante 8 Boss Blind. Stick to one hand type and look for Jokers that multiply Mult (xMult).", reward: "Blueprint (Joker)" },
    { name: "Low Stakes", description: "Win a run on at least Red Stake difficulty.", tip: "Red Stake unlocks after you win on White Stake. Stakes unlock per Deck, so keep using a Deck you're good with.", reward: "Zodiac Deck" },
    { name: "Mid Stakes", description: "Win a run on at least Black Stake difficulty.", tip: "Keep climbing the stakes with the same Deck. Watch out for Eternal Jokers, which can't be sold.", reward: "Anaglyph Deck" },
    { name: "High Stakes", description: "Win a run on at least Gold Stake difficulty.", tip: "Gold Stake is the hardest. Use your strongest Deck and make sure you have xMult Jokers by the late Antes.", reward: null },
    { name: "Card Player", description: "Play at least 2500 cards.", tip: "This counts across all your runs, so it happens over time. Playing 5 cards per hand speeds it up.", reward: "Nacho Tong (Voucher)" },
    { name: "Card Discarder", description: "Discard at least 2500 cards.", tip: "This counts across all your runs. Use every discard each round, 5 cards at a time. Red Deck gives an extra discard.", reward: "Recyclomancy (Voucher)" },
    { name: "Nest Egg", description: "Have $400 or more during a single run.", tip: "Interest is capped at $5 a round unless you buy the Seed Money or Money Tree Vouchers. The Hermit Tarot and money Jokers like To the Moon help too.", reward: "Satellite (Joker)" },
    { name: "Flushed", description: "Play a Flush with 5 Wild cards.", tip: "The Lovers Tarot turns a card into a Wild card. Collect 5 of them, draw them together and play them as a Flush.", reward: null },
    { name: "Speedrunner", description: "Win a run in 12 or fewer rounds.", tip: "You have to skip blinds, about half of them. Get a strong build early. Checkered Deck makes Flushes easy.", reward: "Merry Andy (Joker)" },
    { name: "ROI", description: "Buy 5 Vouchers by Ante 4.", tip: "Shops usually offer one Voucher per Ante, so skip blinds to collect Voucher Tags. Yellow Deck's extra $10 helps you afford them.", reward: null },
    { name: "Shattered", description: "Break 2 Glass cards in a single hand.", tip: "Make Glass cards with the Justice Tarot and play several in one hand. Oops! All 6s doubles their 1 in 4 chance to break.", reward: null },
    { name: "Royale", description: "Play a Royal Flush.", tip: "Play A, K, Q, J and 10 of one suit. Use suit-changing Tarots (Star, Moon, Sun, World) to get the cards you need.", reward: null },
    { name: "Retrograde", description: "Get any poker hand to level 10.", tip: "Focus on one hand and use its Planet card. The Telescope Voucher, Blue Seals and Space Joker give you more levels.", reward: null },
    { name: "10K", description: "Score 10,000 Chips in a single hand.", tip: "This usually happens by the middle Antes in a decent run. Level up one hand and add a couple of Mult Jokers.", reward: "Oops! All 6s (Joker)" },
    { name: "1,000K", description: "Score 1,000,000 Chips in a single hand.", tip: "You'll need xMult Jokers. If your run is strong, keep playing in Endless Mode after you win.", reward: "The Idol (Joker)" },
    { name: "100,000K", description: "Score 100,000,000 Chips in a single hand.", tip: "This needs Endless Mode and a build that scales hard. Look for retriggers and copy Jokers like Blueprint and Brainstorm.", reward: "Stuntman (Joker)" },
    { name: "Tiny Hands", description: "Thin your deck down to 20 or fewer cards.", tip: "Use the Abandoned Deck (40 cards, unlocked by winning with the Green Deck). Destroy cards with The Hanged Man Tarot and the Immolate Spectral card.", reward: null },
    { name: "Big Hands", description: "Have 80 or more cards in your deck.", tip: "Add cards with Standard Packs, Certificate, Marble Joker, DNA and the Cryptid Spectral card. Copying Certificate or Marble with Blueprint doubles the gain.", reward: null },
    { name: "You Get What You Get", description: "Win a run without rerolling the shop.", tip: "Don't press Reroll in the shop for a whole winning run. Try it on any run you think you can win.", reward: null },
    { name: "Rule Bender", description: "Complete any Challenge run.", tip: "Challenges unlock after you've won with several different Decks. Start with one that suits how you like to play.", reward: null },
    { name: "Rule Breaker", description: "Complete every Challenge run.", tip: "Win every Challenge. Read each one's rules first and plan a build around them.", reward: null },
    { name: "Legendary", description: "Discover a Legendary Joker.", tip: "The Soul Spectral card creates a Legendary Joker. Ghost Deck lets Spectral cards appear in the shop.", reward: null },
    { name: "Astronomy", description: "Discover every Planet card.", tip: "The secret Planets only show up after you play Five of a Kind, Flush House and Flush Five. Use Cryptid and suit Tarots to make those hands.", reward: "Astronomer (Joker)" },
    { name: "Cartomancy", description: "Discover every Tarot card.", tip: "Open lots of Arcana Packs. Discoveries carry over between runs, so this adds up over time.", reward: "Cartomancer (Joker)" },
    { name: "Clairvoyance", description: "Discover every Spectral card.", tip: "The Soul and Black Hole are the rare ones. Ghost Deck and the Seance Joker give you more Spectral cards.", reward: null },
    { name: "Extreme Couponer", description: "Discover every Voucher.", tip: "Upgraded Vouchers only show up after you buy the base one. Buy every Voucher you can and skip blinds for Voucher Tags.", reward: null },
    { name: "Completionist", description: "Discover 100% of your collection.", tip: "Check the Collection screen to see what you're missing, then play Decks and buy packs that can give you those items.", reward: null },
    { name: "Completionist+", description: "Win with every Deck on Gold Stake difficulty.", tip: "Win on Gold Stake with all 15 Decks. It's a long grind, so start with the Decks you're best at.", reward: null },
    { name: "Completionist++", description: "Earn a Gold Sticker on every Joker.", tip: "A Joker gets a Gold Sticker when you win a Gold Stake run with it. Hold as many unstickered Jokers as you can when you win.", reward: null }
];
