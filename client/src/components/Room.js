import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromMonth, toMonth }) {
    const [show, setShow] = useState(false);

    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Available";
    };

    return (
        <div className="card p-3 mb-4 shadow-sm">
            <div className="row">
                <div className="col-md-4">
                    {room.imageURLs && room.imageURLs.length > 0 ? (
                        <img
                            src={`http://localhost:5555/images/${room.imageURLs[0]}`}
                            className="img-fluid rounded"
                            style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                            alt={room.name}
                            onError={handleImageError}
                        />
                    ) : (
                        <img
                            src="https://via.placeholder.com/300x200?text=No+Image"
                            className="img-fluid rounded"
                            alt="No room image"
                        />
                    )}
                </div>
                <div className="col-md-8">
                    <h3>{room.name}</h3>
                    <div className="mb-3">
                        <span className="badge bg-info text-dark me-2">{room.type}</span>
                        <span className="badge bg-secondary me-2">Max: {room.maxCount} people</span>
                        <span className="badge bg-success">${room.rentPerMonth}/month</span>
                    </div>
                    <p className="text-muted">{room.description.substring(0, 100)}...</p>
                    <div className="d-flex justify-content-end mt-3">
                        <Link to={`/book/${room._id}/${fromMonth}/${toMonth}`} className="btn btn-primary me-2">
                            Book Now
                        </Link>

                        <Button variant="outline-secondary" onClick={() => setShow(true)}>
                            View Details
                        </Button>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={() => setShow(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {room.imageURLs && room.imageURLs.map((url, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    style={{ height: '400px', objectFit: 'contain' }}
                                    src={`http://localhost:5555/images/${url}`}
                                    alt={`Room ${index + 1}`}
                                    onError={handleImageError}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className="mt-4">
                        <h5>Description:</h5>
                        <p>{room.description}</p>
                        <hr />
                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>Type:</strong> {room.type}</p>
                                <p><strong>Max Occupancy:</strong> {room.maxCount} people</p>
                            </div>
                            <div className="col-md-6">
                                <p><strong>Contact:</strong> {room.mobileNumber}</p>
                                <p><strong>Rent:</strong> ${room.rentPerMonth} per month</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={`/book/${room._id}`} className="btn btn-success me-2">
                        Book Now
                    </Link>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Room;