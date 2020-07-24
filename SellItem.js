import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SellItem = (props) => {
	const [file, setFile] = useState('');
	const [filename, setFilename] = useState('select image');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [location, setLocation] = useState('');
	const [uploaded, setUploaded] = useState(false);

	const onChange = e => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	const handleDescription = e => {
		setDescription(e.target.value);
	};

	const handlePrice = e => {
		setPrice(e.target.value);
	};

	const handleLocation = e => {
		setLocation(e.target.value);
	};

	const onSubmit = async e => {
		e.preventDefault();
		
		const formData = new FormData();
		formData.append('name', props.name);
		formData.append('email', props.email);
		formData.append('price', price);
		formData.append('description', description);
		formData.append('location', location);
		formData.append('file', file);

		try {
			const res = await axios.post('http://192.168.1.100:8080/sellItem/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}

			}).then(res=> setUploaded(true));

		} catch (err) {
			if (err.response.status === 500) {
				console.log('500 is here');
			} else {

			}
		}
	};

	if (uploaded) {
		return (
			<div>
				<div> Upload succesful...</div>
				<p>The following item have been uploaded.  </p>
				<p> Price:  {price}</p>
				<p>Description: {description}</p>
				<p>Location: {location}</p>
				<p>Account Name: {props.name}</p>
				<div>{filename}</div>
			</div>
		);
	}
	return (

		<Fragment>

			<form onSubmit={onSubmit} id='forminput' >
				<Form.Group as={Row} controlId="formPlaintextEmail">
					<Form.Label column sm="2">
						Name:
    			</Form.Label>
					<Col sm="10">
						<Form.Control plaintext readOnly defaultValue={props.name} />
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="formPlaintextPassword">
					<Form.Label column sm="2">
						Registered email:
   				 </Form.Label>
					<Col sm="10">
						<Form.Control plaintext readOnly defaultValue={props.email} />
					</Col>
				</Form.Group>

				<div className='custom-file mb-4'>
					<input
						type='file'
						className='custom-file-input'
						id='customFile'
						onChange={onChange}
					/>
					<label className='custom-file-label' htmlFor='customFile'>
						{filename}
					</label>
				</div>
				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>Short Description</Form.Label>
					<Form.Control as="textarea" rows="3" name='description' placeholder="Please type here" value={description} onChange={handleDescription} />
				</Form.Group>
				<Form.Row>
					<Form.Group as={Col} controlId="formGridEmail">
						<Form.Label>Asking Price</Form.Label>
						<Form.Control type="textarea" placeholder="eg. 50 AUD" name='price' value={price} onChange={handlePrice} />
					</Form.Group>

					<Form.Group as={Col} controlId="formGridPassword">
						<Form.Label>Location (postal code)</Form.Label>
						<Form.Control type="textarea" placeholder="eg. 3011" name='location' value={location} onChange={handleLocation} />
					</Form.Group>
				</Form.Row>


				<input
					type='submit'
					value='Submit'
					className='btn btn-primary btn-block mt-4'
				/>

			</form>
		</Fragment>

	);
};

export default SellItem;
