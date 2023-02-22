import { Card, Col, Row } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle"
import DataTable from "../CustomComponent/TradeHistoryTable";
const TradeHistory = () => {
    const tableData = [
        { title: 'ZEC', markets: 'ZCash', price: '$0.9632', change: '+9', date_open: Date.now(),date_close: Date.now(), pl: '19' },
        { title: 'AUD', markets: 'Australian Doller', price: '$0.6932', change: '+22', date_open: Date.now(), date_close: Date.now(), pl: '-12' }
    ];
    let columns = [
        { label: 'Asset', columnName: 'asset', sort: true },
        { label: 'Amount', columnName: 'amount', sort: true },
        { label: 'Crypto Price', columnName: 'crypto_price', sort: true },
        { label: 'P/L($)', columnName: 'pl', sort: false },
        { label: 'Date Open', columnName: 'date_open', sort: true },
        { label: 'Date close', columnName: 'date_close', sort: true },

    ]
    return (
        <>
            <Col xl="12">
                <Row>
                    <PageTitle activeMenu="Trade History" motherMenu="Home" />
                </Row>
                <Row>
                    <DataTable header="" rows={tableData} columns={columns} />
                </Row>
            </Col>
        </>
    )
}

export default TradeHistory;