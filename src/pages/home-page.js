import React, { useState, useEffect } from "react";
import "../App.css"
import Header from "../components/Header"
import CreateArea from "../components/CreateArea";
import Note from "../components/Note";
import Footer from "../components/Footer";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const HomeScreen = (props) => {
    const headers = {
        'ngrok-skip-browser-warning': 'any_value_you_want',
        'Content-Type': 'application/json',
    };
    const [iserror, setIserror] = useState(false);
    const [userid, setUserid] = useState(undefined);
    const [isSpinner, setisSpinner] = useState(false);
    const [buttonname, updateButton] = useState("Add");
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({
        note_id: undefined,
        title: "",
        content: ""
    });
    useEffect(() => {
        let user = localStorage.getItem('user');
        if (user) {
            if (localStorage.getItem('notes')) {
                localStorage.removeItem('notes');
            }
            setisSpinner(true);
            user = JSON.parse(user)[0].userID;
            setUserid(user);
            const url = `https://2f87-2401-4900-65cb-3ba5-209-64a3-654d-663f.ngrok-free.app/notes/${user}`;
            axios.get(url, { headers })
                .then((response) => {
                    setisSpinner(false);
                    if (response.data.length)
                        setNotes(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    setisSpinner(false);
                    setIserror(true);
                })
        }
        else {
            let notesdata = localStorage.getItem('notes');
            if (notesdata) {
                setNotes(JSON.parse(notesdata));
            }
        }
    }, []);

    useEffect(() => {
        if (notes.length && !userid) {
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }, [notes, userid]);

    function addNote() {
        if (userid) {
            setNotes([]);
            setisSpinner(true);
            note.userID = userid;

            const url = "https://2f87-2401-4900-65cb-3ba5-209-64a3-654d-663f.ngrok-free.app/notes";

            axios.post(url, note, { headers })
                .then((response) => {
                    setisSpinner(false);
                    console.log(response);
                    loadnotes();
                })
                .catch((error) => {
                    console.log(error);
                    setIserror(true);
                    setisSpinner(false);
                })
        }
        else {
            setNotes(prevNotes => {
                return [note, ...prevNotes];
            });
        }
    }

    function loadnotes() {
        setNotes([]);
        setisSpinner(true);
        const url = `https://2f87-2401-4900-65cb-3ba5-209-64a3-654d-663f.ngrok-free.app/notes/${userid}`;

        axios.get(url, { headers })
            .then((response) => {
                setisSpinner(false);
                setNotes(response.data);
            })
            .catch((error) => {
                console.log(error);
                setIserror(true);
                setisSpinner(false);
            })
    }

    const deleteNote = (id) => {
        if (userid) {
            setisSpinner(true);
            setNotes([]);
            const url = "https://2f87-2401-4900-65cb-3ba5-209-64a3-654d-663f.ngrok-free.app/notes/" + id;

            axios.delete(url, { headers })
                .then((response) => {
                    setisSpinner(false);
                    loadnotes();
                })
                .catch((error) => {
                    setIserror(true);
                    setisSpinner(false);
                    // console.log(error);
                })
        }
        else {
            setNotes(prevNotes => {
                return prevNotes.filter((noteItem, index) => {
                    return index !== id;
                });
            });
            if (notes.length === 1) {
                localStorage.removeItem('notes')
            }
        }
        setNote({
            title: "",
            content: ""
        });
        updateButton("Add");
    }
    const editNote = (title, content, id) => {
        setNote({
            note_id: id,
            title: title,
            content: content
        })
        updateButton("Update");
    }

    const update = () => {
        if (userid) {
            setNotes([]);
            setisSpinner(true);
            const url = "https://2f87-2401-4900-65cb-3ba5-209-64a3-654d-663f.ngrok-free.app/notes";

            axios.put(url, note, { headers })
                .then((response) => {
                    setisSpinner(false);
                    loadnotes();
                })
                .catch((error) => {
                    setIserror(true);
                    setisSpinner(false);
                    // console.log(error);
                })
        }
        else {
            setNotes(prevNotes => {
                return [note, ...prevNotes.filter((noteItem, index) => {
                    return index !== note.note_id;
                })];
            });
            localStorage.setItem('notes', JSON.stringify(notes));
        }
        updateButton("Add");
        setNote({
            title: "",
            content: ""
        })
    }

    function logout() {
        setIserror(false);
        setUserid(undefined);
        setTimeout(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('notes');
            setNotes([]);
        }, 1);
    }

    return (
        <div className="home-page">
            <Header logout={logout} setTemp={props.setTemp} ></Header>

            <CreateArea onAdd={addNote} onUpdate={update} note={note} setNote={setNote} button={buttonname}> </CreateArea>
            {isSpinner ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="warning" disabled>
                    <Spinner animation="grow" size="sm" variant="light" />
                    <span style={{ color: 'white' }}>Loading...</span>
                </Button>
            </div> : <div className="note-container row align-items-start">
                {iserror ? <h6 style={{ textAlign: 'center', color: 'red' }}>Server is down try again later</h6> : ""}
                {notes.map((note, index) => (
                    <Note
                        key={index}
                        note_id={userid ? note.note_id : index}
                        title={note.title}
                        content={note.content}
                        userID={note.userID}
                        onDelete={deleteNote}
                        onEdit={editNote}
                    />
                ))}
            </div>}

            <Footer notes={notes}></Footer>
        </div>
    );
}

export default HomeScreen;