import React from 'react'
import { MonthlyBills } from '../../api/bills';
import { BillsTable } from '../../components/BillsTable';



type MyProps = {
title:string  
ref: React.MutableRefObject<null>
bills: MonthlyBills[]
};
type MyState = {
  title:string
  bills:MonthlyBills[]
}

export class PrintThis extends React.Component<MyProps, MyState> {
    constructor(props:any){
        super(props);
        this.state={
            bills:this.props.bills,
            title:this.props.title
        }

    }

    render() {

      return (
        <div className='m-5 '>
         <div  className="capitaliza text-[15px]  m-1">{this.state.title}</div> 
        <BillsTable bills={this.state.bills} editing={false}/>
      </div>
      );
    }
  }
