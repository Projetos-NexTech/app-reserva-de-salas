import React from 'react'
import '../styles/components/sidebar.css'
//import { room } from '../services/salaService'

function SideBar({title, date, hour,  }) {
  return (
    <aside className='sidebar'>
      <p className='tag'>Pinacoteca de São Paulo</p>

      <h1 className='title'>{title}</h1>

      <p>{date}</p>
      <p>{hour}</p>

      <button className='btn-secondary toRightTransition'>Reservar</button>
    </aside>
  )
}

export default SideBar
