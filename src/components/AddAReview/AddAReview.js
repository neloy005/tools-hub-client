import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './AddReview.css';

let init = 0;
const AddAReview = () => {
    const [user] = useAuthState(auth);
    const [ratingValue, setRatingValue] = useState(0);

    const handleIncrease = () => {
        if (init === 5) {
            return;
        }
        init += 1;
        setRatingValue(init);
    }
    const handleDecrease = () => {
        if (init === 0) {
            return;
        }
        init = init - 1;
        setRatingValue(init);
    }
    return (
        <div>
            <h2>Add Review</h2>
            <div className='give-review-container'>
                <span>Review by: </span><input type="text" name='name' placeholder='Your name' value={user.displayName} disabled /> <br /> <br />
                <span>Give </span><Button onClick={handleDecrease} variant="danger">-</Button>
                <input className='btn-counter' type="number" name='stars' value={ratingValue} />
                <Button onClick={handleIncrease} variant="success">+</Button> <span> stars</span> <br /><br />
                <textarea type="text" name='review' placeholder='Your review' required /> <br /> <br />
                <input className='submit-btn' type="submit" value="Post" />
            </div>
        </div>
    );
};

export default AddAReview;