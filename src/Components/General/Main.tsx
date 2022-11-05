import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Client, IsLoggedInResponse, LoginModel } from "../../Client/Client";
import { ProfileData } from "../../Models/ProfileData";
import ErrorMessage from "../ErrorMessage";
import HeaderMenu from "./HeaderMenu";
import MainBody from "./MainBody";
import "../../Styles/Main.scss"


interface State {
    LoggedIn: Boolean
    User: ProfileData;
    shouldRedirect: Boolean;
    errorMessageList: String[],
}

interface MainProps {
    
}

class Main extends Component<MainProps, State> {   

    constructor(props: MainProps) {
        super(props);

        this.state = {
            LoggedIn: false,
            User: {
                name: "",
                eloRating: 0,
                id: "",
                roles: ["", ""]
            } as ProfileData,
            shouldRedirect: false,
            errorMessageList: []
        }
    }

    componentDidMount(): void {
        this.checkLoggedIn()
    }

    checkLoggedIn = () => {
        let client = new Client(process.env.REACT_APP_BACKEND_URL)
        client.checkLogin().then(res => {
            this.setUserLogin(res)
        }).catch(err => {
            this.raiseException("Not logged in \n" + err)
        })
    }

    setUserLogin = (res: IsLoggedInResponse) => {
        let user = res.user as ProfileData
        let User: ProfileData = {
            id: user.id,
            name: user.name,
            eloRating: user.eloRating,
            roles: user.roles
        }

        this.setState({
            LoggedIn: true,
            User: User,
        })
    }

    login = (username: string, password: string) => {
        let client = new Client(process.env.REACT_APP_BACKEND_URL)

        let login = {
            username: username,
            password: password
        } as LoginModel

        client.login(login).then(res => {
            let token = res.token
            sessionStorage.setItem("userLoginToken", token as string)        
            this.setUserLogin(res)
        }).catch(err => {
            this.raiseException(err)
        })
    }


    logout = () => {
        sessionStorage.clear();
        this.setState({
            LoggedIn: false,
            User: {
                name: "",
                eloRating: 0,
                id: "",
                roles: ["", ""]
            } as ProfileData
        })
    }

    raiseException = (message: string) => {
        let newErrorMessageList: String[] = this.state.errorMessageList;
        newErrorMessageList.push(message);
        this.setState({ errorMessageList: newErrorMessageList });
    }
    
    removeException = (index: number) => {
        let newErrorMessageList: String[] = this.state.errorMessageList;
        newErrorMessageList.splice(index, 1);
        this.setState({ errorMessageList: newErrorMessageList });
    }

    render() {
        return(
            <div className="MainContainer">
                <BrowserRouter>
                    <HeaderMenu LoggedIn={this.state.LoggedIn} User={this.state.User} />
                    <MainBody raiseException={this.raiseException} removeException={this.removeException} logout={() => this.logout()} LoggedIn={this.state.LoggedIn} User={this.state.User} login={(u: string, p: string) => this.login(u, p)} />                 
                </BrowserRouter>
                <div className="mt-4 databaseTable">
                    <ErrorMessage deleteCallback={this.removeException} errorList={this.state.errorMessageList}></ErrorMessage>
                </div>
            </div>
        )
    }
}

export default Main;