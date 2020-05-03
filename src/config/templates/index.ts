import Contract from "./contract.json";

export type ITypeQuestion = "simple" |  "selection_simple"

export type IQuestion = {
    type: ITypeQuestion;
    placeholder: string;
    validation: string;
}

export type IField = {
    key: string;
    label: string;
    question: IQuestion;
}

export type ISection = {
    name: string;
    fields: IField[];
    content: string | string[];
    optional?: boolean;
}

export type ISignature = {
    label: string;
}

export type ITemplate = {
    name: string;
    sections: ISection[];
    signatures: ISignature[];
}

export type IAnswer = {
    key: string;
    value: string | Date | number; 
}

export default {
    contract: Contract
}