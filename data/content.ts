/**
 * ✏️  EDIT ME!
 *
 * Every piece of text in the app lives in this file, so you can personalise
 * everything without touching any component code.
 *
 * Anything in [SQUARE BRACKETS] is a placeholder. Search for "[" before you
 * send the link to make sure you've replaced them all.
 */

// ---------------------------------------------------------------------------
// Names: change these once and they're used everywhere below.
// ---------------------------------------------------------------------------

export const HER_NAME = "Coco";
export const NICKNAME = "Coco"; // change if you have a cuter nickname for her
export const MY_NAME = "";

// ---------------------------------------------------------------------------
// Types (you shouldn't need to change these)
// ---------------------------------------------------------------------------

/** One multiple-choice option. */
export type Answer = {
  text: string;
  /** Is this a right answer? For "silly" and "honest" questions, make them all `true`. */
  correct: boolean;
  /** Optional reaction for this specific answer (overrides the question's `reaction`). */
  reaction?: string;
  /** Optional hint for this specific wrong answer (overrides the question's `hint`). */
  hint?: string;
};

export type Question = {
  /**
   * - "memory": one right answer; wrong picks wiggle and show a hint so she can retry.
   * - "silly":  every answer is right.
   * - "honest": every answer is right, and picking one reveals `message`.
   */
  kind: "memory" | "silly" | "honest";
  emoji: string;
  question: string;
  answers: Answer[];
  /** Shown after a right answer (unless the answer has its own `reaction`). */
  reaction: string;
  /** Shown after a wrong answer (unless the answer has its own `hint`). */
  hint?: string;
  /** "honest" questions only: the sincere note that appears after she answers. */
  message?: string;
};

// ---------------------------------------------------------------------------
// 1. Landing screen
// ---------------------------------------------------------------------------

export const landing = {
  eyebrow: "A little something for",
  /** Shown huge, in the script font. */
  name: HER_NAME,
  title: `I made something for you 🥺`,
  subtitle: "Please read till the end. Take your time 💕",
  startButton: "Start",
};

// ---------------------------------------------------------------------------
// 2. Step-by-step messages (one per screen, before anything else)
//    Add, remove or rewrite freely; they're shown in this order.
// ---------------------------------------------------------------------------

export type StoryStep = {
  emoji: string;
  /** Short line in the big script font. */
  title: string;
  /** The message itself. */
  text: string;
  /** Button label for this step (defaults to "Continue"). */
  button?: string;
};

export const story: StoryStep[] = [
  {
    emoji: "🥺",
    title: `${NICKNAME}…`,
    text: "I know you're upset with me right now. And you have every right to be.",
  },
  {
    emoji: "🙇",
    title: "It's all on me",
    text: "Everything that happened is my fault. Not yours. No excuses, no “but”. I own it, completely.",
  },
  {
    emoji: "✨",
    title: "Beyond my imagination",
    text: "What you have done for me is beyond my imagination. You've loved me, cared for me and stood by me, even on the days I didn't deserve it.",
  },
  {
    emoji: "💗",
    title: "Always",
    text: "And no matter what happens, I will always love you. Today, tomorrow, and every single day after that.",
  },
  {
    emoji: "💍",
    title: "So…",
    text: "I have one very important question to ask you.",
    button: "Ask me 🥺",
  },
];

/** Small bits of text used on the message screens. */
export const storyUi = {
  continueButton: "Continue",
};

// ---------------------------------------------------------------------------
// 3. The proposal: Yes goes to the quiz, No can never be clicked
// ---------------------------------------------------------------------------

export const proposal = {
  eyebrow: "The most important question",
  emoji: "💍",
  question: "Will You Marry Me?",
  yesButton: "Yes 💍",
  /** The No button's label; it changes every time it runs away (and loops). */
  noButtonLabels: ["No", "Nope, wrong button 🙈", "Try again 😌", "Not an option 💕", "Nice try 😜"],
};

// ---------------------------------------------------------------------------
// 4. Questions (add, remove or reorder freely; 6–8 works best)
// ---------------------------------------------------------------------------

export const questions: Question[] = [
  {
    kind: "memory",
    emoji: "📍",
    question: "Let's start easy… where did we first meet?",
    answers: [
      { text: "Nehru park", correct: true },
      { text: "Fighting over the last mango at the store 🥭", correct: false },
      {
        text: "On the moon 🌙",
        correct: false,
        hint: "Romantic, but no. Think a little closer to Earth 🌍",
      },
      { text: "In a dream (okay, maybe)", correct: false },
    ],
    reaction: "You remember! 😭💕",
    hint: "Hmm, not quite… think back to the very first time 👀",
  },
  {
    kind: "silly",
    emoji: "🥰",
    question: "On a scale of 1 to 10, how cute are you?",
    answers: [
      { text: "10", correct: false, reaction: "Correct. Scientifically proven 🧪💕" },
      { text: "11", correct: false, reaction: "Also correct. You broke the scale 📈" },
      { text: "Infinity", correct: true, reaction: "The most correct answer ever given ✨" },
      {
        text: "I'm mad, so… 3",
        correct: false,
        reaction: "Still a 10. Even when you're mad at me 🥹",
      },
    ],
    reaction: "Correct! 💕",
  },
  {
    kind: "memory",
    emoji: "🍝",
    question: "What was our first date?",
    answers: [
      { text: "Went to Goll guppe stall 🪂", correct: false },
      { text: "We went to Bhojpur Temple", correct: true },
      {
        text: "A 5-course dinner in Indore",
        correct: false,
        hint: "I wish I'd been that smooth 😅 Try again!",
      },
      { text: "Watching ludo movie 🎨", correct: false },
    ],
    reaction: "You remember it too 🥹 Best day.",
    hint: "Nope! Think simpler… 😌",
  },
  {
    kind: "silly",
    emoji: "🫵",
    question: "Who is the bigger idiot in this relationship right now?",
    answers: [
      { text: "Aadi", correct: true },
      { text: `Aditya singh Tomar, obviously`, correct: true },
      { text: `Definitely Aditya`, correct: true },
      { text: "Whoever made this quiz", correct: true },
    ],
    reaction: "Correct. I accept my title 👑🤡",
  },
  {
    kind: "memory",
    emoji: "🍕",
    question: "Which food is guaranteed to make you smile?",
    answers: [
      {
        text: "Plain boiled broccoli 🥦",
        correct: false,
        hint: "Lol no. You'd never forgive me twice 😂",
      },
      { text: "Whatever I cook (it's usually very bad)", correct: false },
      {
        text: "Daal peetha",
        correct: true,
        reaction: "Already planning to bring you some 🛵💕",
      },
      { text: "momos 📦", correct: true },
    ],
    reaction: "I pay attention, I promise 🥺",
    hint: "Hmm… nope! Think of your happy food 😋",
  },
  {
    kind: "memory",
    emoji: "😂",
    question: "Finish our inside joke: “I am your 'OH!' you are my 'YEAH'.. ",
    answers: [
      { text: "Knock knock 🚪", correct: false },
      { text: "Why did the chicken cross the road? 🐔", correct: false },
      { text: "Together we are 'OH! YEAH'", correct: true },
      { text: "I have no idea what you're talking about 🙈", correct: false },
    ],
    reaction: "HAHA you get it 😭 Only we get it.",
    hint: "Nope 😂 Think of the one that always cracks us up",
  },
  {
    kind: "honest",
    emoji: "🥺",
    question: `Okay, real question… what did Aadi do wrong?`,
    answers: [
      { text: "He didn't listen to me", correct: true },
      { text: "He hurt my feelings", correct: true },
      { text: "He know exactly what you did 😤", correct: true },
      { text: "All of the above", correct: true },
    ],
    reaction: "You're right.",
    // Make this specific to what actually happened. It's the most important line here.
    message:
      "[A SHORT, SINCERE NOTE: e.g. “You didn't deserve that. I'm not going to make excuses. I hear you, and I'm sorry.”]",
  },
  {
    kind: "silly",
    emoji: "⚖️",
    question: "What should my punishment be?",
    answers: [
      {
        text: "Unlimited snacks, delivered on demand 🍫",
        correct: true,
        reaction: "Deal. Snack butler reporting for duty 🫡",
      },
      {
        text: "Foot massages for a week 💆‍♀️",
        correct: true,
        reaction: "Accepted. My hands are ready 🙌",
      },
      {
        text: "You pick every movie for a month 🎬",
        correct: true,
        reaction: "Fair. Even the sad ones. I'll bring tissues 🥲",
      },
      {
        text: "All of the above",
        correct: true,
        reaction: "Honestly? Worth it if you smile 💕",
      },
    ],
    reaction: "Deal 🤝",
  },
];

/** Small bits of text used on the question screens. */
export const quizUi = {
  nextButton: "Next 💌",
  /** Shown instead of `nextButton` on the last question. */
  finishButton: "One more thing… 💌",
  noteFrom: `A note from ${MY_NAME}`,
};

// ---------------------------------------------------------------------------
// 5. Apology letter (typed out with a typewriter effect)
// ---------------------------------------------------------------------------

export const letter = {
  eyebrow: "From my heart",
  title: "A Little Letter",
  greeting: `Dear ${HER_NAME},`,
  // Write 3–5 sentences in your own words. Each string is its own paragraph.
  // Be specific about what you did. Honesty lands better than poetry.
  paragraphs: [
    "I'm really sorry for [WHAT I DID, BE SPECIFIC]. I understand why you're hurt: [WHY IT HURT YOU, IN YOUR OWN WORDS], and you didn't deserve that.",
    "From now on, I'm going to [WHAT YOU'LL DO DIFFERENTLY, SOMETHING CONCRETE]. You matter to me so much more than being right.",
  ],
  signOff: "Love you always,",
  /** Written in the script font once the letter finishes typing. */
  signature: MY_NAME,
  skipButton: "Skip ⏩",
  continueButton: "Continue 💖",
};

// ---------------------------------------------------------------------------
// 6. Final question
// ---------------------------------------------------------------------------

export const finalQuestion = {
  eyebrow: "One last question",
  emoji: "🥺",
  question: "Will You Forgive Me?",
  yesButton: "Yes 💖",
  /**
   * The "No" button's label before each dodge. It dodges once per label,
   * so 5 labels = 5 dodges before it gives up.
   */
  noButtonLabels: ["No", "Are you sure? 🥺", "Pretty please? 🙏", "Think again 😢", "Last chance… 🥹"],
  /** What the "No" button turns into once it gives up. */
  giveUpLabel: "Okay fine, yes 💖",
};

// ---------------------------------------------------------------------------
// 7. Celebration screen
// ---------------------------------------------------------------------------

export const celebration = {
  eyebrow: "You said yes",
  title: "Best Girlfriend Ever",
  message: `Thank you, ${NICKNAME}. I love you so much 🥰`,
  /** Put a photo at /public/us.jpg. If the file isn't there, the photo is simply hidden. */
  photo: "/us.jpg" as string | null,
  photoAlt: `${HER_NAME} and ${MY_NAME}`,
  photoCaption: "us 💕",
  playAgainButton: "Play again 🔁",
};

// ---------------------------------------------------------------------------
// Extras
// ---------------------------------------------------------------------------

/**
 * Optional background music. Put a file at /public/music.mp3; if it's missing,
 * the music button doesn't appear. It starts playing automatically (or on her
 * first tap, if the browser blocks autoplay) and the button turns it off.
 */
export const music = {
  src: "/music.mp3" as string | null,
};

/** Browser tab title and link-preview description. */
export const meta = {
  title: `For ${NICKNAME} 💌`,
  description: "I made something for you.",
};
