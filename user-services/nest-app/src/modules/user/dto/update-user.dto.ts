import {UserDTO} from "./user.dto"

export interface UpdateUserDTO extends UserDTO{
    updateDate: Date;
}