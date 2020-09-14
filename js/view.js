const view = {}
view.setActiveScreen = (screenName, fromCreateConversation = false) => {
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
            document.getElementById('create-conversation').addEventListener('click', () => {
                view.setActiveScreen('createConversationPage')
            })
            document.querySelector('#send-message-form input').addEventListener('click',()=>{
                view.hideNotification(model.currentConversation.id)
            })
            if (fromCreateConversation) {
                view.showCurrentConversation()
                view.showConversations()
            } else {
                model.getConversations()
                model.listenConversationChange()
            }
            const addUser = document.getElementById('add-user-form')
            addUser.addEventListener('submit', (e) => {
                e.preventDefault()
                const data = addUser.email.value
                controller.addUser(data)
                addUser.email.value=''

            })
            break;
        case 'createConversationPage':
            document.getElementById('app').innerHTML = component.createConversationPage
            document.getElementById('redirect-to-chat').addEventListener('click', () => {
                view.setActiveScreen('chatPage', true)
            })
            const createConversationForm = document.getElementById('create-conversation-form')
            createConversationForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const data = {
                    title: createConversationForm.title.value,
                    email: createConversationForm.email.value
                }
                controller.createConversation(data)
            })
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
        
    }

    view.showCurrentConversation = () => {
        document.querySelector('.conversation-title').innerHTML = model.currentConversation.title
        document.querySelector('.list-message').innerHTML = ''
        for (message of model.currentConversation.messages) {
            view.addMessage(message)
        }
        document.querySelector('.list-user').innerHTML=''
        for (user of model.currentConversation.users) {
            view.addUser(user)
        }
        view.scrollToEndElement()
    }
}

view.scrollToEndElement = () => {
    const element = document.querySelector('.list-message')
    element.scrollTop = element.scrollHeight
}

view.showConversations = () => {
    for (conversation of model.conversations) {
        view.addConversation(conversation)
    }
}

view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div')
    conversationWrapper.classList.add('conversation')
    conversationWrapper.classList.add('cursor-pointer')
    conversationWrapper.id=conversation.id
    if (conversation.id === model.currentConversation.id) {
        conversationWrapper.classList.add('current')
    }
    conversationWrapper.innerHTML = `
    <div class="left-conversation-title">${conversation.title}</div>
    <div class="num-of-user">${conversation.users.length} users</div>
    <div class="notification"></div>
    `
    const mediaQuery=window.matchMedia('(max-width: 786px)')
    if(mediaQuery.matches){
        conversationWrapper.firstElementChild.innerText=conversation.title.charAt(0).toUpperCase()
        document.getElementById('create-conversation').innerText='+'
    }

    mediaQuery.addListener((e)=>{
        if(e.matches){
            conversationWrapper.firstElementChild.innerText=conversation.title.charAt(0).toUpperCase()
            document.getElementById('create-conversation').innerText='+'
        } else{
            conversationWrapper.firstElementChild.innerText=conversation.title
            document.getElementById('create-conversation').innerText='+ New Conversation'

        }
    })
    conversationWrapper.addEventListener('click', () => {
        model.currentConversation = model.conversations.filter(item => item.id === conversation.id)[0]
        view.showCurrentConversation()
        document.querySelector('.conversation.current').classList.remove('current')
        conversationWrapper.classList.add('current')
        view.hideNotification(conversation.id)
    })

    document.querySelector('.list-conversations').appendChild(conversationWrapper)
}

view.addUser = (users) => {
    const addWrapper = document.createElement('div')
    addWrapper.classList.add('user-email')
    addWrapper.innerHTML = user
    document.querySelector('.list-user').appendChild(addWrapper)
}

view.addUserInConversation = (numberUser)=>{
    const currentConversationElement = document.querySelector('.conversation.current .num-of-user')
    currentConversationElement.innerText=numberUser+ ' users'

}

view.showNotification=(docId)=>{
    const conversation=document.getElementById(docId)
    conversation.querySelector('.notification').style="display: block;"
}

view.hideNotification=(docId)=>{
    const conversation=document.getElementById(docId)
    conversation.querySelector('.notification').style="display: none;"
}