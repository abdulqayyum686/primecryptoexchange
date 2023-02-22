

import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Button, Card, Col, Dropdown, Form, Modal, Nav, Row, Tab } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { Table } from 'react-bootstrap';

import bitcoin from "../../../images/coins/btc.png"
import cryptoicons from "../../../images/cryptoIcons/cryptoImg";
import { getWatchlistAction } from "../../../store/actions/WatchlistAction";
import { useDispatch, connect } from "react-redux";
let columns = [
    { label: 'Markets', columnName: 'markets', sort: true },
    { label: 'Price', columnName: 'price', sort: true },
    { label: 'Change 24h', columnName: 'change', sort: false },
    { label: 'Invest', columnName: 'invest', sort: false },
    { label: 'Action', columnName: 'action', sort: false },

]
const DataTable = (props) => {
    const [data, setData] = useState(
        document.querySelectorAll("#market_wrapper tbody tr")
    );
    const [largeModal, setLargeModal] = useState(false)
    const [rows,setRows] = useState(props.watchlist)
    const [noSl, setNoSl] = useState(true)
    const navigate = useNavigate();
    const sort = 6;
    const activePag = useRef(0);
    const [test, settest] = useState(0);
    const dispatch = useDispatch();

    const buyNow = (value) => {
        console.log("row clicked", value)
        // navigate("/coin-details")
        setLargeModal(true)
    }

    // Active data
    const chageData = (frist, sec) => {
        for (var i = 0; i < data.length; ++i) {
            if (i >= frist && i < sec) {
                data[i].classList.remove("d-none");
            } else {
                data[i].classList.add("d-none");
            }
        }
    };
    // use effect
    useEffect(() => {
        setData(document.querySelectorAll("#market_wrapper tbody tr"));

        //chackboxFun();
    }, [test]);

    useEffect(() => {
        
        dispatch(getWatchlistAction())

    }, [])
    // Active pagginarion
    activePag.current === 0 && chageData(0, sort);
    // paggination
    let paggination = Array(Math.ceil(data.length / sort))
        .fill()
        .map((_, i) => i + 1);

    // Active paggination & chage data
    const onClick = (i) => {
        activePag.current = i;
        chageData(activePag.current * sort, (activePag.current + 1) * sort);
        settest(i);
    };

    const [sortD, setSort] = useState({ columnName: '', sortType: 'asc' });

    const onSort = (columnName) => {
        let sortType = 'asc';
        if (sortD.columnName === columnName && sortD.sortType === 'asc') {
            sortType = 'desc';
        }
        setSort({ columnName, sortType });
    };
    const sortData = (rows, columnName, sortType) => {
        return [...rows].sort((a, b) => {
            if (sortType === 'asc') {
                if (a[columnName] < b[columnName]) return -1;
                if (a[columnName] > b[columnName]) return 1;
            } else {
                if (a[columnName] < b[columnName]) return 1;
                if (a[columnName] > b[columnName]) return -1;
            }
            return 0;
        });
    };
    const change1h = () =>{
        setRows((prev)=>prev.map((element) => {
            return {
                ...element,
                change: element.percent_change_1h
            };
        }))
        columns[2].label = "Change 1h"

    }
    const change24h = () =>{
        setRows((prev)=>prev.map((element) => {
            return {
                ...element,
                change: element.percent_change_24h
            };
        }))
        columns[2].label = "Change 24h"

    }
    const change7d = () =>{
        setRows((prev)=>prev.map((element) => {
            return {
                ...element,
                change: element.percent_change_7d
            };
        }))
        columns[2].label = "Change 7d"

    }
    return (
        <div className="col-xl-12">
            <div className="card">
                <div className="card-header border-0">
                    {/* <Col xl={12}>
                        <Row><h3>{header}</h3></Row>
                        <Row>
                            <p className="">{description}</p>
                        </Row>
                    </Col> */}
                </div>
                <div className="card-body pt-0">
                    <div className="table-responsive dataTablemarket">
                        <div id="market_wrapper" className="dataTables_wrapper no-footer">
                            <table className="table dataTable  shadow-hover display" style={{ minWidth: "845px" }}>
                                <thead>
                                    <tr >
                                        {columns.map((column, index) => (
                                            <th key={index} style={{ textAlign: column.label === "Markets" ? "" : "center" }} >
                                                {column.columnName === 'change' ? (
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="" className="pb-0" style={{color:'#374557'}}>
                                                            {column.label}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#" onClick={change1h}>Change 1h</Dropdown.Item>
                                                            <Dropdown.Item href="#" onClick={change24h}>Change 24h</Dropdown.Item>
                                                            <Dropdown.Item href="#" onClick={change7d}>Change 7d</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                ) : column.label}
                                                {column.sort ? (
                                                    <span type='button' onClick={() => column.sort ? onSort(column.columnName) : ''}>
                                                        {sortD.columnName === column.columnName && sortD.sortType === 'asc'
                                                            ? <i className="fa fa-arrow-down ms-2 fs-14" style={{ opacity: '0.7', }} />
                                                            :
                                                            <i className="fa fa-arrow-up ms-2 fs-14" style={{ opacity: '0.7', }} />
                                                        }
                                                    </span>
                                                ) : null}

                                            </th>

                                        ))}

                                    </tr>

                                </thead>
                                <tbody >
                                    {rows && sortData(rows, sortD.columnName, sortD.sortType).map((item, index) => (
                                        <tr key={index} >
                                            <td style={{ width: '30%' }}>
                                                <div className="market-title d-flex align-items-center "  >
                                                    <img src={cryptoicons[item.symbol]} width="12%" />
                                                    <Col>
                                                        <h5 className="mb-0 ms-2">
                                                            {item.symbol}
                                                        </h5>
                                                        <span className="text-muted ms-2" >
                                                            {item.name}
                                                        </span>
                                                    </Col>
                                                </div>
                                            </td>
                                            <td className="text-center" style={{ color: item.price.replace(/,/g, '') > 0 ? "green" : "red", }}>${item.price}</td>
                                            <td className="text-center" style={{ color: item.change > 0 ? "green" : "red", }}>{item.change}%</td>
                                            <td className="text-center">
                                                <Button style={{ backgroundColor: '#3eacff', }} onClick={() => buyNow(item)}>Buy Now</Button>
                                            </td>
                                            <td className="text-center">
                                                <Button style={{ backgroundColor: '#fc2e53', }} className="text-black" onClick={() => buyNow(item)}>Remove</Button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
                                <div className="dataTables_info">
                                    Showing {activePag.current * sort + 1} to{" "}
                                    {data.length > (activePag.current + 1) * sort
                                        ? (activePag.current + 1) * sort
                                        : data.length}{" "}
                                    of {data.length} entries
                                </div>
                                <div
                                    className="dataTables_paginate paging_simple_numbers mb-0"
                                    id="application-tbl1_paginate"
                                >
                                    <Link
                                        className="paginate_button previous "
                                        onClick={() =>
                                            activePag.current > 0 &&
                                            onClick(activePag.current - 1)
                                        }
                                    >
                                        <i className="fa fa-angle-double-left" ></i>
                                    </Link>
                                    <span>
                                        {paggination.map((number, i) => (
                                            <Link
                                                key={i}

                                                className={`paginate_button  ${activePag.current === i ? "current" : ""
                                                    } `}
                                                onClick={() => onClick(i)}
                                            >
                                                {number}
                                            </Link>
                                        ))}
                                    </span>

                                    <Link
                                        className="paginate_button next"
                                        onClick={() =>
                                            activePag.current + 1 < paggination.length &&
                                            onClick(activePag.current + 1)
                                        }
                                    >
                                        <i className="fa fa-angle-double-right" ></i>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DataTable;