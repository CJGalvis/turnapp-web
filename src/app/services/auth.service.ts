import { Injectable } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { TokenModel } from '../models/TokenModel';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private nameToken: string = 'token';
    private nameCurrent: string = 'current';
    private API: string;

    constructor(private http: HttpClient) {
        this.API = environment.API;
    }

    login(data: any) {
        const endpoint: string = `/auth/tenant/login`;
        const url: string = `${this.API}${endpoint}`;
        return this.http.post(url, data);
    }

    hasTokenSession() {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            return false;
        }
    }

    getToken(): string {
        return localStorage.getItem(this.nameToken);
    }

    setToken(token: string): void {
        localStorage.setItem(this.nameToken, token);
    }

    setCurrentUser(user: Array<UserModel>): void {
        localStorage.setItem(this.nameCurrent, JSON.stringify(user));
    }

    getExpDateToken(token: string): Date {
        const decoded = jwt_decode(token) as TokenModel;
        if (decoded.exp === undefined) return null;
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isExpiredToken(token?: string): boolean {
        if (!token) token = this.getToken();
        if (!token) return true;
        const date = this.getExpDateToken(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    getPermissionUser(token?: string): string {
        if (!token) token = this.getToken();
        const decoded = jwt_decode(token) as TokenModel;
        return decoded.role;
    }

    getCurrentUser(token?: string) {
        if (!token) token = this.getToken();
        const decoded = jwt_decode(token) as TokenModel;
        return decoded.email;
    }

}
