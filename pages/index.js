import { useState, useEffect } from 'react';

export default function Home() {
    const [username, setUsername] = useState('');
    const [waitingQueue, setWaitingQueue] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isBathroomOccupied, setIsBathroomOccupied] = useState(false);
    const [currentTimer, setCurrentTimer] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [interval, setInterval] = useState(15);
    const [shower, setShower] = useState('no');

    useEffect(() => {
        const timer = setInterval(() => {
            if (waitingQueue.length > 0 && !isBathroomOccupied) {
                setIsBathroomOccupied(true);
                setCurrentTimer(Date.now());
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [waitingQueue, isBathroomOccupied]);

    useEffect(() => {
        if (isBathroomOccupied && currentUser) {
            const remainingTime = Math.max(0, Math.floor((currentTimer + currentUser.time * 60000 - Date.now()) / 1000));
            if (remainingTime <= 0) {
                setWaitingQueue(prevQueue => prevQueue.slice(1));
                setIsBathroomOccupied(false);
            }
        }
    }, [isBathroomOccupied, currentTimer, currentUser]);

    const handleLogin = (event) => {
        event.preventDefault();
        setLoggedInUser(username);
        setUsername('');
    };

    const handleSignIn = (event) => {
        event.preventDefault();
        if (loggedInUser) {
            const newUser = { name: loggedInUser, time: interval, shower };
            setWaitingQueue(prevQueue => [...prevQueue, newUser]);
            setCurrentUser(newUser);
            setInterval(15);
            setShower('no');
        } else {
            alert('You must log in first.');
        }
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        setWaitingQueue([]);
        setCurrentUser(null);
        setIsBathroomOccupied(false);
    };

    return (
        <div className="container">
            <h1>Bathroom Sign-In</h1>
            {!loggedInUser ? (
                <div id="loginContainer">
                    <form onSubmit={handleLogin}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <button type="submit">Login</button>
                    </form>
                </div>
            ) : (
                <div id="signInContainer">
                    <form onSubmit={handleSignIn}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={loggedInUser} readOnly />
                        
                        <label htmlFor="interval">Time Interval:</label>
                        <select id="interval" value={interval} onChange={(e) => setInterval(e.target.value)} required>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                        </select>
                        
                        <label htmlFor="shower">Shower:</label>
                        <select id="shower" value={shower} onChange={(e) => setShower(e.target.value)} required>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                        
                        <button type="submit">Sign In</button>
                    </form>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            <div className="center-container">
                <div className="lists-container">
                    <div className="waiting-list list">
                        <h2>Waiting List</h2>
                        <ul id="waitingList">
                            {waitingQueue.map((person, index) => (
                                <li key={index}>
                                    <span>{person.name}</span> - <span>{person.time} min</span> - <span>{person.shower === 'yes' ? 'Shower' : 'No Shower'}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="current-user list">
                        <h2>Currently Using</h2>
                        <div id="currentUser">
                            {isBathroomOccupied ? (
                                <strong>{currentUser.name}</strong>
                            ) : (
                                "No one is using the bathroom."
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}