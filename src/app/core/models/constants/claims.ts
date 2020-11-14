export class Claims {
    public static readonly UserId: string = "infinitycms.claim.profile.user.id";
    public static readonly Username: string =
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
    public static readonly Roles: string =
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    public static readonly FirstName: string = "given_name";
    public static readonly LastName: string = "family_name";
    public static readonly ProfilePhoto: string =
        "infinitycms.claim.profile.photo";
    public static readonly AccountStatus: string =
        "infinitycms.claim.profile.user.account-status";
    public static readonly PhoneNumber: string =
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone";
    public static readonly Permissions: string =
        "infinitycms.claim.profile.user.permissions";
}
