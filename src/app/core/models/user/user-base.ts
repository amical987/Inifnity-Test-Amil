
export enum UserStatus {
    NotDefined = "N/A",
    Enabled = "Enabled",
    Disabled = "Disabled",
}


export interface UserBase {
    id?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    username?: string;
    phoneNumber?: string;
    profilePhoto?: string;
    status?: UserStatus;
    roles?: string[];
}
