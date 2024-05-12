import Question from "./Question";

interface QuestionSection {
	sectionName: string;
	sectionIndex: number;
	questionList: Question[];
}

export default QuestionSection;