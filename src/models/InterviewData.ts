import { GENERAL_INTERVIEW_INSTRUCTION_HTML } from "../constants.ts";

class InterviewData {
    sequence: number;
    instruction: string;
    daysBeforeExpired: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    type: string;
    generalInstruction: string;

    constructor(sequence: number, instruction: string, daysBeforeExpired: number, createdAt: Date, updatedAt: Date, createdBy: string, type: string = "Interview") {
        this.sequence = sequence;
        this.instruction = instruction;
        this.daysBeforeExpired = daysBeforeExpired;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdBy = createdBy;
        this.type = type;

        if (this.type === "Interview") {
            this.generalInstruction = this.instruction;
        } else if (this.type === "General Interview") {
            this.generalInstruction = GENERAL_INTERVIEW_INSTRUCTION_HTML;
        } else if (this.type === "Hiring Manager Interview") {
            this.generalInstruction = "";
        } else if (this.type === "Skill Assessment") {
            this.generalInstruction = "";
        } 
        else {
            this.generalInstruction = "";
        }
    }

    static fromJson = (json: any, type: string = "Interview") => {
        return new InterviewData(json.sequence, json.instruction, json.daysBeforeExpired, json.createdAt, json.updatedAt, json.createdBy, type);
    }
}

export default InterviewData;