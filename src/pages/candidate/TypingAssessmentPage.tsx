import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, Input, Progress, Typography } from "@material-tailwind/react";



function TypingAssessmentPage() {
	const navigate = useNavigate();

	let [text, setText] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [lastLetter, setLastLetter] = useState("");
	const [words, setWords] = useState<string[]>([]);
	const [completedWords, setCompletedWords] = useState<string[]>([]);
	const [completed, setCompleted] = useState(false);
	const [startTime, setStartTime] = useState<number>(0);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [wpm, setWpm] = useState(0);
	const [started, setStarted] = useState(false);
	const [progress, setProgress] = useState(0);

	const initializeText = () => {
		let texts = [
			`You never read a book on psychology, Tippy. You didn't need to. You knew by some divine instinct that you can make more friends in two months by becoming genuinely interested in other people than you can in two years by trying to get other people interested in you.`,
			`I know more about the private lives of celebrities than I do about any governmental policy that will actually affect me. I'm interested in things that are none of my business, and I'm bored by things that are important to know.`,
			`A spider's body consists of two main parts: an anterior portion, the prosoma (or cephalothorax), and a posterior part, the opisthosoma (or abdomen).`,
			`As customers of all races, nationalities, and cultures visit the Dekalb Farmers Market by the thousands, I doubt that many stand in awe and contemplate the meaning of its existence. But in the capital of the Sunbelt South, the quiet revolution of immigration and food continues to upset and redefine the meanings of local, regional, and global identity.`,
			`Outside of two men on a train platform there's nothing in sight. They're waiting for spring to come, smoking down the track. The world could come to an end tonight, but that's alright. She could still be there sleeping when I get back.`,
			`I'm a broke-nose fighter. I'm a loose-lipped liar. Searching for the edge of darkness. But all I get is just tired. I went looking for attention. In all the wrong places. I was needing a redemption. And all I got was just cages.`
		];
		texts = ["a"];
		const text = texts[Math.floor(Math.random() * texts.length)];
		const words = text.split(" ");

		setText(text);
		setWords(words);
		setCompletedWords([]);
	};

	const handleChange = e => {
		const inputValue = e.target.value;
		const lastLetter = inputValue[inputValue.length - 1];

		// if the user hasn't started yet, start the timer
		if (!started) {
			setStartTime(Date.now());
			setStarted(true);
			setCompleted(false);
			setProgress(0);
		}

		const currentWord = words[0];
		console.log(currentWord, "currentWord");

		// if space or '.', check the word
		if (lastLetter === " " || lastLetter === ".") {
			// check to see if it matches to the currentWord
			// trim because it has the space
			if (inputValue.trim() === currentWord) {
				// remove the word from the wordsArray
				// cleanUp the input
				const newWords: string[] = [...words.slice(1)];
				const newCompletedWords = [...completedWords, currentWord];

				// Get the total progress by checking how much words are left
				const progress =
					(newCompletedWords.length /
						(newWords.length + newCompletedWords.length)) *
					100;
				setWords(newWords);
				setCompletedWords(newCompletedWords);
				setInputValue("");
				setCompleted(newWords.length === 0);
				setProgress(progress);
			}
		} else {
			setInputValue(inputValue);
			setLastLetter(lastLetter);
		}

		calculateWPM();

		if (completed) {
			// TODO: send to the backend
			console.log("completed");

			// navigate to the next page
			navigate("/technical");
		}
	};

	const calculateWPM = () => {
		const now = Date.now();
		const diff = (now - startTime) / 1000 / 60; // 1000 ms / 60 s

		// every word is considered to have 5 letters
		// so here we are getting all the letters in the words and divide them by 5
		// "my" shouldn't be counted as same as "deinstitutionalization"
		const wordsTyped = Math.ceil(
			completedWords.reduce((acc, word) => (acc += word.length), 0) / 5
		);

		// calculating the wpm
		const wpm = Math.ceil(wordsTyped / diff);

		setWpm(wpm);
		setTimeElapsed(diff);
	};

	useEffect(() => {
		initializeText();
	}, []);

	return (
		<div className="h-screen w-screen flex p-20 bg-gray-200 justify-center align-center">

			<Card className="max-w-full w-[650px] border p-5" color="white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
				<h3>Typing Speed Test</h3>
				<Progress className="my-3" value={progress} size="lg" color="red" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
				<p className="flex flex-wrap mb-5">
					{text.split(" ").map((word, w_idx) => {
						let highlight = false;
						let currentWord = false;

						// this means that the word is completed, so turn it green
						if (completedWords.length > w_idx) {
							highlight = true;
						}

						if (completedWords.length === w_idx) {
							currentWord = true;
						}

						return (
							<span
								className={`m-1
                                ${highlight && "text-green-600"} 
                                ${currentWord && "border-b-1 border-black"}`}
								key={w_idx}
							>
								{word.split("").map((letter, l_idx) => {
									const isCurrentWord = w_idx === completedWords.length;
									const isWronglyTyped = letter !== inputValue[l_idx];
									const shouldBeHighlighted = l_idx < inputValue.length;

									return (
										<span
											className={`letter ${isCurrentWord && shouldBeHighlighted
												? isWronglyTyped
													? "text-red-600"
													: "text-green-600"
												: ""
												}`}
											key={l_idx}
										>
											{letter}
										</span>
									);
								})}
							</span>
						);
					})}
				</p>
				<Input variant="static" label="Text" onChange={handleChange}
				value={inputValue} autoFocus={true} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
			</Card>
		</div>
	);
}

export default TypingAssessmentPage;
