import React, { useState, useEffect } from 'react'
import { CTX } from 'store';
import * as moment from 'moment'
import Paginator from 'react-hooks-paginator';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import Button from 'components/Button/Button';
import './BookingTable.scss';
import APIService from 'services/backstrap/apiService';

const BookingTable = (props) => {
    const [appState, dispatch] = React.useContext(CTX);
    const token = appState.bs_user.cgo_api_key;

    return (
        <>
            { props.data && props.data.length > 0 ? 
            <>
            <Table className="mb-5">
            <Thead>
            <Tr>
                <Th>Booking Land Name</Th>
                <Th>Dates</Th>
                <Th>Booking Status</Th>
                <Th>Invites</Th>
                <Th className="text-right">Actions</Th>
            </Tr>
            </Thead>
            <Tbody>
            {props.currentData.map(data => (
                <Tr key={data.id}>
                    <Td onClick={props.nameClick}><span className="btn-link">{data.name}</span></Td>
                    <Td>{moment(data.start_date).format('MM/DD/YY')} - {moment(data.end_date).format('MM/DD/YY')}</Td>
                    <Td>{data.status}</Td>
                    <Td>Manage</Td>
                    <Td className="text-right">
                        { data.status ? 
                            <Button 
                            variant="outline-primary" 
                            label="View Request" 
                            block={false} 
                            className="btn-sm" 
                            onClick={() => props.actionClick(data, 'View Request', 'view_request')}
                            />
                        : null }
                    </Td>
                </Tr>)
            )}
            </Tbody>
            </Table>
                  <Paginator
                    totalRecords={props.data.length}
                    pageLimit={props.pageLimit}
                    pageNeighbours={props.pageNeighbours}
                    setOffset={props.setOffset}
                    currentPage={props.currentPage}
                    setCurrentPage={props.setCurrentPage} />
            </>
            :

            <p>You have no booking requests at this time.</p>

            }
        </>
    )
}

export default BookingTable