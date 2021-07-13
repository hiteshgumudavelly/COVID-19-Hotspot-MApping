import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { shareReplay, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {
        const data = {
            email: email,
            password: password
        }
        return this.http.post('https://hotspotmapping-api-dev.azurewebsites.net/api/Account/Login', data)
        .pipe(
            tap(this.setSession),
            shareReplay(1)
        );
    }

    private setSession(authResult: any) {
        const expiresAt = moment(authResult.expiration);

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        localStorage.setItem("username", authResult.user);
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("username");
    }

    public isLoggedIn() {
        return moment(moment().toISOString()).isBefore(this.getExpiration());
    }

    public getUsername() {
        return localStorage.getItem("username");
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration:any = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}