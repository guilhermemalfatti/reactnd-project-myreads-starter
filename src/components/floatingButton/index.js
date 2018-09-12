import React from 'react';
import './index.css';
import { Link } from 'react-router-dom'

const FloatingButton = () => (
    <Link to="/search" className="float">
        <i className="fa fa-plus my-float"></i>
    </Link>
);

export default FloatingButton;