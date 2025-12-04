"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Question = {
  level: "easy" | "medium" | "hard";
  question: string;
  hint: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  // Easy
  {
    level: "easy",
    question: "What is the main ingredient in *adobo*?",
    hint: "It’s a staple grain in Filipino cuisine.",
    options: ["Rice", "Pasta", "Bread", "Noodles"],
    answer: "Rice",
  },
  {
    level: "easy",
    question: "Which fruit is used to make *sinigang* broth?",
    hint: "It’s a sour fruit that’s also a popular snack.",
    options: ["Lemon", "Tamarind", "Orange", "Apple"],
    answer: "Tamarind",
  },
  {
    level: "easy",
    question: "What is *halo-halo* primarily made of?",
    hint: "It’s a sweet, shaved ice dessert.",
    options: ["Ice cream", "Shaved ice", "Chocolate", "Fruit juice"],
    answer: "Shaved ice",
  },
  {
    level: "easy",
    question: "Which protein is used in *lechon*?",
    hint: "It’s a whole animal that’s roasted.",
    options: ["Chicken", "Pork", "Beef", "Fish"],
    answer: "Pork",
  },
  {
    level: "easy",
    question: "What is the main ingredient in *pancit*?",
    hint: "It’s a type of noodle.",
    options: ["Rice noodles", "Wheat noodles", "Rice", "Pasta"],
    answer: "Rice noodles",
  },
  {
    level: "easy",
    question: "Which vegetable is used in *pinakbet*?",
    hint: "It’s a leafy green that’s also a popular salad.",
    options: ["Kale", "Spinach", "Bok choy", "Okra"],
    answer: "Spinach",
  },
  {
    level: "easy",
    question: "What is *buko pandan* made from?",
    hint: "It’s a young coconut.",
    options: ["Coconut milk", "Coconut flesh", "Coconut water", "Coconut oil"],
    answer: "Coconut water",
  },
  {
    level: "easy",
    question: "Which fruit is used in *sago't gulaman*?",
    hint: "It’s a sweet, chewy jelly.",
    options: ["Gum", "Gelatin", "Pudding", "Jelly"],
    answer: "Gelatin",
  },
  {
    level: "easy",
    question: "What is the main ingredient in *kare-kare*?",
    hint: "It’s a thick, savory sauce.",
    options: ["Peanut sauce", "Soy sauce", "Fish sauce", "Vinegar"],
    answer: "Peanut sauce",
  },
  {
    level: "easy",
    question: "Which fruit is used in *suman*?",
    hint: "It’s a sticky, sweet rice cake.",
    options: ["Rice", "Corn", "Wheat", "Barley"],
    answer: "Rice",
  },

  // Medium
  {
    level: "medium",
    question: "What is the main ingredient in *bicol express*?",
    hint: "It’s a spicy, creamy sauce.",
    options: ["Coconut milk", "Tomato sauce", "Soy sauce", "Vinegar"],
    answer: "Coconut milk",
  },
  {
    level: "medium",
    question: "Which protein is used in *tortang talong*?",
    hint: "It’s a vegetable that’s also a popular snack.",
    options: ["Egg", "Fish", "Pork", "Chicken"],
    answer: "Egg",
  },
  {
    level: "medium",
    question: "What is *lumpia* typically wrapped in?",
    hint: "It’s a thin, flat pastry.",
    options: ["Pancake", "Spring roll wrapper", "Noodle sheet", "Rice paper"],
    answer: "Spring roll wrapper",
  },
  {
    level: "medium",
    question: "Which fruit is used in *buko pandan*?",
    hint: "It’s a young coconut.",
    options: ["Coconut water", "Coconut flesh", "Coconut milk", "Coconut oil"],
    answer: "Coconut water",
  },
  {
    level: "medium",
    question: "What is the main ingredient in *sinigang na baboy*?",
    hint: "It’s a sour soup with pork.",
    options: ["Pork", "Chicken", "Fish", "Beef"],
    answer: "Pork",
  },
  {
    level: "medium",
    question: "Which vegetable is used in *pinakbet*?",
    hint: "It’s a leafy green that’s also a popular salad.",
    options: ["Kale", "Spinach", "Bok choy", "Okra"],
    answer: "Spinach",
  },
  {
    level: "medium",
    question: "What is *halo-halo* primarily made of?",
    hint: "It’s a sweet, shaved ice dessert.",
    options: ["Ice cream", "Shaved ice", "Chocolate", "Fruit juice"],
    answer: "Shaved ice",
  },
  {
    level: "medium",
    question: "Which protein is used in *lechon*?",
    hint: "It’s a whole animal that’s roasted.",
    options: ["Chicken", "Pork", "Beef", "Fish"],
    answer: "Pork",
  },
  {
    level: "medium",
    question: "What is the main ingredient in *pancit*?",
    hint: "It’s a type of noodle.",
    options: ["Rice noodles", "Wheat noodles", "Rice", "Pasta"],
    answer: "Rice noodles",
  },
  {
    level: "medium",
    question: "Which fruit is used in *sago't gulaman*?",
    hint: "It’s a sweet, chewy jelly.",
    options: ["Gum", "Gelatin", "Pudding", "Jelly"],
    answer: "Gelatin",
  },

  // Hard
  {
    level: "hard",
    question: "What is the main ingredient in *kare-kare*?",
    hint: "It’s a thick, savory sauce.",
    options: ["Peanut sauce", "Soy sauce", "Fish sauce", "Vinegar"],
    answer: "Peanut sauce",
  },
  {
    level: "hard",
    question: "Which fruit is used in *sinigang* broth?",
    hint: "It’s a sour fruit that’s also a popular snack.",
    options: ["Lemon", "Tamarind", "Orange", "Apple"],
    answer: "Tamarind",
  },
  {
    level: "hard",
    question: "What is *halo-halo* primarily made of?",
    hint: "It’s a sweet, shaved ice dessert.",
    options: ["Ice cream", "Shaved ice", "Chocolate", "Fruit juice"],
    answer: "Shaved ice",
  },
  {
    level: "hard",
    question: "Which protein is used in *lechon*?",
    hint: "It’s a whole animal that’s roasted.",
    options: ["Chicken", "Pork", "Beef", "Fish"],
    answer: "Pork",
  },
  {
    level: "hard",
    question: "What is the main ingredient in *pancit*?",
    hint: "It’s a type of noodle.",
    options: ["Rice noodles", "Wheat noodles", "Rice", "Pasta"],
    answer: "Rice noodles",
  },
  {
    level: "hard",
    question: "Which vegetable is used in *pinakbet*?",
    hint: "It’s a leafy green that’s also a popular salad.",
    options: ["Kale", "Spinach", "Bok choy", "Okra"],
    answer: "Spinach",
  },
  {
    level: "hard",
    question: "What is *buko pandan* made from?",
    hint: "It’s a young coconut.",
    options: ["Coconut milk", "Coconut flesh", "Coconut water", "Coconut oil"],
    answer: "Coconut water",
  },
  {
    level: "hard",
    question: "Which fruit is used in *sago't gulaman*?",
    hint: "It’s a sweet, chewy jelly.",
    options: ["Gum", "Gelatin", "Pudding", "Jelly"],
    answer: "Gelatin",
  },
  {
    level: "hard",
    question: "What is the main ingredient in *kare-kare*?",
    hint: "It’s a thick, savory sauce.",
    options: ["Peanut sauce", "Soy sauce", "Fish sauce", "Vinegar"],
    answer: "Peanut sauce",
  },
  {
    level: "hard",
    question: "Which fruit is used in *sinigang na baboy*?",
    hint: "It’s a sour soup with pork.",
    options: ["Pork", "Chicken", "Fish", "Beef"],
    answer: "Pork",
  },
];

const levelMap: Record<string, number> = {
  easy: 0,
  medium: 10,
  hard: 20,
};

export default function QuizGame() {
  const [level, setLevel] = useState<"easy" | "medium" | "hard" | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const chimeRef = useRef<HTMLAudioElement | null>(null);
  const buzzerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    chimeRef.current = new Audio("/chime.mp3");
    buzzerRef.current = new Audio("/buzzer.mp3");
  }, []);

  const currentQuestion = useMemo(() => {
    if (!level) return null;
    const start = levelMap[level];
    return questions[start + questionIndex];
  }, [level, questionIndex]);

  const handleAnswer = useCallback(
    (option: string) => {
      if (!currentQuestion) return;
      setSelectedOption(option);
      if (option === currentQuestion.answer) {
        setScore((s) => s + 1);
        chimeRef.current?.play();
        setFeedback("Correct!");
      } else {
        buzzerRef.current?.play();
        setFeedback(`Wrong! Correct answer: ${currentQuestion.answer}`);
      }
      setTimeout(() => {
        setSelectedOption(null);
        setFeedback(null);
        if (questionIndex + 1 < 10) {
          setQuestionIndex((i) => i + 1);
        } else {
          setShowResult(true);
        }
      }, 1500);
    },
    [currentQuestion, questionIndex, chime, buzzer]
  );

  const restart = useCallback(() => {
    setLevel(null);
    setQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  }, []);

  if (!level) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold">Select Difficulty</h2>
        <div className="flex gap-4">
          <Button onClick={() => setLevel("easy")}>Easy</Button>
          <Button onClick={() => setLevel("medium")}>Medium</Button>
          <Button onClick={() => setLevel("hard")}>Hard</Button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold">Quiz Completed!</h2>
        <p>
          Your score: {score} / 10
        </p>
        <Button onClick={restart}>Play Again</Button>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-medium">
        {currentQuestion.question}
      </h3>
      <p className="text-sm text-muted-foreground">
        Hint: {currentQuestion.hint}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {currentQuestion.options.map((opt) => (
          <Button
            key={opt}
            variant={selectedOption === opt ? "outline" : "default"}
            onClick={() => handleAnswer(opt)}
            disabled={!!selectedOption}
          >
            {opt}
          </Button>
        ))}
      </div>
      {feedback && <p className="mt-2">{feedback}</p>}
      <p className="text-sm text-muted-foreground">
        Question {questionIndex + 1} / 10
      </p>
    </div>
  );
}
