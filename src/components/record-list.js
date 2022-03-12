import React, { Component } from 'react';
import RecordDataService from '../services/record-service'
import { DeleteIcon } from '@chakra-ui/icons'

class recordList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: null
        };
        this.recordDataService = new RecordDataService();
        this.subjectAllRecord$ = this.recordDataService.subjectAllRecord.asObservable();
        this.subjectDelete$ = this.recordDataService.subjectDelete.asObservable();
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        
    }

    componentDidMount(){
        // console.log('hello')
        this.recordDataService.getAll();
        this.subjectAllRecord$.subscribe((data) =>{
            this.setState({data: data})
        })
    }

    handleDeleteItem(id){
        this.recordDataService.delete(id);
        this.subjectDelete$.subscribe((status)=>{
            if(status == '200'){
                this.subjectAllRecord$.subscribe((data) =>{
                    this.setState({data: data})
                })
            }

        })
        this.recordDataService.getAll();
        
    }

    render(){
        return(
            <>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Content</th>
                        </tr>
                    </thead>
                    <tbody>
                            {/* <td>{this.state.data[0]['date']}</td>
                            <td>{this.state.data[0]['content']}</td> */}
                            { this.state.data!= null && this.state.data.map((item)=>{
                                return(
                                    <tr>
                                        <td>{item['date']}</td>
                                        <td>{item['content']}</td>
                                        <td onClick={()=>this.handleDeleteItem(item['id'])} ><DeleteIcon/></td>
                                    </tr>
                                )
                                
                            })}
                        
                    </tbody>
                    
                </table>
            </>
        );
    }
}

export default recordList;