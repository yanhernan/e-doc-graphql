import * as TypeGraph from 'type-graphql';
import { IField } from '../config/templates';
import { Question } from './Question';
import { type } from 'os';

@TypeGraph.ObjectType({ description: "The Question model" })
export class Field implements IField {

    @TypeGraph.Field()
    key: string;

    @TypeGraph.Field({ nullable: true })
    label: string;

    @TypeGraph.Field(type => Question)
    question: Question;
}
