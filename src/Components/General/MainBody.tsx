import React, { Component } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { ProfileData } from "../../Models/ProfileData";
import "../../Styles/MainBody.scss"
import LoginPage from "../AccountPages/LoginPage";
import ProfilePage from "../AccountPages/ProfilePage";
import RegisterPage from "../AccountPages/RegisterPage";
import ChessGame from "../Chess/ChessGame";


interface State {
   
}

interface MainBodyProps {
    LoggedIn: Boolean
    User: ProfileData
    login: (user: string, pass: string) => void
    logout: () => void
    raiseException: (message: string) => void;
    removeException: (index: number) => void;
}

class MainBody extends Component<MainBodyProps, State> {   

    constructor(props: MainBodyProps) {
        super(props);

        this.state = {
            
        }
    }

    login = (username: string, password: string) => {
        this.props.login(username, password)
    }

    render() {
        const Wrapper = (props: any) => {
            const params = useParams();
            return <ChessGame {...{...props, match: {params}} } />
        }
        return(
            <Routes>
                <Route path="/" element={<h1>Logged in currently: {this.props.LoggedIn ? "True" : "false"}</h1> }/>
                <Route path="/register" element={<RegisterPage raiseException={this.props.raiseException} removeException={this.props.removeException}/>}/>
                <Route path="/login" element={<LoginPage logout={this.props.logout} LoggedIn={this.props.LoggedIn} User={this.props.User} login={(username: string, password: string) => {this.login(username, password)}}/> }/>
                <Route path="/profile" element={<ProfilePage LoggedIn={this.props.LoggedIn} User={this.props.User}/> }/>
                <Route path="/chess/:gameId" element={<Wrapper />} />
            </Routes>  
        )
    }
}

export default MainBody;