import { ITemplate } from "../config/templates";
import { ObjectType, Field } from 'type-graphql';
import { Section } from "./Section";
import { Signature } from "./Signature";
@ObjectType({ description: "The Template model" })
export class Template implements ITemplate {
    @Field()
    name: string;
    @Field(type => [Section])
    sections: Section[];
    @Field(type => [Signature])
    signatures: Signature[];
}
