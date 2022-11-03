import { useState } from 'react';

import './App.css';
import Slider from './components/Slider'
import MainImage from './components/MainImage'
import ImageButtons from './components/ImageButtons'
import SidebarItem from './components/SidebarItem';

function App() {

  let images = ["/images/lake-mountain.jpeg", "/images/purple-lake.jpg", "/images/walkway.jpg"]

  // function to allow child component to pass state to parent app
  const changeImage = imageNumber => {
    setCurrentImage(imageNumber)
  } 

  function handleSliderChange({target}) {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return {...option, value: target.value}
      })
    })
  }

  function getImageStyle() {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return {filter: filters.join(' ')}
  }

  // current image to display
  const [currentImage, setCurrentImage] = useState(0)

  // Css filter options
  const DEFAULT_OPTIONS = [
    {
      name: 'Brightness',
      property: 'brightness',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%'
    },
    {
      name: 'Contrast',
      property: 'contrast',
      value: 100,
      range: {
        min: 0,
        max: 100
      },
      unit: '%'
    },
    {
      name: 'Saturation',
      property: 'saturate',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%'
    },
    {
      name: 'Grayscale',
      property: 'grayscale',
      value: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: '%'
    },
    {
      name: 'Sepia',
      property: 'sepia',
      value: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: '%'
    },
    {
      name: 'Hue Rotate',
      property: 'hue-rotate',
      value: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: 'deg'
    },
    {
      name: 'Blur',
      property: 'blur',
      value: 0,
      range: {
        min: 0,
        max: 20
      },
      unit: 'px'
    }
  ]
  // selected index for list of options
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  // the options in state form
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  // the option selected 
  const selectedOption = options[selectedOptionIndex]


  return (
    <div className="container">
 
      <MainImage image={images[currentImage]} style={getImageStyle()} />

      <div className="sidebar">
          {options.map((option, index) => {
            return (
              <SidebarItem 
                key={index}
                name={option.name}
                active={index === selectedOptionIndex}
                handleClick={() => setSelectedOptionIndex(index)}
              />
            )
          })}
        <ImageButtons changeImage={changeImage} />
      </div>

      <Slider 
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
      
    </div>
  );
}

export default App;
