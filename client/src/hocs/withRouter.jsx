import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const withRouter = (Components) => props => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <Components navigate={navigate} location={location} {...props} />
    )
}

export default withRouter