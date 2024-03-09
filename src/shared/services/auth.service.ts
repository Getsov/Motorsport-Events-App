import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData, User } from '../interfaces/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Event } from '../interfaces/Event';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDataSubject = new BehaviorSubject<AuthResponseData | null>(
    this.setInitialUserDataSubject()
  );
  userData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(
    email: string,
    password: string,
    repassword: string,
    firstName: string,
    lastName: string,
    region: string
  ) {
    return this.http
      .post<AuthResponseData>(`${baseUrl}/user/register`, {
        email,
        password,
        repassword,
        firstName,
        lastName,
        region,
      })
      .pipe(tap((userData) => this.setUserData(userData)));
  }

  registerOrganizator(
    email: string,
    password: string,
    repassword: string,
    organizatorName: string,
    phone: string,
    region: string,
    role: string
  ) {
    return this.http.post<AuthResponseData>(`${baseUrl}/user/register`, {
      email,
      password,
      repassword,
      organizatorName,
      phone,
      region,
      role,
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `${baseUrl}/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .pipe(tap((userData) => this.setUserData(userData)));
  }

  // get user token
  getUserToken(): string | null {
    const storedData = localStorage.getItem('authData');
    const userData: AuthResponseData | null = storedData
      ? JSON.parse(storedData)
      : null;
    console.log(userData?.accessToken);
    return userData ? userData.accessToken : null;
  }

  // set new user token
  updateAccessToken(accessToken: string) {
    // Get the current user data from the BehaviorSubject
    const currentUserData = this.userDataSubject.value;

    // Update the access token in the current user data
    const updatedUserData: any = {
      ...currentUserData,
      accessToken: accessToken,
    };

    // Update the BehaviorSubject with the new user data
    this.userDataSubject.next(updatedUserData);

    // Update localStorage with the new user data
    localStorage.setItem('authData', JSON.stringify(updatedUserData));
  }

  // update user auth data
  updateUserAuthData(userId: string): void {
    const accessToken = this.getUserToken();
    this.http
      .get<AuthResponseData>(`${baseUrl}/user/getUserById/${userId}`, {
        headers: {
          'X-Authorization': accessToken!,
        },
      })
      .subscribe({
        next: (userData) => {
          this.setUserData(userData);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // get user from localstorage
  getUserFromLocalStorage(): User | null {
    const userData = localStorage.getItem('authData');
    if (userData) {
      return JSON.parse(userData).userData;
    }
    return null;
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

  setInitialUserDataSubject(): AuthResponseData | null {
    const storedData = localStorage.getItem('authData');

    if (storedData !== null) {
      return JSON.parse(storedData);
    }

    return null;
  }

  // Edit profile
  editUserPassword(
    newPasswords: {
      oldPassword: string;
      newPassword: string;
      newRepassword: string;
    },
    userId: string
  ) {
    const accessToken = this.getUserToken();

    return this.http.put(
      `${baseUrl}/user/editUserPassword/${userId}`,
      newPasswords,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': accessToken!,
        },
        withCredentials: true,
      }
    );
  }

  editEmail(email: { email: string }, userId: string) {
    const accessToken = this.getUserToken();

    return this.http.put(`${baseUrl}/user/editUserEmail/${userId}`, email, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': accessToken!,
      },
      withCredentials: true,
    });
  }

  editUserInfo(userInfo: any, userId: string) {
    const accessToken = this.getUserToken();
    return this.http.put(`${baseUrl}/user/editUserInfo/${userId}`, userInfo, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': accessToken!,
      },
      withCredentials: true,
    });
  }

  // refresh token
  getNewAccessToken(): Observable<any> {
    return this.http.get(`${baseUrl}/user/accessToken`, {
      withCredentials: true,
    });
  }
}
