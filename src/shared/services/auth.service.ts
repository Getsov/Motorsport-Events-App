import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../interfaces/User';
import { BehaviorSubject, tap } from 'rxjs';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDataSubject = new BehaviorSubject<AuthResponseData | null>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(
    email: string,
    password: string,
    repass: string,
    firstName: string,
    lastName: string,
    region: string
  ) {
    return this.http
      .post<AuthResponseData>(`${baseUrl}/user/registerUser`, {
        email,
        password,
        repass,
        firstName,
        lastName,
        region,
      })
      .pipe(tap((userData) => this.setUserData(userData)));
  }

  registerOrganizator(
    email: string,
    password: string,
    repass: string,
    organizatorName: string,
    phone: string,
    region: string,
    role: string
  ) {
    return this.http
      .post<AuthResponseData>(`${baseUrl}/user/registerUser`, {
        email,
        password,
        repass,
        organizatorName,
        phone,
        region,
        role,
      })
      .pipe(tap((userData) => this.setUserData(userData)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${baseUrl}/user/loginUser`, {
        email,
        password,
      })
      .pipe(tap((userData) => this.setUserData(userData)));
  }

  // get user token
  getUserToken(): string | null {
    const storedData = localStorage.getItem('authData');
    const userData: AuthResponseData | null = storedData
      ? JSON.parse(storedData)
      : null;

    return userData ? userData.accessToken : null;
  }

  // return if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authData');
  }

  // Store it in BehaviorSubject & localStorage for persistence
  setUserData(userData: AuthResponseData): void {
    this.userDataSubject.next(userData);
    localStorage.setItem('authData', JSON.stringify(userData));
  }

  logout(): void {
    this.userDataSubject.next(null);
    localStorage.removeItem('authData');
  }
}
