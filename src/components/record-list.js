import React, { Component } from 'react';
import RecordDataService from '../services/record-service'

class recordList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: null
        };
        this.recordDataService = new RecordDataService();
        this.subjectAllRecord$ = this.recordDataService.subjectAllRecord.asObservable();
        
    }

    componentDidMount(){
        // console.log('hello')
        this.recordDataService.getAll();
        this.subjectAllRecord$.subscribe((data) =>{
            this.setState({data: data})
        })
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