'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Question = {
  image: string;
  options: string[];
  correctIndex: number;
  fact: string;
  difficulty: "easy" | "medium" | "hard";
};

const questions: Question[] = [
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Adobo", "Sinigang", "Lechon", "Pancit"],
    correctIndex: 0,
    fact: "Adobo is a classic Filipino dish made with chicken or pork marinated in vinegar, soy sauce, garlic, and bay leaves.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kare-Kare", "Bicol Express", "Laing", "Paksiw"],
    correctIndex: 1,
    fact: "Bicol Express is a spicy stew made with coconut milk, pork, and chili peppers, originating from the Bicol region.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kakanin", "Puto", "Bibingka", "Suman"],
    correctIndex: 3,
    fact: "Suman is a sticky rice cake wrapped in banana leaves, a popular snack in many Filipino provinces.",
    difficulty: "hard",
  },
  // Add more questions as needed
];

const chimeUrl = "https://www.soundjay.com/misc/sounds/bell-01.mp3";
const buzzerUrl = "https://www.soundjay.com/misc/sounds/buzzer-01.mp3";

export default function Quiz() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const [fact, setFact] = useState("");
  const [answerSelected, setAnswerSelected] = useState(false);

  useEffect(() => {
    if (difficulty) {
      setFilteredQuestions(questions.filter((q) => q.difficulty === difficulty));
      setCurrentIndex(0);
      setScore(0);
      setShowFact(false);
      setAnswerSelected(false);
    }
  }, [difficulty]);

  const handleAnswer = (index: number) => {
    if (answerSelected) return;
    const currentQuestion = filteredQuestions[currentIndex];
    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
      new Audio(chimeUrl).play();
    } else {
      new Audio(buzzerUrl).play();
    }
    setFact(currentQuestion.fact);
    setShowFact(true);
    setAnswerSelected(true);
  };

  const nextQuestion = () => {
    setAnswerSelected(false);
    setShowFact(false);
    setFact("");
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Quiz finished
      setDifficulty(null);
    }
  };

  if (!difficulty) {
    return (
      <div className="flex flex-col items-center gap-4 mt-10">
        <h2 className="text-2xl font-semibold">Choose Difficulty</h2>
        <div className="flex gap-4">
          <Button onClick={() => setDifficulty("easy")}>Easy</Button>
          <Button onClick={() => setDifficulty("medium")}>Medium</Button>
          <Button onClick={() => setDifficulty("hard")}>Hard</Button>
        </div>
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return <p>No questions available for the selected difficulty.</p>;
  }

  const currentQuestion = filteredQuestions[currentIndex];

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Question {currentIndex + 1} of {filteredQuestions.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={currentQuestion.image} alt="Dish" className="w-full h-48 object-cover rounded-md mb-4" />
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((opt, idx) => (
              <Button
                key={idx}
                variant={answerSelected && idx === currentQuestion.correctIndex ? "default" : "outline"}
                onClick={() => handleAnswer(idx)}
                disabled={answerSelected}
                className="w-full"
              >
                {opt}
              </Button>
            ))}
          </div>
          {showFact && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <CardDescription>{fact}</CardDescription>
              <Button onClick={nextQuestion} className="mt-2">
                {currentIndex + 1 < filteredQuestions.length ? "Next Question" : "See Score"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      {currentIndex + 1 === filteredQuestions.length && showFact && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold">Your Score: {score} / {filteredQuestions.length}</h3>
          <Button onClick={() => setDifficulty(null)} className="mt-4">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
}
