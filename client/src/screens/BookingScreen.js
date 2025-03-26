import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Carousel } from "react-bootstrap";
import Loader from "../components/Loader";
import Error from "../components/Error";

function BookingScreen() {
    const { roomid , frommonth , tomonth} = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showGallery, setShowGallery] = useState(false);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await axios.get(`http://localhost:5555/api/rooms/getRoomById/${roomid}`);
                setRoom(res.data);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                console.error("Error fetching room details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoom();
    }, [roomid]);

    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Available";
    };

    async function bookRoom(){
        const bookingDetails = {
            room,
            userid:JSON.parse(localStorage.getItem('currentUser'))._id,
            frommonth,
            tomonth
        }
        try {
            const result = await axios.post('http://localhost:5555/api/bookings/bookroom' , bookingDetails);
        } catch (error) {
            
        }
    }
    

    return (
        <div className="container mt-4 ">
            {loading && <Loader/>}
            {error && <Error/>}
            
            {room && (
                <div className="row bs">
                    <div className="col-md-6 ">
                        {room.imageURLs && room.imageURLs.length > 0 ? (
                            <img 
                                src={`http://localhost:5555/images/${room.imageURLs[0]}`} 
                                className="img-fluid rounded" 
                                alt={room.name}
                                onError={handleImageError}
                                style={{ cursor: 'pointer', maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                                onClick={() => setShowGallery(true)}
                            />
                        ) : (
                            <img 
                                src="https://via.placeholder.com/600x400?text=No+Image" 
                                className="img-fluid rounded" 
                                alt="No room image"
                            />
                        )}
                        {room.imageURLs && room.imageURLs.length > 1 && (
                            <div className="text-center mt-2">
                                <Button variant="outline-primary" onClick={() => setShowGallery(true)}>
                                    View All Photos
                                </Button>
                            </div>
                        )}
                    </div>
                    
                    <div className="col-md-6">
                        <div className="card p-3">
                            <h1>{room.name}</h1>
                            <hr />
                            <p><strong>Type:</strong> {room.type}</p>
                            <p><strong>Booking Period:</strong> {frommonth} to {tomonth}</p>
                            <p><strong>Max Occupancy:</strong> {room.maxCount} people</p>
                            <p><strong>Contact:</strong> {room.mobileNumber}</p>
                            <p><strong>Rent:</strong> ${room.rentPerMonth} per month</p>
                            
                            <div className="mt-3">
                                <h4>Description</h4>
                                <p>{room.description}</p>
                            </div>
                            
                            <div className="mt-3">
                                <Button variant="success" size="lg" onClick={bookRoom} block>
                                    Book Now
                                </Button>
                                <Link to="/home" className="btn btn-secondary mt-2 " style={{ marginLeft: '200px' }}>
                                    Back to Rooms
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <Modal show={showGallery} onHide={() => setShowGallery(false)} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>{room.name} - Gallery</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Carousel>
                                {room.imageURLs && room.imageURLs.map((url, index) => (
                                    <Carousel.Item key={index}>
                                        <img 
                                            className="d-block w-100" 
                                            style={{ height: '500px', objectFit: 'contain' }}
                                            src={`http://localhost:5555/images/${url}`} 
                                            alt={`Room ${index+1}`}
                                            onError={handleImageError}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Modal.Body>
                    </Modal>
                </div>
            )}
        </div>
    );
}

export default BookingScreen;