import { CreateGoalDTO } from "./createGoal.dto";
import { PartialType } from "@nestjs/mapped-types"

export class UpdateGoalDTO extends PartialType(CreateGoalDTO) {
    id:string;
}
