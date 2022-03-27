import React, { Component } from 'react';
import RecordDataService from '../services/record-service'
import { Modal, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react'

class addRecord extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: '',
            content: '',
            modal: false
        };
        this.recordDataService = new RecordDataService();
        this.subjectCreate$ = this.recordDataService.subjectCreate.asObservable();
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleDateChange(e) {
        this.setState({date: e.target.value});
    }

    handleContentChange(e){
        this.setState({content: e.target.value})
    }

    submit(){
        if(this.state.date!=='' && this.state.content!==''){
            this.recordDataService.create(this.state)
            this.subjectCreate$.subscribe((data)=>{
                if(data===200)
                    this.setState({modal: true});

            })
        }
        // RecordDataService.create(data)
    }

    handleModalClose(){
        this.setState({
            date: '',
            content: '',
            modal: false
        })
    }
    
    render(){
        return(
            <>
                <form>
                    <div className='form-group'>
                        <label for='date'>Date:</label>
                        <input type="date" className="form-control" id="date" onChange={this.handleDateChange} value={this.state.date} placeholder="Enter date"/>
                    </div>
                    <div className='form-group'>
                        <label for='date'>Content:</label>
                        <textarea type="text" className="form-control" onChange={this.handleContentChange} value={this.state.content} rows="4" cols="50"/>
                    </div>
                    <button onClick={this.submit} type="button" className="btn btn-secondary" style={{float: 'right', marginTop: '20px'}}>Save</button>
                </form>

                <Modal isOpen={this.state.modal} onClose={this.handleModalClose} isCentered size="sm">
                    {/* <ModalOverlay /> */}
                    <ModalContent>
                    <ModalBody>Update Success!</ModalBody>
                    <ModalCloseButton />
                    {/* <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={this.handleModalClose}>
                        Close
                        </Button>
                    </ModalFooter> */}
                    </ModalContent>
                </Modal>
            </>
        );
    }
}

export default addRecord;