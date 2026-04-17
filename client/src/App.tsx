import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Exercise {
  id: number;
  title: string;
  audio: string;
  questions?: Question[];
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

const App: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/exercises')
      .then((response) => {
        setExercises(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching exercises:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spanish B IBDP - Listening Comprehension Practice</h1>
        <p>Paper 2 - Real Audio from Spain, Mexico, Argentina, and Colombia</p>
      </header>
      <main>
        <div className="exercises-list">
          <h2>Select an Exercise</h2>
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise)}
              className="exercise-button"
            >
              {exercise.title}
            </button>
          ))}
        </div>

        {selectedExercise && (
          <div className="exercise-detail">
            <h2>{selectedExercise.title}</h2>
            <audio controls>
              <source src={selectedExercise.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="questions">
              {selectedExercise.questions && selectedExercise.questions.map((question) => (
                <div key={question.id} className="question">
                  <p>{question.text}</p>
                  {question.options.map((option, index) => (
                    <label key={index}>
                      <input type="radio" name={`question-${question.id}`} value={option} />
                      {option}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;