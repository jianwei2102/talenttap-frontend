import React from 'react';
import QuestionCard from './QuestionCard.tsx';
import { useNavigate } from 'react-router-dom';

interface SkillAssessmentDetailPageProps {
    // Define your component props here
}

const SkillAssessmentDetailPage: React.FC<SkillAssessmentDetailPageProps> = () => {
    // Add your component logic here
    const navigate = useNavigate();

    const data = [
        {
            question: '1. What is a closure in JavaScript?',
            category: 'JavaScript',
            answer: 'A closure is a function that has access to its own scope, the scope of the outer function, and the global scope. It allows a function to access variables from an enclosing scope, even after that function has finished executing.',
            scorePercentage: 90
        },
        {
            question: '2. Explain the concept of "hoisting" in JavaScript.',
            category: 'JavaScript',
            answer: 'Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compilation phase. This means you can use functions and variables before they are formally declared in the code.',
            scorePercentage: 60
        },
        {
            question: '3. What is the difference between "==" and "===" in JavaScript?',
            category: 'JavaScript',
            answer: '"==" is the equality operator that performs type coercion, converting the operands to the same type before making the comparison. "===" is the strict equality operator that compares both value and type without type coercion.',
            scorePercentage: 95
        },
        {
            question: '4. Describe the purpose of the REST architectural style in web development.',
            category: 'Web Development',
            answer: 'REST (Representational State Transfer) is an architectural style used in web development to create scalable and maintainable web services. It relies on stateless, client-server communication, typically using HTTP methods to perform CRUD operations on resources.',
            scorePercentage: 40
        },
        {
            question: '5. What is the difference between "let", "const", and "var" in JavaScript?',
            category: 'JavaScript',
            answer: '"var" is function-scoped and can be re-declared and updated. "let" is block-scoped and can be updated but not re-declared within the same scope. "const" is also block-scoped, but it cannot be updated or re-declared; it creates a constant reference to a value.',
            scorePercentage: 90
        },
        {
            question: '6. Explain the concept of "promises" in JavaScript.',
            category: 'JavaScript',
            answer: 'Promises are objects that represent the eventual completion or failure of an asynchronous operation. They provide a way to handle asynchronous code in a more manageable way, using methods like "then", "catch", and "finally" to handle the results or errors.',
            scorePercentage: 92
        },
        {
            question: '7. What is a microservice architecture and its benefits?',
            category: 'Software Architecture',
            answer: 'Microservice architecture is a design approach where a single application is composed of small, independent services that communicate over a network. Benefits include improved scalability, flexibility, and easier maintenance, as each service can be developed, deployed, and scaled independently.',
            scorePercentage: 68
        },
        {
            question: '8. What is the purpose of unit testing in software development?',
            category: 'Software Testing',
            answer: 'Unit testing involves testing individual components or functions of an application to ensure they work as expected. It helps to identify bugs early in the development process, improves code quality, and facilitates changes and refactoring by providing a safety net of tests.',
            scorePercentage: 71
        },
        {
            question: '9. Explain the difference between SQL and NoSQL databases.',
            category: 'Databases',
            answer: 'SQL databases are relational and use structured query language (SQL) for defining and manipulating data. They are table-based and best for complex queries. NoSQL databases are non-relational, often key-value, document, or graph-based, and are designed for scalability and flexibility with unstructured data.',
            scorePercentage: 89
        },
        {
            question: '10. What is the role of an index in a database?',
            category: 'Databases',
            answer: 'An index in a database is a data structure that improves the speed of data retrieval operations on a table at the cost of additional storage and maintenance. It allows the database to find rows much faster than without an index.',
            scorePercentage: 12
        }
    ];

    return (
        <div className='tw-min-h-screen tw-h-full tw-w-screen tw-flex tw-justify-between tw-p-10 tw-bg-gray-200'>
            <div className="tw-h-full tw-w-full tw-flex tw-flex-col">

                <div className="tw-h-full">
                    <div className="tw-relative tw-flex tw-flex-col tw-h-full tw-p-6 tw-rounded-2xl tw-bg-white tw-border tw-border-gray-400 tw-shadow tw-shadow-slate-950/5">
                        <div className="tw-inline-flex tw-items-baseline tw-mb-3">
                            <span className="tw-text-slate-900 tw-font-bold tw-text-2xl">Skill Assessment</span>
                        </div>
                        <div className='tw-flex tw-mb-1 tw-items-center'>
                            <p className="tw-text-slate-900 tw-font-semibold">Score: </p>

                            {/* pill-shaped p */}
                            <p className='tw-rounded-full tw-bg-yellow-700 text-center tw-ml-3 tw-px-5 tw-py-1'>60 / 100</p>
                        </div>

                    </div>
                </div>

                {
                    data.map((item, index) => (
                        <QuestionCard key={index} question={item.question} category={item.category} answer={item.answer} scorePercentage={item.scorePercentage} />
                    ))
                }

                <div onClick={() => navigate(-1)} className="tw-mt-10 tw-cursor-pointer tw-no-underline tw-w-full tw-inline-flex tw-justify-center tw-whitespace-nowrap tw-rounded-lg tw-bg-red-500 tw-px-3.5 tw-py-2.5 tw-text-sm tw-font-medium tw-text-white tw-shadow-sm tw-shadow-red-950/10 hover:tw-bg-red-600 focus-visible:tw-outline-none focus-visible:tw-ring focus-visible:tw-ring-red-300 tw-transition-colors tw-duration-150">
                    Back
                </div>
            </div>
        </div>
    );
};

export default SkillAssessmentDetailPage;