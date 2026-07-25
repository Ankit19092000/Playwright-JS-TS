class LoginPage {

    constructor(page){
        this.page=page

        this.signinbutton= page.getByRole("button",{name:'Login'})
        this.email= page.getByPlaceholder("email@example.com")
        this.password= page.getByPlaceholder("enter your passsword")
    }


async validLogin(email,password){

    await this.email.fill(email)
    await this.password.fill(password)
    await this.signinbutton.click()
}


}

export { LoginPage };