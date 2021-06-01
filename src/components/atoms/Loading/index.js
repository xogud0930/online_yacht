import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import './Loading.css'

const Loading = (props) => {
    const [isState, setIsState] = useState(true);

    const loaderTimer = async () => {
        console.log('timer start')
        setTimeout(() => {
            setIsState(false);
        }, props.timer)
    }

    
    useEffect(() => {
        loaderTimer();
    }, [])

    return (
        <>
            { isState ?
            <div className = 'spincontainer'>
                <div className = 'loader'>
                    <Loader
                        type = 'Circles'
                        color = 'rgb(0, 98, 209)'
                        hegiht = {100}
                        width = {100}
                    />
                    <div>Loading...</div>
                </div>
            </div> : null }
        </>
    )
}

export default Loading;