export class JwtDto {
    token: string;
    type: string;
    username: string;
    authorities: string[];

    constructor (token: string, type: string, username: string, authorities: string[]) {
        this.token = token;
        this.type = type;
        this.username = username;
        this.authorities = authorities;
    }
}
