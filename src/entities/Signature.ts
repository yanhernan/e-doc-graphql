import * as TypeGraph from "type-graphql";
import { ISignature } from "../config/templates";

@TypeGraph.ObjectType({ description: "The Question model" })
export class Signature implements ISignature {
  @TypeGraph.Field()
  label: string;
}
