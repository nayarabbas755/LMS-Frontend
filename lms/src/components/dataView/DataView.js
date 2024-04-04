import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Moment from 'moment';
export function DataView({ columns, data }) {
   

    useEffect(() => {

    }, [data]);
    return (
        <div className="card">
            <DataTable   paginator rows={10} rowsPerPageOptions={[ 10, 25, 50]} value={data} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} body={(e)=>{
                        if(col.type =='date'){
                            return Moment( e[col.field]).format('DD-MM-YYYY')
                        }
                        if(col.type =='bool'){
                            return e[col.field]?<span className='green-text'>Available</span>:<span className='text-danger'>Out of stock</span>
                        }
                        return e[col.field];
                      
                    }}  />
                ))}
            </DataTable>
        </div>
    );
}