export class LoginPage {

    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#formBasicEmail');
        this.passwordField = page.locator('#formBasicPassword');
        this.loginButton = page.getByRole('button', { name: 'Masuk' });
        this.errorMessage = page.getByRole('alert');
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

}