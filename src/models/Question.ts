interface Question {
	id: number;
	question: string;
	title: string;
	hint: string;
	allowedTimeSeconds: number;
	maxCharacterAnswer: number;
	answer: string;
	timeSpent: number;
	numAttempts: number;
	positiveKeywords: string[];
	negativeKeywords: string[];
	scorePercentage: number;
}

export default Question;