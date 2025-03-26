import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from 'antd';
import 'antd/dist/reset.css';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;


function HomeScreen() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fromMonth  , setFromMonth] = useState();
    const [toMonth  , settoMonth] = useState();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await axios.get("http://localhost:5555/api/rooms/getallRoom");
                setRooms(res.data);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                console.error("Error fetching rooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    function findByMonth(months) {
        if (Array.isArray(months) && months.length === 2) {
            setFromMonth(dayjs(months[0]).format('MM-YYYY'));
            settoMonth(dayjs(months[1]).format('MM-YYYY'));
        } else {
            setFromMonth(undefined);
            settoMonth(undefined);
        }

    }
    

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-3">
                    <RangePicker picker="month" format='MM-YYYY' onChange={findByMonth}/>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Error message='something went wrong!!!..' />
                ) : rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div className="col-md-9 mt-2" key={room._id}>
                            <Room room={room} fromMonth={fromMonth} toMonth={toMonth}/>
                        </div>
                    ))
                ) : (
                    <h1>No rooms available</h1>
                )}
            </div>
        </div>
    );
}

export default HomeScreen;