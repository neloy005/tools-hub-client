import React from 'react';
import { Accordion } from 'react-bootstrap';

const SingleFaq = ({ faq, index }) => {
    const { name, description } = faq;
    return (
        <Accordion.Item eventKey={index}>
            <Accordion.Header>{name}</Accordion.Header>
            <Accordion.Body>
                {description}
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default SingleFaq;