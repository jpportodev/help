import React, {useState, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserContext } from '../../contexts/UserContext'

import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './styles'

import Api from '../../Api'

import SignInput from '../../components/SignInput'

import BarberLogo from '../../images/barber.svg'
import PersonIcon from '../../images/person.svg'
import EmailIcon from '../../images/email.svg'
import LockIcon from '../../images/lock.svg'


export default ()=>{
    const {dispatch: userDispatch} = useContext(UserContext)
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('')
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    const handleSignClick = async() => {
        if(nameField != '' && emailField != '' && passwordField != ''){
            let res = await Api.signUp(nameField, emailField, passwordField)
            if(res.token) {
                await AsyncStorage.setItem('token', res.token);

                userDispatch({
                    type:'setAvatar',
                    payload:{
                        avatar: res.data.avatar
                    }
                })

                navigation.reset({
                    routes:[{name:'MainTab'}]
                })
            }else{
                alert('Erro:' + res.error)
            }

        }else{
            alert('Preencha os campos !')
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name: 'SignIn'}]
        });
    }

    return(
        <Container>
           
            <BarberLogo width='100%' height='160'/>

            <InputArea>

                <SignInput 
                    placeholder={'Digite seu nome'}
                    IconSvg={PersonIcon}
                    value={nameField}
                    onChangeText={t=>setNameField(t)}
                />

                <SignInput 
                    placeholder={'Digite o seu e-mail'}
                    IconSvg={EmailIcon}
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />

                <SignInput 
                    placeholder={'Digite a sua senha'}
                    IconSvg={LockIcon}
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />
            <CustomButton onPress={handleSignClick}>
                <CustomButtonText>CADASTRAR</CustomButtonText>
            </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta ?</SignMessageButtonText>
                <SignMessageButtonTextBold>Conecte-se</SignMessageButtonTextBold>
            </SignMessageButton>
            
        </Container>
    )
}