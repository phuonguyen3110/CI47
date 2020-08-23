const controller={}
controller.register=(data)=>{
    view.setErrorMessage('first-name-error', data.firstName===''? 'Please input your first name' : '')
    view.setErrorMessage('last-name-error', data.lastName===''? 'Please input your last name' : '')
    view.setErrorMessage('email-error', data.email===''? 'Please input your email' : '')
    view.setErrorMessage('password-error', data.password===''? 'Please input your password' : '')
    // view.setErrorMessage('confirm-password-error', data.confirmPassword===data.password ? "Password didn't match" : '')
    if(data.confirmPassword===''){
        view.setErrorMessage('confirm-password-error','Please input your confirm password')
    } else if(data.confirmPassword!==data.password){
        view.setErrorMessage('confirm-password-error',"Password didn't match")
    } else{
        view.setErrorMessage('confirm-password-error','')
    }

    if(data.firstName !==''
    && data.lastName !==''
    && data.email !==''
    && data.password !==''
    && data.password===data.confirmPassword){
        model.register(data)
    }
}

controller.login=({email,password}) => {
    view.setErrorMessage('email-error', email===''? 'Please input your email' : '')
    view.setErrorMessage('password-error', password===''? 'Please input your password' : '')
    if(email!==''&&password!==''){
        model.login({email,password})
    }
}

