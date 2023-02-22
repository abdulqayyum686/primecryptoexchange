import { Col, Row } from "react-bootstrap";
import { connect,  } from "react-redux";
import PageTitle from "../../layouts/PageTitle"
import DataTable from "../CustomComponent/TradeComponents/TradeTable";
const Trade = (props) => {
    return (
        <>
            <Col xl="12">
                <Row>
                    <PageTitle activeMenu="Trade" motherMenu="Home" />
                </Row>
                <Row>
                    {props?.coinMarket && <DataTable 
                     /> }
                    
                </Row>
            </Col>
        </>
    )
}


export default Trade;