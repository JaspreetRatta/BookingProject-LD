import React, { useEffect, useState } from 'react';
import { Col, message, Row, Card, Switch, Typography, Space, Divider, Button, Statistic, Rate, Form, Input, Modal, InputNumber } from 'antd';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { axiosInstance } from '../helpers/axiosInstance';
import StripeCheckout from 'react-stripe-checkout';
import Review from './Review';
import ReviewCustomer from './ReviewCustomer';

const { Title, Text } = Typography;

const SingleTourCard = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState();
  const [review, setReview] = useState();
  const [point, setUserPoint] = useState(null);
  const [checkDiscount, setCheckDiscount] = useState(true);
  const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();

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

  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post('/api/bookings/book-tour', {
        tour: tour._id,
        category: 'tour',
        discount: checkDiscount ? discount : 0,
        transactionId,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate('/bookingsTour');
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
        amount: tour.price * 100,
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

  const getTour = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post('/api/tour/read', {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setTour(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getReviewTour = () => {
    axiosInstance
      .post('/api/review/read_tour', {
        _id: params.id,
      })
      .then((res) => {
        //code
        setReview(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTour();
    getReviewTour();
  }, []);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // function formatDate(dateString) {
  //   const date = new Date(dateString);
  //   const day = date.getDate();
  //   const month = monthNames[date.getMonth()];
  //   const year = date.getFullYear();
  //   return `${day} ${month} ${year}`;
  // }

  // const formattedDate = formatDate(tour.journeyDate);

  const onFinish = async (values) => {};

  return (
    <div>
      {tour && (
        <Card style={{ marginBottom: '16px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div style={{ overflow: 'hidden' }}>
                <img alt={tour.title} src={tour.images[0].url} style={{ width: '100%', objectFit: 'cover' }} />
              </div>
              <Divider />
              <Review review={review} />
            </Col>
            <Col xs={24} md={12}>
              <div style={{ padding: '16px' }}>
                <Row
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Title level={2} style={{ marginBottom: '8px' }}>
                    {tour.title}
                  </Title>
                  {/* <Button type="primary" >
                    Buy
                  </Button> */}

                  <div className="payment-options">
                    <StripeCheckout
                      billingAddress
                      token={onToken}
                      amount={checkDiscount ? (tour.price - discount) * 100 : tour.price * 100}
                      currency="THB"
                      stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
                    >
                      <button className="primary-btn">Pay with Card</button>
                    </StripeCheckout>
                  </div>
                </Row>

                <Text strong>Journey Date : {tour.journeyDate}</Text>
                <br />
                <Text strong>Duration : {tour.duration} days</Text>
                <br />
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
                <Text strong>Discount : {discount >= 100 && checkDiscount ? discount : 0} </Text>
                <br />
                <Text strong>Price : {checkDiscount ? tour.price - discount : tour.price} THB / person</Text>
                <Divider />
                <Text>{tour.description}</Text>
                <Divider />
                <Title level={3}>Tour Details</Title>
                <Text>{tour.details}</Text>
              </div>
            </Col>
          </Row>

          <Divider />
          <Title level={3}>Customer Reviews</Title>
          <ReviewCustomer review={review} />
        </Card>
      )}
    </div>
  );
};

export default SingleTourCard;
