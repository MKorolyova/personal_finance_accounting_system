import { GoalDTO } from "./goal.dto";
import { PartialType } from "@nestjs/mapped-types"

export class UpdateGoalDTO extends PartialType(GoalDTO) {}
