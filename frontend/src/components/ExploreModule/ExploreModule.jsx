import React, { useContext } from 'react'
import './ExploreModule.css'
import { StoreContext } from '../../Context/StoreContext'
import ModuleCard from '../ModuleCard/ModuleCard'
import { assets, module_list } from '../../assets/assets.js'

const ExploreModule = () => {

  return (
    <div className='module-display' id='explore-module'>
        <h2>Explore Our Modules</h2>
        <div className="module-display-list">
            {module_list.map((item, index)=>{
                    return <ModuleCard key={index} id={item._id} name={item.name} description={item.description} image={item.image}/>
            })}
        </div>
    </div>
  )
}

export default ExploreModule
