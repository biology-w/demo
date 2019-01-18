import React from 'react';
import {Link} from "react-router-dom";

export default function (props) {
	const { dataSource, location } = props
	const { ability } = location.match.params
    return <div>
			<ul>
				{
					dataSource.slider.map((item, index) => {
						return (
							<li key={index}>
								<a target='_blank' href={item.linkUrl}><img src={item.picUrl} /></a>
							</li>
						)
					})
				}
			</ul>
			<ul>
				{
					dataSource.radioList.map((item, index) => {
						return (
							<li key={index}>
								<h3>{item.Ftitle}</h3>
								<a target='_blank' href={item.linkUrl}><img src={item.picUrl} /></a>
							</li>
						)
					})
				}
			</ul>
			<ul>
				{
					dataSource.songList.map((item, index) => {
						return (
							<li key={index}>
								<p>{item.songListDesc}</p>
								<p>{item.songListAuthor}</p>
								<a target='_blank' href={item.linkUrl}><img src={item.picUrl} /></a>
							</li>
						)
					})
				}
			</ul>
    </div>
}
