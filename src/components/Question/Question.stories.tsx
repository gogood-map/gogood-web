import { Question, QuestionProps } from './Question'

export default {
    title: 'Components/Question',
    component: Question,
}

const freeTextQuestion = {
    title: 'What is your name?',
    placeholder: 'Enter your name',
    type: 'FreeText',
    value: '',
    error: false,
    helperText: 'This is a helper text',
    isOptional: true,
    options: [],
    onChange: () => { },
    onBlur: () => { },
} as QuestionProps

const multipleChoiceQuestion = {
    title: 'What is your favorite color?',
    placeholder: 'Enter your name',
    type: 'MultipleChoice',
    value: '',
    error: false,
    helperText: 'This is a helper text',
    isOptional: true,
    options: [
        { label: 'Red', openField: false },
        { label: 'Blue', openField: false },
        { label: 'Green', openField: false },
    ],
    onChange: () => { },
    onBlur: () => { },
} as QuestionProps

const singleChoiceQuestion = {
    title: 'What is your favorite color?',
    placeholder: 'Enter your name',
    type: 'SingleChoice',
    value: '',
    error: false,
    helperText: 'This is a helper text',
    isOptional: true,
    options: [
        { label: 'Red', openField: false },
        { label: 'Blue', openField: false },
        { label: 'Green', openField: false },
    ],
    onChange: () => { },
    onBlur: () => { },
} as QuestionProps

export const FreeText = () => <Question {...freeTextQuestion} />

export const MultipleChoice = () => <Question {...multipleChoiceQuestion} />

export const SingleChoice = () => <Question {...singleChoiceQuestion} />