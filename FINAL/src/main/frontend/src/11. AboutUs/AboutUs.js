import React from 'react'
import 조혜경 from '../images/조혜경.png'
import 이동균 from '../images/이동균.png'
import 이민형 from '../images/이민형.png'
import 전규한 from '../images/전규한.png'
import 우혜정 from '../images/우혜정.png'
import './AboutUs.css'

import CallIcon from '@mui/icons-material/Call';

function AboutUs() {
  return (
    <div className='Container'>
      <div className='Middle-Container'>
        <div className='AboutUs-Container'>
          <div className='AboutUs-header'>
            <h1>About Us</h1>
          </div>
          <div className='AboutUs-main'>
            <div className='OurInfo'>
              <img src={우혜정} alt="face"/>
              <h4>우혜정</h4>
              <h6>Backend / Frontend</h6>
              <CallIcon />              
              <span class="material-symbols-outlined">mail</span>
            </div>
            <div className='OurInfo'>
              <img src={조혜경} alt="face"/>
              <h4>조혜경</h4>
              <h6>Backend / Frontend</h6>
              <CallIcon />
              <span class="material-symbols-outlined">mail</span>
            </div>
            <div className='OurInfo'>
              <img src={전규한} alt="face"/>
              <h4>전규한</h4>
              <h6>Backend / Frontend</h6>
              <CallIcon />
              <span class="material-symbols-outlined">mail</span>
            </div>
            <div className='OurInfo'>
              <img src={이민형} alt="face"/>
              <h4>이민형</h4>
              <h6>Backend / Frontend</h6>
              <CallIcon />
              <span class="material-symbols-outlined">mail</span>
            </div>
            <div className='OurInfo'>
              <img src={이동균} alt="face"/>
              <h4>이동균</h4>
              <h6>Backend / Frontend</h6>
              <CallIcon />
              <span class="material-symbols-outlined">mail</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AboutUs