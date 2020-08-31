const view = {}
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'registerPage':
            document.getElementById('app').innerHTML = component.registerPage
            const registerForm = document.getElementById('register-form')
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault()
                console.log(registerForm.firstName.value)
                const data = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value,
                }
                controller.register(data)
            })
            document.getElementById('redirect-to-login').addEventListener('click', () => {
                view.setActiveScreen('loginPage')
            })
            break;
        case 'loginPage':
            document.getElementById('app').innerHTML = component.loginPage
            const loginForm = document.getElementById('login-form')
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const data = {
                    email: loginForm.email.value,
                    password: loginForm.password.value
                }
                controller.login(data)
            })
            document.getElementById('redirect-to-register').addEventListener('click', () => {
                view.setActiveScreen('registerPage')
            })
            break;
        case 'chatPage':
            document.getElementById("app").innerHTML = component.chatPage
            //model.getConversations()
            // document.getElementById("welcome-user").innerHTML='Welcome '+ model.currentUser.displayName
            const sendMessageForm = document.getElementById('send-message-form')
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault()
                //console.log(sendMessageForm.message.value)
                const message = {
                    content: sendMessageForm.message.value,
                    owner: model.currentUser.email,
                    createdAt: new Date().toISOString()
                }

                if (message.content.trim() != '') {
                    model.addMessage(message)
                    sendMessageForm.message.value = ''
                }

            })
            model.getConversations()
            model.listenConversationChange()
            break;
    }

    view.setErrorMessage = (elementId, content) => {
        document.getElementById(elementId).innerText = content
    }

    view.addMessage = (message) => {
        const messageWrapper = document.createElement('div')
        messageWrapper.classList.add('message')
        if (message.owner === model.currentUser.email) {
            messageWrapper.classList.add('mine')
            messageWrapper.innerHTML = `
        <div class="content">${message.content}</div>
        `
        } else {
            messageWrapper.classList.add('their')
            messageWrapper.innerHTML = `
        <div class="owner">${message.owner}</div>
        <div class="content">${message.content}</div>
        `
        }
        //console.log(messageWrapper)
        document.querySelector('.list-message').appendChild(messageWrapper)
        view.scrollToEndElement()
    }

    view.showCurrentConversation = () => {
        for (message of model.currentConversation.messages) {
            //console.log(message)
            view.addMessage(message)
        }
        view.scrollToEndElement()
    }
}

view.scrollToEndElement=()=>{
    const element=document.querySelector('.list-message')
    element.scrollTop=element.scrollHeight
}