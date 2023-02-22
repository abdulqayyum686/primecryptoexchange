import { Card, Col, Row } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle"
import DataTable from "../CustomComponent/TransactionHistoryTable";
const TransactionHistory = () => {
    const tableData = [
        {sno:"abc",datetime:Date.now(),status:'up',type:'abc',amount:123 },
        {sno:"abc",datetime:Date.now(),status:'up',type:'abc',amount:124 },
        {sno:"abc",datetime:Date.now(),status:'up',type:'abc',amount:125 },
        {sno:"abc",datetime:Date.now(),status:'up',type:'abc',amount:126 },
        {sno:"abc",datetime:Date.now(),status:'up',type:'abc',amount:127 },
    ];
    let columns = [
        { label: 'S.No', columnName: 'sno', sort: false },
        { label: 'Date Time', columnName: 'datetime', sort: true },
        { label: 'Status', columnName: 'status', sort: true },
        { label: 'Type', columnName: 'type', sort: true },
        { label: 'Amount', columnName: 'amount', sort: true },

    ]
    return (
        <>
            <Col xl="12">
                <Row>
                    <PageTitle activeMenu="Transaction History" motherMenu="Home" />
                </Row>
                <Row>
                    <DataTable header="" rows={tableData} columns={columns} />
                </Row>
            </Col>
        </>
    )
}

export default TransactionHistory;