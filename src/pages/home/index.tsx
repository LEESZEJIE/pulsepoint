import './index.css'

const HomePage = () => {
  return (
    <div id="home-page" className='page'>
      <img src={'/images/doctor-home.png'} alt={'doctor-cartoon-image'} className='doctor-mascot' />

      <div className="vision-mission">
        <div className="vision">
          <img src={'/images/pulsepoint-logo.png'} alt={'pulsepoint-logo'} />
          <p>PulsePoint is dedicated to empowering individuals on their health journeys through accessible and cutting-edge technology. </p>
        </div>
        <div className="mission">
          <img src={'/images/mission.png'} alt={'pulsepoint-logo'} />
          <p>PulsePoint aims to empower individuals to take charge of their health through accessible, innovative services and community engagement. The mission is to create a supportive environment that promotes overall well-being, fosters healthy lifestyles, and connects individuals with the resources they need to thrive.</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
