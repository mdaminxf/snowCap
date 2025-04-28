import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation after submission

const PaymentSuccess = () => {
  const navigate = useNavigate();

//   Redirect to home page or dashboard after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  localStorage.clear();

  return (
    <div className="success-container">
      <div className="success-box">
        <div className="animation-box">
          <div className="checkmark-container">
            <div className="checkmark"></div>
          </div>
        </div>
        <h2 className="success-message">Payment Successful!</h2>
        <p className="thank-you-message">Thank you for your purchase!</p>
        <p className="redirect-message">You will be redirected shortly...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
