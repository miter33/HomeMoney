export class AuthService {
  private isAuthenticated: boolean = false;

  public login(): void {
    this.isAuthenticated = true;
  }

  public logout(): void {
    this.isAuthenticated = false;
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
