import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const App = () => {

    const [data, setData] = useState({posts: []});

    useEffect(() => {
        fetch('http://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then((data) => {
                setData(data);
            })
    }, []);

    return (
        <Router>
            <ul>
                {data.posts.map(item => (
                    <li key={item.id}>
                        <Link to={"/posts/" + item.id}>{item.title}</Link>
                    </li>
                ))}
            </ul>
            <Route path="/posts/:id" component={Post}/>
        </Router>
    );
};
export default App;

const Post = (props) => {

    const [data, setData] = useState({});

    useEffect(() => {
        fetch('http://jsonplaceholder.typicode.com/posts/' + props.match.params.id)
            .then(res => res.json())
            .then((data) => {
                setData(data);
            })
    }, []);

    return (
        <Router>
            <h1>{data.title}</h1>
            <h2>{data.body}</h2>
            <Link to={"/users/" + data.userID}>{data.userID}</Link>
            <Route path="/users/:id"> <User/> </Route>
        </Router>
    );
};

const User = (props) => {

    const [data, setData] = useState({});

    useEffect(() => {
        fetch('http://jsonplaceholder.typicode.com/users/' + props.match.params.id)
            .then(res => res.json())
            .then((data) => {
                setData(data);
            })
    }, []);

    return (
        <div>
            <h1>{data.name}</h1>
        </div>
    );
};