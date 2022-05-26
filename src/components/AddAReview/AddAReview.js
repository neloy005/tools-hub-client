import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import './AddReview.css';

let init = 0;
const AddAReview = () => {
    const [user] = useAuthState(auth);
    const [ratingValue, setRatingValue] = useState(0);

    const handleIncrease = () => {
        if (init === 5) {
            setRatingValue(init);
            return;
        }
        init += 1;
        setRatingValue(init);
    }
    const handleDecrease = () => {
        if (init === 0) {
            setRatingValue(init);
            return;
        }
        init = init - 1;
        setRatingValue(init);
    }
    const handleAddingReview = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const stars = event.target.stars.value;
        const review = event.target.review.value;
        const reviewObj = { name, stars, review };
        console.log(reviewObj);

        fetch('http://localhost:5000/review', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviewObj)

        })
            .then(res => res.json())
            .then(data => {
                toast.success('Review successful.');
                event.target.reset();
            })

    }
    return (
        <div>
            <h2>Add Review</h2>
            <div className='give-review-container'>
                <form onSubmit={handleAddingReview}>
                    <span>Review by: <br /></span><input type="text" name='name' placeholder='Your name' value={user.displayName} disabled /> <br /> <br />
                    <span>Give </span><Button onClick={handleDecrease} variant="danger">-</Button>
                    <input className='btn-counter' type="number" name='stars' value={ratingValue} disabled />
                    <Button onClick={handleIncrease} variant="success">+</Button> <span> stars</span> <br /><br />
                    <textarea type="text" name='review' placeholder='Your review' required /> <br /> <br />
                    <input className='submit-btn' type="submit" value="Post" />
                </form>

            </div>
        </div>
    );
};

export default AddAReview;