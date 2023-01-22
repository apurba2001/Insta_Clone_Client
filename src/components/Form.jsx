import React, { useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import Header from './Header'
import "./form.css"
import { useEffect, useRef } from 'react'
import Animation from "./Animation"
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const initialData = { author: '', description: '', location: '' }
    const [formData, setFormData] = useState(initialData)
    const [selectedFile, setSelectedFile] = useState(null)
    const prevSelectedFileRef = useRef(null);
    const navigate = useNavigate()

    const handleForm = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const onDrop = (acceptedFiles) => {
        setSelectedFile(acceptedFiles[0])
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    const [load, setLoad] = useState(false)

    const submitForm = async (e) => {

        e.preventDefault()
        setLoad(true)

        const newFormData = new FormData()

        newFormData.append('image', selectedFile)
        newFormData.append('author', formData.author)
        newFormData.append('description', formData.description)
        newFormData.append('location', formData.location)

        await axios.post('https://apurba-insta-clone.onrender.com/create-post', newFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                navigate('/posts');
            })
    }

    const [dropStyle, setDropStyle] = useState({
        backgroundImage: '',
        backgroundSize: 'cover',
        border: '2px dotted rgb(178, 177, 177) '
    });

    useEffect(() => {
        if (prevSelectedFileRef.current !== selectedFile) {
            const dropStyle = {
                backgroundImage: `url(${selectedFile ? URL.createObjectURL(selectedFile) : 'path/to/default-image'})`,
                backgroundSize: 'cover',
                border: !selectedFile && '2px dotted rgb(178, 177, 177) '
            }
            setDropStyle(dropStyle);
        }
        prevSelectedFileRef.current = selectedFile
        return () => {
            URL.revokeObjectURL(dropStyle.backgroundImage)
        }
    }, [selectedFile, dropStyle.backgroundImage])

    

    if (load) return (
        <div className="animation">
            {Animation}
            <p className="form-anim">Please wait we are creating your post</p>
        </div>)

    return (
        <div className='main-form-container'>
            <Header />
            <div className='form-main'>
            <div className="form-container">
                <form className="form" onSubmit={submitForm} autoComplete="off" >
                    <div {...getRootProps()} className="drop-section" style={dropStyle}>
                        <input {...getInputProps()} />
                        {!selectedFile &&
                            <>
                                <span className="material-symbols-outlined md-48">
                                    add_circle
                                </span>
                                <div>Drag image here or click here to select</div>
                            </>
                        }
                    </div>
                    <div>
                        <span>
                            <input
                                onChange={handleForm}
                                value={formData.author}
                                name='author'
                                className='author-input'
                                type="text"
                                placeholder="Author"
                            />
                        </span>
                        <span>
                            <input
                                value={formData.location}
                                onChange={handleForm}
                                name='location'
                                className='location-input'
                                type="text"
                                placeholder="Location"
                            />
                        </span>
                    </div>
                    <div>
                        <textarea
                            value={formData.description}
                            onChange={handleForm}
                            name='description'
                            className='desc-input'
                            placeholder="Description"
                        />
                    </div>
                    <button
                        className='post-btn'
                        disabled={!(formData.author &&
                            selectedFile &&
                            formData.description &&
                            formData.location)
                        }>
                        Post
                    </button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Form
