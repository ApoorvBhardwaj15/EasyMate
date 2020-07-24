import React, { Component } from 'react';

import CardColumns from 'react-bootstrap/CardColumns'

import MiniCard from './MiniCard.js';

class MarketPlace extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			id: false

		};
	}

	async getData(props) {
		if (!this.state.id) {
			await fetch("http://192.168.1.100:8080/MarketPlace/", {
				method: "post",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},

				//make sure to serialize your JSON body
				body: JSON.stringify({

					email: this.props.email
				})
			}).then((response) => response.json())
				.then((response) => {
					this.setState({
						items: response,
						id: true
					});

				});
		}
	}

	render() {
		this.getData();
		if (this.state.id) {
			const items = this.state.items;
			const itemList = items.map((item, i) => {
				return <MiniCard email={item.email} url1={item.url1} url2={item.url2} description={item.description} price={item.price} />
			})
			return (
				<div>
					<CardColumns style={{ width: '50rem', height:'60rem' }}>
						{itemList}
					</CardColumns>
				</div>
			);
		}
		return (
			<p> List appears to be empty...</p>

		);
	}
}

export default MarketPlace;
