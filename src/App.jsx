import { useState } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { Grid, OrbitControls } from '@react-three/drei'
import { Lift } from './Lift'

function App() {


  return (
    <>
      <Canvas camera={{position:[0,2,-10]}} >
        <color attach='background' args={['black']}/>
        <OrbitControls/>
        <directionalLight position={[0,0,-10]}/>
        <directionalLight position={[0,0,10]}/>
        <Grid infiniteGrid/>
        <Lift pos={[0,0,0]}/>
      </Canvas>
    </>
  )
}

export default App
