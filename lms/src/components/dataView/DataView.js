import React, {  useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Moment from 'moment';
export function DataView({ columns, data,click }) {
   

    useEffect(() => {

    }, [data]);
    return (
        <div className="card">
            <DataTable   paginator rows={10} rowsPerPageOptions={[ 10, 25, 50]} value={data} tableStyle={{ minWidth: '50rem' }} onRowClick={(data)=>{
          click?.(data.data.id)
            }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} className='cursor-pointer'   body={(e)=>{
                        if(col.type =='date'){
                            return Moment( e[col.field]).format('DD-MM-YYYY')
                        }
                        if(col.type =='bool' && col.module=='fine'){
                            return e[col.field]=="2"?<span className='green-text'>Paid</span>:e[col.field]=="1"?<span className='text-danger'>Cancelled</span>:<span className='text-warning'>Pending</span>
                        }          if(col.type =='bool' && col.module=='users'){
                            return e[col.field]==true?<span className='green-text'>Active</span>:<span className='text-danger'>Inactive</span>
                        }
                        return e[col.field];
                      
                    }}  />
                ))}
            </DataTable>
        </div>
    );
}