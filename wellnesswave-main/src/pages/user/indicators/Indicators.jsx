
import React, { useState } from 'react';

const SurveyForm = () => {
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState('');

  const handleInputChange = (question, option) => {
    setAnswers({
      ...answers,
      [question]: option,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all questions are answered
    for (let key in answers) {
      if (answers[key] === '') {
        alert('Please answer all questions.');
        return;
      }
    }

    // Process the answers
    // Enhanced if-else statements to cover more combinations

    if (
      (answers.q1 === 'Nearly every day' || answers.q2 === 'Nearly every day') &&
      (answers.q10 === 'Often' || answers.q10 === 'Sometimes')
    ) {
      setResult('You might be experiencing severe depression or having frequent thoughts of self-harm.');
    } else if (
      (answers.q1 === 'Several Days' || answers.q1 === 'More than half the days') &&
      (answers.q2 === 'Several Days' || answers.q2 === 'More than half the days') &&
      (answers.q10 === 'Rarely' || answers.q10 === 'Sometimes')
    ) {
      setResult('You might be experiencing moderate depression or occasional thoughts of self-harm.');
    } else if (
      answers.q3 === 'Constantly' ||
      answers.q4 === 'Constantly' ||
      answers.q5 === 'Almost always' ||
      answers.q6 === 'Often' ||
      answers.q7 === 'Constantly'
    ) {
      setResult('You might be experiencing high levels of anxiety, insomnia, anger issues, or intrusive thoughts.');
    } else if (
      answers.q3 === 'Frequently' ||
      answers.q4 === 'Frequently' ||
      answers.q5 === 'Often' ||
      answers.q6 === 'Sometimes'
    ) {
      setResult('You might be experiencing moderate levels of anxiety, sleep disturbances, or irritability.');
    } else if (answers.q8 === 'Often') {
      setResult('You might be experiencing dissociation or depersonalization.');
    } else if (answers.q9 === 'Always') {
      setResult('You might be having significant difficulties managing your daily responsibilities.');
    } else {
      setResult('Based on your responses, there are no immediate concerns detected.');
    }

    setSubmitted(true);
  };

  const questions = [
    {
      question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
      options: ["Not at all", "Several Days", "More than half the days", "Nearly every day"],
    },
    {
      question: "Have you experienced a loss of interest or pleasure in activities you once enjoyed?",
      options: ["Not at all", "Several Days", "More than half the days", "Nearly every day"],
    },
    {
      question: "How often do you find yourself feeling overly worried or anxious?",
      options: ["Rarely or never", "Occasionally", "Frequently", "Constantly"],
    },
    {
      question: "Do you often have trouble falling asleep or staying asleep, or do you experience restless sleep?",
      options: ["Rarely or never", "Occasionally", "Frequently", "Constantly"],
    },
    {
      question: "Are there times when you feel unusually irritable or easily angered?",
      options: ["Rarely or never", "Sometimes", "Often", "Almost always"],
    },
    {
      question: "Do you ever experience intrusive, unwanted thoughts or memories that are distressing?",
      options: ["Never", "Rarely", "Sometimes", "Often"],
    },
    {
      question: "How often do you find it hard to concentrate on tasks such as reading or watching television?",
      options: ["Rarely or never", "Occasionally", "Frequently", "Constantly"],
    },
    {
      question: "Do you sometimes feel disconnected from yourself or from reality?",
      options: ["Never", "Rarely", "Sometimes", "Often"],
    },
    {
      question: "Are you experiencing difficulties in managing your daily responsibilities?",
      options: ["Not at all", "Occasionally", "Frequently", "Always"],
    },
    {
      question: "Have you had thoughts of harming yourself or ending your life?",
      options: ["Never", "Rarely", "Sometimes", "Often"],
    },
  ];

  return (
    <div className="text-center min-h-screen bg-indigo-50 mx-auto py-8">
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold text-indigo-800 mb-10 underline">Indicators to Mental Health</h1>
        <div className='text-center w-3/5 ml-60 bg-white shadow-lg rounded-lg p-10'>
        {submitted ? (
          <div className="italic">
            <h2 className='text-left text-2xl text-bold mb-3 text-indigo-800 underline'>The result says :</h2>
            <p className='text-xl'>{result}</p>
          </div>
        ) : (
          <>
          <h4 className="font-semibold mb-20 italic">
          By filling this questionnaire you will get the posibilty
          <h4 />
          of how much anxiety, depression, stress, etc you might have.
          </h4>
            {questions.map((question, index) => (
              <div key={index} className="mb-4">
                <p className="text-left mt-5 mb-3 font-bold" key={index}>{index+1}. {question.question}</p>
                <div>
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="text-left block mb-3 italic">
                      <input
                        type="radio"
                        name={`q${index + 1}`}
                        value={option}
                        onChange={() => handleInputChange(`q${index + 1}`, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded-xl">
              Submit
            </button>
          </>
        )}
        </div>
      </form>
    </div>
  );
};

export default SurveyForm;