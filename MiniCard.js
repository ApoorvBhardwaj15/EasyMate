import React from 'react';
import Card from 'react-bootstrap/Card';

const MiniCard = (props) => {

	return (
		<div>
			<Card>
				<Card.Img variant="top" src={props.url1} alt={props.url2} onError={(e)=>{e.target.onerror = null; e.target.src=e.target.alt}}/>
				<Card.Body>
					<Card.Title variant="primary">${props.price} AUD</Card.Title>
					<Card.Text>
						{props.description}
      </Card.Text>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Contact- {props.email}</small>
				</Card.Footer>
			</Card>
		</div>
	);
}
export default MiniCard;
