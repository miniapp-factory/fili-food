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
  // Easy (20 questions)
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Adobo", "Sinigang", "Lechon", "Pancit"],
    correctIndex: 0,
    fact: "Adobo is a classic Filipino dish made with chicken or pork marinated in vinegar, soy sauce, garlic, and bay leaves.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Sinigang", "Adobo", "Lechon", "Pancit"],
    correctIndex: 1,
    fact: "Sinigang is a sour soup usually made with tamarind, tomatoes, and various vegetables.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Lechon", "Adobo", "Sinigang", "Pancit"],
    correctIndex: 0,
    fact: "Lechon is a whole roasted pig, often served during celebrations.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Pancit", "Adobo", "Sinigang", "Lechon"],
    correctIndex: 0,
    fact: "Pancit refers to a family of noodle dishes, commonly served during gatherings.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Adobo", "Sinigang", "Lechon", "Pancit"],
    correctIndex: 0,
    fact: "Adobo can be made with chicken, pork, or even seafood, depending on regional preferences.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Sinigang", "Adobo", "Lechon", "Pancit"],
    correctIndex: 1,
    fact: "Sinigang’s sourness can come from tamarind, calamansi, or green mango.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Lechon", "Adobo", "Sinigang", "Pancit"],
    correctIndex: 0,
    fact: "Lechon is often marinated with spices like bay leaves, garlic, and peppercorns before roasting.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Pancit", "Adobo", "Sinigang", "Lechon"],
    correctIndex: 0,
    fact: "Pancit can be stir‑fried (Pancit Canton) or served in broth (Pancit Bihon).",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Adobo", "Sinigang", "Lechon", "Pancit"],
    correctIndex: 0,
    fact: "Adobo’s name comes from the Spanish word for 'to braise' or 'to stew'.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Sinigang", "Adobo", "Lechon", "Pancit"],
    correctIndex: 1,
    fact: "Sinigang is often paired with rice and sometimes served with a side of fried fish.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Lechon", "Adobo", "Sinigang", "Pancit"],
    correctIndex: 0,
    fact: "Lechon is traditionally cooked over charcoal for a smoky flavor.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Pancit", "Adobo", "Sinigang", "Lechon"],
    correctIndex: 0,
    fact: "Pancit is often served during birthdays and anniversaries as a symbol of longevity.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Adobo", "Sinigang", "Lechon", "Pancit"],
    correctIndex: 0,
    fact: "Adobo can be found in many Filipino households, each with its own family recipe.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Sinigang", "Adobo", "Lechon", "Pancit"],
    correctIndex: 1,
    fact: "Sinigang’s flavor profile is often described as tangy and comforting.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Lechon", "Adobo", "Sinigang", "Pancit"],
    correctIndex: 0,
    fact: "Lechon is a centerpiece in many Filipino celebrations, especially Christmas.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Pancit", "Adobo", "Sinigang", "Lechon"],
    correctIndex: 0,
    fact: "Pancit is versatile; it can be made with rice noodles, egg noodles, or even glass noodles.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Adobo", "Sinigang", "Lechon", "Pancit"],
    correctIndex: 0,
    fact: "Adobo’s sauce is typically thickened with a little cornstarch or flour.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Sinigang", "Adobo", "Lechon", "Pancit"],
    correctIndex: 1,
    fact: "Sinigang can be made with various proteins like pork, shrimp, or fish.",
    difficulty: "easy",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Lechon", "Adobo", "Sinigang", "Pancit"],
    correctIndex: 0,
    fact: "Lechon is often served with a dipping sauce made from vinegar and garlic.",
    difficulty: "easy",
  },
  // Medium (20 questions)
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kare-Kare", "Bicol Express", "Laing", "Paksiw"],
    correctIndex: 1,
    fact: "Bicol Express is a spicy stew made with coconut milk, pork, and chili peppers, originating from the Bicol region.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Laing", "Kare-Kare", "Paksiw", "Bicol Express"],
    correctIndex: 0,
    fact: "Laing is a dish of dried taro leaves cooked in coconut milk with chili and shrimp paste.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Paksiw", "Bicol Express", "Kare-Kare", "Laing"],
    correctIndex: 0,
    fact: "Paksiw is a Filipino stew where meat or fish is simmered in vinegar and soy sauce.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kare-Kare", "Bicol Express", "Laing", "Paksiw"],
    correctIndex: 0,
    fact: "Kare-Kare is a peanut-based stew usually served with oxtail, tripe, and vegetables.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Bicol Express", "Kare-Kare", "Laing", "Paksiw"],
    correctIndex: 0,
    fact: "Bicol Express is known for its creamy texture and fiery heat.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Laing", "Paksiw", "Kare-Kare", "Bicol Express"],
    correctIndex: 0,
    fact: "Laing is often served with rice and sometimes with fried fish.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Paksiw", "Bicol Express", "Kare-Kare", "Laing"],
    correctIndex: 0,
    fact: "Paksiw is a versatile dish that can be made with pork, chicken, or fish.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kare-Kare", "Bicol Express", "Laing", "Paksiw"],
    correctIndex: 0,
    fact: "Kare-Kare’s sauce is thickened with ground peanuts and served with bagoong.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Bicol Express", "Kare-Kare", "Laing", "Paksiw"],
    correctIndex: 0,
    fact: "Bicol Express is a staple in many Filipino households, especially in the Bicol region.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Laing", "Paksiw", "Kare-Kare", "Bicol Express"],
    correctIndex: 0,
    fact: "Laing is often served during special occasions and family gatherings.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Paksiw", "Bicol Express", "Kare-Kare", "Laing"],
    correctIndex: 0,
    fact: "Paksiw’s flavor comes from the combination of vinegar, soy sauce, and garlic.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kare-Kare", "Bicol Express", "Laing", "Paksiw"],
    correctIndex: 0,
    fact: "Kare-Kare is often served with a side of rice and a small bowl of bagoong.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Bicol Express", "Kare-Kare", "Laing", "Paksiw"],
    correctIndex: 0,
    fact: "Bicol Express is known for its rich coconut milk base and spicy kick.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Laing", "Paksiw", "Kare-Kare", "Bicol Express"],
    correctIndex: 0,
    fact: "Laing is a dish that showcases the flavors of the Bicol region.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Paksiw", "Bicol Express", "Kare-Kare", "Laing"],
    correctIndex: 0,
    fact: "Paksiw is a comforting stew that can be made with various proteins.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kare-Kare", "Bicol Express", "Laing", "Paksiw"],
    correctIndex: 0,
    fact: "Kare-Kare’s sauce is made from ground peanuts and sometimes includes shrimp paste.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Bicol Express", "Kare-Kare", "Laing", "Paksiw"],
    correctIndex: 0,
    fact: "Bicol Express is a beloved dish in the Philippines, especially during festivals.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Laing", "Paksiw", "Kare-Kare", "Bicol Express"],
    correctIndex: 0,
    fact: "Laing is often paired with rice and sometimes served with fried fish.",
    difficulty: "medium",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Paksiw", "Bicol Express", "Kare-Kare", "Laing"],
    correctIndex: 0,
    fact: "Paksiw’s flavor profile is a blend of sourness and umami.",
    difficulty: "medium",
  },
  // Hard (20 questions)
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kakanin", "Puto", "Bibingka", "Suman"],
    correctIndex: 3,
    fact: "Suman is a sticky rice cake wrapped in banana leaves, a popular snack in many Filipino provinces.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Bibingka", "Kakanin", "Puto", "Suman"],
    correctIndex: 0,
    fact: "Bibingka is a baked rice cake traditionally cooked over charcoal.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Puto", "Bibingka", "Kakanin", "Suman"],
    correctIndex: 0,
    fact: "Puto is a steamed rice cake often served with cheese or salted egg.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kakanin", "Puto", "Bibingka", "Suman"],
    correctIndex: 0,
    fact: "Kakanin refers to a variety of Filipino rice cakes, often flavored with coconut milk.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Suman", "Bibingka", "Puto", "Kakanin"],
    correctIndex: 0,
    fact: "Suman is traditionally made with glutinous rice and sweetened with sugar.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Bibingka", "Suman", "Puto", "Kakanin"],
    correctIndex: 0,
    fact: "Bibingka is often topped with grated coconut and butter.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Puto", "Bibingka", "Suman", "Kakanin"],
    correctIndex: 0,
    fact: "Puto is a staple snack during Filipino celebrations and festivals.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kakanin", "Puto", "Bibingka", "Suman"],
    correctIndex: 0,
    fact: "Kakanin is often served with sweetened condensed milk or latik.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Suman", "Bibingka", "Puto", "Kakanin"],
    correctIndex: 0,
    fact: "Suman is a popular street food in many Filipino cities.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Bibingka", "Suman", "Puto", "Kakanin"],
    correctIndex: 0,
    fact: "Bibingka is traditionally baked in clay pots over coals.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Puto", "Bibingka", "Suman", "Kakanin"],
    correctIndex: 0,
    fact: "Puto is often enjoyed with a cup of hot chocolate or coffee.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kakanin", "Puto", "Bibingka", "Suman"],
    correctIndex: 0,
    fact: "Kakanin is a term that encompasses many rice-based desserts.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Suman", "Bibingka", "Puto", "Kakanin"],
    correctIndex: 0,
    fact: "Suman is often wrapped in banana leaves for a subtle aroma.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Bibingka", "Suman", "Puto", "Kakanin"],
    correctIndex: 0,
    fact: "Bibingka is a festive treat during Christmas season.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Puto", "Bibingka", "Suman", "Kakanin"],
    correctIndex: 0,
    fact: "Puto is a light, fluffy cake that pairs well with savory dishes.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kakanin", "Puto", "Bibingka", "Suman"],
    correctIndex: 0,
    fact: "Kakanin is often made with glutinous rice and coconut milk.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Suman", "Bibingka", "Puto", "Kakanin"],
    correctIndex: 0,
    fact: "Suman is a staple during Filipino festivals and celebrations.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Bibingka", "Suman", "Puto", "Kakanin"],
    correctIndex: 0,
    fact: "Bibingka is often topped with grated coconut and butter.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Puto", "Bibingka", "Suman", "Kakanin"],
    correctIndex: 0,
    fact: "Puto is a popular snack during Filipino celebrations.",
    difficulty: "hard",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078055-5b1e5b9b5f1e",
    options: ["Kakanin", "Puto", "Bibingka", "Suman"],
    correctIndex: 0,
    fact: "Kakanin is often served with sweetened condensed milk or latik.",
    difficulty: "hard",
  },
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
