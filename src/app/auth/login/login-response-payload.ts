export interface LoginResponse {
    authenticationToken: String;
    refreshToken: String;
    expiresAt: Date;
    username: String;
}