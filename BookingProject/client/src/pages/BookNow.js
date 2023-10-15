import { Col, message, Row, Card, Switch, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import StripeCheckout from 'react-stripe-checkout';

function BookNow() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);
  const [point, setUserPoint] = useState(null);
  const [checkDiscount, setCheckDiscount] = useState(true);
  const [discount, setDiscount] = useState(0);

  const colStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  useEffect(() => {
    onGetProfile();
  }, []);

  const onGetProfile = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post('/api/users/get-point-user-by-id');
      dispatch(HideLoading());
      if (response.data.success) {
        const point = response.data.data;
        setUserPoint(point);
        setDiscount(point >= 1000 ? Math.round(point / 1000) * 100 : 0);
      }
    } catch (error) {
      dispatch(HideLoading());
    }
  };

  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post('/api/buses/get-bus-by-id', {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post('/api/bookings/book-seat', {
        bus: bus._id,
        seats: selectedSeats,
        discount: checkDiscount ? discount : 0,
        transactionId,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate('/bookings');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post('/api/bookings/make-payment', {
        token,
        amount: selectedSeats.length * bus.fare * 100,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const paypalPayment = () => {
    // Implement PayPal payment logic here
    console.log('Perform PayPal payment');
  };

  useEffect(() => {
    getBus();
  }, []);

  return (
    <Card>
      <div>
        {bus && (
          <Row className="mt-3" gutter={[30, 30]}>
            <Col lg={12} xs={24} sm={24}>
              <h1 className="text-2xl primary-text">{bus.name}</h1>
              <h1 className="text-md">
                {bus.from} - {bus.to}
              </h1>
              <hr />

              <div className="flex flex-col gap-2">
                <p className="text-md">Journey Date: {bus.journeyDate}</p>
                <p className="text-md">Fare: ฿ {bus.fare} /-</p>
                <p className="text-md">Departure Time: {bus.departure}</p>
                <p className="text-md">Arrival Time: {bus.arrival}</p>
                <p className="text-md">Departure Place: {bus.sto}</p>
                <p className="text-md">Arrival Place: {bus.sfrom}</p>
                <p className="text-md">Capacity: {bus.capacity}</p>
                <p className="text-md">Seats Left: {bus.capacity - bus.seatsBooked.length}</p>
              </div>
              <hr />

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">Selected Seats: {selectedSeats.join(', ')}</h1>
                {discount >= 100 && (
                  <Form.Item label="Use Discount" valuePropName="checked">
                    <Switch
                      checked={checkDiscount}
                      checkedChildren="yes"
                      unCheckedChildren="no"
                      onChange={() => {
                        setCheckDiscount(!checkDiscount);
                      }}
                    />
                  </Form.Item>
                )}
                <h3>Discount : {discount >= 100 && checkDiscount ? discount : 0} </h3>
                <h1 className="text-2xl mt-2">
                  Fare: {checkDiscount && selectedSeats.length > 0 ? bus.fare * selectedSeats.length - discount : bus.fare * selectedSeats.length} /-
                </h1>
                <hr />
                <div className="payment-options">
                  <StripeCheckout
                    billingAddress
                    token={onToken}
                    amount={
                      checkDiscount && selectedSeats.length > 0
                        ? (bus.fare * selectedSeats.length - discount) * 100
                        : bus.fare * selectedSeats.length * 100
                    }
                    currency="THB"
                    stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
                  >
                    <button className={`primary-btn ${selectedSeats.length === 0 && 'disabled-btn'}`} disabled={selectedSeats.length === 0}>
                      Pay with Card
                    </button>
                  </StripeCheckout>
                </div>
              </div>
            </Col>
            <Col lg={4} style={colStyle}>
              <Col>
                <p>
                  <span
                    style={{
                      height: '20px',
                      width: '20px',
                      display: 'inline-block',
                      borderRadius: '20%',
                      marginRight: '10px',
                      background: '#c9c9c9',
                    }}
                  ></span>
                  Unavailable
                </p>
                <p>
                  <span
                    style={{
                      height: '20px',
                      width: '20px',
                      display: 'inline-block',
                      borderRadius: '20%',
                      marginRight: '10px',
                      background: '#d5f4ea',
                    }}
                  ></span>
                  Available
                </p>
                <p>
                  <span
                    style={{
                      height: '20px',
                      width: '20px',
                      display: 'inline-block',
                      borderRadius: '20%',
                      marginRight: '10px',
                      background: '#05be5f',
                    }}
                  ></span>
                  Selected
                </p>
              </Col>
            </Col>

            <Col lg={8}>
              <SeatSelection selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} bus={bus} />
            </Col>
          </Row>
        )}
      </div>
    </Card>
  );
}

export default BookNow;
