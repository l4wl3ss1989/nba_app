import React, { Component } from 'react';
import { firebase } from '../../../firebase';
import FileUploader from 'react-firebase-file-uploader';

class Uploader extends Component {

    state = {
        name: '',
        isUploading: false,
        progress: 0,
        fileUrl: ''
    }

    handleUploadStart = () => {
        this.setState({
            isUploading: true, progress: 0
        })
    }

    handleUloadError = (error) => {
        this.setState({isUploading: false})
        console.log(error)
    }

    handleUploadSucces = (filename) => {
        //console.log(filename);
        this.setState({
            name: filename,
            progress: 100,
            isUploading: false
        })
        ///
        firebase.storage().ref('images')
        .child(filename).getDownloadURL()
        .then(url => {
            this.setState({fileUrl:url})
        })
        this.props.filename(filename)
    }

    handleProgress = (progress) => {
        this.setState({progress})
    }

    render() {
        return (
            <div>
                <FileUploader 
                    accept="image/*"
                    name="image"
                    randomizeFilename
                    storageRef={firebase.storage().ref('images')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUloadError}
                    onUploadSuccess={this.handleUploadSucces}
                    onProgress={this.handleProgress}
                />
                { 
                    this.state.isUploading ? 
                    <p>Progress: {this.state.progress}</p> 
                    : null
                }
                { this.state.fileUrl ? 
                    <img style={{
                        width: '300px'
                    }} src={this.state.fileUrl} alt={this.state.fileUrl}></img>
                    : null
                }
            </div>
        );
    }
}

export default Uploader;