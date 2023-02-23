import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import PageTitle from "../../layouts/PageTitle";
import DataTable from "../CustomComponent/TradeComponents/TradeTable";
const Trade = (props) => {
  // const dispatch = useDispatch();
  // const userReducer = useSelector((store) => store.userReducer);
  return (
    <>
      <Col xl="12">
        <Row>
          <PageTitle activeMenu="Trade" motherMenu="Home" />
        </Row>
        <Row><DataTable /></Row>
      </Col>
    </>
  );
};

export default Trade;
