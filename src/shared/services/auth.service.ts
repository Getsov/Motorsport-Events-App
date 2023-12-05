import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../interfaces/User';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(
    email: string,
    password: string,
    repass: string,
    firstName: string,
    lastName: string,
    region: string
  ) {
    return this.http.post<AuthResponseData>(`${baseUrl}/user/registerUser`, {
      email,
      password,
      repass,
      firstName,
      lastName,
      region,
    });
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
    return this.http.post<AuthResponseData>(`${baseUrl}/user/registerUser`, {
      email,
      password,
      repass,
      organizatorName,
      phone,
      region,
      role,
    });
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`${baseUrl}/user/loginUser`, {
      email,
      password,
    });
  }
}
