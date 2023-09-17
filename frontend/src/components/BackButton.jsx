import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft} from 'react-icons/bs'

const BackButton = (props) => {
  return (
    <div className=' flex'>

        <Link
        // eslint-disable-next-line react/prop-types
        to={props.destination}
        className=' bg-sky-400 text-white px-4 py-1 rounded-md'>

            <BsArrowLeft className=" text-2xl" />

        </Link>

    </div>
  )
}

export default BackButton